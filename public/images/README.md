# Sierra Tours & Safaris - Image Organization

This document describes the organized structure of all images migrated from the WordPress site.

## 📁 Directory Structure

```
public/images/
├── about/              # About page images (currently empty)
├── blog/               # Blog post images and stock photos
│   ├── posts/          # Blog post featured images
│   └── thumbnails/     # Blog thumbnails
├── destinations/       # Destination-specific images
│   ├── kenya/          # Kenya destination images
│   └── tanzania/       # Tanzania destination images
├── general/            # General purpose images
│   ├── backgrounds/    # Background images
│   ├── icons/          # UI icons and frames
│   └── logos/          # Site logos
├── hero/               # Hero banner images
│   ├── banners/        # Main banner images
│   └── slideshow/      # Slideshow images
├── safaris/            # Safari/trip images (main folder)
│   ├── botswana/       # Botswana safaris (12 files)
│   ├── egypt/          # Egypt safaris (10 files)
│   ├── other/          # General safari images (278 files)
│   ├── rwanda/         # Rwanda safaris (34 files)
│   ├── uganda/         # Uganda safaris (empty)
│   └── zambia/         # Zambia safaris (38 files)
├── team/               # Team member photos (empty)
└── testimonials/       # Testimonial photos (5 files)
```

## 📊 Image Count Summary

| Category | Count | Description |
|----------|-------|-------------|
| **safaris/other** | 278 | General safari images including Kenya, Tanzania, multi-country tours |
| **general** | 285 | Placeholders, backgrounds, stock photos, logos |
| **blog** | 107 | Blog post images, Unsplash photos, stock images |
| **hero** | 65 | Banner images, hero backgrounds, luxury safari photos |
| **safaris/zambia** | 38 | Zambia-specific safari images |
| **safaris/rwanda** | 34 | Rwanda-specific safari images |
| **safaris/botswana** | 12 | Botswana-specific safari images |
| **safaris/egypt** | 10 | Egypt-specific safari images |
| **general/logos** | 7 | Site logos and branding |
| **testimonials** | 5 | Customer testimonial photos |
| **hero/banners** | 10 | Main banner images |
| **hero/slideshow** | 5 | Slideshow/carousel images |
| **TOTAL** | **834** | All images from WordPress |

## 🖼️ Key Images Reference

### Hero/Banner Images
- `/images/hero/sierra-tours-and-travel-luxury-safaris-scaled-ras5mxcvjkwgb2j7xd519ueuyycgwfi5kwkvxfrue8.jpg` - Main hero banner
- `/images/hero/banners/banner-image.webp` - Alternative banner

### Popular Safari Images
- `/images/safaris/botswana/sierra-tours-and-safaris-botswana-safaris-image01-rae4xy0bfoxnp5zs0q0hvq2fjiy1hbwlkskzwr3qu8.jpeg`
- `/images/safaris/zambia/sierra-tours-and-travel-9-NIGHTS-THE-SECRET-OF-ZAMBIA-SAFARI-image-02-rbamxap3bb5iida8l1lkt1voc60nzqtcg8dv6obj4w.jpg`
- `/images/safaris/other/sierra-tours-and-safaris-7DAYS06NIGHT-TARANGIRE-NGORONGORO-SERENGETI-Group-tour-image03-ra1pcbh1j4lg3dxna0os6fw62mygbuxdtr0cssxrj4.jpg`
- `/images/safaris/other/sierra-tours-and-safaris-mount-kenya-safaris-image01-raf9sp372ga7w3n6uyoht3210vsmfvou4capo4ekyo.jpg`

### Logos
- `/images/general/logos/sierra-tours-and-safaris-logo.png` - Main logo

## 📝 Usage in Components

```tsx
// Hero Banner
<Image src="/images/hero/sierra-tours-and-travel-luxury-safaris-scaled-ras5mxcvjkwgb2j7xd519ueuyycgwfi5kwkvxfrue8.jpg" ... />

// Safari Cards
<Image src="/images/safaris/botswana/sierra-tours-and-safaris-botswana-safaris-image01-rae4xy0bfoxnp5zs0q0hvq2fjiy1hbwlkskzwr3qu8.jpeg" ... />

// Blog Posts
<Image src="/images/blog/franck-v-512278-unsplash.jpg" ... />
```

## 🔄 Migration Source

All images were migrated from:
```
wordpress files/uploads_extracted/uploads/
├── 2025/08/, 09/, 10/, 11/, 12/
├── 2026/01/, 02/, 03/, 04/
└── elementor/thumbs/
```

Original WordPress date-based structure has been reorganized by content type for easier management.
