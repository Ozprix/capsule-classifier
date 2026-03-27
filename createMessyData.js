const xlsx = require('xlsx');

// Messy employee data — real world problems baked in
const messyEmployees = [
  ['Employee Name', 'Department', 'Start Date', 'Job Title', 'Email', 'Salary'],
  ['James Okafor', 'Engineering', '2021-03-15', 'Backend Developer', 'james@company.com', 75000],
  ['', 'HR', '2019-07-01', 'HR Manager', 'sarah@company.com', 68000],         // missing name
  ['Tom Müller', 'Finance', '', 'Accountant', 'tom@company.com', 62000],        // missing date
  ['Aisha Patel', 'Engineering', '2022-01-10', '', 'aisha@company.com', 80000], // missing title
  ['Carlos Lima', 'Marketing', '2020-05-22', 'Marketing Lead', '', 71000],      // missing email
  ['Nina Koch', '', '2023-03-01', 'Designer', 'nina@company.com', 58000],       // missing dept
  ['Wei Zhang', 'Engineering', '2021-11-30', 'DevOps Engineer', 'wei@company.com', 77000],
  ['Fatima Al-Hassan', 'Legal', '2020-08-14', 'Legal Counsel', 'fatima@company.com', ''],  // missing salary
];

// Messy invoice data — unpredictable structure
const messyInvoices = [
  ['Invoice No', 'Customer', 'Item Description', 'Qty', 'Price', 'VAT', 'Total', 'Due Date', 'Paid'],
  ['INV-2024-001', 'Acme Corp', 'Software License', 5, 199.99, 19.99, 1019.94, '2024-02-01', 'Yes'],
  ['INV-2024-002', 'Globex', '', 1, 499.00, 49.90, 548.90, '2024-02-15', 'No'],         // missing description
  ['INV-2024-003', '', 'Consulting Hours', 10, 150.00, 15.00, 1650.00, '2024-02-20', 'Yes'], // missing customer
  ['INV-2024-004', 'Initech', 'Support Package', 3, 299.99, '', 899.97, '2024-03-01', 'No'],  // missing VAT
  ['INV-2024-005', 'Umbrella', 'Hardware Kit', 2, 750.00, 75.00, 1650.00, '', 'Yes'],    // missing due date
  ['INV-2024-006', 'Cyberdyne', 'API Access', 12, 49.99, 4.99, 659.88, '2024-03-15', ''],    // missing paid status
  ['INV-2024-007', 'Tyrell Corp', 'Cloud Hosting', 1, 899.00, 89.90, 988.90, '2024-03-20', 'Yes'],
];

// Write employee workbook
const empWorkbook = xlsx.utils.book_new();
xlsx.utils.book_append_sheet(empWorkbook, xlsx.utils.aoa_to_sheet(messyEmployees), 'Employees');
xlsx.writeFile(empWorkbook, 'messy_employees.xlsx');
console.log('messy_employees.xlsx created');

// Write invoice workbook
const invWorkbook = xlsx.utils.book_new();
xlsx.utils.book_append_sheet(invWorkbook, xlsx.utils.aoa_to_sheet(messyInvoices), 'Invoices');
xlsx.writeFile(invWorkbook, 'messy_invoices.xlsx');
console.log('messy_invoices.xlsx created');
