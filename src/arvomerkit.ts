export type Branch = 'army-airforce' | 'navy';

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
    collarInsignia: '/images/kauluslaatta/Sotamies.svg',
    chestInsignia: '/images/rintalaatta/Sotamies.svg'
  },
  {
    name: 'Korpraali',
    category: 'Miehistö',
    branch: 'army-airforce',
    collarInsignia: '/images/kauluslaatta/Korpraali.svg',
    chestInsignia: '/images/rintalaatta/Korpraali.svg'
  },
  {
    name: 'Aliupseerioppilas',
    category: 'Miehistö',
    branch: 'army-airforce',
    collarInsignia: '/images/kauluslaatta/Aliupseerioppilas.svg',
    chestInsignia: '/images/rintalaatta/Aliupseerioppilas.svg'
  },
  {
    name: 'Alikersantti',
    category: 'Miehistö',
    branch: 'army-airforce',
    collarInsignia: '/images/kauluslaatta/Alikersantti.svg',
    chestInsignia: '/images/rintalaatta/Alikersantti.svg'
  },

  // Aliupseerit (Non-commissioned Officers) - Army/Air Force
  {
    name: 'Kersantti',
    category: 'Aliupseerit',
    branch: 'army-airforce',
    collarInsignia: '/images/kauluslaatta/Kersantti.svg',
    chestInsignia: '/images/rintalaatta/Kersantti.svg'
  },
  {
    name: 'Upseerioppilas',
    category: 'Aliupseerit',
    branch: 'army-airforce',
    collarInsignia: '/images/kauluslaatta/Upseerioppilas.svg',
    chestInsignia: '/images/rintalaatta/Upseerioppilas.svg'
  },
  {
    name: 'Ylikersantti',
    category: 'Aliupseerit',
    branch: 'army-airforce',
    collarInsignia: '/images/kauluslaatta/Ylikersantti.svg',
    chestInsignia: '/images/rintalaatta/Ylikersantti.svg'
  },
  {
    name: 'Upseerikokelas',
    category: 'Aliupseerit',
    branch: 'army-airforce',
    collarInsignia: '/images/kauluslaatta/Upseerikokelas.svg',
    chestInsignia: '/images/rintalaatta/Upseerikokelas.svg'
  },
  {
    name: 'Vääpeli',
    category: 'Aliupseerit',
    branch: 'army-airforce',
    collarInsignia: '/images/kauluslaatta/Vääpeli.svg',
    chestInsignia: '/images/rintalaatta/Vääpeli.svg'
  },
  {
    name: 'Ylivääpeli',
    category: 'Aliupseerit',
    branch: 'army-airforce',
    collarInsignia: '/images/kauluslaatta/Ylivääpeli.svg',
    chestInsignia: '/images/rintalaatta/Ylivääpeli.svg'
  },
  {
    name: 'Sotilasmestari',
    category: 'Aliupseerit',
    branch: 'army-airforce',
    collarInsignia: '/images/kauluslaatta/Sotilasmestari.svg',
    chestInsignia: '/images/rintalaatta/Sotilasmestari.svg'
  },

  // Upseerit (Officers) - Army/Air Force
  {
    name: 'Vänrikki',
    category: 'Upseerit',
    branch: 'army-airforce',
    collarInsignia: '/images/kauluslaatta/Vänrikki.svg',
    chestInsignia: '/images/rintalaatta/Vänrikki.svg'
  },
  {
    name: 'Luutnantti',
    category: 'Upseerit',
    branch: 'army-airforce',
    collarInsignia: '/images/kauluslaatta/Luutnantti.svg',
    chestInsignia: '/images/rintalaatta/Luutnantti.svg'
  },
  {
    name: 'Yliluutnantti',
    category: 'Upseerit',
    branch: 'army-airforce',
    collarInsignia: '/images/kauluslaatta/Yliluutnantti.svg',
    chestInsignia: '/images/rintalaatta/Yliluutnantti.svg'
  },
  {
    name: 'Kapteeni',
    category: 'Upseerit',
    branch: 'army-airforce',
    collarInsignia: '/images/kauluslaatta/Kapteeni.svg',
    chestInsignia: '/images/rintalaatta/Kapteeni.svg'
  },
  {
    name: 'Majuri',
    category: 'Upseerit',
    branch: 'army-airforce',
    collarInsignia: '/images/kauluslaatta/Majuri.svg',
    chestInsignia: '/images/rintalaatta/Majuri.svg'
  },
  {
    name: 'Everstiluutnantti',
    category: 'Upseerit',
    branch: 'army-airforce',
    collarInsignia: '/images/kauluslaatta/Everstiluutnantti.svg',
    chestInsignia: '/images/rintalaatta/Everstiluutnantti.svg'
  },
  {
    name: 'Eversti',
    category: 'Upseerit',
    branch: 'army-airforce',
    collarInsignia: '/images/kauluslaatta/Eversti.svg',
    chestInsignia: '/images/rintalaatta/Eversti.svg'
  },
  {
    name: 'Prikaatikenraali',
    category: 'Upseerit',
    branch: 'army-airforce',
    collarInsignia: '/images/kauluslaatta/Prikaatikenraali.svg',
    chestInsignia: '/images/rintalaatta/Prikaatikenraali.svg'
  },
  {
    name: 'Kenraalimajuri',
    category: 'Upseerit',
    branch: 'army-airforce',
    collarInsignia: '/images/kauluslaatta/Kenraalimajuri.svg',
    chestInsignia: '/images/rintalaatta/Kenraalimajuri.svg'
  },
  {
    name: 'Kenraaliluutnantti',
    category: 'Upseerit',
    branch: 'army-airforce',
    collarInsignia: '/images/kauluslaatta/Kenraaliluutnantti.svg',
    chestInsignia: '/images/rintalaatta/Kenraaliluutnantti.svg'
  },
  {
    name: 'Kenraali',
    category: 'Upseerit',
    branch: 'army-airforce',
    collarInsignia: '/images/kauluslaatta/Kenraali.svg',
    chestInsignia: '/images/rintalaatta/Kenraali.svg'
  },

  // Merivoimat (Navy) - Miehistö
  {
    name: 'Matruusi',
    category: 'Miehistö',
    branch: 'navy',
    sleeveInsignia: '/images/hihalaatta/Matruusi.svg'
  },
  {
    name: 'Ylimatruusi',
    category: 'Miehistö',
    branch: 'navy',
    sleeveInsignia: '/images/hihalaatta/Ylimatruusi.svg'
  },

  // Merivoimat (Navy) - Aliupseerit
  {
    name: 'Pursimies',
    category: 'Aliupseerit',
    branch: 'navy',
    sleeveInsignia: '/images/hihalaatta/Pursimies.svg'
  },
  {
    name: 'Ylipursimies',
    category: 'Aliupseerit',
    branch: 'navy',
    sleeveInsignia: '/images/hihalaatta/Ylipursimies.svg'
  },
  {
    name: 'Sotilasmestari',
    category: 'Aliupseerit',
    branch: 'navy',
    sleeveInsignia: '/images/hihalaatta/Sotilasmestari_l.svg'
  },

  // Merivoimat (Navy) - Upseerit
  {
    name: 'Aliluutnantti',
    category: 'Upseerit',
    branch: 'navy',
    shoulderInsignia: '/images/olkalaatta/Aliluutnantti.svg'
  },
  {
    name: 'Luutnantti',
    category: 'Upseerit',
    branch: 'navy',
    shoulderInsignia: '/images/olkalaatta/Luutnantti_l.svg'
  },
  {
    name: 'Yliluutnantti',
    category: 'Upseerit',
    branch: 'navy',
    shoulderInsignia: '/images/olkalaatta/Yliluutnantti_l.svg'
  },
  {
    name: 'Kapteeniluutnantti',
    category: 'Upseerit',
    branch: 'navy',
    shoulderInsignia: '/images/olkalaatta/Kapteeniluutnantti.svg'
  },
  {
    name: 'Komentajakapteeni',
    category: 'Upseerit',
    branch: 'navy',
    shoulderInsignia: '/images/olkalaatta/Komentajakapteeni.svg'
  },
  {
    name: 'Komentaja',
    category: 'Upseerit',
    branch: 'navy',
    shoulderInsignia: '/images/olkalaatta/Komentaja.svg'
  },
  {
    name: 'Kommodori',
    category: 'Upseerit',
    branch: 'navy',
    shoulderInsignia: '/images/olkalaatta/Kommodori.svg'
  },
  {
    name: 'Lippueamiraali',
    category: 'Upseerit',
    branch: 'navy',
    shoulderInsignia: '/images/olkalaatta/Lippueamiraali.svg'
  },
  {
    name: 'Kontra-amiraali',
    category: 'Upseerit',
    branch: 'navy',
    shoulderInsignia: '/images/olkalaatta/Kontra-amiraali.svg'
  },
  {
    name: 'Vara-amiraali',
    category: 'Upseerit',
    branch: 'navy',
    shoulderInsignia: '/images/olkalaatta/Vara-amiraali.svg'
  },
  {
    name: 'Amiraali',
    category: 'Upseerit',
    branch: 'navy',
    shoulderInsignia: '/images/olkalaatta/Amiraali.svg'
  },
];
