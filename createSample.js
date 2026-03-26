const xlsx = require('xlsx');

const data = [
  ['Employee Name', 'Department', 'Start Date', 'Job Title', 'Email'],
  ['Alice Johnson', 'Engineering', '2021-03-15', 'Software Engineer', 'alice@company.com'],
  ['Bob Smith', 'HR', '2019-07-01', 'HR Manager', 'bob@company.com'],
  ['Carol White', 'Finance', '2022-01-10', 'Accountant', 'carol@company.com'],
  ['David Brown', 'Engineering', '2020-11-20', 'DevOps Engineer', 'david@company.com'],
  ['Eva Martinez', 'Marketing', '', 'Marketing Lead', 'eva@company.com'],
];

const worksheet = xlsx.utils.aoa_to_sheet(data);
const workbook = xlsx.utils.book_new();
xlsx.utils.book_append_sheet(workbook, worksheet, 'Employees');
xlsx.writeFile(workbook, 'sample.xlsx');

console.log('sample.xlsx created successfully');
