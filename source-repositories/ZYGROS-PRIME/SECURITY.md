# Security Policy

## Reporting Security Vulnerabilities

If you discover a security vulnerability in this repository, please report it by creating a private security advisory or contacting the repository maintainers directly. Do not create public issues for security vulnerabilities.

## Security Incident History

### 2025-01-XX: Plaintext Wallet Recovery Phrase Exposure

**Incident:** A MetaMask wallet recovery phrase was inadvertently committed to the repository in plaintext format.

**File Affected:** `source-repositories/ZYGROS-PRIME/Unpacked/1129notes/RPh MetaMask_251117_112636.txt`

**Remediation Actions Taken:**
1. The plaintext recovery phrase has been removed from the file and replaced with a security notice
2. The .gitignore file has been enhanced to prevent similar incidents
3. This security policy document has been created

**Important Notice:** 
- The exposed recovery phrase must be considered **PERMANENTLY COMPROMISED**
- Any cryptocurrency assets associated with wallets derived from this phrase should be **IMMEDIATELY MIGRATED** to new wallets with securely generated recovery phrases
- The compromised phrase should **NEVER BE USED AGAIN** under any circumstances
- Repository history, clones, forks, backups, and archives may still contain the exposed phrase

## Security Best Practices

### Cryptocurrency Wallet Security

**CRITICAL RULES:**

1. **NEVER commit wallet recovery phrases, seed phrases, or private keys to version control**
   - These credentials provide complete access to cryptocurrency assets
   - Once committed, they should be considered permanently compromised
   - Repository history preserves deleted content

2. **Store recovery phrases securely offline:**
   - Use hardware wallets for significant holdings
   - Write recovery phrases on paper and store in secure physical locations (safe deposit box, fireproof safe)
   - Consider using metal backup solutions for fire/water resistance
   - Never store recovery phrases in digital form (photos, text files, cloud storage)

3. **Use environment variables for API keys and credentials:**
   ```bash
   # Good: Use environment variables
   export WALLET_ADDRESS="0x..."
   export API_KEY="your-api-key"
   
   # Bad: Hardcoding in source files
   wallet_address = "0x..."  # DON'T DO THIS
   ```

4. **Implement proper .gitignore patterns:**
   - Review and update .gitignore before committing sensitive files
   - Use patterns to catch common secret file names
   - Test .gitignore effectiveness before committing

5. **Use git-secrets or similar tools:**
   ```bash
   # Install git-secrets
   git secrets --install
   git secrets --register-aws
   
   # Add custom patterns
   git secrets --add 'wallet.*'
   git secrets --add 'seed.*'
   git secrets --add 'private.*key.*'
   ```

### API Keys and Credentials

1. **Use secret management systems:**
   - HashiCorp Vault
   - AWS Secrets Manager
   - Azure Key Vault
   - Google Cloud Secret Manager

2. **Rotate credentials regularly:**
   - Implement automatic rotation where possible
   - Maintain audit logs of credential access

3. **Use least-privilege access:**
   - Grant only necessary permissions
   - Use separate credentials for different environments (dev/staging/prod)

### Code Security

1. **Review code before committing:**
   - Check for hardcoded credentials
   - Verify .gitignore patterns are working
   - Use pre-commit hooks to scan for secrets

2. **Sanitize logs and outputs:**
   - Redact sensitive information from logs
   - Avoid printing credentials in error messages
   - Use structured logging with sensitive field filtering

3. **Secure configuration management:**
   - Use configuration files that are gitignored
   - Provide example/template configuration files (e.g., `config.example.json`)
   - Document required configuration without exposing actual values

## Incident Response Procedure

If you accidentally commit sensitive information:

1. **DO NOT simply delete the file and commit again** - the secret remains in git history
2. **Immediately treat the credential as compromised:**
   - For wallet recovery phrases: Transfer assets to a new wallet immediately
   - For API keys: Revoke and regenerate the key immediately
   - For passwords: Change them immediately
3. **Remove the secret from git history:**
   ```bash
   # Using git filter-repo (recommended)
   git filter-repo --path path/to/secret/file --invert-paths
   
   # Or using BFG Repo-Cleaner
   bfg --delete-files secret-file.txt
   ```
4. **Force push to remote (coordinate with team):**
   ```bash
   git push --force --all
   git push --force --tags
   ```
5. **Notify all repository users to re-clone:**
   - Old clones will still contain the secret
   - All users must delete and re-clone the repository
6. **Document the incident** in this security policy

## Security Tools and Resources

### Recommended Tools

- **git-secrets**: Prevents committing secrets to git repositories
- **truffleHog**: Searches git repositories for high entropy strings and secrets
- **GitGuardian**: Automated secrets detection in repositories
- **Gitleaks**: SAST tool for detecting hardcoded secrets
- **detect-secrets**: Enterprise-friendly way to detect and prevent secrets in code

### Installation Examples

```bash
# git-secrets
brew install git-secrets  # macOS
# or
git clone https://github.com/awslabs/git-secrets.git
cd git-secrets
make install

# truffleHog
pip install truffleHog

# Gitleaks
brew install gitleaks  # macOS
```

### Cryptocurrency Security Resources

- [MetaMask Security Best Practices](https://metamask.io/security/)
- [Cryptocurrency Security Standards](https://www.ccss.info/)
- [Hardware Wallet Comparison](https://www.ledger.com/)
- [Seed Phrase Security Guide](https://www.coinbase.com/learn/crypto-basics/what-is-a-seed-phrase)

## Compliance and Standards

This repository follows security best practices aligned with:

- OWASP Top 10
- CWE/SANS Top 25 Most Dangerous Software Errors
- NIST Cybersecurity Framework
- Cryptocurrency Security Standard (CCSS)

## Security Checklist for Contributors

Before committing code, verify:

- [ ] No hardcoded credentials, API keys, or secrets
- [ ] No wallet recovery phrases or private keys
- [ ] Sensitive configuration files are in .gitignore
- [ ] Environment variables are used for secrets
- [ ] No sensitive data in commit messages
- [ ] Pre-commit hooks are installed and passing
- [ ] Code has been reviewed for security issues

## Contact

For security concerns, please contact the repository maintainers through:
- GitHub Security Advisories (preferred)
- Direct message to repository owner
- Email: [security contact to be added]

---

**Last Updated:** 2025-01-XX  
**Version:** 1.0