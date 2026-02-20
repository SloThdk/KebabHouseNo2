// Script to build baseId mapping from extras-per-item.json to menu items
const fs = require('fs');

const extras = JSON.parse(fs.readFileSync('data/extras-per-item.json', 'utf8'));

// Known mapping from itemIncludedMap keys to baseIds (matched by included toppings)
// Format: { "category-itemName[-index]": baseId }

// Build reverse lookup: included signature -> baseIds
const includedToIds = {};
for (const [id, data] of Object.entries(extras)) {
  if (data === null) continue;
  const sig = JSON.stringify(data.included.sort());
  if (!includedToIds[sig]) includedToIds[sig] = [];
  includedToIds[sig].push({ id, extrasCount: data.extras.length, included: data.included });
}

// Print grouped by signature for items with non-empty included
for (const [sig, items] of Object.entries(includedToIds)) {
  if (JSON.parse(sig).length === 0) continue;
  if (items.length > 1) {
    console.log(`DUPLICATE included ${sig}:`);
    items.forEach(i => console.log(`  ${i.id} (${i.extrasCount} extras)`));
  }
}
