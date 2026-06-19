import fs from 'fs';

const filePath = 'src/components/CustomerManagement.tsx';
const content = fs.readFileSync(filePath, 'utf8');

const startIndex = content.indexOf('{/* Selected Customer Drawer Panel */}');
const endIndex = content.indexOf('{/* Add Customer Modal Box */}');

if (startIndex === -1 || endIndex === -1) {
  console.log('Could not find start or end index');
  process.exit(1);
}

let drawerContent = content.substring(startIndex, endIndex);

// Replace background and text colors
drawerContent = drawerContent.replace(/bg-gradient-to-b from-\[\#0a103d\] to-\[\#040822\]/g, 'bg-pink-100');
drawerContent = drawerContent.replace(/border-\[\#d4af37\]\/30/g, 'border-pink-300');
drawerContent = drawerContent.replace(/text-white/g, 'text-pink-900');
drawerContent = drawerContent.replace(/bg-\[\#04081c\]\/60/g, 'bg-pink-50');
drawerContent = drawerContent.replace(/bg-\[\#04081c\]\/40/g, 'bg-pink-50');
drawerContent = drawerContent.replace(/border-\[\#141b4a\]/g, 'border-pink-200');
drawerContent = drawerContent.replace(/border-\[\#141b44\]/g, 'border-pink-200');
drawerContent = drawerContent.replace(/border-\[\#17235a\]/g, 'border-pink-300');
drawerContent = drawerContent.replace(/text-\[\#8496bf\]/g, 'text-pink-700');
drawerContent = drawerContent.replace(/text-\[\#556994\]/g, 'text-pink-700');
drawerContent = drawerContent.replace(/text-slate-200/g, 'text-pink-800');
drawerContent = drawerContent.replace(/text-slate-300/g, 'text-pink-800');
drawerContent = drawerContent.replace(/text-slate-400/g, 'text-pink-600');
drawerContent = drawerContent.replace(/text-slate-500/g, 'text-pink-500');
drawerContent = drawerContent.replace(/bg-\[\#0a1135\]/g, 'bg-pink-100');
drawerContent = drawerContent.replace(/bg-\[\#0f194e\]/g, 'bg-pink-200');
drawerContent = drawerContent.replace(/bg-\[\#0c143c\]/g, 'bg-pink-50');
drawerContent = drawerContent.replace(/from-\[\#1b1c3c\]\/50 to-\[\#12132e\]\/50/g, 'from-pink-50 to-pink-100');
drawerContent = drawerContent.replace(/bg-\[\#11163b\]/g, 'bg-pink-200'); // progress bar bg
// replace blue buttons inside
drawerContent = drawerContent.replace(/bg-blue-950\/40/g, 'bg-pink-200');
drawerContent = drawerContent.replace(/hover:bg-blue-900\/50/g, 'hover:bg-pink-300');
drawerContent = drawerContent.replace(/border-blue-700\/30/g, 'border-pink-300');
drawerContent = drawerContent.replace(/text-blue-300/g, 'text-pink-900');
drawerContent = drawerContent.replace(/bg-\[\#3b82f6\]\/10/g, 'bg-pink-200');
drawerContent = drawerContent.replace(/border-\[\#3b82f6\]\/30/g, 'border-pink-400');
drawerContent = drawerContent.replace(/text-\[\#3b82f6\]/g, 'text-pink-800');
drawerContent = drawerContent.replace(/hover:bg-\[\#3b82f6\]\/20/g, 'hover:bg-pink-300');


const newContent = content.substring(0, startIndex) + drawerContent + content.substring(endIndex);

fs.writeFileSync(filePath, newContent, 'utf8');
console.log('Replaced colors successfully');
