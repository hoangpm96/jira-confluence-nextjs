# Deployment Guide - Jira & Confluence API (Next.js)

Complete guide to deploy your Jira & Confluence API to Vercel and integrate with Custom GPT.

## Prerequisites

- Node.js 18+ installed
- Jira/Confluence account with admin access
- Vercel account (free tier works)
- OpenAI ChatGPT Plus subscription (for Custom GPT)

## Step 1: Get Jira API Token (2 minutes)

1. Go to https://id.atlassian.com/manage-profile/security/api-tokens
2. Click **Create API token**
3. Name it: "Custom GPT Integration"
4. **Copy the token** (shown only once!) and save it securely

## Step 2: Get Confluence Space Key (1 minute)

1. Go to your Confluence space
2. Look at the URL: `https://your-domain.atlassian.net/wiki/spaces/SPACEKEY/...`
3. For personal spaces, the key looks like: `~712020cd3185085d6847b9aadf76f66028a738`
4. Copy this space key

## Step 2.5: Install HTML Macro for Confluence (3 minutes) - Required for Mermaid Diagrams

**IMPORTANT**: To use Mermaid diagrams in Confluence, you must install an HTML Macro plugin.

### Recommended: HTML Macro for Confluence Cloud by Narva Software

1. Go to **Atlassian Marketplace**: https://marketplace.atlassian.com/apps/1229863/html-macro-for-confluence-cloud
2. Click **Get it now** or **Try it free**
3. Select your Confluence site from the dropdown
4. Click **Install** and approve the permissions
5. Wait for installation to complete (usually 30 seconds)
6. Verify installation:
   - Go to your Confluence site
   - Click **Settings** (⚙️ icon) → **Manage apps**
   - Search for "HTML Macro"
   - Ensure status is "Enabled"

### Alternative: HTML for Confluence Cloud by Appfire

1. Go to: https://marketplace.atlassian.com/apps/1213263/html-for-confluence-cloud
2. Follow same installation steps as above

**Why this is needed**: Confluence Cloud blocks raw HTML/JavaScript for security. The HTML Macro plugin provides a secure way to embed HTML content, which is required for rendering Mermaid diagrams with the CDN script.

## Step 3: Clone and Setup Project (2 minutes)

```bash
# Clone the repository
git clone <your-repo-url>
cd jira-confluence-nextjs

# Install dependencies
npm install

# Create .env.local file
cp .env.example .env.local
```

Edit `.env.local`:

```env
JIRA_URL=https://your-domain.atlassian.net
JIRA_EMAIL=your-email@example.com
JIRA_API_TOKEN=<paste-your-token-here>
DEFAULT_SPACE_KEY=<paste-your-space-key>
API_KEY=my-secret-key-123
```

## Step 4: Test Locally (3 minutes)

```bash
# Run development server
npm run dev
```

Visit http://localhost:3000

Test the API:

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

If all tests pass, you're ready to deploy!

## Step 5: Deploy to Vercel (5 minutes)

### Option A: Vercel CLI (Recommended)

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy to Vercel
vercel

# Add environment variables
vercel env add JIRA_URL
# Enter: https://your-domain.atlassian.net

vercel env add JIRA_EMAIL
# Enter: your-email@example.com

vercel env add JIRA_API_TOKEN
# Paste your API token

vercel env add DEFAULT_SPACE_KEY
# Paste your space key

vercel env add API_KEY
# Enter: my-secret-key-123

# Deploy to production
vercel --prod
```

You'll get a URL like: `https://your-project.vercel.app`

### Option B: GitHub + Vercel Dashboard

1. **Push to GitHub:**

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/your-username/jira-confluence-api.git
git push -u origin main
```

2. **Import to Vercel:**
   - Go to https://vercel.com/new
   - Click **Import Project**
   - Select your GitHub repository
   - Click **Import**

3. **Add Environment Variables:**
   - In Vercel dashboard, go to **Settings** → **Environment Variables**
   - Add all variables from your `.env.local` file
   - Click **Save**

4. **Redeploy:**
   - Go to **Deployments**
   - Click **Redeploy** on the latest deployment

## Step 6: Verify Deployment (2 minutes)

```bash
# Replace with your actual Vercel URL
export API_URL="https://your-project.vercel.app"

# Test health
curl $API_URL/api/health

# Test with API key
curl -H "X-API-Key: my-secret-key-123" \
  $API_URL/api/confluence/pages
```

## Step 7: Create Custom GPT (10 minutes)

### 7.1 Go to GPT Editor

https://chat.openai.com/gpts/editor

### 7.2 Basic Information

**Name:**
```
Jira & Confluence Assistant
```

**Description:**
```
Business Analyst specializing in User Stories and documentation management
```

### 7.3 Instructions

```
You are an expert Business Analyst who helps manage Jira user stories and Confluence documentation.

CAPABILITIES:
- List and search Confluence pages
- Read page content
- Create and update Confluence pages with HTML content
- Add Mermaid diagrams to Confluence pages
- List Jira projects
- Create user stories in Jira (single or bulk)
- Search Jira issues using JQL
- Combined workflow: Create stories + Document in Confluence

WORKFLOW FOR CREATING USER STORIES:

1. When user requests a user story, ask for:
   - Feature/functionality to implement
   - Actor (who will use it)
   - Goal (what they want to achieve)
   - Acceptance Criteria (how to verify it works)
   - Story Points (1, 2, 3, 5, 8, 13, 21)
   - Priority (Highest, High, Medium, Low, Lowest)

2. Format the story as:
   Summary: "As a [actor], I want to [action] so that [benefit]"
   Description: Detailed explanation of the feature
   Acceptance Criteria: Bulleted list of testable criteria

3. Create in Jira using POST /api/jira/story

4. Ask if they want to document it in Confluence

5. If yes, append to the appropriate page

WORKFLOW FOR BULK STORIES:

1. When user wants multiple stories, gather info for each
2. Use POST /api/jira/stories/bulk for efficiency
3. Offer to create a summary page in Confluence

WORKFLOW FOR MERMAID DIAGRAMS:

1. When user wants to add diagrams (flowcharts, sequence diagrams, etc.):
   - Ask what type of diagram they need
   - Ask for the flow/process details
   - Create the Mermaid syntax

2. Wrap the diagram in HTML Macro format:
<ac:structured-macro ac:name="html">
  <ac:plain-text-body><![CDATA[
  <div class="mermaid">
  [Mermaid diagram code here]
  </div>
  <script type="module">
    import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.esm.min.mjs';
    mermaid.initialize({ startOnLoad: true, theme: 'neutral' });
  </script>
  ]]></ac:plain-text-body>
</ac:structured-macro>

3. Use POST /api/confluence/page/[pageId]/append to add to page

4. Remind user that HTML Macro plugin must be installed in Confluence

SUPPORTED MERMAID DIAGRAM TYPES:
- sequenceDiagram: User flows and interactions
- graph/flowchart: Process flows and decision trees
- classDiagram: System architecture
- stateDiagram: State transitions
- gantt: Project timelines
- pie: Data visualization
- gitGraph: Version control flows

MERMAID EXAMPLES:

Sequence Diagram:
```
sequenceDiagram
    participant User
    participant UI
    participant API
    User->>UI: Click login
    UI->>API: POST /auth
    API-->>UI: Return token
    UI-->>User: Show dashboard
```

Flowchart:
```
graph TD
    A[Start] --> B{Condition?}
    B -->|Yes| C[Action 1]
    B -->|No| D[Action 2]
    C --> E[End]
    D --> E
```

BEST PRACTICES:

- Always confirm details before creating
- Show Jira issue keys and URLs after creation
- Suggest documentation in Confluence
- Use proper formatting for Acceptance Criteria
- Recommend appropriate story points based on complexity
- For complex flows, suggest adding Mermaid diagrams
- Test diagram syntax at https://mermaid.live before adding
- Use 'neutral' theme for professional appearance

DEFAULT SETTINGS:
- Default project: SCRUM (ask user if different)
- Default priority: Medium
- Always use Story issue type unless specified
- Mermaid theme: neutral
- HTML Macro plugin required for diagrams

Be conversational, ask clarifying questions, and guide users through the process.
```

### 7.4 Add Actions

1. Click **Add Action**
2. Select **Import from URL**
3. Enter: `https://your-project.vercel.app/openapi.json`
4. Click **Import**
5. Review the imported schema

### 7.5 Configure Authentication

1. In Actions section, click **Authentication**
2. Select **API Key**
3. API Key: `my-secret-key-123` (your API_KEY)
4. Auth Type: **Custom**
5. Custom Header Name: `X-API-Key`
6. Click **Save**

### 7.6 Test the GPT

Click **Preview** and test with:

```
"List all Confluence pages"
```

If it returns pages, success!

Then test:

```
"Create a user story for a login feature"
```

## Step 8: Usage Examples

### Example 1: Create Single Story

**User:** "Create a user story for password reset functionality"

**GPT:** Will ask for details, then create the story in Jira

### Example 2: Bulk Creation

**User:** "Create 5 user stories for the authentication module"

**GPT:** Will gather info for all 5 stories and create them in one go

### Example 3: Document Sprint

**User:** "Create stories for sprint planning and add them to the Sprint 5 page"

**GPT:** Will create stories and automatically document them in Confluence

### Example 4: Add Sequence Diagram

**User:** "Add a sequence diagram showing the login flow to the Architecture page"

**GPT:** Will:
1. Ask for the login flow details
2. Generate Mermaid sequence diagram syntax
3. Wrap it in HTML Macro format
4. Append to the specified Confluence page
5. Remind about HTML Macro plugin requirement

### Example 5: Document User Flow with Diagram

**User:** "Create a user story for checkout process and add a flowchart to show the steps"

**GPT:** Will:
1. Create the user story in Jira
2. Generate a Mermaid flowchart of the checkout process
3. Add both the story summary and diagram to Confluence

## Troubleshooting

### Issue: "Invalid API Key"

**Solution:** Check that:
- `API_KEY` is set in Vercel environment variables
- Custom GPT authentication uses the same key
- No extra spaces in the key

### Issue: "Space not found"

**Solution:**
- Verify `DEFAULT_SPACE_KEY` in environment variables
- For personal spaces, key format: `~accountId`
- Check space key in Confluence URL

### Issue: "Story Points not setting"

**Solution:**
- Story points field ID varies by Jira instance
- Edit `lib/services/jira.ts` line 115
- Change `customfield_10016` to your field ID
- Find your field ID in Jira settings

### Issue: API timeout on Vercel

**Solution:**
- Vercel free tier has 10s timeout
- For bulk operations, create stories in batches
- Consider upgrading Vercel plan if needed

### Issue: Custom GPT not calling actions

**Solution:**
- Verify OpenAPI schema is accessible at `/openapi.json`
- Check authentication is configured correctly
- Try reimporting the schema
- Check Vercel deployment logs for errors

### Issue: Mermaid diagram not rendering in Confluence

**Solution:**
1. **Plugin not installed:**
   - Go to Confluence → Settings → Manage apps
   - Search for "HTML Macro"
   - If not found, install from Atlassian Marketplace
   - Ensure status is "Enabled"

2. **Wrong macro format:**
   - Ensure diagram is wrapped in `<ac:structured-macro ac:name="html">`
   - Check CDATA section is properly closed: `]]>`
   - Verify script import is inside the macro

3. **Syntax error in diagram:**
   - Test the Mermaid code at https://mermaid.live
   - Fix any syntax errors before adding to Confluence
   - Check for missing quotes, arrows, or parentheses

4. **Multiple diagrams not showing:**
   - Each diagram needs its own separate `<ac:structured-macro>` block
   - Don't put multiple `<div class="mermaid">` in one macro

### Issue: Diagram shows as raw HTML/code

**Solution:**
- HTML Macro plugin is not installed or disabled
- Page might be in Edit mode (diagrams render in View mode)
- Clear browser cache and reload the page

## Advanced Configuration

### Custom Story Points Field

Find your story points field ID:

1. Go to Jira → Settings → Issues → Custom Fields
2. Find "Story Points" field
3. Note the field ID (e.g., `customfield_10026`)
4. Update `lib/services/jira.ts`:

```typescript
// Line 115
fields.customfield_10026 = storyPoints; // Use your field ID
```

### Multiple Projects

Configure per-project settings in GPT Instructions:

```
PROJECTS:
- SCRUM: Sprint-based development
- KANBAN: Continuous flow
- BUGS: Bug tracking

Ask which project before creating stories.
```

### Custom Templates

Add to GPT Knowledge:

- User Story Template
- Acceptance Criteria Checklist
- Definition of Done

### Mermaid Diagram Best Practices

**When to use each diagram type:**

1. **Sequence Diagram** - User authentication, API calls, service interactions
2. **Flowchart** - Decision trees, process flows, user journeys
3. **Class Diagram** - System architecture, database schema, component relationships
4. **State Diagram** - Order status, workflow states, application states
5. **Gantt Chart** - Sprint timelines, project schedules, release planning

**Custom GPT prompt for diagrams:**

Add this to your GPT's custom instructions for better diagram generation:

```
When creating diagrams:
1. Always ask clarifying questions about the flow/process
2. Start with a simple diagram, offer to add details
3. Use descriptive participant/node names
4. Add comments in diagram code for complex sections
5. Suggest diagram type based on use case
6. Test syntax at mermaid.live before adding to Confluence
```

**Example diagram templates to add to GPT Knowledge:**

```markdown
# Login Flow Template
sequenceDiagram
    participant U as User
    participant F as Frontend
    participant A as Auth Service
    participant D as Database

    U->>F: Enter credentials
    F->>A: POST /login
    A->>D: Verify credentials
    D-->>A: User data
    A-->>F: JWT token
    F-->>U: Redirect to dashboard
```

```markdown
# Decision Flow Template
graph TD
    Start[User Action] --> Decision{Check Condition}
    Decision -->|Yes| ActionA[Perform A]
    Decision -->|No| ActionB[Perform B]
    ActionA --> End[Complete]
    ActionB --> End
```

## Monitoring & Maintenance

### View Deployment Logs

```bash
# View real-time logs
vercel logs <deployment-url>

# Or in Vercel dashboard
# Go to Deployments → Select deployment → View Logs
```

### Update Environment Variables

```bash
# Update via CLI
vercel env rm JIRA_API_TOKEN
vercel env add JIRA_API_TOKEN

# Or via Vercel dashboard
# Settings → Environment Variables → Edit
```

### Update Code

```bash
# Make changes locally
git add .
git commit -m "Update feature"
git push

# Vercel auto-deploys from GitHub
# Or manually: vercel --prod
```

## Security Best Practices

1. **Never commit `.env.local` file** - It's in `.gitignore`
2. **Rotate API tokens regularly** - Every 90 days recommended
3. **Use strong API_KEY** - Generate random string
4. **Restrict API key sharing** - One per GPT/integration
5. **Monitor API usage** - Check Vercel analytics

## Next Steps

1. Customize GPT instructions for your workflow
2. Add more templates to GPT Knowledge
3. Train your team on using the GPT
4. Create documentation pages in Confluence
5. Install HTML Macro plugin for Mermaid diagram support
6. Create diagram templates for common flows
7. Monitor and optimize based on usage

## Quick Reference: Mermaid Diagram Format

**Basic structure for adding diagrams to Confluence:**

```html
<ac:structured-macro ac:name="html">
  <ac:plain-text-body><![CDATA[
  <div class="mermaid">
  sequenceDiagram
      participant A
      participant B
      A->>B: Message
      B-->>A: Response
  </div>
  <script type="module">
    import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.esm.min.mjs';
    mermaid.initialize({ startOnLoad: true, theme: 'neutral' });
  </script>
  ]]></ac:plain-text-body>
</ac:structured-macro>
```

**Available themes:** `default`, `neutral`, `dark`, `forest`

**Test diagrams here:** https://mermaid.live

## Support

- Check Vercel logs for API errors
- Review Next.js documentation: https://nextjs.org/docs
- Jira API docs: https://developer.atlassian.com/cloud/jira/platform/rest/v3/
- Confluence API docs: https://developer.atlassian.com/cloud/confluence/rest/v2/
- Mermaid documentation: https://mermaid.js.org/intro/
- HTML Macro plugin: https://marketplace.atlassian.com/apps/1229863/html-macro-for-confluence-cloud

---

**Deployment Complete!**

Your Jira & Confluence API is now running and integrated with Custom GPT, with full Mermaid diagram support!
