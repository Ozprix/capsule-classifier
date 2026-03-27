require('dotenv').config();
const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { classifyWorkbook } = require('./classifier');

const app = express();
const PORT = process.env.PORT || 3000;

// Configure multer — save uploaded files to an /uploads folder
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = 'uploads';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    // Keep original name + timestamp to avoid collisions
    const timestamp = Date.now();
    const ext = path.extname(file.originalname);
    const name = path.basename(file.originalname, ext);
    cb(null, `${name}_${timestamp}${ext}`);
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowed = ['.xlsx', '.xls'];
    const ext = path.extname(file.originalname).toLowerCase();
    if (allowed.includes(ext)) {
      cb(null, true);
    } else {
      cb(new Error('Only .xlsx and .xls files are allowed'));
    }
  },
});
app.get('/', (req, res) => {
  res.json({
    service: 'Capsule Classifier API',
    version: '1.0.0',
    status: 'running',
    endpoints: {
      health: 'GET /health',
      classify: 'POST /classify — send Excel file as multipart/form-data with field name "workbook"',
      logs: 'GET /logs',
    },
  });
});
// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'Capsule Classifier',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
  });
});

// Classification endpoint
app.post('/classify', upload.single('workbook'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      error: 'No file uploaded',
      message: 'Send an Excel file with field name "workbook"',
    });
  }

  const filePath = req.file.path;
  console.log(`\n📥 Received file: ${req.file.originalname}`);

  try {
    const result = await classifyWorkbook(filePath, req.file.originalname);

    if (!result) {
      throw new Error('Classification returned no result');
    }

    // Clean up uploaded file after classification
    fs.unlinkSync(filePath);

    return res.json({
      success: true,
      file: req.file.originalname,
      result,
    });

  } catch (error) {
    // Clean up even on error
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// Log endpoint — view classification history
app.get('/logs', (req, res) => {
  const logFile = 'results.json';
  if (!fs.existsSync(logFile)) {
    return res.json({ entries: [], count: 0 });
  }

  try {
    const log = JSON.parse(fs.readFileSync(logFile, 'utf8'));
    res.json({ entries: log, count: log.length });
  } catch {
    res.status(500).json({ error: 'Could not read log file' });
  }
});

app.listen(PORT, () => {
  console.log(`\n🚀 Capsule Classifier running on http://localhost:${PORT}`);
  console.log(`📡 Endpoints:`);
  console.log(`   GET  /health   — service status`);
  console.log(`   POST /classify — upload workbook for classification`);
  console.log(`   GET  /logs     — view classification history\n`);
});
