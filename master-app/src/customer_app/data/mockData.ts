/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Transaction, Card, SavingVault, UserWealthState } from '../types';

export const INITIAL_WEALTH: UserWealthState = {
  balance: 142450.75,
  income: 15400.00,
  expenses: 3180.20,
  savingsRate: 14.8
};

export const INITIAL_CARDS: Card[] = [
  {
    id: 'card-debit',
    cardholder: 'Andrew Forbist',
    last4: '9024',
    expiry: '08/29',
    network: 'Visa',
    isVirtual: false,
    isFrozen: false,
    dailyLimit: 2000,
    contactlessEnabled: true,
    colorType: 'classic-pink',
    cardType: 'Visa Platinum Debit',
    creditScore: 815
  },
  {
    id: 'card-1',
    cardholder: 'Andrew Forbist',
    last4: '8842',
    expiry: '11/30',
    network: 'Mastercard',
    isVirtual: false,
    isFrozen: false,
    dailyLimit: 2500,
    contactlessEnabled: true,
    colorType: 'blush-gradient',
    cardType: 'Credit Card',
    creditScore: 790
  },
  {
    id: 'card-2',
    cardholder: 'Andrew Forbist',
    last4: '3157',
    expiry: '05/29',
    network: 'Visa',
    isVirtual: true,
    isFrozen: false,
    dailyLimit: 500,
    contactlessEnabled: true,
    colorType: 'classic-pink',
    cardType: 'Visa Card',
    creditScore: 680
  },
  {
    id: 'card-3',
    cardholder: 'Andrew Forbist',
    last4: '0491',
    expiry: '09/28',
    network: 'Mastercard',
    isVirtual: false,
    isFrozen: true,
    dailyLimit: 1000,
    contactlessEnabled: false,
    colorType: 'minimal-rose',
    cardType: 'Mastercard Card',
    creditScore: 720
  }
];

export const INITIAL_SAVINGS_VAULTS: SavingVault[] = [
  {
    id: 'vault-1',
    name: 'Paris Holiday 2026',
    targetAmount: 8500,
    currentAmount: 6200,
    category: 'Travel'
  },
  {
    id: 'vault-2',
    name: 'Electric SUV Deposit',
    targetAmount: 15000,
    currentAmount: 12500,
    category: 'Automotive'
  },
  {
    id: 'vault-3',
    name: 'Luxury Spa Weekend',
    targetAmount: 2000,
    currentAmount: 1850,
    category: 'Leisure'
  },
  {
    id: 'vault-4',
    name: 'Emergency Fund',
    targetAmount: 25000,
    currentAmount: 18000,
    category: 'Finance'
  }
];

export const INITIAL_TRANSACTIONS: Transaction[] = [
  {
    id: 'tx-1',
    merchant: 'Blossom Boutiques Ltd',
    amount: 320.50,
    category: 'Fashion',
    tag: '#luxury',
    date: '2026-06-10T14:32:00Z',
    status: 'completed',
    type: 'expense',
    notes: 'Premium silk robes and accessories'
  },
  {
    id: 'tx-2',
    merchant: 'Rosewood Fine Dining',
    amount: 175.00,
    category: 'Dining',
    tag: '#celebration',
    date: '2026-06-09T20:15:00Z',
    status: 'completed',
    type: 'expense',
    notes: 'Dinner with client'
  },
  {
    id: 'tx-3',
    merchant: 'Evergreen Powers & Grid',
    amount: 112.40,
    category: 'Utilities',
    tag: '#essential',
    date: '2026-06-08T09:12:00Z',
    status: 'completed',
    type: 'expense',
    notes: 'Monthly eco-power supply bill'
  },
  {
    id: 'tx-4',
    merchant: 'Apex Systems Inc.',
    amount: 4500.00,
    category: 'Salary',
    tag: '#income',
    date: '2026-06-01T08:00:00Z',
    status: 'completed',
    type: 'income',
    notes: 'Monthly corporate consulting retainer'
  },
  {
    id: 'tx-5',
    merchant: 'Estétique Skincare Lab',
    amount: 85.00,
    category: 'Health',
    tag: '#wellness',
    date: '2026-06-05T11:45:00Z',
    status: 'completed',
    type: 'expense',
    notes: 'Hydra-boost facial serum replenish'
  },
  {
    id: 'tx-6',
    merchant: 'Aura Premium Coffee',
    amount: 14.50,
    category: 'Dining',
    tag: '#daily',
    date: '2026-06-05T08:20:00Z',
    status: 'completed',
    type: 'expense'
  },
  {
    id: 'tx-7',
    merchant: 'Macaron Studio NYC',
    amount: 48.00,
    category: 'Dining',
    tag: '#lifestyle',
    date: '2026-06-04T16:30:00Z',
    status: 'completed',
    type: 'expense',
    notes: 'Assorted gift boxes for partners'
  },
  {
    id: 'tx-8',
    merchant: 'CloudSpace Cloud Computing',
    amount: 29.99,
    category: 'Tech',
    tag: '#essential',
    date: '2026-06-03T11:00:00Z',
    status: 'completed',
    type: 'expense',
    notes: 'Developer cloud host billing'
  },
  {
    id: 'tx-9',
    merchant: 'Vogue Magazine Subs',
    amount: 12.00,
    category: 'Fashion',
    tag: '#recreational',
    date: '2026-05-28T09:00:00Z',
    status: 'completed',
    type: 'expense'
  },
  {
    id: 'tx-10',
    merchant: 'Global Equity Growth Fund',
    amount: 1200.00,
    category: 'Investments',
    tag: '#wealth-building',
    date: '2026-05-25T15:00:00Z',
    status: 'completed',
    type: 'expense',
    notes: 'Monthly index automation transfer'
  }
];
