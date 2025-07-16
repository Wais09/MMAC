# Instagram API Integration Setup Guide

## Overview
Your "Our Socials" page is ready to connect to Instagram! Follow this guide to replace mock data with live Instagram posts.

## Which API Should You Use?

### Option 1: Instagram Basic Display API (Personal Accounts) - EASIER
- ✅ Quick setup (15-30 minutes)
- ✅ Works with personal Instagram accounts
- ✅ Simple authentication
- ❌ Limited data (no likes/comments count)
- ❌ Requires manual token refresh every 60 days

### Option 2: Instagram Graph API (Business Accounts) - RECOMMENDED
- ✅ Full post data (likes, comments, insights)
- ✅ Long-lived tokens (60 days, auto-refreshable)
- ✅ Better for businesses
- ❌ Requires Facebook Business account
- ❌ More complex setup

## Step 1: Create Facebook App

1. Go to [Facebook Developers](https://developers.facebook.com/)
2. Click "My Apps" → "Create App"
3. Choose "Business" app type
4. Fill in details:
   - App Name: "Marrickville Martial Arts Instagram Feed"
   - App Contact Email: info@marrickvillemartialartsclub.com.au
   - Business Account: (create if needed)

## Step 2A: Basic Display API Setup (Personal Account)

### Add Instagram Basic Display Product
1. In your Facebook app dashboard
2. Click "Add Product" → "Instagram Basic Display"
3. Go to Instagram Basic Display → Basic Display

### Configure Basic Display
1. Add Instagram Tester:
   - Go to Roles → Roles
   - Click "Add Instagram Testers"
   - Enter your Instagram username
   - Accept the invitation in Instagram app

2. Create OAuth Redirect URI:
   - Valid OAuth Redirect URIs: `https://your-domain.com/auth/instagram/callback`
   - Deauthorize Callback URL: `https://your-domain.com/auth/instagram/deauth`

### Get Your Credentials
- App ID: Found in App Settings → Basic
- App Secret: Found in App Settings → Basic

## Step 2B: Graph API Setup (Business Account) - RECOMMENDED

### Prerequisites
1. Convert Instagram to Business Account:
   - Instagram app → Settings → Switch to Professional Account → Business
2. Connect to Facebook Page:
   - Instagram → Settings → Business → Connect to Facebook Page

### Add Products
1. Facebook Login: Add Product → Facebook Login
2. Instagram Graph API: Add Product → Instagram Basic Display

### Configure Facebook Login
1. Go to Facebook Login → Settings
2. Valid OAuth Redirect URIs:
   - `https://your-domain.com/auth/facebook/callback`
   - `http://localhost:3000/auth/facebook/callback` (for testing)

### Get Page Access Token
1. Go to [Graph API Explorer](https://developers.facebook.com/tools/explorer/)
2. Select your app
3. Get User Access Token with permissions: `pages_show_list, pages_read_engagement, instagram_basic`
4. Make request to `/me/accounts` to get your page access token
5. Copy the page access token

### Get Instagram Business Account ID
1. In Graph API Explorer, use your page access token
2. Make request to `/{page-id}?fields=instagram_business_account`
3. Copy the Instagram Business Account ID

## Step 3: Generate Access Token

### For Basic Display API
1. Go to your app dashboard
2. Instagram Basic Display → Basic Display
3. Click "Generate Token" for your Instagram account
4. Copy the access token

### For Graph API
1. Use the page access token from Step 2B
2. Exchange for long-lived token:
```bash
curl -i -X GET "https://graph.facebook.com/v18.0/oauth/access_token?grant_type=fb_exchange_token&client_id={app-id}&client_secret={app-secret}&fb_exchange_token={short-lived-token}"
```

## Step 4: Update Environment Variables

Update your `.env.local` file:

```env
# Instagram Basic Display API (Personal)
NEXT_PUBLIC_INSTAGRAM_APP_ID=your_app_id_here
INSTAGRAM_APP_SECRET=your_app_secret_here
INSTAGRAM_ACCESS_TOKEN=your_access_token_here

# Instagram Graph API (Business) - Additional fields
FACEBOOK_PAGE_ID=your_facebook_page_id_here
INSTAGRAM_BUSINESS_ACCOUNT_ID=your_instagram_business_account_id_here
```

## Step 5: Test Connection

1. Start your development server
2. Go to `/socials` page
3. Toggle "Use Real Instagram API" checkbox
4. Click "Refresh Posts"
5. You should see your real Instagram posts!

## Troubleshooting

### Common Issues

1. **Token Invalid Error**
   - Token may have expired (60 days for Basic Display)
   - Generate new token in Facebook Developer Console

2. **Permissions Error**
   - Make sure Instagram account is added as tester
   - Verify all required permissions are granted

3. **No Posts Showing**
   - Check if Instagram account has public posts
   - Verify token has correct permissions

4. **Rate Limit Exceeded**
   - Instagram allows 200 requests per hour
   - Implement caching in production

### Debug Mode
Your page has built-in debugging:
- Toggle between real API and mock data
- View error messages in the data source indicator
- Check browser console for detailed error logs

## Production Considerations

1. **Token Management**
   - Set up automatic token refresh
   - Monitor token expiration
   - Implement error handling for expired tokens

2. **Caching**
   - Cache Instagram posts for 10-15 minutes
   - Reduce API calls and improve performance

3. **Fallback**
   - Always have mock data as fallback
   - Graceful degradation if API fails

## Security Notes

- Never expose App Secret in client-side code
- Keep access tokens secure in environment variables
- Use HTTPS for all OAuth redirect URIs
- Regularly rotate access tokens

## Need Help?

If you run into issues:
1. Check Facebook Developer Console for error messages
2. Verify your Instagram account settings
3. Test API calls in Graph API Explorer
4. Review Instagram Basic Display documentation

Your socials page is already built to handle both mock and real data seamlessly!
