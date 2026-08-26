# Phoenix Node Genesis - Security Configuration Guide

## Overview

The Phoenix Node Genesis API implements mandatory authentication to protect sensitive operations including:
- `/api/status` - System status and configuration information
- `/api/query` - Query the sovereign archive database
- `/api/ingest` - Add documents to the persistent archive

## Required Configuration

### API Key Setup

**The API_KEY environment variable is REQUIRED.** The service will refuse to start if:
1. API_KEY is not set or is empty
2. API_KEY is set to a known weak value (e.g., "change-me-in-production", "test", "dev", etc.)

### Generating a Strong API Key

Use one of these methods to generate a cryptographically secure API key:

```bash
# Method 1: Using OpenSSL (recommended)
export API_KEY=$(openssl rand -hex 32)

# Method 2: Using Python
export API_KEY=$(python3 -c "import secrets; print(secrets.token_hex(32))")

# Method 3: Using /dev/urandom
export API_KEY=$(head -c 32 /dev/urandom | base64 | tr -d '/+=' | cut -c1-64)
```

### Configuration Methods

#### Option 1: Environment Variable (Development)

```bash
export API_KEY="your-generated-key-here"
python phoenix_node_genesis.py
```

#### Option 2: .env File (Recommended)

1. Copy the example file:
   ```bash
   cp .env.example .env
   ```

2. Edit `.env` and set your API_KEY:
   ```
   API_KEY=your-generated-key-here
   ```

3. Start the service:
   ```bash
   python phoenix_node_genesis.py
   ```

#### Option 3: Docker Compose (Production)

1. Set the API_KEY in your environment or .env file:
   ```bash
   export API_KEY=$(openssl rand -hex 32)
   ```

2. Start the service:
   ```bash
   docker-compose up -d
   ```

## Using the API

All API requests must include the `X-API-Key` header:

```bash
# Example: Query the archive
curl -X POST http://localhost:5001/api/query \
  -H "Content-Type: application/json" \
  -H "X-API-Key: your-api-key-here" \
  -d '{"query": "search term", "n_results": 5}'

# Example: Check status
curl http://localhost:5001/api/status \
  -H "X-API-Key: your-api-key-here"

# Example: Ingest documents
curl -X POST http://localhost:5001/api/ingest \
  -H "Content-Type: application/json" \
  -H "X-API-Key: your-api-key-here" \
  -d '{"documents": [{"id": "doc1", "text": "content", "metadata": {}}]}'
```

## Security Best Practices

1. **Never commit API keys to version control**
   - Add `.env` to your `.gitignore`
   - Use environment variables or secrets management in production

2. **Use strong, randomly-generated keys**
   - Minimum 32 characters recommended
   - Use cryptographically secure random generation

3. **Rotate keys regularly**
   - Change API keys periodically
   - Immediately rotate if a key is compromised

4. **Use HTTPS in production**
   - Deploy behind a reverse proxy (nginx, Caddy, etc.)
   - Use TLS certificates (Let's Encrypt, etc.)

5. **Restrict network access**
   - Use firewall rules to limit access
   - Consider using a VPN or private network
   - Bind to `127.0.0.1` instead of `0.0.0.0` if only local access is needed

6. **Monitor access logs**
   - Review logs for unauthorized access attempts
   - Set up alerting for suspicious activity

## Troubleshooting

### "API_KEY is required but not configured"

The service refuses to start because API_KEY is not set. Set it using one of the methods above.

### "Weak API_KEY detected"

The service detected a known weak key. Generate a strong key using the methods above.

### "Unauthorized: X-API-Key header required"

Your API request is missing the `X-API-Key` header. Add it to your request.

### "Unauthorized: invalid API key"

The API key in your request doesn't match the configured key. Verify you're using the correct key.

## Migration from Previous Versions

If you were running a previous version without authentication:

1. Generate a strong API key
2. Set the API_KEY environment variable
3. Update all client applications to include the `X-API-Key` header
4. Restart the service

The service will no longer accept unauthenticated requests.
