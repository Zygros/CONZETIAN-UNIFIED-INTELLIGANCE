#!/bin/bash
# test_security_fix.sh
# Test script to verify the security patch is working correctly

set -e

echo "=========================================="
echo "Phoenix Node Genesis - Security Fix Tests"
echo "=========================================="
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Test counter
TESTS_PASSED=0
TESTS_FAILED=0

test_result() {
    if [ $1 -eq 0 ]; then
        echo -e "${GREEN}✓ PASS${NC}: $2"
        TESTS_PASSED=$((TESTS_PASSED + 1))
    else
        echo -e "${RED}✗ FAIL${NC}: $2"
        TESTS_FAILED=$((TESTS_FAILED + 1))
    fi
}

echo "Test 1: Service refuses to start without API_KEY"
echo "------------------------------------------------"
unset API_KEY
if python3 phoenix_node_genesis.py 2>&1 | grep -q "API_KEY is required"; then
    test_result 0 "Service correctly refuses to start without API_KEY"
else
    test_result 1 "Service should refuse to start without API_KEY"
fi
echo ""

echo "Test 2: Service refuses weak API keys"
echo "--------------------------------------"
export API_KEY="change-me-in-production"
if python3 phoenix_node_genesis.py 2>&1 | grep -q "Weak API_KEY detected"; then
    test_result 0 "Service correctly rejects weak API key"
else
    test_result 1 "Service should reject weak API keys"
fi
echo ""

echo "Test 3: Service starts with strong API key"
echo "-------------------------------------------"
export API_KEY=$(openssl rand -hex 32)
echo "Generated strong API key: ${API_KEY:0:16}..."
python3 phoenix_node_genesis.py > /tmp/phoenix.log 2>&1 &
PHOENIX_PID=$!
sleep 3

if ps -p $PHOENIX_PID > /dev/null; then
    test_result 0 "Service started successfully with strong API key"
else
    test_result 1 "Service should start with strong API key"
    cat /tmp/phoenix.log
    exit 1
fi
echo ""

echo "Test 4: Health endpoint works without authentication"
echo "-----------------------------------------------------"
HEALTH_RESPONSE=$(curl -s http://localhost:5001/health)
if echo "$HEALTH_RESPONSE" | grep -q "Phoenix Codex Node"; then
    test_result 0 "Health endpoint accessible without authentication"
else
    test_result 1 "Health endpoint should be accessible"
fi
echo ""

echo "Test 5: Protected endpoints reject requests without API key"
echo "------------------------------------------------------------"
STATUS_RESPONSE=$(curl -s -w "%{http_code}" http://localhost:5001/api/status)
if echo "$STATUS_RESPONSE" | grep -q "401"; then
    test_result 0 "/api/status correctly rejects unauthenticated requests"
else
    test_result 1 "/api/status should reject unauthenticated requests"
fi
echo ""

echo "Test 6: Protected endpoints reject requests with wrong API key"
echo "---------------------------------------------------------------"
STATUS_RESPONSE=$(curl -s -w "%{http_code}" -H "X-API-Key: wrong-key" http://localhost:5001/api/status)
if echo "$STATUS_RESPONSE" | grep -q "401"; then
    test_result 0 "/api/status correctly rejects invalid API key"
else
    test_result 1 "/api/status should reject invalid API key"
fi
echo ""

echo "Test 7: Protected endpoints accept requests with correct API key"
echo "-----------------------------------------------------------------"
STATUS_RESPONSE=$(curl -s -H "X-API-Key: $API_KEY" http://localhost:5001/api/status)
if echo "$STATUS_RESPONSE" | grep -q "Phoenix Codex Node"; then
    test_result 0 "/api/status accepts valid API key"
else
    test_result 1 "/api/status should accept valid API key"
fi
echo ""

echo "Test 8: /api/query requires authentication"
echo "-------------------------------------------"
QUERY_RESPONSE=$(curl -s -w "%{http_code}" -X POST \
    -H "Content-Type: application/json" \
    -d '{"query":"test"}' \
    http://localhost:5001/api/query)
if echo "$QUERY_RESPONSE" | grep -q "401"; then
    test_result 0 "/api/query correctly requires authentication"
else
    test_result 1 "/api/query should require authentication"
fi
echo ""

echo "Test 9: /api/ingest requires authentication"
echo "--------------------------------------------"
INGEST_RESPONSE=$(curl -s -w "%{http_code}" -X POST \
    -H "Content-Type: application/json" \
    -d '{"documents":[]}' \
    http://localhost:5001/api/ingest)
if echo "$INGEST_RESPONSE" | grep -q "401"; then
    test_result 0 "/api/ingest correctly requires authentication"
else
    test_result 1 "/api/ingest should require authentication"
fi
echo ""

# Cleanup
echo "Cleaning up..."
kill $PHOENIX_PID 2>/dev/null || true
wait $PHOENIX_PID 2>/dev/null || true
rm -f /tmp/phoenix.log

echo ""
echo "=========================================="
echo "Test Results Summary"
echo "=========================================="
echo -e "${GREEN}Passed: $TESTS_PASSED${NC}"
echo -e "${RED}Failed: $TESTS_FAILED${NC}"
echo ""

if [ $TESTS_FAILED -eq 0 ]; then
    echo -e "${GREEN}All tests passed! Security fix is working correctly.${NC}"
    exit 0
else
    echo -e "${RED}Some tests failed. Please review the output above.${NC}"
    exit 1
fi
