# speak.sujitg.com - Continuation Prompt for Future Development

Use this prompt when continuing development of the speaking portfolio website.

---

## Project Context

**Project Name:** speak.sujitg.com - Professional Speaking Portfolio  
**Live URL:** https://speak.sujitg.com  
**GitHub:** https://github.com/tektekgo/sujitg-speaks  
**Hosting:** Vercel + Neon PostgreSQL  
**Domain:** Configured with Cloudflare DNS

**Current Status:** MVP complete with AI-powered chat, signature talks system, and database infrastructure. Ready for feature enhancement.

---

## Technology Stack

- **Frontend:** React 19 + Tailwind CSS 4 + Vite
- **Backend:** Express.js 4 + tRPC 11 + Drizzle ORM
- **Database:** PostgreSQL (Neon) - Free tier
- **LLM:** OpenRouter (Paid tier with $10 credit)
- **Deployment:** Vercel with automatic GitHub CI/CD

---

## Project Structure

```
/home/ubuntu/ai-native-portfolio/
├── client/src/pages/          # React pages (Landing, AIChat, Talks, etc.)
├── client/src/components/     # React components (TalkCard, AIChatBox, etc.)
├── server/routers.ts          # tRPC procedure definitions
├── server/db.ts               # Database query helpers
├── drizzle/schema.ts          # PostgreSQL table definitions
├── seed-talks.mjs             # Seed script for talks data
└── package.json               # Dependencies and scripts
```

---

## Key Features Implemented

✅ **Branding & Navigation** - Speaker logo, hero section, navigation menu  
✅ **Signature Talks System** - 6 talks with expandable details, /talks page  
✅ **AI Concierge Chat** - Public chat interface trained on professional background  
✅ **Database Infrastructure** - PostgreSQL with conversations, messages, talks, bookings tables  
✅ **Deployment** - Vercel + Neon PostgreSQL, automatic CI/CD from GitHub  

---

## Remaining Features to Build

### Phase 4: Speaker Kit Downloads
**Purpose:** Provide event organizers with downloadable materials

**What to build:**
- Speaker bios section (short, medium, full bio)
- One-pager PDF download
- Host intro script download
- Speaker photos gallery
- Media kit with logos and press materials

**Database tables needed:**
- `speakerKitAssets` - Store file metadata (name, type, url, description)

**Frontend components:**
- `SpeakerKitSection.tsx` - Display bios and downloads
- `DownloadButton.tsx` - Download file with tracking

**Backend:**
- `speakerKit.getAssets` tRPC procedure
- Query helpers in `server/db.ts`

**Implementation notes:**
- Store PDFs and images in S3 (use `storagePut` helper)
- Display previews of one-pager and host intro script
- Make downloads easy and prominent

---

### Phase 5: Booking Form & Admin Dashboard
**Purpose:** Capture event booking inquiries and manage them

**What to build:**
- Event inquiry form with validation
- Form fields: event name, date, format, audience, budget, contact name, contact email, message
- Admin dashboard to view all booking inquiries
- Email notifications to speaking@sujitg.com (via Resend when ready)

**Database tables:**
- `bookingInquiries` - Already exists, just need UI

**Frontend components:**
- `BookingForm.tsx` - Form with validation
- `AdminDashboard.tsx` - View and manage inquiries (protected route)
- `BookingCard.tsx` - Display individual inquiry

**Backend:**
- `booking.submit` tRPC procedure (already exists, just needs email integration)
- `booking.list` tRPC procedure (already exists)
- `booking.updateStatus` tRPC procedure (new)

**Implementation notes:**
- Use React Hook Form for form management
- Add email validation
- Show success message after submission
- Admin dashboard should show inquiry status (pending, confirmed, declined)
- When Resend is ready, add email notifications to speaking@sujitg.com

---

### Phase 6: Video Integration
**Purpose:** Showcase speaking videos from past events

**What to build:**
- Video section for GSDC and AutoCon4 talks
- YouTube/Vimeo embed support
- Video thumbnails and descriptions
- Placeholder sections ready for video URLs

**Database tables:**
- `videos` - Store video metadata (title, description, url, talkId, type: youtube|vimeo)

**Frontend components:**
- `VideoSection.tsx` - Display videos
- `VideoEmbed.tsx` - Embed YouTube/Vimeo videos
- `VideoCard.tsx` - Video thumbnail and info

**Backend:**
- `videos.list` tRPC procedure
- `videos.getByTalkId` tRPC procedure

**Implementation notes:**
- Create placeholder sections now (ready for video URLs)
- When videos are uploaded to YouTube, just update the database with URLs
- Support both YouTube and Vimeo embeds
- Add video descriptions and timestamps

---

### Phase 7: Testimonials & Social Proof
**Purpose:** Build credibility with quotes from event organizers

**What to build:**
- Testimonials section with quote cards
- Author, role, company information
- Rotating testimonial carousel
- Easy JSON-based editing

**Database tables:**
- `testimonials` - Already exists

**Frontend components:**
- `TestimonialsSection.tsx` - Display testimonials
- `TestimonialCard.tsx` - Individual testimonial
- `TestimonialCarousel.tsx` - Rotating carousel

**Backend:**
- `testimonials.list` tRPC procedure (already exists)

**Implementation notes:**
- Store testimonials in JSON config file for easy editing
- Rotate testimonials on page load or on timer
- Include author photo if available
- Add star rating if desired

---

### Phase 8: Advanced Features
**Purpose:** Enhance engagement and visibility

**What to build:**
- Analytics dashboard (track chat questions, popular topics)
- SEO optimization (meta tags, structured data, sitemap)
- Social sharing (LinkedIn, Twitter share buttons)
- Email capture for newsletter
- Past events timeline
- Speaking statistics (events, attendees, topics)

**Implementation notes:**
- Use Vercel Analytics for traffic tracking
- Add Open Graph meta tags for social sharing
- Create JSON-LD structured data for talks
- Generate sitemap.xml for SEO

---

## Development Workflow

### Making Changes
1. **Create a feature branch:** `git checkout -b feature/speaker-kit`
2. **Make code changes** in your editor
3. **Test locally:** `pnpm dev` (runs on http://localhost:3000)
4. **Commit changes:** `git add . && git commit -m "Add speaker kit section"`
5. **Push to GitHub:** `git push origin feature/speaker-kit`
6. **Create Pull Request** on GitHub (optional but recommended)
7. **Vercel auto-deploys** when merged to main

### Database Changes
1. **Update schema** in `drizzle/schema.ts`
2. **Run migrations:** `pnpm db:push` (local) or push to GitHub (Vercel handles it)
3. **Add query helpers** in `server/db.ts`
4. **Create tRPC procedures** in `server/routers.ts`
5. **Test in browser** before deploying

### Deploying to Production
1. **Commit all changes** to GitHub
2. **Vercel automatically deploys** from main branch
3. **Check deployment status** in Vercel dashboard
4. **Test on live site** at https://speak.sujitg.com

---

## Important Configuration Files

### `drizzle/schema.ts`
- Define all database tables here
- Use PostgreSQL types: `pgTable`, `integer`, `varchar`, `text`, `timestamp`, `pgEnum`
- Run `pnpm db:push` after changes

### `server/routers.ts`
- Define all tRPC procedures (API endpoints)
- Use `publicProcedure` for public endpoints
- Use `protectedProcedure` for authenticated endpoints (if enabling auth)
- Each procedure returns typed data

### `server/db.ts`
- Query helper functions for database operations
- Called from tRPC procedures
- Keep queries simple and reusable

### `client/src/App.tsx`
- Main routing and layout
- Add new routes here for new pages
- Use wouter for client-side routing

### `package.json`
- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm test` - Run Vitest tests
- `pnpm db:push` - Run database migrations

---

## Common Development Tasks

### Add a New Page
1. Create `client/src/pages/NewPage.tsx`
2. Add route in `client/src/App.tsx`
3. Create components in `client/src/components/` as needed
4. Use tRPC hooks to fetch data: `const { data } = trpc.feature.useQuery()`

### Add a New Database Table
1. Define table in `drizzle/schema.ts`
2. Run `pnpm db:push`
3. Add query helpers in `server/db.ts`
4. Create tRPC procedures in `server/routers.ts`
5. Use tRPC in React components

### Update AI System Prompt
1. Edit `server/routers.ts` - find `const systemPrompt = ...`
2. Update the prompt text
3. Commit and push to GitHub
4. Vercel auto-deploys

### Test Chat Locally
1. Set `OPENROUTER_API_KEY` in `.env` file
2. Run `pnpm dev`
3. Visit http://localhost:3000
4. Click "Book Me" and test chat

### View Database
1. Go to Neon dashboard (https://console.neon.tech)
2. Select your database
3. Use SQL editor to query data
4. Or use Vercel's database UI

---

## Environment Variables

**Required in Vercel Settings:**

```
DATABASE_URL=postgresql://...  # From Neon
OPENROUTER_API_KEY=sk_...     # Your OpenRouter key
NODE_ENV=production
```

**Optional (if enabling authentication):**

```
JWT_SECRET=your-secret
VITE_APP_ID=your-app-id
OAUTH_SERVER_URL=https://...
VITE_OAUTH_PORTAL_URL=https://...
```

---

## Testing

### Run Tests
```bash
pnpm test
```

### Test Chat Locally
1. Set environment variables in `.env`
2. Run `pnpm dev`
3. Visit http://localhost:3000
4. Test chat functionality

### Test Database
1. Go to Neon dashboard
2. Run SQL queries to verify data
3. Or use Vercel's database UI

---

## Troubleshooting

### Chat Not Working
1. Check browser console (F12) for errors
2. Check Vercel deployment logs
3. Verify `OPENROUTER_API_KEY` is set in Vercel
4. Check Neon database is connected

### Database Migration Failed
1. Check Vercel deployment logs
2. Go to Neon dashboard and verify schema
3. Run `pnpm db:push` locally to debug
4. Check for SQL syntax errors in schema.ts

### Deployment Stuck
1. Check Vercel deployment logs
2. Verify all environment variables are set
3. Try redeploying from Vercel dashboard
4. Check GitHub for any uncommitted changes

---

## Performance Tips

1. **Use Tailwind CSS** - Pre-built utility classes, no custom CSS
2. **Lazy load components** - Use React.lazy() for large components
3. **Optimize images** - Use WebP format, compress before uploading
4. **Cache API responses** - tRPC automatically caches with React Query
5. **Monitor database queries** - Check Neon dashboard for slow queries

---

## Security Notes

1. **Never commit `.env` file** - Use Vercel's environment variables UI
2. **Validate form inputs** - Use Zod for schema validation
3. **Sanitize user input** - Prevent SQL injection and XSS
4. **Use HTTPS only** - Vercel enforces this automatically
5. **Rotate API keys** - Regularly update OpenRouter key

---

## Next Steps

1. **Phase 4:** Build Speaker Kit downloads section
2. **Phase 5:** Implement booking form with admin dashboard
3. **Phase 6:** Add video embeds for GSDC and AutoCon4
4. **Phase 7:** Add testimonials section
5. **Phase 8:** Implement analytics and SEO

---

## Useful Links

- **GitHub:** https://github.com/tektekgo/sujitg-speaks
- **Vercel Dashboard:** https://vercel.com/dashboard
- **Neon Dashboard:** https://console.neon.tech
- **OpenRouter Dashboard:** https://openrouter.ai
- **Cloudflare DNS:** https://dash.cloudflare.com
- **tRPC Docs:** https://trpc.io
- **Drizzle ORM Docs:** https://orm.drizzle.team
- **Tailwind CSS Docs:** https://tailwindcss.com

---

## Contact & Support

**Speaking Email:** speaking@sujitg.com  
**Events Email:** events@sujitg.com  
**Main Website:** https://sujitg.com  
**AI Focus:** https://ai-focus.org

---

**Last Updated:** December 14, 2025  
**Version:** 1.0 - MVP Complete  
**Status:** Ready for Enhancement
