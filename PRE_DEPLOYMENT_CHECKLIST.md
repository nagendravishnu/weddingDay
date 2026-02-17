# 📋 Pre-Deployment Checklist

## **File Structure Verification**

### ✅ Root Files Required:
```
✅ index.html         (Home/Verification page)
✅ quiz.html          (Quiz page)
✅ timeline.html      (Timeline page)
✅ style.css          (Main stylesheet)
✅ home.js            (Home page logic)
✅ quiz.js            (Quiz page logic)
✅ timeline.js        (Timeline page logic)
✅ images/            (Folder with images)
```

### ✅ Images Required in images/ folder:
```
✅ quiz6.jpg or quiz6.jpeg or quiz6.png
✅ quiz7.jpg or quiz7.jpeg or quiz7.png
✅ quiz8.jpg or quiz8.jpeg or quiz8.png
✅ quiz9.jpg or quiz9.jpeg or quiz9.png
✅ quiz10.jpg or quiz10.jpeg or quiz10.png
```

### ❌ Files to DELETE or NOT commit:
```
❌ verify.js         (Old file - not used)
❌ script.js         (Old file - not used)
❌ timer.js          (Old file - not used)
❌ quiz.css          (Styles in style.css now)
❌ .git/             (Git handles this)
❌ node_modules/     (Not needed)
```

---

## **Code Path Verification**

### ✅ All CSS Links (in HTML files):
```html
<link rel="stylesheet" href="style.css"> ✅ CORRECT
<!-- NOT: /style.css or C:/path/to/style.css -->
```

### ✅ All JS Links (in HTML files):
```html
<script src="home.js"></script>      ✅ CORRECT
<script src="quiz.js"></script>      ✅ CORRECT
<script src="timeline.js"></script>  ✅ CORRECT
<!-- NOT: /home.js or C:/path/to/home.js -->
```

### ✅ All Image Paths (in CSS & JS):
```css
/* In CSS: */
background: url('images/bg.jpg'); ✅ CORRECT
/* NOT: url('/images/bg.jpg') or url('C:/images/bg.jpg') */
```

```javascript
/* In quiz.js: */
img: "images/quiz6.jpg" ✅ CORRECT
/* NOT: img: "/images/quiz6.jpg" */
```

### ✅ All Navigation Links (in HTML):
```html
<a href="quiz.html">Quiz</a>       ✅ CORRECT
<a href="timeline.html">Timeline</a> ✅ CORRECT
<!-- NOT: href="/quiz.html" or href="C:/quiz.html" -->
```

---

## **Functionality Testing (Before Deploy)**

Test LOCALLY first (open index.html in browser):

- [ ] Page loads without errors
- [ ] "Start" button shows verification screen
- [ ] Verification password works (Qsg7889934%^@^**)
- [ ] Hint button shows hint text
- [ ] "Let's Go" button after correct password
- [ ] Quiz link navigates to quiz.html
- [ ] Quiz loads rules properly
- [ ] Rules checkbox/button work
- [ ] Quiz questions appear (text-based 1-5)
- [ ] Timer counts down (20s per question)
- [ ] Options are clickable and change color
- [ ] Score updates correctly
- [ ] After question 5, transition screen appears
- [ ] Photo quiz starts with image and question
- [ ] Photo quiz options work
- [ ] All 10 questions complete
- [ ] Final score shows percentage
- [ ] If > 70%, password section appears
- [ ] Copy password button works
- [ ] Timeline link appears if > 70%
- [ ] Retake quiz button reloads
- [ ] Timeline page asks for password
- [ ] Correct password unlocks timeline
- [ ] Timeline cards appear horizontally
- [ ] Mouse drag scrolling works
- [ ] Arrow keys scrolling works
- [ ] All emojis load correctly

---

## **Browser Console Check**

Open Developer Tools in your browser (F12) and check:

- [ ] **Console** tab - No red errors
- [ ] **Network** tab - No broken image files (404s)
- [ ] **Elements** tab - HTML structure looks correct

---

## **Responsive Design Test**

Test on different screen sizes:

- [ ] Works on mobile (flip phone to portrait/landscape)
- [ ] Works on tablet
- [ ] Works on desktop (1920px wide)
- [ ] All text is readable
- [ ] All buttons are clickable
- [ ] No overflow/scrolling issues
- [ ] Timeline scrolls smoothly on mobile

---

## **Before Git Push**

```powershell
# Make sure you're in correct directory
cd D:\weddingDay

# Check git status
git status

# Should show:
# - All your files
# - No old files (verify.js, script.js, timer.js)
# - images/ folder included

# If old files show up, delete them first
# Then:
git add .
git commit -m "Ready for deployment"
git push
```

---

## **Post-Deployment Testing**

After site is live on Netlify:

1. **Test Live URL:** `https://your-site.netlify.app`
   - [ ] Is it loading?
   - [ ] All images visible?
   - [ ] Scroll works?
   - [ ] Buttons interactive?

2. **Share Test:**
   - [ ] Send link to friend
   - [ ] Ask them to test on their phone
   - [ ] Check if they can complete quiz
   - [ ] Verify timeline password works

3. **Browser Compatibility:**
   - [ ] Chrome/Edge
   - [ ] Firefox
   - [ ] Safari (if available)
   - [ ] Mobile browser

4. **Performance Check:**
   - [ ] Site loads in < 3 seconds
   - [ ] No lag in interactions
   - [ ] Smooth animations
   - [ ] Images load immediately

---

## **Troubleshooting Guide**

| Problem | Solution |
|---------|----------|
| Images not loading | Check paths: use `images/quiz6.jpg` not `/images/quiz6.jpg` |
| Links not working | Check href uses file names only: `href="quiz.html"` |
| JS errors in console | Check script tags point correct files: `src="home.js"` |
| Page not updating | Hard refresh: Ctrl+Shift+Delete then reload |
| Buttons not responsive | Check browser console for JS errors |
| Navbar broken | Check CSS path: `href="style.css"` |

---

## **Final Checklist Before Telling People About Your Site**

- [ ] All functionality tested locally
- [ ] No console errors
- [ ] No broken images
- [ ] All 10 quiz questions working
- [ ] Timeline password system working
- [ ] Site deployed to Netlify
- [ ] Custom domain added (optional)
- [ ] HTTPS working (green lock icon)
- [ ] Tested on mobile
- [ ] Tested on desktop
- [ ] Ready to share! 🎉

---

**You're all set! Deploy away! 🚀💕**
