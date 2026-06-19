import fs from 'fs';

let content = fs.readFileSync('src/components/CreditCards.tsx', 'utf8');

// Front gradients
content = content.replace(
  /'bg-gradient-to-tr from-\[\#0284c7\] via-\[\#0369a1\] to-\[\#0c4a6e\] border-sky-300 group-hover:border-sky-400 shadow-xl'/g,
  "'bg-gradient-to-tr from-pink-500 via-rose-500 to-fuchsia-600 border-pink-300 group-hover:border-pink-200 shadow-xl text-white'"
);

// Back gradient
content = content.replace(
  /className="absolute inset-0 w-full h-full \[\backface-visibility:hidden\] \[\transform:rotateY\(180deg\)\] rounded-2xl bg-gradient-to-tr from-\[\#0284c7\] via-\[\#0369a1\] to-\[\#0c4a6e\] border-sky-300 shadow-xl flex flex-col pt-6 overflow-hidden"/g,
  'className={`absolute inset-0 w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] rounded-2xl border-pink-300 shadow-xl flex flex-col pt-6 overflow-hidden ${personalCardBlock ? \'bg-slate-300 text-slate-800\' : \'bg-gradient-to-tr from-pink-500 via-rose-500 to-fuchsia-600 text-white\'}`}'
);

// Text colors
content = content.replace(/text-sky-200/g, 'text-pink-100');
content = content.replace(/bg-sky-200/g, 'bg-pink-100');

// Additional cleanup on the card face
content = content.replace(/<div className="absolute -right-16 -top-16 w-36 h-36 bg-\[\#D32F2F\]\/10 rounded-full blur-2xl" \/>/g, '<div className="absolute -right-16 -top-16 w-36 h-36 bg-pink-300/20 rounded-full blur-2xl" />');

// also text-zinc-300 to text-pink-100/80
content = content.replace(/text-zinc-300/g, 'text-pink-100/80');

fs.writeFileSync('src/components/CreditCards.tsx', content);
