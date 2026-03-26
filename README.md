# Capsule Classifier

Capsule Classifier analyzes Excel workbooks with DeepSeek and returns a structured JSON result.

It supports:
- File upload and classification through an HTTP API
- Workbook classification from the command line
- Deterministic validation for missing required columns and empty values
- Persistent classification history in `results.json`

## What It Returns

The classifier returns this shape:

```json
{
  "workbook_type": "employee_directory",
  "confidence": 0.95,
  "detected_fields": ["Employee Name", "Department", "Start Date", "Job Title", "Email"],
  "anomalies": ["Empty value in row 5, column: \"Start Date\""],
  "ready_for_processing": false
}
```

## Prerequisites

- Node.js 18+
- npm
- DeepSeek API key

## Setup

1. Clone the repository and enter the project directory:

```bash
git clone https://github.com/Ozprix/capsule-classifier.git
cd capsule-classifier
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file:

```env
DEEPSEEK_API_KEY=your_deepseek_api_key
PORT=3000
```

`PORT` is optional and defaults to `3000`.

## Run the API Server

Start the server:

```bash
node server.js
```

Available endpoints:
- `GET /health` - service status
- `POST /classify` - upload and classify one workbook
- `GET /logs` - return entries stored in `results.json`

### API Examples

Classify an Excel file:

```bash
curl -X POST http://localhost:3000/classify \
  -F "workbook=@sample.xlsx"
```

View classification logs:

```bash
curl http://localhost:3000/logs
```

## Run from CLI

Classify the default sample file (`sample.xlsx`):

```bash
node classifier.js
```

Classify a specific file:

```bash
node classifier.js sales_report.xlsx
```

## Generate Sample Workbooks

Create employee directory sample:

```bash
node createSample.js
```

Create sales report sample:

```bash
node createSalesReport.js
```

## Validation Rules

After AI classification, additional checks run in code:
- Required columns by workbook type
- Empty cell detection across rows
- Confidence threshold (`< 0.85` adds a review warning)

`ready_for_processing` is only `true` when no validation issues exist and confidence is at least `0.85`.

## Project Structure

```text
capsule-classifier/
  classifier.js
  createSample.js
  createSalesReport.js
  server.js
  results.json
  uploads/
```

## Notes

- Uploaded files are stored temporarily in `uploads/` and deleted after classification.
- Each classification is appended to `results.json`.
- This project currently has no npm scripts configured; run files directly with `node`.
