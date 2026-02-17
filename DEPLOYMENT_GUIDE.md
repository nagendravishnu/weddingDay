# 🚀 Complete Netlify Deployment Guide for Your Wedding Site

## **Phase 1: Prepare Your Project**

### Step 1.1: Clean up your repository
Your project should have these files in root:
```
✅ index.html
✅ quiz.html
✅ timeline.html
✅ style.css
✅ quiz.css (if exists)
✅ home.js
✅ quiz.js
✅ timeline.js
✅ images/ (folder with all images)
✅ .gitignore (optional, but good to have)
```

### Step 1.2: Remove unnecessary files
Delete or don't commit:
- ❌ verify.js (old file)
- ❌ script.js (if not used)
- ❌ timer.js (if not used)
- ❌ .git folder (git handles this)

### Step 1.3: Create `.gitignore` (optional but recommended)
```
Create a file named: .gitignore
Content:
node_modules/
.DS_Store
*.log
.env
dist/
build/
```

---

## **Phase 2: Push to GitHub**

### Step 2.1: Create GitHub Account
1. Go to https://github.com/signup
2. Sign up with email
3. Verify email
4. Create account

### Step 2.2: Create New Repository
1. Click **"+"** icon → **New repository**
2. Repository name: `wedding-day` or `our-story` (anything you like)
3. Description: "Our Wedding Journey - Interactive Website"
4. Select **Public** (required for free Netlify)
5. Click **Create repository**

### Step 2.3: Push Your Code to GitHub

**Using Command Line (Best Method):**

Open PowerShell in your project folder and run:

```powershell
# Initialize git (if not already done)
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: Wedding day website"

# Add remote repository
git remote add origin https://github.com/YOUR_USERNAME/wedding-day.git

# Push to GitHub
git branch -M main
git push -u origin main
```

**Replace `YOUR_USERNAME` with your actual GitHub username!**

### Step 2.4: Verify on GitHub
1. Go to https://github.com/YOUR_USERNAME/wedding-day
2. You should see all your files listed
3. ✅ If you see your files, you're ready for Netlify!

---

## **Phase 3: Deploy to Netlify**

### Step 3.1: Create Netlify Account
1. Go to https://netlify.com
2. Click **Sign up**
3. Choose **Sign up with GitHub** (easiest)
4. Authorize Netlify to access GitHub
5. ✅ Account created!

### Step 3.2: Create New Site
1. On Netlify dashboard, click **Add new site** → **Import an existing project**
2. Choose **GitHub**
3. Authorize Netlify (confirm access)
4. Select your repository: `wedding-day`
5. Click **Deploy site**

### Step 3.3: Configure Build Settings (Usually Auto-Detected)
```
Build command: (leave empty - it's a static site)
Publish directory: . (current directory)
```
Click **Deploy wedding-day**

### Step 3.4: Wait for Deployment
⏳ Takes 30 seconds - 2 minutes

You'll see:
```
⏳ Building...
✅ Site is live! https://your-random-name.netlify.app
```

**✅ Your site is now LIVE!** 🎉

---

## **Phase 4: Add Custom Domain (OPTIONAL)**

### Step 4.1: Buy a Domain
Visit one of these:
- **Namecheap** (namecheap.com) - $2-3/year
- **PorkBun** (porkbun.com) - $2-3/year
- **GoDaddy** (godaddy.com) - $1-5/year
- **Google Domains** (domains.google.com) - $12/year

Search for a domain like:
- `robin-and-me.com`
- `our-wedding-story.com`
- `xxx-and-yyy.com` (where xxx and yyy are your names)

Buy and note down your domain name.

### Step 4.2: Connect Domain to Netlify
1. In Netlify dashboard, go to **Domain settings**
2. Click **Add domain**
3. Enter your domain (e.g., `robin-and-me.com`)
4. Netlify will show you **nameserver instructions**
5. Go to your domain provider (Namecheap, PorkBun, etc.)
6. Find **DNS settings** or **Nameservers**
7. Replace with Netlify's nameservers:
   ```
   dns1.p04.nsone.net
   dns2.p04.nsone.net
   dns3.p04.nsone.net
   dns4.p04.nsone.net
   ```
8. Save and wait 24-48 hours for DNS to propagate
9. ✅ Your domain is connected!

Now you can visit: `https://robin-and-me.com` 🎊

---

## **Phase 5: Auto-Deploy (Future Updates)**

### How It Works:
Every time you push to GitHub, Netlify **automatically redeploys** your site!

```powershell
# Make changes to your files
# Then:
git add .
git commit -m "Updated quiz questions"
git push

# ✅ Netlify sees the push and auto-deploys!
# Check status at netlify.com dashboard
```

---

## **Phase 6: Troubleshooting**

### **Issue: "Build failed"**
**Solution:**
- Check GitHub repo has correct files
- No syntax errors in HTML/CSS/JS
- All image paths correct (`images/quiz6.jpg`, not `/images/quiz6.jpg`)
- Check Netlify logs for specific error

### **Issue: "Images not loading"**
**Solution:**
- Image paths should be: `images/quiz6.jpg` (relative)
- Not: `/images/quiz6.jpg` or `C:/path/to/images`
- Not: `https://example.com/images/quiz6.jpg`

### **Issue: "Site not updating after push"**
**Solution:**
- Clear browser cache (Ctrl+Shift+Delete)
- Hard refresh (Ctrl+F5)
- Wait 2-3 minutes
- Check Netlify deployment logs

### **Issue: "Domain not connecting"**
**Solution:**
- Wait full 48 hours for DNS propagation
- Check DNS records in domain provider
- Verify nameservers exactly match Netlify's

### **Issue: "HTTPS not working"**
**Solution:**
- Netlify auto-generates HTTPS (usually 10 min)
- Go to Domain settings → Force HTTPS (toggle on)
- Wait 10 minutes

---

## **Quick Checklist** ✅

```
□ Project has all necessary files
□ GitHub account created
□ Repository pushed to GitHub
□ GitHub repo is PUBLIC
□ Netlify account created
□ Site deployed to Netlify
□ Site is live at netlify.app URL
□ (Optional) Domain purchased
□ (Optional) Domain connected to Netlify
□ HTTPS working (green lock icon)
□ All images loading correctly
□ All buttons working
□ Quiz functioning
□ Timeline scrolling working
□ Password verification working
```

---

## **Your Site is Now LIVE!** 🎉

### Share your site:
- ✅ Email the link to friends & family
- ✅ Share on WhatsApp, Instagram, etc.
- ✅ Add to your wedding invitations
- ✅ Perfect for showing your love story!

---

## **Need Help?**

### Common Questions:

**Q: Can people see my GitHub code?**
A: Yes, since repo is public. That's fine - it's just static HTML/CSS/JS.

**Q: Can I update my site later?**
A: Yes! Just push new code to GitHub, Netlify auto-deploys.

**Q: What if I want to add more photos?**
A: Add images to `images/` folder, push to GitHub, it auto-deploys.

**Q: Will it stay free?**
A: Yes! Netlify free tier is unlimited for static sites.

**Q: Can I use more than one domain?**
A: Yes! Add multiple domains in Netlify settings.

**Q: Is it fast?**
A: Super fast! CDN in 150+ countries.

**Q: Is it secure?**
A: Yes! HTTPS by default, no data issues.

---

## **Next Steps**

1. ✅ Follow this guide
2. ✅ Get your site live
3. ✅ Test all functionality
4. ✅ Add custom domain (optional)
5. ✅ Share with loved ones!

**Estimated time: 30 minutes to 2 hours**

Enjoy your live wedding site! 💕💒🎊
