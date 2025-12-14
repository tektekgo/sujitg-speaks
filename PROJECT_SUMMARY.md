# speak.sujitg.com - Professional Speaking Portfolio

## Project Overview

**speak.sujitg.com** is an AI-native professional speaking portfolio website built with a modern full-stack architecture. The site showcases Sujit Gangadharan's speaking expertise, signature talks, and professional background, featuring an AI-powered concierge that helps event organizers find the right talk and learn about speaking opportunities.

**Live URL:** https://speak.sujitg.com  
**GitHub Repository:** https://github.com/tektekgo/sujitg-speaks  
**Hosting:** Vercel (with Neon PostgreSQL database)  
**Domain:** Configured with Cloudflare DNS

---

## Technology Stack

| Component | Technology | Details |
|-----------|-----------|---------|
| **Frontend** | React 19 + Tailwind CSS 4 | Modern, responsive UI with component-based architecture |
| **Backend** | Express.js 4 + tRPC 11 | Type-safe API layer with end-to-end TypeScript |
| **Database** | PostgreSQL (Neon) | Free tier, serverless, auto-scaling |
| **ORM** | Drizzle ORM | Schema-first database management |
| **LLM** | OpenRouter (Paid tier) | AI-powered chat with $10 credit |
| **Deployment** | Vercel | Automatic deployments from GitHub |
| **Build Tool** | Vite | Fast development and production builds |
| **Testing** | Vitest | Unit tests for backend procedures |

---

## Completed Features

### ✅ Phase 1-2: Branding & Navigation
- Speaker logo (SG) integrated into header and favicon
- Hero section with speaking-focused headline: "Practical Transformation. Real Engineering."
- Navigation menu with links to Talks, Speaker Kit, and Book Me sections
- Footer with speaking@sujitg.com and events@sujitg.com contact emails
- Links to sujitg.com and AI-Focus.org in footer

### ✅ Phase 3: Signature Talks System
- Database schema for 6 signature talks with:
  - Title, subtitle, abstract
  - Key takeaways (JSON array)
  - Audience fit description
  - Format options (keynote, talk, panel, workshop)
- Modular TalkCard component with expandable details
- `/talks` page displaying all signature talks in grid layout
- tRPC procedures for fetching talks
- Seed script with 6 signature talks from Speaker Kit

**Signature Talks:**
1. Vision to Reality: Transforming Enterprise Architecture
2. Data and Analytics: Lovable AI for Enterprise
3. Cloud Transformation: From Strategy to Execution
4. DevOps Mastery: Building High-Performance Teams
5. AI-Native Architecture: Building for the Future
6. Leadership in Digital Transformation

### ✅ Phase 4: AI-Powered Concierge
- Public chat interface at `/chat` route
- AI system prompt trained on:
  - Full professional background (30+ years experience)
  - 6 signature talks with abstracts and key takeaways
  - Speaking expertise and past events
  - Event booking guidelines
- Real-time message streaming
- Conversation history persistence in database
- Support for public/anonymous users (no authentication required)
- OpenRouter LLM integration with paid tier

### ✅ Phase 5: Database Infrastructure
- PostgreSQL schema with tables for:
  - `users` - User management (for future authentication)
  - `conversations` - Chat session tracking
  - `messages` - Chat message history
  - `talks` - Signature talks catalog
  - `events` - Past speaking events
  - `bookingInquiries` - Event booking requests
  - `testimonials` - Social proof from organizers
  - `portfolioContent` - General portfolio information
- Neon PostgreSQL free tier (0.5 GB storage, 100 CU-hours/month)
- Drizzle ORM for type-safe database operations

### ✅ Phase 6: Deployment & Infrastructure
- GitHub repository: https://github.com/tektekgo/sujitg-speaks
- Vercel deployment with automatic CI/CD
- Neon PostgreSQL database integration
- Environment variables configured for:
  - Database connection (DATABASE_URL)
  - OpenRouter API key (OPENROUTER_API_KEY)
  - OAuth and authentication (JWT_SECRET, etc.)
- Fixed static file serving for production
- Domain configured with Cloudflare DNS

---

## Project Structure

```
/home/ubuntu/ai-native-portfolio/
├── client/                          # React frontend
│   ├── public/                      # Static assets
│   │   └── SG-speaker-logo.svg     # Speaker logo
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Home.tsx            # Landing page (redirects to /)
│   │   │   ├── Landing.tsx         # Hero section with CTAs
│   │   │   ├── AIChat.tsx          # Chat interface
│   │   │   ├── Talks.tsx           # Signature talks listing
│   │   │   └── NotFound.tsx        # 404 page
│   │   ├── components/
│   │   │   ├── TalkCard.tsx        # Modular talk card component
│   │   │   ├── AIChatBox.tsx       # Chat interface component
│   │   │   └── ui/                 # shadcn/ui components
│   │   ├── lib/
│   │   │   └── trpc.ts             # tRPC client setup
│   │   ├── App.tsx                 # Main routing and layout
│   │   ├── main.tsx                # React entry point
│   │   └── index.css               # Global styles (Tailwind)
│   └── index.html                  # HTML template
├── server/                          # Express backend
│   ├── _core/
│   │   ├── index.ts                # Server entry point
│   │   ├── vite.ts                 # Vite dev server & static serving
│   │   ├── context.ts              # tRPC context
│   │   ├── trpc.ts                 # tRPC router setup
│   │   ├── llm.ts                  # LLM integration (OpenRouter)
│   │   ├── oauth.ts                # OAuth routes
│   │   ├── env.ts                  # Environment variables
│   │   └── cookies.ts              # Session cookie management
│   ├── routers.ts                  # tRPC procedure definitions
│   ├── db.ts                       # Database query helpers
│   └── chat.test.ts                # Chat functionality tests
├── drizzle/                        # Database schema & migrations
│   ├── schema.ts                   # Table definitions
│   └── migrations/                 # Auto-generated migrations
├── seed-talks.mjs                  # Seed script for talks data
├── seed-portfolio.mjs              # Seed script for portfolio content
├── package.json                    # Dependencies and scripts
├── vite.config.ts                  # Vite configuration
├── tsconfig.json                   # TypeScript configuration
├── drizzle.config.ts               # Drizzle ORM configuration
├── vercel.json                     # Vercel deployment config
├── .env.example                    # Environment variables template
└── README.md                       # Project documentation
```

---

## Database Schema

### conversations
```sql
- id (integer, primary key)
- userId (integer, nullable) - For authenticated users
- sessionId (varchar, nullable) - For public/anonymous users
- title (varchar) - Conversation title
- createdAt (timestamp)
- updatedAt (timestamp)
```

### messages
```sql
- id (integer, primary key)
- conversationId (integer) - Foreign key to conversations
- role (enum: 'user' | 'assistant')
- content (text)
- createdAt (timestamp)
```

### talks
```sql
- id (integer, primary key)
- title (varchar)
- subtitle (varchar)
- abstract (text)
- keyTakeaways (text) - JSON array as string
- audienceFit (text)
- formatOptions (text) - JSON array as string
- order (integer) - Display order
- createdAt (timestamp)
```

### bookingInquiries
```sql
- id (integer, primary key)
- eventName (varchar)
- date (varchar)
- format (varchar) - keynote, talk, panel, workshop
- audience (text)
- budget (varchar)
- contactEmail (varchar)
- contactName (varchar)
- message (text)
- status (varchar) - pending, confirmed, declined
- createdAt (timestamp)
- updatedAt (timestamp)
```

### testimonials
```sql
- id (integer, primary key)
- quote (text)
- author (varchar)
- role (varchar)
- company (varchar)
- order (integer)
- createdAt (timestamp)
```

---

## Environment Variables

Required environment variables (set in Vercel):

```
# Database
DATABASE_URL=postgresql://...  # Provided by Neon

# LLM
OPENROUTER_API_KEY=sk_...     # Your OpenRouter paid account key

# OAuth (if enabling authentication later)
JWT_SECRET=your-secret-key
VITE_APP_ID=your-app-id
OAUTH_SERVER_URL=https://...
VITE_OAUTH_PORTAL_URL=https://...

# Other
NODE_ENV=production
```

---

## Key Features & How They Work

### 1. AI Concierge Chat
- **Location:** `/chat` route
- **How it works:**
  1. User clicks "Book Me" on landing page
  2. Frontend creates a new conversation in database
  3. User types a question (e.g., "What talk is best for a DevOps audience?")
  4. Backend retrieves conversation history and portfolio context
  5. OpenRouter LLM generates response based on system prompt
  6. Response is saved to database and displayed in real-time
- **System Prompt:** Trained on full professional background + 6 signature talks

### 2. Signature Talks
- **Location:** `/talks` route
- **Features:**
  - Grid layout with modular talk cards
  - Expandable details (abstract, key takeaways, audience fit, formats)
  - Database-backed (easy to add/edit talks)
  - Seeded with 6 signature talks from Speaker Kit

### 3. Public Access (No Authentication)
- Chat is fully public - no login required
- Conversations tracked by `sessionId` instead of `userId`
- Allows visitors to instantly interact with the AI

### 4. Database Persistence
- All conversations and messages saved to PostgreSQL
- Allows future features like:
  - Admin dashboard to view chat history
  - Analytics on popular questions
  - Conversation export/download

---

## API Routes (tRPC Procedures)

### Chat
- `chat.createConversation` - Start a new conversation
- `chat.getMessages` - Fetch conversation history
- `chat.sendMessage` - Send a message and get AI response

### Talks
- `talks.list` - Get all signature talks
- `talks.getById` - Get individual talk details

### Booking
- `booking.submit` - Submit event booking inquiry
- `booking.list` - View all bookings (admin)

### Testimonials
- `testimonials.list` - Get all testimonials

---

## Deployment Process

1. **Make code changes** locally or in the sandbox
2. **Commit to GitHub:** `git add . && git commit -m "message" && git push`
3. **Vercel auto-deploys** from GitHub main branch
4. **Database migrations** run automatically on deployment
5. **Site updates** within 2-5 minutes

### Rollback to Previous Version
- Use `webdev_rollback_checkpoint` with checkpoint version ID
- Or manually revert commit on GitHub and push

---

## Remaining Features (Not Yet Implemented)

### Phase 4: Speaker Kit Downloads
- [ ] Speaker bios section (short, medium, full)
- [ ] One-pager PDF download
- [ ] Host intro script download
- [ ] Speaker photos gallery
- [ ] Media kit with logos and press materials

### Phase 5: Booking Form UI
- [ ] Event inquiry form with validation
- [ ] Form fields: event name, date, format, audience, budget, contact info
- [ ] Admin dashboard to view booking inquiries
- [ ] Email notifications (via Resend when mail.sujitg.com is ready)

### Phase 6: Video Integration
- [ ] Video section for GSDC and AutoCon4 talks
- [ ] YouTube/Vimeo embed support
- [ ] Video thumbnails and descriptions
- [ ] Placeholder sections ready for video URLs

### Phase 7: Testimonials
- [ ] Testimonials section with quote cards
- [ ] Author, role, company information
- [ ] Rotating testimonial carousel
- [ ] Easy JSON-based editing

### Phase 8: Advanced Features
- [ ] Analytics dashboard
- [ ] SEO optimization
- [ ] Social sharing (LinkedIn, Twitter)
- [ ] Email capture for newsletter
- [ ] Past events timeline

---

## Common Development Tasks

### Add a New Signature Talk
1. Edit `seed-talks.mjs` and add talk data
2. Run seed script: `node seed-talks.mjs`
3. Or manually insert into database via Neon dashboard

### Update AI System Prompt
1. Edit `server/routers.ts` line 58 (systemPrompt variable)
2. Commit and push to GitHub
3. Vercel auto-deploys

### Add a New Database Table
1. Edit `drizzle/schema.ts`
2. Run `pnpm db:push` (local) or push to GitHub (Vercel handles migrations)
3. Add query helpers in `server/db.ts`
4. Create tRPC procedures in `server/routers.ts`

### Test Chat Locally
1. Set `DATABASE_URL` and `OPENROUTER_API_KEY` in `.env`
2. Run `pnpm dev`
3. Visit http://localhost:3000
4. Click "Book Me" and test chat

---

## Important Notes

1. **Database:** Neon PostgreSQL free tier is sufficient for a speaking portfolio. Upgrade if you exceed 0.5 GB storage or 100 CU-hours/month.

2. **LLM Cost:** OpenRouter paid tier ($10 credit) provides good value. Monitor usage in OpenRouter dashboard.

3. **Email:** Resend integration for booking confirmations is not yet implemented. When ready, update `server/routers.ts` booking.submit procedure.

4. **Authentication:** Currently disabled for public access. Can be re-enabled by:
   - Using `protectedProcedure` instead of `publicProcedure`
   - Setting up OAuth with Manus or another provider
   - Updating database to track `userId` instead of `sessionId`

5. **Backups:** GitHub is your source of truth. Always commit before making major changes.

---

## Getting Help

- **GitHub Issues:** Create issues for bugs or feature requests
- **Vercel Logs:** Check deployment logs for errors
- **Neon Dashboard:** Monitor database usage and run SQL queries
- **OpenRouter Dashboard:** Monitor LLM API usage and costs

---

## Next Steps

1. **Test the chat** - Ensure AI responses are high quality
2. **Gather feedback** - Share site with event organizers
3. **Build Speaker Kit** - Add bios, PDFs, photos
4. **Implement Booking Form** - Capture event inquiries
5. **Add Videos** - Upload talks to YouTube and embed
6. **Collect Testimonials** - Add quotes from past events
7. **Optimize for SEO** - Improve search visibility

---

**Last Updated:** December 14, 2025  
**Project Status:** MVP Complete - Ready for Enhancement  
**Maintenance:** Minimal - Vercel handles hosting, Neon handles database
