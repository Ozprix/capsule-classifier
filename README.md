# Capsule Classifier

Capsule Classifier analyzes Excel workbooks with DeepSeek and returns a structured JSON result.

It supports:
- File upload and classification through an HTTP API
- Workbook classification from the command line
- Dynamic required-field validation from the model response with static fallback rules
- Persistent classification history in `results.json`

## What It Returns

The classifier returns this shape:

```json
{
  "workbook_type": "employee_directory",
  "description": "Employee roster with key HR details",
  "confidence": 0.95,
  "detected_fields": ["Employee Name", "Department", "Start Date", "Job Title", "Email"],
  "required_fields": ["Employee Name", "Department", "Start Date"],
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

The app uses this provider configuration in code:
- Base URL: `https://api.deepseek.com`
- Model: `deepseek-chat`

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
- Required fields from `required_fields` in the model output (preferred)
- Static fallback required columns for known workbook types when `required_fields` is missing
- Empty cell detection across rows
- Confidence threshold (`< 0.85` adds a review warning)

`ready_for_processing` is only `true` when no validation issues exist and confidence is at least `0.85`.

Known fallback workbook types include:
- `employee_directory`
- `employee_records`
- `sales_invoice_log`
- `invoice_tracking`
- `project_tracker`

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
- API log entries store the original uploaded filename, while CLI runs store the path passed to `classifier.js`.
- On model/API/parse failures, the API returns HTTP 500 and the CLI exits with an error.
- This project currently has no npm scripts configured; run files directly with `node`.
