const xlsx = require('xlsx');

const data = [
  ['Project ID', 'Project Name', 'Owner', 'Status', 'Deadline', 'Budget', 'Completion %'],
  ['PRJ-001', 'Capsule System', 'Michael', 'In Progress', '2024-06-01', 50000, 35],
  ['PRJ-002', 'API Gateway', 'Sarah', 'Planning', '2024-07-15', 30000, 10],
  ['PRJ-003', 'Data Pipeline', 'Tom', 'Completed', '2024-03-01', 25000, 100],
  ['PRJ-004', 'Mobile App', '', 'On Hold', '2024-08-01', 80000, 5],
  ['PRJ-005', 'Analytics Dashboard', 'Aisha', 'In Progress', '', 45000, 60],
];

const workbook = xlsx.utils.book_new();
xlsx.utils.book_append_sheet(workbook, xlsx.utils.aoa_to_sheet(data), 'Projects');
xlsx.writeFile(workbook, 'project_tracker.xlsx');
console.log('project_tracker.xlsx created');
