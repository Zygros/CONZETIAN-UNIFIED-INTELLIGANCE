# Quick Setup Guide for phoenix_omega.py

## Overview

`phoenix_omega.py` is a GitHub repository uploader that automatically uploads files from your local directories to a GitHub repository. It requires a GitHub Personal Access Token to authenticate.

## Security First! 🔒

**This script now uses environment variables for credentials.** Never hardcode tokens in source code.

## Setup Steps

### 1. Create GitHub Personal Access Token

1. Go to https://github.com/settings/tokens
2. Click **"Generate new token (classic)"**
3. Give it a descriptive name (e.g., "Phoenix Omega Uploader")
4. Select the following scope:
   - ✅ **repo** (Full control of private repositories)
5. Click **"Generate token"**
6. **Copy the token immediately** (you won't see it again!)

### 2. Set Environment Variable

**Option A: Export in terminal (temporary)**
```bash
export GITHUB_TOKEN='ghp_YourActualTokenHere'
```

**Option B: Add to shell profile (persistent)**
```bash
# For bash
echo 'export GITHUB_TOKEN="ghp_YourActualTokenHere"' >> ~/.bashrc
source ~/.bashrc

# For zsh
echo 'export GITHUB_TOKEN="ghp_YourActualTokenHere"' >> ~/.zshrc
source ~/.zshrc
```

**Option C: Use .env file (recommended for projects)**
```bash
# Copy the example file
cp .env.example .env

# Edit .env and add your token
# GITHUB_TOKEN=ghp_YourActualTokenHere

# Load environment variables from .env
export $(cat .env | xargs)
```

### 3. Verify Setup

Test that your token is set correctly:

```bash
# Check if variable is set
echo $GITHUB_TOKEN

# Test authentication
curl -H "Authorization: token $GITHUB_TOKEN" https://api.github.com/user
```

You should see your GitHub user information in JSON format.

### 4. Run phoenix_omega.py

```bash
python phoenix_omega.py
```

The script will:
- ✅ Verify your GitHub token
- ✅ Get your GitHub username automatically
- ✅ Check if the repository exists (create if needed)
- ✅ Upload files from specified directories

## Troubleshooting

### Error: "GITHUB_TOKEN environment variable not set"

**Solution:** Set the environment variable as shown in Step 2 above.

### Error: "Failed to authenticate with GitHub API: 401"

**Possible causes:**
- Token is invalid or expired
- Token doesn't have the required `repo` scope
- Token was revoked

**Solution:** Generate a new token with the correct scopes.

### Error: "Failed to authenticate with GitHub API: 403"

**Possible causes:**
- Rate limit exceeded
- Token doesn't have permission for the requested operation

**Solution:** Wait a few minutes and try again, or check token permissions.

## Security Best Practices

1. ✅ **Never commit tokens to git** - They are now loaded from environment variables
2. ✅ **Rotate tokens regularly** - Generate new tokens periodically
3. ✅ **Use minimal scopes** - Only grant the permissions you need
4. ✅ **Revoke unused tokens** - Delete old tokens you're not using
5. ✅ **Keep .env in .gitignore** - Never commit your .env file

## What Changed?

**Previous (INSECURE):**
```python
TOKEN = "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"  # ❌ Hardcoded!
```

**Current (SECURE):**
```python
TOKEN = os.getenv("GITHUB_TOKEN")  # ✅ From environment!
if not TOKEN:
    print("ERROR: GITHUB_TOKEN not set")
    sys.exit(1)
```

## Need Help?

See [SECURITY.md](SECURITY.md) for complete security guidelines.
