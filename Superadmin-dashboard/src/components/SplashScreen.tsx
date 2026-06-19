import { motion } from 'motion/react';
import BrandLogo from './BrandLogo';

export default function SplashScreen() {
  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-gradient-to-br from-[#FFF5FA] via-[#FDF0F7] to-[#F9E6F1] overflow-hidden"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1, ease: "easeInOut" }}
    >
      {/* Background Decorative Elements */}
      <div className="absolute top-[-100px] left-[-150px] w-[500px] h-[350px] bg-gradient-to-br from-[#FF7AD9]/20 to-transparent rounded-full filter blur-[60px] animate-float-1" />
      <div className="absolute bottom-[-150px] right-[-200px] w-[600px] h-[450px] bg-gradient-to-tr from-[#E86CFF]/20 to-transparent rounded-full filter blur-[70px] animate-float-2" />

      <motion.div
        className="relative z-10 flex flex-col items-center gap-8"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
      >
        <div className="relative">
          <BrandLogo size={120} className="shadow-2xl border-4 border-white" />
          <motion.div
            className="absolute inset-0 rounded-full bg-pink-400/20 blur-2xl -z-10"
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          />
        </div>

        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-4xl font-extrabold text-[#40304D] tracking-tighter">
            APEX BANK
          </h1>
          <div className="flex items-center gap-3">
            <div className="h-[1px] w-8 bg-[#C26AA8]/30" />
            <p className="text-[#C26AA8] font-bold tracking-[0.2em] text-xs uppercase">
              Super Admin Portal
            </p>
            <div className="h-[1px] w-8 bg-[#C26AA8]/30" />
          </div>
        </div>

        <div className="flex flex-col items-center gap-4 mt-8">
          <div className="w-48 h-1 bg-[#F7B6D8]/30 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-[#FF6BCB] to-[#C78CFF]"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 2.5, ease: "easeInOut" }}
            />
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-pink-500 animate-pulse" />
            <p className="text-[#A38BA7] text-[10px] font-bold uppercase tracking-widest">
              Initializing Sovereign Terminal...
            </p>
          </div>
        </div>
      </motion.div>

      <div className="absolute bottom-12 text-[10px] text-[#A38BA7] font-mono tracking-widest opacity-50">
        VERSION 5.4.12 · HSM ENCRYPTED · PORT 3000
      </div>
    </motion.div>
  );
}
