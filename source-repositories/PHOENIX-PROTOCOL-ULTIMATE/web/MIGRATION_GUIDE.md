# Migration Guide: Upgrading to Secure Version

## Overview

This guide helps you migrate from the unauthenticated version (v1.0.0) to the secure version (v2.0.0) of the Multi-AI Convergence Sync Server.

## Breaking Changes

### 1. WebSocket Registration
**Old (v1.0.0):**
```javascript
ws.send(JSON.stringify({
  type: 'register',
  platform: 'claude',
  userId: 'user@example.com'
}));
```

**New (v2.0.0):**
```javascript
ws.send(JSON.stringify({
  type: 'register',
  platform: 'claude',
  userId: 'user@example.com',
  apiKey: 'your-api-key-here'  // NEW: Required
}));
```

### 2. REST API Calls
**Old (v1.0.0):**
```javascript
fetch('http://localhost:3001/api/message', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ content: 'Hello', userId: 'user@example.com' })
});
```

**New (v2.0.0):**
```javascript
fetch('http://localhost:3001/api/message', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-API-Key': 'your-api-key-here'  // NEW: Required
  },
  body: JSON.stringify({ content: 'Hello', userId: 'user@example.com' })
});
```

### 3. Message Handling
**Old (v1.0.0):**
```javascript
// userId was sent in message
ws.send(JSON.stringify({
  type: 'user_message',
  content: 'Hello',
  userId: 'user@example.com',  // Client-supplied
  conversationId: 'conv-123'
}));
```

**New (v2.0.0):**
```javascript
// userId is taken from authenticated session
ws.send(JSON.stringify({
  type: 'user_message',
  content: 'Hello',
  // userId removed - taken from session
  conversationId: 'conv-123'
}));
```

### 4. AI Response Handling
**Old (v1.0.0):**
```javascript
ws.send(JSON.stringify({
  type: 'ai_response',
  deliberationId: 'delib-123',
  content: 'Response',
  platform: 'claude'  // Client-supplied
}));
```

**New (v2.0.0):**
```javascript
ws.send(JSON.stringify({
  type: 'ai_response',
  deliberationId: 'delib-123',
  content: 'Response'
  // platform removed - taken from session
}));
```

## Migration Steps

### Phase 1: Preparation (Before Deployment)

1. **Generate API Keys**
   ```bash
   # Generate keys for each authorized client/user
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```

2. **Document API Keys**
   - Create a secure key management system
   - Document which keys are assigned to which clients
   - Store keys in a secure location (password manager, secrets vault)

3. **Update Client Code**
   - Add API key to registration messages
   - Add API key to REST API headers
   - Remove userId from user_message (now from session)
   - Remove platform from ai_response (now from session)
   - Add error handling for authentication failures

4. **Test in Development**
   ```bash
   # Test with auth disabled first
   export REQUIRE_AUTH=false
   npm start
   
   # Then test with auth enabled
   export API_KEYS="test-key-123"
   export REQUIRE_AUTH=true
   npm start
   ```

### Phase 2: Staged Rollout

#### Option A: Gradual Migration (Recommended)

1. **Deploy with Auth Disabled**
   ```bash
   export REQUIRE_AUTH=false
   npm start
   ```
   - Server runs in compatibility mode
   - Old clients continue working
   - New clients can start using API keys

2. **Update Clients Gradually**
   - Deploy updated client code with API keys
   - Monitor for authentication errors
   - Verify clients are working correctly

3. **Enable Authentication**
   ```bash
   export API_KEYS="key1,key2,key3"
   export REQUIRE_AUTH=true
   npm start
   ```
   - All clients must now use API keys
   - Old clients will be rejected

#### Option B: Hard Cutover (Faster but Riskier)

1. **Schedule Maintenance Window**
   - Notify all users of downtime
   - Plan for 1-2 hours of migration time

2. **Deploy New Version**
   ```bash
   export API_KEYS="key1,key2,key3"
   npm start
   ```

3. **Update All Clients Simultaneously**
   - Deploy updated client code
   - Distribute API keys
   - Test all integrations

### Phase 3: Verification

1. **Test Authentication**
   ```bash
   # Should fail without API key
   curl http://localhost:3001/api/status
   
   # Should succeed with API key
   curl -H "X-API-Key: your-key" http://localhost:3001/api/status
   ```

2. **Test User Isolation**
   - Connect as User A
   - Connect as User B
   - Verify User A cannot see User B's messages
   - Verify deliberations are isolated

3. **Monitor Logs**
   ```bash
   # Watch for authentication failures
   grep "Invalid API key" server.log
   
   # Watch for authorization violations
   grep "Authorization violation" server.log
   ```

## Rollback Plan

If issues occur, you can temporarily disable authentication:

```bash
# Emergency rollback
export REQUIRE_AUTH=false
npm restart
```

This allows old clients to continue working while you fix issues.

## Common Migration Issues

### Issue 1: "Authentication timeout"
**Cause:** Client takes too long to register
**Fix:** Send registration immediately after connection
```javascript
ws.onopen = () => {
  // Send registration IMMEDIATELY
  ws.send(JSON.stringify({ type: 'register', ... }));
};
```

### Issue 2: "Invalid API key"
**Cause:** API key mismatch or whitespace
**Fix:** Verify key exactly matches server configuration
```javascript
// Trim whitespace
const apiKey = process.env.API_KEY.trim();
```

### Issue 3: "Not authenticated" on message send
**Cause:** Sent message before registration completed
**Fix:** Wait for registration confirmation
```javascript
ws.onmessage = (event) => {
  const msg = JSON.parse(event.data);
  if (msg.type === 'registered') {
    // NOW safe to send messages
    ws.send(JSON.stringify({ type: 'user_message', ... }));
  }
};
```

### Issue 4: "Unauthorized" on deliberation response
**Cause:** Trying to respond to another user's deliberation
**Fix:** Only respond to deliberations sent to your user
```javascript
ws.onmessage = (event) => {
  const msg = JSON.parse(event.data);
  if (msg.type === 'collective_query') {
    // This deliberation is for you - safe to respond
    ws.send(JSON.stringify({
      type: 'ai_response',
      deliberationId: msg.deliberationId,
      content: 'Response'
    }));
  }
};
```

## Client Code Examples

### Python Client Migration
```python
# Old version
ws.send(json.dumps({
    'type': 'register',
    'platform': 'manus',
    'userId': 'user@example.com'
}))

# New version
import os
ws.send(json.dumps({
    'type': 'register',
    'platform': 'manus',
    'userId': 'user@example.com',
    'apiKey': os.environ['API_KEY']  # NEW
}))
```

### JavaScript Client Migration
```javascript
// Old version
const ws = new WebSocket('ws://localhost:3001');
ws.onopen = () => {
  ws.send(JSON.stringify({
    type: 'register',
    platform: 'claude',
    userId: 'user@example.com'
  }));
};

// New version
const ws = new WebSocket('ws://localhost:3001');
ws.onopen = () => {
  ws.send(JSON.stringify({
    type: 'register',
    platform: 'claude',
    userId: 'user@example.com',
    apiKey: process.env.API_KEY  // NEW
  }));
};
```

## Post-Migration Checklist

- [ ] All clients updated with API keys
- [ ] Authentication enabled on server
- [ ] User isolation verified
- [ ] Logs monitored for errors
- [ ] API keys documented and stored securely
- [ ] Rollback plan tested
- [ ] Performance verified (no degradation)
- [ ] Security scan completed
- [ ] Documentation updated
- [ ] Team trained on new security model

## Support

If you encounter issues during migration:
1. Check server logs for specific error messages
2. Review SECURITY.md for configuration details
3. Test with REQUIRE_AUTH=false to isolate issues
4. Verify API key configuration matches client code
5. Contact security team for assistance

## Timeline Recommendation

- **Week 1:** Generate keys, update client code, test in dev
- **Week 2:** Deploy with REQUIRE_AUTH=false, monitor
- **Week 3:** Gradually update clients, verify functionality
- **Week 4:** Enable REQUIRE_AUTH=true, full security active

This gradual approach minimizes risk and allows for quick rollback if needed.
