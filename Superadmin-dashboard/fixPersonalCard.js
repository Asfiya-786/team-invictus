import fs from 'fs';

let file = 'src/components/CreditCards.tsx';
let txt = fs.readFileSync(file, 'utf8');

txt = txt.replace(
  /'bg-gradient-to-tr from-\[\#050505\] via-\[\#2D2438\] to-\[\#1a1a1a\] border-\[\#D32F2F\]\/40'/g,
  "'bg-slate-300 border-slate-400 text-slate-800'"
);

txt = txt.replace(
  /'bg-gradient-to-tr from-\[\#050505\] via-\[\#40304D\] to-\[\#2D2438\] border-\[\#D32F2F\]\/30 group-hover:border-\[\#D32F2F\]\/50'/g,
  "'bg-gradient-to-tr from-[#0284c7] via-[#0369a1] to-[#0c4a6e] border-sky-300 group-hover:border-sky-400 shadow-xl'"
);

txt = txt.replace(
  /'bg-gradient-to-tr from-\[\#0B0D17\] via-\[\#2D2438\] to-\[\#050505\] border-\[\#D32F2F\]\/30 shadow-2xl'/g,
  "'bg-gradient-to-tr from-[#0284c7] via-[#0369a1] to-[#0c4a6e] border-sky-300 shadow-xl'"
);

// Add truncation to avoid overlapping text
txt = txt.replace(/<div className="flex justify-between items-start z-10">\s*<div>\s*<span className="text-\[9px\] uppercase tracking-widest font-extrabold text-\[\#D32F2F\]">APEX BLACK PERSONAL<\/span>\s*<p className="text-xs font-bold font-mono mt-1 text-white\/90">Visa infinite sovereign card<\/p>\s*<\/div>\s*<Cpu className="text-\[\#D32F2F\]" size=\{24\} \/>\s*<\/div>/, 
`<div className="flex justify-between items-start z-10 w-full">
  <div className="min-w-0 pr-2">
    <span className="text-[9px] uppercase tracking-widest font-extrabold text-sky-200 truncate block">APEX BLACK PERSONAL</span>
    <p className="text-[10px] sm:text-xs font-bold font-mono mt-1 text-white/90 truncate block max-w-[150px]">Visa infinite sovereign card</p>
  </div>
  <Cpu className="text-sky-200 shrink-0" size={24} />
</div>`);

txt = txt.replace(/<span className="text-xs font-mono font-bold text-\[\#D32F2F\]">12\/2030<\/span>/g, '<span className="text-xs font-mono font-bold text-sky-200">12/2030</span>');
txt = txt.replace(/<span className="text-white text-\[\#D32F2F\]">12\/2030<\/span>/g, '<span className="text-white text-sky-200">12/2030</span>');

fs.writeFileSync(file, txt);
