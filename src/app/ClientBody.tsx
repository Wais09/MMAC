"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import WhatsAppButton from "@/components/WhatsAppButton";
import ChatBot from "@/components/ChatBot";
import StickyTrialBanner from "@/components/StickyTrialBanner";
import SessionProvider from "@/components/providers/SessionProvider";
import ErrorBoundary from "@/components/ErrorBoundary";
import Header from "@/components/Header";

export default function ClientBody({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Pages where we don't want the header (for custom layouts)
  const hideHeaderPaths = ['/auth/signin', '/auth/signup'];
  const showHeader = !hideHeaderPaths.some(path => pathname?.startsWith(path));

  // Remove any extension-added classes during hydration
  useEffect(() => {
    // This runs only on the client after hydration
    document.body.className = "antialiased";
  }, []);

  return (
    <ErrorBoundary>
      <SessionProvider>
        <div className="antialiased">
          {/* Global Header - Available on most pages */}
          {showHeader && <Header />}

          {children}

          {/* Global Floating Buttons - Available on all pages */}
          <WhatsAppButton />
          <ChatBot />

          {/* Global Sticky Trial Banner - Available on all pages */}
          <StickyTrialBanner />
        </div>
      </SessionProvider>
    </ErrorBoundary>
  );
}
