/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, Filter, Plus, ArrowUpRight, ArrowDownLeft, 
  ShoppingBag, ForkKnife, Wifi, Cpu, HeartPulse, 
  TrendingUp, Download, ShieldCheck, Flag, Check, 
  Trash2, AlertTriangle, MessageSquare, Tag
} from 'lucide-react';
import { Transaction } from '../types';

interface TransactionsLedgerProps {
  transactions: Transaction[];
  onAddTransaction: (newTx: Omit<Transaction, 'id' | 'date'>) => void;
  onDeleteTransaction: (id: string) => void;
  onToggleFlagTransaction: (id: string) => void;
}

export default function TransactionsLedger({ 
  transactions, 
  onAddTransaction, 
  onDeleteTransaction, 
  onToggleFlagTransaction 
}: TransactionsLedgerProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('All');
  const [showAddModal, setShowAddModal] = useState(false);

  // New Transaction Form states
  const [merchant, setMerchant] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState<Transaction['category']>('Fashion');
  const [notes, setNotes] = useState('');
  const [tag, setTag] = useState('#personal');
  const [type, setType] = useState<'expense' | 'income'>('expense');

  // Handle addition
  const handleAddNewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amt = parseFloat(amount);
    if (!merchant.trim() || isNaN(amt) || amt <= 0) return;

    onAddTransaction({
      merchant,
      amount: amt,
      category,
      tag: tag.startsWith('#') ? tag : `#${tag}`,
      status: 'completed',
      type,
      notes: notes.trim() ? notes : undefined
    });

    // Reset states
    setMerchant('');
    setAmount('');
    setCategory('Fashion');
    setNotes('');
    setTag('#personal');
    setType('expense');
    setShowAddModal(false);
  };

  const categoriesList = ['All', 'Fashion', 'Dining', 'Utilities', 'Tech', 'Health', 'Salary', 'Investments', 'Transfer', 'Other'];

  const getCategoryIcon = (category: Transaction['category']) => {
    switch (category) {
      case 'Fashion':
        return <ShoppingBag className="w-4 h-4 text-pink-600" />;
      case 'Dining':
        return <ForkKnife className="w-4 h-4 text-amber-600" />;
      case 'Utilities':
        return <Wifi className="w-4 h-4 text-cyan-600" />;
      case 'Tech':
        return <Cpu className="w-4 h-4 text-indigo-600" />;
      case 'Health':
        return <HeartPulse className="w-4 h-4 text-emerald-600" />;
      case 'Investments':
        return <TrendingUp className="w-4 h-4 text-purple-600" />;
      case 'Salary':
        return <ArrowDownLeft className="w-4 h-4 text-emerald-600" />;
      case 'Transfer':
        return <ArrowUpRight className="w-4 h-4 text-pink-500" />;
      default:
        return <Tag className="w-4 h-4 text-gray-500" />;
    }
  };

  const getCategoryBg = (category: Transaction['category']) => {
    switch (category) {
      case 'Fashion': return 'bg-pink-50 border border-pink-100';
      case 'Dining': return 'bg-amber-50 border border-amber-100';
      case 'Utilities': return 'bg-cyan-50 border border-cyan-100';
      case 'Tech': return 'bg-indigo-50 border border-indigo-100';
      case 'Health': return 'bg-emerald-50 border border-emerald-100';
      case 'Investments': return 'bg-purple-50 border border-purple-100';
      case 'Salary': return 'bg-emerald-50 border border-emerald-100';
      case 'Transfer': return 'bg-pink-50 border border-pink-100';
      default: return 'bg-gray-50 border border-gray-100';
    }
  };

  // Filter & Search logic
  const filtered = transactions.filter(tx => {
    const matchesSearch = tx.merchant.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          (tx.notes && tx.notes.toLowerCase().includes(searchTerm.toLowerCase())) ||
                          tx.tag.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'All' || tx.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const downloadStatement = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(transactions, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `apex_statement_authorized.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="glass-panel rounded-3xl p-6 shadow-premium flex flex-col h-full">
      
      {/* Header controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h3 className="font-display font-medium text-gray-800 text-lg">Transaction Ledger</h3>
          <p className="text-xs text-gray-400 mt-0.5">Secure system-wide expense verification</p>
        </div>

        <div className="flex items-center gap-2">
          {/* Statement download */}
          <button
            onClick={downloadStatement}
            className="p-2.5 hover:bg-white/60 text-[#4A1C6D] rounded-xl transition-all border border-white/70 flex items-center gap-1.5 text-xs font-semibold cursor-pointer"
            title="Download Statement"
          >
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Export Audit</span>
          </button>

          {/* Add custom tx */}
          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 bg-[#4A1C6D] hover:bg-[#3b165a] text-white rounded-xl transition-colors text-xs font-semibold flex items-center gap-1.5 shadow-sm hover:shadow cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            Log Transaction
          </button>
        </div>
      </div>

      {/* Search Input and Filter Row */}
      <div className="space-y-4 mb-6">
        <div className="relative">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by merchant, tags or reference note..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white/45 rounded-2xl border border-white/60 focus:outline-none focus:border-pink-300 text-sm transition-all focus:bg-white/80"
          />
        </div>

        {/* Category filtering chips */}
        <div className="flex gap-1.5 overflow-x-auto pb-1.5 scrollbar-thin">
          {categoriesList.map((cat) => {
            const isSelected = filterCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setFilterCategory(cat)}
                className={`flex-shrink-0 px-3.5 py-1.5 rounded-full text-xs font-semibold cursor-pointer transition-all ${
                  isSelected 
                    ? 'bg-[#4A1C6D] text-white border border-[#4A1C6D] shadow-sm' 
                    : 'bg-white/40 text-gray-500 hover:text-gray-950 border border-white/60 hover:border-white/80'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Ledger List */}
      <div className="flex-1 overflow-y-auto max-h-[380px] space-y-2.5 pr-1">
        <AnimatePresence initial={false}>
          {filtered.length > 0 ? (
            filtered.map((tx) => {
              const isIncome = tx.type === 'income';
              const isFlagged = tx.status === 'flagged';

              return (
                <motion.div
                  key={tx.id}
                  layout
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className={`p-4 rounded-2xl border transition-all flex flex-col md:flex-row md:items-center justify-between gap-3 ${
                    isFlagged 
                      ? 'bg-rose-50 border-rose-200/60' 
                      : 'bg-white hover:bg-pink-50/20 border-pink-100/30 hover:border-pink-100/70'
                  }`}
                >
                  <div className="flex items-start gap-3.5">
                    {/* Category Stamp */}
                    <div className={`p-2.5 rounded-xl self-center shrink-0 ${getCategoryBg(tx.category)}`}>
                      {getCategoryIcon(tx.category)}
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold text-gray-800 text-sm tracking-tight">{tx.merchant}</h4>
                        <span className="text-[10px] bg-gray-100 px-1.5 py-0.5 rounded text-gray-500 font-mono">
                          {tx.category}
                        </span>
                      </div>
                      
                      {tx.notes && (
                        <p className="text-xs text-gray-400 mt-0.5 leading-relaxed italic">{tx.notes}</p>
                      )}

                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[10px] text-gray-400">
                          {new Date(tx.date).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </span>
                        <span>•</span>
                        <span className="text-[10px] text-[#4A1C6D] font-bold">
                          {tx.tag}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Actions & Balance indices */}
                  <div className="flex md:flex-col items-end justify-between md:justify-center gap-2 pt-2 md:pt-0 border-t md:border-0 border-gray-100">
                    <span className={`text-base font-display font-bold ${isIncome ? 'text-emerald-600' : 'text-[#4A1C6D]'}`}>
                      {isIncome ? '+' : '-'}${tx.amount.toFixed(2)}
                    </span>
                    
                    <div className="flex items-center gap-1.5">
                      {/* Flag button */}
                      <button
                        onClick={() => onToggleFlagTransaction(tx.id)}
                        className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                          isFlagged 
                            ? 'bg-rose-100 text-rose-600' 
                            : 'hover:bg-white/60 text-gray-400 hover:text-rose-500 border border-transparent hover:border-white/50'
                        }`}
                        title={isFlagged ? 'Unflag Incident' : 'Flag Security Incident'}
                      >
                        <Flag className="w-3.5 h-3.5" />
                      </button>

                      {/* Delete button */}
                      <button
                        onClick={() => onDeleteTransaction(tx.id)}
                        className="p-1.5 rounded-lg hover:bg-white/60 text-gray-300 hover:text-gray-650 cursor-pointer transition-all border border-transparent hover:border-white/50"
                        title="Delete Ledger Log"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>

                      {isFlagged ? (
                        <span className="text-[9px] bg-rose-500 text-white font-bold uppercase py-0.5 px-1.5 rounded flex items-center gap-1">
                          <AlertTriangle className="w-2.5 h-2.5" />
                          FLAGGED
                        </span>
                      ) : (
                        <span className="text-[9px] bg-emerald-500/10 text-emerald-600 font-bold uppercase py-0.5 px-1.5 rounded flex items-center gap-0.5 border border-emerald-100">
                          <ShieldCheck className="w-2.5 h-2.5" />
                          VERIFIED
                        </span>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })
          ) : (
            <div className="text-center py-10">
              <p className="text-sm text-gray-400 font-medium">No system matches for your query parameters.</p>
              <button
                onClick={() => { setSearchTerm(''); setFilterCategory('All'); }}
                className="text-[#4A1C6D] text-xs font-semibold hover:underline mt-2 cursor-pointer"
              >
                Clear Filters
              </button>
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* Add Custom Ledger Log Modal */}
      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="glass-modal rounded-3xl p-6 max-w-md w-full shadow-2xl relative"
            >
              <h3 className="font-display font-bold text-[#4A1C6D] text-lg mb-4">Log Transaction Record</h3>
              
              <form onSubmit={handleAddNewSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-3 pb-2 border-b border-white/50">
                  <button
                    type="button"
                    onClick={() => setType('expense')}
                    className={`py-2 text-xs font-bold rounded-xl border transition-all cursor-pointer text-center ${
                      type === 'expense' 
                        ? 'bg-rose-50 border-rose-350 text-rose-700 font-bold shadow-sm' 
                        : 'bg-white/40 border-white/60 text-gray-400'
                    }`}
                  >
                    Debit Outflow
                  </button>
                  <button
                    type="button"
                    onClick={() => setType('income')}
                    className={`py-2 text-xs font-bold rounded-xl border transition-all cursor-pointer text-center ${
                      type === 'income' 
                        ? 'bg-emerald-50 border-emerald-200 text-emerald-700 font-bold shadow-sm' 
                        : 'bg-white/40 border-white/60 text-gray-400'
                    }`}
                  >
                    Credit Inflow
                  </button>
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase text-gray-400 tracking-wider mb-1">Merchant / Recipient</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Blossom Boutiques"
                    value={merchant}
                    onChange={(e) => setMerchant(e.target.value)}
                    className="w-full px-3.5 py-2 text-sm bg-white/45 rounded-xl border border-white/60 focus:outline-none focus:border-pink-350 transition-all font-medium text-gray-800"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-bold uppercase text-gray-400 tracking-wider mb-1">Amount ($)</label>
                    <input
                      type="number"
                      step="0.01"
                      required
                      placeholder="0.00"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="w-full px-3.5 py-2 text-sm bg-white/45 rounded-xl border border-white/60 focus:outline-none focus:border-pink-350 transition-all font-medium text-gray-800"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase text-gray-400 tracking-wider mb-1">Sector</label>
                    <select
                      value={category}
                      onChange={(e: any) => setCategory(e.target.value)}
                      className="w-full px-2.5 py-2 text-sm bg-white/45 rounded-xl border border-white/60 focus:outline-none focus:border-pink-350 transition-all font-semibold text-gray-800"
                    >
                      {categoriesList.filter(c => c !== 'All').map(c => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-bold uppercase text-gray-400 tracking-wider mb-1">Access Tag</label>
                    <input
                      type="text"
                      placeholder="#personal"
                      value={tag}
                      onChange={(e) => setTag(e.target.value)}
                      className="w-full px-3.5 py-2 text-sm bg-white/45 rounded-xl border border-white/60 focus:outline-none transition-all font-medium text-gray-800"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase text-gray-400 tracking-wider mb-1">Secured Status</label>
                    <div className="px-3.5 py-2 text-xs bg-emerald-50 text-emerald-700 font-bold rounded-xl border border-emerald-100 flex items-center justify-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5" /> SECURE AUTH
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase text-gray-400 tracking-wider mb-1">Reference Notes</label>
                  <input
                    type="text"
                    placeholder="Describe transaction context"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full px-3.5 py-2 text-sm bg-white/45 rounded-xl border border-white/60 focus:outline-none transition-all font-medium text-gray-800"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3 pt-3">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="py-2.5 bg-white/40 hover:bg-white/80 border border-white/60 text-gray-600 rounded-xl text-xs font-semibold cursor-pointer"
                  >
                    Cancel Action
                  </button>
                  <button
                    type="submit"
                    className="py-2.5 bg-[#4A1C6D] hover:bg-[#3b165a] text-white rounded-xl text-xs font-bold cursor-pointer"
                  >
                    Commit to Ledger
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
