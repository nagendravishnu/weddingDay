# ⚡ Quick Start: Deploy in 5 Minutes

## **The 5-Minute Path**

### **1. Push to GitHub** (2 min)
```powershell
cd D:\weddingDay
git init
git add .
git commit -m "Wedding day website"
git remote add origin https://github.com/YOUR_USERNAME/wedding-day.git
git branch -M main
git push -u origin main
```

### **2. Go to Netlify** (1 min)
- Visit https://netlify.com
- Sign up with GitHub
- Click "Add new site" → Import from GitHub
- Select your `wedding-day` repo

### **3. Deploy** (1 min)
- Click "Deploy site"
- Wait for green checkmark
- Copy your `.netlify.app` URL
- ✅ Live!

### **4. (Optional) Add Domain** (1 min setup)
- Buy domain on Namecheap ($2)
- In Netlify: Domain settings → Add domain
- Update nameservers in Namecheap
- Wait 24-48 hours
- ✅ Custom domain live!

---

## **Critical Checklist Before Deploying**

Before you push to GitHub, verify:

✅ All image paths are **relative** (not absolute)
```
CORRECT:  images/quiz6.jpg
WRONG:    /images/quiz6.jpg
WRONG:    C:\weddingDay\images\quiz6.jpg
WRONG:    https://example.com/images/quiz6.jpg
```

✅ All HTML files link correctly:
```html
<a href="quiz.html">Quiz</a> ← CORRECT
<a href="/quiz.html">Quiz</a> ← WRONG
```

✅ All JavaScript files are included:
```html
<script src="home.js"></script> ← CORRECT path
<script src="/home.js"></script> ← WRONG
```

✅ No console errors when opening locally

✅ All images actually exist in `images/` folder:
- quiz6.jpg
- quiz7.jpg
- quiz8.jpg
- quiz9.jpg
- quiz10.jpg

---

## **Key URLs to Remember**

After deployment:

```
Netlify Dashboard: https://app.netlify.com
Your Live Site: https://your-site-name.netlify.app
GitHub Repo: https://github.com/YOUR_USERNAME/wedding-day
```

---

## **After Going Live**

**Test everything:**
1. Open on phone
2. Test all buttons
3. Enter wrong password (should fail)
4. Complete quiz
5. Check timeline works
6. Test modal scrolling

**Share your link:**
```
"Check out our wedding website: https://robin-and-me.com 💕"
```

---

## **Any Issues?**

1. **Images broken?** → Check paths in HTML
2. **Site not updating?** → Clear cache (Ctrl+Shift+Delete)
3. **Build failed?** → Check Netlify logs
4. **Password not working?** → Check browser console for JS errors

---

**You've got this! 🚀💕**
