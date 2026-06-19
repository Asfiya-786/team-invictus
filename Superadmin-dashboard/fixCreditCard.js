import fs from 'fs';

let file = 'src/components/CreditCards.tsx';
let txt = fs.readFileSync(file, 'utf8');

txt = txt.replace(
  'p-6 rounded-2xl border border-amber-500/30 bg-gradient-to-b from-[#0e1644] to-[#040822] shadow-[0_0_25px_rgba(212,175,55,0.08)] relative overflow-hidden',
  'p-6 rounded-2xl border border-pink-300 bg-pink-100 shadow-[0_0_25px_rgba(0,0,0,0.05)] relative overflow-hidden'
);

txt = txt.replace('<h2 className="text-lg font-extrabold tracking-wide text-white mt-1">Super Admin Financial Card Center</h2>', '<h2 className="text-lg font-extrabold tracking-wide text-[#3a2072] mt-1">Super Admin Financial Card Center</h2>');
txt = txt.replace('<p className="text-xs text-[#8495bc]">Exclusive dashboard for direct bank liquidity operations and active strategic credit cards.</p>', '<p className="text-xs text-[#3a2072]/80 font-bold">Exclusive dashboard for direct bank liquidity operations and active strategic credit cards.</p>');

txt = txt.replace(/bg-gradient-to-tr from-\[\#0B0D17\] via-\[\#40304D\] to-\[\#2D2438\] border-\[\#D32F2F\]\/30 group-hover:border-\[\#D32F2F\]\/50/g, 'bg-gradient-to-tr from-[#3a2072] via-[#5b21b6] to-[#4c1d95] border-pink-300 group-hover:border-pink-500 shadow-xl');
txt = txt.replace(/bg-gradient-to-tr from-\[\#0B0D17\] via-\[\#2D2438\] to-\[\#050505\] border-\[\#D32F2F\]\/40 shadow-2xl/g, 'bg-gradient-to-tr from-[#3a2072] via-[#5b21b6] to-[#4c1d95] border-pink-300 shadow-xl');
txt = txt.replace(/bg-gradient-to-tr from-\[\#0B0D17\] to-\[\#1a1a1a\] border-\[\#D32F2F\]\/40/g, 'bg-slate-300 border-slate-400');

txt = txt.replace('<span className="text-[10px] font-mono uppercase tracking-widest text-[#d4af37] font-bold">Secure Root Access Controls</span>', '<span className="text-[10px] font-mono uppercase tracking-widest text-[#3a2072] font-extrabold">Secure Root Access Controls</span>');
txt = txt.replace('<span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />', '<span className="w-2 h-2 rounded-full bg-[#d946ef] animate-pulse" />');

txt = txt.replace('bg-[#070c2e] p-1 rounded-xl border border-[#17235a]/80', 'bg-white/50 p-1 rounded-xl border border-pink-300 shadow-sm');
txt = txt.replace('<span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Double click card for Intelligence Terminal</span>', '<span className="text-[10px] font-mono text-[#3a2072]/60 font-bold uppercase tracking-widest">Double click card for Intelligence Terminal</span>');

txt = txt.replace(/bg-gradient-to-tr from-\[\#061121\] via-\[\#1A2B45\] to-\[\#0A1930\] border-\[\#d4af37\]\/40 group-hover:border-\[\#d4af37\]\/60/g, 'bg-gradient-to-tr from-[#0284c7] via-[#0369a1] to-[#0c4a6e] border-sky-300 group-hover:border-sky-400 shadow-xl');
txt = txt.replace(/bg-gradient-to-tr from-\[\#061121\] via-\[\#1A2B45\] to-\[\#050B14\] border-\[\#d4af37\]\/50 shadow-2xl/g, 'bg-gradient-to-tr from-[#0284c7] via-[#0369a1] to-[#0c4a6e] border-sky-300 shadow-xl');

// also for the buttons in the tabs
txt = txt.replace(/'bg-amber-500 text-slate-900 shadow-md'/g, "'bg-pink-400 text-white shadow-md rounded-lg mx-1'");
txt = txt.replace(/'text-\[\#8495bc\] hover:text-white'/g, "'text-[#3a2072]/60 hover:text-[#3a2072]'");

fs.writeFileSync(file, txt);
