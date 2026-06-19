import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Globe, ArrowUpRight, ArrowDownRight, RefreshCw, Calendar, TrendingUp, DollarSign } from 'lucide-react';
import { Transaction } from '../types';

interface OnlineDepositsCardProps {
  transactions: Transaction[];
}

// Custom hook for lightweight, high-performance counter animations
function AnimatedCounter({ value, prefix = "", suffix = "", decimal = false }: { value: number; prefix?: string; suffix?: string; decimal?: boolean }) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = value;
    if (start === end) {
      setDisplayValue(end);
      return;
    }

    const duration = 1000; // ms
    let startTime: number | null = null;

    const run = (now: number) => {
      if (!startTime) startTime = now;
      const progress = Math.min((now - startTime) / duration, 1);
      // Ease out quad
      const easeProgress = progress * (2 - progress);
      setDisplayValue(start + easeProgress * (end - start));
      if (progress < 1) {
        requestAnimationFrame(run);
      }
    };

    requestAnimationFrame(run);
  }, [value]);

  if (decimal) {
    return (
      <span className="font-mono">
        {prefix}{displayValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}{suffix}
      </span>
    );
  }

  return (
    <span className="font-mono">
      {prefix}{Math.round(displayValue).toLocaleString()}{suffix}
    </span>
  );
}

export default function OnlineDepositsCard({ transactions }: OnlineDepositsCardProps) {
  const [activeSubTab, setActiveSubTab] = useState<'metrics' | 'daily' | 'monthly'>('metrics');
  const [hoveredPoint, setHoveredPoint] = useState<{ x: number; y: number; label: string; value: number } | null>(null);
  
  // Calculate dynamic online deposits computed state based on the actual ledger transactions list
  const onlineTx = transactions.filter(t => 
    t.type === 'Income' && 
    (t.name.toLowerCase().includes('deposit') || t.name.toLowerCase().includes('online') || t.name.toLowerCase().includes('top up'))
  );
  
  // Dynamic totals:
  const baseTotalAmount = 34850.00;
  const baseTxCount = 142;
  const baseTodayAmount = 1850.00;
  const baseMonthAmount = 14350.00;
  const growthRate = 12.4;

  const extraTotalAmount = onlineTx.reduce((sum, tx) => sum + tx.amount, 0);
  const extraTxCount = onlineTx.length;
  // Assess tx added today
  const extraTodayAmount = onlineTx.filter(tx => {
    // Treat tx-new or recent dates as today
    return tx.id.startsWith('tx-new') || tx.date.includes(' ' + new Date().toISOString().substring(11, 13));
  }).reduce((sum, tx) => sum + tx.amount, 0);

  const totalOnlineAmount = baseTotalAmount + extraTotalAmount;
  const totalTxCount = baseTxCount + extraTxCount;
  const todayOnlineAmount = baseTodayAmount + extraTodayAmount;
  const monthOnlineAmount = baseMonthAmount + extraTotalAmount; // All recent added are this month

  // Chart datasets
  // Daily Trend (7 Days)
  const dailyData = [
    { label: 'Mon', value: 3400 },
    { label: 'Tue', value: 4200 },
    { label: 'Wed', value: 3100 },
    { label: 'Thu', value: 4800 },
    { label: 'Fri', value: 5200 },
    { label: 'Sat', value: 4100 },
    { label: 'Sun', value: 5800 + extraTodayAmount },
  ];

  // Monthly Trend (6 Months)
  const monthlyData = [
    { label: 'Jan', value: 18500 },
    { label: 'Feb', value: 22400 },
    { label: 'Mar', value: 28900 },
    { label: 'Apr', value: 24200 },
    { label: 'May', value: 31500 },
    { label: 'Jun', value: baseMonthAmount + extraTotalAmount },
  ];

  // Render SVG charts
  const svgWidth = 260;
  const svgHeight = 90;
  const paddingX = 20;
  const paddingY = 15;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.3 }}
      className="group relative overflow-hidden rounded-3xl bg-white/20 border border-white/35 p-5 backdrop-blur-xl shadow-lg hover:shadow-xl hover:bg-white/30 hover:border-white/50 transition-all duration-300 flex flex-col justify-between min-h-[195px] h-full"
    >
      {/* Dynamic Hover Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 pointer-events-none" />

      {/* Top Section */}
      <div>
        <div className="flex justify-between items-start mb-3">
          {/* Icon */}
          <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-700 flex items-center justify-center border border-white/40 shadow-sm transition-transform duration-300 group-hover:scale-105">
            <Globe className="w-5 h-5 animate-pulse" />
          </div>

          {/* Sub-Tabs toggler inside the card itself - fully customized glassmorphic menu */}
          <div className="flex bg-purple-950/5 p-0.5 rounded-lg border border-purple-950/5">
            <button
              onClick={(e) => { e.stopPropagation(); setActiveSubTab('metrics'); }}
              className={`px-2 py-0.5 text-[9px] font-black uppercase rounded-md transition-all ${
                activeSubTab === 'metrics'
                  ? 'bg-purple-950 text-white shadow-sm'
                  : 'text-purple-950/50 hover:text-purple-950'
              }`}
            >
              Info
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); setActiveSubTab('daily'); }}
              className={`px-2 py-0.5 text-[9px] font-black uppercase rounded-md transition-all ${
                activeSubTab === 'daily'
                  ? 'bg-purple-950 text-white shadow-sm'
                  : 'text-purple-950/50 hover:text-purple-950'
              }`}
            >
              Daily
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); setActiveSubTab('monthly'); }}
              className={`px-2 py-0.5 text-[9px] font-black uppercase rounded-md transition-all ${
                activeSubTab === 'monthly'
                  ? 'bg-purple-950 text-white shadow-sm'
                  : 'text-purple-950/50 hover:text-purple-950'
              }`}
            >
              Monthly
            </button>
          </div>
        </div>

        {/* Dynamic Card Content based on Sub-Tab selection */}
        <AnimatePresence mode="wait">
          {activeSubTab === 'metrics' && (
            <motion.div
              key="metrics"
              initial={{ opacity: 0, x: -7 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 7 }}
              transition={{ duration: 0.15 }}
              className="space-y-3"
            >
              <div>
                <span className="text-xs font-semibold text-purple-950/50 uppercase tracking-wider block">
                  Online Deposits
                </span>
                
                <div className="flex items-baseline justify-between mt-1">
                  <span className="font-mono text-2xl font-black text-purple-950 tracking-tight">
                    <AnimatedCounter value={totalOnlineAmount} prefix="$" decimal={true} />
                  </span>

                  {/* Growth Pill */}
                  <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[10px] font-bold border bg-emerald-500/10 border-emerald-500/20 text-emerald-600">
                    <ArrowUpRight className="w-3 h-3" />
                    {growthRate}%
                  </span>
                </div>
              </div>

              {/* Dynamic Miniature sub-metrics parameter grid */}
              <div className="grid grid-cols-3 gap-1.5 pt-1 border-t border-purple-950/5">
                <div className="bg-purple-950/[0.02] border border-purple-950/5 rounded-xl p-1.5 text-center leading-tight">
                  <span className="text-[7.5px] font-extrabold uppercase text-purple-950/40 block">Txs Count</span>
                  <strong className="text-purple-950 text-xs font-mono font-black">
                    <AnimatedCounter value={totalTxCount} />
                  </strong>
                </div>
                
                <div className="bg-purple-950/[0.02] border border-purple-950/5 rounded-xl p-1.5 text-center leading-tight">
                  <span className="text-[7.5px] font-extrabold uppercase text-purple-950/40 block">Today</span>
                  <strong className="text-purple-950 text-xs font-mono font-black">
                    <AnimatedCounter value={todayOnlineAmount} prefix="$" />
                  </strong>
                </div>

                <div className="bg-purple-950/[0.02] border border-purple-950/5 rounded-xl p-1.5 text-center leading-tight">
                  <span className="text-[7.5px] font-extrabold uppercase text-purple-950/40 block">This Month</span>
                  <strong className="text-purple-950 text-xs font-mono font-black">
                    <AnimatedCounter value={monthOnlineAmount} prefix="$" />
                  </strong>
                </div>
              </div>
            </motion.div>
          )}

          {activeSubTab === 'daily' && (
            <motion.div
              key="daily"
              initial={{ opacity: 0, x: -7 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 7 }}
              transition={{ duration: 0.15 }}
              className="relative h-[95px]"
            >
              <div className="flex justify-between items-center mb-1">
                <span className="text-[9px] font-bold text-purple-950/50 uppercase tracking-wider block">Daily Online Deposit Spike</span>
                <span className="text-[10px] font-mono font-black text-purple-900 bg-purple-500/10 px-1.5 py-0.25 rounded">
                  {hoveredPoint ? `${hoveredPoint.label}: $${hoveredPoint.value.toLocaleString()}` : 'Hover points'}
                </span>
              </div>
              
              <svg width="100%" height={svgHeight} className="overflow-visible mt-1">
                <defs>
                  <linearGradient id="onlineDailyGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#ec4899" stopOpacity="0" />
                  </linearGradient>
                </defs>

                {/* Grid Lines */}
                {[0, 0.5, 1].map((ratio, index) => {
                  const yVal = paddingY + (svgHeight - paddingY * 2) * ratio;
                  return (
                    <line 
                      key={index}
                      x1={paddingX} 
                      y1={yVal} 
                      x2={svgWidth - paddingX} 
                      y2={yVal} 
                      stroke="rgba(76, 29, 149, 0.05)" 
                      strokeDasharray="2 2" 
                    />
                  );
                })}

                {/* Line Path */}
                {(() => {
                  const maxVal = Math.max(...dailyData.map(d => d.value), 4000);
                  const minVal = Math.min(...dailyData.map(d => d.value), 1000) * 0.8;
                  const range = maxVal - minVal;
                  const getX = (i: number) => paddingX + ((svgWidth - paddingX * 2) / (dailyData.length - 1)) * i;
                  const getY = (v: number) => paddingY + (svgHeight - paddingY * 2) * (1 - (v - minVal) / range);

                  const points = dailyData.map((d, i) => `${getX(i)},${getY(d.value)}`).join(' ');
                  const fillPath = `M${getX(0)},${svgHeight - paddingY} ${points} L${getX(dailyData.length - 1)},${svgHeight - paddingY} Z`;

                  return (
                    <>
                      {/* Gradient Fill under path */}
                      <path d={fillPath} fill="url(#onlineDailyGrad)" />
                      {/* Interactive Smooth Curve */}
                      <polyline points={points} fill="none" stroke="#8b5cf6" strokeWidth="2" strokeLinecap="round" />
                      
                      {/* Dynamic Interactive Dots */}
                      {dailyData.map((d, i) => {
                        const px = getX(i);
                        const py = getY(d.value);
                        return (
                          <g 
                            key={i}
                            onMouseEnter={() => setHoveredPoint({ x: px, y: py, label: d.label, value: d.value })}
                            onMouseLeave={() => setHoveredPoint(null)}
                            className="cursor-pointer"
                          >
                            <circle 
                              cx={px} 
                              cy={py} 
                              r="3" 
                              fill="#ec4899" 
                              stroke="white" 
                              strokeWidth="1" 
                              className="transition-all hover:r-4"
                            />
                            <text
                              x={px}
                              y={svgHeight - 1}
                              textAnchor="middle"
                              className="font-semibold text-[8px] fill-purple-950/40 font-mono"
                            >
                              {d.label}
                            </text>
                          </g>
                        );
                      })}
                    </>
                  );
                })()}
              </svg>
            </motion.div>
          )}

          {activeSubTab === 'monthly' && (
            <motion.div
              key="monthly"
              initial={{ opacity: 0, x: -7 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 7 }}
              transition={{ duration: 0.15 }}
              className="relative h-[95px]"
            >
              <div className="flex justify-between items-center mb-1">
                <span className="text-[9px] font-bold text-purple-950/50 uppercase tracking-wider block">Monthly Online Trend</span>
                <span className="text-[10px] font-mono font-black text-purple-900 bg-purple-500/10 px-1.5 py-0.25 rounded">
                  {hoveredPoint ? `${hoveredPoint.label}: $${hoveredPoint.value.toLocaleString()}` : 'Hover bars'}
                </span>
              </div>

              <svg width="100%" height={svgHeight} className="overflow-visible mt-1">
                {/* Monthly Bars Chart */}
                {(() => {
                  const maxVal = Math.max(...monthlyData.map(d => d.value), 20000);
                  const getBarX = (i: number) => paddingX + ((svgWidth - paddingX * 2) / monthlyData.length) * i + 3;
                  const getBarY = (v: number) => paddingY + (svgHeight - paddingY * 2) * (1 - v / maxVal);
                  const barWidth = 18;

                  return monthlyData.map((d, i) => {
                    const bx = getBarX(i);
                    const by = getBarY(d.value);
                    const bh = Math.max((svgHeight - paddingY) - by, 2);

                    return (
                      <g 
                        key={i}
                        onMouseEnter={() => setHoveredPoint({ x: bx + barWidth/2, y: by, label: d.label, value: d.value })}
                        onMouseLeave={() => setHoveredPoint(null)}
                        className="cursor-pointer"
                      >
                        <rect
                          x={bx}
                          y={by}
                          width={barWidth}
                          height={bh}
                          rx="3"
                          fill={hoveredPoint?.label === d.label ? '#ec4899' : '#8b5cf6'}
                          className="transition-all duration-200"
                        />
                        <text
                          x={bx + barWidth / 2}
                          y={svgHeight - 1}
                          textAnchor="middle"
                          className="font-semibold text-[8px] fill-purple-950/40 font-mono"
                        >
                          {d.label}
                        </text>
                      </g>
                    );
                  });
                })()}
              </svg>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
