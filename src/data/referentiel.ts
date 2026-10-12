import { Commune, Quartier, Role, Utilisateur } from '../types';

export const COMMUNES_GUEDIAWAYE: Commune[] = [
  {
    id: 'golf-sud',
    nom: 'Golf Sud',
    code: 'GLF',
    coordonnateur: 'Ousmane Sall',
    telephoneCoordonnateur: '+221 77 645 12 34',
    objectifMilitants: 15000,
    description: 'Bordure maritime nord, zones résidentielles Hamo et cités côtières.',
    couleur: '#059669', // Emerald
    centre: [14.7785, -17.4082]
  },
  {
    id: 'medina-gounass',
    nom: 'Médina Gounass',
    code: 'MDG',
    coordonnateur: 'Aïssatou Diallo Ba',
    telephoneCoordonnateur: '+221 78 512 88 90',
    objectifMilitants: 12000,
    description: 'Zone à forte densité populaire et tissu associatif dynamique.',
    couleur: '#0284c7', // Sky
    centre: [14.7645, -17.3872]
  },
  {
    id: 'ndiareme-limamoulaye',
    nom: 'Ndiarème Limamoulaye',
    code: 'NDL',
    coordonnateur: 'Mamadou Lamine Diop',
    telephoneCoordonnateur: '+221 76 333 45 67',
    objectifMilitants: 10000,
    description: 'Cœur historique et religieux aux abords des dunes côtières.',
    couleur: '#7c3aed', // Violet
    centre: [14.7720, -17.3980]
  },
  {
    id: 'sam-notaire',
    nom: 'Sam Notaire',
    code: 'SMN',
    coordonnateur: 'Fatou Bintou Ndiaye',
    telephoneCoordonnateur: '+221 70 890 22 11',
    objectifMilitants: 14000,
    description: 'Centre administratif, marchés principaux et cités fonctionnaires.',
    couleur: '#ea580c', // Orange
    centre: [14.7690, -17.4120]
  },
  {
    id: 'wakhinane-nimzatt',
    nom: 'Wakhinane Nimzatt',
    code: 'WKN',
    coordonnateur: 'Cheikh Tidiane Ba',
    telephoneCoordonnateur: '+221 75 421 99 78',
    objectifMilitants: 16000,
    description: 'Plus vaste commune d’expansion est, forte population jeune.',
    couleur: '#b45309', // Amber
    centre: [14.7810, -17.3790]
  }
];

export const QUARTIERS_GUEDIAWAYE: Quartier[] = [
  // Golf Sud (10 quartiers)
  { id: 'glf-hamo-1', communeId: 'golf-sud', nom: 'Hamo 1', commissaire: 'Ibrahima Ndiaye', telephoneCommissaire: '+221 77 201 11 22', superviseur: 'Abdoulaye Wade Thiam', centre: [14.7820, -17.4120], objectif: 1800 },
  { id: 'glf-hamo-2', communeId: 'golf-sud', nom: 'Hamo 2', commissaire: 'Mariama Sarr', telephoneCommissaire: '+221 77 302 22 33', superviseur: 'Abdoulaye Wade Thiam', centre: [14.7810, -17.4090], objectif: 1700 },
  { id: 'glf-hamo-3', communeId: 'golf-sud', nom: 'Hamo 3', commissaire: 'Seydou Camara', telephoneCommissaire: '+221 77 403 33 44', superviseur: 'Abdoulaye Wade Thiam', centre: [14.7800, -17.4060], objectif: 1600 },
  { id: 'glf-hamo-4', communeId: 'golf-sud', nom: 'Hamo 4', commissaire: 'Khadija Sow', telephoneCommissaire: '+221 77 504 44 55', superviseur: 'Abdoulaye Wade Thiam', centre: [14.7790, -17.4030], objectif: 1500 },
  { id: 'glf-hamo-5', communeId: 'golf-sud', nom: 'Hamo 5', commissaire: 'Alioune Fall', telephoneCommissaire: '+221 77 605 55 66', superviseur: 'Aminata Touré', centre: [14.7770, -17.4050], objectif: 1400 },
  { id: 'glf-hamo-6', communeId: 'golf-sud', nom: 'Hamo 6', commissaire: 'Non pourvu', telephoneCommissaire: '', superviseur: 'Aminata Touré', centre: [14.7760, -17.4020], objectif: 1400 },
  { id: 'glf-aliou-sow', communeId: 'golf-sud', nom: 'Cité Aliou Sow', commissaire: 'Babacar Guèye', telephoneCommissaire: '+221 78 111 22 33', superviseur: 'Aminata Touré', centre: [14.7750, -17.4140], objectif: 1900 },
  { id: 'glf-bagdad', communeId: 'golf-sud', nom: 'Bagdad', commissaire: 'Awa Cissé', telephoneCommissaire: '+221 78 222 33 44', superviseur: 'Aminata Touré', centre: [14.7730, -17.4110], objectif: 1300 },
  { id: 'glf-fith-mith', communeId: 'golf-sud', nom: 'Fith Mith', commissaire: 'Moussa Kane', telephoneCommissaire: '+221 76 555 12 34', superviseur: 'Abdoulaye Wade Thiam', centre: [14.7710, -17.4080], objectif: 1200 },
  { id: 'glf-sahm', communeId: 'golf-sud', nom: 'Sahm Golf', commissaire: 'Ndeye Fatou Diop', telephoneCommissaire: '+221 70 333 99 88', superviseur: 'Aminata Touré', centre: [14.7740, -17.4060], objectif: 1200 },

  // Médina Gounass (9 quartiers)
  { id: 'mdg-gounass-1', communeId: 'medina-gounass', nom: 'Gounass 1', commissaire: 'El Hadji Malick Sy', telephoneCommissaire: '+221 77 789 01 23', superviseur: 'Oumar Sylla', centre: [14.7670, -17.3910], objectif: 1500 },
  { id: 'mdg-gounass-2', communeId: 'medina-gounass', nom: 'Gounass 2', commissaire: 'Rokhayatou Dia', telephoneCommissaire: '+221 77 890 12 34', superviseur: 'Oumar Sylla', centre: [14.7655, -17.3890], objectif: 1400 },
  { id: 'mdg-gounass-3', communeId: 'medina-gounass', nom: 'Gounass 3', commissaire: 'Demba Ba', telephoneCommissaire: '+221 77 901 23 45', superviseur: 'Oumar Sylla', centre: [14.7640, -17.3860], objectif: 1300 },
  { id: 'mdg-gounass-4', communeId: 'medina-gounass', nom: 'Gounass 4', commissaire: 'Non pourvu', telephoneCommissaire: '', superviseur: 'Oumar Sylla', centre: [14.7625, -17.3840], objectif: 1300 },
  { id: 'mdg-darou-salam', communeId: 'medina-gounass', nom: 'Darou Salam Gounass', commissaire: 'Boubacar Baldé', telephoneCommissaire: '+221 78 444 55 66', superviseur: 'Salif Sané', centre: [14.7660, -17.3830], objectif: 1400 },
  { id: 'mdg-minam', communeId: 'medina-gounass', nom: 'Minam', commissaire: 'Astou Seck', telephoneCommissaire: '+221 76 666 77 88', superviseur: 'Salif Sané', centre: [14.7635, -17.3810], objectif: 1200 },
  { id: 'mdg-touba-gounass', communeId: 'medina-gounass', nom: 'Touba Gounass', commissaire: 'Serigne Fallou Mbacké', telephoneCommissaire: '+221 70 123 45 67', superviseur: 'Salif Sané', centre: [14.7610, -17.3850], objectif: 1500 },
  { id: 'mdg-bassene', communeId: 'medina-gounass', nom: 'Bassène', commissaire: 'Ousmane Mané', telephoneCommissaire: '+221 77 345 67 89', superviseur: 'Salif Sané', centre: [14.7620, -17.3880], objectif: 1200 },
  { id: 'mdg-wally-dantang', communeId: 'medina-gounass', nom: 'Wally Dantang', commissaire: 'Aissata Barry', telephoneCommissaire: '+221 78 888 99 00', superviseur: 'Oumar Sylla', centre: [14.7680, -17.3880], objectif: 1200 },

  // Ndiarème Limamoulaye (8 quartiers)
  { id: 'ndl-ndiareme-1', communeId: 'ndiareme-limamoulaye', nom: 'Ndiarème 1', commissaire: 'Thierno Laye', telephoneCommissaire: '+221 77 456 78 90', superviseur: 'Djibril Ndoye', centre: [14.7745, -17.4010], objectif: 1400 },
  { id: 'ndl-ndiareme-2', communeId: 'ndiareme-limamoulaye', nom: 'Ndiarème 2', commissaire: 'Khadim Laye', telephoneCommissaire: '+221 77 567 89 01', superviseur: 'Djibril Ndoye', centre: [14.7730, -17.3990], objectif: 1300 },
  { id: 'ndl-ndiareme-3', communeId: 'ndiareme-limamoulaye', nom: 'Ndiarème 3', commissaire: 'Mame Diarra Bousso', telephoneCommissaire: '+221 77 678 90 12', superviseur: 'Djibril Ndoye', centre: [14.7715, -17.3970], objectif: 1300 },
  { id: 'ndl-darou-minam', communeId: 'ndiareme-limamoulaye', nom: 'Darou Minam', commissaire: 'Amadou Lamine', telephoneCommissaire: '+221 78 777 88 99', superviseur: 'Djibril Ndoye', centre: [14.7700, -17.3950], objectif: 1200 },
  { id: 'ndl-cite-comico', communeId: 'ndiareme-limamoulaye', nom: 'Cité COMICO', commissaire: 'Moussa Faye', telephoneCommissaire: '+221 76 111 22 33', superviseur: 'Sokhna Mbaye', centre: [14.7735, -17.4040], objectif: 1400 },
  { id: 'ndl-dakar-marine', communeId: 'ndiareme-limamoulaye', nom: 'Cité Dakar Marine', commissaire: 'Aïda Samb', telephoneCommissaire: '+221 70 444 55 66', superviseur: 'Sokhna Mbaye', centre: [14.7755, -17.3980], objectif: 1200 },
  { id: 'ndl-diamaguene', communeId: 'ndiareme-limamoulaye', nom: 'Diamaguène Ndiarème', commissaire: 'Non pourvu', telephoneCommissaire: '', superviseur: 'Sokhna Mbaye', centre: [14.7690, -17.4020], objectif: 1100 },
  { id: 'ndl-layene', communeId: 'ndiareme-limamoulaye', nom: 'Quartier Layène', commissaire: 'Libasse Thiaw', telephoneCommissaire: '+221 77 888 12 34', superviseur: 'Sokhna Mbaye', centre: [14.7760, -17.4010], objectif: 1100 },

  // Sam Notaire (9 quartiers)
  { id: 'smn-notaire-1', communeId: 'sam-notaire', nom: 'Notaire 1', commissaire: 'Cheikh Sarr', telephoneCommissaire: '+221 77 123 99 88', superviseur: 'Moustapha Cissé', centre: [14.7710, -17.4160], objectif: 1600 },
  { id: 'smn-notaire-2', communeId: 'sam-notaire', nom: 'Notaire 2', commissaire: 'Fatou Kiné Diagne', telephoneCommissaire: '+221 77 234 88 77', superviseur: 'Moustapha Cissé', centre: [14.7695, -17.4140], objectif: 1600 },
  { id: 'smn-notaire-3', communeId: 'sam-notaire', nom: 'Notaire 3', commissaire: 'Abdoulaye Ly', telephoneCommissaire: '+221 77 345 77 66', superviseur: 'Moustapha Cissé', centre: [14.7680, -17.4120], objectif: 1500 },
  { id: 'smn-notaire-4', communeId: 'sam-notaire', nom: 'Notaire 4', commissaire: 'Coumba Kane', telephoneCommissaire: '+221 77 456 66 55', superviseur: 'Moustapha Cissé', centre: [14.7665, -17.4100], objectif: 1400 },
  { id: 'smn-cite-enseignant', communeId: 'sam-notaire', nom: 'Cité des Enseignants', commissaire: 'Prof. Amadou Sow', telephoneCommissaire: '+221 78 555 66 77', superviseur: 'Khady Bâ', centre: [14.7725, -17.4180], objectif: 1800 },
  { id: 'smn-cite-douane', communeId: 'sam-notaire', nom: 'Cité Douane', commissaire: 'Mame Cheikh Ndir', telephoneCommissaire: '+221 76 222 33 44', superviseur: 'Khady Bâ', centre: [14.7705, -17.4110], objectif: 1700 },
  { id: 'smn-sam-centre', communeId: 'sam-notaire', nom: 'Sam Centre Marché', commissaire: 'Gorgui Wade', telephoneCommissaire: '+221 70 777 88 99', superviseur: 'Khady Bâ', centre: [14.7685, -17.4150], objectif: 1600 },
  { id: 'smn-darou-rahmane-smn', communeId: 'sam-notaire', nom: 'Darou Rahmane Sam', commissaire: 'Adji Bousso', telephoneCommissaire: '+221 77 999 00 11', superviseur: 'Khady Bâ', centre: [14.7650, -17.4130], objectif: 1400 },
  { id: 'smn-diacksao', communeId: 'sam-notaire', nom: 'Diacksao Sam', commissaire: 'Non pourvu', telephoneCommissaire: '', superviseur: 'Moustapha Cissé', centre: [14.7640, -17.4170], objectif: 1400 },

  // Wakhinane Nimzatt (10 quartiers)
  { id: 'wkn-nimzatt-1', communeId: 'wakhinane-nimzatt', nom: 'Nimzatt 1', commissaire: 'El Hadji Diop', telephoneCommissaire: '+221 77 111 44 55', superviseur: 'Babacar Ndiaye', centre: [14.7830, -17.3820], objectif: 1800 },
  { id: 'wkn-nimzatt-2', communeId: 'wakhinane-nimzatt', nom: 'Nimzatt 2', commissaire: 'Binetou Tall', telephoneCommissaire: '+221 77 222 55 66', superviseur: 'Babacar Ndiaye', centre: [14.7815, -17.3800], objectif: 1700 },
  { id: 'wkn-nimzatt-3', communeId: 'wakhinane-nimzatt', nom: 'Nimzatt 3', commissaire: 'Modou Khoulé', telephoneCommissaire: '+221 77 333 66 77', superviseur: 'Babacar Ndiaye', centre: [14.7800, -17.3780], objectif: 1600 },
  { id: 'wkn-nimzatt-4', communeId: 'wakhinane-nimzatt', nom: 'Nimzatt 4', commissaire: 'Yacine Diagne', telephoneCommissaire: '+221 77 444 77 88', superviseur: 'Babacar Ndiaye', centre: [14.7785, -17.3760], objectif: 1600 },
  { id: 'wkn-darou-rahmane', communeId: 'wakhinane-nimzatt', nom: 'Darou Rahmane', commissaire: 'Serigne Mbacké', telephoneCommissaire: '+221 78 666 77 88', superviseur: 'Marième Sène', centre: [14.7840, -17.3750], objectif: 1700 },
  { id: 'wkn-touba-guediawaye', communeId: 'wakhinane-nimzatt', nom: 'Touba Guédiawaye', commissaire: 'Fallou Ndiaye', telephoneCommissaire: '+221 76 888 99 00', superviseur: 'Marième Sène', centre: [14.7860, -17.3780], objectif: 1900 },
  { id: 'wkn-darou-salam-2', communeId: 'wakhinane-nimzatt', nom: 'Darou Salam 2', commissaire: 'Aïssata Diallo', telephoneCommissaire: '+221 70 555 44 33', superviseur: 'Marième Sène', centre: [14.7770, -17.3740], objectif: 1500 },
  { id: 'wkn-apix', communeId: 'wakhinane-nimzatt', nom: 'Cité APIX Wakhinane', commissaire: 'Idrissa Traoré', telephoneCommissaire: '+221 77 777 33 22', superviseur: 'Marième Sène', centre: [14.7850, -17.3710], objectif: 1500 },
  { id: 'wkn-fith-mith-nord', communeId: 'wakhinane-nimzatt', nom: 'Fith Mith Nord', commissaire: 'Non pourvu', telephoneCommissaire: '', superviseur: 'Babacar Ndiaye', centre: [14.7795, -17.3850], objectif: 1400 },
  { id: 'wkn-dunes', communeId: 'wakhinane-nimzatt', nom: 'Zone des Dunes Littorales', commissaire: 'Massamba Guèye', telephoneCommissaire: '+221 78 999 11 22', superviseur: 'Marième Sène', centre: [14.7880, -17.3800], objectif: 1400 }
];

export const DEMO_USERS: Utilisateur[] = [
  {
    id: 'user-admin',
    identifiant: 'admin',
    nomComplet: 'Mouhamadou Mansour Sy',
    role: 'admin',
    email: 'admin.central@kiiraay.sn',
    telephone: '+221 77 600 00 01',
    actif: true
  },
  {
    id: 'user-coord-golfsud',
    identifiant: 'coord.golfsud',
    nomComplet: 'Ousmane Sall',
    role: 'coordonnateur',
    email: 'coord.golfsud@kiiraay.sn',
    telephone: '+221 77 645 12 34',
    communeId: 'golf-sud',
    actif: true
  },
  {
    id: 'user-sup-golfsud',
    identifiant: 'sup.golfsud',
    nomComplet: 'Abdoulaye Wade Thiam',
    role: 'superviseur',
    email: 'sup.golfsud@kiiraay.sn',
    telephone: '+221 77 555 11 22',
    communeId: 'golf-sud',
    quartierIds: ['glf-hamo-1', 'glf-hamo-2', 'glf-hamo-3', 'glf-hamo-4'],
    actif: true
  },
  {
    id: 'user-commissaire-hamo',
    identifiant: 'commissaire.hamo',
    nomComplet: 'Ibrahima Ndiaye',
    role: 'commissaire',
    email: 'commissaire.hamo1@kiiraay.sn',
    telephone: '+221 77 201 11 22',
    communeId: 'golf-sud',
    quartierIds: ['glf-hamo-1'],
    actif: true
  },
  {
    id: 'user-saisie',
    identifiant: 'saisie',
    nomComplet: 'Aminata Badiane',
    role: 'saisie',
    email: 'saisie@kiiraay.sn',
    telephone: '+221 76 400 90 90',
    actif: true
  },
  {
    id: 'user-decideur',
    identifiant: 'decideur',
    nomComplet: 'Dr. Cheikh Anta Diop Junior',
    role: 'decideur',
    email: 'decideur.comite@kiiraay.sn',
    telephone: '+221 70 800 12 34',
    actif: true
  },
  {
    id: 'user-militant',
    identifiant: 'militant.demo',
    nomComplet: 'Ndeye Astou Diouf',
    role: 'militant',
    email: 'ndeye.diouf@gmail.com',
    telephone: '+221 77 345 88 12',
    communeId: 'golf-sud',
    quartierIds: ['glf-hamo-1'],
    militantId: 'mil-001',
    actif: true
  }
];

export const SOURCES_COLLECTE = [
  'Porte-à-porte',
  'Permanence communale',
  'Meeting politique',
  'Parrainage / Recommandation',
  'Réseaux sociaux & Web',
  'Caravane de proximité'
];

export const MOTIFS_DESACTIVATION = [
  'Déménagement hors Guédiawaye',
  'Décès',
  'Démission volontaire',
  'Incompatibilité statutaire',
  'Doublon confirmé et fusionné',
  'Sanction disciplinaire'
];

export const FONCTIONS_PARTI = [
  'Militant de base',
  'Délégué de secteur',
  'Membre cellule de quartier',
  'Responsable Mouvement des Jeunes',
  'Responsable Mouvement des Femmes',
  'Cadre et comité scientifique',
  'Agent électoral de bureau'
];

export const TRANCHES_AGE = [
  { id: '18-25', label: '18 - 25 ans' },
  { id: '26-35', label: '26 - 35 ans' },
  { id: '36-50', label: '36 - 50 ans' },
  { id: '51-65', label: '51 - 65 ans' },
  { id: '65+', label: 'Plus de 65 ans' }
];

export const PERMISSIONS_PAR_ROLE: Record<Role, {
  peutVoirDonneesPersonnelles: boolean;
  peutEcrire: boolean;
  peutValider: boolean;
  peutDesactiver: boolean;
  peutExporter: boolean;
  peutImporter: boolean;
  peutGererUtilisateurs: boolean;
  peutVoirAudit: boolean;
  peutVoirPointsGPS: boolean;
  perimetre: 'departement' | 'commune' | 'quartiers' | 'personnel';
}> = {
  admin: {
    peutVoirDonneesPersonnelles: true,
    peutEcrire: true,
    peutValider: true,
    peutDesactiver: true,
    peutExporter: true,
    peutImporter: true,
    peutGererUtilisateurs: true,
    peutVoirAudit: true,
    peutVoirPointsGPS: true,
    perimetre: 'departement'
  },
  coordonnateur: {
    peutVoirDonneesPersonnelles: true,
    peutEcrire: true,
    peutValider: true,
    peutDesactiver: true,
    peutExporter: true,
    peutImporter: true,
    peutGererUtilisateurs: false,
    peutVoirAudit: false,
    peutVoirPointsGPS: true,
    perimetre: 'commune'
  },
  superviseur: {
    peutVoirDonneesPersonnelles: true,
    peutEcrire: true,
    peutValider: true,
    peutDesactiver: false,
    peutExporter: false,
    peutImporter: false,
    peutGererUtilisateurs: false,
    peutVoirAudit: false,
    peutVoirPointsGPS: true,
    perimetre: 'quartiers'
  },
  commissaire: {
    peutVoirDonneesPersonnelles: true,
    peutEcrire: true,
    peutValider: false,
    peutDesactiver: false,
    peutExporter: false,
    peutImporter: false,
    peutGererUtilisateurs: false,
    peutVoirAudit: false,
    peutVoirPointsGPS: true,
    perimetre: 'quartiers'
  },
  saisie: {
    peutVoirDonneesPersonnelles: true,
    peutEcrire: true,
    peutValider: false,
    peutDesactiver: false,
    peutExporter: false,
    peutImporter: true,
    peutGererUtilisateurs: false,
    peutVoirAudit: false,
    peutVoirPointsGPS: true,
    perimetre: 'departement'
  },
  decideur: {
    peutVoirDonneesPersonnelles: false, // Données personnelles masquées (CDC §4)
    peutEcrire: false,
    peutValider: false,
    peutDesactiver: false,
    peutExporter: false,
    peutImporter: false,
    peutGererUtilisateurs: false,
    peutVoirAudit: false,
    peutVoirPointsGPS: false, // Pas de points individuels, vue agrégée uniquement
    perimetre: 'departement'
  },
  militant: {
    peutVoirDonneesPersonnelles: true,
    peutEcrire: false,
    peutValider: false,
    peutDesactiver: false,
    peutExporter: false,
    peutImporter: false,
    peutGererUtilisateurs: false,
    peutVoirAudit: false,
    peutVoirPointsGPS: false,
    perimetre: 'personnel'
  }
};
