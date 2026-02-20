// Generate per-item extras TypeScript from scraped JSON data
// Run from browser console data saved to extras-per-item.json

const fs = require('fs');
const path = require('path');

// We need to save the per-item JSON first from the browser
// This script converts it to a TS file

const dataPath = path.join(__dirname, '..', 'data', 'extras-per-item.json');
const outPath = path.join(__dirname, '..', 'src', 'lib', 'itemExtras.ts');

const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

let ts = `// Auto-generated per-item extras data - scraped from pizzakebabhouse.dk
// Each item has its own extras list with correct per-item prices

export type ExtraItem = { name: string; price: number }

export type ItemExtras = {
  included: string[]
  extras: ExtraItem[]
} | null

// Map from baseId to extras data
export const itemExtrasMap: Record<string, ItemExtras> = {\n`;

Object.entries(data).forEach(([baseId, val]) => {
  if (val === null) {
    ts += `  "${baseId}": null,\n`;
  } else {
    ts += `  "${baseId}": {included:${JSON.stringify(val.included)},extras:${JSON.stringify(val.extras)}},\n`;
  }
});

ts += '}\n';

fs.writeFileSync(outPath, ts);
console.log(`Written ${ts.length} chars to ${outPath}`);
