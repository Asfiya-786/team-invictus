import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Sidebar, { ActiveTab } from './components/Sidebar';
import Header from './components/Header';
import DashboardOverview from './components/DashboardOverview';
import CustomerManagement from './components/CustomerManagement';
import EmployeeManagement from './components/EmployeeManagement';
import BranchManagement from './components/BranchManagement';
import AccountManagement from './components/AccountManagement';
import LoanManagement from './components/LoanManagement';
import CreditCards from './components/CreditCards';
import TransactionMonitoring from './components/TransactionMonitoring';
import KYCVerification from './components/KYCVerification';
import FraudDetection from './components/FraudDetection';
import InvestmentWealth from './components/InvestmentWealth';
import FixedDeposits from './components/FixedDeposits';
import AuditLogs from './components/AuditLogs';
import Settings from './components/Settings';
import SupportSystem from './components/SupportSystem';
import Reports from './components/Reports';
import AIFeatures from './components/AIFeatures';
import MyProfile from './components/MyProfile';
import ApexBankAIAssistant from './components/ApexBankAIAssistant';
import SplashScreen from './components/SplashScreen';
import Inbox, { InboxMessage } from './components/Inbox';
import { BackgroundClouds } from './components/BackgroundClouds';

import { 
  INITIAL_CUSTOMERS, 
  INITIAL_EMPLOYEES, 
  INITIAL_BRANCHES, 
  INITIAL_TRANSACTIONS, 
  INITIAL_LOANS, 
  INITIAL_CARDS, 
  INITIAL_FD, 
  INITIAL_AUDIT, 
  INITIAL_TICKETS, 
  INITIAL_TASKS 
} from './data/mockData';

export default function App() {
  const [isLoaded, setIsLoaded] = useState(true);
  const [activeTab, setActiveTab] = useState<ActiveTab>('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedCustomerId, setSelectedCustomerId] = useState<string | null>(INITIAL_CUSTOMERS[0]?.id || null);

  // Unified reactive mock databases! This is excellent because state changes correctly flow everywhere!
  const [customers, setCustomers] = useState(INITIAL_CUSTOMERS);
  const [employees, setEmployees] = useState(INITIAL_EMPLOYEES);
  const [branches, setBranches] = useState(INITIAL_BRANCHES);
  const [transactions, setTransactions] = useState(INITIAL_TRANSACTIONS);
  const [loans, setLoans] = useState(INITIAL_LOANS);
  const [cards, setCards] = useState(INITIAL_CARDS);
  const [fixedDeposits, setFixedDeposits] = useState(INITIAL_FD);
  const [logs, setLogs] = useState(INITIAL_AUDIT);
  const [tickets, setTickets] = useState(INITIAL_TICKETS);
  const [tasks, setTasks] = useState(INITIAL_TASKS);

  const [inboxMessages, setInboxMessages] = useState<InboxMessage[]>([
    {
      id: "MSG-4201",
      senderName: "Admin – Hyderabad Main Branch",
      employeeId: "ADM-942",
      branchName: "Hyderabad Main Branch",
      timestamp: "2026-06-17 09:30 AM",
      subject: "Leave Application Request",
      content: "I would like to apply for 3 days of Casual Leave from 25 June 2026 to 27 June 2026 due to personal reasons.",
      type: "Leave Request",
      leaveType: "Casual Leave",
      leaveDuration: "3 days (25 June 2026 to 27 June 2026)",
      status: "Pending",
      read: false,
      archived: false,
      replies: []
    },
    {
      id: "MSG-1081",
      senderName: "Yuki Sato",
      employeeId: "EMP-108",
      branchName: "Tokyo Shibuya Digital Node",
      timestamp: "2026-06-16 11:20 AM",
      subject: "Emergency Sick Leave Notification",
      content: "Applying for 2 days of sudden medical Sick Leave due to seasonal influenza diagnosis. Medical ticket barcode submitted.",
      type: "Leave Request",
      leaveType: "Sick Leave",
      leaveDuration: "2 days (18 June 2026 to 19 June 2026)",
      status: "Pending",
      read: false,
      archived: false,
      replies: []
    },
    {
      id: "MSG-3051",
      senderName: "Compliance System Bulletin",
      employeeId: "SYSTEM",
      branchName: "Apex Corporate HQ",
      timestamp: "2026-06-15 08:00 AM",
      subject: "RBI Quarterly Audit Declaration Notice",
      content: "All regional branch administrators must complete their KYC auditing ledgers before June 30th. Failure to commit records incurs cryptographic gateway penalties.",
      type: "Announcement",
      read: true,
      archived: false,
      replies: []
    }
  ]);

  // System Live Threat Alerts
  const [notifications, setNotifications] = useState([
    {
      id: "ALERT-01",
      title: "Intrusion Attempt Blocked",
      description: "IP 185.220.101.5 was blacklisted trying to execute injection scripts.",
      time: "10 mins ago",
      type: "critical" as const,
      read: false
    },
    {
      id: "ALERT-02",
      title: "Biometric KYC Flag Raised",
      description: "CUST-104 (Amara Diop) passport validity failed OCR contrast thresholds.",
      time: "2 hours ago",
      type: "warning" as const,
      read: false
    },
    {
      id: "ALERT-03",
      title: "SWIFT Bridge Connected",
      description: "Secure routing bridge to Brussels SWIFT clearing nodes successfully completed.",
      time: "4 hours ago",
      type: "info" as const,
      read: true
    }
  ]);

  const addAuditLog = (action: string, severity: 'Info' | 'Warning' | 'Critical') => {
    const nextLog = {
      id: `LOG-${Math.floor(1000 + Math.random() * 9000)}`,
      user: "khanamsayeemakousar@gmail.com",
      action,
      ipAddress: "192.168.1.144",
      timestamp: new Date().toISOString(),
      severity
    };
    setLogs([nextLog, ...logs]);
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
  };

  // Badges calculations
  const pendingKycCount = customers.filter(c => c.kycStatus === 'Pending').length;
  const activeAlertsCount = notifications.filter(n => !n.read).length;
  const openTicketsCount = tickets.filter(t => t.status === 'Open' || t.status === 'In Progress').length;
  const unreadInboxCount = inboxMessages.filter(m => !m.read && !m.archived).length;

  // App starts up instantly, skipping the splash delay.


  return (
    <AnimatePresence mode="wait">
      {!isLoaded ? (
        <SplashScreen key="splash" />
      ) : (
        <motion.div 
          key="dashboard"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          dir="ltr"
          className="flex h-screen overflow-hidden bg-[#fbf5f7] text-[#2e1065] relative font-sans"
        >
          {/* Floating animated pale pink clouds system */}
          <BackgroundClouds />

          {/* Full-screen dreamy luxury background system */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 bg-[#fbf5f7]">
            {/* Soft pink cloud gradients */}
            <div className="absolute top-[10%] left-[-10%] w-[60%] h-[60%] bg-[#f472b6]/15 rounded-full blur-[120px] animate-float-1" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[70%] h-[70%] bg-[#c084fc]/15 rounded-full blur-[150px] animate-float-2" />
            <div className="absolute top-[40%] right-[10%] w-[40%] h-[40%] bg-[#ec4899]/10 rounded-full blur-[100px] animate-float-3" />
            
            {/* Atmospheric glow overlays */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#fbf5f7] via-transparent to-[#fdf8f9] opacity-60" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(192,132,252,0.05),transparent_50%)]" />
          </div>

          {/* Mobile Sidebar Backdrop Shading overlay */}
          <AnimatePresence>
            {isSidebarOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsSidebarOpen(false)}
                className="lg:hidden fixed inset-0 bg-[#3a2072]/45 backdrop-blur-[3px] z-[45]"
              />
            )}
          </AnimatePresence>
          
          {/* Sidebar navigation */}
          <Sidebar 
            activeTab={activeTab} 
            setActiveTab={setActiveTab} 
            pendingKycCount={pendingKycCount}
            activeAlertsCount={activeAlertsCount}
            openTicketsCount={openTicketsCount}
            unreadInboxCount={unreadInboxCount}
            onLogout={() => {
              setIsLoaded(false);
              setActiveTab('overview');
              setTimeout(() => setIsLoaded(true), 1500);
            }}
            addAuditLog={addAuditLog}
            isOpen={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
          />

          {/* Main Panel layout wrapper */}
          <div className="flex-1 flex flex-col min-w-0 font-sans">
            
            {/* Top Header */}
            <Header 
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              notifications={notifications}
              setNotifications={setNotifications}
              markNotificationAsRead={markNotificationAsRead}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              addAuditLog={addAuditLog}
              onSidebarToggle={() => setIsSidebarOpen(!isSidebarOpen)}
              customers={customers}
              selectedCustomerId={selectedCustomerId}
              setSelectedCustomerId={setSelectedCustomerId}
              onLogout={() => {
                setIsLoaded(false);
                setActiveTab('overview');
                setTimeout(() => setIsLoaded(true), 1500);
              }}
            />

            {/* Central dynamically toggling interactive view screen area */}
            <main className="flex-1 overflow-y-auto px-4 md:px-8 py-6 select-text scrollbar-thin scrollbar-thumb-slate-800">
              <AnimatePresence mode="wait">
                <div
                  key={activeTab}
                  className="h-full animate-in fade-in slide-in-from-bottom-4 duration-300"
                >
                  {activeTab === 'overview' && (
                    <DashboardOverview 
                      customers={customers}
                      setCustomers={setCustomers}
                      employees={employees}
                      branches={branches}
                      transactions={transactions}
                      setTransactions={setTransactions}
                      loans={loans}
                      cards={cards}
                      fixedDeposits={fixedDeposits}
                      logs={logs}
                      searchQuery={searchQuery}
                      addAuditLog={addAuditLog}
                    />
                  )}

                  {activeTab === 'customers' && (
                    <CustomerManagement 
                      customers={customers}
                      setCustomers={setCustomers}
                      transactions={transactions}
                      branches={branches}
                      searchQuery={searchQuery}
                      addAuditLog={addAuditLog}
                      selectedCustomerId={selectedCustomerId}
                      setSelectedCustomerId={setSelectedCustomerId}
                    />
                  )}

                  {activeTab === 'employees' && (
                    <EmployeeManagement 
                      employees={employees}
                      setEmployees={setEmployees}
                      branches={branches}
                      addAuditLog={addAuditLog}
                    />
                  )}

                  {activeTab === 'branches' && (
                    <BranchManagement 
                      branches={branches}
                    />
                  )}

                  {activeTab === 'accounts' && (
                    <AccountManagement 
                      customers={customers}
                      setCustomers={setCustomers}
                      employees={employees}
                      branches={branches}
                      addAuditLog={addAuditLog}
                      setActiveTab={setActiveTab}
                    />
                  )}

                  {activeTab === 'loans' && (
                    <LoanManagement 
                      loans={loans}
                      setLoans={setLoans}
                      customers={customers}
                      setCustomers={setCustomers}
                      transactions={transactions}
                      setTransactions={setTransactions}
                      employees={employees}
                      branches={branches}
                      addAuditLog={addAuditLog}
                    />
                  )}

                  {activeTab === 'cards' && (
                    <CreditCards 
                      cards={cards}
                      setCards={setCards}
                      addAuditLog={addAuditLog}
                    />
                  )}

                  {activeTab === 'transactions' && (
                    <TransactionMonitoring 
                      transactions={transactions}
                      setTransactions={setTransactions}
                      searchQuery={searchQuery}
                      customers={customers}
                      employees={employees}
                      branches={branches}
                      addAuditLog={addAuditLog}
                      setActiveTab={setActiveTab}
                    />
                  )}

                  {activeTab === 'kyc' && (
                    <KYCVerification 
                      customers={customers}
                      setCustomers={setCustomers}
                      employees={employees}
                      setEmployees={setEmployees}
                      addAuditLog={addAuditLog}
                    />
                  )}

                  {activeTab === 'fraud' && (
                    <FraudDetection />
                  )}

                  {activeTab === 'wealth' && (
                    <InvestmentWealth />
                  )}

                  {activeTab === 'deposits' && (
                    <FixedDeposits 
                      fixedDeposits={fixedDeposits}
                      setFixedDeposits={setFixedDeposits}
                      customers={customers}
                      employees={employees}
                      branches={branches}
                      addAuditLog={addAuditLog}
                    />
                  )}

                  {activeTab === 'reports' && (
                    <Reports 
                      customers={customers}
                      transactions={transactions}
                      addAuditLog={addAuditLog}
                    />
                  )}

                  {activeTab === 'ai-core' && (
                    <AIFeatures 
                      customers={customers}
                      employees={employees}
                      loans={loans}
                      transactions={transactions}
                      addAuditLog={addAuditLog}
                    />
                  )}

                  {activeTab === 'audit' && (
                    <AuditLogs 
                      logs={logs}
                    />
                  )}

                  {activeTab === 'settings' && (
                    <Settings />
                  )}

                  {activeTab === 'profile' && (
                    <MyProfile />
                  )}

                  {activeTab === 'support' && (
                    <SupportSystem 
                      tickets={tickets}
                      setTickets={setTickets}
                      addAuditLog={addAuditLog}
                    />
                  )}

                  {activeTab === 'inbox' && (
                    <Inbox 
                      messages={inboxMessages}
                      setMessages={setInboxMessages}
                      addAuditLog={addAuditLog}
                      employees={employees}
                      branches={branches}
                    />
                  )}

                </div>
              </AnimatePresence>
            </main>

          </div>
          
          {/* Global Prismatic Apex Banking AI Assistant Co-pilot */}
          <ApexBankAIAssistant 
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            customers={customers}
            employees={employees}
            branches={branches}
            transactions={transactions}
            loans={loans}
            cards={cards}
            fixedDeposits={fixedDeposits}
            logs={logs}
            notifications={notifications}
            addAuditLog={addAuditLog}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
