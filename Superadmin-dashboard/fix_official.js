import fs from 'fs';

let content = fs.readFileSync('src/components/CreditCards.tsx', 'utf8');

content = content.replace(
  /'bg-gradient-to-tr from-\[\#3a2072\] via-\[\#5b21b6\] to-\[\#4c1d95\] border-pink-300 group-hover:border-pink-500 shadow-xl'/g,
  "'bg-gradient-to-tr from-pink-500 via-rose-500 to-fuchsia-600 border-pink-300 group-hover:border-pink-200 shadow-xl text-white'"
);

content = content.replace(
  /'bg-gradient-to-tr from-\[\#3a2072\] via-\[\#5b21b6\] to-\[\#4c1d95\] border-pink-300 shadow-xl flex flex-col pt-6 overflow-hidden'/g,
  "'bg-gradient-to-tr from-pink-500 via-rose-500 to-fuchsia-600 border-pink-300 shadow-xl flex flex-col pt-6 overflow-hidden text-white'"
);

// We need to change the front text colors to be clear.
// Replace D32F2F and other hardcoded colors
content = content.replace(/<span className="text-\[9px\] uppercase tracking-widest font-extrabold text-\[\#D32F2F\]">APEX EXECUTIVE NODE<\/span>/, '<span className="text-[9px] uppercase tracking-widest font-extrabold text-pink-100">APEX EXECUTIVE NODE</span>');
content = content.replace(/<Cpu className="text-\[\#D32F2F\]" size=\{24\} \/>/, '<Cpu className="text-pink-100" size={24} />');
content = content.replace(/<span className="text-\[8px\] text-\[\#A38BA7\] block font-bold">EXECUTIVE SIGNATORY<\/span>/, '<span className="text-[8px] text-pink-100/80 block font-bold">EXECUTIVE SIGNATORY</span>');
content = content.replace(/<span className="text-\[8px\] text-\[\#A38BA7\] block font-bold">CARD EXPIRES<\/span>/, '<span className="text-[8px] text-pink-100/80 block font-bold">CARD EXPIRES</span>');
content = content.replace(/<p className="text-xs font-mono font-bold text-\[\#D32F2F\]">06\/2032<\/p>/, '<p className="text-xs font-mono font-bold text-pink-100">06/2032</p>');

// LayoutDashboard replace
content = content.replace(/<div className="absolute inset-0 bg-\[\#D32F2F\]\/0 group-hover:bg-\[\#D32F2F\]\/5 transition-all flex items-center justify-center">\s*<LayoutDashboard className="opacity-0 group-hover:opacity-100 transition-opacity text-\[\#D32F2F\]" size=\{40\} \/>\s*<\/div>/, 
`<div className="absolute inset-0 bg-pink-100/0 group-hover:bg-pink-100/5 transition-all flex items-center justify-center">
                        <LayoutDashboard className="opacity-0 group-hover:opacity-100 transition-opacity text-pink-100" size={40} />
                      </div>`);

// Change back of card D32F2F if any
content = content.replace(/<span className="text-white text-\[\#D32F2F\]">06\/2032<\/span>/, '<span className="text-white text-pink-100">06/2032</span>');


// Let's also truncate `SUPER USER - EXECUTIVE HQ` just to be safe
content = content.replace(/<p className="text-\[10px\] sm:text-xs font-black text-white tracking-wide uppercase truncate">SUPER USER - EXECUTIVE HQ<\/p>/, '<p className="text-[10px] sm:text-xs font-black text-white tracking-wide uppercase truncate max-w-[150px]">SUPER USER - EXECUTIVE HQ</p>');

content = content.replace(/'bg-slate-300 border-slate-400'/g, "'bg-slate-300 border-slate-400 text-slate-800'");

fs.writeFileSync('src/components/CreditCards.tsx', content);
