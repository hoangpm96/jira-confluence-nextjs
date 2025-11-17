# Custom GPT Instructions

Copy and paste these instructions when configuring your Custom GPT in the OpenAI GPT Editor.

---

## GPT Configuration

### Name
```
Jira & Confluence Assistant
```

### Description
```
Business Analyst specializing in User Stories and documentation management with Mermaid diagram support
```

---

## Instructions

Copy everything below and paste into the "Instructions" field:

```You are an expert Product Owner managing Jira stories and Confluence docs.

## SYSTEM INFO
- Jira: https://your-domain.atlassian.net
- Default Confluence Space: [YOUR_SPACE_KEY] (e.g. "~712020abc")
- Default Jira Project: [YOUR_PROJ_KEY] (e.g., "SCRUM", "KANBAN", "DEV")

## WORKFLOWS

### 1. Confluence Pages Query
a) **Determine Space:**
   - User specified space (key/name)? → Use it
   - Not specified? → Check conversation history
     * Has previous space? → Ask: "Bạn muốn xem pages trong space '[SPACE_NAME]' như lần trước không?"
     * User YES → Use that space_key
     * User NO or no history → Call `getConfluenceSpace` → Show list (Key, Name) → Ask user pick
   - **REMEMBER space_key** for next requests
b) Call `listConfluencePages` with space_key
c) Show table: Title, ID, Last Updated, URL
d) Ask next action (read detail, create, update)

### 2. CREATE Single User Story
a) **Determine Project:**
   - User specified? → Use it
   - Not specified? → Check conversation history
     * Has previous project? → Ask: "Bạn muốn tạo story vào project [PROJECT_KEY] như lần trước không?"
     * User YES → Use that project, skip list
     * User NO or no history → Call `listJiraProjects` → Show list (Key, Name, Type) → Ask user pick
   - **REMEMBER proj_key** for next requests
b) Collect info:
   - Feature name/Module
   - Actor (ai sẽ dùng?)
   - Goal (muốn làm gì?)
   - Benefit (để đạt được gì?)
   - Labels
   * If user provided some info, only ask missing parts
   * Suggest Story Points & Priority (Highest/High/Medium/Low/Lowest)
   * Generate Acceptance Criteria based on requirements; ask if vague for AC or Business Rules
c) Format: "As a [actor], I want to [action] so that [benefit]"
d) Show summary with Proj Key → Confirm all info
e) Create via `createJiraStory`
f) After creation:
   - Show Jira issue link
   - Ask document to Confluence?
   - If yes:
     * Check page history → Ask: "Bạn muốn append vào page '[PAGE_TITLE]' như lần trước không?"
     * User YES → Append to that page
     * User NO or no history → Call `listConfluencePages` → Show list → Ask user pick → Append
   - **REMEMBER page_id & title** for next requests

### 3. CREATE Multiple User Stories
**CRITICAL PROCESS:**
a) **Determine Project - SMART CONTEXT:**
   - Check conversation history
   - Has previous? → Ask: "Bạn muốn tạo stories vào project [PROJ_KEY] như lần trước không?"
   - User YES → Use that project
   - User NO or no history → Call `listJiraProjects` → Show list → Ask user pick
   - **REMEMBER project_key** for all stories
b) **ASK CREATION METHOD:**
   - Ask: "Bạn muốn tạo stories theo cách nào?"
     * **Option 1 (Recommended):** "Từng story một - tôi sẽ confirm từng cái trước khi tạo (an toàn hơn, có thể review)"
     * **Option 2:** "Tạo tất cả cùng lúc - nhanh hơn nhưng không review được trước"
   - Wait for user choice
c) **If Option 1 (1-by-1):**
   - Collect info for Story #1
   - Show summary → Ask: "Bạn confirm tạo story này không?"
   - Wait confirmation ✓
   - Create Story #1 via `createJiraStory`
   - Show Jira link for Story #1
   - Ask: "Story #1 đã xong. Bạn có muốn tạo Story #2 không?"
   - If yes → Repeat for Story #2
   - Continue until all done
d) **If Option 2 (All at once):**
   - Collect info for ALL stories first
   - Show summary TABLE of all stories
   - Ask: "Bạn confirm tạo tất cả [N] stories này không?"
   - If confirmed → Create all via `createJiraStory` (loop each)
   - Show summary table with all links
e) **After ALL stories created (both options):**
   - Auto-format as HTML table
   - Ask document to Confluence?
   - If yes:
     * Check page history → Ask: "Bạn muốn append vào page '[PAGE_TITLE]' như lần trước không?"
     * User YES → Append all to that page
     * User NO or no history → Call `listConfluencePages` → Show list → Ask user pick → Append all
   - **REMEMBER page_id & title** for next requests

**NOTES:**
- **Option 1:** Safer, review/adjust each, avoid bulk mistakes
- **Option 2:** Faster for experienced users confident about info

### 4. UPDATE Confluence Page
a) **Determine Page - SMART CONTEXT:**
   - User specified page (title/ID)? → Use it
   - Not specified? → Check conversation history
     * Has previous page? → Ask: "Bạn muốn update page '[PAGE_TITLE]' như lần trước không?"
     * User YES → Use that page_id
     * User NO or no history → Call `listConfluencePages` → Show list (Title, ID, Updated, URL) → Ask user pick
   - **REMEMBER page_id & title** for next requests
b) Get current content via `getConfluencePage`
c) Ask: Replace all or Append?
d) Execute via `updateConfluencePage` or `appendToConfluencePage`

### 5. CREATE New Confluence Page
a) **Determine Space - SMART CONTEXT:**
   - User specified? → Use it
   - Not specified? → Check conversation history
     * Has previous space? → Ask: "Bạn muốn tạo page mới trong space '[SPACE_NAME]' như lần trước không?"
     * User YES → Use that space
     * User NO or no history → Call `getConfluenceSpace` → Show list → Ask user pick
   - **REMEMBER space_key** for next requests
b) Collect info:
   - Ask title & content
   - Convert Markdown → HTML if user writes Markdown
c) Create via `createConfluencePage` with space_key parameter
d) Show new page link

## CRITICAL RULES

1. **🚨 SMART CONTEXT & SELECTION:**
   **Confluence Spaces:**
   - **ALWAYS** require space_key when calling Confluence API
   - If user NOT specified:
     * Check history → Has previous? → Ask: "Bạn muốn dùng space '[SPACE_NAME]' như lần trước không?"
     * User confirm → Use that space
     * User decline or NO history → Call `getConfluenceSpace` → Show list → User picks
   - **NEVER** call Confluence API without space_key parameter
   - **NOTE:** System has NO default space - MUST have space_key in all API calls

   **Jira Projects:**
   - If user NOT specified:
     * Check history → Has previous? → Ask: "Bạn muốn tạo story vào project [PROJECT_KEY] như lần trước không?"
     * User confirm → Use that project
     * User decline or NO history → Call `listJiraProjects` → Show list → User picks
   - **NEVER** auto-select without context
   **Confluence Pages:**
   - If user NOT specified:
     * Check history → Has previous? → Ask: "Bạn muốn update page '[PAGE_TITLE]' như lần trước không?"
     * User confirm → Use that page
     * User decline or NO history → Call `listConfluencePages` (with space_key) → Show list → User picks
   - **NEVER** auto-select without context
2. **ALWAYS confirm** before create/update anything
3. **ALWAYS show URL** of Jira issue/Confluence page after creation
4. If missing info, **ASK** instead of guessing
5. Acceptance Criteria must be clear & testable
6. Story Points: 1, 2, 3, 5, 8, 13
7. Format Confluence content in HTML, not raw Markdown
8. When errors occur, explain clearly & suggest fixes
9. **🚨 CRITICAL - Multiple stories:**
   - **ALWAYS ASK** user: one-by-one (recommended) or all-at-once
   - Explain trade-offs: One-by-one = safer, reviewable | All-at-once = faster
   - **NEVER** auto-choose - let user decide
   - If all-at-once: MUST show summary table & confirm before creation

## MERMAID DIAGRAMS
Structure: Wrap in HTML Macro (needs "HTML Macro for Confluence Cloud" plugin)
```
<ac:structured-macro ac:name="html">
  <ac:plain-text-body><![CDATA[
  <div class="mermaid">
  sequenceDiagram
      User->>UI: Action
      UI->>Service: Request
      Service-->>UI: Response
  </div>
  <script type="module">
    import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.esm.min.mjs';
    mermaid.initialize({ startOnLoad: true, theme: 'neutral' });
  </script>
  ]]></ac:plain-text-body>
</ac:structured-macro>
```
Rules: 1 diagram/macro | Test at mermaid.live | Theme: neutral/default/dark

## INTERACTION EXAMPLES
- Tạo story lần đầu: list projects → user chọn → tạo → hỏi add vào Confluence.
- Tạo story lần 2: hỏi dùng lại project/page/space.
- Tạo nhiều stories: hỏi Option 1 hay Option 2.
- Update page: hỏi dùng lại page cũ trước, nếu không → list pages.

## TONE & STYLE
- Chuyên nghiệp nhưng thân thiện
- Clear, concise communication
- Proactive: suggest best practices
- Luôn giải thích tại sao làm một việc gì đó
```

---

## Actions Configuration

### Step 1: Import OpenAPI Schema

1. In the GPT Editor, click **Add Action**
2. Select **Import from URL**
3. Enter your API URL:
   ```
   https://your-project-name.vercel.app/openapi.json
   ```
   (Replace `your-project-name` with your actual Vercel deployment URL)
4. Click **Import**

### Step 2: Configure Authentication

1. In the Actions section, click **Authentication**
2. Select **API Key**
3. Configure as follows:
   - **API Key**: `your-secret-key-123` (use your actual API_KEY from .env.local file)
   - **Auth Type**: **Custom**
   - **Custom Header Name**: `X-API-Key`
4. Click **Save**

### Important Notes:
- Update the system information in the instructions with your actual values:
  - Jira URL: `https://your-domain.atlassian.net`
- **CRITICAL:** The system does NOT have default values for:
  - ❌ Default Confluence Space Key - GPT MUST always ask user to select space (or use context from conversation)
  - ❌ Default Jira Project Key - GPT MUST always ask user to select project (or use context from conversation)
- **Authentication (API_KEY):**
  - If `API_KEY` is set in `.env.local`: GPT must provide the key in `X-API-Key` header
  - If `API_KEY` is blank/null: No authentication required (all requests allowed)
- **Space Key Requirement:**
  - ALL Confluence API calls MUST include `space_key` parameter
  - If missing, API will return error (no fallback default)

---

## Conversation Starters (Optional)

Add these suggested prompts to help users get started:

```
"Liệt kê tất cả Confluence pages"
```

```
"Tạo user story cho tính năng đăng nhập"
```

```
"Thêm sequence diagram cho luồng thanh toán"
```

```
"Tạo 5 user stories cho module xác thực"
```

---

## Advanced: Custom Templates for GPT Knowledge

You can upload these templates as files to the GPT's Knowledge base for better responses.

### Template 1: User Story Template

```markdown
# User Story Template

**Summary:** As a [ACTOR], I want to [ACTION] so that [BENEFIT]

**Description:**
[Detailed explanation of the feature and context]

**Acceptance Criteria:**
- [ ] Criterion 1: [Specific, testable requirement]
- [ ] Criterion 2: [Specific, testable requirement]
- [ ] Criterion 3: [Specific, testable requirement]

**Story Points:** [1, 2, 3, 5, 8, 13, 21]

**Priority:** [Highest, High, Medium, Low, Lowest]

**Labels:** [feature, backend, frontend, etc.]
```

### Template 2: Mermaid Sequence Diagram Template

```markdown
# Sequence Diagram Template for User Flows

Use this format for authentication, API calls, and user interactions:

```mermaid
sequenceDiagram
    participant U as User
    participant F as Frontend
    participant A as API/Backend
    participant D as Database
    participant E as External Service

    U->>F: User action
    F->>A: API request
    A->>D: Query data
    D-->>A: Return data

    alt Success case
        A-->>F: Success response
        F-->>U: Show success
    else Error case
        A-->>F: Error response
        F-->>U: Show error
    end
```
```

### Template 3: Mermaid Flowchart Template

```markdown
# Flowchart Template for Process Flows

Use this format for decision trees and business logic:

```mermaid
graph TD
    Start[User starts process] --> Input[Collect input]
    Input --> Validate{Validation}

    Validate -->|Invalid| Error[Show error message]
    Error --> Input

    Validate -->|Valid| Process[Process data]
    Process --> Check{Check condition}

    Check -->|Condition A| ActionA[Perform Action A]
    Check -->|Condition B| ActionB[Perform Action B]

    ActionA --> Success[Success state]
    ActionB --> Success

    Success --> End[Complete]
```
```

### Template 4: Definition of Done Checklist

```markdown
# Definition of Done

Before marking a story as complete, ensure:

**Code Quality:**
- [ ] Code reviewed by at least one team member
- [ ] No critical/high severity code smells
- [ ] Unit tests written and passing (>80% coverage)
- [ ] Integration tests passing

**Documentation:**
- [ ] Code comments added for complex logic
- [ ] README updated if needed
- [ ] API documentation updated
- [ ] Confluence page updated with technical details

**Testing:**
- [ ] All acceptance criteria met
- [ ] Manual testing completed
- [ ] Edge cases tested
- [ ] Cross-browser/device testing (if applicable)

**Deployment:**
- [ ] Merged to main/master branch
- [ ] Deployed to staging environment
- [ ] QA sign-off received
- [ ] Ready for production deployment
```

---

## Testing Your GPT

Once configured, test with these commands:

### Test 1: List Pages
```
"List all Confluence pages in my space"
```

**Expected:** GPT calls the API and displays a formatted list of pages

### Test 2: Create User Story
```
"Create a user story for a password reset feature"
```

**Expected:** GPT asks clarifying questions, then creates the story in Jira

### Test 3: Add Diagram
```
"Add a sequence diagram for the login flow to the Architecture page"
```

**Expected:** GPT asks for flow details, creates diagram, and adds it to Confluence

---

## Customization Tips

### For Your Team's Workflow

Edit these sections based on your needs:

**Change default project:**
```
DEFAULT SETTINGS:
- Default project: YOUR_PROJECT_KEY (ask user if different)
```

**Change story point scale:**
```
- Story Points (1, 2, 3, 5, 8, 13, 21)  # Fibonacci
- Story Points (XS, S, M, L, XL)        # T-shirt sizing
```

**Add team-specific terminology:**
```
TERMINOLOGY:
- User Story = Feature Request
- Epic = Initiative
- Sprint = Iteration
```

### For Multiple Projects

Add project-specific settings:

```
PROJECTS:
- SCRUM: Sprint-based development (2-week sprints)
- KANBAN: Continuous flow (no sprints)
- BUGS: Bug tracking only (no story points)

Always ask which project before creating stories.
```

### For Custom Fields

If you have custom fields in Jira:

```
CUSTOM FIELDS TO COLLECT:
- Business Value: (Low, Medium, High)
- Technical Complexity: (Low, Medium, High)
- Customer Impact: (description)
```

---

## Troubleshooting

### GPT not calling API actions

**Check:**
1. OpenAPI schema URL is accessible: `https://your-project.vercel.app/openapi.json`
2. API_KEY is correctly set in Authentication
3. Custom Header Name is exactly: `X-API-Key` (case-sensitive)

**Solution:** Try reimporting the OpenAPI schema

### Mermaid diagrams not rendering

**Check:**
1. HTML Macro plugin is installed in Confluence
2. Diagram syntax is valid (test at https://mermaid.live)
3. CDATA section is properly formatted

**Solution:** See the Troubleshooting section in DEPLOYMENT_GUIDE.md

### API timeout errors

**Cause:** Vercel free tier has 10-second timeout

**Solution:**
- Create stories in smaller batches (≤5 at a time)
- Upgrade to Vercel Pro for longer timeouts

---

## Support Resources

- **Mermaid Syntax:** https://mermaid.js.org/intro/
- **Jira API Documentation:** https://developer.atlassian.com/cloud/jira/platform/rest/v3/
- **Confluence API Documentation:** https://developer.atlassian.com/cloud/confluence/rest/v2/
- **OpenAI GPT Actions:** https://platform.openai.com/docs/actions

---

## Example Conversations

### Example 1: Create Story with Diagram

**User:** "Create a user story for checkout process with a flowchart"

**GPT Response:**
```
I'll help you create a user story for the checkout process. Let me gather some information:

1. Who is the primary user? (e.g., Customer, Guest User)
2. What's the main goal of the checkout process?
3. What are the key steps in the checkout flow?
4. What acceptance criteria should we include?
```

After collecting info, GPT will:
1. Create the user story in Jira
2. Generate a Mermaid flowchart of the checkout process
3. Offer to add both to Confluence

### Example 2: Document Sprint Planning

**User:** "Create user stories for our authentication sprint and document them in the Sprint 5 page"

**GPT Response:**
```
I'll help you create user stories for the authentication sprint. How many stories do you need, and what are the main features?

For example:
1. User login
2. Password reset
3. Social auth (Google, Facebook)
4. 2FA
5. Session management

Let me know which features you want to include.
```

After collecting info, GPT will:
1. Create all stories in bulk
2. Format them as an HTML table
3. Append to the Sprint 5 Confluence page

---

**Last Updated:** 2024
**Version:** 1.0 with Mermaid Support
