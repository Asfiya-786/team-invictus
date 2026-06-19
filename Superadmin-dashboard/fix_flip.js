import fs from 'fs';

let content = fs.readFileSync('src/components/CreditCards.tsx', 'utf8');

// 1. useState
content = content.replace(
  /const \[isCardFlipped, setIsCardFlipped\] = useState\(false\);/,
  "const [flippedInstance, setFlippedInstance] = useState<string | null>(null);"
);

// 2. handleCardInteraction
const oldHandle = `  const handleCardInteraction = () => {
    if (clickTimer.current) {
      clearTimeout(clickTimer.current);
      clickTimer.current = null;
      setShowIntelligence(true);
      setIsCardFlipped(false); // Reset flip on intelligence view
      addAuditLog(\`Super Admin accessed Credit Intelligence for terminal ref: \${selectedCardId || 'N/A'}\`, 'Info');
    } else {
      clickTimer.current = setTimeout(() => {
        setIsCardFlipped(!isCardFlipped);
        clickTimer.current = null;
      }, 300);
    }
  };`;

const newHandle = `  const handleCardInteraction = (instance: string = 'bottom') => {
    if (clickTimer.current) {
      clearTimeout(clickTimer.current);
      clickTimer.current = null;
      setShowIntelligence(true);
      setFlippedInstance(null); // Reset flip on intelligence view
      addAuditLog(\`Super Admin accessed Credit Intelligence for terminal ref: \${selectedCardId || 'N/A'}\`, 'Info');
    } else {
      clickTimer.current = setTimeout(() => {
        setFlippedInstance(prev => prev === instance ? null : instance);
        clickTimer.current = null;
      }, 300);
    }
  };`;

content = content.replace(oldHandle, newHandle);

// 3. Reset effects
content = content.replace(/setIsCardFlipped\(false\);/g, "setFlippedInstance(null);");

// 4. Tab clicks (already converted by above if they use setIsCardFlipped(false))

// 5. handleCardInteraction calls
content = content.replace(
  /setSelectedCardId\('SUPER-OFFICIAL'\);\s*\}\s*handleCardInteraction\(\);/g,
  "setSelectedCardId('SUPER-OFFICIAL');\n                    }\n                    handleCardInteraction('top-official');"
);

content = content.replace(
  /setSelectedCardId\('SUPER-PERSONAL'\);\s*\}\s*handleCardInteraction\(\);/g,
  "setSelectedCardId('SUPER-PERSONAL');\n                    }\n                    handleCardInteraction('top-personal');"
);

// The bottom one uses onClick={handleCardInteraction}
content = content.replace(
  /onClick={handleCardInteraction}/g,
  "onClick={() => handleCardInteraction('bottom')}"
);

// 6. transform logic
content = content.replace(
  /transform: \(isCardFlipped && selectedCardId === 'SUPER-OFFICIAL'\) \? 'rotateY\(180deg\)' : 'rotateY\(0deg\)'/g,
  "transform: flippedInstance === 'top-official' ? 'rotateY(180deg)' : 'rotateY(0deg)'"
);

content = content.replace(
  /transform: \(isCardFlipped && selectedCardId === 'SUPER-PERSONAL'\) \? 'rotateY\(180deg\)' : 'rotateY\(0deg\)'/g,
  "transform: flippedInstance === 'top-personal' ? 'rotateY(180deg)' : 'rotateY(0deg)'"
);

content = content.replace(
  /transform: \(isCardFlipped && selectedCardId && selectedCardId !== 'SUPER-OFFICIAL' && selectedCardId !== 'SUPER-PERSONAL'\) \? 'rotateY\(180deg\)' : 'rotateY\(0deg\)'/g,
  "transform: flippedInstance === 'bottom' ? 'rotateY(180deg)' : 'rotateY(0deg)'"
);

// 7. View Card Face button
content = content.replace(
  /onClick=\{\(\) => setIsCardFlipped\(!isCardFlipped\)\}/g,
  "onClick={() => setFlippedInstance(prev => prev === 'bottom' ? null : 'bottom')}"
);

content = content.replace(
  /<span>\{isCardFlipped \? "View Card Face" : "Credit Intelligence"\}<\/span>/g,
  "<span>{flippedInstance === 'bottom' ? \"View Card Face\" : \"Credit Intelligence\"}</span>"
);

fs.writeFileSync('src/components/CreditCards.tsx', content);
