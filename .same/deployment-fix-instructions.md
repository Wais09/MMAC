# 🚨 URGENT: Live Site Fix Instructions

## 🎯 **WHAT I FIXED:**

### ✅ **1. Image Path Issues**
- Fixed case sensitivity issue: `womens-muaythai2.jpg` → `Womens-muaythai2.jpg`
- Added `.gitkeep` files to ensure `/public/uploads/` directory deploys to Netlify
- All images should now be accessible on live site after deployment

### ✅ **2. Google Reviews API Setup**
- Created diagnostic test page at `/test-reviews`
- Confirmed API route exists and is properly configured
- Issue: Environment variables NOT set in Netlify dashboard

## 🔧 **IMMEDIATE ACTIONS REQUIRED:**

### **Step 1: Set Environment Variables on Netlify**
1. **Go to**: https://app.netlify.com/sites/mmac/settings/deploys#environment-variables
2. **Click**: "Add variable"
3. **Add these EXACT variables:**

```
Variable name: NEXT_PUBLIC_GOOGLE_PLACES_API_KEY
Value: AIzaSyCtldMho592v2hLQI1WoE5Wkl_y4iMDC_o

Variable name: NEXT_PUBLIC_GOOGLE_PLACE_ID
Value: ChIJLeH5UMKxEmsRo6OV-6uCSR4

Variable name: NEXTAUTH_SECRET
Value: d6b60c771236f6012eed5eb6e858326e

Variable name: NEXTAUTH_URL
Value: https://mmac.netlify.app

Variable name: DATABASE_URL
Value: postgresql://postgres.myameoaohqscvrktzyjm:MachinE33@db.myameoaohqscvrktzyjm.supabase.co:5432/postgres
```

### **Step 2: Force New Deployment**
1. Go to your Netlify dashboard
2. Click "Site deploys"
3. Click "Trigger deploy" → "Deploy site"
4. Wait for build to complete (5-10 minutes)

### **Step 3: Test the Fixes**
1. **Test Images**: Visit your live site and check if style page photos load
2. **Test Google Reviews**: Visit `https://mmac.netlify.app/test-reviews`
3. **Expected Results**:
   - ✅ All images should load correctly
   - ✅ Google Reviews should show "Connected to live Google Business reviews!"
   - ✅ Test page should show 5+ live reviews

## 🐛 **IF ISSUES PERSIST:**

### **Images Still Not Loading:**
- Check browser console for 404 errors
- Verify `/uploads/` directory exists in GitHub repo
- Clear browser cache (Ctrl+F5)

### **Google Reviews Still Not Working:**
- Double-check environment variable names (case-sensitive)
- Ensure no extra spaces in values
- Check `/test-reviews` page for specific error messages

## 📞 **IMMEDIATE TESTING:**

1. **After setting environment variables**, visit: `https://mmac.netlify.app/test-reviews`
2. **Click "Test Google Reviews API"**
3. **Should show**: "✅ Successfully fetched reviews: X reviews"

## 🎯 **SUCCESS CRITERIA:**
- ✅ Images visible on all style pages
- ✅ Google Reviews showing live data on homepage
- ✅ Test page confirms API connection working
- ✅ All environment variables properly configured

---

**🔥 PRIORITY**: Set environment variables FIRST, then trigger deployment!
