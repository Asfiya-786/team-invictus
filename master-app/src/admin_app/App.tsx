import './index.css';
import { useState } from 'react';
import { 
  Bell, 
  Search, 
  ChevronDown, 
  Menu, 
  RefreshCw, 
  TrendingUp, 
  HelpCircle, 
  Settings as SettingsIcon,
  X,
  CreditCard,
  CheckCircle2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Components
import Sidebar from './components/Sidebar';
import MainCards from './components/MainCards';
import StatsCards from './components/StatsCards';
import Charts from './components/Charts';
import TransactionsTable from './components/TransactionsTable';
import RecentActivity from './components/RecentActivity';

// New Features/Tabs
import CreditsTab from './components/CreditsTab';
import PaymentsTab from './components/PaymentsTab';
import InboxTab from './components/InboxTab';
import CustomersTab from './components/CustomersTab';
import FraudTab from './components/FraudTab';
import LoansTab from './components/LoansTab';
import EmployeesTab from './components/EmployeesTab';
import RefreshDropdown from './components/RefreshDropdown';
import HelpCenterPanel from './components/HelpCenterPanel';
import AdminProfilePanel from './components/AdminProfilePanel';

// Mock Data
import { 
  INITIAL_TRANSACTIONS, 
  STATS, 
  CASHFLOW_DATA, 
  ACTIVITY_LOGS, 
  SAVING_TARGETS 
} from './data';
import { Transaction } from './types';

export default function App() {
  const [currentTab, setCurrentTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [balance, setBalance] = useState(562000);
  const [loans, setLoans] = useState(43000);
  const [syncedInterestRate, setSyncedInterestRate] = useState(5.5);
  const [transactions, setTransactions] = useState<Transaction[]>(INITIAL_TRANSACTIONS);
  const [savingTargets, setSavingTargets] = useState(SAVING_TARGETS);
  const [searchQuery, setSearchQuery] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Top header panels states
  const [isRefreshOpen, setIsRefreshOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Add transactional action
  const handleAddTransaction = (
    name: string, 
    type: 'Income' | 'Expense', 
    amount: number, 
    recipient: string, 
    status: 'Completed' | 'Pending' | 'Failed' = 'Pending'
  ) => {
    const newTx: Transaction = {
      id: `tx-new-${Date.now()}`,
      name,
      type,
      date: new Date().toISOString().replace('T', ' ').substring(0, 19),
      amount,
      recipient,
      status,
      iconName: type === 'Income' ? 'TrendingUp' : 'ReceiptText'
    };
    
    setTransactions(prev => [newTx, ...prev]);

    // Update targets on simulated action
    if (name.toLowerCase().includes('loan')) {
      updateTargetProgress('Loans', amount);
    } else if (name.toLowerCase().includes('deposit')) {
      updateTargetProgress('Deposits', amount);
    }
  };

  // Callback to create a saving Target
  const handleAddSavingTarget = (name: string, targetValue: number, current: number, color: string) => {
    const nextPct = parseFloat(((current / targetValue) * 100).toFixed(2));
    const targetItem = {
      id: `target-new-${Date.now()}`,
      name,
      current,
      target: targetValue,
      percentage: Math.min(nextPct, 100),
      color
    };
    setSavingTargets(prev => [...prev, targetItem]);
    showToast(`Successfully published saving target "${name}"!`);
  };

  // Simulated target progress helper
  const updateTargetProgress = (targetName: string, amount: number) => {
    setSavingTargets(prev => prev.map(t => {
      if (t.name.toLowerCase() === targetName.toLowerCase()) {
        const nextCurrent = Math.min(t.current + amount, t.target);
        const nextPct = parseFloat(((nextCurrent / t.target) * 100).toFixed(2));
        return {
          ...t,
          current: nextCurrent,
          percentage: nextPct
        };
      }
      return t;
    }));
  };

  // Delete transactional action
  const handleDeleteTransaction = (id: string) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
    showToast("Transaction removed from current list.");
  };

  // Reset to initial mockup parameters state
  const handleResetData = () => {
    setBalance(562000);
    setLoans(43000);
    setTransactions(INITIAL_TRANSACTIONS);
    setSavingTargets(SAVING_TARGETS);
    showToast("Dashboard restored to default Loanes values!");
  };

  return (
    <div className="admin-dashboard">
    <div className="min-h-screen font-sans bg-[#fbf5f7] relative overflow-x-hidden">
      
      {/* 1. BACKGROUND DECORATION - EXACT REPLICATION OF PINK CLOUDS & SOFT BLUR FROM IMAGE 2 */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Render the high resolution generated cloud asset as body backdrop */}
        <img 
          src="/src/admin_app/assets/images/pink_clouds_bg_1781157575488.png" 
          alt="Dreamy Clouds Background"
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-full h-full object-cover select-none scale-105"
        />
        
        {/* Floating gradient circles overlay for double layer frosted glass depth */}
        <div className="absolute top-[10%] left-[20%] w-[450px] h-[450px] rounded-full bg-gradient-to-tr from-pink-300/30 to-purple-400/20 blur-3xl animate-pulse mix-blend-multiply duration-[12000ms]"></div>
        <div className="absolute bottom-[15%] right-[10%] w-[550px] h-[550px] rounded-full bg-gradient-to-tr from-purple-400/35 to-rose-300/35 blur-3xl animate-pulse duration-[15000ms]"></div>
      </div>

      {/* 2. MAIN HUB INTERFACE */}
      <div className="relative z-10 p-4 sm:p-6 lg:p-8 max-w-[1600px] mx-auto min-h-screen flex flex-col justify-between">
        
        {/* Main Content Grid Panel */}
        <div className="flex flex-col lg:flex-row gap-6 grow items-stretch">
          
          {/* A. LEFT SIDEBAR */}
          <Sidebar 
            currentTab={currentTab} 
            onTabChange={setCurrentTab} 
            isOpen={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
          />

          {/* B. MIDDLE & RIGHT PRIMARY CONTAINER */}
          <main className="flex-1 flex flex-col gap-6">
            
            {/* Top Navigation Row - styled exactly as Image 2 */}
            <header className="flex items-center justify-between gap-4 p-4 rounded-3xl bg-white/15 border border-white/40 backdrop-blur-xl shadow-lg relative z-[2000]">
              <div className="flex items-center gap-3">
                {/* Mobile sidebar trigger */}
                <button 
                  onClick={() => setSidebarOpen(true)}
                  className="lg:hidden p-2 rounded-xl bg-purple-950/5 text-purple-950 hover:bg-purple-950/10 transition-colors"
                >
                  <Menu className="w-5 h-5" />
                </button>
                <div>
                  <h2 className="font-display font-extrabold text-xl lg:text-2xl text-purple-950 capitalize leading-tight">
                    {currentTab}
                  </h2>
                  <p className="text-[10px] text-purple-950/40 uppercase tracking-widest font-extrabold">
                    Welcome back, Andrew
                  </p>
                </div>
              </div>

              {/* Action Buttons & Profile Panel */}
              <div className="flex items-center gap-3 lg:gap-5">
                
                {/* Simulated Search bar - top row header */}
                <div className="relative block">
                  <Search className="w-4 h-4 text-purple-950/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input 
                    type="text" 
                    placeholder="Search everything across all sections..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-2 bg-purple-950/10 hover:bg-purple-950/15 focus:bg-white/70 text-xs font-extrabold text-purple-950 placeholder-purple-950/45 rounded-2xl border border-purple-950/15 focus:outline-none focus:ring-1 focus:ring-purple-700 w-40 sm:w-52 md:w-64 transition-all"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-purple-950/40 hover:text-purple-950 transition-colors p-0.5"
                      title="Clear Search"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  )}
                </div>

                {/* Refresh Icon Dropdown Container */}
                <div className="relative z-[5000]">
                  <button 
                    onClick={() => setIsRefreshOpen(!isRefreshOpen)}
                    className={`p-2 rounded-xl transition-colors cursor-pointer flex items-center justify-center ${
                      isRefreshOpen ? 'bg-purple-950 text-white' : 'bg-purple-950/5 text-purple-950/60 hover:text-purple-950 hover:bg-purple-950/10'
                    }`}
                    title="Mainframe Sync Utility"
                  >
                    <RefreshCw className={`w-4 h-4 ${isRefreshOpen ? 'animate-spin' : ''}`} />
                  </button>
                  
                  <RefreshDropdown 
                    isOpen={isRefreshOpen}
                    onClose={() => setIsRefreshOpen(false)}
                    onRefreshSuccess={(msg) => {
                      showToast(msg);
                      setIsRefreshOpen(false);
                    }}
                  />
                </div>

                {/* Help guide tip */}
                <button 
                  onClick={() => setIsHelpOpen(true)}
                  className={`p-2 rounded-xl transition-colors cursor-pointer ${
                    isHelpOpen ? 'bg-purple-950 text-white' : 'bg-purple-950/5 text-purple-950/60 hover:text-purple-950 hover:bg-purple-950/10'
                  }`}
                  title="Apex Support Center"
                >
                  <HelpCircle className="w-4 h-4" />
                </button>

                {/* HelpCenter Drawer Panel */}
                <HelpCenterPanel 
                  isOpen={isHelpOpen}
                  onClose={() => setIsHelpOpen(false)}
                />

                {/* Vertical Divider */}
                <div className="h-6 w-px bg-purple-950/15" />

                {/* Current User Andrew Forbist profile section */}
                <div className="relative z-[8000]">
                  <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="flex items-center gap-2.5 pl-1.5 focus:outline-none focus:ring-0 active:scale-98 transition-transform cursor-pointer text-left focus:ring-transparent border-0 bg-transparent p-0"
                    title="User Administration Panel"
                  >
                    <div className="relative">
                      <img 
                        src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150" 
                        alt="Andrew Forbist"
                        referrerPolicy="no-referrer"
                        className="w-9 h-9 rounded-full object-cover border border-purple-300/50 shadow-sm"
                      />
                      <div className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border border-white"></div>
                    </div>
                    <div className="hidden sm:block text-left leading-tight">
                      <div className="flex items-center gap-1">
                        <h4 className="font-display font-extrabold text-xs text-purple-950">Andrew Forbist</h4>
                        <ChevronDown className={`w-3 h-3 text-purple-950/45 transition-transform duration-200 ${isProfileOpen ? 'rotate-180' : ''}`} />
                      </div>
                      <span className="text-[9px] font-bold text-purple-950/40 block">Senior Administrator</span>
                    </div>
                  </button>

                  <AdminProfilePanel 
                    isOpen={isProfileOpen}
                    onClose={() => setIsProfileOpen(false)}
                    onNotify={(msg) => {
                      showToast(msg);
                    }}
                  />
                </div>

              </div>
            </header>

            {/* Render Dashboard Content */}
            {(() => {
              const dynamicStats = STATS.map(s => {
                if (s.type === 'loans') {
                  return { ...s, value: `$${loans.toLocaleString()}` };
                }
                return s;
              });

              if (currentTab === 'dashboard') {
                return (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 items-start">
                      
                      {/* 1. Left Card, shortcuts, targets, spending (1/3 width on desktop) */}
                      <div className="xl:col-span-1 space-y-6">
                        <MainCards 
                          balance={balance} 
                          onBalanceChange={setBalance}
                          savingTargets={savingTargets}
                          onAddTransaction={handleAddTransaction}
                          onAddSavingTarget={handleAddSavingTarget}
                        />
                      </div>

                      {/* 2. Middle & Right content blocks (2/3 width on desktop) */}
                      <div className="xl:col-span-2 space-y-6">
                        
                        {/* Row of stats cards (Income, Loans, Deposits) */}
                        <StatsCards stats={dynamicStats} />

                        {/* Cashflow Bar Charts & Doughnut Category Breakdown card */}
                        <Charts cashflowData={CASHFLOW_DATA} />

                        {/* Ledger logs (Recent Transactions & activity) */}
                        <TransactionsTable 
                          transactions={transactions} 
                          onDeleteTransaction={handleDeleteTransaction}
                          globalSearchQuery={searchQuery}
                        />

                      </div>

                    </div>
                    {/* Recent Activity Log is now moved outside of main grid for full-width layout */}
                  </div>
                );
              }

              if (currentTab === 'credits') {
                return (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <CreditsTab 
                      balance={balance} 
                      onBalanceChange={setBalance} 
                      onAddTransaction={handleAddTransaction}
                      currentLoans={loans}
                      onLoansChange={setLoans}
                      onSyncInterestRate={setSyncedInterestRate}
                    />
                  </motion.div>
                );
              }

              if (currentTab === 'loans') {
                return (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <LoansTab 
                      balance={balance} 
                      onBalanceChange={setBalance} 
                      onAddTransaction={handleAddTransaction}
                      currentLoans={loans}
                      onLoansChange={setLoans}
                      initialInterestRate={syncedInterestRate}
                      globalSearchQuery={searchQuery}
                    />
                  </motion.div>
                );
              }

              if (currentTab === 'payments') {
                return (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <PaymentsTab 
                      balance={balance} 
                      onBalanceChange={setBalance} 
                      onAddTransaction={handleAddTransaction}
                      searchQuery={searchQuery}
                    />
                  </motion.div>
                );
              }

              if (currentTab === 'inbox') {
                return (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <InboxTab 
                      balance={balance}
                      currentLoans={loans}
                      globalSearchQuery={searchQuery}
                    />
                  </motion.div>
                );
              }

              if (currentTab === 'customers') {
                return (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <CustomersTab 
                      balance={balance}
                      onBalanceChange={setBalance}
                      currentLoans={loans}
                      onLoansChange={setLoans}
                      onAddTransaction={handleAddTransaction}
                      searchQuery={searchQuery}
                    />
                  </motion.div>
                );
              }

              if (currentTab === 'fraud') {
                return (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <FraudTab 
                      balance={balance}
                      onBalanceChange={setBalance}
                      onAddTransaction={handleAddTransaction}
                      searchQuery={searchQuery}
                    />
                  </motion.div>
                );
              }

              if (currentTab === 'employees') {
                return (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <EmployeesTab 
                      searchQuery={searchQuery}
                    />
                  </motion.div>
                );
              }

              return (
                // Display a placeholder view if any unselected tabs are toggled. Keeps implementation clean and keeps focus on dashboard.
                <motion.div 
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex-1 flex flex-col items-center justify-center p-8 rounded-3xl bg-white/20 border border-white/40 backdrop-blur-xl text-center shadow-lg"
                >
                  <div className="w-16 h-16 rounded-2xl bg-purple-500/10 text-purple-800 flex items-center justify-center mb-4 border border-purple-500/20">
                    <CreditCard className="w-8 h-8" />
                  </div>
                  <h3 className="font-display font-extrabold text-lg text-purple-950 capitalize">{currentTab} module workspace</h3>
                  <p className="text-xs text-purple-950/50 max-w-sm mt-1.5 mb-5 font-medium">
                    We have mapped out the interface for this view! All widgets, stats, data parameters and transactions are central in the dashboard space.
                  </p>
                  <button 
                    onClick={() => setCurrentTab('dashboard')}
                    className="px-4 py-2 bg-gradient-to-r from-purple-800 to-purple-600 text-white font-semibold text-xs rounded-xl shadow-lg shadow-purple-950/15"
                  >
                    Return to Dashboard
                  </button>
                </motion.div>
              );
            })()}

          </main>

        </div>

        {/* Recent Activity Log horizontal flow spanning entire bottom width of page */}
        {currentTab === 'dashboard' && (
          <div className="w-full">
            <RecentActivity logs={ACTIVITY_LOGS} />
          </div>
        )}

        {/* Footer info message */}
        <footer className="mt-8 pt-4 border-t border-purple-950/5 flex flex-col sm:flex-row items-center justify-between text-[11px] font-bold text-purple-950/30 gap-3">
          <p>© 2026 LOANES Financial Hub. Built under premium glassmorphism architecture guidelines.</p>
          <div className="flex gap-4">
            <span className="hover:text-purple-950 transition-colors cursor-pointer">Terms of Service</span>
            <span className="hover:text-purple-950 transition-colors cursor-pointer">Security Systems</span>
          </div>
        </footer>

      </div>

      {/* POPUP ALERT BAR */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            className="fixed bottom-6 right-6 px-4 py-3 bg-purple-950 backdrop-blur-xl border border-purple-600/30 text-white rounded-2xl shadow-2xl flex items-center gap-2.5 z-50 text-xs font-bold"
          >
            <CheckCircle2 className="w-4 h-4 text-pink-400 shrink-0" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
    </div>
  );
}
