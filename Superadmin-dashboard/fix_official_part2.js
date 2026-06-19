import fs from 'fs';

let content = fs.readFileSync('src/components/CreditCards.tsx', 'utf8');

const targetFront = `<div className="flex justify-between items-start z-10 text-white">
                        <div>
                          <span className="text-[9px] uppercase tracking-widest font-extrabold text-pink-100">APEX EXECUTIVE NODE</span>
                          <p className="text-xs font-bold font-mono tracking-wide mt-1 text-white/95 truncate max-w-[150px]">Mastercard black executive</p>
                        </div>
                        <Cpu className="text-pink-100" size={24} />
                      </div>

                      <div className="text-lg md:text-xl font-mono tracking-widest text-[#eceff8] my-3 z-10 drop-shadow-md truncate">
                        {officialCardBlock ? '•••• •••• •••• ••••' : '4820 9011 2288 3344'}
                      </div>

                      <div className="flex justify-between items-end z-10">
                        <div className="min-w-0">
                          <span className="text-[8px] text-pink-100/80 block font-bold">EXECUTIVE SIGNATORY</span>
                          <p className="text-[10px] sm:text-xs font-black text-white tracking-wide uppercase truncate max-w-[150px]">SUPER USER - EXECUTIVE HQ</p>
                        </div>
                        <div className="text-right shrink-0">
                          <span className="text-[8px] text-pink-100/80 block font-bold">CARD EXPIRES</span>
                          <p className="text-xs font-mono font-bold text-pink-100">06/2032</p>
                        </div>
                      </div>`;

const newFront = `<div className="flex justify-between items-start z-10 w-full" style={{ color: officialCardBlock ? '#1e293b' : 'white' }}>
                        <div className="min-w-0 pr-2">
                          <span className="text-[9px] uppercase tracking-widest font-extrabold truncate block" style={{ color: officialCardBlock ? '#475569' : '#fce7f3' }}>APEX EXECUTIVE NODE</span>
                          <p className="text-[10px] sm:text-xs font-bold font-mono mt-1 tracking-wide truncate block max-w-[150px]">Mastercard black executive</p>
                        </div>
                        <Cpu className="shrink-0" style={{ color: officialCardBlock ? '#64748b' : '#fce7f3' }} size={24} />
                      </div>

                      <div className="text-lg md:text-xl font-mono tracking-widest my-3 z-10 drop-shadow-md truncate" style={{ color: officialCardBlock ? '#1e293b' : 'white' }}>
                        {officialCardBlock ? '•••• •••• •••• ••••' : '4820 9011 2288 3344'}
                      </div>

                      <div className="flex justify-between items-end z-10 w-full">
                        <div className="min-w-0 pr-2">
                          <span className="text-[8px] block font-bold truncate" style={{ color: officialCardBlock ? '#64748b' : 'rgba(252,231,243,0.8)' }}>EXECUTIVE SIGNATORY</span>
                          <p className="text-[10px] sm:text-xs font-black tracking-wide uppercase truncate max-w-[150px]" style={{ color: officialCardBlock ? '#1e293b' : 'white' }}>SUPER USER - EXECUTIVE HQ</p>
                        </div>
                        <div className="text-right shrink-0">
                          <span className="text-[8px] block font-bold" style={{ color: officialCardBlock ? '#64748b' : 'rgba(252,231,243,0.8)' }}>CARD EXPIRES</span>
                          <p className="text-xs font-mono font-bold" style={{ color: officialCardBlock ? '#334155' : '#fce7f3' }}>06/2032</p>
                        </div>
                      </div>`;

content = content.replace(targetFront, newFront);


const backSideOld = `                    {/* BACK SIDE */}
                    <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] rounded-2xl bg-gradient-to-tr from-[#3a2072] via-[#5b21b6] to-[#4c1d95] border-pink-300 shadow-xl flex flex-col pt-6 overflow-hidden">`;

const backSideNew = `                    {/* BACK SIDE */}
                    <div className={\`absolute inset-0 w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] rounded-2xl border-pink-300 shadow-xl flex flex-col pt-6 overflow-hidden \${officialCardBlock ? 'bg-slate-300 text-slate-800' : 'bg-gradient-to-tr from-pink-500 via-rose-500 to-fuchsia-600 text-white'}\`}>`;

content = content.replace(backSideOld, backSideNew);

// Replace any remaining #3a2072 bg gradients if they exist in that front block text but we already replaced this
fs.writeFileSync('src/components/CreditCards.tsx', content);
