export type Branch = 'army-airforce' | 'navy';

// Helper function to get correct image path with base URL
const getImagePath = (path: string) => {
  const base = import.meta.env.BASE_URL || '/';
  return `${base}${path}`;
};

export interface Rank {
  name: string;
  category: 'Miehistö' | 'Aliupseerit' | 'Upseerit';
  branch: Branch;
  collarInsignia?: string;
  chestInsignia?: string;
  shoulderInsignia?: string;
  sleeveInsignia?: string;
}

export const ranks: Rank[] = [
  // Miehistö (Enlisted) - Army/Air Force
  {
    name: 'Sotamies',
    category: 'Miehistö',
    branch: 'army-airforce',
    collarInsignia: getImagePath('images/kauluslaatta/Sotamies.svg'),
    chestInsignia: getImagePath('images/rintalaatta/Sotamies.svg')
  },
  {
    name: 'Korpraali',
    category: 'Miehistö',
    branch: 'army-airforce',
    collarInsignia: getImagePath('images/kauluslaatta/Korpraali.svg'),
    chestInsignia: getImagePath('images/rintalaatta/Korpraali.svg')
  },
  {
    name: 'Aliupseerioppilas',
    category: 'Miehistö',
    branch: 'army-airforce',
    collarInsignia: getImagePath('images/kauluslaatta/Aliupseerioppilas.svg'),
    chestInsignia: getImagePath('images/rintalaatta/Aliupseerioppilas.svg')
  },
  {
    name: 'Alikersantti',
    category: 'Miehistö',
    branch: 'army-airforce',
    collarInsignia: getImagePath('images/kauluslaatta/Alikersantti.svg'),
    chestInsignia: getImagePath('images/rintalaatta/Alikersantti.svg')
  },

  // Aliupseerit (Non-commissioned Officers) - Army/Air Force
  {
    name: 'Kersantti',
    category: 'Aliupseerit',
    branch: 'army-airforce',
    collarInsignia: getImagePath('images/kauluslaatta/Kersantti.svg'),
    chestInsignia: getImagePath('images/rintalaatta/Kersantti.svg')
  },
  {
    name: 'Upseerioppilas',
    category: 'Aliupseerit',
    branch: 'army-airforce',
    collarInsignia: getImagePath('images/kauluslaatta/Upseerioppilas.svg'),
    chestInsignia: getImagePath('images/rintalaatta/Upseerioppilas.svg')
  },
  {
    name: 'Ylikersantti',
    category: 'Aliupseerit',
    branch: 'army-airforce',
    collarInsignia: getImagePath('images/kauluslaatta/Ylikersantti.svg'),
    chestInsignia: getImagePath('images/rintalaatta/Ylikersantti.svg')
  },
  {
    name: 'Upseerikokelas',
    category: 'Aliupseerit',
    branch: 'army-airforce',
    collarInsignia: getImagePath('images/kauluslaatta/Upseerikokelas.svg'),
    chestInsignia: getImagePath('images/rintalaatta/Upseerikokelas.svg')
  },
  {
    name: 'Vääpeli',
    category: 'Aliupseerit',
    branch: 'army-airforce',
    collarInsignia: getImagePath('images/kauluslaatta/Vääpeli.svg'),
    chestInsignia: getImagePath('images/rintalaatta/Vääpeli.svg')
  },
  {
    name: 'Ylivääpeli',
    category: 'Aliupseerit',
    branch: 'army-airforce',
    collarInsignia: getImagePath('images/kauluslaatta/Ylivääpeli.svg'),
    chestInsignia: getImagePath('images/rintalaatta/Ylivääpeli.svg')
  },
  {
    name: 'Sotilasmestari',
    category: 'Aliupseerit',
    branch: 'army-airforce',
    collarInsignia: getImagePath('images/kauluslaatta/Sotilasmestari.svg'),
    chestInsignia: getImagePath('images/rintalaatta/Sotilasmestari.svg')
  },

  // Upseerit (Officers) - Army/Air Force
  {
    name: 'Vänrikki',
    category: 'Upseerit',
    branch: 'army-airforce',
    collarInsignia: getImagePath('images/kauluslaatta/Vänrikki.svg'),
    chestInsignia: getImagePath('images/rintalaatta/Vänrikki.svg')
  },
  {
    name: 'Luutnantti',
    category: 'Upseerit',
    branch: 'army-airforce',
    collarInsignia: getImagePath('images/kauluslaatta/Luutnantti.svg'),
    chestInsignia: getImagePath('images/rintalaatta/Luutnantti.svg')
  },
  {
    name: 'Yliluutnantti',
    category: 'Upseerit',
    branch: 'army-airforce',
    collarInsignia: getImagePath('images/kauluslaatta/Yliluutnantti.svg'),
    chestInsignia: getImagePath('images/rintalaatta/Yliluutnantti.svg')
  },
  {
    name: 'Kapteeni',
    category: 'Upseerit',
    branch: 'army-airforce',
    collarInsignia: getImagePath('images/kauluslaatta/Kapteeni.svg'),
    chestInsignia: getImagePath('images/rintalaatta/Kapteeni.svg')
  },
  {
    name: 'Majuri',
    category: 'Upseerit',
    branch: 'army-airforce',
    collarInsignia: getImagePath('images/kauluslaatta/Majuri.svg'),
    chestInsignia: getImagePath('images/rintalaatta/Majuri.svg')
  },
  {
    name: 'Everstiluutnantti',
    category: 'Upseerit',
    branch: 'army-airforce',
    collarInsignia: getImagePath('images/kauluslaatta/Everstiluutnantti.svg'),
    chestInsignia: getImagePath('images/rintalaatta/Everstiluutnantti.svg')
  },
  {
    name: 'Eversti',
    category: 'Upseerit',
    branch: 'army-airforce',
    collarInsignia: getImagePath('images/kauluslaatta/Eversti.svg'),
    chestInsignia: getImagePath('images/rintalaatta/Eversti.svg')
  },
  {
    name: 'Prikaatikenraali',
    category: 'Upseerit',
    branch: 'army-airforce',
    collarInsignia: getImagePath('images/kauluslaatta/Prikaatikenraali.svg'),
    chestInsignia: getImagePath('images/rintalaatta/Prikaatikenraali.svg')
  },
  {
    name: 'Kenraalimajuri',
    category: 'Upseerit',
    branch: 'army-airforce',
    collarInsignia: getImagePath('images/kauluslaatta/Kenraalimajuri.svg'),
    chestInsignia: getImagePath('images/rintalaatta/Kenraalimajuri.svg')
  },
  {
    name: 'Kenraaliluutnantti',
    category: 'Upseerit',
    branch: 'army-airforce',
    collarInsignia: getImagePath('images/kauluslaatta/Kenraaliluutnantti.svg'),
    chestInsignia: getImagePath('images/rintalaatta/Kenraaliluutnantti.svg')
  },
  {
    name: 'Kenraali',
    category: 'Upseerit',
    branch: 'army-airforce',
    collarInsignia: getImagePath('images/kauluslaatta/Kenraali.svg'),
    chestInsignia: getImagePath('images/rintalaatta/Kenraali.svg')
  },

  // Merivoimat (Navy) - Miehistö
  {
    name: 'Matruusi',
    category: 'Miehistö',
    branch: 'navy',
    sleeveInsignia: getImagePath('images/hihalaatta/Matruusi.svg')
  },
  {
    name: 'Ylimatruusi',
    category: 'Miehistö',
    branch: 'navy',
    sleeveInsignia: getImagePath('images/hihalaatta/Ylimatruusi.svg')
  },

  // Merivoimat (Navy) - Aliupseerit
  {
    name: 'Pursimies',
    category: 'Aliupseerit',
    branch: 'navy',
    sleeveInsignia: getImagePath('images/hihalaatta/Pursimies.svg')
  },
  {
    name: 'Ylipursimies',
    category: 'Aliupseerit',
    branch: 'navy',
    sleeveInsignia: getImagePath('images/hihalaatta/Ylipursimies.svg')
  },
  {
    name: 'Sotilasmestari',
    category: 'Aliupseerit',
    branch: 'navy',
    sleeveInsignia: getImagePath('images/hihalaatta/Sotilasmestari_l.svg')
  },

  // Merivoimat (Navy) - Upseerit
  {
    name: 'Aliluutnantti',
    category: 'Upseerit',
    branch: 'navy',
    shoulderInsignia: getImagePath('images/olkalaatta/Aliluutnantti.svg')
  },
  {
    name: 'Luutnantti',
    category: 'Upseerit',
    branch: 'navy',
    shoulderInsignia: getImagePath('images/olkalaatta/Luutnantti_l.svg')
  },
  {
    name: 'Yliluutnantti',
    category: 'Upseerit',
    branch: 'navy',
    shoulderInsignia: getImagePath('images/olkalaatta/Yliluutnantti_l.svg')
  },
  {
    name: 'Kapteeniluutnantti',
    category: 'Upseerit',
    branch: 'navy',
    shoulderInsignia: getImagePath('images/olkalaatta/Kapteeniluutnantti.svg')
  },
  {
    name: 'Komentajakapteeni',
    category: 'Upseerit',
    branch: 'navy',
    shoulderInsignia: getImagePath('images/olkalaatta/Komentajakapteeni.svg')
  },
  {
    name: 'Komentaja',
    category: 'Upseerit',
    branch: 'navy',
    shoulderInsignia: getImagePath('images/olkalaatta/Komentaja.svg')
  },
  {
    name: 'Kommodori',
    category: 'Upseerit',
    branch: 'navy',
    shoulderInsignia: getImagePath('images/olkalaatta/Kommodori.svg')
  },
  {
    name: 'Lippueamiraali',
    category: 'Upseerit',
    branch: 'navy',
    shoulderInsignia: getImagePath('images/olkalaatta/Lippueamiraali.svg')
  },
  {
    name: 'Kontra-amiraali',
    category: 'Upseerit',
    branch: 'navy',
    shoulderInsignia: getImagePath('images/olkalaatta/Kontra-amiraali.svg')
  },
  {
    name: 'Vara-amiraali',
    category: 'Upseerit',
    branch: 'navy',
    shoulderInsignia: getImagePath('images/olkalaatta/Vara-amiraali.svg')
  },
  {
    name: 'Amiraali',
    category: 'Upseerit',
    branch: 'navy',
    shoulderInsignia: getImagePath('images/olkalaatta/Amiraali.svg')
  },
];
