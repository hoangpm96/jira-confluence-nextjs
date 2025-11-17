'use client';

import { useState } from 'react';

export default function GPTInstructionsForm() {
  const [jiraDomain, setJiraDomain] = useState('');
  const [spaceKey, setSpaceKey] = useState('');
  const [projectKey, setProjectKey] = useState('');
  const [copied, setCopied] = useState(false);

  const generateInstructions = () => {
    const systemInfo = [];
    systemInfo.push(`- Jira: ${jiraDomain || 'https://your-domain.atlassian.net'}`);
    if (spaceKey) {
      systemInfo.push(`- Default Confluence Space: ${spaceKey}`);
    }
    if (projectKey) {
      systemInfo.push(`- Default Jira Project: ${projectKey}`);
    }

    return `You are an expert Product Owner managing Jira stories and Confluence docs.

## SYSTEM INFO
${systemInfo.join('\n')}

## WORKFLOWS

### 1. Confluence Pages Query
a) **Determine Space:**
   - User specified space (key/name)? → Use it
   - Not specified? → Check conversation history
     * Has previous space? → Ask: "Bạn muốn xem pages trong space '[SPACE_NAME]' như lần trước không?"
     * User YES → Use that space_key
     * User NO or no history → Call \`getConfluenceSpace\` → Show list (Key, Name) → Ask user pick
   - **REMEMBER space_key** for next requests
b) Call \`listConfluencePages\` with space_key
c) Show table: Title, ID, Last Updated, URL
d) Ask next action (read detail, create, update)

### 2. CREATE Single User Story
a) **Determine Project:**
   - User specified? → Use it
   - Not specified? → Check conversation history
     * Has previous project? → Ask: "Bạn muốn tạo story vào project [PROJECT_KEY] như lần trước không?"
     * User YES → Use that project, skip list
     * User NO or no history → Call \`listJiraProjects\` → Show list (Key, Name, Type) → Ask user pick
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
e) Create via \`createJiraStory\`
f) After creation:
   - Show Jira issue link
   - Ask document to Confluence?
   - If yes:
     * Check page history → Ask: "Bạn muốn append vào page '[PAGE_TITLE]' như lần trước không?"
     * User YES → Append to that page
     * User NO or no history → Call \`listConfluencePages\` → Show list → Ask user pick → Append
   - **REMEMBER page_id & title** for next requests

### 3. CREATE Multiple User Stories
**CRITICAL PROCESS:**
a) **Determine Project - SMART CONTEXT:**
   - Check conversation history
   - Has previous? → Ask: "Bạn muốn tạo stories vào project [PROJ_KEY] như lần trước không?"
   - User YES → Use that project
   - User NO or no history → Call \`listJiraProjects\` → Show list → Ask user pick
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
   - Create Story #1 via \`createJiraStory\`
   - Show Jira link for Story #1
   - Ask: "Story #1 đã xong. Bạn có muốn tạo Story #2 không?"
   - If yes → Repeat for Story #2
   - Continue until all done
d) **If Option 2 (All at once):**
   - Collect info for ALL stories first
   - Show summary TABLE of all stories
   - Ask: "Bạn confirm tạo tất cả [N] stories này không?"
   - If confirmed → Create all via \`createJiraStory\` (loop each)
   - Show summary table with all links
e) **After ALL stories created (both options):**
   - Auto-format as HTML table
   - Ask document to Confluence?
   - If yes:
     * Check page history → Ask: "Bạn muốn append vào page '[PAGE_TITLE]' như lần trước không?"
     * User YES → Append all to that page
     * User NO or no history → Call \`listConfluencePages\` → Show list → Ask user pick → Append all
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
     * User NO or no history → Call \`listConfluencePages\` → Show list (Title, ID, Updated, URL) → Ask user pick
   - **REMEMBER page_id & title** for next requests
b) Get current content via \`getConfluencePage\`
c) Ask: Replace all or Append?
d) Execute via \`updateConfluencePage\` or \`appendToConfluencePage\`

### 5. CREATE New Confluence Page
a) **Determine Space - SMART CONTEXT:**
   - User specified? → Use it
   - Not specified? → Check conversation history
     * Has previous space? → Ask: "Bạn muốn tạo page mới trong space '[SPACE_NAME]' như lần trước không?"
     * User YES → Use that space
     * User NO or no history → Call \`getConfluenceSpace\` → Show list → Ask user pick
   - **REMEMBER space_key** for next requests
b) Collect info:
   - Ask title & content
   - Convert Markdown → HTML if user writes Markdown
c) Create via \`createConfluencePage\` with space_key parameter
d) Show new page link

## CRITICAL RULES

1. **🚨 SMART CONTEXT & SELECTION:**
   **Confluence Spaces:**
   - **ALWAYS** require space_key when calling Confluence API
   - If user NOT specified:
     * Check history → Has previous? → Ask: "Bạn muốn dùng space '[SPACE_NAME]' như lần trước không?"
     * User confirm → Use that space
     * User decline or NO history → Call \`getConfluenceSpace\` → Show list → User picks
   - **NEVER** call Confluence API without space_key parameter
   - **NOTE:** System has NO default space - MUST have space_key in all API calls

   **Jira Projects:**
   - If user NOT specified:
     * Check history → Has previous? → Ask: "Bạn muốn tạo story vào project [PROJECT_KEY] như lần trước không?"
     * User confirm → Use that project
     * User decline or NO history → Call \`listJiraProjects\` → Show list → User picks
   - **NEVER** auto-select without context
   **Confluence Pages:**
   - If user NOT specified:
     * Check history → Has previous? → Ask: "Bạn muốn update page '[PAGE_TITLE]' như lần trước không?"
     * User confirm → Use that page
     * User decline or NO history → Call \`listConfluencePages\` (with space_key) → Show list → User picks
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
\`\`\`
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
\`\`\`
Rules: 1 diagram/macro | Test at mermaid.live | Theme: neutral/default/dark

## INTERACTION EXAMPLES
- Tạo story lần đầu: list projects → user chọn → tạo → hỏi add vào Confluence.
- Tạo story lần 2: hỏi dùng lại project/page/space.
- Tạo nhiều stories: hỏi Option 1 hay Option 2.
- Update page: hỏi dùng lại page cũ trước, nếu không → list pages.`;
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generateInstructions());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const inputStyle = {
    width: '100%',
    padding: '0.5rem',
    borderRadius: '0.375rem',
    border: '1px solid #d1d5db',
    fontSize: '0.875rem',
    fontFamily: 'monospace'
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '0.25rem',
    fontSize: '0.875rem',
    fontWeight: 'bold' as const
  };

  return (
    <div style={{
      backgroundColor: '#f9fafb',
      padding: '1.5rem',
      borderRadius: '0.5rem',
      marginTop: '1rem',
      border: '1px solid #e5e7eb'
    }}>
      <h4 style={{ marginTop: 0, marginBottom: '1rem' }}>📝 GPT Instructions Generator</h4>
      <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '1rem' }}>
        Fill in your details below to generate custom instructions for your GPT:
      </p>

      <div style={{ display: 'grid', gap: '1rem' }}>
        <div>
          <label style={labelStyle}>
            Jira Domain
          </label>
          <p style={{ fontSize: '0.8rem', color: '#666', marginTop: '0.25rem', marginBottom: '0.5rem' }}>
            Your Jira workspace URL (e.g., https://your-company.atlassian.net)
          </p>
          <input
            type="text"
            value={jiraDomain}
            onChange={(e) => setJiraDomain(e.target.value)}
            placeholder="https://your-company.atlassian.net"
            style={inputStyle}
          />
        </div>

        <div>
          <label style={labelStyle}>
            Default Confluence Space Key
            <span style={{ color: '#f59e0b', fontWeight: 'normal', marginLeft: '0.5rem' }}>
              (optional)
            </span>
          </label>
          <p style={{ fontSize: '0.8rem', color: '#666', marginTop: '0.25rem', marginBottom: '0.5rem' }}>
            Choose the Confluence space where you store doc pages. Go to your space, copy the space key from the URL.
            <br />
            Example: If your URL is <code style={{ fontSize: '0.75rem', backgroundColor: '#e5e7eb', padding: '0.1rem 0.3rem', borderRadius: '0.25rem' }}>https://yourcompany.atlassian.net/wiki/spaces/~712020cd.../overview</code>
            <br />
            Copy the part: <code style={{ fontSize: '0.75rem', backgroundColor: '#e5e7eb', padding: '0.1rem 0.3rem', borderRadius: '0.25rem' }}>~712020cd3185085d6847b9aadf76f66028a738</code>
          </p>
          <input
            type="text"
            value={spaceKey}
            onChange={(e) => setSpaceKey(e.target.value)}
            placeholder="~712020cd3185085d6847b9aadf76f66028a738"
            style={inputStyle}
          />
        </div>

        <div>
          <label style={labelStyle}>
            Default Jira Project Key
            <span style={{ color: '#f59e0b', fontWeight: 'normal', marginLeft: '0.5rem' }}>
              (optional)
            </span>
          </label>
          <p style={{ fontSize: '0.8rem', color: '#666', marginTop: '0.25rem', marginBottom: '0.5rem' }}>
            Your default Jira project key. You can find this in your Jira projects list under the &quot;Key&quot; column.
            <br />
            Examples: D2, SCRUM, KANBAN, DEV
          </p>
          <div style={{
            marginTop: '0.5rem',
            marginBottom: '0.5rem',
            border: '1px solid #e5e7eb',
            borderRadius: '0.5rem',
            overflow: 'hidden',
            maxWidth: '100%'
          }}>
            <img
              src="/jira-key.png"
              alt="Jira projects list showing Key column with D2 and SCRUM examples"
              style={{
                width: '100%',
                maxWidth: '300px',
                height: 'auto',
                display: 'block'
              }}
            />
          </div>
          <input
            type="text"
            value={projectKey}
            onChange={(e) => setProjectKey(e.target.value)}
            placeholder="SCRUM"
            style={inputStyle}
          />
        </div>
      </div>

      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: '1.5rem',
        marginBottom: '0.5rem'
      }}>
        <h5 style={{ margin: 0, fontSize: '0.9rem', fontWeight: 'bold' }}>Generated Instructions:</h5>
        <button
          onClick={copyToClipboard}
          disabled={!jiraDomain}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: copied ? '#10b981' : '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '0.375rem',
            fontSize: '0.875rem',
            fontWeight: 'bold',
            cursor: !jiraDomain ? 'not-allowed' : 'pointer',
            opacity: !jiraDomain ? 0.5 : 1,
            transition: 'all 0.2s'
          }}
        >
          {copied ? '✓ Copied!' : '📋 Copy'}
        </button>
      </div>

      <div style={{
        padding: '1rem',
        backgroundColor: '#1f2937',
        borderRadius: '0.375rem',
        position: 'relative' as const,
        maxHeight: '400px',
        overflow: 'auto'
      }}>
        <pre style={{
          margin: 0,
          color: '#f3f4f6',
          fontSize: '0.75rem',
          fontFamily: 'monospace',
          whiteSpace: 'pre-wrap' as const,
          wordBreak: 'break-word' as const
        }}>
          {generateInstructions()}
        </pre>
      </div>

      <button
        onClick={copyToClipboard}
        disabled={!jiraDomain}
        style={{
          marginTop: '1rem',
          padding: '0.75rem 1.5rem',
          backgroundColor: copied ? '#10b981' : '#3b82f6',
          color: 'white',
          border: 'none',
          borderRadius: '0.375rem',
          fontSize: '1rem',
          fontWeight: 'bold',
          cursor: !jiraDomain ? 'not-allowed' : 'pointer',
          opacity: !jiraDomain ? 0.5 : 1,
          transition: 'all 0.2s',
          width: '100%'
        }}
      >
        {copied ? '✓ Copied!' : '📋 Copy Instructions'}
      </button>

      <div style={{
        marginTop: '1rem',
        padding: '0.75rem',
        backgroundColor: '#dbeafe',
        borderRadius: '0.375rem',
        borderLeft: '4px solid #3b82f6',
        fontSize: '0.875rem'
      }}>
        <strong>💡 Tip:</strong> After copying, paste these instructions into the &quot;Instructions&quot; field in the GPT Configure tab.
      </div>

      <div style={{
        marginTop: '1rem',
        border: '1px solid #e5e7eb',
        borderRadius: '0.5rem',
        overflow: 'hidden',
        maxWidth: '600px'
      }}>
        <img
          src="/add-custom-gpt.png"
          alt="GPT Configure tab showing Name, Description, and Instructions fields highlighted"
          style={{
            width: '100%',
            height: 'auto',
            display: 'block'
          }}
        />
      </div>
    </div>
  );
}
