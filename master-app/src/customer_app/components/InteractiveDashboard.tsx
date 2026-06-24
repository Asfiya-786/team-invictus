/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import {
  TrendingUp,
  Target,
  LayoutGrid,
  FileClock,
  MapPin,
  Calendar,
  ChevronDown,
  Info,
  RefreshCw,
  Search,
  Sliders,
  User,
  Sparkles,
  Layers,
  ArrowUpRight,
  TrendingDown,
  Percent,
  Compass
} from 'lucide-react';

// Color definitions matching the image aesthetics
const COLORS = {
  dhakaDarkBlue: '#4A1C6D',
  achievedCardBg: '#ff5e9c',
  coralPink: '#F05454',
  tealAqua: '#3AAFA9',
  failedRed: '#E74C3C',
  androidBlue: '#1F4068',
  iosCyan: '#00B4D8',
  lightGrayBorder: '#E2E8F0',
};

export default function InteractiveDashboard() {
  // 1. Interactive States
  const [activeTab, setActiveTab] = useState<'dashboard' | 'overview'>('dashboard');
  const [selectedCircle, setSelectedCircle] = useState<string>('Dhaka Central Circle');
  const [selectedZone, setSelectedZone] = useState<string>('Dhaka West Zone');
  const [selectedBranch, setSelectedBranch] = useState<string>('Mirpur Main Branch');
  const [dateRange, setDateRange] = useState<string>('28 Dec 22 - 10 Jan 23');
  const [userName, setUserName] = useState<string>('Mahin');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showBlueprints, setShowBlueprints] = useState<boolean>(true);

  // Stateful list of pre-seeded Customer profiles
  const [customers, setCustomers] = useState([
    { id: 'REG-001', name: 'Mahin Islam', zone: 'Dhaka West Zone', branch: 'Mirpur Main Branch', device: 'Android', status: 'In Progress', amount: 375000, date: '2026-06-11' },
    { id: 'REG-002', name: 'Tasnima Jahan', zone: 'Dhaka West Zone', branch: 'Mirpur Main Branch', device: 'iOS', status: 'Activated', amount: 1540000, date: '2026-06-10' },
    { id: 'REG-003', name: 'Raihan Chowdhury', zone: 'Chittagong South Zone', branch: 'Agrabad Loan Center', device: 'Android', status: 'Waiting for Self Ekyc', amount: 890000, date: '2026-06-09' },
    { id: 'REG-004', name: 'Zarin Subah', zone: 'Dhaka West Zone', branch: 'Banani Hub Office', device: 'iOS', status: 'In Progress', amount: 450000, date: '2026-06-11' },
    { id: 'REG-005', name: 'Adnan Sami', zone: 'Sylhet East Zone', branch: 'Mirpur Main Branch', device: 'Android', status: 'Cancelled by Bank', amount: 1200000, date: '2026-06-08' },
    { id: 'REG-006', name: 'Fatima Al-Hasan', zone: 'Dhaka West Zone', branch: 'Banani Hub Office', device: 'Android', status: 'Waiting for Verification', amount: 720000, date: '2026-06-10' },
    { id: 'REG-007', name: 'Kai Saunders', zone: 'Dhaka West Zone', branch: 'Mirpur Main Branch', device: 'iOS', status: 'Activated', amount: 2800000, date: '2026-06-11' },
    { id: 'REG-008', name: 'Mustafa Kemal', zone: 'Sylhet East Zone', branch: 'Mirpur Main Branch', device: 'Android', status: 'Waiting for approval', amount: 650000, date: '2026-06-07' },
    { id: 'REG-009', name: 'Nazia Rahman', zone: 'Chittagong South Zone', branch: 'Agrabad Loan Center', device: 'iOS', status: 'In Progress', amount: 950000, date: '2026-06-11' },
    { id: 'REG-010', name: 'Sajid Ahmed', zone: 'Dhaka West Zone', branch: 'Dhanmondi Sector 4', device: 'Android', status: 'Rejected by Identity Verifier', amount: 320000, date: '2026-06-05' }
  ]);

  // Customer search filters state
  const [customerSearch, setCustomerSearch] = useState<string>('');
  const [customerStatusFilter, setCustomerStatusFilter] = useState<string>('All');
  const [customerDeviceFilter, setCustomerDeviceFilter] = useState<string>('All');

  // Customer Creator Form State
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [newCustName, setNewCustName] = useState<string>('');
  const [newCustAmount, setNewCustAmount] = useState<number>(450000);
  const [newCustStatus, setNewCustStatus] = useState<string>('In Progress');
  const [newCustDevice, setNewCustDevice] = useState<'Android' | 'iOS'>('Android');
  const [newCustBranch, setNewCustBranch] = useState<string>('Mirpur Main Branch');

  // Live Loan parameters tuner editable states
  const [targetAchievedCount, setTargetAchievedCount] = useState<number>(324);
  const [totalRegistrationsCount, setTotalRegistrationsCount] = useState<number>(324);
  const [pendingAccountsCount, setPendingAccountsCount] = useState<number>(324);
  const [inProgressCount, setInProgressCount] = useState<number>(23456);
  const [inProgressPercentage, setInProgressPercentage] = useState<number>(47);
  const [successfulTransactionCount, setSuccessfulTransactionCount] = useState<number>(234322);
  const [successfulTransactionAmount, setSuccessfulTransactionAmount] = useState<number>(2778512);

  // Live dynamic synchronization of dashboard KPI metrics with user database modifications
  useEffect(() => {
    const activeZoneCustomers = customers.filter(c => c.zone === selectedZone);
    const activeBranchCustomers = activeZoneCustomers.filter(c => c.branch === selectedBranch);

    // Compute sums based on live customer list
    const inProgressSum = activeZoneCustomers.filter(c => c.status === 'In Progress').reduce((sum, c) => sum + c.amount, 0);
    const activeCount = activeZoneCustomers.filter(c => c.status === 'Activated').length;
    const pendingRegCount = activeZoneCustomers.filter(c => c.status.startsWith('Waiting') || c.status === 'In Progress').length;

    // Relative offsets matching initial numbers
    const targetOffset = 320 + activeCount;
    setTargetAchievedCount(targetOffset);

    const pendingOffset = 321 + pendingRegCount;
    setPendingAccountsCount(pendingOffset);

    const regOffset = 320 + activeZoneCustomers.length;
    setTotalRegistrationsCount(regOffset);

    if (inProgressSum > 0) {
      // Realistic representation computed from values
      setInProgressCount(Math.round(20000 + (inProgressSum * 0.002)));
    }
  }, [customers, selectedZone, selectedBranch]);

  // Secondary calculated metrics based on sliders for high fidelity
  const pendingTransactionCount = Math.round(successfulTransactionCount * 0.1);
  const pendingTransactionAmount = Math.round(successfulTransactionAmount * 0.028);
  const failedTransactionCount = Math.round(successfulTransactionCount * 0.01);
  const failedTransactionAmount = Math.round(successfulTransactionAmount * 0.003);

  // Dynamic system greeting based on time of day
  const [dynamicGreeting, setDynamicGreeting] = useState<string>('Good afternoon...');
  useEffect(() => {
    const hrs = new Date().getHours();
    if (hrs < 12) {
      setDynamicGreeting('Good morning...');
    } else if (hrs < 17) {
      setDynamicGreeting('Good afternoon...');
    } else {
      setDynamicGreeting('Good evening...');
    }
  }, []);

  // Soft loader effect when changing dropdowns to simulate data fetch
  const handleFilterChange = (setter: any, value: string) => {
    setIsLoading(true);
    setter(value);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 450);
    return () => clearTimeout(timer);
  };

  // Customer Management Database Actions
  const handleCreateCustomer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCustName.trim()) return;

    const newCustomer = {
      id: `REG-0${customers.length + 1}`,
      name: newCustName,
      zone: selectedZone,
      branch: newCustBranch,
      device: newCustDevice,
      status: newCustStatus,
      amount: Number(newCustAmount) || 450000,
      date: new Date().toISOString().split('T')[0]
    };

    setCustomers(prev => [newCustomer, ...prev]);
    setNewCustName('');
    setNewCustAmount(450000);
    setShowAddModal(false);
  };

  const handleUpdateCustomerStatus = (id: string, newStatus: string) => {
    setCustomers(prev => prev.map(c => {
      if (c.id === id) {
        return { ...c, status: newStatus };
      }
      return c;
    }));
  };

  const handleDeleteCustomer = (id: string) => {
    setCustomers(prev => prev.filter(c => c.id !== id));
  };

  // Re-seed parameter simulation on zone change for playful discovery
  const handleZoneSelect = (zone: string) => {
    setIsLoading(true);
    setSelectedZone(zone);
    
    // Seed parameters realistically
    if (zone === 'Dhaka West Zone') {
      setTargetAchievedCount(324);
      setTotalRegistrationsCount(324);
      setPendingAccountsCount(324);
      setInProgressCount(23456);
      setInProgressPercentage(47);
      setSuccessfulTransactionCount(234322);
      setSuccessfulTransactionAmount(2778512);
    } else if (zone === 'Chittagong South Zone') {
      setTargetAchievedCount(485);
      setTotalRegistrationsCount(512);
      setPendingAccountsCount(184);
      setInProgressCount(31200);
      setInProgressPercentage(61);
      setSuccessfulTransactionCount(345900);
      setSuccessfulTransactionAmount(4123560);
    } else if (zone === 'Sylhet East Zone') {
      setTargetAchievedCount(210);
      setTotalRegistrationsCount(240);
      setPendingAccountsCount(412);
      setInProgressCount(12800);
      setInProgressPercentage(35);
      setSuccessfulTransactionCount(112450);
      setSuccessfulTransactionAmount(1239800);
    } else {
      // Default / random-ish
      setTargetAchievedCount(290);
      setTotalRegistrationsCount(310);
      setPendingAccountsCount(270);
      setInProgressCount(19500);
      setInProgressPercentage(52);
      setSuccessfulTransactionCount(198000);
      setSuccessfulTransactionAmount(2100500);
    }

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 400);
    return () => clearTimeout(timer);
  };

  // Registration chart horizontal bars data binding
  const registrationBarData = [
    { name: 'Total Request', value: Math.round(inProgressCount * 2.1) },
    { name: 'Activated', value: Math.round(inProgressCount * 1.6) },
    { name: 'In Progress', value: inProgressCount, percentage: `${inProgressPercentage}%`, highlighted: true },
    { name: 'Rejected by Identity Verifier', value: Math.round(inProgressCount * 0.45) },
    { name: 'Waiting for Self Ekyc', value: Math.round(inProgressCount * 1.25) },
    { name: 'Cancelled by Bank', value: Math.round(inProgressCount * 0.6) },
    { name: 'Use ID Generated', value: Math.round(inProgressCount * 0.2) },
    { name: 'Waiting for Verification', value: Math.round(inProgressCount * 0.5) },
    { name: 'Waiting for approval', value: Math.round(inProgressCount * 0.75) }
  ];

  // Max value calculation for proportional bar rendering
  const maxBarValue = Math.max(...registrationBarData.map(d => d.value));

  // Pie chart datasets mapped dynamically
  const transactionDonutData = [
    { name: 'Successful', value: successfulTransactionCount, bdt: successfulTransactionAmount, color: '#FF7FA5' },
    { name: 'Pending', value: pendingTransactionCount, bdt: pendingTransactionAmount, color: '#3AAFA9' },
    { name: 'Failed', value: failedTransactionCount, bdt: failedTransactionAmount, color: '#E74C3C' }
  ];

  const osRegistrationDonutData = [
    { name: 'Android', value: successfulTransactionCount, bdt: successfulTransactionAmount, color: '#0F2C59' },
    { name: 'iOS', value: pendingTransactionCount, bdt: pendingTransactionAmount, color: '#56BBF1' }
  ];

  const osTransactionDonutData = [
    { name: 'Android', value: successfulTransactionCount, bdt: successfulTransactionAmount, color: '#4A1C6D' },
    { name: 'iOS', value: pendingTransactionCount, bdt: pendingTransactionAmount, color: '#D580FF' }
  ];

  return (
    <div className="relative min-h-screen pb-12">

      {/* Decorative Outer Shell Representation - mimic iPad/Canvas frame matching Image 1 layout style */}
      <div className="bg-white/80 rounded-[40px] p-6 sm:p-8 border border-gray-150 shadow-2xl relative overflow-hidden">
        
        {/* Absolute Background Accent lines mimicking dotted tracks from the Image */}
        <div className="absolute top-10 right-10 w-44 h-44 border-2 border-dashed border-pink-200/40 rounded-full pointer-events-none animate-spin" style={{ animationDuration: '60s' }} />
        <div className="absolute bottom-20 left-10 w-56 h-56 border border-dashed border-purple-200/30 rounded-full pointer-events-none" />

        {/* TOP SYSTEM NAV & ANNOTATION CONTROLS */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-gray-100 flex-wrap">
          {/* Dashboard vs Overview Tabs matching the exact look inside Image 1 */}
          <div className="flex bg-[#E2E8F0]/60 p-1 rounded-2xl border border-gray-200/50">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`px-5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'dashboard'
                  ? 'bg-gradient-to-r from-[#ff5e9c] to-[#b03bfc] text-white shadow-md'
                  : 'text-gray-500 hover:text-gray-800 hover:bg-white/45'
              }`}
            >
              Dashboard
            </button>
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'overview'
                  ? 'bg-gradient-to-r from-[#ff5e9c] to-[#b03bfc] text-white shadow-md'
                  : 'text-gray-500 hover:text-gray-800 hover:bg-white/45'
              }`}
            >
              Overview
            </button>
          </div>

          {/* Controller and Tuning Options */}
          <div className="flex items-center gap-3 flex-wrap">
            {/* Live Model parameters tuner toggle button */}
            <button
              onClick={() => setShowBlueprints(!showBlueprints)}
              className={`flex items-center gap-2 px-4 py-2 rounded-2xl text-[11px] font-bold border cursor-pointer transition-all ${
                showBlueprints
                  ? 'bg-gradient-to-r from-purple-700/10 to-pink-500/10 text-purple-900 border-purple-300'
                  : 'bg-white text-gray-500 hover:bg-gray-50 border-gray-200/70'
              }`}
            >
              <Compass className={`w-3.5 h-3.5 ${showBlueprints ? 'animate-spin' : ''}`} style={{ animationDuration: '8s' }} />
              {showBlueprints ? 'Hide Guidelines Overlays' : 'Show Blueprint Overlays'}
            </button>

            <span className="text-[10px] font-mono select-none px-2.5 py-1 bg-pink-100/40 border border-white rounded-full text-pink-700 font-bold">
              ✓ LOAN_MODEL_V2
            </span>
          </div>
        </div>

        {/* LIVE LOAN PARAMETERS TUNER (COLLAPSIBLE DRAWER PANEL) */}
        <div className="mb-6 bg-radial from-pink-50/20 to-white/40 border border-purple-100/50 rounded-3xl p-5 leading-relaxed shadow-sm">
          <div className="flex items-center justify-between cursor-pointer border-b border-gray-100 pb-2.5 mb-4">
            <span className="text-xs font-bold text-gray-800 uppercase tracking-widest flex items-center gap-2">
              <Sliders className="w-4 h-4 text-[#4A1C6D]" /> Loan Dashboard Parameter Tuner (Simulator)
            </span>
            <span className="text-[10px] text-gray-400 font-semibold italic">Adjust mock data sliders to redraw charts live</span>
          </div>

          {/* Quick inputs grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
            {/* User details */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-gray-500 uppercase">Greeting Named User</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="w-full bg-white border border-gray-200 rounded-xl pl-9 pr-3 py-1.5 text-xs font-bold text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#0F2C59]"
                />
              </div>
            </div>

            {/* Target Slider */}
            <div className="space-y-1">
              <div className="flex justify-between text-[10px] font-bold text-gray-500 uppercase">
                <span>Target achievements</span>
                <span className="text-pink-650 font-bold font-mono">{targetAchievedCount}+</span>
              </div>
              <input
                type="range"
                min="50"
                max="999"
                value={targetAchievedCount}
                onChange={(e) => {
                  const val = parseInt(e.target.value);
                  setTargetAchievedCount(val);
                  setTotalRegistrationsCount(val);
                  setPendingAccountsCount(val);
                }}
                className="w-full select-all accent-[#0F2C59]"
              />
            </div>

            {/* In Progress Value Slider */}
            <div className="space-y-1">
              <div className="flex justify-between text-[10px] font-bold text-gray-500 uppercase">
                <span>In Progress (Bar Highlights)</span>
                <span className="text-teal font-bold font-mono">{inProgressCount.toLocaleString()} ({inProgressPercentage}%)</span>
              </div>
              <div className="flex gap-2">
                <input
                  type="range"
                  min="5000"
                  max="60000"
                  step="500"
                  value={inProgressCount}
                  onChange={(e) => setInProgressCount(parseInt(e.target.value))}
                  className="flex-1 accent-teal-600"
                />
                <input
                  type="number"
                  min="1"
                  max="99"
                  value={inProgressPercentage}
                  onChange={(e) => setInProgressPercentage(Number(e.target.value))}
                  className="w-12 text-center text-xs font-bold bg-white border border-gray-200 rounded-lg py-0.5"
                />
              </div>
            </div>

            {/* Successful BDT Counter Slider */}
            <div className="space-y-1">
              <div className="flex justify-between text-[10px] font-bold text-gray-500 uppercase">
                <span>Successful transactions</span>
                <span className="text-[#ff5e9c] font-bold font-mono">${successfulTransactionAmount.toLocaleString()} BDT</span>
              </div>
              <input
                type="range"
                min="500000"
                max="9500000"
                step="50000"
                value={successfulTransactionAmount}
                onChange={(e) => {
                  setSuccessfulTransactionAmount(parseInt(e.target.value));
                  setSuccessfulTransactionCount(Math.round(parseInt(e.target.value) * 0.084));
                }}
                className="w-full accent-[#b03bfc]"
              />
            </div>
          </div>
        </div>

        {/* MAIN INTERACTIVE CORE CONTENT */}
        <AnimatePresence mode="wait">
          {activeTab === 'dashboard' ? (
            <motion.div
              key="dash"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-6 relative"
            >
              
              {/* DYNAMIC LOADING COVER */}
              {isLoading && (
                <div className="absolute inset-0 bg-white/60 backdrop-blur-xs z-50 rounded-3xl flex items-center justify-center">
                  <div className="flex flex-col items-center gap-3">
                    <RefreshCw className="w-8 h-8 text-[#0F2C59] animate-spin" />
                    <span className="text-xs font-bold text-gray-700 tracking-wider">Loading filter metrics...</span>
                  </div>
                </div>
              )}

              {/* HELLO USER GREETING ROW WITH BLUEPRINTS ANNOTATION COVER */}
              <div className="relative">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-0.5">
                    <h2 className="text-3xl font-display font-extrabold text-[#0D1F3D] tracking-tight leading-none">
                      Hello, {userName} !
                    </h2>
                    <p className="text-xs text-gray-400 font-semibold tracking-wide">
                      {dynamicGreeting}
                    </p>
                  </div>

                  {/* LOAN FILTERS SHELF WITH ANNOTATION COVER */}
                  <div className="flex flex-wrap items-center gap-2.5">
                    {/* Date filter button */}
                    <div className="relative">
                      <Calendar className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={dateRange}
                        onChange={(e) => setDateRange(e.target.value)}
                        className="bg-white border border-gray-200 hover:border-gray-300 rounded-xl pl-9 pr-6 py-2 text-xs font-bold text-gray-600 cursor-pointer shadow-xs focus:outline-none"
                        title="Click to edit date filter"
                      />
                    </div>

                    {/* Select Circle Dropdown */}
                    <div className="relative min-w-[130px]">
                      <select
                        value={selectedCircle}
                        onChange={(e) => handleFilterChange(setSelectedCircle, e.target.value)}
                        className="w-full bg-white border border-gray-200 hover:border-gray-300 text-xs font-bold text-gray-600 pl-3.5 pr-8 py-2 rounded-xl cursor-pointer shadow-xs focus:outline-none appearance-none"
                      >
                        <option value="Dhaka Central Circle">Dhaka Circle</option>
                        <option value="Chittagong Circle">Chittagong Circle</option>
                        <option value="Sylhet Tea Circle">Sylhet Circle</option>
                        <option value="Rajshahi Division">Rajshahi Circle</option>
                      </select>
                      <ChevronDown className="w-3 h-3 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>

                    {/* Select Zone Dropdown */}
                    <div className="relative min-w-[140px]">
                      <select
                        value={selectedZone}
                        onChange={(e) => handleZoneSelect(e.target.value)}
                        className="w-full bg-white border border-gray-200 hover:border-gray-200 text-xs font-extrabold text-purple-900 border-purple-250 hover:border-purple-400 pl-3.5 pr-8 py-2 rounded-xl cursor-pointer shadow-xs focus:outline-none appearance-none"
                      >
                        <option value="Dhaka West Zone">Dhaka West Zone</option>
                        <option value="Chittagong South Zone">Chittagong South Zone</option>
                        <option value="Sylhet East Zone">Sylhet East Zone</option>
                        <option value="Northern Frontier Zone">North Zone</option>
                      </select>
                      <ChevronDown className="w-3.5 h-3.5 text-purple-800 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>

                    {/* Select Branch Dropdown */}
                    <div className="relative min-w-[140px]">
                      <select
                        value={selectedBranch}
                        onChange={(e) => handleFilterChange(setSelectedBranch, e.target.value)}
                        className="w-full bg-white border border-gray-200 hover:border-gray-300 text-xs font-bold text-gray-700 pl-3.5 pr-8 py-2 rounded-xl cursor-pointer shadow-xs focus:outline-none appearance-none"
                      >
                        <option value="Mirpur Main Branch">Mirpur Branch</option>
                        <option value="Banani Hub Office">Banani Office</option>
                        <option value="Dhanmondi Sector 4">Dhanmondi Branch</option>
                        <option value="Agrabad Loan Center">Agrabad Center</option>
                      </select>
                      <ChevronDown className="w-3 h-3 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>
                </div>

                {/* VISUAL TUTORIAL ANNOTATION 1 & 2 OVERLAYS */}
                {showBlueprints && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                    {/* Anno 1: Dynamic Greetings */}
                    <div className="p-3.5 bg-gradient-to-r from-light-cyan to-blue-50 border border-dashed border-cyan-300 rounded-2xl flex gap-3 relative animate-pulse" style={{ animationDuration: '6s' }}>
                      <div className="w-5 h-5 rounded-full bg-cyan-100 flex items-center justify-center text-cyan-700 text-[10px] font-bold shrink-0">1</div>
                      <div className="text-[10.5px] leading-relaxed text-cyan-800">
                        <strong className="block font-bold">Dynamic Greetings:</strong>
                        Displays a personalized greeting based on active system hours, fostering an exquisite corporate user experience.
                      </div>
                      <div className="absolute -top-3.5 left-8 w-px h-3.5 border-l border-dashed border-cyan-400" />
                    </div>

                    {/* Anno 2: Filterable Data */}
                    <div className="p-3.5 bg-gradient-to-r from-blue-50 to-purple-50 border border-dashed border-blue-300 rounded-2xl flex gap-3 relative animate-pulse" style={{ animationDuration: '7.5s' }}>
                      <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 text-[10px] font-bold shrink-0">2</div>
                      <div className="text-[10.5px] leading-relaxed text-blue-800">
                        <strong className="block font-bold">Filterable Data Shelf:</strong>
                        Admin panels features filters for KPIs and charts to easily inspect, sort, and drill down analytics in real-time.
                      </div>
                      <div className="absolute -top-3.5 right-12 w-px h-3.5 border-r border-dashed border-blue-400" />
                    </div>
                  </div>
                )}
              </div>

              {/* DHAKA ZONE BANNER (GRADIENT BLOCK RENDERED IN THE IMAGE) */}
              <div className="w-full bg-gradient-to-r from-[#ff5e9c] to-[#b03bfc] text-white py-3 px-6 rounded-2xl flex items-center justify-between shadow-lg">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-pink-300 animate-bounce" />
                  <span className="font-display text-lg font-bold tracking-wide">
                    {selectedZone}
                  </span>
                </div>
                <div className="flex items-center gap-2.5 text-[10px] font-mono tracking-wider opacity-90">
                  <span className="w-2 h-2 rounded-full bg-pink-400 animate-ping" />
                  LEDGER ONLINE
                </div>
              </div>

              {/* FOUR RESPONSIVE AND ANIMATED KPI COMPONENTS */}
              <div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {/* KPI 1: Ranking */}
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="bg-white rounded-3xl p-5 border border-gray-150/70 shadow-sm flex flex-col justify-between h-[115px] relative overflow-hidden group"
                  >
                    <div className="flex justify-between items-start">
                      <span className="text-[10.5px] font-bold text-gray-400 uppercase tracking-wider block">Ranking</span>
                      <div className="p-1.5 bg-gray-50 group-hover:bg-[#0F2C59]/10 rounded-xl transition-all">
                        <TrendingUp className="w-4 h-4 text-[#ff5e9c]" />
                      </div>
                    </div>
                    <div>
                      <span className="text-3xl font-display font-black text-[#0F2C59] tracking-tight">
                        #01
                      </span>
                      <p className="text-[9.5px] text-gray-400 mt-1 font-semibold leading-none">Apex Zone Tier Classification</p>
                    </div>
                  </motion.div>

                  {/* KPI 2: Target Achieved (Vibrant Pink & Purple Gradient Style) */}
                  <motion.div
                    whileHover={{ scale: 1.02, y: -2 }}
                    className="bg-gradient-to-br from-[#ff5e9c] to-[#b03bfc] rounded-3xl p-5 text-white shadow-xl flex flex-col justify-between h-[115px] relative overflow-hidden group"
                  >
                    {/* Background glow circle */}
                    <div className="absolute -right-5 -bottom-5 w-16 h-16 rounded-full bg-pink-500/10 group-hover:bg-pink-500/15 transition-all" />

                    <div className="flex justify-between items-start">
                      <span className="text-[10.5px] font-bold text-pink-200 uppercase tracking-wider block">Target Achieved</span>
                      <div className="p-1.5 bg-white/10 rounded-xl">
                        <Target className="w-4 h-4 text-pink-300" />
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-3xl font-display font-black text-white tracking-tight">
                          {targetAchievedCount}+
                        </span>
                        {/* Play arrow yellow icon pointing adjacent to count */}
                        <span className="w-0 h-0 border-t-[5px] border-t-transparent border-l-[8px] border-l-amber-400 border-b-[5px] border-b-transparent animate-pulse ml-0.5" />
                      </div>
                      
                      {/* Compared to last month label */}
                      <p className="text-[9px] text-pink-300/90 font-mono font-medium mt-1 uppercase tracking-wider flex items-center gap-1 leading-none">
                        Compared to last month <span className="text-amber-300 font-bold">✓ 9.85%</span>
                      </p>
                    </div>
                  </motion.div>

                  {/* KPI 3: Total Registrations */}
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="bg-white rounded-3xl p-5 border border-gray-150/70 shadow-sm flex flex-col justify-between h-[115px] relative overflow-hidden group"
                  >
                    <div className="flex justify-between items-start">
                      <span className="text-[10.5px] font-bold text-gray-400 uppercase tracking-wider block">Total Registrations</span>
                      <div className="p-1.5 bg-gray-50 group-hover:bg-[#0F2C59]/10 rounded-xl transition-all">
                        <LayoutGrid className="w-4 h-4 text-[#0F2C59]" />
                      </div>
                    </div>
                    <div>
                      <span className="text-3xl font-display font-black text-[#0F2C59] tracking-tight">
                        {totalRegistrationsCount}+
                      </span>
                      <p className="text-[9.5px] text-gray-400 mt-1 font-semibold leading-none">Cumulative verified request logs</p>
                    </div>
                  </motion.div>

                  {/* KPI 4: Pending Accounts */}
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="bg-white rounded-3xl p-5 border border-gray-150/70 shadow-sm flex flex-col justify-between h-[115px] relative overflow-hidden group"
                  >
                    <div className="flex justify-between items-start">
                      <span className="text-[10.5px] font-bold text-gray-400 uppercase tracking-wider block">Pending Accounts</span>
                      <div className="p-1.5 bg-gray-50 group-hover:bg-[#0F2C59]/10 rounded-xl transition-all">
                        <FileClock className="w-4 h-4 text-purple-700" />
                      </div>
                    </div>
                    <div>
                      <span className="text-3xl font-display font-black text-[#0F2C59] tracking-tight">
                        {pendingAccountsCount}+
                      </span>
                      <p className="text-[9.5px] text-gray-400 mt-1 font-semibold leading-none">Awaiting identity validation audit</p>
                    </div>
                  </motion.div>
                </div>

                {/* ANNOTATION COVER 3 FOR KPIs */}
                {showBlueprints && (
                  <div className="p-3.5 bg-gradient-to-r from-purple-50 via-pink-50 to-white border border-dashed border-purple-300 rounded-2xl flex gap-3 mt-3 animate-pulse" style={{ animationDuration: '9s' }}>
                    <div className="w-5 h-5 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 text-[10px] font-bold shrink-0">3</div>
                    <div className="text-[10.5px] leading-relaxed text-purple-800 flex-1">
                      <strong className="block font-bold">Responsive & Animated KPIs:</strong>
                      Designed four dynamic, interactive KPI nodes with rich layout combinations, including play-state tickers, live slider bindings, and a growth percentage benchmark indices block.
                    </div>
                  </div>
                )}
              </div>

              {/* LOWER ROW: REGISTRATION DETAILS HORIZONTAL BARS (LEFT) & PIES (RIGHT) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
                
                {/* LEFT BLOCK: REGISTRATION DETAILS BAR CHART */}
                <div className="lg:col-span-7 bg-white rounded-[32px] p-6 border border-gray-150/80 shadow-md flex flex-col justify-between">
                  <div className="mb-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-base font-display font-extrabold text-[#0F2C59]">
                        Registration Details
                      </h3>
                      <span className="text-[10px] font-mono text-gray-400 font-bold">LATEST LEDGER RECORD</span>
                    </div>
                    <p className="text-[10.5px] text-gray-400 mt-0.5">Asset request states and conversion ratio outputs</p>
                  </div>

                  {/* Horizontal Bar stack container */}
                  <div className="space-y-3.5 pt-2 flex-1">
                    {registrationBarData.map((bar, index) => {
                      const ratio = bar.value / maxBarValue;
                      
                      return (
                        <div key={bar.name} className="space-y-1 relative">
                          <div className="flex justify-between items-center text-[11px] font-bold text-gray-700 pr-2">
                            <span className="truncate max-w-[210px]">{bar.name}</span>
                            <span className="font-mono text-[10px] text-gray-400 font-bold">{bar.value.toLocaleString()}</span>
                          </div>

                          <div className="w-full bg-gray-50 h-[10.5px] rounded-full relative overflow-visible">
                            {/* Bar Filling */}
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${ratio * 100}%` }}
                              transition={{ type: 'spring', stiffness: 60, delay: index * 0.03 }}
                              className={`h-full rounded-full transition-all duration-300 relative ${
                                bar.highlighted 
                                  ? 'bg-[#0f2c59]' 
                                  : index % 2 === 0 
                                    ? 'bg-[#2a75d3]/75' 
                                    : 'bg-[#56bbf1]/50'
                              }`}
                            >
                              {/* Highlight pointing bubble adjacent to bar tip matching EXACTLY "In Progress" element of Image 1 */}
                              {bar.highlighted && (
                                <div className="absolute right-0 -top-8 translate-x-1/2 z-20 flex flex-col items-center">
                                  {/* Yellow Tooltip Box */}
                                  <div className="bg-[#FFF9C4] border border-amber-300 filter drop-shadow-sm px-2 py-0.5 rounded-lg flex items-center gap-1 whitespace-nowrap animate-bounce" style={{ animationDuration: '3s' }}>
                                    {/* Gold play arrow inside tooltip */}
                                    <span className="w-0.5 h-0.5 border-t-[3px] border-t-transparent border-l-[5px] border-l-amber-600 border-b-[3px] border-b-transparent shrink-0" />
                                    <span className="text-[10px] font-mono font-black text-amber-900 select-all">
                                      {inProgressCount.toLocaleString()} ({inProgressPercentage}%)
                                    </span>
                                  </div>
                                  {/* Pointing golden pin tip */}
                                  <div className="w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[4.5px] border-t-amber-300 -mt-[1px] ml-1" />
                                </div>
                              )}
                            </motion.div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Horizontal Bar Annotation cover block */}
                  {showBlueprints && (
                    <div className="p-3 bg-[#E0F7FA]/40 border border-dashed border-teal-300 rounded-2xl flex gap-3 mt-4 animate-pulse" style={{ animationDuration: '8s' }}>
                      <div className="w-4 h-4 rounded-full bg-teal-100 flex items-center justify-center text-teal-700 text-[9px] font-bold shrink-0">4</div>
                      <span className="text-[10px] leading-normal text-teal-800">
                        <strong className="font-bold">Bar Chart Conversion Representation:</strong> Horizontal progress stack depicting loan validations status ratio. Highlights the highlighted <strong>In Progress</strong> index bubble directly based on system variables.
                      </span>
                    </div>
                  )}
                </div>

                {/* RIGHT BLOCK: VERTICAL COLLECTION OF THREE DONUT PIE CHARTS */}
                <div className="lg:col-span-5 space-y-5 flex flex-col justify-between">
                  
                  {/* DONUT 1: TRANSACTIONS INFO */}
                  <div className="bg-white rounded-[28px] p-5 border border-gray-150/80 shadow-md relative overflow-hidden">
                    <div className="flex items-center justify-between border-b border-gray-100 pb-2 mb-3">
                      <div>
                        <h4 className="text-xs font-display font-extrabold text-[#0F2C59] uppercase tracking-wider">Transaction Info</h4>
                        <p className="text-[8.5px] text-gray-400">Total BDT ledger volume splits</p>
                      </div>
                      <span className="text-gray-300 font-mono cursor-pointer hover:text-gray-500">•••</span>
                    </div>

                    <div className="grid grid-cols-12 gap-2 items-center">
                      {/* Left: Donut Chart representation */}
                      <div className="col-span-5 h-[110px] relative flex items-center justify-center">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={transactionDonutData}
                              cx="50%"
                              cy="50%"
                              innerRadius={32}
                              outerRadius={47}
                              paddingAngle={2.5}
                              dataKey="value"
                            >
                              {transactionDonutData.map((item, id) => (
                                <Cell key={`cell-${id}`} fill={item.color} />
                              ))}
                            </Pie>
                            <Tooltip formatter={(v) => Number(v).toLocaleString()} />
                          </PieChart>
                        </ResponsiveContainer>
                        {/* Center label */}
                        <div className="absolute text-center">
                          <span className="text-[8px] text-gray-400 uppercase tracking-widest font-bold">Volume</span>
                          <span className="text-xs font-black text-gray-700 block">100%</span>
                        </div>
                      </div>

                      {/* Right: Legends with metrics EXACTLY from Dhaka parameters of Image 1 */}
                      <div className="col-span-7 space-y-1.5 pl-3 border-l border-gray-50">
                        {transactionDonutData.map((item) => (
                          <div key={item.name} className="space-y-0.5">
                            <div className="flex items-center gap-1.5">
                              <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                              <span className="text-[9.5px] font-bold text-gray-500 uppercase">{item.name}</span>
                              <span className="text-[9px] font-mono text-gray-400 ml-auto font-semibold">{item.value.toLocaleString()}</span>
                            </div>
                            <p className="text-[10px] font-mono font-black text-slate-800 pl-3">
                              {item.bdt.toLocaleString()} BDT
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* DONUT 2: OPERATING SYSTEM WISE REGISTRATION */}
                  <div className="bg-white rounded-[28px] p-5 border border-gray-150/80 shadow-md relative overflow-hidden">
                    <div className="flex items-center justify-between border-b border-gray-100 pb-2 mb-3">
                      <div>
                        <h4 className="text-xs font-display font-extrabold text-[#0F2C59] uppercase tracking-wider">Operating System Wise Registration</h4>
                        <p className="text-[8.5px] text-gray-400">Visitor validation terminal ratios</p>
                      </div>
                      <span className="text-gray-300 font-mono">•••</span>
                    </div>

                    <div className="grid grid-cols-12 gap-2 items-center">
                      {/* Left Donut */}
                      <div className="col-span-5 h-[110px] relative flex items-center justify-center">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={osRegistrationDonutData}
                              cx="50%"
                              cy="50%"
                              innerRadius={32}
                              outerRadius={47}
                              paddingAngle={2.5}
                              dataKey="value"
                            >
                              {osRegistrationDonutData.map((item, id) => (
                                <Cell key={`cell-${id}`} fill={item.color} />
                              ))}
                            </Pie>
                            <Tooltip formatter={(v) => Number(v).toLocaleString()} />
                          </PieChart>
                        </ResponsiveContainer>
                        <div className="absolute text-center">
                          <span className="text-[8px] text-gray-400 font-bold uppercase">Device</span>
                          <span className="text-xs font-black text-gray-700 block">OS</span>
                        </div>
                      </div>

                      {/* Right Legend */}
                      <div className="col-span-7 space-y-1.5 pl-3 border-l border-gray-50">
                        {osRegistrationDonutData.map((item) => (
                          <div key={item.name} className="space-y-0.5">
                            <div className="flex items-center gap-1.5">
                              <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                              <span className="text-[9.5px] font-bold text-gray-500 uppercase">{item.name}</span>
                              <span className="text-[9px] font-mono text-gray-400 ml-auto font-semibold">{item.value.toLocaleString()}</span>
                            </div>
                            <p className="text-[10px] font-mono font-black text-slate-800 pl-3">
                              {item.bdt.toLocaleString()} BDT
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* DONUT 3: OPERATING SYSTEM WISE TRANSACTION */}
                  <div className="bg-white rounded-[28px] p-5 border border-gray-150/80 shadow-md relative overflow-hidden">
                    <div className="flex items-center justify-between border-b border-gray-100 pb-2 mb-3">
                      <div>
                        <h4 className="text-xs font-display font-extrabold text-[#0F2C59] uppercase tracking-wider">Operating System Wise Transaction</h4>
                        <p className="text-[8.5px] text-gray-400">Validated payment channel ratios</p>
                      </div>
                      <span className="text-gray-300 font-mono">•••</span>
                    </div>

                    <div className="grid grid-cols-12 gap-2 items-center">
                      {/* Left Donut */}
                      <div className="col-span-5 h-[110px] relative flex items-center justify-center">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={osTransactionDonutData}
                              cx="50%"
                              cy="50%"
                              innerRadius={32}
                              outerRadius={47}
                              paddingAngle={2.5}
                              dataKey="value"
                            >
                              {osTransactionDonutData.map((item, id) => (
                                <Cell key={`cell-${id}`} fill={item.color} />
                              ))}
                            </Pie>
                            <Tooltip formatter={(v) => Number(v).toLocaleString()} />
                          </PieChart>
                        </ResponsiveContainer>
                        <div className="absolute text-center">
                          <span className="text-[8px] text-gray-400 font-bold uppercase">Rate</span>
                          <span className="text-xs font-black text-gray-700 block">OP</span>
                        </div>
                      </div>

                      {/* Right Legend */}
                      <div className="col-span-7 space-y-1.5 pl-3 border-l border-gray-50">
                        {osTransactionDonutData.map((item) => (
                          <div key={item.name} className="space-y-0.5">
                            <div className="flex items-center gap-1.5">
                              <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                              <span className="text-[9.5px] font-bold text-gray-500 uppercase">{item.name}</span>
                              <span className="text-[9px] font-mono text-gray-400 ml-auto font-semibold">{item.value.toLocaleString()}</span>
                            </div>
                            <p className="text-[10px] font-mono font-black text-slate-800 pl-3">
                              {item.bdt.toLocaleString()} BDT
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                </div>

              </div>

                {/* E. CLIENTS & LOAN APPLICATIONS AUDIT PANEL (CUSTOM REQUEST ADHERENCE) */}
                <div className="bg-white rounded-[32px] p-6 border border-gray-150/80 shadow-md">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-100 flex-wrap">
                    <div>
                      <h3 className="text-base font-display font-black text-[#0F2C59] flex items-center gap-2">
                        <span>Customer Registry & Applications Ledger</span>
                        <span className="text-xs bg-[#0F2C59]/10 text-[#0F2C59] px-2 py-0.5 rounded-full font-mono">
                          {selectedZone}
                        </span>
                      </h3>
                      <p className="text-[11px] text-gray-400 mt-0.5">
                        Manage active applications with smart simulation routing. Click on controls to test KPI conversions.
                      </p>
                    </div>

                    <button
                      onClick={() => setShowAddModal(!showAddModal)}
                      className="px-4 py-2 bg-[#0F2C59] text-white rounded-xl text-xs font-bold hover:bg-[#1A3D73] transition-all flex items-center gap-2 shadow-xs cursor-pointer"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      Add New Applicant
                    </button>
                  </div>

                  {/* INLINE EXPANDABLE APPLICANT CREATOR DRAWER */}
                  <AnimatePresence>
                    {showAddModal && (
                      <motion.form
                        onSubmit={handleCreateCustomer}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="mt-4 p-4 bg-pink-50/20 border border-dashed border-pink-200 rounded-2xl space-y-4 overflow-hidden"
                      >
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                          <div className="space-y-1">
                            <label className="text-[10px] font-bold text-gray-500 uppercase">Applicant Name</label>
                            <input
                              type="text"
                              required
                              placeholder="e.g. Tasnim Alam"
                              value={newCustName}
                              onChange={(e) => setNewCustName(e.target.value)}
                              className="w-full bg-white border border-gray-200 rounded-xl px-3 py-1.5 text-xs text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#0F2C59]"
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="text-[10px] font-bold text-gray-500 uppercase">Requested Amount (BDT)</label>
                            <input
                              type="number"
                              required
                              min="1000"
                              max="9999999"
                              value={newCustAmount}
                              onChange={(e) => setNewCustAmount(Number(e.target.value))}
                              className="w-full bg-white border border-gray-200 rounded-xl px-3 py-1.5 text-xs text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#0F2C59]"
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="text-[10px] font-bold text-gray-500 uppercase">Operating System Terminal</label>
                            <select
                              value={newCustDevice}
                              onChange={(e) => setNewCustDevice(e.target.value as 'Android' | 'iOS')}
                              className="w-full bg-white border border-gray-200 rounded-xl px-3 py-1.5 text-xs text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#0F2C59]"
                            >
                              <option value="Android">Android</option>
                              <option value="iOS">iOS</option>
                            </select>
                          </div>

                          <div className="space-y-1">
                            <label className="text-[10px] font-bold text-gray-500 uppercase">Application State Status</label>
                            <select
                              value={newCustStatus}
                              onChange={(e) => setNewCustStatus(e.target.value)}
                              className="w-full bg-white border border-gray-200 rounded-xl px-3 py-1.5 text-xs text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#0F2C59]"
                            >
                              <option value="In Progress">In Progress</option>
                              <option value="Activated">Activated</option>
                              <option value="Waiting for Self Ekyc">Waiting for Self Ekyc</option>
                              <option value="Waiting for Verification">Waiting for Verification</option>
                              <option value="Waiting for approval">Waiting for approval</option>
                              <option value="Rejected by Identity Verifier">Rejected by Identity Verifier</option>
                              <option value="Cancelled by Bank">Cancelled by Bank</option>
                              <option value="Use ID Generated">Use ID Generated</option>
                            </select>
                          </div>
                        </div>

                        <div className="flex justify-end gap-2.5 pt-2">
                          <button
                            type="button"
                            onClick={() => setShowAddModal(false)}
                            className="px-3 py-1.5 hover:bg-gray-100 rounded-lg text-xs font-semibold text-gray-500"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="bg-[#0F2C59] text-white px-4 py-1.5 rounded-lg text-xs font-bold hover:bg-opacity-90"
                          >
                            Add New application
                          </button>
                        </div>
                      </motion.form>
                    )}
                  </AnimatePresence>

                  {/* ACTIVE FILTER CONTROLS SHELF */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 mt-4 pb-4 border-b border-gray-50">
                    <div className="relative">
                      <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        placeholder="Search applicant name, code, or branch..."
                        value={customerSearch}
                        onChange={(e) => setCustomerSearch(e.target.value)}
                        className="w-full bg-gray-50 border border-gray-200/60 pl-8.5 pr-3 py-1.5 rounded-xl text-xs text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#0F2C59] focus:bg-white"
                      />
                    </div>

                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-bold text-gray-400 uppercase whitespace-nowrap">State:</span>
                      <select
                        value={customerStatusFilter}
                        onChange={(e) => setCustomerStatusFilter(e.target.value)}
                        className="flex-1 bg-gray-50 border border-gray-200/60 rounded-xl px-2.5 py-1.5 text-xs text-gray-600 focus:outline-none"
                      >
                        <option value="All">All Application States</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Activated">Activated</option>
                        <option value="Waiting for Self Ekyc">Waiting for Self Ekyc</option>
                        <option value="Waiting for Verification">Waiting for Verification</option>
                        <option value="Waiting for approval">Waiting for approval</option>
                        <option value="Rejected by Identity Verifier">Rejected by Identity Verifier</option>
                        <option value="Cancelled by Bank">Cancelled by Bank</option>
                        <option value="Use ID Generated">Use ID Generated</option>
                      </select>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-bold text-gray-400 uppercase whitespace-nowrap">Device:</span>
                      <select
                        value={customerDeviceFilter}
                        onChange={(e) => setCustomerDeviceFilter(e.target.value)}
                        className="flex-1 bg-gray-50 border border-gray-200/60 rounded-xl px-2.5 py-1.5 text-xs text-gray-600 focus:outline-none"
                      >
                        <option value="All">All Terminal OS</option>
                        <option value="Android">Android</option>
                        <option value="iOS">iOS</option>
                      </select>
                    </div>
                  </div>

                  {/* APPLICATIONS LIST DIRECTORY TABLE */}
                  <div className="overflow-x-auto mt-4 rounded-2xl border border-gray-100">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-gray-50/70 text-[10px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100">
                          <th className="p-3">Reference No</th>
                          <th className="p-3">Applicant Name</th>
                          <th className="p-3">Branch Location</th>
                          <th className="p-3 text-center">Device OS</th>
                          <th className="p-3 text-right">Credit Requested</th>
                          <th className="p-3 text-center">Current State</th>
                          <th className="p-3 text-center">Operations</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100 text-xs text-gray-700">
                        {customers.filter(c => {
                          const matchSearch = c.name.toLowerCase().includes(customerSearch.toLowerCase()) ||
                                              c.id.toLowerCase().includes(customerSearch.toLowerCase()) ||
                                              c.branch.toLowerCase().includes(customerSearch.toLowerCase());
                          const matchStatus = customerStatusFilter === 'All' || c.status === customerStatusFilter;
                          const matchDevice = customerDeviceFilter === 'All' || c.device === customerDeviceFilter;
                          const matchZone = c.zone === selectedZone;

                          return matchSearch && matchStatus && matchDevice && matchZone;
                        }).length === 0 ? (
                          <tr>
                            <td colSpan={7} className="p-8 text-center text-gray-400 font-semibold italic">
                              No matching loan applicants found in {selectedZone} for selected status criteria.
                            </td>
                          </tr>
                        ) : (
                          customers.filter(c => {
                            const matchSearch = c.name.toLowerCase().includes(customerSearch.toLowerCase()) ||
                                                c.id.toLowerCase().includes(customerSearch.toLowerCase()) ||
                                                c.branch.toLowerCase().includes(customerSearch.toLowerCase());
                            const matchStatus = customerStatusFilter === 'All' || c.status === customerStatusFilter;
                            const matchDevice = customerDeviceFilter === 'All' || c.device === customerDeviceFilter;
                            const matchZone = c.zone === selectedZone;

                            return matchSearch && matchStatus && matchDevice && matchZone;
                          }).map((cust) => (
                            <tr key={cust.id} className="hover:bg-gray-50/50 transition-colors">
                              <td className="p-3 font-mono font-bold text-gray-500 whitespace-nowrap">{cust.id}</td>
                              <td className="p-3 whitespace-nowrap">
                                <div className="flex items-center gap-2">
                                  <div className="w-6.5 h-6.5 rounded-full bg-slate-100 flex items-center justify-center font-bold text-[#0F2C59] font-mono text-[9px]">
                                    {cust.name.substring(0, 2).toUpperCase()}
                                  </div>
                                  <span className="font-bold text-gray-800">{cust.name}</span>
                                </div>
                              </td>
                              <td className="p-3 text-gray-500 whitespace-nowrap">{cust.branch}</td>
                              <td className="p-3 text-center whitespace-nowrap">
                                <span className={`px-2 py-0.5 rounded-md text-[9px] font-extrabold uppercase ${
                                  cust.device === 'iOS' 
                                    ? 'bg-cyan-50 text-cyan-600 border border-cyan-100' 
                                    : 'bg-indigo-50 text-[#0F2C59] border border-blue-100'
                                }`}>
                                  {cust.device}
                                </span>
                              </td>
                              <td className="p-3 text-right font-mono font-black text-gray-800 whitespace-nowrap">
                                ৳ {cust.amount.toLocaleString()} BDT
                              </td>
                              <td className="p-3 text-center whitespace-nowrap">
                                <span className={`inline-block px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-wider ${
                                  cust.status === 'Activated'
                                    ? 'bg-pink-50 text-[#ff5e9c] border border-pink-100'
                                    : cust.status === 'In Progress'
                                      ? 'bg-blue-50 text-[#0F2C59] border border-blue-200'
                                      : cust.status.startsWith('Waiting')
                                        ? 'bg-amber-50 text-amber-800 border border-amber-200'
                                        : 'bg-rose-50 text-rose-700 border border-rose-200'
                                }`}>
                                  {cust.status}
                                </span>
                              </td>
                              <td className="p-3 text-center whitespace-nowrap">
                                <div className="flex items-center justify-center gap-1.5">
                                  {cust.status !== 'Activated' && (
                                    <button
                                      onClick={() => handleUpdateCustomerStatus(cust.id, 'Activated')}
                                      className="px-2 py-1 bg-[#ff5e9c] text-white hover:bg-[#b03bfc] text-[10px] font-bold rounded-lg transition-all cursor-pointer"
                                      title="Approve & Activate Application"
                                    >
                                      Approve
                                    </button>
                                  )}
                                  {cust.status !== 'Cancelled by Bank' && (
                                    <button
                                      onClick={() => handleUpdateCustomerStatus(cust.id, 'Cancelled by Bank')}
                                      className="px-2 py-1 bg-red-100 text-red-700 hover:bg-red-200 text-[10px] font-bold rounded-lg transition-all cursor-pointer"
                                      title="Cancel Application"
                                    >
                                      Reject
                                    </button>
                                  )}
                                  <button
                                    onClick={() => handleDeleteCustomer(cust.id)}
                                    className="p-1 hover:bg-red-50 text-gray-400 hover:text-red-500 rounded-lg transition-colors cursor-pointer"
                                    title="Delete Applicant Record"
                                  >
                                    ✕
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>

                  {/* ANNOTATION TUTORIAL OVERLAY 6 (CUSTOM DATABASE METRIC BINDINGS) */}
                  {showBlueprints && (
                    <div className="p-3 bg-gradient-to-r from-amber-50 to-pink-50 border border-dashed border-amber-300 rounded-2xl flex gap-3 mt-4 animate-pulse" style={{ animationDuration: '11s' }}>
                      <div className="w-4 h-4 rounded-full bg-amber-100 flex items-center justify-center text-amber-700 text-[9px] font-bold shrink-0">6</div>
                      <span className="text-[10px] leading-normal text-amber-850">
                        <strong className="font-bold">Real-time Bi-directional Binding:</strong> Any status conversion trigger (e.g. clicking <strong>Approve</strong> or <strong>Reject</strong> in the Customer Action columns) updates the local applications database state. These changes flow instantly back up to recalculate the <strong>Registration Details</strong> horizontal bars, the <strong>Target Achieved</strong> metrics, and the three pie charts simultaneously!
                      </span>
                    </div>
                  )}

                </div>

            </motion.div>
          ) : (
            <motion.div
              key="overview"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="space-y-6"
            >
              <div className="glass-panel rounded-3xl p-6 shadow-sm">
                <div className="flex items-center justify-between border-b border-gray-100 pb-3 mb-4">
                  <div>
                    <h3 className="font-display font-extrabold text-[#0F2C59] text-lg">Loan Overview Analytics Index</h3>
                    <p className="text-xs text-gray-400">Advanced cross-circle financial telemetry and projection analytics</p>
                  </div>
                  <Compass className="w-6 h-6 text-pink-400 animate-spin" style={{ animationDuration: '20s' }} />
                </div>

                {/* Grid items */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Metric Block 1 */}
                  <div className="p-4 bg-gray-50/50 rounded-2xl border border-gray-100">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1">Circle Yield</span>
                    <span className="text-2xl font-display font-extrabold text-[#0D1F3D] block">94.85%</span>
                    <p className="text-[10px] text-[#ff5e9c] font-bold mt-1.5 flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" /> +1.24% this week
                    </p>
                  </div>

                  {/* Metric Block 2 */}
                  <div className="p-4 bg-gray-50/50 rounded-2xl border border-gray-100">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1">Conversion Target Peak</span>
                    <span className="text-2xl font-display font-extrabold text-[#0D1F3D] block">1,245 Requests</span>
                    <p className="text-[10px] text-amber-600 font-bold mt-1.5 flex items-center gap-1">
                      <Info className="w-3 h-3 animate-pulse" /> Peak hours active: 2:00 PM - 5:00 PM
                    </p>
                  </div>

                  {/* Metric Block 3 */}
                  <div className="p-4 bg-gray-50/50 rounded-2xl border border-gray-100">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1">System Health Coeff</span>
                    <span className="text-2xl font-display font-extrabold text-[#0D1F3D] block">99.98% SLA</span>
                    <p className="text-[10px] text-blue-600 font-bold mt-1.5 flex items-center gap-1">
                      <Sparkles className="w-3 h-3 shrink-0" /> Dhaka West high speed cluster online
                    </p>
                  </div>
                </div>

                {/* Graphic bar mock representations */}
                <div className="mt-8 space-y-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500">Cross-Division Comparison Yields</h4>
                  
                  <div className="space-y-2">
                    {/* Circle 1 */}
                    <div className="relative">
                      <div className="flex justify-between text-xs font-bold text-gray-700 mb-1 z-10 relative px-2">
                        <span>Dhaka West Zone (Leader)</span>
                        <span className="font-mono">92%</span>
                      </div>
                      <div className="w-full bg-gray-100 h-6 rounded-lg overflow-hidden">
                        <div className="bg-gradient-to-r from-blue-700 to-indigo-800 h-full rounded-lg" style={{ width: '92%' }} />
                      </div>
                    </div>

                    {/* Circle 2 */}
                    <div className="relative">
                      <div className="flex justify-between text-xs font-bold text-gray-700 mb-1 z-10 relative px-2">
                        <span>Chittagong South Zone</span>
                        <span className="font-mono">78%</span>
                      </div>
                      <div className="w-full bg-gray-100 h-6 rounded-lg overflow-hidden">
                        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 h-full rounded-lg" style={{ width: '78%' }} />
                      </div>
                    </div>

                    {/* Circle 3 */}
                    <div className="relative">
                      <div className="flex justify-between text-xs font-bold text-gray-700 mb-1 z-10 relative px-2">
                        <span>Sylhet East Zone</span>
                        <span className="font-mono">62%</span>
                      </div>
                      <div className="w-full bg-gray-100 h-6 rounded-lg overflow-hidden">
                        <div className="bg-gradient-to-r from-teal-500 to-blue-500 h-full rounded-lg" style={{ width: '62%' }} />
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
