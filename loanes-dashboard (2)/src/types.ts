export interface Transaction {
  id: string;
  name: string;
  type: 'Income' | 'Expense';
  date: string;
  amount: number;
  recipient: string;
  status: 'Completed' | 'Pending' | 'Failed';
  iconName?: string;
}

export interface StatCard {
  id: string;
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  type: 'income' | 'loans' | 'deposits' | 'online_deposits';
}

export interface CashflowItem {
  month: string;
  income: number;
  expense: number;
}

export interface ActivityLog {
  id: string;
  user: {
    name: string;
    avatarUrl: string;
    initials: string;
  };
  action: string;
  time: string;
  group: 'Today' | 'Yesterday';
}

export interface Customer {
  id: string;
  name: string;
  company: string;
  avatar: string;
  cardBrand: string;
  cardNumber: string;
  cardExpiry: string;
  bankName: string;
  bankAddress: string;
  accountNumber: string;
  routingNumber: string;
  swiftBic: string;
  accountType: string;
  availableBalance: number;
  currentLoans: number;
  creditLimit: number;
  passportId: string;
  delawareStamp: string;
  filingNumber: string;
  adminMemo: string;
  loanStatus: 'pending' | 'approved' | 'rejected';
  loanAmountRequested: number;
  businessDocAudited: boolean;
}

export interface SavingTarget {
  id: string;
  name: string;
  current: number;
  target: number;
  percentage: number;
  color: string;
}

export interface Employee {
  id: string;
  name: string;
  role: string;
  department: string;
  avatar: string;
  clearanceLevel: 'L1 Clerk' | 'L2 Specialist' | 'L3 Manager' | 'L4 Audit Director';
  email: string;
  phone: string;
  status: 'Active' | 'On Leave' | 'Suspended';
  dailyLimit: number;
  approvedCount: number;
}

export interface FeedbackMessage {
  id: string;
  sender: string;
  subject: string;
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  date: string;
  customerName: string;
  accountNumber: string; // masked
  loanId?: string;
  message: string;
  isRead: boolean;
  type: 'Balance' | 'Credit' | 'Loan' | 'Fraud' | 'KYC' | 'Transaction' | 'Compliance' | 'Risk' | 'Leave';
  suggestedAction: string;
}
