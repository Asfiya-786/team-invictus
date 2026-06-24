import { Transaction, StatCard, CashflowItem, ActivityLog, SavingTarget } from './types';

export const INITIAL_TRANSACTIONS: Transaction[] = [
  {
    id: 'tx-1',
    name: 'Bill Payment',
    type: 'Expense',
    date: '2029-03-01 04:29:13',
    amount: 295.31,
    recipient: 'Emery Marcus',
    status: 'Failed',
    iconName: 'ReceiptText',
  },
  {
    id: 'tx-2',
    name: 'Credit Fee',
    type: 'Income',
    date: '2029-03-04 04:29:13',
    amount: 204.07,
    recipient: 'Kaya Karter',
    status: 'Completed',
    iconName: 'CreditCard',
  },
  {
    id: 'tx-3',
    name: 'Credit Fee',
    type: 'Income',
    date: '2029-02-27 04:29:13',
    amount: 97.86,
    recipient: 'Martin Ross',
    status: 'Pending',
    iconName: 'CreditCard',
  },
  {
    id: 'tx-4',
    name: 'Emergency Fund',
    type: 'Expense',
    date: '2029-02-07 04:29:13',
    amount: 323.22,
    recipient: 'Jensen Kenter',
    status: 'Pending',
    iconName: 'ShieldCheck',
  },
  {
    id: 'tx-5',
    name: 'Deposits',
    type: 'Income',
    date: '2029-02-13 04:29:13',
    amount: 233.28,
    recipient: 'Talen Bergen',
    status: 'Pending',
    iconName: 'TrendingUp',
  },
];

export const STATS: StatCard[] = [
  {
    id: 'stat-income',
    title: 'Total Income',
    value: '$78,000',
    change: '+15.2%',
    isPositive: true,
    type: 'income',
  },
  {
    id: 'stat-loans',
    title: 'Total Loans',
    value: '$43,000',
    change: '-5.8%',
    isPositive: false,
    type: 'loans',
  },
  {
    id: 'stat-deposits',
    title: 'Total Deposits',
    value: '$56,000',
    change: '+8.4%',
    isPositive: true,
    type: 'deposits',
  },
];

export const CASHFLOW_DATA: CashflowItem[] = [
  { month: 'Jan', income: 4200, expense: 2800 },
  { month: 'Feb', income: 4900, expense: 3200 },
  { month: 'Mar', income: 5200, expense: 2600 },
  { month: 'Apr', income: 4100, expense: 4500 },
  { month: 'May', income: 6300, expense: 3200 },
  { month: 'Jun', income: 6000, expense: 4000 }, // June 2029: Income $6,000, Expense $4,000 on the tooltip!
  { month: 'Jul', income: 5800, expense: 3700 },
  { month: 'Aug', income: 6800, expense: 4200 },
  { month: 'Sep', income: 4500, expense: 3000 },
  { month: 'Oct', income: 5500, expense: 4800 },
  { month: 'Nov', income: 6100, expense: 3500 },
  { month: 'Dec', income: 7200, expense: 4100 },
];

export const ACTIVITY_LOGS: ActivityLog[] = [
  {
    id: 'act-1',
    user: {
      name: 'Jamie Smith',
      avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150',
      initials: 'JS',
    },
    action: 'updated system settings',
    time: '10:05',
    group: 'Today',
  },
  {
    id: 'act-2',
    user: {
      name: 'Alex Johnson',
      avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150',
      initials: 'AJ',
    },
    action: 'logged in',
    time: '13:05',
    group: 'Today',
  },
  {
    id: 'act-3',
    user: {
      name: 'Morgan Lee',
      avatarUrl: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&q=80&w=150',
      initials: 'ML',
    },
    action: 'added a new customer John Pillow',
    time: '12:35',
    group: 'Today',
  },
  {
    id: 'act-4',
    user: {
      name: 'Taylor Green',
      avatarUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150',
      initials: 'TG',
    },
    action: 'reviewed recent transactions',
    time: '21:05',
    group: 'Yesterday',
  },
  {
    id: 'act-5',
    user: {
      name: 'Wilson Baptista',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150',
      initials: 'WB',
    },
    action: 'transferred funds to emergency fund',
    time: '09:55',
    group: 'Yesterday',
  },
];

export const SAVING_TARGETS: SavingTarget[] = [
  {
    id: 'target-loans',
    name: 'Loans',
    current: 6000,
    target: 10000,
    percentage: 50, // Matches 50% visually from image
    color: '#8b5cf6', // Indigo/violet in our style
  },
  {
    id: 'target-deposits',
    name: 'Deposits',
    current: 3000,
    target: 5000,
    percentage: 60, // Matches 60% visually from image
    color: '#d946ef', // Fuchsia
  },
  {
    id: 'target-downpayment',
    name: 'Home Down Payment',
    current: 7250,
    target: 20000,
    percentage: 36.25, // Matches 36.25% visually from image
    color: '#df73ff', // Soft purple-pink
  },
];

export const EXPENSE_CATEGORIES = [
  { name: 'Credit', amount: 2100, percentage: 60, color: '#6366f1' }, // Indigo
  { name: 'Deposit Payment', amount: 525, percentage: 15, color: '#a855f7' }, // Purple
  { name: 'Bill Payment', amount: 420, percentage: 12, color: '#ec4899' }, // Pink
  { name: 'Loan Issuance', amount: 280, percentage: 8, color: '#84cc16' }, // Light Green
  { name: 'Emergency Fund', amount: 175, percentage: 5, color: '#f59e0b' }, // Amber
];
