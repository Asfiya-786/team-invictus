import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  PiggyBank, 
  Search, 
  User, 
  CreditCard, 
  Landmark, 
  ArrowRight, 
  CheckCircle2, 
  RotateCcw, 
  Info, 
  Sparkles, 
  DollarSign, 
  RefreshCw,
  FileText,
  Lock,
  ChevronRight,
  Send,
  Calendar,
  AlertCircle
} from 'lucide-react';
import { Customer, Transaction } from '../types';

interface DepositsTabProps {
  balance: number;
  onBalanceChange: (amt: number) => void;
  onAddTransaction: (
    name: string,
    type: 'Income' | 'Expense',
    amount: number,
    recipient: string,
    status: 'Completed' | 'Pending' | 'Failed'
  ) => void;
  customers: Customer[];
  onSetCustomers: React.Dispatch<React.SetStateAction<Customer[]>> | ((custs: Customer[] | ((prev: Customer[]) => Customer[])) => void);
  onAddCashflowIncome: (amount: number) => void;
  onAddActivityLog: (actionMsg: string) => void;
  searchQuery?: string;
}

export default function DepositsTab({
  balance,
  onBalanceChange,
  onAddTransaction,
  customers,
  onSetCustomers,
  onAddCashflowIncome,
  onAddActivityLog,
  searchQuery: globalSearchQuery = ''
}: DepositsTabProps) {
  // Form States
  const [localSearch, setLocalSearch] = useState('');
  const [selectedCustomerId, setSelectedCustomerId] = useState<string>('');
  const [accountNumber, setAccountNumber] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [depositAmount, setDepositAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'UPI' | 'NEFT' | 'RTGS' | 'IMPS' | 'Internet Banking'>('UPI');
  const [remarks, setRemarks] = useState('');
  const [referenceId, setReferenceId] = useState('');
  const [dateTime, setDateTime] = useState('');
  
  // Interactive UI Feedbacks
  const [validationError, setValidationError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successInfo, setSuccessInfo] = useState<{
    customerName: string;
    amount: number;
    refId: string;
    method: string;
    time: string;
  } | null>(null);

  // Filter customers for search dropdown/list
  const activeSearch = localSearch || globalSearchQuery;
  const searchedCustomers = customers.filter(c => {
    const q = activeSearch.toLowerCase();
    return (
      c.name.toLowerCase().includes(q) ||
      c.company.toLowerCase().includes(q) ||
      c.accountNumber.toLowerCase().includes(q)
    );
  });

  // Auto-generate a high-fidelity reference tracking id
  const generateRefId = (methodStr: string) => {
    const randomHex = Math.floor(100000 + Math.random() * 900000).toString(16).toUpperCase();
    const timestamp = Math.floor(Date.now() / 1000).toString().slice(-4);
    return `DEP-${methodStr}-${timestamp}-${randomHex}`;
  };

  // Set default state values on mount
  useEffect(() => {
    // Generate initial reference ID
    setReferenceId(generateRefId(paymentMethod));
    
    // Set time to current local time formatted for input
    const now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    setDateTime(now.toISOString().slice(0, 16));
  }, [paymentMethod]);

  // Handle selecting a customer from search list
  const handleSelectCustomer = (cust: Customer) => {
    setSelectedCustomerId(cust.id);
    setCustomerName(cust.name);
    setAccountNumber(cust.accountNumber);
    setLocalSearch(''); // Close list overlay
    setValidationError(null);
  };

  // Reset entire form
  const handleResetForm = () => {
    setSelectedCustomerId('');
    setAccountNumber('');
    setCustomerName('');
    setDepositAmount('');
    setPaymentMethod('UPI');
    setRemarks('');
    setReferenceId(generateRefId('UPI'));
    setValidationError(null);
    setSuccessInfo(null);
  };

  // Submit formal Online Deposit execution
  const handleSubmitDeposit = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);

    // Form validations
    if (!customerName.trim()) {
      setValidationError("Customer Name is required. Please search and select an authorized customer.");
      return;
    }
    if (!accountNumber.trim()) {
      setValidationError("Account Number is required. Enter a valid alphanumeric ledger routing number.");
      return;
    }
    const amt = parseFloat(depositAmount);
    if (isNaN(amt) || amt <= 0) {
      setValidationError("Please enter a valid deposit amount greater than $0.00.");
      return;
    }
    if (amt > 1000000) {
      setValidationError("Deposit limit exceeded. Transactions over $1,000,000 require executive board approval.");
      return;
    }
    if (!referenceId.trim()) {
      setValidationError("Transaction Reference ID cannot be blank.");
      return;
    }

    // Begin validation submit simulator
    setIsSubmitting(true);

    setTimeout(() => {
      // 1. Update the appropriate customer's balances
      onSetCustomers(prevCustomers => {
        return prevCustomers.map(cust => {
          if (cust.id === selectedCustomerId || cust.accountNumber === accountNumber) {
            return {
              ...cust,
              availableBalance: cust.availableBalance + amt
            };
          }
          return cust;
        });
      });

      // If deposited to Andrew (cust-1), increase the general system liquidity pool
      if (selectedCustomerId === 'cust-1' || accountNumber === '9941129-C-490') {
        onBalanceChange(balance + amt);
      } else {
        // Even if private corporate account, we register bank assets growth!
        onBalanceChange(balance + amt);
      }

      // 2. Append transaction to general ledger history
      onAddTransaction(
        `Online Deposit (${paymentMethod})`,
        'Income',
        amt,
        customerName,
        'Completed'
      );

      // 3. Update Income Cashflow charts
      onAddCashflowIncome(amt);

      // 4. Update dynamic activity logging stream
      onAddActivityLog(`processed Online Deposit of $${amt.toLocaleString()} to ${customerName} (Ref: ${referenceId})`);

      // Trigger success panel
      setSuccessInfo({
        customerName,
        amount: amt,
        refId: referenceId,
        method: paymentMethod,
        time: dateTime.replace('T', ' ')
      });

      setIsSubmitting(false);
    }, 1200);
  };

  return (
    <div className="space-y-6">
      
      {/* 1. COMPREHENSIVE LANDING BANNER */}
      <div className="rounded-3xl bg-white/20 border border-white/40 p-6 backdrop-blur-xl shadow-lg relative overflow-hidden">
        <div className="absolute -right-12 -top-12 w-32 h-32 rounded-full bg-purple-500/10 blur-xl pointer-events-none" />
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 relative z-10">
          <div>
            <h3 className="font-display font-black text-lg text-purple-950 flex items-center gap-2">
              <PiggyBank className="w-5 h-5 text-purple-700" />
              Online Deposits Mainframe Terminal
            </h3>
            <p className="text-xs text-purple-950/50 font-medium mt-0.5">
              Directly credit customer balances via RTGS, IMPS, and instant internet clearing pipelines with zero latent settlement queueing.
            </p>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-white/40 border border-white/50 rounded-2xl shadow-sm">
            <span className="text-[10px] font-black tracking-wider text-purple-950/50 uppercase">Bank Vault Assets:</span>
            <span className="font-mono text-sm font-black text-purple-900">${balance.toLocaleString()}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        
        {/* 2. MAIN TRANSACTION FORM PANEL */}
        <div className="lg:col-span-2 rounded-3xl bg-white/20 border border-white/40 p-6 backdrop-blur-xl shadow-lg relative">
          
          <h4 className="font-display font-black text-sm text-purple-950 uppercase tracking-wider mb-5 pb-2 border-b border-purple-950/5">
            1. Core Clearing Dispatch Parameters
          </h4>

          <form onSubmit={handleSubmitDeposit} className="space-y-4">
            
            {/* SEARCH CUSTOMERS FIELD & ACCOUNT HOVER */}
            <div className="relative">
              <label className="text-[10px] uppercase font-black tracking-wider text-purple-950/50 block mb-1">
                Search Authorized Customer Account
              </label>
              <div className="relative">
                <Search className="w-4 h-4 text-purple-950/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input 
                  type="text"
                  placeholder="Type Customer Name, Company or Account Code to inspect..."
                  value={localSearch}
                  onChange={(e) => {
                    setLocalSearch(e.target.value);
                    setValidationError(null);
                  }}
                  className="w-full pl-10 pr-4 py-2.5 bg-purple-950/5 hover:bg-purple-950/10 focus:bg-white text-xs font-bold text-purple-950 placeholder-purple-950/30 rounded-2xl border border-purple-950/10 focus:outline-none focus:ring-1 focus:ring-purple-700 transition-all shadow-inner"
                />
              </div>

              {localSearch && (
                <div className="absolute left-0 right-0 mt-1 bg-white/98 border border-purple-950/10 rounded-2xl shadow-2xl backdrop-blur-xl max-h-48 overflow-y-auto z-[200] divide-y divide-purple-950/5">
                  {searchedCustomers.length === 0 ? (
                    <div className="p-3 text-center text-xs text-purple-950/50 font-medium">
                      No matching registered customer found.
                    </div>
                  ) : (
                    searchedCustomers.map((cust) => (
                      <button
                        key={cust.id}
                        type="button"
                        onClick={() => handleSelectCustomer(cust)}
                        className="w-full text-left p-3 hover:bg-purple-500/5 transition-colors flex items-center justify-between group"
                      >
                        <div className="flex items-center gap-2.5">
                          <img 
                            src={cust.avatar} 
                            alt={cust.name} 
                            className="w-7 h-7 rounded-full object-cover border border-purple-950/15" 
                            referrerPolicy="no-referrer"
                          />
                          <div>
                            <div className="text-xs font-black text-purple-950 group-hover:text-purple-800 transition-colors">
                              {cust.name}
                            </div>
                            <div className="text-[9px] font-bold text-purple-950/45 uppercase">
                              {cust.company}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <code className="text-[10px] font-mono font-black text-purple-900 block bg-purple-950/5 px-2 py-0.5 rounded-lg">
                            {cust.accountNumber}
                          </code>
                        </div>
                      </button>
                    ))
                  )}
                </div>
              )}
            </div>

            {/* TWOD-COLUMN SPLIT INFORMATION FIELDS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* CUSTOMER NAME - AUTO POPULATED & EDITABLE */}
              <div>
                <label className="text-[10px] uppercase font-black tracking-wider text-purple-950/50 block mb-1">
                  Customer Name
                </label>
                <div className="relative">
                  <User className="w-3.5 h-3.5 text-purple-950/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    placeholder="E.g. Andrew Forbist"
                    value={customerName}
                    onChange={(e) => {
                      setCustomerName(e.target.value);
                      setValidationError(null);
                    }}
                    className="w-full pl-9 pr-4 py-2 bg-purple-950/5 focus:bg-white text-xs font-bold text-purple-950 placeholder-purple-950/30 rounded-2xl border border-purple-950/10 focus:outline-none focus:ring-1 focus:ring-purple-700 transition-all"
                  />
                </div>
              </div>

              {/* ACCOUNT NUMBER */}
              <div>
                <label className="text-[10px] uppercase font-black tracking-wider text-purple-950/50 block mb-1">
                  Account Number
                </label>
                <div className="relative">
                  <CreditCard className="w-3.5 h-3.5 text-purple-950/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    placeholder="E.g. 9941129-C-490"
                    value={accountNumber}
                    onChange={(e) => {
                      setAccountNumber(e.target.value);
                      setValidationError(null);
                    }}
                    className="w-full pl-9 pr-4 py-2 bg-purple-950/5 focus:bg-white text-xs font-bold font-mono text-purple-950 placeholder-purple-950/30 rounded-2xl border border-purple-950/10 focus:outline-none focus:ring-1 focus:ring-purple-700 transition-all"
                  />
                </div>
              </div>

            </div>

            {/* THREE COLUMN GRID FIELDS: AMOUNT, PAYMENT METHOD, REFERENCE ID */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              
              {/* DEPOSIT AMOUNT */}
              <div>
                <label className="text-[10px] uppercase font-black tracking-wider text-purple-950/50 block mb-1">
                  Deposit Amount (USD)
                </label>
                <div className="relative">
                  <DollarSign className="w-3.5 h-3.5 text-purple-950/50 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="number"
                    required
                    step="0.01"
                    min="1"
                    placeholder="0.00"
                    value={depositAmount}
                    onChange={(e) => {
                      setDepositAmount(e.target.value);
                      setValidationError(null);
                    }}
                    className="w-full pl-7 pr-3 py-2 bg-purple-950/5 focus:bg-white text-xs font-bold text-purple-950 placeholder-purple-950/30 rounded-2xl border border-purple-950/10 focus:outline-none focus:ring-1 focus:ring-purple-700 transition-all font-mono"
                  />
                </div>
              </div>

              {/* PAYMENT METHOD SELECT */}
              <div>
                <label className="text-[10px] uppercase font-black tracking-wider text-purple-950/50 block mb-1">
                  Clearance Pipeline Mode
                </label>
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value as any)}
                  className="w-full px-3 py-2 bg-purple-950/5 hover:bg-purple-950/10 focus:bg-white text-xs font-bold text-purple-950 rounded-2xl border border-purple-950/10 focus:outline-none focus:ring-1 focus:ring-purple-700 transition-all appearance-none cursor-pointer"
                >
                  <option value="UPI">UPI (Instant Unified Pay)</option>
                  <option value="NEFT">NEFT Settlement Chain</option>
                  <option value="RTGS">RTGS Real-Time Clearance</option>
                  <option value="IMPS">IMPS High Priority Pipe</option>
                  <option value="Internet Banking">Internet Banking Portal</option>
                </select>
              </div>

              {/* TRANSACTION REFERENCE ID */}
              <div>
                <div className="flex justify-between mb-1">
                  <label className="text-[10px] uppercase font-black tracking-wider text-purple-950/50 block">
                    Reference ID
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      setReferenceId(generateRefId(paymentMethod));
                      setValidationError(null);
                    }}
                    className="text-[9px] font-black uppercase text-purple-900 flex items-center gap-0.5 hover:text-purple-700"
                    title="Regenerate unique reference footprint"
                  >
                    <RefreshCw className="w-2.5 h-2.5" />
                    Regen
                  </button>
                </div>
                <input
                  type="text"
                  required
                  value={referenceId}
                  onChange={(e) => setReferenceId(e.target.value)}
                  className="w-full px-3 py-2 bg-purple-950/5 focus:bg-white text-xs font-black font-mono text-purple-950 rounded-2xl border border-purple-950/10 focus:outline-none focus:ring-1 focus:ring-purple-700 transition-all"
                />
              </div>

            </div>

            {/* DATE & REMARKS SPLIT */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              
              {/* CLEARANCE TIMESTAMP */}
              <div className="md:col-span-1">
                <label className="text-[10px] uppercase font-black tracking-wider text-purple-950/50 block mb-1">
                  Clearance Pipeline Date & Time
                </label>
                <div className="relative">
                  <Calendar className="w-3.5 h-3.5 text-purple-950/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="datetime-local"
                    required
                    value={dateTime}
                    onChange={(e) => setDateTime(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-purple-950/5 focus:bg-white text-xs font-bold text-purple-950 rounded-2xl border border-purple-950/10 focus:outline-none focus:ring-1 focus:ring-purple-700 transition-all font-mono"
                  />
                </div>
              </div>

              {/* REMARKS */}
              <div className="md:col-span-2">
                <label className="text-[10px] uppercase font-black tracking-wider text-purple-950/50 block mb-1">
                  Administrative remarks (Optional)
                </label>
                <div className="relative">
                  <FileText className="w-3.5 h-3.5 text-purple-950/40 absolute left-3.5 top-3" />
                  <textarea
                    rows={1}
                    placeholder="Enter deposit context details, corporate invoice markers or references..."
                    value={remarks}
                    onChange={(e) => setRemarks(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 bg-purple-950/5 focus:bg-white text-xs font-bold text-purple-950 placeholder-purple-950/30 rounded-2xl border border-purple-950/10 focus:outline-none focus:ring-1 focus:ring-purple-700 transition-all resize-none"
                  />
                </div>
              </div>

            </div>

            {/* ERROR NOTIFICATIONS BAR */}
            <AnimatePresence>
              {validationError && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-rose-50 border border-rose-200 text-rose-800 p-3 rounded-2xl flex items-start gap-2 text-xs"
                >
                  <AlertCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-extrabold block">Validation Fault Checked</span>
                    <span className="font-medium text-rose-700">{validationError}</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* BOTTOM BUTTON ROW */}
            <div className="flex items-center justify-between pt-3 border-t border-purple-950/5">
              
              {/* Reset form button */}
              <button
                type="button"
                onClick={handleResetForm}
                className="flex items-center gap-1.5 px-3 py-2 bg-purple-950/5 border border-purple-950/10 rounded-xl text-xs font-extrabold text-purple-950 hover:bg-purple-950/10 transition-colors uppercase"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Reset Fields
              </button>

              {/* Interactive Clearing submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-purple-800 to-purple-600 hover:from-purple-900 hover:to-purple-700 text-white text-xs font-black uppercase rounded-xl shadow-lg hover:shadow-xl hover:scale-102 transition-all cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    Clearing Deposit...
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    Publish Online Deposit
                  </>
                )}
              </button>

            </div>

          </form>

          {/* D. CLEARING PROGRESS SUBMIT LOADER MODAL OVERLAY */}
          <AnimatePresence>
            {isSubmitting && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-[#fcedf2]/90 backdrop-blur-md rounded-3xl flex flex-col items-center justify-center p-6 text-center select-none z-[100]"
              >
                <div className="relative mb-4">
                  <div className="w-14 h-14 rounded-full border-4 border-purple-100 border-t-purple-800 animate-spin" />
                  <div className="absolute inset-3 bg-purple-50 rounded-full flex items-center justify-center text-purple-800 font-bold font-mono text-[9px]">
                    Vault
                  </div>
                </div>
                <h4 className="font-display font-black text-purple-950 text-sm uppercase">Securing Clearing Ledger Pipeline</h4>
                <p className="text-[11px] text-purple-950/50 font-medium max-w-xs mt-1">
                  Broadcasting transactions parameters onto central mainframe network. Synchronizing customer balances and cryptographic reference hashes...
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* E. COMPLETED SUCCESS TICKET OVERLAY */}
          <AnimatePresence>
            {successInfo && (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="absolute inset-0 bg-white/98 backdrop-blur-2xl rounded-3xl flex flex-col items-center justify-center p-6 z-[101]"
              >
                <div className="w-12 h-12 rounded-full bg-emerald-100 border-2 border-emerald-400 text-emerald-600 flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                
                <h4 className="font-display font-black text-purple-950 text-base uppercase">Deposit Ticket Published</h4>
                <p className="text-xs text-purple-950/50 font-bold uppercase tracking-wide">
                  Central clearing successful
                </p>

                {/* Clearing summary voucher board */}
                <div className="w-full max-w-sm bg-purple-950/5 border border-purple-950/5 p-4 rounded-2xl text-xs space-y-2.5 my-4">
                  <div className="flex justify-between items-center text-purple-950/50 font-semibold">
                    <span>Target Customer Name:</span>
                    <span className="text-purple-950 font-black">{successInfo.customerName}</span>
                  </div>
                  <div className="flex justify-between items-center text-purple-950/50 font-semibold">
                    <span>Credit Value Received:</span>
                    <span className="text-purple-900 font-black font-mono text-sm">${successInfo.amount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center text-purple-950/50 font-semibold">
                    <span>Clearance Mode:</span>
                    <span className="text-purple-950 font-black uppercase text-[10px] bg-white border px-1.5 py-0.25 rounded">
                      {successInfo.method}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-purple-950/50 font-semibold">
                    <span>System Reference Code:</span>
                    <span className="text-purple-950 font-black font-mono text-[10px] uppercase select-all bg-white px-2 py-0.5 rounded border border-purple-950/5">
                      {successInfo.refId}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-purple-950/50 font-semibold">
                    <span>Posting Sourced:</span>
                    <span className="text-purple-950 font-black font-mono text-[10px]">{successInfo.time}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={handleResetForm}
                    className="px-5 py-2.5 bg-purple-950 hover:bg-purple-900 text-white rounded-xl text-xs font-black uppercase shadow-lg transition-transform cursor-pointer"
                  >
                    Initiate Another Clearance
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>

        {/* 3. SIDEBAR QUICK SELECT & METADATA GUIDELINES CARD */}
        <div className="space-y-6 lg:col-span-1">
          
          {/* QUICK CHOOSE ACCOUNT PANEL */}
          <div className="rounded-3xl bg-white/20 border border-white/40 p-5 backdrop-blur-xl shadow-lg">
            <h5 className="font-display font-black text-xs text-purple-950 uppercase tracking-widest mb-3 flex items-center gap-1.5 label-card-header">
              <Sparkles className="w-3.5 h-3.5 text-pink-500" />
              Quick Creditor Select
            </h5>
            <p className="text-[10px] font-semibold text-purple-950/45 uppercase tracking-normal mb-4">
              Click any customer card below to instantly inject credentials into the deposit clearance dispatch module:
            </p>

            <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
              {customers.map((cust) => {
                const isSelected = selectedCustomerId === cust.id;
                return (
                  <button
                    key={cust.id}
                    onClick={() => handleSelectCustomer(cust)}
                    className={`w-full text-left p-2.5 rounded-2xl flex items-center justify-between border cursor-pointer group transition-all duration-300 ${
                      isSelected
                        ? 'bg-purple-950 text-white border-purple-900/40 shadow-md'
                        : 'bg-white/25 border-white/40 hover:bg-white/50 text-purple-950'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <img 
                        src={cust.avatar} 
                        alt={cust.name} 
                        className="w-6.5 h-6.5 rounded-full object-cover border border-purple-950/15" 
                        referrerPolicy="no-referrer"
                      />
                      <div className="truncate max-w-[110px]">
                        <span className={`text-[11px] font-black block leading-tight ${isSelected ? 'text-white' : 'text-purple-950'}`}>
                          {cust.name}
                        </span>
                        <span className={`text-[8.5px] font-bold block opacity-60 uppercase ${isSelected ? 'text-purple-200' : 'text-purple-950'}`}>
                          {cust.company}
                        </span>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <span className={`text-[10px] font-bold font-mono block ${isSelected ? 'text-pink-300' : 'text-purple-900'}`}>
                        ${cust.availableBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* INTEGRATION RULES INFORMATION GUIDE */}
          <div className="rounded-3xl bg-purple-950/10 border border-purple-950/5 p-4 text-xs text-purple-950 space-y-3 shadow-inner">
            <h5 className="font-display font-black text-xs uppercase text-purple-950 flex items-center gap-1.5 leading-tight">
              <Lock className="w-3.5 h-3.5 text-purple-800" />
              Clearing Security Checklist
            </h5>
            
            <ul className="space-y-2 text-[11px] leading-relaxed text-purple-950/65 font-medium list-none p-0">
              <li className="flex gap-1.5 items-start">
                <ChevronRight className="w-3.5 h-3.5 text-pink-500 shrink-0 mt-0.5" />
                <span>
                  <strong>Authorized Routing:</strong> Every Online Deposit increments customer checking ledger accounts and deposits parameters instantaneously on submission.
                </span>
              </li>
              <li className="flex gap-1.5 items-start">
                <ChevronRight className="w-3.5 h-3.5 text-pink-500 shrink-0 mt-0.5" />
                <span>
                  <strong>Federal Auditing:</strong> The auto-generated reference signature is indexed onto the main activity history ticker log spanning the dashboard bottom.
                </span>
              </li>
              <li className="flex gap-1.5 items-start">
                <ChevronRight className="w-3.5 h-3.5 text-pink-500 shrink-0 mt-0.5" />
                <span>
                  <strong>High Integrity:</strong> Real-time bar graph calculations will automatically stretch June income percentages proportionally to capture your credit.
                </span>
              </li>
            </ul>
          </div>

        </div>

      </div>

    </div>
  );
}
