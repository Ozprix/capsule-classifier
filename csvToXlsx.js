const xlsx = require('xlsx');
const workbook = xlsx.readFile('employee_salary_dataset.csv');
xlsx.writeFile(workbook, 'employee_salary_dataset.xlsx');

console.log('employee_salary_dataset.xlsx created successfully');
