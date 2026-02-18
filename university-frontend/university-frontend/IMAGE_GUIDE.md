# Image Assets Guide

## 📸 How to Add Images to Your University Portal

There are **2 ways** to add images in this Vite + React project:

---

## **Method 1: Using the `public` folder** (Recommended for logos)

### Where to place images:
```
public/
  └── images/
      ├── logo.png          # University logo
      ├── hero-bg.jpg       # Hero background
      ├── event1.jpg        # Event images
      └── banner.jpg        # Other images
```

### How to use in components:
```jsx
<img src="/images/logo.png" alt="University Logo" />
```

### ✅ Advantages:
- Simple, direct path
- Good for static assets that don't change
- Images accessible at root level
- No import needed

---

## **Method 2: Using `src/assets` folder** (Recommended for component images)

### Where to place images:
```
src/
  └── assets/
      └── images/
          ├── logo.png
          ├── hero.jpg
          └── icons/
```

### How to use in components:
```jsx
import logo from './assets/images/logo.png';

<img src={logo} alt="University Logo" />
```

### ✅ Advantages:
- Optimized by Vite build process
- Better for images that are part of components
- Cache busting automatically handled
- TypeScript support

---

## 🎯 Quick Implementation Guide

### Step 1: Add your image files

Place your images in either:
- `public/images/` folder, OR
- `src/assets/images/` folder

### Step 2: Update components

I've updated your Header and Home components with both methods as examples.

---

## 📁 Recommended Image Structure

```
public/
  └── images/
      ├── logo.png              # Main university logo (200x200px recommended)
      ├── logo-white.png        # White version for dark backgrounds
      ├── hero-background.jpg   # Hero section background (1920x1080px)
      ├── events/
      │   ├── placement.jpg
      │   ├── techfest.jpg
      │   └── workshop.jpg
      └── partners/
          ├── company1.png
          └── company2.png
```

---

## 🖼️ Image Recommendations

### University Logo:
- **Format**: PNG with transparent background
- **Size**: 200x200px to 400x400px
- **File size**: < 100KB

### Hero Background:
- **Format**: JPG or WebP
- **Size**: 1920x1080px (Full HD)
- **File size**: < 500KB (optimized)

### Event Images:
- **Format**: JPG or PNG
- **Size**: 800x600px
- **File size**: < 200KB each

---

## 🎨 Where to Get Images

### Free Stock Photos:
- [Unsplash](https://unsplash.com) - High-quality free photos
- [Pexels](https://pexels.com) - Free stock images
- [Pixabay](https://pixabay.com) - Free images and videos

### Logo Creation:
- [Canva](https://canva.com) - Free logo maker
- [LogoMakr](https://logomakr.com) - Simple logo creator
- [Hatchful](https://hatchful.shopify.com) - Free logo generator

### University-themed Images Search:
- "university campus"
- "students studying"
- "graduation ceremony"
- "college building"
- "education technology"

---

## 💻 Example Usage in Your Project

### Header Component (Logo):
```jsx
// Method 1: Using public folder
<img src="/images/logo.png" alt="University Logo" className="logo-image" />

// Method 2: Using import
import logo from '../../assets/images/logo.png';
<img src={logo} alt="University Logo" className="logo-image" />
```

### Home Page (Hero Background):
```jsx
// As CSS background
<section className="hero-section" style={{backgroundImage: 'url(/images/hero-bg.jpg)'}}>

// Or in CSS file
.hero-section {
  background-image: url('/images/hero-bg.jpg');
}
```

### Event Cards (Thumbnails):
```jsx
<div className="event-image">
  <img src="/images/events/placement.jpg" alt="Placement Drive" />
</div>
```

---

## ⚡ Performance Tips

1. **Optimize images** before uploading:
   - Use tools like [TinyPNG](https://tinypng.com)
   - Compress without losing quality

2. **Use appropriate formats**:
   - PNG for logos/icons with transparency
   - JPG for photos
   - WebP for modern browsers (best compression)

3. **Lazy loading** for images below fold:
   ```jsx
   <img src="/images/event.jpg" loading="lazy" alt="Event" />
   ```

---

## 🚀 Next Steps

1. Download or create your university logo
2. Place it in `public/images/logo.png`
3. The components are already updated to use it!
4. Refresh your browser to see the changes

---

**Need help?** Check the updated Header.jsx and Home.jsx files to see examples!
