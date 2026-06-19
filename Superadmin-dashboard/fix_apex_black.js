import fs from 'fs';

let content = fs.readFileSync('src/components/CreditCards.tsx', 'utf8');

// FRONT Gradient
content = content.replace(
  /'bg-gradient-to-tr from-\[\#0B0D17\] via-\[\#40304D\] to-\[\#2D2438\] border-\[\#D32F2F\]\/40'/g,
  "'bg-gradient-to-tr from-pink-500 via-rose-500 to-fuchsia-600 border-pink-300'"
);
content = content.replace(
  /'bg-gradient-to-tr from-\[\#0B0D17\] via-\[\#2D2438\] to-\[\#1a1a1a\] border-\[\#D32F2F\]\/40'/g,
  "'bg-gradient-to-tr from-pink-500 via-rose-500 to-fuchsia-600 border-pink-300'"
);

// FRONT blur
content = content.replace(
  /className="absolute -right-16 -top-16 w-36 h-36 bg-\[\#D32F2F\]\/10 rounded-full blur-3xl pointer-events-none"/g,
  'className="absolute -right-16 -top-16 w-36 h-36 bg-white/20 rounded-full blur-3xl pointer-events-none"'
);

// FRONT text colors
content = content.replace(
  /className="text-\[9px\] uppercase font-bold tracking-widest text-\[\#D32F2F\]"/g,
  'className="text-[9px] uppercase font-bold tracking-widest text-pink-100"'
);

content = content.replace(
  /bg-gradient-to-br from-\[\#D32F2F\] via-\[\#A38BA7\] to-\[\#705E7C\]/g,
  'bg-gradient-to-br from-pink-300 via-pink-400 to-pink-500'
);

content = content.replace(
  /className="text-\[8px\] text-\[\#A38BA7\] uppercase tracking-wide block font-bold"/g,
  'className="text-[8px] text-pink-100/80 uppercase tracking-wide block font-bold"'
);
content = content.replace(
  /className="text-\[8px\] text-\[\#A38BA7\] uppercase tracking-wide block font-bold"/g,
  'className="text-[8px] text-pink-100/80 uppercase tracking-wide block font-bold"'
);

// BACK Gradient
content = content.replace(
  /'bg-gradient-to-tr from-\[\#050505\] via-\[\#40304D\] to-\[\#0B0D17\] border-\[\#D32F2F\]\/35'/g,
  "'bg-gradient-to-tr from-pink-500 via-rose-500 to-fuchsia-600 border-pink-300'"
);
content = content.replace( // just in case the blocked one needs to look different but user didn't mention it, leave blocked as slate
  /'bg-gradient-to-tr from-\[\#050505\] to-\[\#0B0D17\] border-\[\#D32F2F\]\/40'/g,
  "'bg-slate-300 border-slate-400 text-slate-800'"
);

// BACK text colors (around line 1778+)
// text-slate-400 -> text-pink-100
// Note: we can't do global replace safely, so we narrow scope.

// Read lines for targeted replacements
const lines = content.split('\n');
const startIdx = lines.findIndex(l => l.includes('{/* BACK SIDE (Realistic Banking Credit Card Back) */}'));
const endIdx = startIdx + 80;

if (startIdx !== -1) {
  for (let i = startIdx; i < endIdx && i < lines.length; i++) {
    lines[i] = lines[i].replace(/text-slate-400/g, 'text-pink-100/90');
    // text-[#A38BA7] -> text-pink-100/80
    lines[i] = lines[i].replace(/text-\[\#A38BA7\]/g, 'text-pink-100/80');
    // border-white/5 -> border-pink-200/20
    lines[i] = lines[i].replace(/border-white\/5/g, 'border-pink-200/30');
    // text-[#D32F2F] -> text-pink-200
    lines[i] = lines[i].replace(/text-\[\#D32F2F\]/g, 'text-pink-200');
  }
}

content = lines.join('\n');

fs.writeFileSync('src/components/CreditCards.tsx', content);
