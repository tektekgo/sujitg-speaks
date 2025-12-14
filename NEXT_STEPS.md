# 5-Step Development Plan for speak.sujitg.com

## Quick Start for Next Developer

This is a condensed action plan extracted from CONTINUATION_PROMPT.md. Follow these 5 phases to enhance the speaking portfolio.

---

## Phase 1: Speaker Kit Downloads (Week 1-2)

**Goal:** Provide event organizers with downloadable speaker materials

**What to build:**
- Speaker bios section (short, medium, full bio options)
- One-pager PDF download
- Host intro script download
- Speaker photos gallery
- Media kit with logos and press materials

**Technical steps:**
1. Add `speakerKitAssets` table to `drizzle/schema.ts`
2. Run `pnpm db:push` to create the table
3. Create `SpeakerKitSection.tsx` component
4. Create `DownloadButton.tsx` component for file downloads
5. Add tRPC procedure: `speakerKit.getAssets` in `server/routers.ts`
6. Add query helper in `server/db.ts`
7. Use `storagePut()` helper to upload PDFs/images to S3
8. Add `/speaker-kit` route in `client/src/App.tsx`

**Key files to modify:**
- `drizzle/schema.ts` - Add table
- `server/routers.ts` - Add tRPC procedure
- `server/db.ts` - Add query helpers
- `client/src/pages/SpeakerKit.tsx` - New page
- `client/src/components/SpeakerKitSection.tsx` - New component

**Deployment:** Push to GitHub → Vercel auto-deploys

---

## Phase 2: Booking Form & Admin Dashboard (Week 2-3)

**Goal:** Capture event booking inquiries and manage them

**What to build:**
- Event inquiry form with validation (event name, date, format, audience, budget, contact info)
- Admin dashboard to view all booking inquiries
- Email notifications (Resend integration when mail.sujitg.com is ready)

**Technical steps:**
1. Create `BookingForm.tsx` component with React Hook Form
2. Add form validation using Zod schema
3. Create `AdminDashboard.tsx` component to display inquiries
4. Add tRPC procedures:
   - `booking.submit` (already exists, just add email integration)
   - `booking.list` (already exists)
   - `booking.updateStatus` (new - for marking pending/confirmed/declined)
5. Add query helpers in `server/db.ts` for status updates
6. Create `/book` route for the form
7. Create `/admin/bookings` route for dashboard (protected)
8. Add success confirmation message after form submission

**Key files to modify:**
- `client/src/pages/BookingForm.tsx` - New page
- `client/src/pages/AdminDashboard.tsx` - New page
- `client/src/components/BookingForm.tsx` - New component
- `server/routers.ts` - Add `booking.updateStatus` procedure
- `server/db.ts` - Add status update query

**Email integration (deferred):**
- When mail.sujitg.com is ready, add Resend API calls to `booking.submit` procedure
- Send confirmation to organizer + notification to speaking@sujitg.com

**Deployment:** Push to GitHub → Vercel auto-deploys

---

## Phase 3: Video Integration (Week 3-4)

**Goal:** Showcase speaking videos from past events

**What to build:**
- Video section with YouTube/Vimeo embeds
- Video placeholders for GSDC and AutoCon4 talks
- Video thumbnails and descriptions

**Technical steps:**
1. Add `videos` table to `drizzle/schema.ts` (title, description, url, talkId, type: youtube|vimeo)
2. Run `pnpm db:push`
3. Create `VideoEmbed.tsx` component (handles YouTube/Vimeo embeds)
4. Create `VideoCard.tsx` component (thumbnail + info)
5. Create `VideoSection.tsx` component
6. Add tRPC procedures:
   - `videos.list` - Get all videos
   - `videos.getByTalkId` - Get videos for specific talk
7. Add query helpers in `server/db.ts`
8. Create `/videos` route or add videos to `/talks` page
9. Seed database with placeholder video URLs

**Key files to modify:**
- `drizzle/schema.ts` - Add videos table
- `server/routers.ts` - Add video procedures
- `server/db.ts` - Add video query helpers
- `client/src/components/VideoEmbed.tsx` - New component
- `client/src/components/VideoCard.tsx` - New component
- `client/src/pages/Videos.tsx` - New page (optional)

**Content needed from user:**
- YouTube/Vimeo URLs for GSDC and AutoCon4 talks
- Video titles and descriptions

**Deployment:** Push to GitHub → Vercel auto-deploys

---

## Phase 4: Testimonials & Social Proof (Week 4)

**Goal:** Build credibility with quotes from event organizers

**What to build:**
- Testimonials section with quote cards
- Rotating testimonial carousel
- Author, role, company information
- Easy JSON-based editing

**Technical steps:**
1. Create `testimonials.json` config file in `client/public/` with quote data
2. Create `TestimonialCard.tsx` component
3. Create `TestimonialCarousel.tsx` component (rotating carousel)
4. Create `TestimonialsSection.tsx` component
5. Add tRPC procedure: `testimonials.list` (already exists, just use it)
6. Add testimonials section to landing page or create `/testimonials` route
7. Implement carousel rotation (on page load or on timer)

**Key files to modify:**
- `client/public/testimonials.json` - New config file
- `client/src/components/TestimonialCard.tsx` - New component
- `client/src/components/TestimonialCarousel.tsx` - New component
- `client/src/pages/Landing.tsx` - Add testimonials section

**Content needed from user:**
- Testimonial quotes from past event organizers
- Author names, roles, companies

**Deployment:** Push to GitHub → Vercel auto-deploys

---

## Phase 5: Testing, Optimization & Launch (Week 5)

**Goal:** Ensure quality and prepare for public launch

**What to build:**
- End-to-end testing of all features
- Mobile responsiveness testing
- Performance optimization
- SEO optimization
- Analytics setup

**Technical steps:**
1. **Testing:**
   - Test booking form end-to-end (submit → database → admin view)
   - Test AI chat with speaking-focused queries
   - Test video embeds on different devices
   - Test testimonials carousel
   - Mobile responsiveness on iPhone/Android

2. **Performance:**
   - Optimize images (compress, use WebP)
   - Lazy load components
   - Check Vercel Analytics dashboard
   - Monitor database query performance

3. **SEO:**
   - Add meta tags to pages (title, description, Open Graph)
   - Create sitemap.xml
   - Add JSON-LD structured data for talks
   - Test with Google Search Console

4. **Analytics:**
   - Set up Vercel Analytics
   - Track chat questions and popular topics
   - Monitor booking inquiries

5. **Final checks:**
   - Test on live site: https://speak.sujitg.com
   - Verify all links work
   - Check email notifications (when Resend is ready)
   - Get feedback from Sujit

**Key files to modify:**
- `client/src/App.tsx` - Add meta tags
- `client/public/sitemap.xml` - Create sitemap
- Various component files - Add lazy loading

**Deployment:** Push to GitHub → Vercel auto-deploys

---

## Development Workflow

### For Each Phase:
1. **Create feature branch:** `git checkout -b feature/phase-name`
2. **Make code changes** locally or in sandbox
3. **Test locally:** `pnpm dev` (http://localhost:3000)
4. **Commit changes:** `git add . && git commit -m "Add feature description"`
5. **Push to GitHub:** `git push origin feature/phase-name`
6. **Create Pull Request** (optional but recommended)
7. **Vercel auto-deploys** when merged to main
8. **Test on live site:** https://speak.sujitg.com

### Database Changes:
1. Update schema in `drizzle/schema.ts`
2. Run `pnpm db:push` (local) or push to GitHub (Vercel handles it)
3. Add query helpers in `server/db.ts`
4. Create tRPC procedures in `server/routers.ts`
5. Test in browser before deploying

---

## Key Commands

```bash
# Development
pnpm dev              # Start dev server (http://localhost:3000)
pnpm build            # Build for production
pnpm test             # Run Vitest tests

# Database
pnpm db:push          # Run migrations
pnpm db:studio        # Open database UI

# Git
git checkout -b feature/name    # Create feature branch
git add . && git commit -m "msg" # Commit changes
git push origin feature/name     # Push to GitHub
```

---

## Important Notes

1. **Database:** Neon PostgreSQL free tier is sufficient. Upgrade if you exceed 0.5 GB storage.
2. **LLM Cost:** OpenRouter paid tier ($10 credit) is active. Monitor usage in dashboard.
3. **Deployment:** Vercel auto-deploys from GitHub main branch (2-5 minutes).
4. **Rollback:** Use `webdev_rollback_checkpoint` if something breaks.
5. **Backups:** GitHub is your source of truth. Always commit before major changes.

---

## Success Metrics

- ✅ Booking form captures inquiries in database
- ✅ Admin can view and manage inquiries
- ✅ Videos embed and play correctly
- ✅ Testimonials display in carousel
- ✅ All pages mobile responsive
- ✅ Chat responds to speaking-focused queries
- ✅ No console errors on live site

---

## Resources

- **GitHub:** https://github.com/tektekgo/sujitg-speaks
- **Live Site:** https://speak.sujitg.com
- **Vercel Dashboard:** https://vercel.com/dashboard
- **Neon Dashboard:** https://console.neon.tech
- **OpenRouter Dashboard:** https://openrouter.ai
- **tRPC Docs:** https://trpc.io
- **Drizzle ORM Docs:** https://orm.drizzle.team
- **Tailwind CSS Docs:** https://tailwindcss.com

---

**Estimated Timeline:** 5 weeks for all phases  
**Team Size:** 1-2 developers  
**Difficulty:** Intermediate (familiar with React, Node.js, SQL)

Good luck! 🚀
