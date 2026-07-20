# Blog Management Scripts

## Quick Start: Adding Blog Posts from Notion

### Method 1: Using the Auto-Update Script (Recommended)

1. **Export from Notion**
   - In Notion, go to your page → `...` menu → Export → Markdown & CSV
   - Save the `.md` file

2. **Copy to blog directory**

   ```bash
   cp ~/Downloads/your-notion-export.md content/blog/my-post-slug.md
   ```

3. **Auto-update front matter**

   ```bash
   # Update all blog posts
   pnpm blog:update

   # Update a specific file
   pnpm blog:update-file content/blog/my-post-slug.md

   # Refresh images for all posts (fetches new random tech images)
   pnpm blog:refresh-images
   ```

The script will automatically:

- ✅ Extract title from your first H1 heading
- ✅ Generate description from first paragraph
- ✅ Calculate reading time from word count
- ✅ Extract date if present in content
- ✅ Add your author info
- ✅ Fetch random tech-related images from Pexels (if API key is set)
- ✅ Preserve existing images (unless --refresh-images flag is used)

### Method 2: Using the Template

1. **Copy the template**

   ```bash
   cp scripts/blog-template.md content/blog/my-new-post.md
   ```

2. **Edit the file**
   - Replace placeholder content with your Notion export
   - Manually update front matter if needed

3. **Optional: Auto-update front matter**
   ```bash
   pnpm blog:update-file content/blog/my-new-post.md
   ```

## Script Features

### What Gets Auto-Generated

| Field         | How It's Generated                                                    |
| ------------- | --------------------------------------------------------------------- |
| `title`       | First H1 heading in content                                           |
| `description` | First meaningful paragraph (max 200 chars)                            |
| `date`        | Extracted from content patterns like `[October 2024]` or current date |
| `minRead`     | Word count ÷ 200 (avg reading speed)                                  |
| `author`      | Always uses your configured author info                               |
| `image`       | Keeps existing image or uses default                                  |

### Front Matter Schema

```yaml
---
title: 'Required: Post title'
description: Brief description for SEO and previews
date: 2025-01-01 # YYYY-MM-DD format
image: https://... # Featured image URL
minRead: 5 # Estimated reading time in minutes
author:
  name: Sean Erick C. Ramones
  avatar:
    src: avatars/profile-image-1.png
    alt: Sean Erick C. Ramones
---
```

## Tips for Notion Exports

1. **Use clear H1 headings** - The first H1 becomes your post title
2. **Write a good intro paragraph** - It becomes your description
3. **Include dates in brackets** - e.g., `[October 2024]` will be auto-detected
4. **Use descriptive filenames** - e.g., `atomic-design-principles.md` not `Untitled.md`

## Common Issues

**Problem:** Script generates wrong title

- **Solution:** Make sure your first heading is an H1 (`#`) not H2 (`##`)

**Problem:** Description is too short

- **Solution:** Write a longer introduction paragraph (at least 50 characters)

**Problem:** Date is wrong

- **Solution:** Manually set the date in front matter, or include it in content like `[Month Year]`

## Configuration

### Author Info

To change default author info, edit:

```javascript
// scripts/update-blog-frontmatter.mjs
const AUTHOR = {
  name: 'Your Name',
  avatar: {
    src: 'path/to/image.png',
    alt: 'Your Name'
  }
}
```

### Pexels API (Optional but Recommended)

To automatically fetch tech-related images:

1. **Get a free API key:**
   - Go to https://www.pexels.com/api/
   - Create a free account
   - Copy your API key (no rate limits!)

2. **Set environment variable:**

   ```bash
   # Add to your ~/.bashrc or ~/.zshrc
   export NUXT_PEXELS_API_KEY="your_api_key_here"

   # Or use a .env file in project root
   echo "NUXT_PEXELS_API_KEY=your_api_key_here" >> .env
   ```

3. **Run the script with image fetching:**

   ```bash
   # New posts will automatically get random tech images
   pnpm blog:update

   # Force refresh all existing images
   pnpm blog:refresh-images
   ```

**Note:** Without an API key, the script will use a default fallback image.

**Benefits of Pexels API:**

- ✅ Completely free with no rate limits
- ✅ High-quality curated images
- ✅ No attribution required
- ✅ Large collection of tech-related photos

## Examples

See existing blog posts in `content/blog/` for examples of proper formatting.
