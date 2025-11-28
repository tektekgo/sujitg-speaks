# Sujit Gangadharan - AI-Native Portfolio

An intelligent, conversational portfolio website featuring an AI assistant powered by advanced language models. Built with Next.js, React, and tRPC, this portfolio allows visitors to ask questions about your background, expertise, and projects in real-time.

## Features

### Core Features

- **Conversational AI Assistant:** Chat with an AI that knows about your professional background, expertise, and projects
- **Authentication:** Secure user authentication with OAuth
- **Persistent Conversations:** Store and retrieve conversation history
- **Responsive Design:** Beautiful, mobile-friendly interface with dark theme
- **Real-time Streaming:** AI responses stream in real-time for better UX

### Technical Features

- **Full-Stack TypeScript:** Type-safe code from frontend to backend
- **tRPC:** End-to-end type safety for API calls
- **Database Integration:** MySQL with Drizzle ORM for data persistence
- **Tailwind CSS 4:** Modern, utility-first styling
- **Vitest:** Comprehensive test coverage

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 19, Tailwind CSS 4, shadcn/ui |
| Backend | Express 4, tRPC 11, Node.js |
| Database | MySQL, Drizzle ORM |
| LLM | OpenRouter (free tier) |
| Deployment | Vercel |
| Auth | Manus OAuth |

## Quick Start

### Prerequisites

- Node.js 18+
- pnpm (or npm/yarn)
- MySQL database
- OpenRouter API key (free)

### Local Development

1. **Clone and install:**
   ```bash
   git clone <your-repo>
   cd ai-native-portfolio
   pnpm install
   ```

2. **Set up environment variables:**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your credentials
   ```

3. **Initialize database:**
   ```bash
   pnpm db:push
   node seed-portfolio.mjs
   ```

4. **Start development server:**
   ```bash
   pnpm dev
   ```

5. **Open in browser:**
   Visit `http://localhost:3000`

### Running Tests

```bash
# Run all tests
pnpm test

# Run specific test file
pnpm test server/chat.test.ts

# Watch mode
pnpm test --watch
```

### Type Checking

```bash
pnpm check
```

## Project Structure

```
├── client/                 # React frontend
│   ├── src/
│   │   ├── pages/         # Page components
│   │   │   ├── Landing.tsx    # Landing page
│   │   │   ├── AIChat.tsx     # Chat interface
│   │   │   └── Home.tsx       # Home page
│   │   ├── components/    # Reusable components
│   │   ├── lib/          # Utilities and hooks
│   │   └── App.tsx       # Main app router
│   └── public/           # Static assets
│
├── server/               # Express backend
│   ├── routers.ts       # tRPC route definitions
│   ├── db.ts            # Database queries
│   ├── chat.test.ts     # Chat functionality tests
│   └── _core/           # Framework internals
│
├── drizzle/             # Database schema
│   ├── schema.ts        # Table definitions
│   └── migrations/      # Database migrations
│
├── shared/              # Shared types and constants
├── seed-portfolio.mjs   # Database seeding script
├── DEPLOYMENT.md        # Vercel deployment guide
└── package.json         # Dependencies
```

## Database Schema

### Tables

**conversations**
- Stores user conversations
- Fields: id, userId, title, createdAt, updatedAt

**messages**
- Stores individual messages in conversations
- Fields: id, conversationId, role (user/assistant), content, createdAt

**portfolioContent**
- Stores portfolio information for AI context
- Fields: id, section, title, content, order, createdAt

**users**
- Stores user information (auto-managed by auth)
- Fields: id, openId, name, email, loginMethod, role, createdAt, updatedAt, lastSignedIn

## API Routes

### Chat Procedures

**`chat.createConversation`** (Protected)
- Input: `{ title?: string }`
- Returns: Conversation ID

**`chat.getConversations`** (Protected)
- Returns: Array of conversations for current user

**`chat.getMessages`** (Protected)
- Input: `{ conversationId: number }`
- Returns: Array of messages in conversation

**`chat.sendMessage`** (Protected)
- Input: `{ conversationId: number, message: string }`
- Returns: `{ success: boolean, message: string }`

## Configuration

### Environment Variables

Required variables for local development:

```env
DATABASE_URL=mysql://user:password@localhost:3306/portfolio
JWT_SECRET=your-secret-key-here
VITE_APP_ID=your-app-id
OAUTH_SERVER_URL=https://api.manus.im
VITE_OAUTH_PORTAL_URL=https://portal.manus.im
OWNER_OPEN_ID=your-owner-id
OWNER_NAME=Your Name
BUILT_IN_FORGE_API_URL=https://api.manus.im
BUILT_IN_FORGE_API_KEY=your-api-key
VITE_FRONTEND_FORGE_API_URL=https://api.manus.im
VITE_FRONTEND_FORGE_API_KEY=your-frontend-key
```

### Database Connection

The project uses MySQL. For local development, you can use:

- **Docker:** `docker run -e MYSQL_ROOT_PASSWORD=root -p 3306:3306 mysql:8`
- **Local MySQL:** Ensure MySQL is running on `localhost:3306`
- **Cloud:** Use PlanetScale, AWS RDS, or similar

## Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed Vercel deployment instructions.

Quick deploy:

```bash
# Ensure all tests pass
pnpm test

# Create a checkpoint
git commit -m "Ready for deployment"

# Push to GitHub
git push

# Deploy via Vercel dashboard
# or use Vercel CLI: vercel
```

## Performance Optimization

### Frontend

- Lazy load components with React.lazy()
- Use Tailwind CSS purging for smaller bundle
- Implement image optimization with next/image

### Backend

- Database query optimization with proper indexes
- Implement caching for portfolio content
- Use connection pooling for database

### LLM

- Cache common questions and answers
- Implement rate limiting
- Consider upgrading from free tier for production

## Security

- All API calls require authentication
- Database queries use parameterized statements
- HTTPS enforced in production
- Secrets stored in environment variables
- Input validation on all endpoints

## Troubleshooting

### Common Issues

**Q: Database connection fails**
- A: Check `DATABASE_URL` format and ensure database is running

**Q: AI responses are slow**
- A: Check network latency and consider upgrading OpenRouter plan

**Q: Tests timeout**
- A: LLM tests are skipped by default; run with increased timeout if needed

**Q: Build fails**
- A: Run `pnpm check` locally to catch TypeScript errors

## Contributing

1. Create a feature branch: `git checkout -b feature/your-feature`
2. Make changes and test: `pnpm test`
3. Commit: `git commit -m "Add your feature"`
4. Push: `git push origin feature/your-feature`
5. Create a Pull Request

## License

MIT License - feel free to use this as a template for your own portfolio

## Support

- **Documentation:** See [DEPLOYMENT.md](./DEPLOYMENT.md)
- **Issues:** Check GitHub Issues
- **Questions:** Contact support

---

**Built with ❤️ using Manus AI**
