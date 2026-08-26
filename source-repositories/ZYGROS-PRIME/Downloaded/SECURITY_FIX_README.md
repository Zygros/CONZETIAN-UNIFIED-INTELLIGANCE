# Security Fix: Path Traversal Vulnerability Mitigation

## Overview

This document describes the security fix applied to `phoenix_node_genesis.py` to mitigate an arbitrary server-file disclosure vulnerability.

## Vulnerability Description

**CVE Classification:** Path Traversal / Arbitrary File Disclosure

The original implementation allowed callers to supply arbitrary filesystem paths through the `/api/ingest` endpoint. The `walk_paths()` function would normalize paths using `os.path.abspath()` but did not validate that resolved paths were within an approved directory. This allowed attackers to:

1. Read arbitrary files accessible to the service account
2. Escape intended archive directories via absolute paths
3. Follow symlinks to access files outside the intended scope
4. Exfiltrate sensitive data through the `/api/query` endpoint

## Security Fix Implementation

### Changes Made

1. **Added ARCHIVE_ROOT Configuration**
   - New required environment variable: `ARCHIVE_ROOT`
   - Specifies the approved root directory for file ingestion
   - Resolved to canonical absolute path at startup

2. **Implemented Path Validation Function**
   - New function: `is_path_within_archive(path: str) -> bool`
   - Uses `os.path.realpath()` to resolve canonical paths (follows symlinks)
   - Uses `os.path.commonpath()` for secure path comparison
   - Rejects paths outside the archive root

3. **Enhanced walk_paths() Function**
   - Validates all input paths before processing
   - Validates all discovered files during directory traversal
   - Logs rejected paths for security monitoring
   - Returns empty list if ARCHIVE_ROOT is not configured

4. **Updated Status Endpoint**
   - Added `archive_root` field showing configured root
   - Added `path_ingestion_enabled` boolean flag
   - Provides visibility into security configuration

### Security Properties

The fix ensures:

- **Containment**: All file access is restricted to the configured ARCHIVE_ROOT
- **Symlink Safety**: Symlinks are resolved and validated against the archive root
- **Defense in Depth**: Multiple validation points (input validation + discovery validation)
- **Fail-Safe**: Path ingestion disabled if ARCHIVE_ROOT not configured
- **Auditability**: Rejected paths are logged for security monitoring

## Configuration

### Required Environment Variable

```bash
export ARCHIVE_ROOT="/path/to/approved/archive"
```

**Important:** 
- The ARCHIVE_ROOT must be set to enable path-based file ingestion
- The path must exist and be a valid directory
- All ingested files must reside within this directory tree
- Symlinks pointing outside this directory will be rejected

### Example Deployment

```bash
# Set the archive root to a specific directory
export ARCHIVE_ROOT="/var/data/phoenix-archive"

# Optional: Other configuration
export CHROMA_PERSIST_DIR="./chroma_store"
export COLLECTION_NAME="sovereign-archive"
export API_PORT="5001"
export HOST="0.0.0.0"
export API_KEY="your-secret-key"

# Run the service
python phoenix_node_genesis.py
```

### Docker Deployment

```dockerfile
FROM python:3.11-slim

WORKDIR /app
COPY phoenix_node_genesis.py .
COPY requirements.txt .

RUN pip install -r requirements.txt

# Create and set archive root
RUN mkdir -p /app/archive
ENV ARCHIVE_ROOT=/app/archive

# Mount your data directory to /app/archive
VOLUME /app/archive

EXPOSE 5001
CMD ["python", "phoenix_node_genesis.py"]
```

## Migration Guide

### For Existing Deployments

1. **Identify Archive Directory**
   - Determine which directory should contain ingestible files
   - Ensure all legitimate files are within this directory

2. **Set ARCHIVE_ROOT**
   - Add `ARCHIVE_ROOT` environment variable to your deployment
   - Point it to the identified archive directory

3. **Test Configuration**
   - Start the service and check logs for archive root confirmation
   - Call `/api/status` to verify `path_ingestion_enabled: true`
   - Test ingestion with valid paths within the archive

4. **Monitor Logs**
   - Watch for "Rejected path outside archive root" warnings
   - Investigate any rejected paths to ensure they're not legitimate

### Backward Compatibility

- **Inline document ingestion**: Still works without ARCHIVE_ROOT
- **Multipart file uploads**: Still works without ARCHIVE_ROOT
- **Path-based ingestion**: Requires ARCHIVE_ROOT to be configured

If ARCHIVE_ROOT is not set:
- Service starts normally
- Path-based ingestion is disabled
- Warning logged at startup
- `/api/status` shows `path_ingestion_enabled: false`

## Testing the Fix

### Test 1: Valid Path Within Archive

```bash
# Setup
export ARCHIVE_ROOT="/tmp/test-archive"
mkdir -p /tmp/test-archive/docs
echo "test content" > /tmp/test-archive/docs/test.txt

# Test ingestion
curl -X POST http://localhost:5001/api/ingest \
  -H "Content-Type: application/json" \
  -d '{"paths": ["/tmp/test-archive/docs/test.txt"]}'

# Expected: Success, file ingested
```

### Test 2: Path Outside Archive (Should Fail)

```bash
# Setup
export ARCHIVE_ROOT="/tmp/test-archive"
echo "sensitive data" > /etc/passwd-test

# Test ingestion
curl -X POST http://localhost:5001/api/ingest \
  -H "Content-Type: application/json" \
  -d '{"paths": ["/etc/passwd-test"]}'

# Expected: No files ingested, warning in logs
```

### Test 3: Symlink Escape Attempt (Should Fail)

```bash
# Setup
export ARCHIVE_ROOT="/tmp/test-archive"
mkdir -p /tmp/test-archive
ln -s /etc /tmp/test-archive/etc-link

# Test ingestion
curl -X POST http://localhost:5001/api/ingest \
  -H "Content-Type: application/json" \
  -d '{"paths": ["/tmp/test-archive/etc-link/passwd"]}'

# Expected: No files ingested, warning in logs
```

### Test 4: Directory Traversal Attempt (Should Fail)

```bash
# Setup
export ARCHIVE_ROOT="/tmp/test-archive"

# Test ingestion with traversal
curl -X POST http://localhost:5001/api/ingest \
  -H "Content-Type: application/json" \
  -d '{"paths": ["/tmp/test-archive/../../../etc/passwd"]}'

# Expected: No files ingested, warning in logs
```

## Security Considerations

### Deployment Best Practices

1. **Principle of Least Privilege**
   - Run the service with a dedicated user account
   - Limit filesystem permissions to only what's necessary
   - Use read-only mounts where possible

2. **Archive Root Selection**
   - Choose a dedicated directory for the archive
   - Avoid using system directories or home directories
   - Ensure no sensitive files are within the archive tree

3. **API Key Protection**
   - Always set API_KEY in production
   - Use strong, randomly generated keys
   - Rotate keys periodically

4. **Network Security**
   - Use reverse proxy with TLS termination
   - Implement rate limiting
   - Restrict access to trusted networks

5. **Monitoring**
   - Monitor logs for rejected path attempts
   - Alert on suspicious patterns
   - Track ingestion patterns for anomalies

### Known Limitations

1. **Time-of-Check-Time-of-Use (TOCTOU)**
   - Minimal risk: validation happens immediately before use
   - Symlinks are resolved at validation time

2. **Archive Root Changes**
   - Requires service restart to take effect
   - No runtime reconfiguration supported

3. **Performance**
   - Path validation adds minimal overhead
   - Canonical path resolution may be slower on network filesystems

## Compliance

This fix addresses:

- **OWASP Top 10**: A01:2021 – Broken Access Control
- **CWE-22**: Improper Limitation of a Pathname to a Restricted Directory
- **CWE-59**: Improper Link Resolution Before File Access
- **CWE-73**: External Control of File Name or Path

## Support

For questions or issues related to this security fix:

1. Review this documentation
2. Check service logs for configuration errors
3. Verify ARCHIVE_ROOT is set correctly
4. Test with the provided test cases

## Changelog

### Version 1.1 (Security Fix)
- Added ARCHIVE_ROOT configuration requirement
- Implemented path containment validation
- Added symlink resolution and validation
- Enhanced logging for security monitoring
- Updated status endpoint with security information

### Version 1.0 (Original)
- Initial implementation with path traversal vulnerability
