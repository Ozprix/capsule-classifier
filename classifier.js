require('dotenv').config();
const xlsx = require('xlsx');
const OpenAI = require('openai');
const fs = require('fs');

const openai = new OpenAI({
  apiKey: process.env.DEEPSEEK_API_KEY,
  baseURL: 'https://api.deepseek.com',
});

function extractWorkbook(filePath) {
  if (!fs.existsSync(filePath)) {
    throw new Error(`File not found: ${filePath}`);
  }

  const workbook = xlsx.readFile(filePath);
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  const data = xlsx.utils.sheet_to_json(worksheet, { header: 1 });

  const headers = data[0] || [];
  const sampleRows = data.slice(1, 4);
  const allRows = data.slice(1);

  return {
    sheetName,
    headers,
    sampleRows,
    allRows,
    totalRows: data.length - 1,
    filePath,
  };
}

function buildPrompt(extracted) {
  return `You are an Excel workbook classification assistant.

Analyse this Excel workbook and return a JSON classification.

Sheet name: ${extracted.sheetName}
Column headers: ${extracted.headers.join(', ')}
Total data rows: ${extracted.totalRows}
Sample rows:
${extracted.sampleRows.map(r => r.join(' | ')).join('\n')}

Return ONLY valid JSON with NO markdown formatting. Use this exact structure:
{
  "workbook_type": "short label describing what this workbook contains",
  "confidence": 0.0 to 1.0,
  "detected_fields": ["list", "of", "key", "columns"],
  "anomalies": ["any missing or unexpected things, or empty array"],
  "ready_for_processing": true or false
}`;
}
// Dynamic required columns based on workbook type
const requiredColumnMap = {
  employee_directory: ['Employee Name', 'Department', 'Start Date', 'Job Title', 'Email'],
  sales_invoice_log: ['Invoice ID', 'Client Name', 'Total', 'Invoice Date', 'Status'],
};

function validateWorkbook(extracted, classification) {
  const issues = [];

  // Normalise the workbook type to match map keys
  const typeKey = classification.workbook_type
    .toLowerCase()
    .replace(/\s+/g, '_');

  // Look up required columns for this workbook type
  const requiredColumns = requiredColumnMap[typeKey] || [];

  if (requiredColumns.length === 0) {
    issues.push(`Unknown workbook type "${classification.workbook_type}" — no required column rules defined`);
  }

  requiredColumns.forEach(col => {
    if (!extracted.headers.includes(col)) {
      issues.push(`Missing required column: "${col}"`);
    }
  });

  extracted.allRows.forEach((row, rowIndex) => {
    extracted.headers.forEach((header, colIndex) => {
      const value = row[colIndex];
      if (value === undefined || value === null || value === '') {
        issues.push(`Empty value in row ${rowIndex + 1}, column: "${header}"`);
      }
    });
  });

  if (classification.confidence < 0.85) {
    issues.push(`Low confidence score: ${classification.confidence} — human review recommended`);
  }

  return issues;
}
function logResult(filePath, result) {
  const logFile = 'results.json';
  
  // Build the log entry
  const entry = {
    timestamp: new Date().toISOString(),
    file: filePath,
    workbook_type: result.workbook_type,
    confidence: result.confidence,
    ready_for_processing: result.ready_for_processing,
    anomaly_count: result.anomalies.length,
    anomalies: result.anomalies,
    detected_fields: result.detected_fields,
  };

  // Load existing log or start fresh
  let log = [];
  if (fs.existsSync(logFile)) {
    try {
      log = JSON.parse(fs.readFileSync(logFile, 'utf8'));
    } catch {
      log = [];
    }
  }

  // Append and save
  log.push(entry);
  fs.writeFileSync(logFile, JSON.stringify(log, null, 2));
  
  console.log(`📋 Result logged to ${logFile} (entry #${log.length})`);
}
async function classifyWorkbook(filePath) {
  try {
    console.log(`\n🚀 Starting Capsule Classifier`);
    console.log(`📁 Reading: ${filePath}`);

    const extracted = extractWorkbook(filePath);

    console.log(`📊 Sheet: ${extracted.sheetName}`);
    console.log(`📋 Headers: ${extracted.headers.join(', ')}`);
    console.log(`📈 Total rows: ${extracted.totalRows}`);
    console.log(`\n🤖 Sending to DeepSeek API...`);

    const response = await openai.chat.completions.create({
      model: 'deepseek-chat',
      messages: [{ role: 'user', content: buildPrompt(extracted) }],
      temperature: 0.1,
    });

    let rawText = response.choices[0].message.content.trim();

    // Strip markdown code blocks if present
    rawText = rawText.replace(/^```json\n?/, '').replace(/\n?```$/, '');
    rawText = rawText.replace(/^```\n?/, '').replace(/\n?```$/, '');

    const llmResult = JSON.parse(rawText);

    // Run deterministic validation on top of LLM classification
    const validationIssues = validateWorkbook(extracted, llmResult);

    const finalResult = {
      ...llmResult,
      anomalies: [...(llmResult.anomalies || []), ...validationIssues],
      ready_for_processing: validationIssues.length === 0 && llmResult.confidence >= 0.85,
    };
    logResult(filePath, finalResult);

    console.log(`\n✅ Classification complete!`);
    console.log('='.repeat(50));
    console.log(JSON.stringify(finalResult, null, 2));
    console.log('='.repeat(50));

    return finalResult;

  } catch (error) {
    console.error(`\n❌ Error: ${error.message}`);
    if (error.response) {
      console.error('API response:', error.response.data);
    }
  }
}

const filePath = process.argv[2] || 'sample.xlsx';
classifyWorkbook(filePath).then(() => {
  console.log(`\n✨ Done!`);
}).catch(console.error);

// Export for use as a module
module.exports = { classifyWorkbook };

// Only run directly if called from terminal
if (require.main === module) {
  const filePath = process.argv[2] || 'sample.xlsx';
  classifyWorkbook(filePath).then(() => {
    console.log(`\n✨ Done!`);
  }).catch(console.error);
}

