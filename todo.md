# speak.sujitg.com - Professional Speaking Portfolio

## Phase 2: Branding & Navigation
- [x] Copy speaker logo SVG to project assets
- [x] Update header logo from brain icon to speaker logo
- [x] Update favicon to speaker logo
- [x] Update hero section headline to speaking-focused copy
- [x] Update hero section CTAs (Book Sujit, Download Speaker Kit, Watch Clips)
- [x] Add navigation links: Talks, Speaker Kit, Book Me
- [x] Update footer with speaking@sujitg.com and events@sujitg.com
- [x] Update footer links to sujitg.com and AI-Focus.org

## Phase 3: Database Schema & Signature Talks
- [x] Add `talks` table to schema (title, subtitle, abstract, keyTakeaways, audienceFit, formatOptions)
- [x] Add `events` table to schema (eventName, date, location, talkId, coverage)
- [x] Create database query helpers for talks and events
- [x] Build signature talks tRPC procedures
- [x] Create modular talk card component
- [x] Build talks listing page
- [x] Seed database with 6 signature talks from Speaker Kit
- [x] Create talk detail/modal view (expandable cards)

## Phase 4: Speaker Kit & Downloads
- [ ] Add `mediaAssets` table to schema
- [ ] Create speaker kit section component
- [ ] Display one-pager preview (text excerpt)
- [ ] Display host intro script preview (text excerpt)
- [ ] Create download buttons for PDFs (Speaker Kit, One-Pager, Host Intro Script)
- [ ] Set up placeholder image components for speaker photos
- [ ] Create media gallery component (logos, photos)
- [ ] Add speaker bios section (short, medium, full)

## Phase 5: Booking Form & Admin Dashboard
- [ ] Add `bookingInquiries` table to schema (eventName, date, format, audience, budget, contactEmail, message, status)
- [ ] Create booking form component with validation
- [ ] Build booking form tRPC procedure
- [ ] Create admin view/dashboard to see all inquiries
- [ ] Build export endpoint (CSV/JSON) for booking submissions
- [ ] Add success confirmation message after form submission
- [ ] Create inquiry status management (pending, confirmed, declined)

## Phase 6: AI Chat Enhancement
- [ ] Update system prompt to focus on speaking expertise
- [ ] Include talk abstracts and speaking experience in AI context
- [ ] Add speaking-specific suggested questions
- [ ] Include booking guidelines in AI training
- [ ] Test AI responses for speaking-focused queries
- [ ] Add "Ask about my talks" feature to chat

## Phase 7: Video & Media Integration (Later)
- [ ] Create video clips section with placeholders
- [ ] Build YouTube/Vimeo embed component
- [ ] Add AutoCon4 video placeholder
- [ ] Add GSDC video placeholder
- [ ] Create speaker reel section
- [ ] Build video summary/indexing feature (optional)

## Phase 8: Testimonials & Social Proof (Later)
- [ ] Create testimonials JSON config file
- [ ] Build testimonials carousel component
- [ ] Add past events timeline
- [ ] Create media mentions section
- [ ] Add social proof cards (GSDC certificate, etc.)
- [ ] Build testimonials management interface

## Phase 9: Testing & Optimization
- [ ] Test booking form end-to-end
- [ ] Verify AI chat quality with speaking queries
- [ ] Test admin dashboard and export functionality
- [ ] Mobile responsiveness testing
- [ ] Performance optimization
- [ ] SEO optimization for speaking portfolio
- [ ] Accessibility audit

## Phase 10: Deployment
- [ ] Push code to GitHub (tektekgo/sujitg-speaks)
- [ ] Deploy to Vercel
- [ ] Configure environment variables (OpenRouter API key)
- [ ] Set up PostgreSQL database on Vercel
- [ ] Verify all functionality on live site
- [ ] Configure speak.sujitg.com domain (Cloudflare DNS)
- [ ] Test live site with custom domain

## Future Enhancements
- [ ] Resend email integration (confirmation + notification emails)
- [ ] Video upload and hosting
- [ ] Advanced analytics for booking inquiries
- [ ] Calendar integration for event scheduling
- [ ] Speaking engagement calendar widget
- [ ] Media kit CMS for easy updates
