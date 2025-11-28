# AI-Native Portfolio - Vercel Deployment Guide

## Overview

This is a full-stack AI-native portfolio website built with Next.js, React, Tailwind CSS, tRPC, Express, and MySQL. It features a conversational AI assistant powered by OpenRouter's free LLM service.

## Prerequisites

Before deploying to Vercel, ensure you have:

1. **Vercel Account:** Sign up at https://vercel.com
2. **GitHub Repository:** Push your code to GitHub
3. **OpenRouter API Key:** Get a free key from https://openrouter.ai
4. **MySQL Database:** A MySQL database (can use Vercel's database partner or external provider like PlanetScale)

## Environment Variables

The following environment variables are required for deployment. These are automatically injected by the Manus platform in development but must be manually configured in Vercel:

### Required Secrets

| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | MySQL connection string | `mysql://user:pass@host:3306/dbname` |
| `JWT_SECRET` | Session cookie signing secret | Generate a random 32-character string |
| `VITE_APP_ID` | OAuth application ID | Provided by Manus |
| `OAUTH_SERVER_URL` | OAuth server base URL | `https://api.manus.im` |
| `VITE_OAUTH_PORTAL_URL` | OAuth login portal URL | `https://portal.manus.im` |
| `OWNER_OPEN_ID` | Owner's OAuth ID | Your Manus user ID |
| `OWNER_NAME` | Owner's display name | Your name |
| `BUILT_IN_FORGE_API_URL` | Manus API base URL | `https://api.manus.im` |
| `BUILT_IN_FORGE_API_KEY` | Manus API key | Provided by Manus |
| `VITE_FRONTEND_FORGE_API_URL` | Frontend Manus API URL | `https://api.manus.im` |
| `VITE_FRONTEND_FORGE_API_KEY` | Frontend Manus API key | Provided by Manus |
| `VITE_ANALYTICS_ENDPOINT` | Analytics endpoint | Provided by Manus |
| `VITE_ANALYTICS_WEBSITE_ID` | Analytics website ID | Provided by Manus |

## Step-by-Step Deployment

### 1. Prepare Your Repository

```bash
# Initialize git if not already done
git init

# Add all files
git add .

# Commit
git commit -m "Initial AI-native portfolio commit"

# Push to GitHub
git push -u origin main
```

### 2. Create Vercel Project

1. Go to https://vercel.com/new
2. Select "Import Git Repository"
3. Choose your GitHub repository
4. Click "Import"

### 3. Configure Environment Variables

1. In the Vercel project settings, go to "Settings" → "Environment Variables"
2. Add each required environment variable from the table above
3. Set the environment to "Production"

### 4. Configure Build Settings

1. **Framework Preset:** Select "Other"
2. **Build Command:** `pnpm build`
3. **Output Directory:** `dist`
4. **Install Command:** `pnpm install`

### 5. Database Setup

Before deploying, ensure your MySQL database is set up:

```bash
# Run migrations
pnpm db:push

# Seed portfolio content (if not already done)
node seed-portfolio.mjs
```

### 6. Deploy

1. Click "Deploy" on the Vercel dashboard
2. Wait for the build to complete
3. Your site will be available at `https://your-project-name.vercel.app`

## Post-Deployment

### Verify Deployment

1. Visit your deployed URL
2. Test the landing page loads correctly
3. Sign in with your OAuth credentials
4. Test the AI chat functionality

### Monitor Performance

- Use Vercel Analytics to monitor performance
- Check error logs in Vercel dashboard
- Monitor database connection usage

### Update Domain

To use a custom domain:

1. Go to Vercel project settings
2. Navigate to "Domains"
3. Add your custom domain
4. Follow DNS configuration instructions

## Troubleshooting

### Build Failures

**Issue:** Build fails with TypeScript errors
- **Solution:** Run `pnpm check` locally to identify issues before pushing

**Issue:** Missing environment variables
- **Solution:** Verify all required variables are set in Vercel settings

### Runtime Errors

**Issue:** Database connection fails
- **Solution:** Verify `DATABASE_URL` is correct and database is accessible from Vercel

**Issue:** OAuth login fails
- **Solution:** Ensure `OAUTH_SERVER_URL` and `VITE_OAUTH_PORTAL_URL` are correct

**Issue:** AI responses not working
- **Solution:** Verify `BUILT_IN_FORGE_API_KEY` is valid and has access to LLM services

## Scaling Considerations

### Database Optimization

- Monitor query performance using database tools
- Add indexes for frequently queried columns
- Consider connection pooling for high traffic

### API Rate Limiting

- OpenRouter has rate limits on free tier
- Implement caching for common questions
- Consider upgrading to paid tier for production

### Performance Optimization

- Enable Vercel Edge Caching
- Optimize database queries in `server/db.ts`
- Use Vercel Analytics to identify bottlenecks

## Security Best Practices

1. **Never commit secrets** to Git
2. **Use HTTPS** for all connections
3. **Validate user input** on both client and server
4. **Implement rate limiting** for API endpoints
5. **Keep dependencies updated** with `pnpm update`

## Maintenance

### Regular Updates

```bash
# Update dependencies
pnpm update

# Run tests
pnpm test

# Check TypeScript
pnpm check

# Deploy updated version
git push
```

### Monitoring

- Set up error tracking with Sentry or similar
- Monitor database performance
- Track API usage and costs

## Support

For issues with:

- **Vercel Deployment:** Visit https://vercel.com/docs
- **Manus Platform:** Contact support@manus.im
- **OpenRouter API:** Visit https://openrouter.ai/docs

## Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [tRPC Documentation](https://trpc.io/docs)
- [OpenRouter API Docs](https://openrouter.ai/docs)
