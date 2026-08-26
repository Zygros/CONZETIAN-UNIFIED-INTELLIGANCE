# Security Policy

## Credential Management

### ⚠️ CRITICAL: Never Commit Credentials

This repository has been sanitized to remove hardcoded credentials that were previously committed. All users must follow these security practices:

### 1. Use Environment Variables

**Never hardcode credentials in source code.** Always use environment variables:

```bash
# Set environment variables before running scripts
export GITHUB_TOKEN='your_github_token_here'
export TELEGRAM_TOKEN_CONTROL='your_telegram_token_here'
export TELEGRAM_TOKEN_EXPERIMENTAL='your_telegram_token_here'
export CHAT_ID='your_chat_id_here'
```

### 2. Use .env Files (Not Committed)

Create a `.env` file from the template:

```bash
cp .env.example .env
# Edit .env with your actual credentials
# The .env file is in .gitignore and will NOT be committed
```

### 3. GitHub Token Requirements

For `phoenix_omega.py` to work, you need a GitHub Personal Access Token with:

- **Scopes Required:** `repo` (full control of private repositories)
- **Create Token:** https://github.com/settings/tokens
- **Token Format:** `ghp_` followed by 36 alphanumeric characters

### 4. Rotate Compromised Credentials

If you discover that credentials have been committed to version control:

1. **Immediately revoke the compromised token** on the service provider's website
2. **Generate a new token** with appropriate scopes
3. **Update your local environment** with the new token
4. **Never commit the new token** to version control

### 5. Shell History Safety

Be aware that shell history files (`.bash_history`, `.zsh_history`) can capture credentials:

- **Avoid typing credentials directly** in the terminal
- **Use environment variables** or secure input methods
- **Never commit shell history files** to version control (they are now in `.gitignore`)

### 6. Code Review Checklist

Before committing code, verify:

- [ ] No hardcoded API keys, tokens, or passwords
- [ ] All credentials loaded from environment variables
- [ ] `.env` file is in `.gitignore`
- [ ] No credentials in comments or documentation
- [ ] Shell history files are not included

## Reporting Security Issues

If you discover a security vulnerability in this repository, please report it by:

1. **Do NOT create a public issue**
2. Contact the repository maintainer directly
3. Provide details about the vulnerability
4. Allow time for the issue to be addressed before public disclosure

## Historical Note

This repository previously contained hardcoded GitHub Personal Access Tokens in:
- `phoenix_omega.py` (line 3)
- `.bash_history` (multiple instances)

These credentials have been:
- ✅ Removed from source code
- ✅ Sanitized from shell history
- ✅ Replaced with environment variable loading
- ⚠️ **Must be considered compromised and rotated**

All tokens found in the git history should be treated as compromised and revoked.