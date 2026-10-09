# Security Configuration Guide

## Overview

The Multi-AI Convergence Sync Servers have been enhanced with comprehensive authentication and authorization controls to prevent unauthorized access and cross-user data disclosure.

## Security Features

### 1. API Key Authentication
- All WebSocket connections and REST API endpoints require valid API keys
- API keys must be provided during registration for WebSocket connections
- REST endpoints accept API keys via `X-API-Key` header or `apiKey` query parameter

### 2. User Isolation
- Messages and deliberations are scoped to individual users
- Each user can only see their own AI connections, messages, and deliberations
- Broadcasts are limited to a user's registered AI instances only

### 3. Session Binding
- WebSocket connections are bound to authenticated sessions
- Platform identities are verified against the authenticated session
- AI responses must come from the registered AI instance

### 4. Input Validation
- Platform names: alphanumeric, hyphens, underscores (max 50 chars)
- User IDs: alphanumeric and `@.-_` characters (max 100 chars)
- Message content: max 50KB
- AI response content: max 100KB

### 5. Authorization Checks
- Users cannot respond to deliberations owned by other users
- AI instances cannot respond multiple times to the same deliberation
- Status requests only return user-specific data

## Configuration

### Environment Variables

#### `API_KEYS` (Required for Production)
Comma-separated list of valid API keys.

```bash
export API_KEYS="key1_abc123def456,key2_xyz789ghi012,key3_mno345pqr678"
```

**Important:** Generate cryptographically secure random keys:
```bash
# Generate a secure API key
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

#### `REQUIRE_AUTH` (Optional, default: true)
Set to `false` to disable authentication (development only).

```bash
export REQUIRE_AUTH=false  # NOT RECOMMENDED FOR PRODUCTION
```

### Example Production Configuration

```bash
# Generate API keys
export API_KEYS="$(node -e "console.log(require('crypto').randomBytes(32).toString('hex'))")"

# Start the server
cd web/ssi-interface/adapters
npm start
```

## Client Integration

### WebSocket Registration

Clients must provide an API key during registration:

```javascript
const ws = new WebSocket('ws://localhost:3001');

ws.onopen = () => {
  ws.send(JSON.stringify({
    type: 'register',
    platform: 'claude',
    userId: 'user@example.com',
    apiKey: 'your-api-key-here'
  }));
};
```

### REST API Calls

Include the API key in the request header:

```javascript
fetch('http://localhost:3001/api/message', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-API-Key': 'your-api-key-here'
  },
  body: JSON.stringify({
    content: 'Hello, AI collective!',
    userId: 'user@example.com'
  })
});
```

Or as a query parameter:

```
POST http://localhost:3001/api/message?apiKey=your-api-key-here
```

## Security Best Practices

1. **Never commit API keys to version control**
   - Use environment variables or secure secret management
   - Add `.env` files to `.gitignore`

2. **Rotate API keys regularly**
   - Generate new keys periodically
   - Revoke old keys by removing them from `API_KEYS`

3. **Use HTTPS/WSS in production**
   - Deploy behind a reverse proxy (nginx, Caddy)
   - Enable TLS/SSL certificates

4. **Monitor for suspicious activity**
   - Review logs for authentication failures
   - Watch for authorization violation warnings

5. **Implement rate limiting**
   - Consider adding rate limiting middleware
   - Prevent abuse and DoS attacks

## Migration from Unauthenticated Version

If upgrading from an unauthenticated version:

1. **Generate API keys** for all legitimate clients
2. **Distribute keys securely** to authorized users
3. **Update client code** to include API keys in registration
4. **Test in development** with `REQUIRE_AUTH=false` first
5. **Enable authentication** by setting `REQUIRE_AUTH=true` or removing the variable
6. **Monitor logs** for authentication errors during rollout

## Troubleshooting

### "Authentication timeout" error
- Client must send `register` message within 10 seconds of connecting
- Ensure API key is included in the registration message

### "Invalid API key" error
- Verify the API key matches one in the `API_KEYS` environment variable
- Check for whitespace or encoding issues

### "Not authenticated" error
- Client attempted to send messages before registering
- Ensure registration completes successfully before sending other messages

### "Unauthorized" error on deliberation response
- AI attempted to respond to another user's deliberation
- Verify the deliberationId belongs to the authenticated user

## Security Disclosure

If you discover a security vulnerability, please report it to the project maintainers immediately. Do not disclose security issues publicly until they have been addressed.

## Version History

- **v2.0.0** - Added comprehensive authentication and authorization controls
- **v1.0.0** - Initial release (unauthenticated)
