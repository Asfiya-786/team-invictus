import fs from 'fs';

let file = 'src/components/CreditCards.tsx';
let txt = fs.readFileSync(file, 'utf8');

const applyColorFixes = (text) => {
  let modified = text;
  modified = modified.replace(/bg-\[\#070c2e\]\/60 border border-\[\#17235a\]\/60/g, 'bg-white/50 border border-pink-200');
  
  modified = modified.replace(/text-amber-500/g, 'text-pink-600');
  modified = modified.replace(/text-amber-400/g, 'text-pink-600');
  modified = modified.replace(/bg-amber-400/g, 'bg-pink-500');
  
  modified = modified.replace(/bg-\[\#0b123a\]\/50 border border-\[\#121c4b\]/g, 'bg-pink-100/50 border border-pink-200');
  modified = modified.replace(/text-\[\#8495bc\]/g, 'text-[#3a2072]/60');
  
  modified = modified.replace(/text-white/g, 'text-[#3a2072]');
  
  modified = modified.replace(/border-\[\#17235a\]\/40/g, 'border-pink-200');
  modified = modified.replace(/text-slate-400/g, 'text-[#3a2072]/70');
  modified = modified.replace(/text-slate-300/g, 'text-[#3a2072]');
  modified = modified.replace(/text-slate-500/g, 'text-[#3a2072]/50');
  
  modified = modified.replace(/text-\[\#d4af37\]/g, 'text-pink-600');
  modified = modified.replace(/bg-slate-900/g, 'bg-pink-200');
  
  modified = modified.replace(/bg-\[\#090e31\]/g, 'bg-pink-50');
  modified = modified.replace(/border-\[\#1b2559\]\/30/g, 'border-pink-200');
  
  // Chart tooltips or buttons
  modified = modified.replace(/bg-\[\#0c143d\]/g, 'bg-pink-100');
  modified = modified.replace(/border-\[\#1b2559\]/g, 'border-pink-300');
  
  return modified;
};

// Locate the block inside Super Admin card center to apply text fixes
const marker1 = "<AnimatePresence mode=\"wait\">";
const marker2 = "</div>\n    </div>"; // The end of the credit card management wrapper
const idx1 = txt.indexOf(marker1, 30000); // skip early ones if any
// Let's just find "Super Admin Financial Card Center" to bound our search
const startH2 = txt.indexOf("Super Admin Financial Card Center");

if (startH2 !== -1) {
  const anPresStart = txt.indexOf("<AnimatePresence mode=\"wait\">", startH2);
  const endSection = txt.indexOf("{/* ----------------- CUSTOMER CARDS DATABASE ----------------- */}", startH2);
  
  if (anPresStart !== -1 && endSection !== -1) {
    const sectionToReplace = txt.substring(anPresStart, endSection);
    
    // BUT we must not break the card fronts which we just styled with text-white!
    // The card front has: "bg-gradient-to-tr from-[#3a2072]" ... inside `group cursor-pointer`
    // Let's replace colors ONLY in the stats areas.
    const chunks = sectionToReplace.split(/\{?\/\*.*?\*\/\}?/);
    // Alternatively, let's target specific structures that act as the dashboards.
    let updatedSection = sectionToReplace;
    updatedSection = updatedSection.replace(/<div className="p-5 rounded-2xl bg-\[\#070c2e\]\/60 border border-\[\#17235a\]\/60 flex flex-col justify-between">([\s\S]*?)<\/div>\n\n              {\/\* Transactions Ledger/g, (match) => applyColorFixes(match));
    updatedSection = updatedSection.replace(/{\/\* Transactions Ledger for backup lines \*\/}([\s\S]*?)<\/motion\.div>/g, (match) => applyColorFixes(match));
    updatedSection = updatedSection.replace(/{\/\* Quick Action Buttons \*\/}([\s\S]*?)<\/div>(?=\s*<\/div>)/g, (match) => applyColorFixes(match));

    // Also do the personal card stats.
    updatedSection = updatedSection.replace(/<div className="p-5 rounded-2xl bg-\[\#070c2e\]\/60 border border-\[\#17235a\]\/60">([\s\S]*?)<\/div>\n\n              {\/\* Rewards Activity/g, (match) => applyColorFixes(match));
    updatedSection = updatedSection.replace(/{\/\* Rewards Activity for Personal Usage \*\/}([\s\S]*?)<\/motion\.div>/g, (match) => applyColorFixes(match));
    updatedSection = updatedSection.replace(/{\/\* Switch Actions \*\/}([\s\S]*?)<\/div>\n              <\/div>/g, (match) => applyColorFixes(match));

    txt = txt.substring(0, anPresStart) + updatedSection + txt.substring(endSection);
    fs.writeFileSync(file, txt);
    console.log("Success");
  } else {
    console.log("Could not find boundaries");
  }
} else {
  console.log("Could not find start");
}


