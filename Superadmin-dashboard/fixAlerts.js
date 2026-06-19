import fs from 'fs';

const files = [
  'src/components/EmployeeManagement.tsx',
  'src/components/CustomerManagement.tsx',
  'src/components/BranchManagement.tsx',
  'src/components/CreditCards.tsx',
  'src/components/FraudDetection.tsx',
  'src/components/DashboardOverview.tsx',
  'src/components/Settings.tsx',
  'src/components/Reports.tsx'
];

files.forEach(file => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    content = content.replace(/\balert\(/g, 'console.log(');
    content = content.replace(/console\.log\("[^"]*alert.*?"/ig, function(match) {
        return match.replace(/alert/ig, 'Notification');
    }); // just to be safe
    fs.writeFileSync(file, content, 'utf8');
  }
});
console.log('Replaced alerts.');
