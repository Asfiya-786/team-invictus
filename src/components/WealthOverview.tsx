/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, ArrowDownLeft, Wallet, Percent, Send, CheckCircle, ShieldAlert } from 'lucide-react';
import { UserWealthState, Transaction } from '../types';

interface WealthOverviewProps {
  state: UserWealthState;
  onSendMoney: (merchant: string, amount: number, category: any, notes?: string) => void;
}

export default function WealthOverview({ state, onSendMoney }: WealthOverviewProps) {
  const [recipient, setRecipient] = useState('');
  const [amountStr, setAmountStr] = useState('');
  const [category, setCategory] = useState<'Fashion' | 'Dining' | 'Utilities' | 'Tech' | 'Health' | 'Transfer' | 'Other'>('Transfer');
  const [notes, setNotes] = useState('');
  const [securityPin, setSecurityPin] = useState('');
  const [showConfirm, setShowConfirm] = useState(false);
  const [transferSuccess, setTransferSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleInitiate = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    const amt = parseFloat(amountStr);
    if (!recipient.trim()) {
      setErrorMessage('Please specify an authorized merchant or recipient.');
      return;
    }
    if (isNaN(amt) || amt <= 0) {
      setErrorMessage('Please enter a valid transfer amount.');
      return;
    }
    if (amt > state.balance) {
      setErrorMessage('Insufficient balance index in this Apex account.');
      return;
    }
    setShowConfirm(true);
  };

  const handleComplete = () => {
    if (securityPin !== '1234') {
      setErrorMessage('Security Authorization Refused: Invalid Transaction PIN.');
      return;
    }
    const amt = parseFloat(amountStr);
    onSendMoney(recipient, amt, category, notes || `Transfer to ${recipient}`);
    setTransferSuccess(true);
    setErrorMessage('');
    setTimeout(() => {
      setTransferSuccess(false);
      setShowConfirm(false);
      setRecipient('');
      setAmountStr('');
      setSecurityPin('');
      setNotes('');
    }, 1500);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Wealth Balance Card */}
      <motion.div 
        id="wealth-balance-card"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="lg:col-span-2 glass-panel rounded-3xl p-8 shadow-premium relative overflow-hidden flex flex-col justify-between"
      >
        <div className="absolute top-0 right-0 w-44 h-44 bg-gradient-to-bl from-pink-100/50 to-transparent rounded-full -mr-12 -mt-12 pointer-events-none" />
        
        <div>
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-semibold text-[#4A1C6D]/70 tracking-wider uppercase">Total Account Balance</span>
            <span className="px-3 py-1 bg-white/50 text-[#4A1C6D] text-[10px] font-bold rounded-full border border-white/80">
              ● APEX PREMIUM SECURE
            </span>
          </div>

          <h2 className="text-5xl font-display font-medium tracking-tight text-[#4A1C6D] mb-8">
            #{state.balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).replace(/,/g, '')}
          </h2>
        </div>

        <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/60">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-medium text-gray-400 mb-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              INFLOW (M)
            </div>
            <p className="text-lg font-display font-semibold text-gray-800 flex items-center gap-1">
              <ArrowDownLeft className="w-4 h-4 text-emerald-500" />
              ${state.income.toLocaleString()}
            </p>
          </div>

          <div>
            <div className="flex items-center gap-1.5 text-xs font-medium text-gray-400 mb-1">
              <span className="w-2 h-2 rounded-full bg-pink-400" />
              OUTFLOW (M)
            </div>
            <p className="text-lg font-display font-semibold text-gray-800 flex items-center gap-1">
              <ArrowUpRight className="w-4 h-4 text-pink-500" />
              ${state.expenses.toLocaleString()}
            </p>
          </div>

          <div>
            <div className="flex items-center gap-1.5 text-xs font-medium text-gray-400 mb-1">
              <span className="w-2 h-2 rounded-full bg-pink-300" />
              SAVINGS RATE
            </div>
            <p className="text-lg font-display font-semibold text-gray-800 flex items-center gap-1">
              <Percent className="w-4 h-4 text-pink-500" />
              {state.savingsRate}%
            </p>
          </div>
        </div>
      </motion.div>

      {/* Quick Transfer Form (Secure Simulation) */}
      <motion.div 
        id="quick-transfer-card"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-panel rounded-3xl p-6 shadow-premium flex flex-col justify-between"
      >
        <div className="flex items-center gap-2 mb-4">
          <div className="p-2 bg-pink-50/55 rounded-xl">
            <Send className="w-4 h-4 text-[#4A1C6D]" />
          </div>
          <h3 className="font-display font-medium text-gray-800">Secure Instant Apex Pay</h3>
        </div>

        {!showConfirm ? (
          <form onSubmit={handleInitiate} className="space-y-3.5">
            <div>
              <label className="block text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1">Recipient / Business</label>
              <input
                type="text"
                placeholder="e.g. Blossom Boutiques"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                className="w-full px-3.5 py-2 text-sm bg-white/45 rounded-xl border border-white/60 focus:outline-none focus:border-pink-300 focus:bg-white/90 transition-all font-medium text-gray-800"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1">Amount ($)</label>
                <input
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  value={amountStr}
                  onChange={(e) => setAmountStr(e.target.value)}
                  className="w-full px-3.5 py-2 text-sm bg-white/45 rounded-xl border border-white/60 focus:outline-none focus:border-pink-300 focus:bg-white/90 transition-all font-medium text-gray-800"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1">Sector</label>
                <select
                  value={category}
                  onChange={(e: any) => setCategory(e.target.value)}
                  className="w-full px-2.5 py-2 text-sm bg-white/45 rounded-xl border border-white/60 focus:outline-none focus:border-pink-300 focus:bg-white/90 transition-all font-semibold text-gray-800"
                >
                  <option value="Transfer">Transfer</option>
                  <option value="Fashion">Fashion</option>
                  <option value="Dining">Dining</option>
                  <option value="Utilities">Utilities</option>
                  <option value="Tech">Tech</option>
                  <option value="Health">Health</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1">Transfer Memo (Optional)</label>
              <input
                type="text"
                placeholder="Reference info"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full px-3.5 py-1.5 text-xs bg-white/45 rounded-xl border border-white/60 focus:outline-none focus:border-pink-300 focus:bg-white/90 transition-all font-medium text-gray-800"
              />
            </div>

            {errorMessage && (
              <p className="text-xs text-rose-500 font-medium bg-rose-50/80 p-2 rounded-lg flex items-center gap-1.5">
                <ShieldAlert className="w-3.5 h-3.5 shrink-0" />
                {errorMessage}
              </p>
            )}

            <button
              type="submit"
              className="w-full py-2.5 bg-[#4A1C6D] hover:bg-[#3d165a] text-white font-bold rounded-xl text-sm transition-all shadow-sm active:scale-[0.98] cursor-pointer"
            >
              Verify & Authorize
            </button>
          </form>
        ) : (
          <div className="space-y-4">
            <AnimatePresence mode="wait">
              {transferSuccess ? (
                <motion.div 
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="py-8 text-center"
                >
                  <CheckCircle className="w-12 h-12 text-[#4A1C6D] mx-auto mb-2 animate-bounce" />
                  <h4 className="font-display font-medium text-[#4A1C6D]">Apex Ledger Updated!</h4>
                  <p className="text-xs text-gray-400 mt-1">Authorized internally with success</p>
                </motion.div>
              ) : (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-3.5"
                >
                  <div className="bg-white/65 p-3.5 rounded-2xl border border-white/50 text-center">
                    <span className="text-[10px] text-gray-400 block uppercase font-bold tracking-wider">Confirming Outbound Pay</span>
                    <p className="text-lg font-display font-bold text-[#4A1C6D] mt-0.5">
                      ${parseFloat(amountStr).toLocaleString()}
                    </p>
                    <span className="text-xs text-[#4A1C6D] block font-bold mt-1">to {recipient}</span>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-gray-400 uppercase tracking-wider text-center mb-1">
                      Enter 4-Digit Secure PIN (Use 1234)
                    </label>
                    <input
                      type="password"
                      maxLength={4}
                      placeholder="••••"
                      value={securityPin}
                      onChange={(e) => setSecurityPin(e.target.value)}
                      className="w-24 mx-auto text-center font-mono text-xl tracking-widest block bg-white/65 rounded-xl px-2 py-1.5 border border-white/50 focus:outline-none focus:border-pink-300"
                    />
                  </div>

                  {errorMessage && (
                    <p className="text-xs text-rose-500 font-medium text-center bg-rose-50/80 p-2 rounded-lg">
                      {errorMessage}
                    </p>
                  )}

                  <div className="grid grid-cols-2 gap-2 mt-4">
                    <button
                      type="button"
                      onClick={() => {
                        setShowConfirm(false);
                        setSecurityPin('');
                        setErrorMessage('');
                      }}
                      className="py-2 bg-white/30 hover:bg-white/60 border border-white/50 text-gray-600 rounded-xl text-xs font-semibold cursor-pointer"
                    >
                      Cancel Pay
                    </button>
                    <button
                      type="button"
                      onClick={handleComplete}
                      className="py-2 bg-[#4A1C6D] hover:bg-[#3d165a] text-white rounded-xl text-xs font-bold cursor-pointer"
                    >
                      Secure Execute
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </motion.div>
    </div>
  );
}
