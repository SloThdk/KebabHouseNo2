const https = require('https');
const fs = require('fs');
const path = require('path');
const { DOMParser } = require('xmldom');

// All item IDs scraped from the site
const itemIds = [
  "10574","10575","10576","10577","10580","10581","10582","10583","10584","10585","10586","10587",
  "10588","10589","10590","10591","10592","10593","10594","10595","10596","10597","10598","10599",
  "10600","10601","10602","10604","10605","10606","10607","10608","10609","10610","10611","10612",
  "10613","10614","10615","10616","10617","10618","10619","10620","10621","10622","10623","10624",
  "10625","10626","10627","10628","10629","10630","10631","10632","10633","10634","10635","10636",
  "10637","10638","10639","10662","10663","10664","10665","10666","10670","10671","10672","10673",
  "10674","10675","10676","10677","10678","10679","10680","10681","10682","10683","10684","10685",
  "10686","10687","10688","10689","10690","10691","10692","10693","10694","10695","10696","10697",
  "10699","10700","10701","10702","10703","10704","10705","10706","10707","10708","10709","10710",
  "10711","10712","10713","10714","10715","10716","10717","10718","10719","10720","10721",
  "14690","14691","14692","14693","14694",
  "43909","43910","43911","43912","43913","43914","43915","43916","43917","43918","43919","43920"
];

function fetchItem(itemId) {
  return new Promise((resolve, reject) => {
    const postData = `action=basket_add&id=${itemId}_0&user_id=343&quantity=1`;
    const options = {
      hostname: 'pizzakebabhouse.dk',
      path: '/?module=Sunu&page=site&do=ajax&user_id=343',
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(postData),
        'Cookie': 'PHPSESSID=scrape' + Date.now(),
        'X-Requested-With': 'XMLHttpRequest'
      }
    };
    
    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const parser = new DOMParser();
          const doc = parser.parseFromString(data, 'text/xml');
          const accNode = doc.getElementsByTagName('accessories')[0];
          if (!accNode || !accNode.textContent) {
            resolve({ id: itemId, data: null });
            return;
          }
          
          const html = accNode.textContent;
          
          // Parse included
          const included = [];
          const incRegex = /div_remove_accessories[\s\S]*?<\/div>/;
          const incMatch = html.match(/id="div_remove_accessories"([\s\S]*?)(?=<div[^>]*id="div_accessories_variant"|<div[^>]*id="div_add_accessories"|$)/);
          if (incMatch) {
            const labels = incMatch[1].match(/<label[^>]*>([^<]+)<\/label>/g) || [];
            labels.forEach(l => {
              const m = l.match(/<label[^>]*>([^<]+)<\/label>/);
              if (m) included.push(m[1].trim());
            });
          }
          
          // Parse extras
          const extras = [];
          const extMatch = html.match(/id="div_add_accessories"([\s\S]*?)(?=<div[^>]*id="div_accessorygroups"|$)/);
          if (extMatch) {
            const labels = extMatch[1].match(/<label[^>]*>([^<]+)<\/label>/g) || [];
            labels.forEach(l => {
              const m = l.match(/<label[^>]*>([^<]+)<\/label>/);
              if (m) {
                const text = m[1].trim();
                const priceMatch = text.match(/^(.+?)\s+(\d+),-$/);
                if (priceMatch) {
                  extras.push({ name: priceMatch[1].trim(), price: parseInt(priceMatch[2]) });
                } else {
                  extras.push({ name: text, price: 0 });
                }
              }
            });
          }
          
          resolve({ id: itemId, data: { included, extras } });
        } catch(e) {
          console.error(`Error parsing ${itemId}: ${e.message}`);
          resolve({ id: itemId, data: null });
        }
      });
    });
    
    req.on('error', e => {
      console.error(`Request error ${itemId}: ${e.message}`);
      resolve({ id: itemId, data: null });
    });
    
    req.write(postData);
    req.end();
  });
}

async function main() {
  console.log(`Scraping ${itemIds.length} items...`);
  const result = {};
  
  for (let i = 0; i < itemIds.length; i++) {
    const { id, data } = await fetchItem(itemIds[i]);
    result[id] = data;
    if (i % 10 === 0) process.stdout.write(`${i}/${itemIds.length} `);
    await new Promise(r => setTimeout(r, 200));
  }
  
  console.log(`\nDone! ${Object.keys(result).length} items`);
  console.log(`With extras: ${Object.values(result).filter(v => v !== null).length}`);
  
  const outPath = path.join(__dirname, '..', 'data', 'extras-per-item.json');
  fs.writeFileSync(outPath, JSON.stringify(result, null, 2));
  console.log(`Saved to ${outPath}`);
}

main().catch(console.error);
