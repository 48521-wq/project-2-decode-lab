// =============================================
//  DecodeLabs Internship — Project 2
//  Backend API Development
//  Node.js + Express REST API
// =============================================

const express = require('express');
const path    = require('path');

const app  = express();
const PORT = 3000;

// ── Middleware ──
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// In-memory data store (no database needed for Project 2)
let messages = [];
let nextId   = 1;

// ══════════════════════════════════════════
//  GET /api/status  — Health check
// ══════════════════════════════════════════
app.get('/api/status', (req, res) => {
  res.status(200).json({
    status  : 'OK',
    message : 'DecodeLabs API is running 🚀',
    project : 'Project 2 — Backend API Development',
    batch   : '2026'
  });
});

// ══════════════════════════════════════════
//  GET /api/messages  — Get all messages
// ══════════════════════════════════════════
app.get('/api/messages', (req, res) => {
  res.status(200).json({
    success : true,
    count   : messages.length,
    data    : messages
  });
});

// ══════════════════════════════════════════
//  POST /api/messages  — Submit a message
//  Body: { name, email, project, message }
// ══════════════════════════════════════════
app.post('/api/messages', (req, res) => {
  const { name, email, project, message } = req.body;

  // ── Syntactic Validation (format check) ──
  if (!name || !email || !message) {
    return res.status(400).json({
      success : false,
      error   : 'Bad Request — name, email and message are required.'
    });
  }

  // ── Semantic Validation (logic check) ──
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      success : false,
      error   : 'Bad Request — invalid email format.'
    });
  }

  if (name.trim().length < 2) {
    return res.status(400).json({
      success : false,
      error   : 'Bad Request — name must be at least 2 characters.'
    });
  }

  // ── Store message ──
  const newMessage = {
    id         : nextId++,
    name       : name.trim(),
    email      : email.trim().toLowerCase(),
    project    : project || 'Not specified',
    message    : message.trim(),
    receivedAt : new Date().toISOString()
  };

  messages.push(newMessage);

  return res.status(201).json({
    success : true,
    message : 'Message received! We will reply within 24 hours.',
    data    : newMessage
  });
});

// ══════════════════════════════════════════
//  GET /api/messages/:id  — Get one message
// ══════════════════════════════════════════
app.get('/api/messages/:id', (req, res) => {
  const id   = parseInt(req.params.id);
  const found = messages.find(m => m.id === id);

  if (!found) {
    return res.status(404).json({
      success : false,
      error   : `Not Found — no message with id ${id}.`
    });
  }

  res.status(200).json({ success: true, data: found });
});

// ══════════════════════════════════════════
//  DELETE /api/messages/:id  — Delete one
// ══════════════════════════════════════════
app.delete('/api/messages/:id', (req, res) => {
  const id  = parseInt(req.params.id);
  const idx = messages.findIndex(m => m.id === id);

  if (idx === -1) {
    return res.status(404).json({
      success : false,
      error   : `Not Found — no message with id ${id}.`
    });
  }

  messages.splice(idx, 1);
  res.status(204).send(); // No Content
});

// ── 404 fallback for unknown API routes ──
app.use('/api/*', (req, res) => {
  res.status(404).json({ success: false, error: 'API endpoint not found.' });
});

// ── Serve frontend for all other routes ──
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ── Start server ──
app.listen(PORT, () => {
  console.log(`\n🚀 DecodeLabs API running at http://localhost:${PORT}`);
  console.log(`📡 Endpoints:`);
  console.log(`   GET    /api/status`);
  console.log(`   GET    /api/messages`);
  console.log(`   POST   /api/messages`);
  console.log(`   GET    /api/messages/:id`);
  console.log(`   DELETE /api/messages/:id\n`);
});
