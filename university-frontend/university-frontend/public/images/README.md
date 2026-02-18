# 📸 Quick Start: Adding Images

## Step 1: Add Your Logo

1. **Get your university logo image** (PNG with transparent background recommended)
2. **Place it here**: `public/images/logo.png`
3. **Update Header component**:

Open: `src/components/Header/Header.jsx`

Find this line (around line 9):
```jsx
const useEmoji = true;
```

Change to:
```jsx
const useEmoji = false;
```

4. **Save and refresh** - Your logo will appear!

---

## Step 2: Add Hero Background Image (Optional)

1. **Get a hero image** (1920x1080px recommended)
   - Try searching "university campus" on Unsplash.com
2. **Place it here**: `public/images/hero-bg.jpg`
3. **Update Home page CSS**:

Open: `src/pages/Home/Home.css`

Find `.hero-section` and add:
```css
.hero-section {
  background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
  /* Add this line: */
  background-image: linear-gradient(rgba(30, 64, 175, 0.8), rgba(59, 130, 246, 0.8)), 
                    url('/images/hero-bg.jpg');
  background-size: cover;
  background-position: center;
  color: white;
  padding: 80px 0;
  text-align: center;
}
```

---

## Step 3: Add Event Images (Optional)

1. **Download 4 event images** (800x600px each)
2. **Place them here**:
   - `public/images/events/placement.jpg`
   - `public/images/events/techfest.jpg`
   - `public/images/events/workshop.jpg`
   - `public/images/events/industry-meet.jpg`

3. **Update Home.jsx** - Already configured to accept images!

---

## 🎨 Where to Get Free Images?

### Stock Photos (Free):
- **Unsplash.com** - High quality, no attribution required
- **Pexels.com** - Free stock photos and videos
- **Pixabay.com** - Free images

### Search terms to use:
- "university campus"
- "students studying"
- "graduation ceremony"
- "college building"
- "technology education"
- "career placement"

---

## ✅ That's it!

Your images will automatically:
- Load correctly
- Be optimized by Vite
- Work in production builds
- Have proper fallbacks

**Need more help?** Check `IMAGE_GUIDE.md` for detailed documentation.
