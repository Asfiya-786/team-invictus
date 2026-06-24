import { Customer, Employee, Branch, Transaction, Loan, CreditCard, AuditLog, Ticket, Task, FixedDeposit } from '../types/dashboard';

export const INITIAL_CUSTOMERS: Customer[] = [
  {
    id: "CUST-802",
    name: "Alistair Sterling",
    email: "a.sterling@sterlingholdings.com",
    phone: "+1 (555) 019-2831",
    balance: 14250320.50,
    riskProfile: "Low",
    riskScore: 12,
    status: "Active",
    verified: true,
    branchId: "BR-ZH-01", // Zurich
    kycStatus: "Approved",
    type: "VIP",
    joinDate: "2021-04-12"
  },
  {
    id: "CUST-415",
    name: "Elena Rostova",
    email: "elena.rostova@cybernet.io",
    phone: "+44 7700 900077",
    balance: 4890200.00,
    riskProfile: "Medium",
    riskScore: 45,
    status: "Active",
    verified: true,
    branchId: "BR-LDN-02", // London
    kycStatus: "Approved",
    type: "VIP",
    joinDate: "2022-09-18"
  },
  {
    id: "CUST-293",
    name: "Marcus Vance",
    email: "marcus.vance@vancetech.com",
    phone: "+1 (555) 014-9988",
    balance: 850020.00,
    riskProfile: "High",
    riskScore: 78,
    status: "Active",
    verified: true,
    branchId: "BR-NYC-01", // New York
    kycStatus: "Approved",
    type: "Corporate",
    joinDate: "2023-11-05"
  },
  {
    id: "CUST-901",
    name: "Kenji Takahashi",
    email: "takahashi@sakurafund.jp",
    phone: "+81 90 1234 5678",
    balance: 22890500.00,
    riskProfile: "Low",
    riskScore: 8,
    status: "Active",
    verified: true,
    branchId: "BR-TKY-03", // Tokyo
    kycStatus: "Approved",
    type: "VIP",
    joinDate: "2020-01-22"
  },
  {
    id: "CUST-104",
    name: "Amara Diop",
    email: "amara.diop@africadawn.org",
    phone: "+33 6 1234 5678",
    balance: 12450.00,
    riskProfile: "Critical",
    riskScore: 92,
    status: "Frozen",
    verified: false,
    branchId: "BR-LDN-02",
    kycStatus: "Pending",
    type: "Retail",
    joinDate: "2024-05-10"
  },
  {
    id: "CUST-331",
    name: "Carlos Santana",
    email: "carlos.s@nexustech.net",
    phone: "+52 55 1234 5678",
    balance: 742000.00,
    riskProfile: "Medium",
    riskScore: 54,
    status: "Active",
    verified: true,
    branchId: "BR-NYC-01",
    kycStatus: "Approved",
    type: "Corporate",
    joinDate: "2023-01-15"
  },
  {
    id: "CUST-512",
    name: "Sophia Martinez",
    email: "smartinez@gmail.com",
    phone: "+1 (555) 018-4422",
    balance: 14500.00,
    riskProfile: "Low",
    riskScore: 18,
    status: "Active",
    verified: true,
    branchId: "BR-SGP-04", // Singapore
    kycStatus: "Approved",
    type: "Retail",
    joinDate: "2024-02-14"
  },
  {
    id: "CUST-089",
    name: "Dmitry Volkov",
    email: "d.volkov@uralgas.ru",
    phone: "+7 901 123-4567",
    balance: 15302000.00,
    riskProfile: "High",
    riskScore: 82,
    status: "Active",
    verified: false,
    branchId: "BR-ZH-01",
    kycStatus: "Pending",
    type: "VIP",
    joinDate: "2023-08-30"
  },
  {
    id: "CUST-887",
    name: "Zoe Winters",
    email: "zoe.winters@designstudio.co",
    phone: "+61 2 9382 0192",
    balance: 124900.00,
    riskProfile: "Low",
    riskScore: 25,
    status: "Active",
    verified: true,
    branchId: "BR-SGP-04",
    kycStatus: "Approved",
    type: "Retail",
    joinDate: "2022-12-01"
  },
  {
    id: "CUST-445",
    name: "Li Wei",
    email: "li.wei@orientcap.cn",
    phone: "+86 10 8273 0192",
    balance: 11050800.00,
    riskProfile: "Medium",
    riskScore: 35,
    status: "Active",
    verified: true,
    branchId: "BR-SGP-04",
    kycStatus: "Approved",
    type: "VIP",
    joinDate: "2021-07-09"
  }
];

export const INITIAL_EMPLOYEES: Employee[] = [
  {
    id: "EMP-001",
    name: "Sarah Jenkins",
    email: "s.jenkins@apexbank.com",
    role: "Senior Compliance Officer",
    department: "Risk & Compliance",
    branchId: "BR-NYC-01",
    status: "Active",
    rating: 4.8,
    joinDate: "2018-02-15",
    performance: 96
  },
  {
    id: "EMP-014",
    name: "Maximilian Kael",
    email: "m.kael@apexbank.com",
    role: "Zurich Branch Manager",
    department: "Branch Management",
    branchId: "BR-ZH-01",
    status: "Active",
    rating: 4.9,
    joinDate: "2015-08-10",
    performance: 98
  },
  {
    id: "EMP-045",
    name: "Vikram Naidu",
    email: "v.naidu@apexbank.com",
    role: "Lead Security Architect",
    department: "Cybersecurity",
    branchId: "BR-NYC-01",
    status: "Active",
    rating: 4.7,
    joinDate: "2020-11-01",
    performance: 94
  },
  {
    id: "EMP-092",
    name: "Chloe Dupont",
    email: "c.dupont@apexbank.com",
    role: "Senior Loan Underwriter",
    department: "Lending",
    branchId: "BR-LDN-02",
    status: "Active",
    rating: 4.5,
    joinDate: "2021-06-18",
    performance: 91
  },
  {
    id: "EMP-108",
    name: "Yuki Sato",
    email: "y.sato@apexbank.com",
    role: "Aesthetic UX Lead / IT Admin",
    department: "Information Technology",
    branchId: "BR-TKY-03",
    status: "Active",
    rating: 4.9,
    joinDate: "2019-10-05",
    performance: 97
  },
  {
    id: "EMP-155",
    name: "Hassan Al-Saeed",
    email: "h.alsaeed@apexbank.com",
    role: "Investment advisor",
    department: "Wealth Management",
    branchId: "BR-ZH-01",
    status: "Inactive",
    rating: 4.2,
    joinDate: "2022-03-30",
    performance: 85
  }
];

export const INITIAL_BRANCHES: Branch[] = [
  {
    id: "BR-NYC-01",
    name: "New York Wall St. Flagship",
    manager: "Donald Vance",
    location: "New York, USA",
    totalDeposits: 458900000,
    activeAccounts: 8490,
    rating: 4.8,
    status: "Operational"
  },
  {
    id: "BR-ZH-01",
    name: "Zurich Elite Vault",
    manager: "Maximilian Kael",
    location: "Zurich, Switzerland",
    totalDeposits: 1250320000,
    activeAccounts: 1250,
    rating: 4.9,
    status: "Operational"
  },
  {
    id: "BR-LDN-02",
    name: "London Square Premium",
    manager: "Alistair Sterling",
    location: "London, UK",
    totalDeposits: 624500000,
    activeAccounts: 4920,
    rating: 4.7,
    status: "Operational"
  },
  {
    id: "BR-TKY-03",
    name: "Tokyo Neo Skyline",
    manager: "Masami Tanaka",
    location: "Tokyo, Japan",
    totalDeposits: 512400000,
    activeAccounts: 3150,
    rating: 4.8,
    status: "Operational"
  },
  {
    id: "BR-SGP-04",
    name: "Singapore Wharf Hub",
    manager: "Lawrence Wong",
    location: "Singapore",
    totalDeposits: 842100000,
    activeAccounts: 5820,
    rating: 4.6,
    status: "Operational"
  }
];

export const INITIAL_TRANSACTIONS: Transaction[] = [
  {
    id: "TXN-98219",
    customerId: "CUST-802",
    customerName: "Alistair Sterling",
    amount: 1500000.00,
    type: "Transfer",
    category: "Offshore Settlement",
    timestamp: "2026-06-11T08:12:00Z",
    status: "Success",
    fraudRiskScore: 14,
    sourceBranchId: "BR-ZH-01"
  },
  {
    id: "TXN-98218",
    customerId: "CUST-104",
    customerName: "Amara Diop",
    amount: 9800.00,
    type: "Withdrawal",
    category: "ATM Fast Withdraw",
    timestamp: "2026-06-11T07:44:00Z",
    status: "Suspicious",
    fraudRiskScore: 89,
    sourceBranchId: "BR-LDN-02"
  },
  {
    id: "TXN-98217",
    customerId: "CUST-293",
    customerName: "Marcus Vance",
    amount: 35000.00,
    type: "Card Payment",
    category: "Private Jet Charter",
    timestamp: "2026-06-11T06:15:00Z",
    status: "Success",
    fraudRiskScore: 28,
    sourceBranchId: "BR-NYC-01"
  },
  {
    id: "TXN-98216",
    customerId: "CUST-089",
    customerName: "Dmitry Volkov",
    amount: 4500000.00,
    type: "Deposit",
    category: "Securities Inflow",
    timestamp: "2026-06-11T05:20:00Z",
    status: "Success",
    fraudRiskScore: 61,
    sourceBranchId: "BR-ZH-01"
  },
  {
    id: "TXN-98215",
    customerId: "CUST-512",
    customerName: "Sophia Martinez",
    amount: 450.00,
    type: "Transfer",
    category: "Failed Peer Payment",
    timestamp: "2026-06-11T04:10:00Z",
    status: "Failed",
    fraudRiskScore: 5,
    sourceBranchId: "BR-SGP-04"
  },
  {
    id: "TXN-98214",
    customerId: "CUST-415",
    customerName: "Elena Rostova",
    amount: 120000.00,
    type: "Transfer",
    category: "Crypto Liquidity Pivot",
    timestamp: "2026-06-10T22:30:00Z",
    status: "Suspicious",
    fraudRiskScore: 74,
    sourceBranchId: "BR-LDN-02"
  },
  {
    id: "TXN-98213",
    customerId: "CUST-331",
    customerName: "Carlos Santana",
    amount: 250000.00,
    type: "Loan Disbursal",
    category: "Equipment Finance",
    timestamp: "2026-06-10T15:10:00Z",
    status: "Success",
    fraudRiskScore: 19,
    sourceBranchId: "BR-NYC-01"
  }
];

export const INITIAL_LOANS: Loan[] = [
  {
    id: "LOAN-1029",
    customerId: "CUST-293",
    customerName: "Marcus Vance",
    amount: 750000.00,
    purpose: "Tech R&D Expansion",
    duration: 36,
    interestRate: 4.85,
    status: "Approved",
    requestedDate: "2026-06-01",
    riskScore: 32
  },
  {
    id: "LOAN-1030",
    customerId: "CUST-089",
    customerName: "Dmitry Volkov",
    amount: 5000000.00,
    purpose: "Maritime Transport Asset Buying",
    duration: 60,
    interestRate: 6.25,
    status: "Pending",
    requestedDate: "2026-06-08",
    riskScore: 79
  },
  {
    id: "LOAN-1031",
    customerId: "CUST-104",
    customerName: "Amara Diop",
    amount: 50000.00,
    purpose: "Micro Enterprise Launch",
    duration: 24,
    interestRate: 5.40,
    status: "Rejected",
    requestedDate: "2026-05-20",
    riskScore: 85
  },
  {
    id: "LOAN-1032",
    customerId: "CUST-331",
    customerName: "Carlos Santana",
    amount: 250000.05,
    purpose: "Corporate Headquarters Renovation",
    duration: 48,
    interestRate: 4.20,
    status: "Approved",
    requestedDate: "2026-06-05",
    riskScore: 15
  },
  {
    id: "LOAN-1033",
    customerId: "CUST-415",
    customerName: "Elena Rostova",
    amount: 1500000.00,
    purpose: "AI Compute Infrastructure Funding",
    duration: 12,
    interestRate: 3.90,
    status: "Pending",
    requestedDate: "2026-06-10",
    riskScore: 42
  }
];

export const INITIAL_CARDS: CreditCard[] = [
  {
    id: "CARD-4401",
    customerId: "CUST-802",
    customerName: "Alistair Sterling",
    cardNumber: "4001 8829 0192 4821",
    limit: 2000000,
    balance: 85200,
    status: "Active",
    expiryDate: "2029-12"
  },
  {
    id: "CARD-5511",
    customerId: "CUST-415",
    customerName: "Elena Rostova",
    cardNumber: "5109 4432 1192 8823",
    limit: 1000000,
    balance: 245000,
    status: "Active",
    expiryDate: "2028-08"
  },
  {
    id: "CARD-3312",
    customerId: "CUST-293",
    customerName: "Marcus Vance",
    cardNumber: "4532 9901 2283 1152",
    limit: 500000,
    balance: 421000,
    status: "Frozen",
    expiryDate: "2027-04"
  },
  {
    id: "CARD-9918",
    customerId: "CUST-901",
    customerName: "Kenji Takahashi",
    cardNumber: "4820 1192 4810 5920",
    limit: 5000000,
    balance: 0,
    status: "Active",
    expiryDate: "2031-10"
  }
];

export const INITIAL_FD: FixedDeposit[] = [
  {
    id: "FD-501",
    customerName: "Alistair Sterling",
    amount: 5000000.00,
    interestRate: 5.25,
    durationMonths: 24,
    startDate: "2025-01-10",
    status: "Active"
  },
  {
    id: "FD-502",
    customerName: "Kenji Takahashi",
    amount: 10000000.00,
    interestRate: 5.75,
    durationMonths: 36,
    startDate: "2024-06-15",
    status: "Active"
  },
  {
    id: "FD-503",
    customerName: "Zoe Winters",
    amount: 50000.00,
    interestRate: 4.50,
    durationMonths: 12,
    startDate: "2025-06-11",
    status: "Matured"
  }
];

export const INITIAL_AUDIT: AuditLog[] = [
  {
    id: "LOG-5421",
    user: "khanamsayeemakousar@gmail.com",
    action: "System Session Initialized",
    ipAddress: "192.168.1.144",
    timestamp: "2026-06-11T08:35:10Z",
    severity: "Info"
  },
  {
    id: "LOG-5420",
    user: "s.jenkins@apexbank.com",
    action: "KYC Application Rejected [CUST-104 - Amara Diop]",
    ipAddress: "10.0.4.32",
    timestamp: "2026-06-11T08:14:22Z",
    severity: "Warning"
  },
  {
    id: "LOG-5419",
    user: "SYSTEM_MONITOR",
    action: "Port 3000 Security Shutter Test Passed",
    ipAddress: "127.0.0.1",
    timestamp: "2026-06-11T08:00:00Z",
    severity: "Info"
  },
  {
    id: "LOG-5418",
    user: "m.kael@apexbank.com",
    action: "Account Unfrozen [CUST-802 - Alistair Sterling]",
    ipAddress: "145.2.14.99",
    timestamp: "2026-06-11T07:29:10Z",
    severity: "Warning"
  },
  {
    id: "LOG-5417",
    user: "FIREWALL_ALARM",
    action: "Intrusion Attempt Blocked from IP 185.220.101.5",
    ipAddress: "185.220.101.5",
    timestamp: "2026-06-11T06:55:40Z",
    severity: "Critical"
  }
];

export const INITIAL_TICKETS: Ticket[] = [
  {
    id: "TKT-312",
    customerName: "Marcus Vance",
    subject: "Wire Transfer Limit Boost Review",
    status: "In Progress",
    priority: "High",
    date: "2026-06-11"
  },
  {
    id: "TKT-311",
    customerName: "Elena Rostova",
    subject: "MFA Token Reset on Yacht Comm-Link",
    status: "Open",
    priority: "High",
    date: "2026-06-10"
  },
  {
    id: "TKT-310",
    customerName: "Sophia Martinez",
    subject: "Mobile Check Deposit Clearing Notice",
    status: "Resolved",
    priority: "Low",
    date: "2026-06-09"
  }
];

export const INITIAL_TASKS: Task[] = [
  {
    id: "TSK-01",
    title: "Verify CUST-089 Pending documents",
    status: "Pending",
    date: "2026-06-11",
    priority: "High"
  },
  {
    id: "TSK-02",
    title: "Approve London Branch Regional Performance PDF Report",
    status: "Completed",
    date: "2026-06-11",
    priority: "Medium"
  },
  {
    id: "TSK-03",
    title: "Refresh Cyber Threat Firewall Core Policies",
    status: "Pending",
    date: "2026-06-12",
    priority: "High"
  }
];
