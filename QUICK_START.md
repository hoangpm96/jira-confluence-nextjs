# Quick Start Guide

Get your Jira & Confluence API running in **10 minutes**.

## Prerequisites

- Node.js 18+ installed
- Jira API token (get from https://id.atlassian.com/manage-profile/security/api-tokens)
- Confluence space key

## 1. Install Dependencies (1 min)

```bash
npm install
```

## 2. Configure Environment (2 min)

```bash
cp .env.example .env
```

Edit `.env`:

```env
JIRA_URL=https://your-domain.atlassian.net
JIRA_EMAIL=your-email@example.com
JIRA_API_TOKEN=your-token-here
DEFAULT_SPACE_KEY=~your-space-key
API_KEY=my-secret-key-123
```

## 3. Run Development Server (1 min)

```bash
npm run dev
```

Visit http://localhost:3000

## 4. Test API (2 min)

```bash
# Health check
curl http://localhost:3000/api/health

# List Confluence pages
curl -H "X-API-Key: my-secret-key-123" \
  http://localhost:3000/api/confluence/pages

# List Jira projects
curl -H "X-API-Key: my-secret-key-123" \
  http://localhost:3000/api/jira/projects
```

## 5. Deploy to Vercel (4 min)

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel

# Add environment variables
vercel env add JIRA_URL
vercel env add JIRA_EMAIL
vercel env add JIRA_API_TOKEN
vercel env add DEFAULT_SPACE_KEY
vercel env add API_KEY

# Deploy to production
vercel --prod
```

You'll get a URL like: `https://your-project.vercel.app`

## 6. Integrate with Custom GPT (Optional)

1. Go to https://chat.openai.com/gpts/editor
2. Create new GPT
3. Add Action → Import from URL
4. Enter: `https://your-project.vercel.app/openapi.json`
5. Configure authentication:
   - Type: API Key
   - Header: `X-API-Key`
   - Value: `my-secret-key-123`

## Done!

Your API is now running and ready to use.

## Next Steps

- Read `README.md` for complete API documentation
- See `DEPLOYMENT_GUIDE.md` for detailed deployment instructions
- Check `PROJECT_SUMMARY.md` for technical details

## Common Issues

**Can't connect to Jira?**
- Verify `JIRA_URL`, `JIRA_EMAIL`, and `JIRA_API_TOKEN`
- Make sure API token has correct permissions

**Space not found?**
- Check `DEFAULT_SPACE_KEY` is correct
- For personal spaces, format is: `~accountId`

**Build fails?**
- Make sure Node.js 18+ is installed
- Delete `node_modules` and run `npm install` again

## Support

See documentation files for detailed help.
