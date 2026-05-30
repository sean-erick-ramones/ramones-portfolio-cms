# SEO & Social Media Preview Testing Guide

## What Was Updated

All pages now have comprehensive SEO metadata including:

- **Meta tags**: `title`, `description`
- **Open Graph tags**: `og:title`, `og:description`, `og:image`, `og:url`, `og:type`
- **Twitter Card tags**: `twitter:card`, `twitter:title`, `twitter:description`, `twitter:image`, `twitter:site`
- **Canonical URLs**: For proper indexing
- **Article metadata**: For blog posts (published time, author)

### Updated Pages

1. **Homepage** (`/`) - Type: `website`
2. **About** (`/about`) - Type: `profile`
3. **Projects** (`/projects`) - Type: `website`
4. **Blog Index** (`/blog`) - Type: `website`
5. **Blog Posts** (`/blog/[slug]`) - Type: `article`

---

## Testing Tools

### 1. **Facebook/Meta Sharing Debugger** (Recommended)

**URL**: https://developers.facebook.com/tools/debug/

**How to use**:

1. Enter your URL: `https://www.seancramones.com`
2. Click "Debug"
3. Review the preview (title, description, image)
4. Click "Scrape Again" if you made changes

**Tests**: Facebook, LinkedIn, WhatsApp, Messenger

---

### 2. **Twitter/X Card Validator**

**URL**: https://cards-dev.twitter.com/validator

**How to use**:

1. Enter your URL
2. Click "Preview card"
3. See how it appears in Twitter/X feeds

**Note**: You need to be logged into Twitter/X developer account

---

### 3. **LinkedIn Post Inspector**

**URL**: https://www.linkedin.com/post-inspector/

**How to use**:

1. Enter your URL
2. Click "Inspect"
3. Review the preview
4. Click "Inspect" again after changes

---

### 4. **Social Share Preview** (All-in-one tool)

**URL**: https://socialsharepreview.com/

**How to use**:

1. Enter your URL
2. See previews for Facebook, Twitter, LinkedIn, Pinterest simultaneously

---

### 5. **OpenGraph.xyz** (Quick validator)

**URL**: https://www.opengraph.xyz/

**How to use**:

1. Enter your URL
2. Instantly see Open Graph tags
3. View preview for multiple platforms

---

### 6. **Metatags.io** (Visual preview)

**URL**: https://metatags.io/

**How to use**:

1. Enter your URL
2. See live previews for Google, Facebook, Twitter, LinkedIn
3. Edit and test different metadata

---

## Testing Checklist

For each page, verify:

- [ ] **Title** displays correctly (not too long, ~60 chars)
- [ ] **Description** is compelling (155-160 chars recommended)
- [ ] **Image** loads and displays properly (1200x630px recommended)
- [ ] **URL** is correct (no localhost or dev URLs)
- [ ] **Site name** shows as "Sean Erick C. Ramones"
- [ ] **Twitter handle** is `@ramones_sean`

---

## Recommended Image Sizes

- **Open Graph**: 1200 x 630 px
- **Twitter Card**: 1200 x 675 px (16:9) or 1200 x 628 px
- **Minimum**: 600 x 315 px
- **File size**: Under 8MB
- **Format**: JPG or PNG

---

## Common Issues & Solutions

### Issue: Old preview showing after update

**Solution**: Use "Scrape Again" in Facebook Debugger or wait 24 hours for cache to clear

### Issue: Image not displaying

**Solution**:

- Ensure image URL is absolute (starts with `https://`)
- Check image exists and is accessible
- Verify image meets size requirements

### Issue: Wrong title/description

**Solution**:

- Clear browser cache
- Use incognito mode
- Verify meta tags with "View Page Source"

### Issue: 404 error when sharing

**Solution**:

- Ensure page is deployed and accessible
- Check canonical URL matches actual URL
- Verify SSL certificate is valid

---

## Quick Test Commands

### View meta tags in terminal:

```bash
curl -s https://www.seancramones.com | grep -i "og:\|twitter:"
```

### Check specific page:

```bash
curl -s https://www.seancramones.com/blog/your-post | grep -i "og:image"
```

---

## Create Default OG Image

You need to create `/public/og-image.png` (1200x630px) with:

- Your name/brand
- Professional photo or logo
- Clean background
- Readable text

### Tools to create OG images:

- [Canva](https://www.canva.com/) - Templates available
- [Figma](https://www.figma.com/) - Design from scratch
- [OG Image Playground](https://og-playground.vercel.app/) - Generate programmatically

---

## Testing Workflow

1. **Deploy changes** to production
2. **Wait 2-3 minutes** for deployment to complete
3. **Test with Facebook Debugger** first (most strict)
4. **Test with Twitter Validator**
5. **Try actual sharing** on each platform
6. **Verify in incognito mode**

---

## Platform-Specific Notes

### Facebook/LinkedIn

- Caches aggressively (use debugger to refresh)
- Prefers 1200x630px images
- Reads `og:` tags first

### Twitter/X

- Prefers `twitter:` tags over `og:` tags
- Supports summary and summary_large_image cards
- Good fallback to `og:` tags

### WhatsApp

- Uses Facebook's cache
- Limited customization
- Falls back to `og:` tags

### Slack/Discord

- Good Open Graph support
- Shows rich previews automatically
- Respects `og:type` for different layouts

---

## Verification Checklist After Testing

- [ ] All pages load and display correct meta
- [ ] Images appear on all platforms
- [ ] No broken links in canonical URLs
- [ ] Twitter handle is correct
- [ ] Titles are not truncated
- [ ] Descriptions are compelling
- [ ] Mobile previews look good
- [ ] All tools show green/passing status

---

## Resources

- [Open Graph Protocol](https://ogp.me/) - Official OG specification
- [Twitter Cards Guide](https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/abouts-cards) - Twitter/X documentation
- [Nuxt SEO Docs](https://nuxt.com/docs/getting-started/seo-meta) - Nuxt SEO best practices

---

## Support

If previews still don't work after 24 hours:

1. Check server is returning correct headers
2. Verify robots.txt isn't blocking crawlers
3. Ensure page is publicly accessible (not behind auth)
4. Test with multiple validators
5. Check browser console for errors
