const xlsx = require('xlsx');

const data = [
  ['Invoice ID', 'Client Name', 'Product', 'Quantity', 'Unit Price', 'Total', 'Invoice Date', 'Status'],
  ['INV-001', 'Acme Corp', 'Cloud Storage Plan', 10, 29.99, 299.90, '2024-01-15', 'Paid'],
  ['INV-002', 'Globex Ltd', 'API Access License', 1, 499.00, 499.00, '2024-01-18', 'Paid'],
  ['INV-003', 'Initech', 'Support Package', 3, 149.99, 449.97, '2024-01-22', 'Pending'],
  ['INV-004', 'Umbrella Inc', 'Cloud Storage Plan', 5, 29.99, 149.95, '2024-01-25', ''],
  ['INV-005', 'Cyberdyne', 'Enterprise License', 1, 1200.00, 1200.00, '', 'Overdue'],
];

const worksheet = xlsx.utils.aoa_to_sheet(data);
const workbook = xlsx.utils.book_new();
xlsx.utils.book_append_sheet(workbook, worksheet, 'Sales Report');
xlsx.writeFile(workbook, 'sales_report.xlsx');

console.log('sales_report.xlsx created successfully');