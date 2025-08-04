// Données harmonisées pour les vins

export const COUNTRIES = [
  { value: "France", label: "France" },
  { value: "Italie", label: "Italie" },
  { value: "Espagne", label: "Espagne" },
  { value: "Allemagne", label: "Allemagne" },
  { value: "Portugal", label: "Portugal" },
  { value: "États-Unis", label: "États-Unis" },
  { value: "Argentine", label: "Argentine" },
  { value: "Chili", label: "Chili" },
  { value: "Australie", label: "Australie" },
  { value: "Nouvelle-Zélande", label: "Nouvelle-Zélande" },
  { value: "Afrique du Sud", label: "Afrique du Sud" },
  { value: "Canada", label: "Canada" },
  { value: "Grèce", label: "Grèce" },
  { value: "Autriche", label: "Autriche" },
  { value: "Suisse", label: "Suisse" },
  { value: "Liban", label: "Liban" },
  { value: "Israël", label: "Israël" },
  { value: "Turquie", label: "Turquie" },
  { value: "Géorgie", label: "Géorgie" },
  { value: "Moldovie", label: "Moldovie" },
  { value: "Roumanie", label: "Roumanie" },
  { value: "Bulgarie", label: "Bulgarie" },
  { value: "Hongrie", label: "Hongrie" },
  { value: "Slovénie", label: "Slovénie" },
  { value: "Croatie", label: "Croatie" },
];

export const FRENCH_REGIONS = [
  { value: "Alsace", label: "Alsace" },
  { value: "Beaujolais", label: "Beaujolais" },
  { value: "Bordeaux", label: "Bordeaux" },
  { value: "Bourgogne", label: "Bourgogne" },
  { value: "Champagne", label: "Champagne" },
  { value: "Chablis", label: "Chablis" },
  { value: "Châteauneuf-du-Pape", label: "Châteauneuf-du-Pape" },
  { value: "Côte de Beaune", label: "Côte de Beaune" },
  { value: "Côte de Nuits", label: "Côte de Nuits" },
  { value: "Côte du Rhône", label: "Côte du Rhône" },
  { value: "Côtes de Provence", label: "Côtes de Provence" },
  { value: "Languedoc", label: "Languedoc" },
  { value: "Loire", label: "Loire" },
  { value: "Médoc", label: "Médoc" },
  { value: "Muscadet", label: "Muscadet" },
  { value: "Pomerol", label: "Pomerol" },
  { value: "Pouilly-Fuissé", label: "Pouilly-Fuissé" },
  { value: "Sancerre", label: "Sancerre" },
  { value: "Saint-Émilion", label: "Saint-Émilion" },
  { value: "Saint-Estèphe", label: "Saint-Estèphe" },
  { value: "Saint-Joseph", label: "Saint-Joseph" },
  { value: "Saint-Julien", label: "Saint-Julien" },
  { value: "Sauternes", label: "Sauternes" },
];

export const ITALIAN_REGIONS = [
  { value: "Barolo", label: "Barolo" },
  { value: "Barbaresco", label: "Barbaresco" },
  { value: "Brunello di Montalcino", label: "Brunello di Montalcino" },
  { value: "Chianti", label: "Chianti" },
  { value: "Chianti Classico", label: "Chianti Classico" },
  { value: "Amarone della Valpolicella", label: "Amarone della Valpolicella" },
  { value: "Prosecco", label: "Prosecco" },
  { value: "Soave", label: "Soave" },
  { value: "Montepulciano d'Abruzzo", label: "Montepulciano d'Abruzzo" },
  { value: "Primitivo di Manduria", label: "Primitivo di Manduria" },
];

export const SPANISH_REGIONS = [
  { value: "Rioja", label: "Rioja" },
  { value: "Ribera del Duero", label: "Ribera del Duero" },
  { value: "Priorat", label: "Priorat" },
  { value: "Rías Baixas", label: "Rías Baixas" },
  { value: "Jerez", label: "Jerez" },
  { value: "Cava", label: "Cava" },
];

export const OTHER_REGIONS = [
  { value: "Napa Valley", label: "Napa Valley (États-Unis)" },
  { value: "Sonoma", label: "Sonoma (États-Unis)" },
  { value: "Mendoza", label: "Mendoza (Argentine)" },
  { value: "Colchagua Valley", label: "Colchagua Valley (Chili)" },
  { value: "Barossa Valley", label: "Barossa Valley (Australie)" },
  { value: "Marlborough", label: "Marlborough (Nouvelle-Zélande)" },
  { value: "Stellenbosch", label: "Stellenbosch (Afrique du Sud)" },
  { value: "Douro", label: "Douro (Portugal)" },
  { value: "Mosel", label: "Mosel (Allemagne)" },
  { value: "Rheingau", label: "Rheingau (Allemagne)" },
];

export const GRAPE_VARIETIES = [
  // Rouges
  { value: "Cabernet Sauvignon", label: "Cabernet Sauvignon" },
  { value: "Merlot", label: "Merlot" },
  { value: "Pinot Noir", label: "Pinot Noir" },
  { value: "Syrah", label: "Syrah" },
  { value: "Grenache", label: "Grenache" },
  { value: "Sangiovese", label: "Sangiovese" },
  { value: "Tempranillo", label: "Tempranillo" },
  { value: "Nebbiolo", label: "Nebbiolo" },
  { value: "Cabernet Franc", label: "Cabernet Franc" },
  { value: "Gamay", label: "Gamay" },
  { value: "Malbec", label: "Malbec" },
  { value: "Petit Verdot", label: "Petit Verdot" },
  { value: "Carménère", label: "Carménère" },
  { value: "Zinfandel", label: "Zinfandel" },
  { value: "Primitivo", label: "Primitivo" },
  { value: "Montepulciano", label: "Montepulciano" },
  { value: "Barbera", label: "Barbera" },
  { value: "Dolcetto", label: "Dolcetto" },
  { value: "Corvina", label: "Corvina" },
  { value: "Garnacha", label: "Garnacha" },
  { value: "Mourvedre", label: "Mourvedre" },
  { value: "Carignan", label: "Carignan" },
  
  // Blancs
  { value: "Chardonnay", label: "Chardonnay" },
  { value: "Sauvignon Blanc", label: "Sauvignon Blanc" },
  { value: "Riesling", label: "Riesling" },
  { value: "Pinot Grigio", label: "Pinot Grigio" },
  { value: "Gewürztraminer", label: "Gewürztraminer" },
  { value: "Chenin Blanc", label: "Chenin Blanc" },
  { value: "Sémillon", label: "Sémillon" },
  { value: "Muscadet", label: "Muscadet" },
  { value: "Viognier", label: "Viognier" },
  { value: "Albariño", label: "Albariño" },
  { value: "Verdejo", label: "Verdejo" },
  { value: "Pinot Blanc", label: "Pinot Blanc" },
  { value: "Roussanne", label: "Roussanne" },
  { value: "Marsanne", label: "Marsanne" },
  { value: "Grüner Veltliner", label: "Grüner Veltliner" },
  { value: "Prosecco", label: "Prosecco" },
  { value: "Trebbiano", label: "Trebbiano" },
  { value: "Vermentino", label: "Vermentino" },
  { value: "Cortese", label: "Cortese" },
  { value: "Falanghina", label: "Falanghina" },
];

export const getRegionsByCountry = (country) => {
  switch (country) {
    case "France":
      return FRENCH_REGIONS;
    case "Italie":
      return ITALIAN_REGIONS;
    case "Espagne":
      return SPANISH_REGIONS;
    default:
      return OTHER_REGIONS.filter(region => 
        region.label.includes(`(${country})`)
      );
  }
};

export const getAllRegions = () => [
  ...FRENCH_REGIONS,
  ...ITALIAN_REGIONS,
  ...SPANISH_REGIONS,
  ...OTHER_REGIONS,
];