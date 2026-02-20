// Extras data per category type — scraped from live site
// Each item also has "included" ingredients that can be removed

export type ExtraItem = {
  name: string
  price: number | null
}

export type CategoryExtras = {
  extras: ExtraItem[]
}

function parseExtras(items: string[]): ExtraItem[] {
  return items.map(item => {
    const match = item.match(/^(.+?)\s+(\d+),-$/)
    if (match) {
      return { name: match[1].trim(), price: parseInt(match[2]) }
    }
    return { name: item.trim(), price: null }
  })
}

// Pizza 80kr, 85kr, 95kr (standard pizza extras)
const pizzaStandardExtras = parseExtras([
  "Æg 6,-","Agurk 5,-","Ananas 5,-","Bacon 15,-","Bearnaisesauce 10,-","Champigon 5,-",
  "Chilli i bøtte 5,-","Chilli på pizza","Cocktail pølser 15,-","Dobbelt pizzabund 20,-",
  "Dressing 5,-","Dressing i bæger 5,-","Fetaost 12,-","Glutenfri pizza 30,-",
  "Gorgonzola 12,-","Hvidløg i bøtte 5,-","Hvidløg på pizza 5,-","Jalapenos 5,-",
  "Kebab 15,-","Kødsauce 15,-","Kylling 15,-","Løg 5,-","Majs 5,-","Muslinger 15,-",
  "Oksekød 15,-","Oliven 5,-","Ost 12,-","Pepperoni 15,-","Pommes frites 20,-",
  "Rejer 15,-","Rød peber 5,-","Rucola 5,-","Salat 5,-","Skinke 15,-","Spaghetti 5,-",
  "Tomatskiver 5,-","Tun 15,-"
])

// Børne Retter extras (same as standard but with Oregano, no Rucola/Glutenfri/Dobbelt)
const boerneExtras = parseExtras([
  "Æg 6,-","Agurk 5,-","Ananas 5,-","Bacon 15,-","Bearnaisesauce 10,-","Champigon 5,-",
  "Chilli i bøtte 5,-","Chilli på pizza","Cocktail pølser 15,-","Dressing 5,-",
  "Dressing i bæger 5,-","Fetaost 12,-","Gorgonzola 12,-","Hvidløg i bøtte 5,-",
  "Hvidløg på pizza 5,-","Jalapenos 5,-","Kebab 12,-","Kødsauce 15,-","Kylling 15,-",
  "Løg 5,-","Majs 5,-","Muslinger 15,-","Oksekød 15,-","Oliven 5,-","Oregano 5,-",
  "Ost 12,-","Pepperoni 15,-","Pommes frites 20,-","Rejer 15,-","Rød peber 5,-",
  "Rucola 5,-","Salat 5,-","Skinke 15,-","Spaghetti 5,-","Tomatsauce 5,-",
  "Tomatskiver 5,-","Tun 15,-"
])

// Indbagt Pizza extras
const indbagtExtras = parseExtras([
  "Ananas 5,-","Bacon 15,-","Bearnaisesauce 10,-","Champigon 5,-","Chilli i bøtte 5,-",
  "Chilli på pizza","Cocktail pølser 15,-","Dressing 5,-","Dressing i bæger 10,-",
  "Fetaost 12,-","Gorgonzola 12,-","Hvidløg i bøtte 5,-","Hvidløg på pizza 5,-",
  "Jalapenos 5,-","Kebab 15,-","Kødsauce 15,-","Kylling 15,-","Løg 5,-","Majs 5,-",
  "Muslinger 15,-","Oksekød 15,-","Oliven 5,-","Oregano 5,-","Ost 12,-","Pepperoni 15,-",
  "Rejer 15,-","Rød peber 5,-","Skinke 15,-","Spaghetti 5,-","Tomatsauce 5,-",
  "Tomatskiver","Tun 15,-"
])

// Mexicansk Pizza extras (same as standard pizza)
const mexicanskExtras = parseExtras([
  "Æg 6,-","Agurk 5,-","Ananas 5,-","Bacon 15,-","Bearnaisesauce 10,-","Champigon 5,-",
  "Chilli i bøtte 5,-","Chilli på pizza","Cocktail pølser 15,-","Dobbelt pizzabund 20,-",
  "Dressing 5,-","Dressing i bæger 5,-","Fetaost 12,-","Glutenfri pizza 30,-",
  "Gorgonzola 12,-","Hvidløg i bøtte 5,-","Hvidløg på pizza 5,-","Jalapenos 5,-",
  "Kebab 15,-","Kødsauce 15,-","Kylling 15,-","Løg 5,-","Majs 5,-","Muslinger 15,-",
  "Oksekød 15,-","Oliven 5,-","Oregano 5,-","Ost 12,-","Pepperoni 15,-","Rejer 15,-",
  "Rød peber 5,-","Rucola 5,-","Salat 5,-","Skinke 15,-","Spaghetti 5,-",
  "Tomatskiver 5,-","Tun 15,-"
])

// Salatpizza extras
const salatpizzaExtras = parseExtras([
  "Æg 6,-","Agurk 5,-","Ananas 5,-","Bacon 15,-","Bearnaisesauce 10,-","Champigon 5,-",
  "Chilli i bøtte 5,-","Chilli på pizza","Cocktail pølser 15,-","Dobbelt pizzabund 20,-",
  "Dressing 5,-","Dressing i bæger 10,-","Fetaost 12,-","Glutenfri pizza 30,-",
  "Gorgonzola 12,-","Hvidløg i bøtte 5,-","Hvidløg på pizza 5,-","Jalapenos 5,-",
  "Kebab 15,-","Kødsauce 15,-","Kylling 15,-","Løg 5,-","Majs 5,-","Muslinger 15,-",
  "Oksekød 15,-","Oliven 5,-","Oregano","Ost 12,-","Pepperoni 15,-","Rejer 15,-",
  "Rød peber 5,-","Rucola 5,-","Salat 5,-","Skinke 15,-","Spaghetti 5,-",
  "Tomatskiver 5,-","Tun 15,-"
])

// Pommes frites pizza extras
const pommesPizzaExtras = parseExtras([
  "Æg 6,-","Agurk 5,-","Ananas 5,-","Bacon 12,-","Bearnaisesauce 10,-","Champigon 5,-",
  "Chilli i bøtte 5,-","Chilli på pizza","Cocktail pølser 15,-","Dobbelt pizzabund 20,-",
  "Dressing 5,-","Dressing i bæger 5,-","Fetaost 12,-","Glutenfri pizza 30,-",
  "Gorgonzola 12,-","Hvidløg i bøtte 5,-","Hvidløg på pizza 5,-","Jalapenos 5,-",
  "Kebab 15,-","Kødsauce 15,-","Kylling 15,-","Løg 5,-","Majs 5,-","Muslinger 15,-",
  "Oksekød 15,-","Oliven 5,-","Oregano","Ost 12,-","Pepperoni 15,-","Rejer 15,-",
  "Rød peber 5,-","Rucola 5,-","Salat 5,-","Skinke 15,-","Spaghetti 5,-",
  "Tomatskiver 5,-","Tun 15,-"
])

// Luxus Pizza extras
const luxusExtras = parseExtras([
  "Agurk 5,-","Ananas 5,-","Bacon 15,-","Bearnaisesauce 10,-","Champigon 5,-",
  "Cherrytomater 5,-","Chilli i bøtte 5,-","Chilli på pizza","Cocktail pølser 15,-",
  "Dobbelt pizzabund 20,-","Dressing 5,-","Dressing i bæger 5,-","Fetaost 12,-",
  "Glutenfri pizza 30,-","Gorgonzola 12,-","Grana padano 10,-","Hvidløg i bøtte 5,-",
  "Hvidløg på pizza 5,-","Jalapenos 5,-","Kartoffelskiver 5,-","Kebab 15,-",
  "Kødsauce 15,-","Kylling 15,-","Løg 5,-","Lufttørret skinke 15,-","Majs 5,-",
  "Mozzarella 12,-","Muslinger 15,-","Oksekød 15,-","Oliven 5,-","Oregano",
  "Ost 12,-","Pepperoni 15,-","Rejer 15,-","Rød peber 5,-","Rucola 5,-",
  "Salami 15,-","Salat 5,-","Skinke 15,-","Spaghetti 5,-","Tomatskiver 5,-","Tun 15,-"
])

// UFO extras (same as indbagt)
const ufoExtras = indbagtExtras

// Sandwich extras
const sandwichExtras = parseExtras([
  "Agurk 5,-","Ananas 5,-","Bacon 15,-","Bearnaisesauce 10,-","Champigon 5,-",
  "Chilli i bøtte 5,-","Chilli på pizza","Cocktail pølser 15,-","Dressing 5,-",
  "Dressing i bæger 10,-","Fetaost 12,-","Gorgonzola 12,-","Hvidløg i bøtte 5,-",
  "Hvidløg på pizza 5,-","Jalapenos 5,-","Kebab 15,-","Kødsauce 15,-","Kylling 15,-",
  "Løg 5,-","Majs 5,-","Muslinger 15,-","Oksekød 15,-","Oliven 5,-","Oregano 5,-",
  "Ost 12,-","Pepperoni 15,-","Rejer 15,-","Rød peber 5,-","Rucola 5,-","Salat 5,-",
  "Skinke 15,-","Spaghetti 5,-","Tomatsauce 5,-","Tomatskiver 5,-","Tun 15,-"
])

// Dürüm extras
const durumExtras = parseExtras([
  "Agurk 5,-","Bearnaisesauce 10,-","Chili i durum","Chilli i bøtte 5,-","Dressing 5,-",
  "Dressing i bæger 10,-","Fetaost 12,-","Gorgonzola 12,-","Hvidløg i bøtte 5,-",
  "Hvidløg i durum 5,-","Jalapenos 5,-","Kebab 15,-","Kylling 15,-","Løg 5,-",
  "Majs 5,-","Oliven 5,-","Ost 12,-","Rød peber 5,-","Salat 5,-","Skinke 15,-",
  "Tomatskiver 5,-","Tun 15,-"
])

// Pitabrød extras
const pitabrodExtras = parseExtras([
  "Agurk 5,-","Ananas 5,-","Bearnaisesauce 10,-","Chili i Pitabrød","Dressing 5,-",
  "Dressing i bæger 5,-","Fetaost 12,-","Gorgonzola 12,-","Hvidløg i bøtte 5,-",
  "Hvilløg i pitabrød 5,-","Jalapenos 5,-","Kebab 15,-","Kylling 15,-","Løg 5,-",
  "Majs 5,-","Oliven 5,-","Oregano 5,-","Ost 12,-","Rød peber 5,-","Salat 5,-",
  "Skinke 15,-","Tomatskiver 5,-","Tun 15,-"
])

// Pastaretter extras
const pastaExtras = parseExtras([
  "2 stk Brød 10,-","Chilli på pizza","Hvidløg på pizza 5,-"
])

// Grilretter extras
const grilExtras = parseExtras([
  "2 stk Brød 10,-","Bearnaisesauce 10,-","Chilli i bøtte 5,-",
  "Dressing i bæger 10,-","Hvidløg i bøtte 5,-"
])

// Hovedretter extras
const hovedretterExtras = parseExtras([
  "2 stk Brød 10,-","Bearnaisesauce 10,-","Chilli i bøtte 5,-",
  "Dressing i bæger 5,-","Jalapenos 5,-","Tzatziki 10,-"
])

// Burger extras
const burgerExtras = parseExtras([
  "Agurk 5,-","Bacon 12,-","Chilli i bøtte 5,-","Ekstra Bøf 35,-",
  "Hvidløg i bøtte 5,-","Jalapenos 5,-","Ketchup 3,-","Løg 5,-","Ost 10,-",
  "Pommesfrittessauce 3,-","Remolade 3,-","Salat 5,-","salat majonase 3,-"
])

// Salat extras
const salatExtras = parseExtras([
  "Agurk 5,-","Ananas 5,-","Dressing 5,-","Fetaost 12,-","Jalapenos 5,-",
  "Kebab 12,-","Kylling 12,-","Oliven 5,-","Salat 5,-","Tomatskiver 5,-","Tun 12,-"
])

// Pommes frites extras
const pommesExtras = parseExtras([
  "Dressing i bæger 5,-","Ketchup 5,-","Pommesfrittessauce 5,-",
  "Remolade 5,-","salat majonase 5,-"
])

// Category to extras mapping
export const categoryExtrasMap: Record<string, ExtraItem[]> = {
  "FROKOSTRETTER Serveres kl. 12.00 -14.00": [], // No extras
  "PIZZA 80kr": pizzaStandardExtras,
  "PIZZA 85kr": pizzaStandardExtras,
  "PIZZA 95kr": pizzaStandardExtras,
  "BØRNE RETTER": boerneExtras,
  "INDBAGT PIZZA 90 KR.": indbagtExtras,
  "MEXICANSK PIZZA 95kr": mexicanskExtras,
  "SALATPIZZA 90 KR.": salatpizzaExtras,
  "POMMES FRITES PIZZA": pommesPizzaExtras,
  "LUXUS PIZZA": luxusExtras,
  "UFO 110 kr.": ufoExtras,
  "SANDWICH": sandwichExtras,
  "DÜRÜM (fladbrød)": durumExtras,
  "PITABRØD": pitabrodExtras,
  "PASTARETTER med flødesauce og parmesanost": pastaExtras,
  "GRILRETTER": grilExtras,
  "FORRETTER": grilExtras, // Same as grilretter
  "HOVEDRETTER Inkl. pommes frites og salat": hovedretterExtras,
  "HJEMMELAVEDE BURGER inkl. Brioche bolle og frites": burgerExtras,
  "SALAT": salatExtras,
  "POMMES FRITES": pommesExtras,
  "DRIKKEVARER": [], // No extras
}

// Per-item included ingredients (what comes on the item by default, can be removed)
export const itemIncludedMap: Record<string, string[]> = {
  // PIZZA 80kr
  "PIZZA 80kr-VESUVIO": ["Ost", "Skinke"],
  "PIZZA 80kr-CAPRICCIOSA": ["Champigon", "Ost", "Skinke"],
  "PIZZA 80kr-AL TONNO": ["Løg", "Ost", "Tun"],
  "PIZZA 80kr-HAWAI": ["Ananas", "Ost", "Skinke"],
  "PIZZA 80kr-Pepperoni": ["Ost", "Pepperoni"],
  "PIZZA 80kr-AMERIKANER": ["Champigon", "Oksekød", "Ost"],
  "PIZZA 80kr-DUVBO": ["Bacon", "Løg", "Ost"],
  "PIZZA 80kr-MARGHERITA": ["Ost"],
  // PIZZA 85kr
  "PIZZA 85kr-STINE": ["Bacon", "Oksekød", "Ost", "Rød peber"],
  "PIZZA 85kr-CALIFORNIA": ["Ananas", "Oksekød", "Ost", "Skinke"],
  "PIZZA 85kr-ITALIANO": ["Kebab", "Løg", "Skinke"],
  "PIZZA 85kr-DILAN": ["Kødsauce", "Ost", "Rød peber", "Spaghetti"],
  "PIZZA 85kr-TORINO": ["Ost", "Rejer", "Tun"],
  "PIZZA 85kr-VEGETARIANA": ["Ananas", "Champigon", "Løg", "Oliven", "Ost", "Rød peber"],
  "PIZZA 85kr-GORGONZOLA": ["Gorgonzola", "Oksekød", "Ost", "Rød peber"],
  "PIZZA 85kr-ALIBABA": ["Cocktail pølser", "Ost", "Skinke"],
  "PIZZA 85kr-MAMA MIA": ["Chili", "Cocktail pølser", "Oksekød", "Ost", "Pepperoni"],
  "PIZZA 85kr-LAMIRAGE": ["Champigon", "Cocktail pølser", "Ost", "Pepperoni", "Skinke"],
  "PIZZA 85kr-MILANO": ["Kebab", "Bacon", "Løg", "Oksekød", "Ost"],
  "PIZZA 85kr-HERKULES": ["Bearnaisesauce", "Løg", "Oksekød", "Ost", "Skinke"],
  "PIZZA 85kr-ROMA": ["Champigon", "Cocktail pølser", "Kødsauce", "Ost", "Rød peber"],
  "PIZZA 85kr-SERKAN SPECIAL": ["Kebab", "Chili", "Dressing", "Løg", "Ost"],
  // PIZZA 95kr
  "PIZZA 95kr-QUATRO STRIGONI": ["Champignon", "Muslinger", "Ost", "Rejer", "Skinke"],
  "PIZZA 95kr-NR. NEBEL SPECIAL": ["Ananas", "Bacon", "Champignon", "Chili", "Oksekød", "Ost", "Rød peber", "Salami"],
  "PIZZA 95kr-LAZIO SPECIAL": ["Ananas", "Cocktail pølser", "Ost", "Pepperoni", "Skinke"],
  "PIZZA 95kr-HUSETS SPECIAL": ["Kylling", "Bearnaisesauce", "Cocktail pølser", "Oksekød", "Ost"],
  "PIZZA 95kr-ADEMS SPECIAL": ["Gorgonzola", "Kebab", "Løg", "Ost", "Rød peber"],
  "PIZZA 95kr-Meat Love": ["Bacon", "Cocktail pølser", "Kebab", "Oksekød", "Ost", "Pepperoni"],
  "PIZZA 95kr-CANIM": ["Æg", "Bacon", "Champignon", "Oksekød", "Ost"],
  "PIZZA 95kr-EYIP SPECIAL": ["Chili", "hvidløg", "Kebab", "Kødsauce", "Oksekød", "Ost", "Skinke"],
  "PIZZA 95kr-HASRET KALDIM": ["Bacon", "Chili", "Løg", "Oksekød", "Ost", "Pepperoni", "Skinke"],
  "PIZZA 95kr-KARTOFFEL": ["creme fraiche", "kartoffel", "Ost", "pesto", "rosmarin"],
  "PIZZA 95kr-GÜLUM": ["Kebab", "Kylling", "Chili", "Kødsauce", "Løg", "Ost", "Rød peber"],
  "PIZZA 95kr-Æ FORMANDS BØRN": ["Kebab", "Bacon", "Chili", "Cocktail pølser", "Ost"],
  // BØRNE RETTER
  "BØRNE RETTER-TOMMY": ["Ost", "Skinke"],
  "BØRNE RETTER-CERVY": ["Cocktail pølser", "Ost", "Skinke"],
  "BØRNE RETTER-YASIN": ["Kødsauce", "Ost"],
  "BØRNE RETTER-SALAMI": ["Ost", "Salami"],
  "BØRNE RETTER-MAMI": ["Kødsauce", "Ost", "Spaghetti"],
  // INDBAGT
  "INDBAGT PIZZA 90 KR.-RHODOS": ["Kødsauce", "Ost", "Skinke", "Spaghetti"],
  "INDBAGT PIZZA 90 KR.-CALZONE": ["Champignon", "Cocktail pølser", "Ost", "Skinke"],
  "INDBAGT PIZZA 90 KR.-MARANTO": ["Kødsauce", "Ost", "Spaghetti"],
  "INDBAGT PIZZA 90 KR.-SAMOS": ["Kebab", "Champignon", "Løg", "Ost", "Skinke"],
  "INDBAGT PIZZA 90 KR.-INDBAGT": ["Champignon", "Løg", "Ost", "Rejer", "Skinke"],
  "INDBAGT PIZZA 90 KR.-HALV INDBAGT": ["Kebab", "Champignon", "Chili", "Dressing", "Løg", "Ost"],
  // MEXICANSK
  "MEXICANSK PIZZA 95kr-MEXICANA": ["Jalapenos", "Løg", "Oksekød", "Ost", "Pepperoni"],
  "MEXICANSK PIZZA 95kr-AZTEKA": ["Kebab", "Kylling", "Jalapenos", "Ost", "Rød peber"],
  "MEXICANSK PIZZA 95kr-ACAPULCO": ["Kebab", "Champignon", "Jalapenos", "Løg", "Ost", "Rød peber"],
  "MEXICANSK PIZZA 95kr-DENNISO": ["Kebab", "Kylling", "Dressing", "Jalapenos", "Oksekød", "Ost"],
  "MEXICANSK PIZZA 95kr-MATAMOROS": ["Kylling", "bearnaisesauc", "Champignon", "Jalapenos", "Oksekød", "Ost"],
  "MEXICANSK PIZZA 95kr-NEW MEXICO": ["Kylling", "Champignon", "Jalapenos", "Kødsauce", "Ost", "Pepperoni"],
  // SALATPIZZA
  "SALATPIZZA 90 KR.-MORTEN": ["Kebab", "Dressing", "Oksekød", "Ost", "Salat"],
  "SALATPIZZA 90 KR.-KURT": ["Bacon", "Dressing", "Ost", "Pepperoni", "Salat"],
  "SALATPIZZA 90 KR.-OLGA": ["Kebab", "Kylling", "Dressing", "Ost", "Salat"],
  "SALATPIZZA 90 KR.-PETER": ["Dressing", "Kødsauce", "Ost", "Salat", "Spaghetti"],
  "SALATPIZZA 90 KR.-MARCO SPECIAL": ["Lufttørret skinke", "Ost", "Rucola"],
  // POMMES FRITES PIZZA
  "POMMES FRITES PIZZA-PommesPizza kebab": ["Kebab", "Dressing", "Ost", "Pommes frites"],
  "POMMES FRITES PIZZA-PommesPizza kylling": ["Kylling", "Dressing", "Ost", "Pommes frites"],
  "POMMES FRITES PIZZA-PommesPizza kylling/kebab": ["Kebab", "Kylling", "bearnaisesauc", "Ost"],
  // LUXUS PIZZA
  "LUXUS PIZZA-Luksus Pizza-0": ["Grana padano", "Ost", "Rucola", "Salami"],
  "LUXUS PIZZA-Luksus Pizza-1": ["Bacon", "Cherrytomater", "Grana padano", "Ost", "Rucola", "Salami"],
  "LUXUS PIZZA-Luksus Pizza-2": ["Cherrytomater", "Grana padano", "Lufttørret skinke", "Ost", "Rucola"],
  "LUXUS PIZZA-Luksus Pizza-3": ["Champignon", "Grana padano", "Løg", "Lufttørret skinke", "Ost", "Rucola"],
  "LUXUS PIZZA-Luksus Pizza-4": ["Champignon", "Cocktail pølser", "Grana padano", "Ost", "Rød peber", "Rucola", "Salami"],
  "LUXUS PIZZA-Luksus Pizza-5": ["Kylling", "Bacon", "Grana padano", "Lufttørret skinke", "Ost", "Rucola"],
  // UFO
  "UFO 110 kr.-Ufo-0": ["Kødsauce", "Ost", "Skinke", "Spaghetti"],
  "UFO 110 kr.-Ufo-1": ["Kebab", "bearnaisesauc", "Kødsauce", "Løg", "Ost"],
  "UFO 110 kr.-Ufo-2": ["Kebab", "Champignon", "Løg", "Ost", "Skinke"],
  // DÜRÜM
  "DÜRÜM (fladbrød)-DÜRÜM-0": ["Kebab", "Agurk", "Dressing", "Salat", "Tomatskiver"],
  "DÜRÜM (fladbrød)-DÜRÜM-1": ["Kylling", "Agurk", "Dressing", "Salat", "Tomatskiver"],
  "DÜRÜM (fladbrød)-DÜRÜM-2": ["Agurk", "Dressing", "Salat", "Skinke", "Tomatskiver"],
  "DÜRÜM (fladbrød)-DÜRÜM-3": ["Agurk", "Dressing", "Salat", "Tomatskiver", "Tun"],
  "DÜRÜM (fladbrød)-DÜRÜM-4": ["Agurk", "Dressing", "Rejer", "Salat", "Tomatskiver"],
  // PITABRØD
  "PITABRØD-PITABRØD-0": ["Kebab", "Agurk", "Dressing", "Salat", "Tomatskiver"],
  "PITABRØD-PITABRØD-1": ["Kylling", "Agurk", "Dressing", "Salat", "Tomatskiver"],
  "PITABRØD-PITABRØD-2": ["Agurk", "Dressing", "Salat", "Skinke", "Tomatskiver"],
  "PITABRØD-PITABRØD-3": ["Agurk", "Dressing", "Salat", "Tomatskiver", "Tun"],
  "PITABRØD-PITABRØD-4": ["Agurk", "Dressing", "Rejer", "Salat", "Tomatskiver"],
}
