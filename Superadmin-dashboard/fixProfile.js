import fs from 'fs';

function replaceInProfile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');

  // Replace dark purples and dark magentas with lighter/fuchsia or pink-700 colors
  content = content.replace(/#3a2072/g, '#d946ef'); // fuchsia-500
  content = content.replace(/#831843/g, '#c026d3'); // fuchsia-600
  content = content.replace(/#4c0519/g, '#be185d'); // pink-700
  
  // Also any bg-[#3a2072]
  content = content.replace(/bg-\[\#3a2072\]/g, 'bg-[#fbcfe8]'); // pink-200 / pastel pink
  
  fs.writeFileSync(filePath, content, 'utf8');
}

replaceInProfile('src/components/MyProfile.tsx');
console.log('Fixed colors in profile.');
