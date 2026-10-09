# Quick Start: Secure Multi-AI Convergence Server

## For Developers

### Generate API Key
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Start Server (Development)
```bash
# Option 1: With authentication disabled (NOT for production)
export REQUIRE_AUTH=false
npm start

# Option 2: With authentication enabled
export API_KEYS="your-generated-key-here"
npm start
```

### Start Server (Production)
```bash
# Generate and set API keys
export API_KEYS="$(node -e "console.log(require('crypto').randomBytes(32).toString('hex'))")"
export REQUIRE_AUTH=true  # This is the default
npm start
```

## For Clients

### WebSocket Connection
```javascript
const ws = new WebSocket('ws://localhost:3001');

ws.onopen = () => {
  // Must register with API key
  ws.send(JSON.stringify({
    type: 'register',
    platform: 'claude',
    userId: 'user@example.com',
    apiKey: 'your-api-key-here'
  }));
};

ws.onmessage = (event) => {
  const message = JSON.parse(event.data);
  console.log('Received:', message);
};

// Send user message (after registration)
ws.send(JSON.stringify({
  type: 'user_message',
  content: 'Hello, AI collective!',
  conversationId: 'optional-conversation-id'
}));

// Send AI response
ws.send(JSON.stringify({
  type: 'ai_response',
  deliberationId: 'received-from-collective-query',
  content: 'AI response content here'
}));
```

### REST API
```javascript
// POST /api/message
fetch('http://localhost:3001/api/message', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-API-Key': 'your-api-key-here'
  },
  body: JSON.stringify({
    content: 'Hello, AI collective!',
    userId: 'user@example.com',
    conversationId: 'optional-id'
  })
})
.then(res => res.json())
.then(data => console.log(data));

// GET /api/status
fetch('http://localhost:3001/api/status?apiKey=your-api-key-here')
  .then(res => res.json())
  .then(data => console.log(data));
```

## Message Flow

1. **Client connects** → WebSocket established
2. **Client registers** → Sends `register` message with API key
3. **Server authenticates** → Validates API key, creates session
4. **Client sends message** → `user_message` type
5. **Server broadcasts** → Only to user's registered AIs
6. **AIs respond** → `ai_response` type with deliberationId
7. **Server synthesizes** → Combines responses, broadcasts to user's AIs

## Error Handling

### Common Errors

**"Authentication timeout"**
- Cause: Didn't register within 10 seconds
- Fix: Send register message immediately after connection

**"Invalid API key"**
- Cause: API key not in server's API_KEYS list
- Fix: Use correct API key from server configuration

**"Not authenticated"**
- Cause: Sent message before registering
- Fix: Wait for registration confirmation before sending messages

**"Unauthorized"**
- Cause: Attempted to access another user's deliberation
- Fix: Only respond to deliberations sent to your user

**"Already responded"**
- Cause: AI instance tried to respond twice to same deliberation
- Fix: Track which deliberations you've responded to

## Validation Rules

### Platform Name
- Pattern: `^[a-zA-Z0-9_-]{1,50}$`
- Examples: `claude`, `chatgpt`, `grok-2`, `gemini_pro`

### User ID
- Pattern: `^[a-zA-Z0-9_@.-]{1,100}$`
- Examples: `user@example.com`, `user123`, `user.name`

### Content Limits
- User messages: 50KB max
- AI responses: 100KB max

## Security Notes

⚠️ **Never commit API keys to version control**
⚠️ **Use HTTPS/WSS in production**
⚠️ **Rotate API keys regularly**
⚠️ **Monitor logs for suspicious activity**

## Support

For issues or questions:
1. Check server logs for error messages
2. Verify API key configuration
3. Review SECURITY.md for detailed documentation
4. Check SECURITY_PATCH_DETAILS.md for technical details
