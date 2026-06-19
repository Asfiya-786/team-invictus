/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Shield, Key, Keyboard, List, AlertCircle, RefreshCw, Smartphone, Play, Lock, Unlock } from 'lucide-react';

interface SecurityControlsProps {
  logs: string[];
}

export default function SecurityControls({ logs }: SecurityControlsProps) {
  // 2FA rotating token
  const [mfaCode, setMfaCode] = useState('482 109');
  const [secondsRemaining, setSecondsRemaining] = useState(30);

  // Keyboard PIN confirmation game
  const [pinInput, setPinInput] = useState('');
  const [pinLocked, setPinLocked] = useState(false);
  const [pinFeedback, setPinFeedback] = useState('');

  // Auto-rotate the MFA key code
  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsRemaining(prev => {
        if (prev <= 1) {
          // Generate new code
          const p1 = Math.floor(100 + Math.random() * 900);
          const p2 = Math.floor(100 + Math.random() * 900);
          setMfaCode(`${p1} ${p2}`);
          return 30;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handlePinKey = (val: string) => {
    if (pinInput.length >= 4) return;
    setPinInput(prev => prev + val);
    setPinFeedback('');
  };

  const handlePinDelete = () => {
    setPinInput(prev => prev.slice(0, -1));
    setPinFeedback('');
  };

  const handlePinSubmit = () => {
    if (pinInput === '1234') {
      setPinLocked(!pinLocked);
      setPinFeedback(pinLocked ? 'System Locked successfully.' : 'Vault Unlocked successfully!');
      setPinInput('');
    } else {
      setPinFeedback('Access Denied: Invalid Master PIN.');
      setPinInput('');
    }
  };

  return (
    <div className="glass-panel rounded-3xl p-6 shadow-premium grid grid-cols-1 md:grid-cols-3 gap-6">
      
      {/* 1. Rotatable 2FA Token Card */}
      <div className="p-4 bg-white/35 rounded-2xl border border-white/50 flex flex-col justify-between h-full">
        <div>
          <div className="flex items-center gap-1.5 mb-3">
            <Smartphone className="w-4 h-4 text-[#4A1C6D]" />
            <span className="text-[11px] font-bold text-gray-800 uppercase tracking-widest">Multi-Factor Authenticator</span>
          </div>
          <p className="text-[10px] text-gray-400 leading-relaxed mb-4">
            Security tokens rotate every 30 seconds for outbound transaction clearance.
          </p>
        </div>

        <div className="my-2 text-center">
          <span className="font-mono text-3xl font-bold tracking-widest text-[#4A1C6D] select-all block bg-white/50 py-3 rounded-2xl border border-white/70 shadow-xs">
            {mfaCode}
          </span>
          <div className="flex items-center justify-center gap-1.5 mt-2.5">
            <RefreshCw className="w-3 h-3 text-[#4A1C6D] animate-spin" style={{ animationDuration: '30s' }} />
            <span className="text-[10px] font-bold font-mono text-[#4A1C6D]">
              Refreshes in {secondsRemaining}s
            </span>
          </div>
        </div>

        <div className="mt-2 p-2 bg-[#ff5e9c]/10 text-[10px] text-[#ff5e9c] font-bold rounded-lg text-center select-none border border-[#ff5e9c]/20">
          ✓ APEX MFA TOKENS CURRENT
        </div>
      </div>

      {/* 2. Pin-Block keypad simulator */}
      <div className="p-4 bg-white/35 rounded-2xl border border-white/50">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5">
            <Keyboard className="w-4 h-4 text-[#4A1C6D]" />
            <span className="text-[11px] font-bold text-gray-800 uppercase tracking-widest">PIN Lockpad Code</span>
          </div>
          
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 ${
            pinLocked ? 'bg-pink-100/60 text-[#4A1C6D]' : 'bg-[#ff5e9c]/15 text-[#ff5e9c] border border-[#ff5e9c]/20'
          }`}>
            {pinLocked ? <Lock className="w-2.5 h-2.5" /> : <Unlock className="w-2.5 h-2.5" />}
            {pinLocked ? 'LOCKED' : 'UNLOCKED'}
          </span>
        </div>
        
        <p className="text-[10px] text-gray-400 mb-2 font-mono">
          Interactive security gate lock. Default test code is **1234**.
        </p>

        {/* Locked Display input */}
        <div className="bg-white/45 rounded-xl py-2 px-3 mb-3 border border-white/60 flex justify-between items-center h-10">
          <span className="font-mono text-sm tracking-widest font-semibold text-gray-700 font-bold">
            {pinInput ? '• '.repeat(pinInput.length) : 'Enter Master PIN'}
          </span>
          {pinFeedback && (
            <span className={`text-[9px] font-bold ${pinFeedback.includes('Unlocked') || pinFeedback.includes('Locked') ? 'text-[#ff5e9c]' : 'text-rose-600'}`}>
              {pinFeedback}
            </span>
          )}
        </div>

        {/* Micro keypad Grid */}
        <div className="grid grid-cols-4 gap-1.5">
          {['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'].map((digit) => (
            <button
              key={digit}
              onClick={() => handlePinKey(digit)}
              className="py-1 bg-white/50 hover:bg-white/80 text-xs font-semibold text-gray-700 rounded-lg border border-white/60 active:bg-pink-100/40 cursor-pointer transition-all"
            >
              {digit}
            </button>
          ))}
          <button
            onClick={handlePinDelete}
            className="py-1 bg-white/30 hover:bg-white/60 border border-white/60 text-[10px] font-bold text-gray-600 rounded-lg cursor-pointer transition-all"
          >
            DEL
          </button>
          <button
            onClick={handlePinSubmit}
            className="py-1 bg-[#4A1C6D] hover:bg-[#32104c] text-[10px] font-bold text-white rounded-lg cursor-pointer col-span-2 transition-all shadow-sm"
          >
            CONFIRM
          </button>
        </div>
      </div>

      {/* 3. Live session audit console */}
      <div className="p-4 bg-white/35 rounded-2xl border border-white/50 flex flex-col justify-between h-full">
        <div>
          <div className="flex items-center gap-1.5 mb-2">
            <List className="w-4 h-4 text-[#4A1C6D]" />
            <span className="text-[11px] font-bold text-gray-800 uppercase tracking-widest">Apex Security Log</span>
          </div>
          <p className="text-[10px] text-gray-400 mb-2">
            Dynamic real-time compliance ledger recording administrative interactions.
          </p>
        </div>

        {/* Dynamic Log items */}
        <div className="bg-gray-950/80 rounded-xl p-3 h-28 overflow-y-auto text-[9px] font-mono text-pink-100 space-y-1.5 border border-white/30 flex-1">
          {logs.map((log, index) => (
            <div key={index} className="flex gap-1.5 items-start leading-relaxedPink">
              <span className="text-pink-300 shrink-0 select-none">›</span>
              <span>{log}</span>
            </div>
          ))}
          {logs.length === 0 && (
            <p className="text-gray-500 italic text-center pt-8">No security logs logged.</p>
          )}
        </div>
      </div>
    </div>
  );
}
