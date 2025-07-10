# Instagram Connection Guide 2024
## Connect Your Real Instagram Account to the Socials Page

**Current Status:** Your Socials page is fully built and SEO-optimized - we just need to connect your actual Instagram account to replace the demo content.

---

## 🎯 What You'll Get

✅ **Real Instagram posts** with captions and hashtags
✅ **SEO crawlable content** for search engines
✅ **Automatic updates** when you post new content
✅ **Structured data** for rich snippets
✅ **Mobile-responsive** Instagram feed

---

## 📋 Before We Start

**You'll need:**
- Instagram account (personal or business)
- Facebook account
- 15-30 minutes of time
- Admin access to your website

**Recommended Approach:**
- **Option 1:** Instagram Basic Display API (easier, personal accounts)
- **Option 2:** Instagram Graph API (more features, business accounts)

---

## 🚀 Option 1: Instagram Basic Display API (Recommended for Quick Setup)

### Step 1: Create Facebook App

1. **Go to [Facebook Developers](https://developers.facebook.com/)**
2. **Click "Create App"** (top right)
3. **Choose "Consumer"** (not Business) - this makes Instagram options clearer
4. **Fill in details:**
   - App Name: `Marrickville Martial Arts Feed`
   - App Contact Email: `info@marrickvillemartialartsclub.com.au`
   - Purpose: `Yourself or your own business`

### Step 2: Add Instagram Basic Display

1. **In your new app dashboard:**
   - Look for "Add Products" section
   - Find "Instagram Basic Display"
   - Click "Set up"

2. **If you don't see "Add Products":**
   - Click "App Settings" → "Basic" in left sidebar
   - Scroll down to "App Domains"
   - Add: `marrickvillemartialartsclub.com.au`
   - Save changes
   - Go back to dashboard - you should now see "Add Products"

### Step 3: Configure Instagram Basic Display

1. **Go to Instagram Basic Display → Basic Display**
2. **Add Instagram Test User:**
   - Scroll to "User Token Generator"
   - Click "Add or Remove Instagram Testers"
   - Enter your Instagram username
   - Click "Submit"

3. **Accept Invitation:**
   - Open Instagram app on your phone
   - Go to Settings → Apps and Websites
   - Look for tester invitation and accept it

### Step 4: Generate Access Token

1. **Back in Facebook Developer dashboard:**
   - Go to Instagram Basic Display → Basic Display
   - Under "User Token Generator"
   - Click "Generate Token" next to your Instagram account
   - Login with Instagram and approve permissions
   - **Copy the access token** - save it somewhere safe!

### Step 5: Add Token to Your Website

1. **In your project, create or update `.env.local` file:**

```env
# Instagram Basic Display API
INSTAGRAM_ACCESS_TOKEN=your_access_token_here
NEXT_PUBLIC_INSTAGRAM_APP_ID=your_app_id_here
```

2. **Get your App ID:**
   - In Facebook Developer dashboard
   - Go to "App Settings" → "Basic"
   - Copy the "App ID"

---

## 🏢 Option 2: Instagram Graph API (Business Accounts - More Features)

### Prerequisites
- Instagram Business or Creator account
- Facebook Page connected to your Instagram
- Facebook Business Manager account

### Step 1: Convert Instagram to Business Account

1. **Open Instagram app**
2. **Go to Settings → Account → Switch to Professional Account**
3. **Choose "Business"**
4. **Connect to your Facebook Page**

### Step 2: Create Facebook App (Business Type)

1. **Go to [Facebook Developers](https://developers.facebook.com/)**
2. **Create App → Business**
3. **Add Products:**
   - Instagram Basic Display
   - Instagram Graph API (if available)

### Step 3: Get Page Access Token

1. **Go to [Graph API Explorer](https://developers.facebook.com/tools/explorer/)**
2. **Select your app**
3. **Generate User Access Token with permissions:**
   - `pages_show_list`
   - `pages_read_engagement`
   - `instagram_basic`
4. **Get your Page ID:**
   - Make request to `/me/accounts`
   - Find your Facebook page and copy the access token

### Step 4: Get Instagram Business Account ID

1. **In Graph API Explorer, use your page access token**
2. **Make request to:** `/{page-id}?fields=instagram_business_account`
3. **Copy the Instagram Business Account ID**

### Step 5: Add Credentials to Website

```env
# Instagram Graph API (Business)
INSTAGRAM_ACCESS_TOKEN=your_page_access_token_here
INSTAGRAM_BUSINESS_ACCOUNT_ID=your_instagram_business_account_id_here
FACEBOOK_PAGE_ID=your_facebook_page_id_here
```

---

## 🧪 Test Your Connection

1. **Save your `.env.local` file**
2. **Restart your development server:**
   ```bash
   bun run dev
   ```
3. **Go to your `/socials` page**
4. **Toggle "Use Real Instagram API" checkbox**
5. **Click "Refresh Posts"**
6. **You should see your real Instagram posts!**

---

## 🔧 Troubleshooting

### "Invalid Access Token" Error
- Token expired (60 days for Basic Display)
- Generate new token in Facebook Developer dashboard

### "No Posts Showing"
- Check if Instagram account has public posts
- Verify token has correct permissions
- Check browser console for error messages

### "App Not Found" Error
- Verify App ID is correct in `.env.local`
- Make sure app is not in Development Mode restrictions

### "Instagram Testers Not Found"
- Use "Consumer" app type instead of "Business"
- Make sure you accepted tester invitation in Instagram app

---

## 🎯 What Happens Next

Once connected, your Socials page will:

✅ **Show real Instagram posts** instead of demo content
✅ **Include captions and hashtags** for SEO
✅ **Update automatically** when you post new content
✅ **Remain crawlable** by search engines
✅ **Keep all SEO optimizations** (structured data, meta tags, etc.)

---

## 📞 Need Help?

If you run into issues:

1. **Check the browser console** for error messages
2. **Verify all credentials** are correctly entered
3. **Make sure Instagram account is public** or properly connected
4. **Try the "Consumer" app type** if "Business" is causing issues

Your Socials page is already built to handle real data seamlessly - we just need to get the API connection working!

---

## 🔐 Security Notes

- Never share your access tokens publicly
- Keep `.env.local` file secure and never commit to version control
- Tokens expire every 60 days for Basic Display API
- Set up token refresh for production use
