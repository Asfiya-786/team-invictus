import {
  WalletState,
  PaymentItem,
  LoanApplication,
  CustomerCard,
  TransactionItem,
  FlaggedAlert,
  InvoiceItem,
  DocumentItem,
  MessageItem,
  CreditProduct,
  SystemSyncItem,
  HelpGuide
} from './types';

export const initialWallet: WalletState = {
  balance: 562000.00,
  incomeThisMonth: 78000.00,
  loansThisMonth: 43000.00,
  depositsThisMonth: 56000.00,
  dailyTracker: 2880.00,
  dailyTarget: 22500.00
};

export const initialPayments: PaymentItem[] = [
  {
    id: 'pay-1',
    vendor: 'Apex Electricity',
    category: 'Utility',
    amount: 120.00,
    dueDate: '28th',
    autopay: true,
    color: 'bg-emerald-500'
  },
  {
    id: 'pay-2',
    vendor: 'Premium Cloud Server',
    category: 'Infrastructure',
    amount: 450.00,
    dueDate: '28th',
    autopay: true,
    color: 'bg-indigo-500'
  },
  {
    id: 'pay-3',
    vendor: 'HQ Property Lease',
    category: 'Rent',
    amount: 2500.00,
    dueDate: '28th',
    autopay: false,
    color: 'bg-pink-500'
  },
  {
    id: 'pay-4',
    vendor: 'Stripe Merchant Fees',
    category: 'Business Fee',
    amount: 89.50,
    dueDate: '28th',
    autopay: false,
    color: 'bg-violet-500'
  }
];

export const initialLoans: LoanApplication[] = [
  {
    id: 'loan-1',
    applicantName: 'Andrew Sterling',
    companyName: 'Kyros Lab Holdings',
    loanType: 'Commercial Expansion Loan',
    amount: 150000,
    status: 'Pending',
    dateApplied: '2026-06-12',
    creditScore: 810,
    income: 380000,
    existingLiabilities: 65000,
    dti: 17.1,
    riskRating: 'Low',
    interestRate: 6.25,
    termYears: 5,
    verification: {
      kycStatus: true,
      panCard: true,
      aadhaarCard: true,
      bankReconciled: true,
      employmentCheck: 'Verified'
    }
  },
  {
    id: 'loan-2',
    applicantName: 'Elwood Vance',
    companyName: 'Vance Dynamics',
    loanType: 'Working Capital Line',
    amount: 95000,
    status: 'Pending',
    dateApplied: '2026-06-11',
    creditScore: 685,
    income: 145000,
    existingLiabilities: 45000,
    dti: 31.0,
    riskRating: 'Medium',
    interestRate: 8.5,
    termYears: 3,
    verification: {
      kycStatus: true,
      panCard: true,
      aadhaarCard: false,
      bankReconciled: true,
      employmentCheck: 'Pending'
    }
  },
  {
    id: 'loan-3',
    applicantName: 'Marcus Thorne',
    companyName: 'Aura Designs',
    loanType: 'Equipment Financing',
    amount: 65000,
    status: 'Approved',
    dateApplied: '2026-06-10',
    creditScore: 780,
    income: 210000,
    existingLiabilities: 32000,
    dti: 15.2,
    riskRating: 'Low',
    interestRate: 5.75,
    termYears: 4,
    verification: {
      kycStatus: true,
      panCard: true,
      aadhaarCard: true,
      bankReconciled: true,
      employmentCheck: 'Verified'
    }
  },
  {
    id: 'loan-4',
    applicantName: 'Seraphina Vance',
    companyName: 'Vance Agri LLC',
    loanType: 'Real Estate Mortgage',
    amount: 220000,
    status: 'Rejected',
    dateApplied: '2026-06-08',
    creditScore: 590,
    income: 110000,
    existingLiabilities: 82000,
    dti: 74.5,
    riskRating: 'Extreme',
    interestRate: 9.75,
    termYears: 15,
    decisionReason: 'Debt-to-income surpasses maximum risk policy criteria of 50%.',
    verification: {
      kycStatus: true,
      panCard: true,
      aadhaarCard: true,
      bankReconciled: false,
      employmentCheck: 'Failed'
    }
  }
];

export const initialCustomers: CustomerCard[] = [
  {
    id: 'cust-1',
    name: 'Andrew Forbist',
    company: 'Apex Logistics LLC',
    type: 'Visa Corporate Platinum',
    limit: 562000,
    balance: 145500,
    cardNum: '4812 8838 5117 6317',
    exp: '09/29',
    cvv: '811',
    avatarColor: 'from-pink-500 to-rose-600',
    status: 'Active',
    creditScore: 835,
    amlCheck: 'Cleared',
    idCheck: 'Verified',
    incorpCheck: 'Verified'
  },
  {
    id: 'cust-2',
    name: 'Sarah Jenkins',
    company: 'Aura Design Group Pro',
    type: 'Visa Corporate Gold',
    limit: 420500,
    balance: 85200,
    cardNum: '4532 9812 5422 9920',
    exp: '11/28',
    cvv: '402',
    avatarColor: 'from-violet-500 to-indigo-600',
    status: 'Pending',
    creditScore: 780,
    amlCheck: 'Cleared',
    idCheck: 'Verified',
    incorpCheck: 'Review Required'
  },
  {
    id: 'cust-3',
    name: 'Marcus Vance',
    company: 'Vance Dynamics Corp',
    type: 'Mastercard Enterprise Black',
    limit: 185000,
    balance: 12100,
    cardNum: '5102 3811 7421 0042',
    exp: '03/30',
    cvv: '197',
    avatarColor: 'from-fuchsia-500 to-purple-700',
    status: 'Active',
    creditScore: 710,
    amlCheck: 'Cleared',
    idCheck: 'Verified',
    incorpCheck: 'Verified'
  },
  {
    id: 'cust-4',
    name: 'Sophia Al-Thani',
    company: 'Horizon Logistics Group',
    type: 'Corporate Multi-card Premium',
    limit: 343200,
    balance: 220000,
    cardNum: '4512 8090 1234 5678',
    exp: '06/29',
    cvv: '662',
    avatarColor: 'from-sky-500 to-blue-700',
    status: 'Active',
    creditScore: 815,
    amlCheck: 'Under Review',
    idCheck: 'Verified',
    incorpCheck: 'Verified'
  }
];

export const initialTransactions: TransactionItem[] = [
  {
    id: 'tx-1',
    sender: 'Andrew Forbist',
    recipient: 'Apex Utilities Inc.',
    amount: 120.00,
    date: '2026-06-14',
    time: '14:22',
    status: 'Completed',
    category: 'Utility',
    reference: 'REF-TX-883921'
  },
  {
    id: 'tx-2',
    sender: 'Capital Credit Fund',
    recipient: 'Marcus Thorne',
    amount: 65000.00,
    date: '2026-06-13',
    time: '09:15',
    status: 'Completed',
    category: 'Salary',
    reference: 'REF-TX-109312'
  },
  {
    id: 'tx-3',
    sender: 'Andrew Forbist',
    recipient: 'Cloud Infrastructure Lab',
    amount: 450.00,
    date: '2026-06-12',
    time: '17:05',
    status: 'Completed',
    category: 'Infrastructure',
    reference: 'REF-TX-773212'
  },
  {
    id: 'tx-4',
    sender: 'Unknown Origin Host',
    recipient: 'Stripe Gateway Node v3',
    amount: 14580.00,
    date: '2026-06-14',
    time: '23:19',
    status: 'Flagged',
    category: 'Stripe',
    reference: 'REF-TX-009419'
  },
  {
    id: 'tx-5',
    sender: 'Office Supply HQ',
    recipient: 'Standard Purchase Corp',
    amount: 560.00,
    date: '2026-06-14',
    time: '02:11',
    status: 'Completed',
    category: 'Utility',
    reference: 'REF-TX-421098'
  },
  {
    id: 'tx-6',
    sender: 'Premium Capital Sweeps',
    recipient: 'Andrew Forbist Wallet',
    amount: 2880.00,
    date: '2026-06-15',
    time: '08:00',
    status: 'Completed',
    category: 'Salary',
    reference: 'REF-TX-126781'
  },
  {
    id: 'tx-7',
    sender: 'London Terminal C',
    recipient: 'Merchant Merchant PL',
    amount: 59000.00,
    date: '2026-06-13',
    time: '18:44',
    status: 'Blocked',
    category: 'Transfer',
    reference: 'REF-TX-190342'
  }
];

export const initialFlaggedAlerts: FlaggedAlert[] = [
  {
    id: 'fraud-1',
    source: 'Stripe API Gateway',
    reason: 'Rapid velocity from unfamiliar overseas IP',
    amount: 14580,
    riskProbability: 66,
    time: 'JUST NOW',
    status: 'Pending',
    location: 'Frankfurt, DE',
    deviceType: 'Stripe API Webhook'
  },
  {
    id: 'fraud-2',
    source: 'Andrew Forbist Card',
    reason: 'Standard office supply acquisition',
    amount: 560,
    riskProbability: 4,
    time: '7 MINS AGO',
    status: 'Approved',
    location: 'Lagos, NG',
    deviceType: 'Corporate Smart Card'
  },
  {
    id: 'fraud-3',
    source: 'Merchant Terminal PL',
    reason: 'Card-not-present transaction above threshold',
    amount: 59000,
    riskProbability: 92,
    time: '12 MINS AGO',
    status: 'Blocked',
    location: 'London, UK',
    deviceType: 'Virtual Merchant Terminal'
  }
];

export const initialInvoices: InvoiceItem[] = [
  {
    id: 'inv-1',
    invoiceNumber: 'INV-2026-001',
    clientName: 'Apex Logistics LLC',
    amount: 12050.00,
    issueDate: '2026-06-01',
    dueDate: '2026-06-15',
    status: 'Paid',
    items: [
      { description: 'Corporate Energy Grid Services', qty: 1, unitPrice: 10000.00 },
      { description: 'Administrative Utility Allocations', qty: 1, unitPrice: 2050.00 }
    ]
  },
  {
    id: 'inv-2',
    invoiceNumber: 'INV-2026-002',
    clientName: 'Horizon Logistics Group',
    amount: 4580.00,
    issueDate: '2026-06-03',
    dueDate: '2026-06-18',
    status: 'Paid',
    items: [
      { description: 'Dedicated Virtual Infrastructure Hosting', qty: 4, unitPrice: 1000.00 },
      { description: 'Support Retainer & High-Speed Transit Pipe', qty: 1, unitPrice: 580.00 }
    ]
  },
  {
    id: 'inv-3',
    invoiceNumber: 'INV-2026-003',
    clientName: 'Aura Design Group Pro',
    amount: 25900.00,
    issueDate: '2026-06-10',
    dueDate: '2026-06-25',
    status: 'Outstanding',
    items: [
      { description: 'UI & Usability Assessment Consultancy', qty: 1, unitPrice: 20000.00 },
      { description: 'Interactive Prototypes & Theme Mapping', qty: 1, unitPrice: 5900.00 }
    ]
  },
  {
    id: 'inv-4',
    invoiceNumber: 'INV-2026-004',
    clientName: 'Vance Dynamics Corp',
    amount: 35000.00,
    issueDate: '2026-05-15',
    dueDate: '2026-05-30',
    status: 'Overdue',
    items: [
      { description: 'Critical Infrastructure Overhaul Security Audit', qty: 1, unitPrice: 35000.00 }
    ]
  }
];

export const initialDocuments: DocumentItem[] = [
  {
    id: 'doc-1',
    name: 'loan_underwriting_framework_v3.pdf',
    category: 'Contracts',
    size: '2.4 MB',
    uploadedBy: 'Compliance Officer',
    uploadDate: '2026-06-01',
    extension: 'pdf'
  },
  {
    id: 'doc-2',
    name: 'security_underwriting_standards_2026.docx',
    category: 'Contracts',
    size: '1.8 MB',
    uploadedBy: 'Andrew Forbist',
    uploadDate: '2026-06-05',
    extension: 'docx'
  },
  {
    id: 'doc-3',
    name: 'corporate_kyc_deficit_checks.xlsx',
    category: 'KYC Docs',
    size: '4.2 MB',
    uploadedBy: 'Auditor Team B',
    uploadDate: '2026-06-10',
    extension: 'xlsx'
  },
  {
    id: 'doc-4',
    name: 'system_compliance_archive_q1_sealed.zip',
    category: 'Financial Audits',
    size: '18.5 MB',
    uploadedBy: 'HQ System Bot',
    uploadDate: '2026-05-20',
    extension: 'zip'
  },
  {
    id: 'doc-5',
    name: 'non_disclosure_apex_partners.pdf',
    category: 'NDAs',
    size: '850 KB',
    uploadedBy: 'Legal Dept',
    uploadDate: '2026-06-12',
    extension: 'pdf'
  }
];

export const initialMessages: MessageItem[] = [
  {
    id: 'msg-1',
    sender: 'Super Admin',
    subject: 'Fraud Protection Alert: Velocity Profile Outlier',
    body: 'A transaction request of $14,580 was detected originating from Frankfurt, Germany (Stripe API Gateway). The alert is flagged as high probability outlier since client is localized in Apex Headquarters. Please execute a complete manual check on Seraphina Vance and Andrew Forbist and confirm if travel logs correspond to destination location. Action is required before close-of-business.',
    time: '08:12 AM',
    date: '2026-06-15',
    priority: 'Critical',
    isRead: false,
    avatarColor: 'bg-red-500',
    chatHistory: [
      {
        id: 'c-1',
        sender: 'Super Admin',
        message: 'Multiple high-value transfers detected on Seraphina Vances account. This deviates from historical patterns. Please verify immediate compliance documentation.',
        time: '08:12 AM',
        isUser: false
      }
    ]
  },
  {
    id: 'msg-2',
    sender: 'Risk Compliance Audit',
    subject: 'Surge Account Balance Audit Needed',
    body: 'Automatic system sweeps identified a sudden account balance boost on Andrew Sterlings primary deposit. Value: +$350,000. Request bank reconciliation checklist and valid corporate declaration files to prevent immediate structural lockout from capital pools.',
    time: '09:44 AM',
    date: '2026-06-14',
    priority: 'High',
    isRead: false,
    avatarColor: 'bg-[#C084FC]',
    chatHistory: [
      {
        id: 'c-2',
        sender: 'Risk Compliance Audit',
        message: 'Customer account balance increased significantly within a short period. Current Balance: $8,756,000. Please review recent deposits and verify source of funds.',
        time: '09:44 AM',
        isUser: false
      }
    ]
  },
  {
    id: 'msg-3',
    sender: 'Underwriting Bot',
    subject: 'Loan ID Review: Debt Ratio Threshold Alert',
    body: 'Loan ID-2026-1128 Vance Dynamics requests additional income verification. Debt-to-income ratio is currently sitting above the recommended threshold (31%). Verification triggers need an employment certificate audit and manual review of tax records.',
    time: '11:20 AM',
    date: '2026-06-13',
    priority: 'Medium',
    isRead: true,
    avatarColor: 'bg-indigo-500',
    chatHistory: []
  },
  {
    id: 'msg-4',
    sender: 'Risk Compliance Audit',
    subject: 'KYC Compliance Deficit Notice',
    body: 'Employment verification document is missing for Sarah Jenkins (Aura Design Group Pro). Contact customer and complete the KYC check before proceeding with final underwriting decisions or corporate card usage authorization.',
    time: '11:58 AM',
    date: '2026-06-12',
    priority: 'High',
    isRead: true,
    avatarColor: 'bg-orange-500',
    chatHistory: []
  }
];

export const initialCredits: CreditProduct[] = [
  {
    id: 'cred-1',
    tierName: 'Gold Standard Dark Pink',
    baseLimit: 50000,
    interestRate: 8.5,
    aprDiscount: 0.5,
    features: ['0.50% APR discount applied', 'Standard airport lounge access', 'Basic business analytics'],
    applied: true,
    color: 'from-pink-500 via-rose-500 to-pink-600'
  },
  {
    id: 'cred-2',
    tierName: 'Platinum Elite',
    baseLimit: 158000,
    interestRate: 7.2,
    aprDiscount: 1.25,
    features: ['1.25% APR discount available', '24/7 dedicated risk concierge', 'Unlimited airport lounge access'],
    applied: false,
    color: 'from-violet-500 via-purple-500 to-indigo-600'
  },
  {
    id: 'cred-3',
    tierName: 'Master Infinite',
    baseLimit: 380000,
    interestRate: 6.0,
    aprDiscount: 1.85,
    features: ['1.85% APR discount available', 'Custom physical metal card', 'Uncapped corporate cashback'],
    applied: false,
    color: 'from-purple-600 via-indigo-700 to-blue-800'
  },
  {
    id: 'cred-4',
    tierName: 'Sovereign Apex',
    baseLimit: 686000,
    interestRate: 4.5,
    aprDiscount: 2.25,
    features: ['2.25% APR discount available', 'Custom metallic black physical key', 'Bypassed underwriting limits'],
    applied: false,
    color: 'from-gray-900 via-purple-950 to-slate-950'
  }
];

export const initialSyncItems: SystemSyncItem[] = [
  { id: 'sync-1', name: 'Refresh Dashboard Data', lastSync: '11:05:01', status: 'synced' },
  { id: 'sync-2', name: 'Sync Customer Records', lastSync: '11:05:01', status: 'synced' },
  { id: 'sync-3', name: 'Update Loan Applications', lastSync: '11:05:01', status: 'synced' },
  { id: 'sync-4', name: 'Refresh Fraud Detection Alerts', lastSync: '11:05:01', status: 'synced' },
  { id: 'sync-5', name: 'Update Transaction History', lastSync: '11:05:01', status: 'synced' }
];

export const helpGuides: HelpGuide[] = [
  {
    id: 'guide-1',
    title: 'Dashboard User Guide',
    excerpt: 'Detailed overview of states, indicators, credit trackers, and central banking metrics.',
    category: 'Overview',
    content: 'The primary dashboard manages critical system KPIs including liquidity metrics, dynamic cashflow and statistical radial distributions. Tracking of the daily effort limits and personal wallets updates synchronized instantly when actions are executed.'
  },
  {
    id: 'guide-2',
    title: 'Loan Management Guide',
    excerpt: 'Manual protocols for risk profiling, underwriting sliders, and loan authorization checks.',
    category: 'Loan Process',
    content: 'Review and audit loan applications in full-screen view. Dynamically slide values to check updated repayment terms, and interactively run employment or pan audits to ensure correct authorization ratings before approving.'
  },
  {
    id: 'guide-3',
    title: 'Fraud Detection Guide',
    excerpt: 'Mitigating risks, checking flagged transactions, and activating system safeguards.',
    category: 'Fraud Security',
    content: 'Use the AI Fraud Mitigation Engine to audit high-risk outliers from global locations. The sandbox trigger allows manual simulation of test flows to explore automatic compliance locks and trigger sandbox events.'
  },
  {
    id: 'guide-4',
    title: 'Customer Management Guide',
    excerpt: 'Overseeing client portfolios, credit limits, card parameters, and company statuses.',
    category: 'Compliance',
    content: 'Oversee corporate cards and company documents. Check specific KYC items such as legal incorporation registries, and manually audit or sign limits with integrated UI checks.'
  }
];
