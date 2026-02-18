import type { Branch } from './arvomerkit';

export type Language = 'fi' | 'sv' | 'en';

export interface UITranslations {
  title: string;
  description: string;
  hint: string;
  selectBranch: string;
  armyAirforce: string;
  navy: string;
  selectTypes: string;
  collar: string;
  chest: string;
  shoulder: string;
  sleeve: string;
  reviewCount: (n: number) => string;
  noReviewable: string;
  practice: string;
  quit: string;
  correct: string;
  wrong: string;
  backToStart: string;
  noDueCards: string;
  great: string;
  reviewed: (n: number) => string;
  failures: (n: number) => string;
  guessInstruction: string;
  nextInstruction: string;
  categoryMiehistö: string;
  categoryAliupseerit: string;
  categoryUpseerit: string;
}

export const ui: Record<Language, UITranslations> = {
  fi: {
    title: 'Arvomerkit',
    description: 'Opi Puolustusvoimien arvomerkit.',
    hint: 'Kun olet kertaustilassa, yritä arvata arvomerkki ennen kuin klikkaat tarkistukseen. Paina "Oikein" vain jos tiesit vastauksen. Muuten paina "Väärin".',
    selectBranch: 'Valitse puolustushaara:',
    armyAirforce: 'Maavoimat & Ilmavoimat',
    navy: 'Merivoimat',
    selectTypes: 'Valitse harjoiteltavat tyypit:',
    collar: 'Kauluslaatat',
    chest: 'Rintalaatat',
    shoulder: 'Olkalaatat',
    sleeve: 'Hihalaatat',
    reviewCount: (n) => `Kertaa (${n} kpl)`,
    noReviewable: 'Ei kertattavia',
    practice: 'Vapaa harjoittelu',
    quit: 'Lopeta',
    correct: 'Oikein',
    wrong: 'Väärin',
    backToStart: 'Takaisin alkuun',
    noDueCards: 'Ei kertattavia tänään. Harjoittele vapaasti tai palaa myöhemmin.',
    great: 'Hienoa!',
    reviewed: (n) => `Kertasit ${n} arvomerkkiä oikein.`,
    failures: (n) => `Epäonnistumisia: ${n}`,
    guessInstruction: 'Arvaa arvomerkki ja klikkaa tarkistaaksesi',
    nextInstruction: 'Klikkaa siirtyäksesi seuraavaan',
    categoryMiehistö: 'Miehistö',
    categoryAliupseerit: 'Aliupseerit',
    categoryUpseerit: 'Upseerit',
  },
  sv: {
    title: 'Militära grader',
    description: 'Lär dig Försvarsmaktens militära grader.',
    hint: 'I repetitionsläget, försök gissa graden innan du klickar för att kontrollera. Tryck "Rätt" bara om du visste svaret. Annars tryck "Fel".',
    selectBranch: 'Välj försvarsgren:',
    armyAirforce: 'Armén & Flygvapnet',
    navy: 'Marinen',
    selectTypes: 'Välj insigniatyper att öva:',
    collar: 'Kragmärken',
    chest: 'Bröstmärken',
    shoulder: 'Axelmärken',
    sleeve: 'Ärmärken',
    reviewCount: (n) => `Repetera (${n} st)`,
    noReviewable: 'Inget att repetera',
    practice: 'Fri övning',
    quit: 'Avsluta',
    correct: 'Rätt',
    wrong: 'Fel',
    backToStart: 'Tillbaka till start',
    noDueCards: 'Inget att repetera idag. Öva fritt eller återkom senare.',
    great: 'Bra gjort!',
    reviewed: (n) => `Du repeterade ${n} grader rätt.`,
    failures: (n) => `Fel: ${n}`,
    guessInstruction: 'Gissa graden och klicka för att kontrollera',
    nextInstruction: 'Klicka för att gå vidare',
    categoryMiehistö: 'Manskap',
    categoryAliupseerit: 'Underofficerare',
    categoryUpseerit: 'Officerare',
  },
  en: {
    title: 'Military Ranks',
    description: 'Learn the Finnish Defence Forces military ranks.',
    hint: 'In review mode, try to guess the rank before clicking to check. Press "Correct" only if you knew the answer. Otherwise press "Wrong".',
    selectBranch: 'Select branch:',
    armyAirforce: 'Army & Air Force',
    navy: 'Navy',
    selectTypes: 'Select insignia types to practice:',
    collar: 'Collar insignia',
    chest: 'Chest insignia',
    shoulder: 'Shoulder insignia',
    sleeve: 'Sleeve insignia',
    reviewCount: (n) => `Review (${n})`,
    noReviewable: 'Nothing to review',
    practice: 'Free practice',
    quit: 'Quit',
    correct: 'Correct',
    wrong: 'Wrong',
    backToStart: 'Back to start',
    noDueCards: 'Nothing to review today. Practice freely or come back later.',
    great: 'Well done!',
    reviewed: (n) => `You reviewed ${n} rank${n === 1 ? '' : 's'} correctly.`,
    failures: (n) => `Mistakes: ${n}`,
    guessInstruction: 'Guess the rank and click to check',
    nextInstruction: 'Click to advance to next',
    categoryMiehistö: 'Enlisted',
    categoryAliupseerit: 'Non-commissioned Officers',
    categoryUpseerit: 'Officers',
  },
};

// Rank name translations keyed by "name__branch"
const rankTranslations: Record<string, { sv: string; en: string }> = {
  // Army/Air Force - Miehistö
  'Sotamies__army-airforce': { sv: 'Soldat', en: 'Private' },
  'Korpraali__army-airforce': { sv: 'Korpral', en: 'Private First Class' },
  'Aliupseerioppilas__army-airforce': { sv: 'Underofficerselev', en: 'NCO Student' },
  'Alikersantti__army-airforce': { sv: 'Undersergeant', en: 'Corporal' },

  // Army/Air Force - Aliupseerit
  'Kersantti__army-airforce': { sv: 'Sergeant', en: 'Sergeant' },
  'Upseerioppilas__army-airforce': { sv: 'Officerselev', en: 'Officer Student' },
  'Ylikersantti__army-airforce': { sv: 'Översergeant', en: 'Staff Sergeant' },
  'Upseerikokelas__army-airforce': { sv: 'Officersaspirant', en: 'Officer Candidate' },
  'Vääpeli__army-airforce': { sv: 'Fältväbel', en: 'Sergeant First Class' },
  'Ylivääpeli__army-airforce': { sv: 'Överfältväbel', en: 'Master Sergeant' },
  'Sotilasmestari__army-airforce': { sv: 'Militärmästare', en: 'Sergeant Major' },

  // Army/Air Force - Upseerit
  'Vänrikki__army-airforce': { sv: 'Fänrik', en: 'Second Lieutenant' },
  'Luutnantti__army-airforce': { sv: 'Löjtnant', en: 'Lieutenant' },
  'Yliluutnantti__army-airforce': { sv: 'Premiärlöjtnant', en: 'First Lieutenant' },
  'Kapteeni__army-airforce': { sv: 'Kapten', en: 'Captain' },
  'Majuri__army-airforce': { sv: 'Major', en: 'Major' },
  'Everstiluutnantti__army-airforce': { sv: 'Överstelöjtnant', en: 'Lieutenant Colonel' },
  'Eversti__army-airforce': { sv: 'Överste', en: 'Colonel' },
  'Prikaatikenraali__army-airforce': { sv: 'Brigadgeneral', en: 'Brigadier General' },
  'Kenraalimajuri__army-airforce': { sv: 'Generalmajor', en: 'Major General' },
  'Kenraaliluutnantti__army-airforce': { sv: 'Generallöjtnant', en: 'Lieutenant General' },
  'Kenraali__army-airforce': { sv: 'General', en: 'General' },

  // Navy - Miehistö
  'Matruusi__navy': { sv: 'Matros', en: 'Seaman Apprentice' },
  'Ylimatruusi__navy': { sv: 'Övermatros', en: 'Seaman' },

  // Navy - Aliupseerit (Petty Officers)
  'Pursimies__navy': { sv: 'Båtsman', en: 'Chief Petty Officer' },
  'Ylipursimies__navy': { sv: 'Överbåtsman', en: 'Senior Chief Petty Officer' },
  'Sotilasmestari__navy': { sv: 'Militärmästare', en: 'Master Chief Petty Officer' },

  // Navy - Upseerit
  'Aliluutnantti__navy': { sv: 'Underlöjtnant', en: 'Ensign' },
  'Luutnantti__navy': { sv: 'Löjtnant', en: 'Lieutenant, Junior Grade' },
  'Yliluutnantti__navy': { sv: 'Premiärlöjtnant', en: 'Lieutenant' },
  'Kapteeniluutnantti__navy': { sv: 'Kaptenlöjtnant', en: 'Lieutenant, Senior Grade' },
  'Komentajakapteeni__navy': { sv: 'Kommendörkapten', en: 'Lieutenant Commander' },
  'Komentaja__navy': { sv: 'Kommendör', en: 'Commander' },
  'Kommodori__navy': { sv: 'Kommodor', en: 'Captain' },
  'Lippueamiraali__navy': { sv: 'Flottiljamiral', en: 'Commodore' },
  'Kontra-amiraali__navy': { sv: 'Konteramiral', en: 'Rear Admiral' },
  'Vara-amiraali__navy': { sv: 'Viceamiral', en: 'Vice Admiral' },
  'Amiraali__navy': { sv: 'Amiral', en: 'Admiral' },
};

export function getRankName(name: string, branch: Branch, lang: Language): string {
  if (lang === 'fi') return name;
  const key = `${name}__${branch}`;
  return rankTranslations[key]?.[lang] ?? name;
}

export function getCategoryName(
  category: 'Miehistö' | 'Aliupseerit' | 'Upseerit',
  lang: Language,
): string {
  const t = ui[lang];
  switch (category) {
    case 'Miehistö': return t.categoryMiehistö;
    case 'Aliupseerit': return t.categoryAliupseerit;
    case 'Upseerit': return t.categoryUpseerit;
  }
}

const STORAGE_KEY = 'arvomerkit-language';

export function loadLanguage(): Language {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === 'fi' || stored === 'sv' || stored === 'en') return stored;
  return 'fi';
}

export function saveLanguage(lang: Language): void {
  localStorage.setItem(STORAGE_KEY, lang);
}
