import fs from 'fs';

function replaceInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  content = content.replace(/#000000/g, '#3a2072');
  content = content.replace(/text-black/g, 'text-[#3a2072]');
  content = content.replace(/bg-black/g, 'bg-[#3a2072]');
  content = content.replace(/border-black/g, 'border-[#3a2072]');
  content = content.replace(/'black'/g, "'#3a2072'");
  content = content.replace(/"black"/g, '"#3a2072"');
  fs.writeFileSync(filePath, content, 'utf8');
}

const files = [
  'src/components/BranchManagement.tsx',
  'src/components/ManagerDetailModal.tsx',
  'src/components/DashboardOverview.tsx',
  'src/App.tsx'
];

files.forEach(replaceInFile);
console.log('Replaced all black instances.');
