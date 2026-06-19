import React, { useState, useRef } from 'react';
import { 
  Building, DollarSign, ArrowUpRight, Check, Calendar, 
  HelpCircle, Lock, TrendingUp, Landmark, Sparkles, X,
  ArrowLeft, UploadCloud, FileCheck, ShieldCheck, Mail, Phone, ShieldAlert, FileText, ChevronRight
} from 'lucide-react';

interface LoanProduct {
  id: string;
  type: string;
  rate: string;
  description: string;
  features: string[];
}

interface CustomerLoansProps {
  userBalance: number;
  onNewTransaction: (tx: any) => void;
  addSecurityLog: (text: string) => void;
}

export default function CustomerLoans({ userBalance, onNewTransaction, addSecurityLog }: CustomerLoansProps) {
  const [activeLoans, setActiveLoans] = useState<any[]>([
    { id: 'LN-9801', type: 'Education Loan', principal: 450000, rate: '7.5%', termMonths: 60, status: 'Active', nextDueDate: '2026-07-05', paymentsCleared: 18 },
    { id: 'LN-3151', type: 'Car Loan', principal: 1200000, rate: '9.0%', termMonths: 48, status: 'Active', nextDueDate: '2026-06-28', paymentsCleared: 12 }
  ]);
  
  const [selectedActiveLoanId, setSelectedActiveLoanId] = useState<string>('LN-9801');
  const [selectedLoan, setSelectedLoan] = useState<LoanProduct | null>(null);

  // Wizard application states:
  // 1 = Loan details selection
  // 2 = Document upload & KYC compliance
  // 3 = Secure dual multi-factor OTP verification
  // 4 = Secure ledger encryption and disbursal simulation
  const [wizardStep, setWizardStep] = useState<number>(1);
  const [applyAmount, setApplyAmount] = useState('500000');
  const [applyMonths, setApplyMonths] = useState('36');
  const [applyIncome, setApplyIncome] = useState('85000');
  const [applicantFullName, setApplicantFullName] = useState('Andrew Forbist');
  const [applicantEmail, setApplicantEmail] = useState('');
  const [applicantPhone, setApplicantPhone] = useState('');
  
  // KYC inputs
  const [incomeDocType, setIncomeDocType] = useState('3-Month Salary Paystubs');
  const [incomeDocRef, setIncomeDocRef] = useState('');
  const [uploadedDocName, setUploadedDocName] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [agreedToPledge, setAgreedToPledge] = useState(false);
  
  // MFA simulation state
  const [simulatedOtp, setSimulatedOtp] = useState('');
  const [userInputOtp, setUserInputOtp] = useState('');
  const [sendingOtp, setSendingOtp] = useState(false);
  const [otpDispatched, setOtpDispatched] = useState(false);
  const [wizardError, setWizardError] = useState('');
  
  // Progress state
  const [transfersProgressPercent, setTransfersProgressPercent] = useState(0);
  const [currentProgressStateText, setCurrentProgressStateText] = useState('');

  const fileInputRef = useRef<HTMLInputElement>(null);

  const LOAN_PRODUCTS: LoanProduct[] = [
    {
      id: 'loan-home',
      type: 'Home Loan',
      rate: '8.2% p.a.',
      description: 'Turn your dream house into reality with high liquidity and lowest EMIs.',
      features: ['Funding up to 90%', 'Tenure up to 30 years', 'Zero prepayment charges', 'Special rates for women applicants']
    },
    {
      id: 'loan-personal',
      type: 'Personal Loan',
      rate: '10.5% p.a.',
      description: 'Instant credit approval with zero collateral requirements for emergency needs.',
      features: ['Disbursal in 3 hours', 'Minimal paperwork', 'Flexible repayment structures', 'Tenure up to 5 years']
    },
    {
      id: 'loan-education',
      type: 'Education Loan',
      rate: '7.5% p.a.',
      description: 'Invest securely in premium academic opportunities in India and abroad.',
      features: ['Covers 100% college fees', 'Grace duration of 1 year', 'No collateral up to ₹7.5 Lakhs', 'Tax savings section 80E']
    },
    {
      id: 'loan-car',
      type: 'Car Loan',
      rate: '9.0% p.a.',
      description: 'Drive away your favorite vehicle with easy funding options.',
      features: ['Up to 100% on-road funding', 'Same-day approvals', 'Low documentation required', 'Term up to 7 years']
    },
    {
      id: 'loan-gold',
      type: 'Gold Loan',
      rate: '6.8% p.a.',
      description: 'Unlock the high value of your physical gold assets with fast-track processing.',
      features: ['Instant cash disbursal', 'Lowest key interest', 'Safe physical vault storage', 'Flexible interest pay options']
    },
    {
      id: 'loan-business',
      type: 'Business Loan',
      rate: '11.2% p.a.',
      description: 'Accelerate your commercial growth, purchase inventory or expand facilities.',
      features: ['Collateral-free up to ₹50 Lakhs', 'Instant credit limits', 'Flexible custom tenures', 'Corporate benefits']
    }
  ];

  const computeEMI = (principal: number, rateStr: string, months: number) => {
    const rate = parseFloat(rateStr) / 100 / 12;
    if (rate === 0) return (principal / months).toFixed(2);
    const emi = (principal * rate * Math.pow(1 + rate, months)) / (Math.pow(1 + rate, months) - 1);
    return isNaN(emi) ? '0' : emi.toFixed(0);
  };

  const handlePayEMI = (loanId: string) => {
    const loan = activeLoans.find(l => l.id === loanId);
    if (!loan) return;

    const emiAmount = parseInt(computeEMI(loan.principal, loan.rate, loan.termMonths));
    
    onNewTransaction({
      merchant: `EMI Repayment: Apex Credit (${loan.id})`,
      amount: emiAmount,
      category: 'Loans',
      tag: '#loan-repayment',
      status: 'completed',
      type: 'expense',
      notes: `Successful monthly auto-pay installment clearance of ${loan.type}`
    });

    setActiveLoans(prev => prev.map(l => {
      if (l.id === loanId) {
        const nextCleared = l.paymentsCleared + 1;
        const nextDate = new Date(l.nextDueDate || Date.now());
        nextDate.setMonth(nextDate.getMonth() + 1);
        return {
          ...l,
          paymentsCleared: nextCleared,
          nextDueDate: nextDate.toISOString().split('T')[0]
        };
      }
      return l;
    }));

    addSecurityLog(`Secure clearance of ₹${emiAmount.toLocaleString()} credited successfully towards ${loan.type} [ID: ${loan.id}]`);
  };

  // Drag and drop controls
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setUploadedDocName(e.dataTransfer.files[0].name);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setUploadedDocName(e.target.files[0].name);
    }
  };

  // Launch simulated disbursal sequence after MFA code is checked
  const triggerVerifyMfaAndDisburse = () => {
    setWizardError('');

    if (userInputOtp !== simulatedOtp) {
      setWizardError('❌ Incorrect multi-channel OTP verifier. Please retry code or re-dispatch payload.');
      return;
    }

    setWizardStep(4);
    
    // Multi-phase encrypted clearance simulator
    const steps = [
      { text: 'Initializing high-security encrypted socket tunnel (AES-256)...', delay: 0, pct: 15 },
      { text: 'Hashing physical compliance credentials with secure ledger indices...', delay: 800, pct: 40 },
      { text: 'Auditing net salary paystubs structure against state direct tax authorities...', delay: 1700, pct: 65 },
      { text: 'Securing multi-party escrow agreement block validation...', delay: 2600, pct: 85 },
      { text: 'Formulating physical credit disbursement vectors and releasing liquidity block...', delay: 3400, pct: 100 }
    ];

    steps.forEach((st) => {
      setTimeout(() => {
        setCurrentProgressStateText(st.text);
        setTransfersProgressPercent(st.pct);

        if (st.pct === 100) {
          setTimeout(() => {
            // Execution of actual loan disbursal!
            const principalVal = Number(applyAmount);
            const newLoan = {
              id: `LN-${Math.floor(1000 + Math.random() * 9000)}`,
              type: selectedLoan!.type,
              principal: principalVal,
              rate: selectedLoan!.rate,
              termMonths: Number(applyMonths),
              status: 'Active',
              nextDueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
              paymentsCleared: 0
            };

            setActiveLoans([newLoan, ...activeLoans]);
            setSelectedActiveLoanId(newLoan.id);
            addSecurityLog(`Disbursed incoming credits: Approved ${selectedLoan!.type} of ₹${principalVal.toLocaleString()} under contract ID ${newLoan.id}`);
            
            // Credited to savings transactions ledger
            onNewTransaction({
              merchant: `Disbursal: Apex Credit (${selectedLoan!.type})`,
              amount: principalVal,
              category: 'Salary',
              tag: '#loan-disbursal',
              status: 'completed',
              type: 'income',
              notes: `${selectedLoan!.type} principal successfully settled from direct compliance clearing ledger of another bank network.`
            });

            // resets
            setSelectedLoan(null);
            setWizardStep(1);
          }, 800);
        }
      }, st.delay);
    });
  };

  const startMfaDispatch = () => {
    setWizardError('');
    const cleanMail = applicantEmail.trim().toLowerCase();
    const cleanPhone = applicantPhone.replace(/\D/g, '');

    if (cleanMail !== 'andrew.forbist@apex.com') {
      setWizardError('❌ KYC Email Verification Error: Email does not match active profile identifier.');
      return;
    }

    if (cleanPhone.length < 10 || !'9876543210'.endsWith(cleanPhone.slice(-10))) {
      setWizardError('❌ KYC Mobile Verification Error: Provided phone number digits are not registered on profile inbox.');
      return;
    }

    setSendingOtp(true);
    setTimeout(() => {
      const code = Math.floor(100000 + Math.random() * 900000).toString();
      setSimulatedOtp(code);
      setSendingOtp(false);
      setOtpDispatched(true);
    }, 1200);
  };

  return (
    <div className="space-y-6">
      
      {/* Dynamic Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-zinc-900 border border-white/5 p-4 rounded-2xl">
          <p className="text-slate-400 text-xs">Active Loans Logged</p>
          <p className="text-2xl font-bold font-display text-gradient-neon mt-1">
            {activeLoans.length} Loans
          </p>
          <p className="text-[10px] text-[#ff5e9c] mt-1 font-mono">
            ✓ Repayment Schedule Active
          </p>
        </div>

        <div className="bg-zinc-900 border border-white/5 p-4 rounded-2xl">
          <p className="text-slate-400 text-xs">Total Outstanding Principal</p>
          <p className="text-2xl font-bold font-mono text-slate-100 mt-1">
            ₹{activeLoans.reduce((acc, curr) => acc + curr.principal, 0).toLocaleString()}
          </p>
          <p className="text-[10px] text-slate-400 mt-1 font-mono">
            Secure clearance tier III
          </p>
        </div>

        <div className="bg-zinc-900 border border-white/5 p-4 rounded-2xl">
          <p className="text-slate-400 text-xs">Calculated Monthly EMIs</p>
          <p className="text-2xl font-bold font-mono text-[#00efd1] mt-1">
            ₹{activeLoans.reduce((acc, curr) => {
              const monthlyEmi = parseInt(computeEMI(curr.principal, curr.rate, curr.termMonths));
              return acc + monthlyEmi;
            }, 0).toLocaleString()}
          </p>
          <p className="text-[10px] text-amber-500 mt-1 font-mono animate-pulse">
            ⚠ Next auto-pay in 17 days
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {/* Interactive Active Loans Explorer */}
        <div id="active-portfolio" className="bg-zinc-950 p-6 rounded-3xl border border-white/5 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h4 className="text-sm font-extrabold uppercase tracking-widest text-[#ff5e9c] font-display flex items-center gap-2">
                <Landmark className="w-4 h-4" />
                Active Loans Portfolio Explorer
              </h4>
              <p className="text-xs text-slate-400 mt-1">
                Click on any active loan to analyze real-time balances, repayment progressions, and clear outstanding maturities.
              </p>
            </div>
            
            <div className="text-right text-[10px] text-slate-500 font-mono">
              Synchronized with Savings Vault Account balance
            </div>
          </div>

          {/* Side by side active loan selectors */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activeLoans.map((loan) => {
              const isSelected = selectedActiveLoanId === loan.id;
              const emi = parseInt(computeEMI(loan.principal, loan.rate, loan.termMonths));
              const progress = Math.min(100, Math.round((loan.paymentsCleared / loan.termMonths) * 100));
              const remainingBalance = Math.max(0, loan.principal * (1 - loan.paymentsCleared / loan.termMonths));

              return (
                <button
                  key={loan.id}
                  type="button"
                  onClick={() => {
                    setSelectedActiveLoanId(loan.id);
                    addSecurityLog(`Inspected active credit certificate details for ${loan.type} [ID: ${loan.id}]`);
                  }}
                  className={`p-5 rounded-2xl cursor-pointer text-left select-none transition-all duration-200 border relative overflow-hidden block w-full ${
                    isSelected
                      ? 'bg-zinc-900/90 border-[#ff5e9c] shadow-[0_0_20px_rgba(255,94,156,0.15)]'
                      : 'bg-zinc-900/30 hover:bg-zinc-900 border-white/5 hover:border-white/15'
                  }`}
                >
                  <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full blur-xl -mr-6 -mt-6 pointer-events-none" />

                  <div className="flex items-start justify-between relative z-10 w-full">
                    <div>
                      <span className="text-[9px] bg-white/5 text-slate-400 font-mono border border-white/5 px-2 py-0.5 rounded-md">
                        Maturity Ref: {loan.id}
                      </span>
                      <h5 className="font-display font-black text-sm text-slate-100 mt-1.5 flex items-center gap-1.5">
                        <Building className={`w-4 h-4 ${isSelected ? 'text-[#ff5e9c]' : 'text-slate-400'}`} />
                        {loan.type}
                      </h5>
                    </div>
                    <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${
                      isSelected ? 'bg-[#ff5e9c]/15 text-[#ff5e9c] border-[#ff5e9c]/30' : 'bg-zinc-800 text-slate-400 border-white/5'
                    }`}>
                      {isSelected ? 'INSPECTING' : 'ACTIVE'}
                    </span>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-4 relative z-10">
                    <div>
                      <p className="text-[10px] text-slate-500 font-medium">Outstanding Balance</p>
                      <p className="text-base font-black font-mono text-slate-200 mt-0.5">
                        ₹{remainingBalance.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                      </p>
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-500 font-medium">Monthly Installment</p>
                      <p className="text-sm font-bold font-mono text-[#00efd1] mt-1">
                        ₹{emi.toLocaleString('en-IN')}
                      </p>
                    </div>
                  </div>

                  {/* Progress meter */}
                  <div className="mt-4 space-y-1.5 relative z-10">
                    <div className="flex justify-between text-[9px] text-slate-400">
                      <span>Maturity Progression</span>
                      <span className="font-bold">{progress}% Repaid</span>
                    </div>
                    <div className="w-full h-1.5 bg-zinc-950 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-[#ff5e9c] to-[#b03bfc] rounded-full transition-all duration-500"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-[8px] text-slate-500 font-mono">
                      <span>{loan.paymentsCleared} cleared</span>
                      <span>{loan.termMonths - loan.paymentsCleared} remaining</span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Loan Details Panel */}
          {(() => {
            const activeLoan = activeLoans.find(l => l.id === selectedActiveLoanId) || activeLoans[0];
            if (!activeLoan) return null;

            const emiVal = parseInt(computeEMI(activeLoan.principal, activeLoan.rate, activeLoan.termMonths));
            const remainingPrincipal = Math.max(0, activeLoan.principal * (1 - activeLoan.paymentsCleared / activeLoan.termMonths));
            const paidSum = activeLoan.paymentsCleared * emiVal;

            return (
              <div className="bg-zinc-900 border border-white/5 rounded-2xl p-5 space-y-5 relative overflow-hidden">
                <div className="absolute bottom-0 right-0 w-32 h-32 bg-[#ff5e9c]/5 rounded-full blur-2xl pointer-events-none" />

                <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/5 pb-4 gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#ff5e9c] to-[#b03bfc] flex items-center justify-center shadow-lg">
                      <Landmark className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h5 className="text-sm font-black text-slate-100 font-display">
                        Apex {activeLoan.type} Amortization File
                      </h5>
                      <p className="text-[10px] text-slate-400 font-mono">
                        Official Contract ID: {activeLoan.id} • Verified under Apex Trust
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 items-center">
                    <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2.5 py-0.5 rounded-md font-mono">
                      ● Status: Active & Compliant
                    </span>
                    <span className="text-[10px] bg-zinc-950 text-slate-300 font-mono border border-white/5 px-2.5 py-0.5 rounded-md">
                      Next Due Date: {activeLoan.nextDueDate}
                    </span>
                  </div>
                </div>

                {/* Metric Matrix */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-1">
                  <div className="bg-zinc-950/60 border border-white/5 p-3 rounded-xl">
                    <span className="text-[9px] text-slate-400 uppercase tracking-wider block font-bold mb-1.5">Original Loan Limit</span>
                    <p className="text-sm font-extrabold text-slate-200 font-mono">₹{activeLoan.principal.toLocaleString()}</p>
                    <p className="text-[8.5px] text-slate-500 mt-1">Disbursed successfully</p>
                  </div>

                  <div className="bg-zinc-950/60 border border-white/5 p-3 rounded-xl">
                    <span className="text-[9px] text-slate-400 uppercase tracking-wider block font-bold mb-1.5">Paid-to-Date Sum</span>
                    <p className="text-sm font-extrabold text-emerald-400 font-mono">₹{paidSum.toLocaleString()}</p>
                    <p className="text-[8.5px] text-slate-500 mt-1">{activeLoan.paymentsCleared} settled cycles</p>
                  </div>

                  <div className="bg-zinc-950/60 border border-white/5 p-3 rounded-xl">
                    <span className="text-[9px] text-slate-400 uppercase tracking-wider block font-bold mb-1.5">Outstanding Principal</span>
                    <p className="text-sm font-extrabold text-[#ff5e9c] font-mono">₹{remainingPrincipal.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</p>
                    <p className="text-[8.5px] text-slate-500 mt-1">{activeLoan.termMonths - activeLoan.paymentsCleared} outstanding cycles</p>
                  </div>

                  <div className="bg-zinc-950/60 border border-white/5 p-3 rounded-xl">
                    <span className="text-[9px] text-slate-400 uppercase tracking-wider block font-bold mb-1.5">Monthly Installment</span>
                    <p className="text-sm font-extrabold text-[#00efd1] font-mono">₹{emiVal.toLocaleString()}</p>
                    <p className="text-[8.5px] text-slate-500 mt-1">Rate: {activeLoan.rate}/yr</p>
                  </div>
                </div>

                {/* Instant Settlement Autopay Container */}
                <div className="bg-zinc-950/70 rounded-xl p-4 border border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <span className="text-[9px] font-bold uppercase text-[#ff5e9c] font-mono tracking-widest block">
                      Secure EMI Pre-settlement Tool
                    </span>
                    <p className="text-xs text-slate-300">
                      Next monthly auto-pay of <strong className="text-gradient-neon font-mono">₹{emiVal.toLocaleString()}</strong> will clear on <strong className="text-white font-mono">{activeLoan.nextDueDate}</strong>. You may make a secure on-demand payment to reduce outstanding balance.
                    </p>
                    <p className="text-[10px] text-slate-500 leading-snug">
                      Debit Account: Unified Apex Wallet (Active Balance: ₹{userBalance.toLocaleString()})
                    </p>
                  </div>

                  <div>
                    <button
                      type="button"
                      onClick={() => handlePayEMI(activeLoan.id)}
                      className="whitespace-nowrap px-4 py-2.5 bg-gradient-to-r from-[#ff5e9c] to-[#b03bfc] hover:from-[#ff458a] hover:to-[#a12eec] text-white text-xs font-bold rounded-xl shadow-lg transition-transform hover:scale-[1.02] cursor-pointer flex items-center gap-1.5"
                    >
                      <Check className="w-3.5 h-3.5" />
                      Settle Installment (₹{emiVal.toLocaleString()})
                    </button>
                  </div>
                </div>

                {/* Amortization schedule table */}
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <p className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 font-mono">
                      Contract Amortization & Ledger Timeline (Last 5 Cycles)
                    </p>
                    <span className="text-[9px] text-slate-500 font-mono bg-zinc-950 px-2 py-0.5 rounded-md border border-white/5">
                      Cleared: {activeLoan.paymentsCleared} / {activeLoan.termMonths} Cycles
                    </span>
                  </div>
                  
                  <div className="border border-white/5 rounded-xl overflow-hidden text-[10px] leading-tight">
                    <table className="w-full text-left font-mono">
                      <thead>
                        <tr className="bg-zinc-950 text-slate-400 font-bold border-b border-white/5">
                          <th className="px-3 py-2.5">Cycle ID</th>
                          <th className="px-3 py-2.5">Scheduled Date</th>
                          <th className="px-3 py-2.5">Classification</th>
                          <th className="px-3 py-2.5 text-right font-bold">EMI Amount</th>
                          <th className="px-3 py-2.5 text-right">Remaining Principal</th>
                          <th className="px-3 py-2.5 text-center">Receipt Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        {Array.from({ length: 5 }).map((_, idx) => {
                          const cycleNum = activeLoan.paymentsCleared - idx;
                          const isCleared = cycleNum > 0;
                          
                          const tempDate = new Date(activeLoan.nextDueDate);
                          tempDate.setMonth(tempDate.getMonth() - idx - 1);
                          const displayDate = tempDate.toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' });

                          // Decremented balance tracking
                          const rBalance = Math.max(0, activeLoan.principal * (1 - Math.max(0, cycleNum) / activeLoan.termMonths));

                          return (
                            <tr key={idx} className={`${isCleared ? 'bg-zinc-900/10 hover:bg-zinc-900/20' : 'bg-zinc-900/30 text-slate-500'}`}>
                              <td className="px-3 py-2 text-slate-300 font-mono">{activeLoan.id}-CY{100 + cycleNum}</td>
                              <td className="px-3 py-2">{displayDate}</td>
                              <td className="px-3 py-2">{isCleared ? 'Regular Installment Clear (P+I)' : 'Upcoming Scheduled Repayment'}</td>
                              <td className="px-3 py-2 text-right font-extrabold text-slate-100">₹{emiVal.toLocaleString()}</td>
                              <td className="px-3 py-2 text-right text-slate-400">₹{rBalance.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</td>
                              <td className="px-3 py-2 text-center">
                                <span className={`px-2 py-0.5 rounded text-[8px] font-bold ${
                                  isCleared ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-amber-500/10 text-amber-500 border border-amber-500/20'
                                }`}>
                                  {isCleared ? '✓ SETTLED' : '⏰ UNPAID'}
                                </span>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      </div>

      {/* Available Credit & Mortgages Products Shelf */}
      <div className="space-y-4">
        <h4 className="text-sm font-bold uppercase tracking-wider text-slate-405 flex items-center gap-2">
          <span>🏦</span>
          <span>Submit New Credit & Mortgage Applications</span>
        </h4>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {LOAN_PRODUCTS.map((prod) => (
            <div 
              key={prod.id} 
              className="bg-zinc-900/60 hover:bg-zinc-900 border border-white/5 hover:border-[#ff5e9c]/30 rounded-2xl p-5 flex flex-col justify-between space-y-4 transition-all group animate-fade-in"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-slate-300 font-display">{prod.type}</span>
                  <span className="text-[10px] px-2.5 py-0.5 bg-[#ff5e9c]/10 text-[#ff5e9c] rounded-md font-bold font-mono">
                    {prod.rate}
                  </span>
                </div>
                <p className="text-xs text-slate-450 leading-relaxed">
                  {prod.description}
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex flex-wrap gap-1">
                  {prod.features.slice(0, 2).map((feat, idx) => (
                    <span key={idx} className="bg-zinc-950 px-2 py-0.5 rounded-md text-[9px] text-[#00efd1] font-mono">
                      ✓ {feat}
                    </span>
                  ))}
                </div>
                
                <button 
                  onClick={() => {
                    setSelectedLoan(prod);
                    setWizardStep(1);
                    setUploadedDocName(null);
                    setAgreedToPledge(false);
                    setOtpDispatched(false);
                    setUserInputOtp('');
                    setWizardError('');
                  }}
                  className="w-full py-2 bg-[#ff5e9c]/15 text-[#ff5e9c] hover:bg-[#ff5e9c] hover:text-white border border-[#ff5e9c]/30 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  Apply Now
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* COMPREHENSIVE LOAN WIZARD DIALOG POP-UP MODAL */}
      {selectedLoan && (
        <div 
          onClick={() => setSelectedLoan(null)}
          className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-hidden animate-fade-in cursor-pointer"
        >
          {/* Main Modal Card */}
          <div 
            onClick={(e) => e.stopPropagation()}
            className="bg-zinc-950 p-6 sm:p-8 rounded-3xl border border-[#ff5e9c]/40 space-y-5 shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto relative transition-all cursor-default"
          >
            <div className="absolute top-0 inset-x-0 h-[2.5px] bg-gradient-to-r from-pink-500 to-purple-500" />
            
            <div className="flex items-center justify-between border-b border-white/5 pb-3">
              <span className="text-sm font-bold text-slate-200 font-display flex items-center gap-1.5 min-w-0 pr-2">
                <Sparkles className="w-4 h-4 text-[#ff5e9c] animate-pulse shrink-0" />
                <span className="truncate">Apply: {selectedLoan.type}</span>
              </span>
              <button 
                onClick={() => setSelectedLoan(null)}
                className="flex items-center gap-1 px-3 py-1 bg-zinc-900 border border-white/10 hover:border-rose-500/30 hover:bg-rose-500/10 text-slate-300 hover:text-rose-400 rounded-xl transition-all cursor-pointer text-[10px] font-extrabold font-mono tracking-wider shrink-0 shadow-sm"
                title="Close Application"
              >
                <X className="w-3.5 h-3.5" />
                <span>CLOSE</span>
              </button>
            </div>

            {/* STEP 1: CONFIGURE AMOUNT & TERM */}
            {wizardStep === 1 && (
              <div className="space-y-4 animate-fade-in text-[11px] leading-relaxed text-slate-300">
                <div className="p-2.5 bg-[#ff5e9c]/10 text-[#ff5e9c] border border-[#ff5e9c]/20 rounded-xl font-semibold flex items-center gap-1.5">
                  <TrendingUp className="w-4 h-4 shrink-0" />
                  <span>Step 1: Interest Rate & Loan Sizing</span>
                </div>
                
                <div className="space-y-1.5">
                  <label className="text-[10px] text-slate-400 font-mono font-bold uppercase tracking-wider block">Desired Principal Amount (₹)</label>
                  <input 
                    type="number" 
                    min="50000" 
                    max="10000000"
                    value={applyAmount}
                    onChange={(e) => setApplyAmount(e.target.value)}
                    className="w-full bg-zinc-900 border border-white/10 rounded-xl px-3 py-1.5 text-slate-100 font-mono text-xs font-bold focus:outline-none focus:border-pink-500/50"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] text-slate-400 font-mono font-bold uppercase tracking-wider block">Verified Net Monthly Salary (₹)</label>
                  <input 
                    type="number" 
                    value={applyIncome}
                    onChange={(e) => setApplyIncome(e.target.value)}
                    className="w-full bg-zinc-900 border border-white/10 rounded-xl px-3 py-1.5 text-slate-100 font-mono text-xs font-bold focus:outline-none focus:border-pink-500/50"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] text-slate-400 font-mono font-bold uppercase tracking-wider block">Amortization Tenure Interval</label>
                  <select
                    value={applyMonths}
                    onChange={(e) => setApplyMonths(e.target.value)}
                    className="w-full bg-zinc-900 border border-white/10 rounded-xl px-3 py-1.5 text-slate-100 text-xs font-semibold cursor-pointer focus:outline-none"
                  >
                    <option value="12">12 Months (1 Year)</option>
                    <option value="24">24 Months (2 Years)</option>
                    <option value="36">36 Months (3 Years)</option>
                    <option value="60">60 Months (5 Years)</option>
                    <option value="120">120 Months (10 Years)</option>
                  </select>
                </div>

                <div className="bg-zinc-900/60 p-3 rounded-xl border border-white/5 space-y-1 my-2">
                  <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                    <span>Rate Structure:</span>
                    <strong className="text-white font-black">{selectedLoan.rate}</strong>
                  </div>
                  <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                    <span>Calculated EMI Index:</span>
                    <strong className="text-[#00efd1] font-black">
                      ₹{parseInt(computeEMI(Number(applyAmount), selectedLoan.rate, Number(applyMonths))).toLocaleString()} / month
                    </strong>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setWizardError('');
                    const amt = Number(applyAmount);
                    const inc = Number(applyIncome);
                    if (isNaN(amt) || amt < 10000) {
                      setWizardError('❌ Please specify a minimal authorized disbursal limit of ₹10,000.');
                      return;
                    }
                    if (isNaN(inc) || inc < 5000) {
                      setWizardError('❌ Net monthly salary is below minimal credit capability ranges.');
                      return;
                    }
                    setWizardStep(2);
                  }}
                  className="w-full py-2.5 bg-gradient-to-r from-[#ff5e9c] to-[#b03bfc] text-white text-xs font-black uppercase tracking-wider rounded-xl shadow-lg transition-transform hover:scale-[1.01] cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <span>Proceed to KYC & Documents</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedLoan(null)}
                  className="w-full py-2 bg-zinc-900 hover:bg-rose-500/10 text-slate-300 hover:text-rose-400 border border-white/5 hover:border-rose-500/20 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer font-mono uppercase tracking-wider"
                >
                  ✕ Cancel & Close
                </button>
                {wizardError && <p className="text-[10px] font-bold text-rose-500 text-center">{wizardError}</p>}
              </div>
            )}

            {/* STEP 2: DOCUMENTS UPLOAD & KYC */}
            {wizardStep === 2 && (
              <div className="space-y-4 animate-fade-in text-[11px] leading-relaxed text-slate-300">
                <div className="p-2 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-xl font-semibold flex items-center gap-1.5">
                  <FileText className="w-4 h-4 shrink-0" />
                  <span>Step 2: Regulatory Document Uploads</span>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] text-slate-400 font-mono font-bold uppercase tracking-wider block">Supported Income Verification</label>
                  <select
                    value={incomeDocType}
                    onChange={(e) => setIncomeDocType(e.target.value)}
                    className="w-full bg-zinc-900 border border-white/10 rounded-xl px-2.5 py-1.5 text-slate-100 text-xs font-semibold cursor-pointer focus:outline-none"
                  >
                    <option value="3-Month Salary Paystubs">3-Month Official Salary Paystubs (PDF Scan)</option>
                    <option value="Form-16 IT Returns File">Form-16 IT Returns Certificate (Latest Assessment Year)</option>
                    <option value="Provident Fund Retain Record">Provident Fund Account Statement Summary</option>
                    <option value="Enterprise Audited Balance Ledger">Business Audited Balance sheets (Firm/Entity)</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] text-slate-400 font-mono font-bold uppercase tracking-wider block">Document Identification/Unique Key</label>
                  <input 
                    type="text" 
                    placeholder="e.g. IT-PAN / GSTIN / PF Code"
                    value={incomeDocRef}
                    onChange={(e) => setIncomeDocRef(e.target.value.toUpperCase())}
                    className="w-full bg-zinc-900 border border-white/10 rounded-xl px-3 py-1.5 text-slate-100 font-mono text-xs font-semibold uppercase focus:outline-none focus:border-pink-500/50"
                  />
                </div>

                {/* DRAG AND DROP KYC SUBMISSION */}
                <div className="space-y-2">
                  <label className="text-[9px] text-slate-400 uppercase tracking-widest block font-mono font-bold">Income Proof Document Scan</label>
                  <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                    className={`border-2 border-dashed rounded-xl p-4 text-center transition-all cursor-pointer flex flex-col items-center justify-center space-y-1 bg-zinc-950/50 ${
                      isDragOver 
                        ? 'border-[#ff5e9c] bg-[#ff5e9c]/10' 
                        : uploadedDocName 
                          ? 'border-emerald-500/40 bg-emerald-500/5' 
                          : 'border-white/10 hover:border-white/20 hover:bg-white/5'
                    }`}
                  >
                    <input 
                      type="file" 
                      ref={fileInputRef}
                      onChange={handleFileSelect}
                      className="hidden" 
                      accept=".jpg,.jpeg,.png,.pdf"
                    />

                    {uploadedDocName ? (
                      <>
                        <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-full">
                          <FileCheck className="w-5 h-5 animate-pulse" />
                        </div>
                        <p className="text-[10px] font-bold text-emerald-400 truncate max-w-full px-2">✓ {uploadedDocName}</p>
                      </>
                    ) : (
                      <>
                        <UploadCloud className="w-5 h-5 text-slate-400" />
                        <p className="text-[10px] text-slate-300">Drag & Drop scan or <span className="text-[#ff5e9c] underline">Click to select file</span></p>
                        <span className="text-[8px] text-slate-500">PDF, PNG, JPG up to 10MB</span>
                      </>
                    )}
                  </div>
                </div>

                {/* Pledge check */}
                <label className="flex items-start gap-2 text-[10px] text-slate-405 leading-snug cursor-pointer py-1 select-none">
                  <input 
                    type="checkbox"
                    checked={agreedToPledge}
                    onChange={(e) => setAgreedToPledge(e.target.checked)}
                    className="mt-0.5 rounded border-white/10 bg-zinc-950 text-[#ff5e9c] focus:ring-0 cursor-pointer"
                  />
                  <span>I authorize Apex Money to perform soft security rating background inquiries.</span>
                </label>

                {wizardError && <p className="text-[10px] font-bold text-rose-500 text-center">{wizardError}</p>}

                <div className="grid grid-cols-2 gap-2 pt-1 border-t border-white/5">
                  <button
                    type="button"
                    onClick={() => setWizardStep(1)}
                    className="py-2 bg-zinc-900 border border-white/5 hover:bg-zinc-800 text-slate-300 rounded-xl text-xs font-semibold cursor-pointer"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setWizardError('');
                      if (!incomeDocRef.trim()) {
                        setWizardError('❌ Please specify a document registration Key.');
                        return;
                      }
                      if (!uploadedDocName) {
                        setWizardError('❌ Please upload a scan proof of your income.');
                        return;
                      }
                      if (!agreedToPledge) {
                        setWizardError('❌ You must authorize soft security checks.');
                        return;
                      }
                      setWizardStep(3);
                    }}
                    className="py-2 bg-gradient-to-r from-[#ff5e9c] to-[#b03bfc] text-white rounded-xl text-xs font-bold cursor-pointer hover:opacity-90 flex items-center justify-center gap-1"
                  >
                    <span>Continue to Auth</span>
                    <ChevronRight className="w-3" />
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedLoan(null)}
                  className="w-full py-2 bg-zinc-900 hover:bg-rose-500/10 text-slate-300 hover:text-rose-400 border border-white/5 hover:border-rose-500/20 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer font-mono uppercase tracking-wider"
                >
                  ✕ Cancel & Close
                </button>
              </div>
            )}

            {/* STEP 3: DUAL TELEMETRY MULTI-FACTOR AUTHENTICATION */}
            {wizardStep === 3 && (
              <div className="space-y-4 animate-fade-in text-[11px] leading-relaxed text-slate-300">
                <div className="p-2 bg-pink-500/10 text-pink-400 border border-pink-500/20 rounded-xl font-semibold flex items-center gap-1.5">
                  <ShieldAlert className="w-4 h-4 shrink-0 animate-pulse" />
                  <span>Step 3: Twin-Channel Security Gateway</span>
                </div>

                <p className="text-[10px] text-slate-400 leading-normal">
                  Secure credit compliance requires verifying biometric identity via twin contact vectors. Matches registered profile parameters.
                </p>

                <div className="space-y-1.5">
                  <label className="text-[9px] uppercase font-bold text-slate-400 tracking-wider block font-mono">Verify Active Email Portal</label>
                  <div className="relative">
                    <input 
                      type="email"
                      placeholder="andrew.forbist@apex.com"
                      value={applicantEmail}
                      onChange={(e) => setApplicantEmail(e.target.value)}
                      className="w-full bg-zinc-950 border border-white/10 rounded-xl pl-8 pr-3 py-1.5 text-xs text-slate-200 font-mono focus:outline-none"
                    />
                    <Mail className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-2.5" />
                  </div>
                  <span className="text-[8px] text-slate-500">Registered: andrew.forbist@apex.com</span>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[9px] uppercase font-bold text-slate-400 tracking-wider block font-mono">Verify Active Mobile (10 Digits)</label>
                  <div className="relative">
                    <input 
                      type="tel"
                      maxLength={10}
                      placeholder="e.g. 9876543210"
                      value={applicantPhone}
                      onChange={(e) => setApplicantPhone(e.target.value.replace(/\D/g, ''))}
                      className="w-full bg-zinc-950 border border-white/10 rounded-xl pl-8 pr-3 py-1.5 text-xs text-slate-201 font-mono focus:outline-none"
                    />
                    <Phone className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-2.5" />
                  </div>
                  <span className="text-[8px] text-slate-500 flex justify-between">
                    <span>Registered: +91 ••••• ••210</span>
                    <span>10 Digits</span>
                  </span>
                </div>

                {!otpDispatched ? (
                  <button
                    type="button"
                    disabled={sendingOtp || !applicantEmail || applicantPhone.length < 10}
                    onClick={startMfaDispatch}
                    className="w-full py-2.5 bg-gradient-to-r from-pink-500 to-[#b03bfc] hover:opacity-90 text-white rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed shadow-lg shadow-pink-500/10 flex items-center justify-center gap-2"
                  >
                    {sendingOtp ? (
                      <>
                        <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Constructing secure tunnel...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-3.5 h-3.5" /> Dispatch Twin OTP Payload
                      </>
                    )}
                  </button>
                ) : (
                  <div className="space-y-3 pt-2.5 border-t border-white/5 animate-fade-in">
                    <div className="bg-emerald-500/10 border border-emerald-500/20 p-2 rounded-xl">
                      <div className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                        <span className="text-[9px] text-emerald-400 font-bold uppercase font-mono">Twin OTP Payload Routes Verified</span>
                      </div>
                      <div className="mt-1.5 p-1 bg-zinc-950 border border-emerald-500/30 rounded-lg flex items-center justify-between">
                        <span className="text-[9px] text-emerald-400 font-mono ml-1 font-bold">Simulated OTP:</span>
                        <span className="font-mono text-[11px] font-black text-white bg-emerald-500 px-1.5 py-0.5 rounded tracking-widest">{simulatedOtp}</span>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[9px] text-slate-400 font-mono uppercase font-bold tracking-wider block">Input Verified 6-Digit PIN</label>
                      <input 
                        type="text"
                        maxLength={6}
                        placeholder="••••••"
                        value={userInputOtp}
                        onChange={(e) => setUserInputOtp(e.target.value.replace(/\D/g, ''))}
                        className="w-full bg-zinc-950 border border-pink-500/30 rounded-xl px-2.5 py-2 text-center text-base font-black tracking-widest text-[#ff5e9c] focus:outline-none focus:border-pink-500 font-mono"
                      />
                    </div>

                    <button
                      type="button"
                      onClick={triggerVerifyMfaAndDisburse}
                      className="w-full py-2.5 bg-emerald-500 hover:bg-emerald-600 border border-emerald-600/30 text-white rounded-xl text-xs font-black uppercase tracking-wider cursor-pointer shadow-lg mt-1 flex items-center justify-center gap-1.5"
                    >
                      <Check className="w-4 h-4" /> Approve & Disburse
                    </button>
                  </div>
                )}

                {wizardError && <p className="text-[10px] font-bold text-rose-500 text-center">{wizardError}</p>}

                <div className="flex flex-col gap-2 pt-2 border-t border-white/5">
                  {!otpDispatched && (
                    <button
                      type="button"
                      onClick={() => setWizardStep(2)}
                      className="w-full py-1 text-[10px] hover:text-white text-slate-400 transition-colors uppercase tracking-wider font-mono font-bold text-center underline cursor-pointer"
                    >
                      Modify KYC Documentation
                    </button>
                  )}
                  
                  <button
                    type="button"
                    onClick={() => setSelectedLoan(null)}
                    className="w-full py-2 bg-zinc-900 hover:bg-rose-500/10 text-slate-300 hover:text-rose-400 border border-white/5 hover:border-rose-500/20 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer font-mono uppercase tracking-wider"
                  >
                    ✕ Cancel & Close
                  </button>
                </div>
              </div>
            )}

            {/* STEP 4: INTERACTIVE PROGRESS TRACKER */}
            {wizardStep === 4 && (
              <div className="py-6 flex flex-col items-center justify-center text-center space-y-4 animate-fade-in text-slate-300">
                <div className="relative">
                  <div className="absolute inset-0 border-4 border-[#ff5e9c]/20 rounded-full animate-ping" />
                  <div className="w-12 h-12 bg-[#ff5e9c]/10 text-[#ff5e9c] rounded-full flex items-center justify-center border border-[#ff5e9c]/30">
                    <Lock className="w-5 h-5 animate-pulse" />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <h5 className="text-[11px] font-black text-slate-100 uppercase tracking-widest font-mono">
                    Apex Ledger Clears
                  </h5>
                  <p className="text-[10px] text-slate-400 font-mono animate-pulse max-w-xs mx-auto">
                    {currentProgressStateText || 'Analyzing credit compliance indexes...'}
                  </p>
                </div>

                <div className="w-full space-y-1">
                  <div className="flex justify-between text-[9px] text-slate-500 font-mono">
                    <span>LEDGER SIGN-OFF</span>
                    <span>{transfersProgressPercent}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-zinc-900 rounded-full overflow-hidden border border-white/5">
                    <div 
                      className="h-full bg-gradient-to-r from-pink-500 via-[#b03bfc] to-[#00efd1] rounded-full transition-all duration-300"
                      style={{ width: `${transfersProgressPercent}%` }}
                    />
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      )}
    </div>
  );
}
