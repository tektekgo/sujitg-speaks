# Cursor IDE Quick Start Guide

**TL;DR:** How to use Cursor IDE to complete the remaining phases of speak.sujitg.com

---

## 1. Open Cursor IDE

Download and install Cursor from https://cursor.com

---

## 2. Clone the Repository

```bash
git clone https://github.com/tektekgo/sujitg-speaks.git
cd sujitg-speaks
```

---

## 3. Set Up Environment

```bash
pnpm install
cp .env.example .env
```

Add to `.env`:
```
DATABASE_URL=postgresql://...  # From Neon dashboard
OPENROUTER_API_KEY=sk_...      # Your OpenRouter key
```

---

## 4. Start Dev Server

```bash
pnpm dev
```

Visit http://localhost:3000 to see your site

---

## 5. Open Cursor Composer

**Mac:** `Cmd+Shift+P` → Type "Cursor: Open Composer"  
**Windows:** `Ctrl+Shift+P` → Type "Cursor: Open Composer"

---

## 6. Copy & Paste the Prompt

**Option A: Use the Full Prompt**
1. Open `CURSOR_PROMPT.md` in your editor
2. Copy the entire content
3. Paste into Cursor Composer
4. Add your content (bios, testimonials, video URLs)
5. Specify which phase to work on

**Option B: Use Phase-Specific Prompts**

Jump to the section in `CURSOR_PROMPT.md` titled "Phase-Specific Prompts for Cursor" and copy the relevant phase.

---

## 7. Provide Your Content

Before asking Cursor to build, gather:

### For Phase 1 (Speaker Kit):
- Short bio (50-75 words)
- Medium bio (150-200 words)
- Full bio (300+ words)
- One-pager PDF file
- Host intro script

### For Phase 3 (Videos):
- AutoCon 4 video URL: https://www.youtube.com/watch?v=b8DZzlM0beo&t=1s
- Any other video URLs

### For Phase 4 (Testimonials):
- 3-5 testimonial quotes
- Author names, roles, companies

Use `SPEAKER_CONTENT_TEMPLATE.md` to organize this content.

---

## 8. Ask Cursor to Build

**Example Prompt:**

```
Complete Phase 1: Speaker Kit Downloads

Content to use:
- Short bio: "VP of DevOps & Infrastructure Automation at VyStar Credit Union..."
- Medium bio: "[PASTE YOUR MEDIUM BIO]"
- Full bio: "[PASTE YOUR FULL BIO]"

Follow the implementation steps in the CURSOR_PROMPT.md.
Create all necessary files and database schema.
Test locally with `pnpm dev` before pushing.
```

---

## 9. Review & Test

1. Cursor will create/modify files
2. Review the changes in your editor
3. Run `pnpm dev` to test locally
4. Check for errors in browser console (F12)
5. Test on http://localhost:3000

---

## 10. Push to GitHub

```bash
git add .
git commit -m "Complete Phase X: [Feature Name]"
git push origin main
```

Vercel will auto-deploy (2-5 minutes)

---

## 11. Test on Live Site

Visit https://speak.sujitg.com to verify everything works

---

## Recommended Phase Order

1. **Phase 1:** Speaker Kit (no dependencies)
2. **Phase 3:** Videos (no dependencies)
3. **Phase 4:** Testimonials (no dependencies)
4. **Phase 2:** Booking Form (no dependencies)
5. **Phase 5:** Testing & Optimization (do last)

**Pro Tip:** Do Phases 1, 3, 4 in parallel - they don't depend on each other!

---

## Common Cursor Commands

| Command | Action |
|---------|--------|
| `Cmd+K` (Mac) or `Ctrl+K` (Windows) | Ask Cursor to edit selected code |
| `Cmd+Shift+P` (Mac) or `Ctrl+Shift+P` (Windows) | Open command palette |
| `Cmd+/` (Mac) or `Ctrl+/` (Windows) | Toggle comment |
| `Cmd+S` (Mac) or `Ctrl+S` (Windows) | Save file |

---

## Troubleshooting

### Cursor Can't Find Files
- Make sure you're in the project root directory
- Run `pwd` to verify you're in `/home/ubuntu/ai-native-portfolio` or similar

### Database Migration Fails
- Run `pnpm db:push` manually
- Check Neon dashboard for schema errors
- Verify DATABASE_URL is correct

### Dev Server Won't Start
- Check if port 3000 is already in use
- Run `pnpm dev` again
- Check for TypeScript errors in console

### Vercel Deployment Fails
- Check Vercel logs in dashboard
- Verify environment variables are set
- Check GitHub for uncommitted changes

---

## Key Files to Know

```
CURSOR_PROMPT.md              ← Full prompt with all phases
SPEAKER_CONTENT_TEMPLATE.md   ← Template for gathering content
NEXT_STEPS.md                 ← 5-phase development plan
PROJECT_SUMMARY.md            ← Project overview
CONTINUATION_PROMPT.md        ← Detailed technical guide
```

---

## Example: Complete Phase 1 with Cursor

### Step 1: Gather Content
Fill out `SPEAKER_CONTENT_TEMPLATE.md` with your bios

### Step 2: Open Cursor Composer
`Cmd+Shift+P` → "Cursor: Open Composer"

### Step 3: Paste This Prompt
```
Complete Phase 1: Speaker Kit Downloads

Content to use:
- Short bio: "VP of DevOps & Infrastructure Automation at VyStar Credit Union. 
  Speaker on enterprise automation, AI adoption, and technology leadership in regulated industries. 
  30+ years of hands-on experience."
- Medium bio: "[PASTE YOUR MEDIUM BIO]"
- Full bio: "[PASTE YOUR FULL BIO]"

Files to create:
1. Add speakerKitAssets table to drizzle/schema.ts
2. Create SpeakerKitSection.tsx component
3. Create DownloadButton.tsx component
4. Create SpeakerKit.tsx page
5. Add /speaker-kit route to App.tsx
6. Create seed-speaker-kit.mjs script
7. Run pnpm db:push

Use the implementation steps from CURSOR_PROMPT.md.
Test locally with pnpm dev before pushing.
```

### Step 4: Review & Test
- Check files created
- Run `pnpm dev`
- Test at http://localhost:3000/speaker-kit

### Step 5: Push
```bash
git add .
git commit -m "Complete Phase 1: Speaker Kit Downloads"
git push origin main
```

---

## Success Indicators

✅ Phase complete when:
- All files created without errors
- `pnpm dev` runs without TypeScript errors
- Feature works on http://localhost:3000
- No console errors (F12)
- Vercel deployment succeeds
- Feature works on https://speak.sujitg.com

---

## Need Help?

- **GitHub Issues:** https://github.com/tektekgo/sujitg-speaks/issues
- **Cursor Docs:** https://cursor.com/docs
- **tRPC Docs:** https://trpc.io
- **Tailwind CSS:** https://tailwindcss.com

---

**Last Updated:** December 14, 2025  
**Status:** Ready to use with Cursor IDE
