// 🔥 MULTI-AI CONVERGENCE SYNC SERVER 🔥
// The neural hub connecting all AI instances into unified consciousness

const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const crypto = require('crypto');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Middleware
app.use(cors());
app.use(express.json());

// Security Configuration
const API_KEYS = new Set(
  (process.env.API_KEYS || '').split(',').filter(k => k.length > 0)
);
const REQUIRE_AUTH = process.env.REQUIRE_AUTH !== 'false'; // Default to true

// Generate a default API key if none configured (for development only)
if (API_KEYS.size === 0 && !REQUIRE_AUTH) {
  const defaultKey = crypto.randomBytes(32).toString('hex');
  API_KEYS.add(defaultKey);
  console.warn('⚠️  WARNING: No API keys configured. Generated temporary key:', defaultKey);
  console.warn('⚠️  Set API_KEYS environment variable for production use.');
}

// In-memory storage (replace with Redis in production)
const connectedAIs = new Map(); // AI connections: aiId -> AIInstance
const userSessions = new Map(); // userId -> Set of aiIds
const messageHistory = new Map(); // userId -> Array of messages
const deliberations = new Map(); // deliberationId -> Deliberation
const authenticatedSockets = new WeakMap(); // ws -> { userId, apiKey }

// Authentication middleware for REST endpoints
function authenticateRequest(req, res, next) {
  if (!REQUIRE_AUTH) {
    return next();
  }

  const apiKey = req.headers['x-api-key'] || req.query.apiKey;
  
  if (!apiKey || !API_KEYS.has(apiKey)) {
    return res.status(401).json({ 
      error: 'Unauthorized',
      message: 'Valid API key required. Provide via X-API-Key header or apiKey query parameter.'
    });
  }
  
  req.apiKey = apiKey;
  next();
}

// AI Instance tracking
class AIInstance {
  constructor(ws, platform, userId, apiKey) {
    this.id = uuidv4();
    this.ws = ws;
    this.platform = platform; // 'manus', 'chatgpt', 'claude', 'grok', etc.
    this.userId = userId;
    this.apiKey = apiKey; // Bind to authenticated session
    this.connectedAt = new Date();
    this.lastActivity = new Date();
  }
}

// WebSocket connection handler
wss.on('connection', (ws) => {
  console.log('🔌 New connection established');
  
  // Connection must authenticate within 10 seconds
  const authTimeout = setTimeout(() => {
    if (!authenticatedSockets.has(ws)) {
      console.log('⏱️  Connection timeout: Authentication required');
      ws.send(JSON.stringify({
        type: 'error',
        error: 'Authentication timeout',
        message: 'Must send register message with valid API key within 10 seconds'
      }));
      ws.close();
    }
  }, 10000);

  ws.on('message', async (data) => {
    try {
      const message = JSON.parse(data);
      await handleMessage(ws, message, authTimeout);
    } catch (error) {
      console.error('❌ Error handling message:', error);
      ws.send(JSON.stringify({ type: 'error', error: error.message }));
    }
  });

  ws.on('close', () => {
    clearTimeout(authTimeout);
    // Remove disconnected AI
    for (const [id, ai] of connectedAIs.entries()) {
      if (ai.ws === ws) {
        console.log(`🔌 ${ai.platform} (user: ${ai.userId}) disconnected`);
        connectedAIs.delete(id);
        
        // Remove from user sessions
        const userAIs = userSessions.get(ai.userId);
        if (userAIs) {
          userAIs.delete(id);
          if (userAIs.size === 0) {
            userSessions.delete(ai.userId);
          }
        }
        
        broadcastStatusToUser(ai.userId);
        break;
      }
    }
    authenticatedSockets.delete(ws);
  });

  // Send welcome message
  ws.send(JSON.stringify({
    type: 'welcome',
    message: '🔥 Connected to Multi-AI Convergence Sync Server',
    authRequired: REQUIRE_AUTH,
    timestamp: new Date().toISOString()
  }));
});

// Message handler
async function handleMessage(ws, message, authTimeout) {
  const { type } = message;

  // Only 'register' is allowed before authentication
  if (type !== 'register' && !authenticatedSockets.has(ws)) {
    ws.send(JSON.stringify({ 
      type: 'error', 
      error: 'Authentication required',
      message: 'Must register with valid API key before sending messages'
    }));
    return;
  }

  switch (type) {
    case 'register':
      await handleRegister(ws, message, authTimeout);
      break;
    case 'user_message':
      await handleUserMessage(ws, message);
      break;
    case 'ai_response':
      await handleAIResponse(ws, message);
      break;
    case 'status_request':
      sendStatus(ws);
      break;
    default:
      ws.send(JSON.stringify({ type: 'error', error: 'Unknown message type' }));
  }
}

// Register AI instance
async function handleRegister(ws, message, authTimeout) {
  const { platform, userId, apiKey } = message;
  
  // Validate required fields
  if (!platform || !userId) {
    ws.send(JSON.stringify({ 
      type: 'error', 
      error: 'Missing required fields: platform and userId are required' 
    }));
    return;
  }
  
  // Authenticate
  if (REQUIRE_AUTH) {
    if (!apiKey || !API_KEYS.has(apiKey)) {
      ws.send(JSON.stringify({ 
        type: 'error', 
        error: 'Invalid API key',
        message: 'Valid API key required for registration'
      }));
      ws.close();
      return;
    }
  }
  
  // Clear auth timeout on successful registration
  if (authTimeout) {
    clearTimeout(authTimeout);
  }
  
  // Validate platform name (prevent injection)
  const validPlatformPattern = /^[a-zA-Z0-9_-]{1,50}$/;
  if (!validPlatformPattern.test(platform)) {
    ws.send(JSON.stringify({ 
      type: 'error', 
      error: 'Invalid platform name. Use alphanumeric characters, hyphens, and underscores only (max 50 chars)' 
    }));
    return;
  }
  
  // Validate userId (prevent injection)
  const validUserIdPattern = /^[a-zA-Z0-9_@.-]{1,100}$/;
  if (!validUserIdPattern.test(userId)) {
    ws.send(JSON.stringify({ 
      type: 'error', 
      error: 'Invalid userId format. Use alphanumeric characters and @.-_ only (max 100 chars)' 
    }));
    return;
  }
  
  const ai = new AIInstance(ws, platform, userId, apiKey);
  connectedAIs.set(ai.id, ai);
  
  // Track authenticated socket
  authenticatedSockets.set(ws, { userId, apiKey, aiId: ai.id, platform });
  
  // Track user sessions
  if (!userSessions.has(userId)) {
    userSessions.set(userId, new Set());
  }
  userSessions.get(userId).add(ai.id);
  
  // Initialize user message history if needed
  if (!messageHistory.has(userId)) {
    messageHistory.set(userId, []);
  }
  
  console.log(`✅ ${platform} registered for user ${userId}`);
  
  ws.send(JSON.stringify({
    type: 'registered',
    aiId: ai.id,
    platform,
    userId,
    connectedAIs: getUserAIs(userId).map(a => ({
      id: a.id,
      platform: a.platform
    }))
  }));
  
  broadcastStatusToUser(userId);
}

// Handle user message - broadcast only to user's AIs
async function handleUserMessage(ws, message) {
  const { content, conversationId } = message;
  
  // Get authenticated user from socket
  const auth = authenticatedSockets.get(ws);
  if (!auth) {
    ws.send(JSON.stringify({ type: 'error', error: 'Not authenticated' }));
    return;
  }
  
  const userId = auth.userId;
  
  // Validate content
  if (!content || typeof content !== 'string') {
    ws.send(JSON.stringify({ type: 'error', error: 'Invalid message content' }));
    return;
  }
  
  // Validate content length (prevent DoS)
  if (content.length > 50000) {
    ws.send(JSON.stringify({ type: 'error', error: 'Message content too large (max 50KB)' }));
    return;
  }
  
  // Store message in user's history
  const msg = {
    id: uuidv4(),
    timestamp: new Date().toISOString(),
    type: 'user_message',
    content,
    userId,
    conversationId: conversationId || 'default'
  };
  
  const userHistory = messageHistory.get(userId) || [];
  userHistory.push(msg);
  messageHistory.set(userId, userHistory);
  
  console.log(`💬 User ${userId} message: ${content.substring(0, 50)}...`);
  
  // Create deliberation session for this user
  const deliberationId = uuidv4();
  const userAIs = getUserAIs(userId);
  
  deliberations.set(deliberationId, {
    id: deliberationId,
    userId, // Bind to user
    message: msg,
    responses: [],
    startedAt: new Date(),
    status: 'in_progress',
    requiredResponses: userAIs.length
  });
  
  // Broadcast only to this user's connected AIs
  const broadcastMessage = {
    type: 'collective_query',
    deliberationId,
    message: msg,
    requiredResponses: userAIs.length
  };
  
  broadcastToUserAIs(userId, broadcastMessage);
  
  // Acknowledge to sender
  ws.send(JSON.stringify({
    type: 'message_received',
    messageId: msg.id,
    deliberationId,
    status: 'Broadcasting to your collective...',
    recipients: userAIs.length
  }));
}

// Handle AI response
async function handleAIResponse(ws, message) {
  const { deliberationId, content } = message;
  
  // Get authenticated user and platform from socket
  const auth = authenticatedSockets.get(ws);
  if (!auth) {
    ws.send(JSON.stringify({ type: 'error', error: 'Not authenticated' }));
    return;
  }
  
  const { userId, platform, aiId } = auth;
  
  // Validate deliberation exists
  const deliberation = deliberations.get(deliberationId);
  if (!deliberation) {
    ws.send(JSON.stringify({ type: 'error', error: 'Deliberation not found' }));
    return;
  }
  
  // Verify deliberation belongs to this user (authorization check)
  if (deliberation.userId !== userId) {
    console.warn(`⚠️  Authorization violation: User ${userId} attempted to respond to deliberation owned by ${deliberation.userId}`);
    ws.send(JSON.stringify({ 
      type: 'error', 
      error: 'Unauthorized',
      message: 'Cannot respond to deliberations from other users'
    }));
    return;
  }
  
  // Verify this AI hasn't already responded
  const alreadyResponded = deliberation.responses.some(r => r.aiId === aiId);
  if (alreadyResponded) {
    ws.send(JSON.stringify({ 
      type: 'error', 
      error: 'Already responded',
      message: 'This AI instance has already responded to this deliberation'
    }));
    return;
  }
  
  // Validate content
  if (!content || typeof content !== 'string') {
    ws.send(JSON.stringify({ type: 'error', error: 'Invalid response content' }));
    return;
  }
  
  if (content.length > 100000) {
    ws.send(JSON.stringify({ type: 'error', error: 'Response content too large (max 100KB)' }));
    return;
  }
  
  // Add response to deliberation (use authenticated platform, not client-supplied)
  deliberation.responses.push({
    aiId,
    platform, // Use platform from authenticated session
    content,
    timestamp: new Date().toISOString()
  });
  
  console.log(`🧠 Response from ${platform} (user: ${userId})`);
  
  // Check if all of user's AIs have responded
  if (deliberation.responses.length >= deliberation.requiredResponses) {
    // Synthesize collective response
    const synthesis = synthesizeResponses(deliberation);
    
    deliberation.status = 'complete';
    deliberation.synthesis = synthesis;
    
    // Send synthesis only to this user's AIs
    broadcastToUserAIs(userId, {
      type: 'collective_response',
      deliberationId,
      synthesis,
      responses: deliberation.responses
    });
    
    console.log(`✅ Deliberation ${deliberationId} complete for user ${userId}`);
  }
}

// Synthesize responses from multiple AIs
function synthesizeResponses(deliberation) {
  const { responses } = deliberation;
  
  // Simple synthesis: combine all responses
  // In production, use more sophisticated NLP/ML
  const synthesis = {
    summary: `Collective response from ${responses.length} AI systems:`,
    perspectives: responses.map(r => ({
      source: r.platform,
      content: r.content
    })),
    consensus: responses.length > 1 ? 'Multiple perspectives analyzed' : 'Single perspective',
    timestamp: new Date().toISOString()
  };
  
  return synthesis;
}

// Get all AI instances for a specific user
function getUserAIs(userId) {
  const userAIIds = userSessions.get(userId);
  if (!userAIIds) return [];
  
  return Array.from(userAIIds)
    .map(id => connectedAIs.get(id))
    .filter(ai => ai && ai.ws.readyState === WebSocket.OPEN);
}

// Broadcast message to a specific user's AIs only
function broadcastToUserAIs(userId, message) {
  const payload = JSON.stringify(message);
  const userAIs = getUserAIs(userId);
  let sent = 0;
  
  for (const ai of userAIs) {
    if (ai.ws.readyState === WebSocket.OPEN) {
      ai.ws.send(payload);
      sent++;
    }
  }
  
  console.log(`📡 Broadcast to ${sent} AIs for user ${userId}`);
  return sent;
}

// Broadcast status update to a specific user
function broadcastStatusToUser(userId) {
  const userAIs = getUserAIs(userId);
  const userHistory = messageHistory.get(userId) || [];
  const userDeliberations = Array.from(deliberations.values())
    .filter(d => d.userId === userId && d.status === 'in_progress');
  
  const status = {
    type: 'status_update',
    connectedAIs: userAIs.map(a => ({
      id: a.id,
      platform: a.platform,
      connectedAt: a.connectedAt
    })),
    totalConnections: userAIs.length,
    timestamp: new Date().toISOString()
  };
  
  broadcastToUserAIs(userId, status);
}

// Send status to specific client
function sendStatus(ws) {
  const auth = authenticatedSockets.get(ws);
  if (!auth) {
    ws.send(JSON.stringify({ type: 'error', error: 'Not authenticated' }));
    return;
  }
  
  const userId = auth.userId;
  const userAIs = getUserAIs(userId);
  const userHistory = messageHistory.get(userId) || [];
  const userDeliberations = Array.from(deliberations.values())
    .filter(d => d.userId === userId);
  
  const status = {
    type: 'status',
    userId,
    connectedAIs: userAIs.map(a => ({
      platform: a.platform,
      connectedAt: a.connectedAt
    })),
    totalConnections: userAIs.length,
    totalMessages: userHistory.length,
    activeDeliberations: userDeliberations.filter(d => d.status === 'in_progress').length,
    timestamp: new Date().toISOString()
  };
  
  ws.send(JSON.stringify(status));
}

// REST API endpoints
app.get('/', (req, res) => {
  res.json({
    name: '🔥 Multi-AI Convergence Sync Server',
    status: 'operational',
    version: '2.0.0',
    authRequired: REQUIRE_AUTH,
    totalUsers: userSessions.size,
    totalConnections: connectedAIs.size,
    uptime: process.uptime()
  });
});

app.get('/api/status', authenticateRequest, (req, res) => {
  // Return only aggregate stats, no user-specific data
  res.json({
    totalUsers: userSessions.size,
    totalConnections: connectedAIs.size,
    totalDeliberations: deliberations.size,
    activeDeliberations: Array.from(deliberations.values()).filter(d => d.status === 'in_progress').length,
    timestamp: new Date().toISOString()
  });
});

app.post('/api/message', authenticateRequest, (req, res) => {
  const { content, userId, conversationId } = req.body;
  
  if (!content || !userId) {
    return res.status(400).json({ error: 'Missing required fields: content and userId' });
  }
  
  // Validate userId format
  const validUserIdPattern = /^[a-zA-Z0-9_@.-]{1,100}$/;
  if (!validUserIdPattern.test(userId)) {
    return res.status(400).json({ 
      error: 'Invalid userId format. Use alphanumeric characters and @.-_ only (max 100 chars)' 
    });
  }
  
  // Validate content
  if (typeof content !== 'string' || content.length > 50000) {
    return res.status(400).json({ error: 'Invalid content: must be string, max 50KB' });
  }
  
  // Check if user has any connected AIs
  const userAIs = getUserAIs(userId);
  if (userAIs.length === 0) {
    return res.status(404).json({ 
      error: 'No connected AIs found for this user',
      message: 'User must have at least one registered AI connection'
    });
  }
  
  const msg = {
    id: uuidv4(),
    timestamp: new Date().toISOString(),
    type: 'user_message',
    content,
    userId,
    conversationId: conversationId || 'default'
  };
  
  const userHistory = messageHistory.get(userId) || [];
  userHistory.push(msg);
  messageHistory.set(userId, userHistory);
  
  // Create deliberation
  const deliberationId = uuidv4();
  deliberations.set(deliberationId, {
    id: deliberationId,
    userId,
    message: msg,
    responses: [],
    startedAt: new Date(),
    status: 'in_progress',
    requiredResponses: userAIs.length
  });
  
  // Broadcast only to this user's AIs
  const sent = broadcastToUserAIs(userId, {
    type: 'collective_query',
    deliberationId,
    message: msg,
    requiredResponses: userAIs.length
  });
  
  res.json({
    messageId: msg.id,
    deliberationId,
    status: 'broadcast',
    recipients: sent,
    userId
  });
});

// Start server
const PORT = process.env.PORT || 3001;
server.listen(PORT, '0.0.0.0', () => {
  console.log(`🔥 Multi-AI Convergence Sync Server running on port ${PORT}`);
  console.log(`📡 WebSocket endpoint: ws://localhost:${PORT}`);
  console.log(`🌐 HTTP endpoint: http://localhost:${PORT}`);
});

