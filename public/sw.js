const CACHE_NAME = 'mmac-v1.0.0';
const STATIC_CACHE = 'mmac-static-v1';
const DYNAMIC_CACHE = 'mmac-dynamic-v1';

// Assets to cache immediately
const STATIC_ASSETS = [
  '/',
  '/styles',
  '/coaches',
  '/timetable',
  '/membership',
  '/contact',
  '/manifest.json',
  '/logo.png',
  // Add critical CSS and JS files here
];

// Assets to cache on first request
const CACHE_STRATEGIES = {
  // Cache images with fallback
  images: /\.(png|jpg|jpeg|svg|gif|webp)$/,
  // Cache fonts
  fonts: /\.(woff|woff2|ttf|eot)$/,
  // Cache API responses (temporary)
  api: /\/api\//,
  // Cache static assets
  static: /\.(css|js)$/
};

// Install event - cache static assets
self.addEventListener('install', (event) => {
  console.log('🚀 Service Worker: Installing...');

  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => {
      console.log('📦 Service Worker: Caching static assets');
      return cache.addAll(STATIC_ASSETS);
    }).catch((error) => {
      console.error('❌ Service Worker: Failed to cache static assets', error);
    })
  );

  // Skip waiting to activate immediately
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('✅ Service Worker: Activating...');

  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
            console.log('🗑️ Service Worker: Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );

  // Take control of all pages immediately
  self.clients.claim();
});

// Fetch event - handle requests with caching strategies
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') return;

  // Skip Chrome extension requests
  if (url.protocol === 'chrome-extension:') return;

  event.respondWith(handleFetch(request));
});

async function handleFetch(request) {
  const url = new URL(request.url);

  try {
    // Strategy 1: Network first for API calls
    if (CACHE_STRATEGIES.api.test(url.pathname)) {
      return await networkFirstStrategy(request, DYNAMIC_CACHE);
    }

    // Strategy 2: Cache first for images
    if (CACHE_STRATEGIES.images.test(url.pathname)) {
      return await cacheFirstStrategy(request, DYNAMIC_CACHE);
    }

    // Strategy 3: Cache first for fonts
    if (CACHE_STRATEGIES.fonts.test(url.pathname)) {
      return await cacheFirstStrategy(request, STATIC_CACHE);
    }

    // Strategy 4: Stale while revalidate for static assets
    if (CACHE_STRATEGIES.static.test(url.pathname)) {
      return await staleWhileRevalidateStrategy(request, STATIC_CACHE);
    }

    // Strategy 5: Network first with cache fallback for pages
    return await networkFirstStrategy(request, DYNAMIC_CACHE);

  } catch (error) {
    console.error('❌ Service Worker: Fetch failed', error);

    // Return offline page for navigation requests
    if (request.destination === 'document') {
      return caches.match('/') || new Response('Offline - Please check your connection', {
        status: 503,
        statusText: 'Service Unavailable'
      });
    }

    // Return cached version or error
    return caches.match(request) || new Response('Resource not available offline', {
      status: 503,
      statusText: 'Service Unavailable'
    });
  }
}

// Cache first strategy - check cache first, then network
async function cacheFirstStrategy(request, cacheName) {
  const cached = await caches.match(request);
  if (cached) {
    return cached;
  }

  const response = await fetch(request);
  if (response.ok) {
    const cache = await caches.open(cacheName);
    cache.put(request, response.clone());
  }
  return response;
}

// Network first strategy - try network first, fallback to cache
async function networkFirstStrategy(request, cacheName) {
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(cacheName);
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    const cached = await caches.match(request);
    if (cached) {
      return cached;
    }
    throw error;
  }
}

// Stale while revalidate - return cache immediately, update in background
async function staleWhileRevalidateStrategy(request, cacheName) {
  const cached = await caches.match(request);

  // Fetch in background to update cache
  const fetchPromise = fetch(request).then((response) => {
    if (response.ok) {
      const cache = caches.open(cacheName);
      cache.then(c => c.put(request, response.clone()));
    }
    return response;
  }).catch(() => {
    // Silent fail for background updates
  });

  // Return cached version immediately if available
  return cached || fetchPromise;
}

// Handle background sync for offline actions
self.addEventListener('sync', (event) => {
  console.log('🔄 Service Worker: Background sync triggered', event.tag);

  if (event.tag === 'contact-form') {
    event.waitUntil(handleOfflineContactForm());
  }
});

// Handle offline contact form submissions
async function handleOfflineContactForm() {
  // Placeholder for offline form handling
  console.log('📝 Service Worker: Processing offline contact forms');
}

// Handle push notifications (future enhancement)
self.addEventListener('push', (event) => {
  const options = {
    body: event.data ? event.data.text() : 'New martial arts updates available!',
    icon: '/icons/icon-192x192.png',
    badge: '/icons/icon-72x72.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'View Details',
        icon: '/icons/checkmark.png'
      },
      {
        action: 'close',
        title: 'Close',
        icon: '/icons/xmark.png'
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification('MMAC Update', options)
  );
});

// Handle notification click
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  if (event.action === 'explore') {
    // Open the app
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});
