import fs from 'fs';
let f = 'src/components/MyProfile.tsx';
let txt = fs.readFileSync(f, 'utf8');
txt = txt.replace(/#2d1959/g, 'c026d3');
fs.writeFileSync(f, txt);
