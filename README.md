# 📊 Capsule Classifier - AI-Powered Excel Workbook Analyzer
![Node.js Version](https://img.shields.io/badge/node-%3E%3D14.0.0-brightgreen)
![License](https://img.shields.io/badge/license-MIT-blue)   
![DeepSeek](https://img.shields.io/badge/DeepSeek-API-black)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)
An intelligent Excel workbook classifier that uses DeepSeek AI to automatically analyze and classify spreadsheet structures, detect data patterns, and identify anomalies.

## 🚀 Features

- **AI-Powered Analysis**: Leverages DeepSeek's language model to understand spreadsheet content
- **Automatic Classification**: Identifies workbook types (employee directories, financial data, etc.)
- **Anomaly Detection**: Spots missing values and unexpected data patterns
- **Confidence Scoring**: Provides confidence levels for classifications
- **Field Detection**: Automatically identifies key columns and their purposes
- **Ready for Processing**: Determines if the workbook is structured enough for automated processing

## 🛠️ Tech Stack

- **Node.js** - JavaScript runtime
- **DeepSeek API** - AI language model for classification
- **xlsx** - Excel file parsing
- **dotenv** - Environment variable management

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm (Node Package Manager)
- DeepSeek API key ([Get one here](https://platform.deepseek.com))

## 🔧 Installation

1. Clone the repository:
```bash
git clone https://github.com/Ozprix/capsule-classifier.git
cd capsule-classifier
Install dependencies:

bash
npm install
Set up environment variables:

bash
cp .env.example .env
# Edit .env and add your DeepSeek API key
Run the classifier:

bash
node classifier.js
# Or specify your own Excel file:
node classifier.js your-file.xlsx
📖 Usage
The classifier analyzes Excel files and returns a JSON object with:

json
{
  "workbook_type": "employee_directory",
  "confidence": 0.95,
  "detected_fields": ["Employee Name", "Department", "Start Date", "Job Title", "Email"],
  "anomalies": ["Empty value in row 5, column: \"Start Date\""],
  "ready_for_processing": false
}
Sample Output
text
🚀 Starting capsule classifier...

📁 Reading: sample.xlsx
📊 Sheet: Employees
📋 Headers: Employee Name, Department, Start Date, Job Title, Email
📈 Total rows: 5

🤖 Sending to DeepSeek API...
✅ Classification complete!

{
  "workbook_type": "employee_directory",
  "confidence": 0.95,
  "detected_fields": [...],
  "anomalies": [...],
  "ready_for_processing": false
}
🏗️ Project Structure
text
capsule-classifier/
├── classifier.js       # Main classification script
├── package.json        # Dependencies and scripts
├── .env.example        # Example environment variables
├── .gitignore         # Git ignore rules
└── README.md          # Project documentation
🔑 Environment Variables
Create a .env file with:

env
DEEPSEEK_API_KEY=your_api_key_here
🤝 Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

Fork the repository

Create your feature branch (git checkout -b feature/AmazingFeature)

Commit your changes (git commit -m 'Add some AmazingFeature')

Push to the branch (git push origin feature/AmazingFeature)

Open a Pull Request

📝 License
This project is licensed under the MIT License - see the LICENSE file for details.

📧 Contact
Michael -- michaelkwame.ad@gmail.com

Project Link: https://github.com/Ozprix/capsule-classifier

text

## Step 3: Create .env.example

```bash
echo "DEEPSEEK_API_KEY=your_deepseek_api_key_here" > .env.example
Step 4: Create a LICENSE file (MIT License)
bash
nano LICENSE
Copy and paste:

text
MIT License

Copyright (c) 2026 Michael

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

