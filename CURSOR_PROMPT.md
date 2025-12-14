# Cursor IDE Prompt: Complete speak.sujitg.com Remaining Phases

Use this prompt in Cursor IDE to complete Phases 1-5 of the speaking portfolio website.

---

## System Context

You are building out the remaining phases of **speak.sujitg.com**, a professional speaking portfolio website for Sujit Gangadharan.

**Project Details:**
- **Live URL:** https://speak.sujitg.com
- **GitHub:** https://github.com/tektekgo/sujitg-speaks
- **Stack:** React 19 + Tailwind CSS 4 + Express.js + tRPC + PostgreSQL (Neon)
- **Hosting:** Vercel with automatic GitHub CI/CD
- **Status:** MVP complete (branding, talks system, AI chat) - Ready for feature expansion

**Completed Features:**
- ✅ Speaker branding and navigation
- ✅ 6 signature talks with expandable details
- ✅ AI concierge chat trained on professional background
- ✅ PostgreSQL database infrastructure

**Reference Documents:**
- `PROJECT_SUMMARY.md` - Complete project overview
- `CONTINUATION_PROMPT.md` - Detailed technical guide
- `NEXT_STEPS.md` - 5-phase development plan

---

## Phase 1: Speaker Kit Downloads

### Goal
Provide event organizers with downloadable speaker materials (bios, one-pager, host intro script, photos).

### Implementation Steps

1. **Database Schema**
   - Add `speakerKitAssets` table to `drizzle/schema.ts`
   - Fields: id, name, type (bio|one-pager|host-intro|photo), url, description, order
   - Run `pnpm db:push`

2. **Backend (tRPC)**
   - Add query helper in `server/db.ts`: `getSpeakerKitAssets()`
   - Add tRPC procedure in `server/routers.ts`: `speakerKit.getAssets`
   - Use `storagePut()` helper to upload files to S3

3. **Frontend Components**
   - Create `client/src/components/SpeakerKitSection.tsx` - Main section component
   - Create `client/src/components/DownloadButton.tsx` - Reusable download button
   - Create `client/src/components/BioCard.tsx` - Display bio options
   - Create `client/src/pages/SpeakerKit.tsx` - Full page view

4. **Routing**
   - Add `/speaker-kit` route in `client/src/App.tsx`
   - Add "Speaker Kit" link to navigation in header

5. **Styling**
   - Use Tailwind CSS grid for layout
   - Make download buttons prominent with blue accent color
   - Add icons for different file types (PDF, image, etc.)

### Content Needed
- **Short bio** (50-75 words)
- **Medium bio** (150-200 words)
- **Full bio** (300+ words)
- **One-pager PDF** (upload to S3)
- **Host intro script** (text or PDF)
- **Speaker photos** (see Photo Strategy section below)

### Database Seed
Create `seed-speaker-kit.mjs` to populate initial data:
```javascript
// Example structure
const assets = [
  { name: "Short Bio", type: "bio", description: "Perfect for event programs" },
  { name: "One-Pager", type: "one-pager", description: "Professional one-page overview" },
  // ... more assets
];
```

---

## Phase 2: Booking Form & Admin Dashboard

### Goal
Capture event booking inquiries and provide admin interface to manage them.

### Implementation Steps

1. **Frontend - Booking Form**
   - Create `client/src/pages/BookingForm.tsx`
   - Create `client/src/components/BookingForm.tsx` with React Hook Form
   - Fields: eventName, date, format (keynote|talk|panel|workshop), audience, budget, contactName, contactEmail, message
   - Add Zod validation schema
   - Show success message after submission
   - Add `/book` route in `client/src/App.tsx`

2. **Frontend - Admin Dashboard**
   - Create `client/src/pages/AdminDashboard.tsx`
   - Create `client/src/components/BookingCard.tsx` - Display individual inquiry
   - Create `client/src/components/BookingTable.tsx` - Table view of all inquiries
   - Add status management (pending, confirmed, declined)
   - Add export functionality (CSV/JSON)
   - Add `/admin/bookings` route (protected - requires authentication)

3. **Backend (tRPC)**
   - Add query helper in `server/db.ts`: `updateBookingStatus(id, status)`
   - Add tRPC procedure in `server/routers.ts`: `booking.updateStatus`
   - Update existing `booking.submit` to save to database (already done)
   - Add `booking.list` procedure for admin view (already exists)

4. **Email Integration (Deferred)**
   - When mail.sujitg.com is ready, add Resend API calls
   - Send confirmation email to organizer
   - Send notification to speaking@sujitg.com

5. **Styling**
   - Use Tailwind CSS for responsive form layout
   - Add form validation messages
   - Use card layout for inquiry display
   - Add status badges (pending=yellow, confirmed=green, declined=red)

### Content Needed
- None required (form is self-contained)

---

## Phase 3: Video Integration

### Goal
Showcase speaking videos from past events (YouTube/Vimeo embeds).

### Implementation Steps

1. **Database Schema**
   - Add `videos` table to `drizzle/schema.ts`
   - Fields: id, title, description, url, talkId (foreign key), type (youtube|vimeo), thumbnail, duration, order
   - Run `pnpm db:push`

2. **Backend (tRPC)**
   - Add query helper in `server/db.ts`: `getVideos()`, `getVideosByTalkId(talkId)`
   - Add tRPC procedures in `server/routers.ts`: `videos.list`, `videos.getByTalkId`

3. **Frontend Components**
   - Create `client/src/components/VideoEmbed.tsx` - Handles YouTube/Vimeo embeds
   - Create `client/src/components/VideoCard.tsx` - Video thumbnail + info
   - Create `client/src/components/VideoSection.tsx` - Grid of videos
   - Create `client/src/pages/Videos.tsx` - Full page view (optional)

4. **Integration with Talks**
   - Add video section to individual talk cards on `/talks` page
   - Show video thumbnail and play button
   - Link videos to corresponding talks

5. **Styling**
   - Use aspect-ratio for responsive video containers
   - Add play button overlay on thumbnails
   - Use Tailwind grid for responsive layout

### Content Needed
- **AutoCon 4 Video URL:** https://www.youtube.com/watch?v=b8DZzlM0beo&t=1s
  - Talk: "AI-Native Architecture: Building for the Future"
  - Duration: Extract from YouTube metadata
  - Thumbnail: Extract from YouTube (https://img.youtube.com/vi/{VIDEO_ID}/maxresdefault.jpg)

### Database Seed
Create `seed-videos.mjs`:
```javascript
const videos = [
  {
    title: "AI-Native Architecture: Building for the Future",
    description: "Talk from AutoCon 4 about building AI-native systems",
    url: "https://www.youtube.com/watch?v=b8DZzlM0beo&t=1s",
    type: "youtube",
    talkId: 6, // AI-Native Architecture talk
    thumbnail: "https://img.youtube.com/vi/b8DZzlM0beo/maxresdefault.jpg",
    duration: "45:30" // Extract from video
  }
];
```

---

## Phase 4: Testimonials & Social Proof

### Goal
Build credibility with quotes from event organizers and past attendees.

### Implementation Steps

1. **Frontend - Testimonials**
   - Create `client/src/components/TestimonialCard.tsx` - Individual quote card
   - Create `client/src/components/TestimonialCarousel.tsx` - Rotating carousel
   - Create `client/src/components/TestimonialsSection.tsx` - Full section
   - Add testimonials section to landing page or create `/testimonials` route

2. **Data Management**
   - Create `client/public/testimonials.json` - JSON config file for easy editing
   - Structure: Array of {quote, author, role, company, image}

3. **Carousel Features**
   - Auto-rotate testimonials every 5 seconds
   - Manual navigation (prev/next buttons)
   - Dot indicators for current slide
   - Smooth transitions

4. **Styling**
   - Use card layout with quote marks
   - Add author photo (small circular image)
   - Use light background to make quotes stand out
   - Responsive on mobile

### Content Needed
- **Testimonial quotes** from past event organizers or attendees
  - Quote text (100-200 words)
  - Author name
  - Author role (e.g., "Event Director")
  - Company/Organization name
  - Author photo (optional, can use placeholder)

### Example Structure
```json
[
  {
    "quote": "Sujit's talk on AI-native architecture was transformative...",
    "author": "Jane Doe",
    "role": "Event Director",
    "company": "AutoCon 4",
    "image": "/testimonials/jane-doe.jpg"
  }
]
```

---

## Phase 5: Testing, Optimization & Launch

### Goal
Ensure quality, performance, and SEO readiness.

### Implementation Steps

1. **Testing**
   - Test booking form end-to-end (submit → database → admin view)
   - Test AI chat with speaking-focused queries
   - Test video embeds on different devices
   - Test testimonials carousel
   - Mobile responsiveness on iPhone/Android
   - Run `pnpm test` for unit tests

2. **Performance**
   - Optimize images (compress, use WebP)
   - Lazy load components (React.lazy())
   - Check Vercel Analytics dashboard
   - Monitor database query performance in Neon dashboard

3. **SEO**
   - Add meta tags to pages (title, description, Open Graph)
   - Create `client/public/sitemap.xml`
   - Add JSON-LD structured data for talks
   - Update `client/index.html` with meta tags

4. **Analytics**
   - Set up Vercel Analytics
   - Track chat questions and popular topics
   - Monitor booking inquiries

5. **Final Checks**
   - Test on live site: https://speak.sujitg.com
   - Verify all links work
   - Check email notifications (when Resend is ready)
   - Get feedback from Sujit

---

## Speaker Photo Strategy

Since you don't have many stage photos, here are professional alternatives:

### Option 1: Video Thumbnails (Recommended)
- Extract high-quality thumbnails from your AutoCon 4 video
- Use YouTube's thumbnail URL: `https://img.youtube.com/vi/b8DZzlM0beo/maxresdefault.jpg`
- These are professional and authentic
- Can be used in:
  - Speaker Kit section
  - Video cards
  - Testimonials section (as speaker photo)

### Option 2: Professional Headshot
- Take a professional headshot photo
- Use consistent lighting and neutral background
- Can be used in:
  - Speaker Kit section
  - About section
  - Testimonials section

### Option 3: Hybrid Approach
- Use video thumbnail for "in action" photos
- Use professional headshot for formal sections
- Mix both for visual variety

### Implementation
1. Download video thumbnail from YouTube: `https://img.youtube.com/vi/b8DZzlM0beo/maxresdefault.jpg`
2. Optimize image (compress, convert to WebP)
3. Upload to S3 using `storagePut()` helper
4. Reference in components
5. Add alt text for accessibility

### Recommended Placements
- **Speaker Kit section:** Video thumbnail + professional headshot
- **Video cards:** YouTube thumbnail (auto-generated)
- **Testimonials:** Professional headshot or video thumbnail
- **About section:** Professional headshot
- **Navigation/Footer:** Small logo or initials (already have SG logo)

---

## Cursor IDE Usage

### How to Use This Prompt

1. **Open Cursor IDE**
2. **Clone the repository:**
   ```bash
   git clone https://github.com/tektekgo/sujitg-speaks.git
   cd sujitg-speaks
   ```

3. **Set up environment:**
   ```bash
   pnpm install
   cp .env.example .env
   # Add your DATABASE_URL and OPENROUTER_API_KEY
   ```

4. **Start dev server:**
   ```bash
   pnpm dev
   ```

5. **Open Cursor Composer or Chat:**
   - Use `Cmd+Shift+P` (Mac) or `Ctrl+Shift+P` (Windows)
   - Select "Cursor: Open Composer"
   - Paste this prompt
   - Add specific phase instructions below

6. **Provide Phase-Specific Instructions:**
   - Specify which phase to work on (1, 2, 3, 4, or 5)
   - Provide content (bios, testimonials, video URLs)
   - Ask for specific file structure or styling preferences

---

## Phase-Specific Prompts for Cursor

### For Phase 1 (Speaker Kit):
```
Complete Phase 1: Speaker Kit Downloads

Content to use:
- Short bio: [YOUR SHORT BIO HERE]
- Medium bio: [YOUR MEDIUM BIO HERE]
- Full bio: [YOUR FULL BIO HERE]

Follow the implementation steps in the main prompt.
Create all necessary files and database schema.
Test locally with `pnpm dev` before pushing.
```

### For Phase 3 (Videos):
```
Complete Phase 3: Video Integration

Video to add:
- Title: AI-Native Architecture: Building for the Future
- URL: https://www.youtube.com/watch?v=b8DZzlM0beo&t=1s
- Talk: AI-Native Architecture (talkId: 6)

Follow the implementation steps in the main prompt.
Extract thumbnail from YouTube.
Create database schema and seed script.
Test video embeds on different devices.
```

### For Phase 4 (Testimonials):
```
Complete Phase 4: Testimonials & Social Proof

Testimonials to add:
[PASTE YOUR TESTIMONIALS JSON HERE]

Follow the implementation steps in the main prompt.
Create carousel component with auto-rotate.
Add testimonials section to landing page.
Test carousel on mobile devices.
```

---

## Important Notes for Cursor

1. **Always run migrations:** After schema changes, run `pnpm db:push`
2. **Test locally first:** Use `pnpm dev` before pushing to GitHub
3. **Commit frequently:** Small, focused commits are better than large ones
4. **Push to GitHub:** Vercel will auto-deploy
5. **Check Vercel logs:** If deployment fails, check logs for errors
6. **Database:** Use Neon dashboard to verify schema and data
7. **API costs:** Monitor OpenRouter usage for LLM costs

---

## Proactive Inputs You Can Provide

To speed up development, gather these inputs before starting:

### Phase 1 - Speaker Kit
- [ ] Short bio (50-75 words)
- [ ] Medium bio (150-200 words)
- [ ] Full bio (300+ words)
- [ ] One-pager PDF file
- [ ] Host intro script (text or PDF)
- [ ] Speaker photos (or use video thumbnail strategy)

### Phase 3 - Videos
- [ ] AutoCon 4 video URL (you have this: https://www.youtube.com/watch?v=b8DZzlM0beo&t=1s)
- [ ] GSDC video URL (if available)
- [ ] Other talk recordings (if available)
- [ ] Video descriptions/summaries

### Phase 4 - Testimonials
- [ ] Testimonial quotes from event organizers
- [ ] Author names and roles
- [ ] Company/organization names
- [ ] Author photos (optional)

### Phase 2 - Booking Form
- [ ] No inputs needed (form is self-contained)
- [ ] Email address for notifications (speaking@sujitg.com)

---

## Success Checklist

After completing all phases, verify:

- [ ] Speaker Kit page displays bios and download buttons
- [ ] Booking form captures inquiries and saves to database
- [ ] Admin dashboard shows all bookings with status management
- [ ] Video embeds play correctly (YouTube/Vimeo)
- [ ] Testimonials carousel rotates automatically
- [ ] All pages are mobile responsive
- [ ] No console errors on live site
- [ ] Chat responds to speaking-focused queries
- [ ] Navigation links work correctly
- [ ] Images are optimized and load quickly

---

## Deployment

After completing each phase:

1. **Commit to GitHub:**
   ```bash
   git add .
   git commit -m "Complete Phase X: [Feature Name]"
   git push origin main
   ```

2. **Vercel auto-deploys** (2-5 minutes)

3. **Test on live site:** https://speak.sujitg.com

4. **Check Vercel logs** if issues occur

---

## Support Resources

- **GitHub:** https://github.com/tektekgo/sujitg-speaks
- **Vercel Dashboard:** https://vercel.com/dashboard
- **Neon Database:** https://console.neon.tech
- **tRPC Docs:** https://trpc.io
- **Drizzle ORM:** https://orm.drizzle.team
- **Tailwind CSS:** https://tailwindcss.com
- **React Docs:** https://react.dev

---

**Last Updated:** December 14, 2025  
**Version:** 1.0  
**Status:** Ready for Cursor IDE Implementation
