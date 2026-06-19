import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  User, Mail, Phone, MapPin, ShieldCheck, Key, Eye, EyeOff, 
  FileText, Download, Check, HelpCircle, Lock, Camera, Upload,
  Briefcase, Sparkles, Copy, X, ArrowLeft
} from 'lucide-react';

interface Advisor {
  id: string;
  name: string;
  role: string;
  phone: string;
  email: string;
  avatar: string;
}

const SUPPORT_ADVISORS: Advisor[] = [
  {
    id: 'emp-1',
    name: 'Samantha Ray',
    role: 'Senior Private Wealth Director',
    phone: '+91 98301 22940',
    email: 'samantha.ray@apex.com',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80'
  },
  {
    id: 'emp-2',
    name: 'Kabir Mehra',
    role: 'NRI Priority Relationship Executive',
    phone: '+91 91630 11845',
    email: 'kabir.mehra@apex.com',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&auto=format&fit=crop&q=80'
  },
  {
    id: 'emp-3',
    name: 'Priya Sharma',
    role: 'Mortgages & Home Loan Consultant',
    phone: '+91 81002 99341',
    email: 'priya.sharma@apex.com',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&auto=format&fit=crop&q=80'
  },
  {
    id: 'emp-4',
    name: 'Amaan Kazi',
    role: 'Cyber Frauds & Security Representative',
    phone: '+91 90511 88470',
    email: 'amaan.kazi@apex.com',
    avatar: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=200&auto=format&fit=crop&q=80'
  }
];

interface CustomerProfileProps {
  profile: any;
  onUpdateProfile: (updated: any) => void;
  onClose: () => void;
}

export default function CustomerProfile({ profile, onUpdateProfile, onClose }: CustomerProfileProps) {
  const [formData, setFormData] = useState({ ...profile });
  const [showPassword, setShowPassword] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [newPIN, setNewPIN] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  // Double-Authentication States
  const [authModal, setAuthModal] = useState<{
    isOpen: boolean;
    type: 'password' | 'pin';
    targetValue: string;
  } | null>(null);

  const [otpSent, setOtpSent] = useState(false);
  const [sendingOtp, setSendingOtp] = useState(false);
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [userEnteredOtp, setUserEnteredOtp] = useState('');
  const [otpVerifyError, setOtpVerifyError] = useState<string | null>(null);
  const [enteredEmailConfirmation, setEnteredEmailConfirmation] = useState('');
  const [enteredPhoneConfirmation, setEnteredPhoneConfirmation] = useState('');

  const startDoubleAuth = (type: 'password' | 'pin', val: string) => {
    if (!val) {
      triggerLocalNotification(`❌ Please enter a valid ${type === 'password' ? 'Password Key' : '4-Digit PIN'} first!`);
      return;
    }
    if (type === 'pin' && val.length !== 4) {
      triggerLocalNotification('❌ Transaction PIN must be exactly 4 digits!');
      return;
    }
    
    setAuthModal({
      isOpen: true,
      type,
      targetValue: val
    });
    setOtpSent(false);
    setSendingOtp(false);
    setGeneratedOtp('');
    setUserEnteredOtp('');
    setOtpVerifyError(null);
    setEnteredEmailConfirmation('');
    setEnteredPhoneConfirmation('');
  };

  const handleSendOtpHandshake = () => {
    setSendingOtp(true);
    setOtpVerifyError(null);
    
    setTimeout(() => {
      // 6 digit numeric code
      const code = Math.floor(100000 + Math.random() * 900000).toString();
      setGeneratedOtp(code);
      setSendingOtp(false);
      setOtpSent(true);
      triggerLocalNotification(`📡 Secure 2-Step OTP dispatched! Check confirmation parameters.`);
    }, 1200);
  };

  const handleVerifyOtpHandshake = () => {
    setOtpVerifyError(null);
    
    if (userEnteredOtp !== generatedOtp) {
      setOtpVerifyError('❌ Invalid 6-digit verification code. Please check code or request new dispatch.');
      return;
    }

    const cleanConfirmEmail = enteredEmailConfirmation.trim().toLowerCase();
    const cleanProfileEmail = profile.email.trim().toLowerCase();
    
    // Normalize phone number fields
    const cleanConfirmPhone = enteredPhoneConfirmation.replace(/\D/g, '');
    const cleanProfilePhone = profile.mobile.replace(/\D/g, '');

    if (!cleanConfirmEmail || cleanConfirmEmail !== cleanProfileEmail) {
      setOtpVerifyError('❌ Validation Failed: Provided email does not match registered profile inbox.');
      return;
    }

    if (!cleanConfirmPhone || !cleanProfilePhone.endsWith(cleanConfirmPhone)) {
      setOtpVerifyError('❌ Validation Failed: Provided mobile ends-with did not match registered phone digits.');
      return;
    }

    // Update credentials
    let updated;
    if (authModal?.type === 'password') {
      updated = { ...formData, securePassword: authModal.targetValue };
      setNewPassword('');
    } else {
      updated = { ...formData, securePIN: authModal.targetValue };
      setNewPIN('');
    }
    
    setFormData(updated);
    onUpdateProfile(updated);
    
    triggerLocalNotification(
      `✓ Credentials secure. ${
        authModal?.type === 'password' ? 'Password Key' : 'Transaction PIN'
      } updated successfully via Double Authentication!`
    );
    
    setAuthModal(null);
  };
  const [uploadedDocs, setUploadedDocs] = useState<string[]>([
    'Aadhaar_Card_Masked.pdf',
    'PAN_Card_Copy.pdf'
  ]);
  const [supportMessage, setSupportMessage] = useState('');
  const [showSupportSuccess, setShowSupportSuccess] = useState(false);
  const [localNotification, setLocalNotification] = useState<string | null>(null);
  const [showAdvisorList, setShowAdvisorList] = useState(false);
  const [selectedAdvisor, setSelectedAdvisor] = useState<Advisor | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showAccountNumber, setShowAccountNumber] = useState(false);
  const [showAadhaar, setShowAadhaar] = useState(false);
  const [showPan, setShowPan] = useState(false);

  const getFormattedAccountNumber = (accNum: string, isVisible: boolean) => {
    if (!accNum) return '••••••••';
    const cleanNum = accNum.replace(/\s+/g, '').toUpperCase();
    
    // Convert to a simulated continuous 12-digit Indian bank account number format
    let rawNum = cleanNum;
    if (cleanNum.startsWith('XXXX')) {
      const suffix = cleanNum.slice(4);
      rawNum = `30990821${suffix}`;
    } else if (cleanNum.includes('XXXX')) {
      rawNum = cleanNum.replace('XXXX', '5821');
    }
    
    // Apply standard continuous bank account masking or show raw
    if (isVisible) {
      return rawNum;
    } else {
      const suffix = rawNum.slice(-4);
      return `••••••••${suffix}`;
    }
  };

  const getFormattedAadhaar = (aadhaar: string, isVisible: boolean) => {
    if (!aadhaar) return '•••• •••• ••••';
    const cleanStr = aadhaar.replace(/[-\s]+/g, '');
    if (isVisible) {
      if (cleanStr.toUpperCase().startsWith('XXXX')) {
        const suffix = cleanStr.slice(8);
        return `5829 1803 ${suffix}`;
      }
      return cleanStr.replace(/(.{4})/g, '$1 ').trim();
    } else {
      if (cleanStr.toUpperCase().startsWith('XXXX')) {
        const suffix = cleanStr.slice(8);
        return `•••• •••• ${suffix}`;
      }
      const suffix = cleanStr.slice(-4);
      return `•••• •••• ${suffix}`;
    }
  };

  const getFormattedPan = (pan: string, isVisible: boolean) => {
    if (!pan) return '••••••••••';
    if (isVisible) {
      if (pan.toUpperCase().startsWith('XXXXXX')) {
        const suffix = pan.slice(6);
        return `ABCDE${suffix}`;
      }
      return pan;
    } else {
      if (pan.toUpperCase().startsWith('XXXXXX')) {
        const suffix = pan.slice(6);
        return `••••••${suffix}`;
      }
      const suffix = pan.slice(-4);
      return `••••••${suffix}`;
    }
  };

  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const startCamera = async () => {
    setCameraError(null);
    setIsCameraOpen(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { width: 320, height: 320, facingMode: 'user' } 
      });
      streamRef.current = stream;
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      }, 150);
    } catch (err: any) {
      console.warn("Camera API access failed, utilizing fallback simulation mode:", err);
      setCameraError("Camera hardware unavailable or permission denied. Showing secure mockup simulation capture.");
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setIsCameraOpen(false);
    setCameraError(null);
  };

  const capturePhoto = () => {
    if (!cameraError && videoRef.current) {
      try {
        const canvas = document.createElement('canvas');
        canvas.width = 300;
        canvas.height = 300;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(videoRef.current, 0, 0, 300, 300);
          const dataUrl = canvas.toDataURL('image/jpeg');
          const updated = { ...formData, photoUrl: dataUrl };
          setFormData(updated);
          onUpdateProfile(updated);
          triggerLocalNotification('✓ Captured new biometric profile photo successfully!');
          stopCamera();
        }
      } catch (err) {
        useFallbackPhoto();
      }
    } else {
      useFallbackPhoto();
    }
  };

  const useFallbackPhoto = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 300;
    canvas.height = 300;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const grad = ctx.createLinearGradient(0, 0, 300, 300);
      grad.addColorStop(0, '#ff5e9c');
      grad.addColorStop(1, '#b03bfc');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 300, 300);

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 24px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('APEX SECURITY', 150, 110);
      
      ctx.font = 'bold 80px sans-serif';
      ctx.fillText(formData.fullName ? formData.fullName.substring(0, 2).toUpperCase() : 'CU', 150, 195);
      
      ctx.font = '12px monospace';
      ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
      ctx.fillText('VERIFIED BIOMETRIC', 150, 240);

      const dataUrl = canvas.toDataURL('image/jpeg');
      const updated = { ...formData, photoUrl: dataUrl };
      setFormData(updated);
      onUpdateProfile(updated);
      triggerLocalNotification('✓ Snapshot simulated securely using high-contrast biometric backup!');
      stopCamera();
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const files = Array.from(e.target.files) as File[];
      const fileNames = files.map(file => file.name);
      setUploadedDocs(prev => [...prev, ...fileNames]);
      
      const updated = { ...formData, kycStatus: 'Verified' };
      setFormData(updated);
      onUpdateProfile(updated);
      
      triggerLocalNotification(`✓ Captured ${fileNames.length} document(s) successfully! KYC verification status: Verified.`);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const files = Array.from(e.dataTransfer.files) as File[];
      const fileNames = files.map(file => file.name);
      setUploadedDocs(prev => [...prev, ...fileNames]);
      
      const updated = { ...formData, kycStatus: 'Verified' };
      setFormData(updated);
      onUpdateProfile(updated);
      
      triggerLocalNotification(`✓ Placed ${fileNames.length} document(s) inside secure vault! KYC verification: Verified.`);
    }
  };

  const handleCopyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    triggerLocalNotification(`✓ Copied ${label}: ${text}`);
  };

  const triggerLocalNotification = (msg: string) => {
    setLocalNotification(msg);
    setTimeout(() => {
      setLocalNotification(null);
    }, 4500);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile(formData);
    setIsEditing(false);
    triggerLocalNotification('✓ Profile updated successfully!');
  };

  const triggerKycUpdate = () => {
    const updated = { ...formData, kycStatus: 'Verified' };
    setFormData(updated);
    onUpdateProfile(updated);
    triggerLocalNotification('✓ KYC Status updated successfully to Verified!');
  };

  const triggerDownloadStatement = () => {
    triggerLocalNotification('✓ Dynamic Statement compiled! Check your browser downloads for secure-report-' + formData.customerId + '.pdf');
  };

  const sendSupportTicket = (e: React.FormEvent) => {
    e.preventDefault();
    setShowAdvisorList(true);
    triggerLocalNotification('✓ Live Support link activated! Meet our Priority Banking Advisors.');
    if (!supportMessage.trim()) return;
    setShowSupportSuccess(true);
    setTimeout(() => {
      setShowSupportSuccess(false);
      setSupportMessage('');
    }, 3000);
  };

  return (
    <div className="bg-zinc-950/95 text-slate-100 p-6 rounded-3xl border border-white/10 max-w-4xl mx-auto my-4 shadow-2xl relative overflow-hidden backdrop-blur-xl">
      <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-pink-500/20 text-[#ff5e9c] flex items-center justify-center">
            <User className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gradient-neon font-display">Customer Profile Desk</h3>
            <p className="text-xs text-slate-400">Manage real-time personal registry, credentials, and KYC states.</p>
          </div>
        </div>
        <button 
          onClick={onClose}
          className="p-2 bg-white/5 hover:bg-white/10 hover:text-white rounded-full transition-all cursor-pointer text-slate-300 border border-white/5 flex items-center justify-center shadow-lg hover:border-white/20"
          title="Close Profile Drawer"
        >
          <X className="w-4 h-4 text-[#ff5e9c]" />
        </button>
      </div>

      {localNotification && (
        <div className="mb-4 p-3 bg-[#ff5e9c]/10 border border-[#ff5e9c]/20 text-[#ff5e9c] text-xs font-mono font-bold rounded-2xl text-center flex items-center justify-center gap-2">
          <span>{localNotification}</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column - Photo & Actions */}
        <div className="space-y-6">
          <div className="bg-zinc-900 border border-white/5 p-4 rounded-2xl text-center space-y-4">
            <div className="relative w-28 h-28 mx-auto">
              {isCameraOpen ? (
                <div className="w-full h-full rounded-2xl overflow-hidden bg-black border border-[#ff5e9c]/30 relative flex items-center justify-center">
                  {!cameraError ? (
                    <video
                      ref={videoRef}
                      autoPlay
                      playsInline
                      muted
                      className="w-full h-full object-cover transform -scale-x-100"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-tr from-[#2d243c] to-[#1c1718] flex flex-col items-center justify-center p-2 text-center select-none">
                      <span className="text-[10px] text-[#ff5e9c] font-black tracking-wider uppercase">SIMULATION</span>
                      <span className="text-[8px] text-slate-400 mt-1 leading-normal">Webcam active. Click action below!</span>
                    </div>
                  )}
                  {/* Subtle clean scan line indicator without bounce */}
                  <div className="absolute left-0 right-0 h-[1px] bg-[#ff5e9c]/40 top-1/2 pointer-events-none" />
                </div>
              ) : formData.photoUrl ? (
                <img 
                  src={formData.photoUrl} 
                  alt={formData.fullName} 
                  className="w-full h-full rounded-2xl object-cover border border-[#ff5e9c]/20" 
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="w-full h-full rounded-2xl bg-zinc-800 border border-white/10 flex items-center justify-center text-4xl text-[#ff5e9c] font-black">
                  {formData.fullName ? formData.fullName.substring(0, 2).toUpperCase() : 'CU'}
                </div>
              )}

              {isCameraOpen ? (
                <div className="absolute -bottom-3 inset-x-0 mx-auto flex items-center justify-center gap-1 z-10">
                  <button 
                    type="button"
                    onClick={stopCamera}
                    className="px-2 py-0.5 bg-zinc-950 border border-white/10 rounded-lg text-[9px] font-bold text-slate-300 hover:text-white cursor-pointer shadow-md transition-all active:scale-95"
                    title="Cancel Camera"
                  >
                    Cancel
                  </button>
                  <button 
                    type="button"
                    onClick={capturePhoto}
                    className="px-2 py-0.5 bg-gradient-to-r from-[#ff5e9c] to-[#b03bfc] rounded-lg text-[9px] font-bold text-white cursor-pointer shadow-md transition-all hover:scale-105 active:scale-95"
                    title="Take Snapshot"
                  >
                    Capture
                  </button>
                </div>
              ) : (
                <button 
                  type="button"
                  onClick={startCamera}
                  className="absolute -bottom-2 -right-2 p-2 bg-gradient-to-r from-[#ff5e9c] to-[#b03bfc] rounded-xl text-white cursor-pointer hover:shadow-lg transition-transform hover:scale-110 active:scale-95 duration-150 border border-white/20"
                  title="Click to Open Biometric Camera"
                >
                  <Camera className="w-4 h-4" />
                </button>
              )}
            </div>

            <div>
              <h4 className="font-bold text-slate-100 text-sm font-display">{formData.fullName}</h4>
              <p className="text-xs text-[#ff5e9c] font-mono mt-0.5">{formData.customerId}</p>
            </div>

            <div className="pt-2 border-t border-white/5 flex flex-col gap-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">KYC Status:</span>
                <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                  formData.kycStatus === 'Verified' 
                    ? 'bg-[#ff5e9c]/10 text-[#ff5e9c] border border-[#ff5e9c]/20' 
                    : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                }`}>
                  {formData.kycStatus === 'Verified' ? '✓ Verified' : '⚠ Action Required'}
                </span>
              </div>

              {formData.kycStatus !== 'Verified' && (
                <div className="text-left bg-amber-500/10 border border-amber-500/20 p-3 rounded-xl space-y-1.5 my-1">
                  <p className="text-[10px] font-bold text-amber-400 uppercase tracking-widest font-mono">How to complete verification:</p>
                  <ul className="list-disc list-inside text-[9.5px] text-amber-200/90 space-y-1 pl-0.5 leading-relaxed">
                    <li>Upload your national identity proof card (Aadhaar/PAN) in key file section.</li>
                    <li>Take a secure biometric photograph capture utilizing the profile avatar camera icon.</li>
                    <li>Click the <b>"Update KYC Status"</b> quick action button to run real-time checks.</li>
                  </ul>
                </div>
              )}

              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">Account Tier:</span>
                <span className="text-[#b03bfc] font-bold font-mono">CHIC PLATINUM</span>
              </div>
            </div>
          </div>

          {/* Quick Support / Contact Console */}
          <div className="bg-zinc-900 border border-white/5 p-4 rounded-2xl space-y-3">
            <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
              <HelpCircle className="w-3.5 h-3.5 text-[#ff5e9c]" /> Contact Support Terminal
            </h5>
            <form onSubmit={sendSupportTicket} className="space-y-2">
              <textarea
                value={supportMessage}
                onChange={(e) => setSupportMessage(e.target.value)}
                placeholder="Type your concern here to contact SupportDesk..."
                className="w-full h-16 bg-zinc-950 border border-white/10 rounded-xl p-2 text-xs text-slate-100 font-sans focus:outline-none focus:ring-1 focus:ring-[#ff5e9c]"
              />
              <button
                type="submit"
                className="w-full py-1.5 bg-[#b03bfc] hover:bg-[#ff5e9c] text-white rounded-xl text-xs font-bold shadow-lg shadow-[#b03bfc]/10 transition-all cursor-pointer flex items-center justify-center gap-1.5 border border-white/5"
              >
                <span>Connect to Advisor</span>
                <Sparkles className="w-3 h-3 text-white animate-pulse" />
              </button>
            </form>
            <div className="pt-2 border-t border-white/5">
              <button
                type="button"
                onClick={() => {
                  setShowAdvisorList(true);
                  triggerLocalNotification('✓ Quick Access Roster activated! Explore profiles & roles.');
                }}
                className="w-full py-1.5 px-3 border border-white/10 bg-zinc-950/40 hover:bg-zinc-950/80 text-[10px] text-slate-400 hover:text-white transition-all rounded-xl flex items-center justify-center gap-1.5 cursor-pointer font-bold uppercase tracking-wider"
              >
                <User className="w-3 h-3 text-[#ff5e9c]" />
                Browse Priority Representatives
              </button>
            </div>
            {showSupportSuccess && (
              <p className="text-[10px] text-[#ff5e9c] bg-[#ff5e9c]/10 p-2 rounded-lg text-center font-mono animate-pulse">
                ✓ Message sent! Support Representative will revert in 2 minutes.
              </p>
            )}
          </div>
        </div>

        {/* Right Columns - Detailed Form */}
        <div className="md:col-span-2 space-y-6 max-h-[500px] overflow-y-auto pr-2">
          
          {/* Quick Buttons Drawer */}
          <div className="grid grid-cols-2 gap-2">
            <button 
              onClick={() => setIsEditing(!isEditing)}
              className={`py-2 px-3 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                isEditing 
                  ? 'bg-[#ff5e9c]/20 text-[#ff5e9c] border-[#ff5e9c]/30' 
                  : 'bg-zinc-900 text-slate-300 border-white/5 hover:bg-zinc-800'
              }`}
            >
              {isEditing ? '✓ Lock Edit Mode' : '✎ Edit Profile'}
            </button>

            <button 
              onClick={triggerKycUpdate}
              className="py-2 px-3 text-xs font-bold bg-[#ff5e9c]/10 hover:bg-[#ff5e9c]/20 text-[#ff5e9c] border border-[#ff5e9c]/20 rounded-xl transition-all cursor-pointer"
            >
              ✓ Update KYC Status
            </button>
          </div>

          <form onSubmit={handleSaveProfile} className="space-y-6">
            
            {/* 1. Personal Information */}
            <div className="bg-zinc-900 border border-white/5 p-4 rounded-2xl space-y-4">
              <h5 className="text-xs font-bold uppercase tracking-wider text-gradient-neon">
                Personal Registration Ledger
              </h5>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] text-slate-400 font-mono">Full Legal Name</label>
                  <input 
                    type="text" 
                    value={formData.fullName} 
                    disabled={!isEditing}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    className="w-full bg-zinc-950 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-slate-100 focus:outline-[#ff5e9c] disabled:opacity-60"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] text-slate-400 font-mono">Customer Registry ID</label>
                  <input 
                    type="text" 
                    value={formData.customerId} 
                    disabled
                    className="w-full bg-zinc-950/50 border border-white/5 rounded-xl px-3 py-1.5 text-xs text-slate-400 font-mono"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] text-slate-400 font-mono">Date of Birth</label>
                  <input 
                    type="date" 
                    value={formData.dob} 
                    disabled={!isEditing}
                    onChange={(e) => handleInputChange('dob', e.target.value)}
                    className="w-full bg-zinc-950 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-slate-100 focus:outline-[#ff5e9c] disabled:opacity-60"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] text-slate-400 font-mono">Gender Group</label>
                  <select 
                    value={formData.gender} 
                    disabled={!isEditing}
                    onChange={(e) => handleInputChange('gender', e.target.value)}
                    className="w-full bg-zinc-950 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-slate-100 focus:outline-[#ff5e9c] disabled:opacity-60"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Non-binary">Non-binary</option>
                    <option value="Declined">Prefer not to say</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] text-slate-400 font-mono">Nationality Jurisdiction</label>
                  <input 
                    type="text" 
                    value={formData.nationality} 
                    disabled={!isEditing}
                    onChange={(e) => handleInputChange('nationality', e.target.value)}
                    className="w-full bg-zinc-950 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-slate-100 focus:outline-[#ff5e9c] disabled:opacity-60"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] text-slate-400 font-mono">Profile Photo Link</label>
                  <input 
                    type="text" 
                    value={formData.photoUrl} 
                    disabled={!isEditing}
                    placeholder="https://images.unsplash.com/... (optional)"
                    onChange={(e) => handleInputChange('photoUrl', e.target.value)}
                    className="w-full bg-zinc-950 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-slate-100 focus:outline-[#ff5e9c] disabled:opacity-60"
                  />
                </div>
              </div>
            </div>

            {/* 2. Contact Information */}
            <div className="bg-zinc-900 border border-white/5 p-4 rounded-2xl space-y-4">
              <h5 className="text-xs font-bold uppercase tracking-wider text-gradient-neon">
                📞 Critical Contact Info
              </h5>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] text-slate-400 font-mono">Primary Mobile Number</label>
                  <input 
                    type="text" 
                    value={formData.mobile} 
                    disabled={!isEditing}
                    onChange={(e) => handleInputChange('mobile', e.target.value)}
                    className="w-full bg-zinc-950 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-slate-100 focus:outline-[#ff5e9c]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] text-slate-400 font-mono">Alternate Contact Number</label>
                  <input 
                    type="text" 
                    value={formData.altMobile} 
                    disabled={!isEditing}
                    onChange={(e) => handleInputChange('altMobile', e.target.value)}
                    className="w-full bg-zinc-950 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-slate-100 focus:outline-[#ff5e9c]"
                  />
                </div>

                <div className="space-y-1 sm:col-span-2">
                  <label className="text-[10px] text-slate-400 font-mono">Registered Email Address</label>
                  <input 
                    type="email" 
                    value={formData.email} 
                    disabled={!isEditing}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full bg-zinc-950 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-slate-100 focus:outline-[#ff5e9c]"
                  />
                </div>

                <div className="space-y-1 sm:col-span-2">
                  <label className="text-[10px] text-slate-400 font-mono">Residential Address</label>
                  <input 
                    type="text" 
                    value={formData.address} 
                    disabled={!isEditing}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    className="w-full bg-zinc-950 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-slate-100 focus:outline-[#ff5e9c]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] text-slate-400 font-mono">City / District</label>
                  <input 
                    type="text" 
                    value={formData.city} 
                    disabled={!isEditing}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    className="w-full bg-zinc-950 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-slate-100 focus:outline-[#ff5e9c]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] text-slate-400 font-mono">State / Union Territory</label>
                  <input 
                    type="text" 
                    value={formData.state} 
                    disabled={!isEditing}
                    onChange={(e) => handleInputChange('state', e.target.value)}
                    className="w-full bg-zinc-950 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-slate-100 focus:outline-[#ff5e9c]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] text-slate-400 font-mono">PIN Code / Postal code</label>
                  <input 
                    type="text" 
                    value={formData.pinCode} 
                    disabled={!isEditing}
                    onChange={(e) => handleInputChange('pinCode', e.target.value)}
                    className="w-full bg-zinc-950 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-slate-100 focus:outline-[#ff5e9c]"
                  />
                </div>
              </div>
            </div>

            {/* 3. Account Information */}
            <div className="bg-zinc-900 border border-white/5 p-4 rounded-2xl space-y-4">
              <h5 className="text-xs font-bold uppercase tracking-wider text-gradient-neon">
                🏦 Live Account Registry Ledger
              </h5>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] text-slate-400 font-mono">Account Number</label>
                  <div className="relative flex items-center max-w-[280px]">
                    <input 
                      type="text" 
                      value={getFormattedAccountNumber(formData.accountNumber, showAccountNumber)} 
                      disabled
                      className="w-full bg-zinc-950/60 border border-white/5 rounded-xl pl-3 pr-10 py-1.5 text-xs text-slate-350 cursor-not-allowed font-mono font-bold"
                    />
                    <button
                      type="button"
                      onClick={() => setShowAccountNumber(!showAccountNumber)}
                      className="absolute right-2 p-1 hover:bg-white/5 rounded-lg cursor-pointer text-slate-400 hover:text-[#ff5e9c] transition-all flex items-center justify-center"
                      title={showAccountNumber ? "Hide Account Number" : "Reveal Account Number"}
                    >
                      {showAccountNumber ? <EyeOff className="w-4 h-4 text-[#ff5e9c]" /> : <Eye className="w-4 h-4 text-[#ff5e9c]" />}
                    </button>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] text-slate-400 font-mono">Account Classification Type</label>
                  <input 
                    type="text" 
                    value={formData.accountType} 
                    disabled
                    className="w-full bg-zinc-950/60 border border-white/5 rounded-xl px-3 py-1.5 text-xs text-slate-350 cursor-not-allowed"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] text-slate-400 font-mono">Assigned Hub Branch</label>
                  <input 
                    type="text" 
                    value={formData.branchName} 
                    disabled
                    className="w-full bg-zinc-950/60 border border-white/5 rounded-xl px-3 py-1.5 text-xs text-slate-350 cursor-not-allowed"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] text-slate-400 font-mono">IFSC Route Code</label>
                  <input 
                    type="text" 
                    value={formData.ifscCode} 
                    disabled
                    className="w-full bg-zinc-950/60 border border-white/5 rounded-xl px-3 py-1.5 text-xs text-slate-350 cursor-not-allowed font-mono"
                  />
                </div>

                <div className="space-y-1 font-mono">
                  <label className="text-[10px] text-slate-400 font-mono">Relationship Opening Date</label>
                  <input 
                    type="text" 
                    value={formData.openingDate} 
                    disabled
                    className="w-full bg-zinc-950/60 border border-white/5 rounded-xl px-3 py-1.5 text-xs text-slate-350 cursor-not-allowed"
                  />
                </div>
              </div>
            </div>

            {/* 4. Credentials Security Settings */}
            <div className="bg-zinc-900 border border-white/5 p-4 rounded-2xl space-y-4">
              <h5 className="text-xs font-bold uppercase tracking-wider text-gradient-neon">
                🔐 Credentials & Identity Security
              </h5>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2 p-3 bg-zinc-950/40 border border-white/5 rounded-xl flex flex-col justify-between">
                  <div className="space-y-1">
                    <label className="text-[10px] text-pink-400 font-mono font-bold">Change Password Key</label>
                    <input 
                      type="password" 
                      placeholder="Type new secure password..."
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full bg-zinc-950 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-slate-100 focus:outline-[#ff5e9c]"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => startDoubleAuth('password', newPassword)}
                    className="w-full mt-2 py-1.5 bg-[#ff5e9c]/15 text-[#ff5e9c] hover:bg-[#ff5e9c] hover:text-white border border-[#ff5e9c]/30 text-[10px] font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-sm active:scale-95"
                  >
                    <Lock className="w-3.5 h-3.5" /> Double Authentication & Save
                  </button>
                </div>

                <div className="space-y-2 p-3 bg-zinc-950/40 border border-white/5 rounded-xl flex flex-col justify-between">
                  <div className="space-y-1">
                    <label className="text-[10px] text-purple-400 font-mono font-bold">Change Transaction PIN (4-Digit PIN)</label>
                    <input 
                      type="password" 
                      maxLength={4}
                      placeholder="e.g. 1234"
                      value={newPIN}
                      onChange={(e) => setNewPIN(e.target.value.replace(/\D/g, ''))}
                      className="w-full bg-zinc-950 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-slate-100 focus:outline-[#ff5e9c] font-mono text-center tracking-widest"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => startDoubleAuth('pin', newPIN)}
                    className="w-full mt-2 py-1.5 bg-purple-500/15 text-purple-400 hover:bg-purple-500 hover:text-white border border-purple-500/30 text-[10px] font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-sm active:scale-95"
                  >
                    <Key className="w-3.5 h-3.5" /> Double Authentication & Save
                  </button>
                </div>

                <div className="space-y-1 text-xs">
                  <label className="text-[10px] text-slate-400 font-mono">Aadhaar Number</label>
                  <div className="relative flex items-center max-w-[280px]">
                    <input 
                      type="text" 
                      disabled
                      value={getFormattedAadhaar(formData.aadhaarNumber, showAadhaar)} 
                      className="w-full bg-zinc-950/60 border border-white/5 rounded-xl pl-3 pr-10 py-1.5 text-xs text-slate-400 font-mono font-bold"
                    />
                    <button
                      type="button"
                      onClick={() => setShowAadhaar(!showAadhaar)}
                      className="absolute right-2 p-1 hover:bg-white/5 rounded-lg cursor-pointer text-slate-400 hover:text-[#ff5e9c] transition-all flex items-center justify-center"
                      title={showAadhaar ? "Hide Aadhaar Number" : "Reveal Aadhaar Number"}
                    >
                      {showAadhaar ? <EyeOff className="w-4 h-4 text-[#ff5e9c]" /> : <Eye className="w-4 h-4 text-[#ff5e9c]" />}
                    </button>
                  </div>
                </div>

                <div className="space-y-1 text-xs">
                  <label className="text-[10px] text-slate-400 font-mono">PAN Number</label>
                  <div className="relative flex items-center max-w-[280px]">
                    <input 
                      type="text" 
                      disabled
                      value={getFormattedPan(formData.panNumber, showPan)} 
                      className="w-full bg-zinc-950/60 border border-white/5 rounded-xl pl-3 pr-10 py-1.5 text-xs text-slate-400 font-mono font-bold"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPan(!showPan)}
                      className="absolute right-2 p-1 hover:bg-white/5 rounded-lg cursor-pointer text-slate-400 hover:text-[#ff5e9c] transition-all flex items-center justify-center"
                      title={showPan ? "Hide PAN Number" : "Reveal PAN Number"}
                    >
                      {showPan ? <EyeOff className="w-4 h-4 text-[#ff5e9c]" /> : <Eye className="w-4 h-4 text-[#ff5e9c]" />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Upload Documents Drawer */}
              <div className="pt-4 border-t border-white/5 space-y-3">
                <p className="text-xs font-bold text-slate-300">Identity Documents Ledger & eKYC</p>
                
                {/* Hidden File Input */}
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  multiple
                  accept=".pdf,.png,.jpg,.jpeg"
                  className="hidden"
                />

                <div 
                  onClick={() => fileInputRef.current?.click()}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  className={`border border-dashed rounded-2xl p-4 text-center cursor-pointer transition-all duration-200 ${
                    isDragging 
                      ? 'border-[#ff5e9c]/80 bg-[#ff5e9c]/10 scale-[1.01]' 
                      : 'border-white/10 bg-zinc-950 hover:bg-zinc-900/50 hover:border-[#ff5e9c]/30'
                  }`}
                >
                  <Upload className={`w-6 h-6 mx-auto mb-2 transition-transform duration-200 ${isDragging ? 'text-[#00efd1] scale-110' : 'text-[#ff5e9c]'}`} />
                  <p className="text-xs text-slate-300 font-medium">Click to select compliance files or Drag & Drop here</p>
                  <p className="text-[10px] text-slate-500 mt-1 font-mono">Supports PDF, PNG, JPG (eKYC updates instantly on success)</p>
                </div>

                <div className="flex flex-wrap gap-2 pt-1">
                  {uploadedDocs.map((doc, idx) => (
                    <div key={idx} className="flex items-center gap-2 px-3 py-1.5 bg-zinc-950 border border-white/10 rounded-xl text-[10px] font-mono select-none">
                      <FileText className="w-3.5 h-3.5 text-[#ff5e9c]" />
                      <span className="truncate max-w-[150px] text-slate-300">{doc}</span>
                      <span className="text-[#ff5e9c] font-bold text-[9px] shrink-0">✓ Uploaded</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {isEditing && (
              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 bg-zinc-900 border border-white/5 hover:bg-zinc-800 rounded-xl text-xs font-semibold text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#ff5e9c] text-white hover:bg-[#b03bfc] rounded-xl text-xs font-bold shadow-lg shadow-[#ff5e9c]/10"
                >
                  ✓ Save Profile Changes
                </button>
              </div>
            )}

          </form>
        </div>
      </div>

      {/* Live Executive Advisor Directory Modal */}
      <AnimatePresence>
        {showAdvisorList && (
          <div className="fixed inset-0 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              className="bg-zinc-950/95 border border-white/10 p-6 rounded-3xl max-w-xl w-full shadow-2xl relative overflow-hidden text-slate-100 max-h-[90vh] flex flex-col"
            >
              {/* Decorative top ambient light bar */}
              <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-[#ff5e9c] via-[#b03bfc] to-[#00efd1]" />

              {/* Modal header */}
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/5">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-[#b03bfc]/10 rounded-lg text-[#b03bfc]">
                    <Briefcase className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-slate-100 text-sm flex items-center gap-1.5">
                      <span>Apex Priority Advisory Registry</span>
                      <Sparkles className="w-3.5 h-3.5 text-[#ff5e9c]" />
                    </h3>
                    <p className="text-[10px] text-slate-400">Direct secured pathways to certified banking specialists</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setShowAdvisorList(false);
                    setSelectedAdvisor(null);
                  }}
                  className="p-1 bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white rounded-lg transition-colors cursor-pointer"
                  title="Close Directory"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Directory Content Area */}
              <div className="space-y-4 overflow-y-auto flex-1 pr-1">
                {!selectedAdvisor ? (
                  <>
                    <p className="text-[11px] text-slate-400 leading-snug">
                      As an elite <span className="text-[#b03bfc] font-semibold">Chic Platinum</span> account holder, you have unfiltered, direct access to our core advisory desks. Choose an agent in your respective segment below to retrieve contact channels:
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                      {SUPPORT_ADVISORS.map((advisor) => (
                        <div
                          key={advisor.id}
                          onClick={() => setSelectedAdvisor(advisor)}
                          className="p-4 bg-zinc-900/60 border border-white/5 hover:border-[#ff5e9c]/30 rounded-2xl flex items-center gap-3 cursor-pointer hover:bg-zinc-900 transition-all group duration-200"
                        >
                          <img
                            src={advisor.avatar}
                            alt={advisor.name}
                            className="w-12 h-12 rounded-xl object-cover border border-white/10 shrink-0 group-hover:scale-105 transition-transform"
                            referrerPolicy="no-referrer"
                          />
                          <div className="min-w-0 flex-1">
                            <h4 className="text-xs font-bold text-slate-200 truncate group-hover:text-white">{advisor.name}</h4>
                            <p className="text-[10px] text-slate-400 mt-1 truncate max-w-full">{advisor.role}</p>
                            <span className="text-[8px] bg-[#ff5e9c]/10 text-[#ff5e9c] border border-[#ff5e9c]/20 px-1.5 py-0.5 rounded-full inline-block mt-2 font-semibold">
                              Retrieve Details →
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-4"
                  >
                    {/* Back to roster button */}
                    <button
                      type="button"
                      onClick={() => setSelectedAdvisor(null)}
                      className="px-2.5 py-1 text-[10px] font-bold text-slate-400 hover:text-white flex items-center gap-1 hover:bg-white/5 rounded-lg transition-colors cursor-pointer"
                    >
                      <ArrowLeft className="w-3 h-3" /> Back to Advisor Catalog
                    </button>

                    {/* Advisor detailed card */}
                    <div className="p-5 bg-gradient-to-b from-zinc-900 to-zinc-900/30 rounded-2xl border border-[#ff5e9c]/20 relative overflow-hidden">
                      {/* Ambient micro-glow effect */}
                      <div className="absolute top-0 right-0 w-24 h-24 bg-[#ff5e9c]/5 rounded-full blur-xl pointer-events-none" />

                      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 pb-4 border-b border-white/5">
                        <img
                          src={selectedAdvisor.avatar}
                          alt={selectedAdvisor.name}
                          className="w-16 h-16 rounded-2xl object-cover border-2 border-[#ff5e9c]/20 shadow-lg shadow-black/40 shrink-0"
                          referrerPolicy="no-referrer"
                        />
                        <div className="text-center sm:text-left min-w-0 flex-1">
                          <h4 className="font-display font-bold text-base text-slate-100">{selectedAdvisor.name}</h4>
                          <p className="text-xs text-[#ff5e9c] font-medium mt-0.5">{selectedAdvisor.role}</p>
                          <span className="inline-flex items-center gap-1 mt-1.5 px-2 py-0.5 rounded bg-[#ff5e9c]/10 text-[#ff5e9c] border border-[#ff5e9c]/20 text-[9px] font-bold uppercase tracking-wider">
                            ● Direct Line Ready
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                        {/* Secured Direct Mobile */}
                        <div className="p-3 bg-zinc-950/85 border border-white/5 rounded-xl space-y-1.5 align-middle">
                          <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider block">Secured Direct Phone</span>
                          <div className="flex items-center justify-between">
                            <span className="font-mono text-xs font-semibold text-slate-200 select-all">{selectedAdvisor.phone}</span>
                            <button
                              type="button"
                              onClick={() => handleCopyToClipboard(selectedAdvisor.phone, 'Phone number')}
                              className="p-1 bg-white/5 hover:bg-white/10 text-slate-350 hover:text-white rounded-lg transition-colors cursor-pointer"
                              title="Copy Contact Number"
                            >
                              <Copy className="w-3.5 h-3.5 text-[#ff5e9c]" />
                            </button>
                          </div>
                        </div>

                        {/* Professional Email */}
                        <div className="p-3 bg-zinc-950/85 border border-white/5 rounded-xl space-y-1.5 align-middle">
                          <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider block">Professional Email</span>
                          <div className="flex items-center justify-between">
                            <span className="font-mono text-xs font-semibold text-slate-200 select-all truncate max-w-[150px]">{selectedAdvisor.email}</span>
                            <button
                              type="button"
                              onClick={() => handleCopyToClipboard(selectedAdvisor.email, 'Email address')}
                              className="p-1 bg-white/5 hover:bg-white/10 text-slate-350 hover:text-white rounded-lg transition-colors cursor-pointer"
                              title="Copy Email Address"
                            >
                              <Copy className="w-3.5 h-3.5 text-[#ff5e9c]" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="text-center p-3.5 bg-[#b03bfc]/5 border border-[#b03bfc]/10 rounded-2xl">
                      <p className="text-[10px] text-slate-400 leading-snug">
                        💡 Click the copy button next to either contact channel above to add to your clipboards, and securely contact standard SMS/Call or client email pathways to establish a transaction loop.
                      </p>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="mt-4 pt-3 border-t border-white/5 flex justify-end">
                <button
                  type="button"
                  onClick={() => {
                    setShowAdvisorList(false);
                    setSelectedAdvisor(null);
                  }}
                  className="px-4 py-2 bg-zinc-900 border border-white/5 hover:bg-zinc-800 text-slate-300 hover:text-white rounded-xl text-xs font-semibold transition-all cursor-pointer"
                >
                  Close Registry
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 2FA Multi-Factor Double Authentication Modal */}
      <AnimatePresence>
        {authModal && authModal.isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 20 }}
              animate={{ 
                scale: 1, 
                opacity: 1, 
                y: 0,
                transition: { type: "spring", stiffness: 350, damping: 25 }
              }}
              exit={{ scale: 0.92, opacity: 0, y: 15 }}
              className="bg-zinc-950 border border-white/10 p-6 rounded-3xl max-w-sm w-full shadow-2xl relative overflow-hidden text-slate-100"
            >
              <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-pink-500 via-[#b03bfc] to-purple-500" />
              
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/5">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-pink-500/10 rounded-xl text-pink-500">
                    <ShieldCheck className="w-5 h-5 animate-pulse" />
                  </div>
                  <div>
                    <h3 className="font-display font-black text-xs text-slate-100 tracking-wider uppercase">
                      APEX SECURITIES GATEWAY
                    </h3>
                    <p className="text-[10px] text-pink-400 font-bold font-mono">Multi-Factor Double Auth</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setAuthModal(null)}
                  className="p-1.5 bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white rounded-lg transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-4">
                <div className="bg-zinc-900/60 border border-white/5 p-3.5 rounded-2xl text-[11px] leading-relaxed text-slate-300">
                  <span className="font-bold text-[#ff5e9c]">🔒 Secure Authorization Required</span>
                  <p className="mt-1">
                    To finalize updating your <span className="font-black text-white font-mono uppercase text-pink-400">{authModal.type === 'password' ? 'Password Key' : 'Transaction PIN'}</span>, you must complete a multi-channel double-authentication handshake verification.
                  </p>
                </div>

                {/* Confirmations details */}
                <div className="space-y-3">
                  <div className="space-y-1">
                    <label className="text-[9px] text-slate-400 font-mono font-bold uppercase tracking-wider">
                      Verify Registered Email Address
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        placeholder="e.g. andrew.forbist@apex.com"
                        value={enteredEmailConfirmation}
                        onChange={(e) => setEnteredEmailConfirmation(e.target.value)}
                        className="w-full bg-zinc-950 border border-white/10 rounded-xl pl-8 pr-3 py-2 text-xs text-slate-200 font-semibold focus:outline-none focus:border-pink-500"
                      />
                      <Mail className="w-3.5 h-3.5 text-slate-505 absolute left-3 top-3.5" />
                    </div>
                    <span className="text-[9px] text-slate-500 block">Registered: {profile.email}</span>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[9px] text-slate-400 font-mono font-bold uppercase tracking-wider">
                      Verify Registered Mobile Number (10 Digits)
                    </label>
                    <div className="relative">
                      <input
                        type="tel"
                        placeholder="e.g. 9876543210"
                        value={enteredPhoneConfirmation}
                        onChange={(e) => setEnteredPhoneConfirmation(e.target.value.replace(/\D/g, ''))}
                        maxLength={10}
                        className="w-full bg-zinc-950 border border-white/10 rounded-xl pl-8 pr-3 py-2 text-xs text-slate-200 font-mono focus:outline-none focus:border-purple-500"
                      />
                      <Phone className="w-3.5 h-3.5 text-slate-505 absolute left-3 top-3.5" />
                    </div>
                    <span className="text-[9px] text-slate-500 block">Registered: {profile.mobile}</span>
                  </div>
                </div>

                {!otpSent ? (
                  <button
                    type="button"
                    disabled={sendingOtp || !enteredEmailConfirmation || !enteredPhoneConfirmation}
                    onClick={handleSendOtpHandshake}
                    className="w-full py-2.5 bg-gradient-to-r from-pink-500 to-[#b03bfc] hover:opacity-90 text-white rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed shadow-lg shadow-pink-500/10 flex items-center justify-center gap-2"
                  >
                    {sendingOtp ? (
                      <>
                        <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Generating security keys...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-3.5 h-3.5" /> Generate Dual OTP Handshake
                      </>
                    )}
                  </button>
                ) : (
                  <div className="space-y-3.5 border-t border-white/5 pt-3 animate-fade-in">
                    <div className="bg-emerald-500/10 border border-emerald-500/20 px-3 py-2.5 rounded-xl">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                        <span className="text-[10px] text-emerald-400 font-bold uppercase font-mono tracking-wider">
                          MFA Payloads Dispatched
                        </span>
                      </div>
                      <p className="text-[10px] text-slate-350 mt-1">
                        Secure transaction tokens have been multiplexed to your confirmed inbox and mobile SMS streams.
                      </p>
                      
                      <div className="mt-2.5 p-1.5 bg-zinc-950 border border-emerald-500/30 rounded-xl flex items-center justify-between">
                        <span className="text-[9px] text-emerald-400 font-mono font-bold tracking-wider uppercase ml-1">Simulated OTP:</span>
                        <span className="font-mono text-xs font-black text-white bg-emerald-500 px-2 py-0.5 rounded-lg tracking-widest">{generatedOtp}</span>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] text-slate-400 font-mono font-bold uppercase tracking-wider block">
                        Enter 6-Digit Handshake OTP
                      </label>
                      <input
                        type="text"
                        maxLength={6}
                        placeholder="••••••"
                        value={userEnteredOtp}
                        onChange={(e) => setUserEnteredOtp(e.target.value.replace(/\D/g, ''))}
                        className="w-full bg-zinc-950 border border-pink-500/30 rounded-xl px-3 py-2 text-center text-lg font-black tracking-widest text-[#ff5e9c] focus:outline-none focus:border-pink-500 font-mono"
                      />
                    </div>

                    {otpVerifyError && (
                      <p className="text-[10px] text-rose-500 bg-rose-500/10 p-2.5 rounded-xl font-medium animate-shake text-center border border-rose-500/10 leading-relaxed">
                        {otpVerifyError}
                      </p>
                    )}

                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={handleSendOtpHandshake}
                        className="py-2.5 bg-zinc-900 border border-white/5 hover:bg-zinc-800 text-slate-450 hover:text-white rounded-xl text-xs font-bold uppercase tracking-wider cursor-pointer"
                      >
                        Resend Code
                      </button>
                      <button
                        type="button"
                        onClick={handleVerifyOtpHandshake}
                        className="py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-xs font-black uppercase tracking-wider cursor-pointer shadow-lg shadow-emerald-500/10 flex items-center justify-center gap-1.5 animate-pulse"
                      >
                        <Check className="w-4 h-4" /> Verify & Update
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
