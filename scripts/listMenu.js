const fs = require('fs');
const content = fs.readFileSync('src/lib/menuData.ts','utf8');
const jsonStart = content.indexOf('export const menuData = ') + 'export const menuData = '.length;
let jsonStr = content.slice(jsonStart);
// Find the closing of the JSON object (before "as const")
const asConstIdx = jsonStr.lastIndexOf('} as const;');
jsonStr = jsonStr.slice(0, asConstIdx + 1);
const data = JSON.parse(jsonStr);
const menu = data.menu;
for (const [cat, items] of Object.entries(menu)) {
  const names = items.map((it, i) => `${i}:${it.name}`);
  console.log(`${cat} (${items.length}): ${names.join(', ')}`);
}
