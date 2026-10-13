import React, { useState } from 'react';
import { Utilisateur, Role } from '../types';
import { COMMUNES_GUEDIAWAYE } from '../data/referentiel';
import { store } from '../services/store';
import { KiiraayLogo } from '../components/KiiraayLogo';
import { 
  Users, 
  MessageSquare, 
  Phone, 
  Mail, 
  ShieldAlert, 
  UserPlus, 
  Search, 
  Filter, 
  CheckCircle2, 
  XCircle, 
  Edit3, 
  Lock, 
  Key, 
  Send, 
  Copy, 
  Check, 
  Download, 
  Smartphone,
  ShieldCheck,
  Building2,
  MapPin,
  ExternalLink,
  CreditCard,
  X
} from 'lucide-react';

interface AnnuairePageProps {
  currentUser: Utilisateur;
}

export const AnnuairePage: React.FC<AnnuairePageProps> = ({ currentUser }) => {
  const isAdmin = currentUser.role === 'admin';
  const [profils, setProfils] = useState(() => store.getTousProfils());
  
  // Onglet de catégorie principale
  const [categorieOnglet, setCategorieOnglet] = useState<'tous' | 'cadres' | 'militants'>('tous');

  // Filtres
  const [recherche, setRecherche] = useState('');
  const [filtreRole, setFiltreRole] = useState<string>('tous');
  const [filtreCommune, setFiltreCommune] = useState<string>('tous');
  const [filtreStatut, setFiltreStatut] = useState<string>('tous');

  // Modals
  const [modalDiffusionOuverte, setModalDiffusionOuverte] = useState(false);
  const [modalUserOuvert, setModalUserOuvert] = useState<boolean>(false);
  const [userEnEdition, setUserEnEdition] = useState<Utilisateur | null>(null);

  // État Diffusion WhatsApp Groupée
  const [cibleDiffusion, setCibleDiffusion] = useState<'tous' | 'cadres' | 'militants' | 'coordonnateurs' | 'commissaires' | 'superviseurs'>('tous');
  const [modeleChoisi, setModeleChoisi] = useState<string>('reunion');
  const [messagePersonnalise, setMessagePersonnalise] = useState('');
  const [numerosEnvoyes, setNumerosEnvoyes] = useState<Set<string>>(new Set());
  const [copieSucces, setCopieSucces] = useState(false);

  // État formulaire ajout/édition utilisateur
  const [formIdentifiant, setFormIdentifiant] = useState('');
  const [formNomComplet, setFormNomComplet] = useState('');
  const [formRole, setFormRole] = useState<Role>('commissaire');
  const [formTelephone, setFormTelephone] = useState('+221 77 ');
  const [formEmail, setFormEmail] = useState('');
  const [formCommuneId, setFormCommuneId] = useState('golf-sud');
  const [formMotDePasse, setFormMotDePasse] = useState('pass123');
  const [formActif, setFormActif] = useState(true);
  const [formErreur, setFormErreur] = useState<string | null>(null);

  // Recharger les données depuis le store
  const rafraichirListe = () => {
    setProfils(store.getTousProfils());
  };

  if (!isAdmin) {
    return (
      <div className="p-6 max-w-2xl mx-auto text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mx-auto border border-rose-200">
          <ShieldAlert className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-slate-900">Accès Restreint · Administrateur Central Uniquement</h2>
        <p className="text-xs text-slate-600 leading-relaxed">
          L'annuaire exhaustif de tous les profils de la plateforme et les canaux de diffusion WhatsApp sont réservés exclusivement à l'administrateur central de KIIRAAY.
        </p>
      </div>
    );
  }

  // Filtrage des profils selon onglet catégorie et critères
  const profilsFiltres = profils.filter(p => {
    if (categorieOnglet === 'cadres' && p.sourceType !== 'utilisateur') return false;
    if (categorieOnglet === 'militants' && p.sourceType !== 'militant') return false;
    if (filtreRole !== 'tous' && p.role !== filtreRole) return false;
    if (filtreCommune !== 'tous' && p.communeId !== filtreCommune) return false;
    if (filtreStatut === 'actif' && !p.actif) return false;
    if (filtreStatut === 'inactif' && p.actif) return false;
    if (recherche.trim()) {
      const q = recherche.toLowerCase().trim();
      const matchNom = p.nomComplet.toLowerCase().includes(q);
      const matchId = p.identifiant.toLowerCase().includes(q);
      const matchTel = p.telephone.replace(/\s+/g, '').includes(q.replace(/\s+/g, ''));
      const matchEmail = p.email.toLowerCase().includes(q);
      const matchQuartier = (p.quartierNom || '').toLowerCase().includes(q);
      const matchKry = (p.numeroKry || '').toLowerCase().includes(q);
      return matchNom || matchId || matchTel || matchEmail || matchQuartier || matchKry;
    }
    return true;
  });

  // Nettoyer numéro de téléphone pour lien WhatsApp (chiffres uniquement)
  const formaterTelephoneWhatsApp = (tel: string) => {
    const clean = tel.replace(/\D/g, '');
    if (clean.startsWith('221')) return clean;
    if (clean.length === 9) return '221' + clean;
    return clean;
  };

  // Destinataires de diffusion groupée
  const destinatairesDiffusion = profils.filter(p => {
    if (!p.actif) return false;
    if (cibleDiffusion === 'cadres') return p.sourceType === 'utilisateur';
    if (cibleDiffusion === 'militants') return p.sourceType === 'militant' || p.role === 'militant';
    if (cibleDiffusion === 'coordonnateurs') return p.role === 'coordonnateur';
    if (cibleDiffusion === 'commissaires') return p.role === 'commissaire';
    if (cibleDiffusion === 'superviseurs') return p.role === 'superviseur';
    return true;
  });

  const getMessageFinalDiffusion = (dest?: { nomComplet: string; communeNom?: string; quartierNom?: string }) => {
    const nom = dest ? dest.nomComplet : '[Nom du Destinataire]';
    const commune = dest?.communeNom || 'Guédiawaye';
    const quartier = dest?.quartierNom || 'Secteur';
    
    if (modeleChoisi === 'reunion') {
      return `🇸🇳 *KIIRAAY · Direction Centrale Guédiawaye 2027*\n\nChers camarades, convocation importante pour *${nom}* (${commune}) :\n\n📌 *Ordre du jour :* Réunion de coordination et validation des adhésions.\n🗓️ *Date :* Samedi prochain à 16h00\n📍 *Lieu :* Permanence Centrale de Guédiawaye\n\nMerci de confirmer votre présence par retour de message.\n_Les Patriotes Républicains_`;
    }
    if (modeleChoisi === 'parrainage') {
      return `🇸🇳 *KIIRAAY · Mobilisation Parrainages & Adhésions*\n\nCamarade *${nom}*,\nNous accélérons la collecte des fiches sur votre secteur de *${commune}* (${quartier}). Merci de vous connecter sur la plateforme pour suivre vos adhésions.\n\n_Ensemble pour Guédiawaye 2027 !_`;
    }
    if (modeleChoisi === 'consigne') {
      return `🇸🇳 *KIIRAAY · Consignes Officielles & Porte-à-porte*\n\nChers membres de *${commune}*,\nRappel : La sensibilisation de proximité et le recensement des militants doivent être effectués avec rigueur et bienveillance. Chaque militant enregistré a accès à sa carte numérique sécurisée.\n\nFraternellement,\n*Mouhamadou Mansour Sy · Administration Centrale KIIRAAY*`;
    }
    return messagePersonnalise
      .replace(/\[Nom\]/g, nom)
      .replace(/\[Commune\]/g, commune)
      .replace(/\[Quartier\]/g, quartier);
  };

  const creerLienWhatsApp = (tel: string, texte: string) => {
    const num = formaterTelephoneWhatsApp(tel);
    return `https://wa.me/${num}?text=${encodeURIComponent(texte)}`;
  };

  const handleCopierTousNumeros = () => {
    const numeros = destinatairesDiffusion
      .map(u => formaterTelephoneWhatsApp(u.telephone))
      .filter(n => n.length >= 9)
      .join(', ');
    
    navigator.clipboard.writeText(numeros);
    setCopieSucces(true);
    setTimeout(() => setCopieSucces(false), 2500);
  };

  const handleOuvrirEdition = (p?: any) => {
    setFormErreur(null);
    if (p && p.sourceType === 'utilisateur') {
      const u = store.getUsers().find(user => user.id === p.id);
      if (u) {
        setUserEnEdition(u);
        setFormIdentifiant(u.identifiant);
        setFormNomComplet(u.nomComplet);
        setFormRole(u.role);
        setFormTelephone(u.telephone);
        setFormEmail(u.email);
        setFormCommuneId(u.communeId || 'golf-sud');
        setFormMotDePasse(u.motDePasse || 'pass123');
        setFormActif(u.actif);
        setModalUserOuvert(true);
        return;
      }
    }
    setUserEnEdition(null);
    setFormIdentifiant('');
    setFormNomComplet('');
    setFormRole('commissaire');
    setFormTelephone('+221 77 ');
    setFormEmail('');
    setFormCommuneId('golf-sud');
    setFormMotDePasse('pass123');
    setFormActif(true);
    setModalUserOuvert(true);
  };

  const handleSauvegarderUser = (e: React.FormEvent) => {
    e.preventDefault();
    setFormErreur(null);

    if (!formIdentifiant.trim() || !formNomComplet.trim()) {
      setFormErreur("L'identifiant et le nom complet sont obligatoires.");
      return;
    }

    if (!formTelephone.trim() || formTelephone.length < 9) {
      setFormErreur("Un numéro de téléphone valide est obligatoire.");
      return;
    }

    if (userEnEdition) {
      store.updateUser(userEnEdition.id, {
        identifiant: formIdentifiant.trim().toLowerCase(),
        nomComplet: formNomComplet.trim(),
        role: formRole,
        telephone: formTelephone.trim(),
        email: formEmail.trim() || `${formIdentifiant.trim()}@kiiraay.sn`,
        communeId: formCommuneId,
        motDePasse: formMotDePasse.trim() || 'pass123',
        actif: formActif
      });
    } else {
      store.createUser({
        identifiant: formIdentifiant.trim().toLowerCase(),
        nomComplet: formNomComplet.trim(),
        role: formRole,
        telephone: formTelephone.trim(),
        email: formEmail.trim() || `${formIdentifiant.trim()}@kiiraay.sn`,
        communeId: formCommuneId,
        motDePasse: formMotDePasse.trim() || 'pass123',
        actif: formActif
      });
    }

    rafraichirListe();
    setModalUserOuvert(false);
  };

  const handleBasculerStatut = (p: any) => {
    if (p.sourceType === 'utilisateur') {
      store.toggleUserStatus(p.id);
    } else if (p.militantId) {
      const nouveauStatut = p.actif ? 'desactive' : 'actif';
      store.changerStatut(p.militantId, nouveauStatut, 'Modification statut depuis annuaire');
    }
    rafraichirListe();
  };

  const handleSupprimerUser = (p: any) => {
    if (p.id === currentUser.id) {
      return;
    }
    if (p.sourceType === 'utilisateur') {
      store.deleteUser(p.id);
    } else if (p.militantId) {
      store.deleteMilitant(p.militantId);
    }
    rafraichirListe();
  };

  const handleExportAnnuaire = () => {
    const headers = ['Identifiant', 'Nom Complet', 'Type', 'Rôle', 'Téléphone', 'Email', 'Commune', 'Quartier', 'Statut'];
    const rows = profils.map(p => [
      p.identifiant,
      `"${p.nomComplet.replace(/"/g, '""')}"`,
      p.sourceType === 'utilisateur' ? 'Responsable/Cadre' : 'Militant',
      p.roleLabel,
      p.telephone,
      p.email,
      p.communeNom,
      p.quartierNom || '',
      p.actif ? 'Actif' : 'Inactif'
    ].join(';'));

    const csvContent = '\uFEFF' + [headers.join(';'), ...rows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `annuaire_exhaustif_kiiraay_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getRoleBadge = (role: Role, sourceType: string) => {
    if (sourceType === 'militant') {
      return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">Militant(e)</span>;
    }
    switch (role) {
      case 'admin':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-100 text-purple-800 border border-purple-200">Admin Central</span>;
      case 'coordonnateur':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-sky-100 text-sky-800 border border-sky-200">Coordonnateur Communal</span>;
      case 'superviseur':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-100 text-indigo-800 border border-indigo-200">Superviseur Zone</span>;
      case 'commissaire':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-800 border border-blue-200">Commissaire Quartier</span>;
      case 'saisie':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-200">Opérateur Saisie</span>;
      case 'decideur':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-200 text-slate-800 border border-slate-300">Décideur Consultation</span>;
      default:
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700">{role}</span>;
    }
  };

  const totalProfils = profils.length;
  const totalCadres = profils.filter(p => p.sourceType === 'utilisateur').length;
  const totalMilitants = profils.filter(p => p.sourceType === 'militant' || p.role === 'militant').length;
  const totalActifs = profils.filter(p => p.actif).length;

  return (
    <div className="p-3 sm:p-6 max-w-7xl mx-auto space-y-5 text-slate-900">
      {/* 1. En-tête de l'Annuaire Administrateur */}
      <div className="bg-gradient-to-r from-slate-950 via-sky-950 to-slate-900 text-white rounded-2xl p-5 sm:p-6 shadow-md border border-sky-800/60 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="bg-white p-2.5 rounded-xl shadow-md shrink-0">
            <KiiraayLogo size="md" variant="emblem-only" />
          </div>
          <div>
            <div className="flex items-center gap-2 text-xs font-black tracking-wider">
              <span className="text-sky-400">ESPACE EXCLUSIF ADMINISTRATEUR</span>
              <span className="text-rose-500">·</span>
              <span className="text-emerald-400">CANAUX WHATSAPP & CONTACTS</span>
            </div>
            <h1 className="text-lg sm:text-2xl font-black mt-1">
              Annuaire Exhaustif de Tous les Profils
            </h1>
            <p className="text-xs text-sky-200 mt-0.5">
              Contact WhatsApp direct avec l'ensemble des responsables, cadres et militants de la plateforme KIIRAAY Guédiawaye
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => setModalDiffusionOuverte(true)}
            className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-all transform hover:scale-[1.02]"
            title="Envoyer un message WhatsApp groupé à tous les profils"
          >
            <MessageSquare className="w-4 h-4 text-emerald-100" />
            <span>📢 Diffusion WhatsApp</span>
          </button>

          <button
            type="button"
            onClick={() => handleOuvrirEdition()}
            className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs shadow-md transition-all"
            title="Créer un nouveau compte utilisateur"
          >
            <UserPlus className="w-4 h-4" />
            <span>Nouveau Compte</span>
          </button>

          <button
            type="button"
            onClick={handleExportAnnuaire}
            className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
            title="Exporter l'annuaire au format CSV"
          >
            <Download className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 2. Onglets de Catégorie & Statistiques clés */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="inline-flex p-1 bg-slate-200 rounded-xl text-xs font-bold">
          <button
            onClick={() => setCategorieOnglet('tous')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              categorieOnglet === 'tous' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            🌍 Tous les profils ({totalProfils})
          </button>
          <button
            onClick={() => setCategorieOnglet('cadres')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              categorieOnglet === 'cadres' ? 'bg-white text-sky-800 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            🏛️ Cadres & Responsables ({totalCadres})
          </button>
          <button
            onClick={() => setCategorieOnglet('militants')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              categorieOnglet === 'militants' ? 'bg-white text-emerald-800 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            📱 Militants & Adhérents ({totalMilitants})
          </button>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-600 bg-white px-3 py-1.5 rounded-xl border border-slate-200">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          <span><b>{totalActifs}</b> comptes actifs avec WhatsApp vérifié</span>
        </div>
      </div>

      {/* 3. Barre de recherche et filtres multi-critères */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-3">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Rechercher par nom, téléphone (+221...), matricule KRY, quartier, identifiant..."
              value={recherche}
              onChange={e => setRecherche(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-600 bg-slate-50/50"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <select
              value={filtreRole}
              onChange={e => setFiltreRole(e.target.value)}
              className="text-xs px-2.5 py-2 rounded-lg border border-slate-300 bg-white font-medium focus:outline-none focus:ring-2 focus:ring-sky-600"
            >
              <option value="tous">Tous les rôles</option>
              <option value="admin">Administrateur central</option>
              <option value="coordonnateur">Coordonnateur communal</option>
              <option value="superviseur">Superviseur de zone</option>
              <option value="commissaire">Commissaire de quartier</option>
              <option value="saisie">Opérateur de saisie</option>
              <option value="decideur">Décideur</option>
              <option value="militant">Militant(e)</option>
            </select>

            <select
              value={filtreCommune}
              onChange={e => setFiltreCommune(e.target.value)}
              className="text-xs px-2.5 py-2 rounded-lg border border-slate-300 bg-white font-medium focus:outline-none focus:ring-2 focus:ring-sky-600"
            >
              <option value="tous">Toutes les communes</option>
              {COMMUNES_GUEDIAWAYE.map(c => (
                <option key={c.id} value={c.id}>{c.nom}</option>
              ))}
            </select>

            <select
              value={filtreStatut}
              onChange={e => setFiltreStatut(e.target.value)}
              className="text-xs px-2.5 py-2 rounded-lg border border-slate-300 bg-white font-medium focus:outline-none focus:ring-2 focus:ring-sky-600"
            >
              <option value="tous">Tous les statuts</option>
              <option value="actif">Actif uniquement</option>
              <option value="inactif">Inactif / Désactivé</option>
            </select>
          </div>
        </div>

        <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-100">
          <span>Affichage de <b>{profilsFiltres.length}</b> profil(s) sur {profils.length}</span>
          <span className="flex items-center gap-1.5 text-emerald-800 font-semibold">
            <span>●</span> Cliquez sur l'icône WhatsApp pour initier un échange direct
          </span>
        </div>
      </div>

      {/* 4. Grille des Cartes de Profils */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {profilsFiltres.map(p => {
          const numWhatsApp = formaterTelephoneWhatsApp(p.telephone);
          const messageIndividuelDirect = `🇸🇳 *Message officiel KIIRAAY Guédiawaye*\n\nBonjour camarade *${p.nomComplet}*,\n\nJe vous contacte en tant qu'administrateur de la plateforme KIIRAAY Guédiawaye 2027 concernant votre secteur (${p.communeNom}).\n\nRestons mobilisés !\n*Mouhamadou Mansour Sy · Administration Centrale*`;
          const lienWhatsApp = creerLienWhatsApp(p.telephone, messageIndividuelDirect);

          return (
            <div
              key={p.id}
              className={`bg-white rounded-xl border p-4 shadow-2xs flex flex-col justify-between transition-all hover:shadow-md ${
                p.actif ? 'border-slate-200' : 'border-slate-200 bg-slate-50/70 opacity-80'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full font-bold text-xs flex items-center justify-center shrink-0 border ${
                      p.sourceType === 'militant' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-sky-50 text-sky-700 border-sky-200'
                    }`}>
                      {p.nomComplet.split(' ').map(n => n[0]).slice(0, 2).join('')}
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-bold text-xs text-slate-900 truncate" title={p.nomComplet}>
                        {p.nomComplet}
                      </h3>
                      <p className="text-[11px] font-mono text-slate-500 truncate">
                        {p.numeroKry ? p.numeroKry : `@${p.identifiant}`}
                      </p>
                    </div>
                  </div>
                  <div>
                    {getRoleBadge(p.role, p.sourceType)}
                  </div>
                </div>

                <div className="space-y-1.5 text-xs bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] text-slate-500 flex items-center gap-1">
                      <Phone className="w-3 h-3 text-slate-400" />
                      Téléphone :
                    </span>
                    <span className="font-mono font-bold text-slate-800 text-[11px]">
                      {p.telephone}
                    </span>
                  </div>

                  {p.email && (
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] text-slate-500 flex items-center gap-1">
                        <Mail className="w-3 h-3 text-slate-400" />
                        Email :
                      </span>
                      <span className="text-slate-700 truncate max-w-[170px] text-[11px]">
                        {p.email}
                      </span>
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <span className="text-[11px] text-slate-500 flex items-center gap-1">
                      <Building2 className="w-3 h-3 text-slate-400" />
                      Commune :
                    </span>
                    <span className="font-semibold text-slate-800 text-[11px]">
                      {p.communeNom}
                    </span>
                  </div>

                  {p.quartierNom && (
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] text-slate-500 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-slate-400" />
                        Quartier :
                      </span>
                      <span className="text-slate-700 text-[11px] truncate max-w-[170px]">
                        {p.quartierNom}
                      </span>
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-1 border-t border-slate-200/60 text-[10px]">
                    <span className="text-slate-500">Statut :</span>
                    <span className={`font-bold ${p.actif ? 'text-emerald-700' : 'text-rose-600'}`}>
                      {p.actif ? '● Actif' : '○ Inactif'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Actions directes : WhatsApp direct, Appel, Edition */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-1.5 mt-3">
                <a
                  href={lienWhatsApp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px] shadow-xs transition-colors shrink-0"
                  title={`Envoyer un message WhatsApp direct à ${p.nomComplet}`}
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </a>

                <a
                  href={`tel:${p.telephone.replace(/\s+/g, '')}`}
                  className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
                  title="Appeler directement"
                >
                  <Phone className="w-3.5 h-3.5" />
                </a>

                {p.sourceType === 'utilisateur' ? (
                  <button
                    type="button"
                    onClick={() => handleOuvrirEdition(p)}
                    className="p-1.5 text-slate-600 hover:text-sky-700 hover:bg-sky-50 rounded-lg transition-colors"
                    title="Modifier ce profil"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      // Copier le lien de la carte du militant
                      navigator.clipboard.writeText(`Numéro KRY : ${p.numeroKry} - ${p.nomComplet}`);
                    }}
                    className="p-1.5 text-slate-600 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition-colors"
                    title="Informations du militant"
                  >
                    <CreditCard className="w-3.5 h-3.5" />
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => handleBasculerStatut(p)}
                  className={`p-1.5 rounded-lg transition-colors ${
                    p.actif ? 'text-amber-600 hover:bg-amber-50' : 'text-emerald-600 hover:bg-emerald-50'
                  }`}
                  title={p.actif ? 'Désactiver ce compte' : 'Activer ce compte'}
                >
                  <Lock className="w-3.5 h-3.5" />
                </button>

                {p.id !== currentUser.id && (
                  <button
                    type="button"
                    onClick={() => handleSupprimerUser(p)}
                    className="p-1.5 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition-colors"
                    title="Supprimer ce compte"
                  >
                    <XCircle className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {profilsFiltres.length === 0 && (
        <div className="bg-white p-8 rounded-xl border border-slate-200 text-center space-y-2">
          <p className="text-slate-600 font-semibold text-xs">Aucun profil ne correspond aux critères de recherche.</p>
          <button
            onClick={() => { setRecherche(''); setFiltreRole('tous'); setFiltreCommune('tous'); setFiltreStatut('tous'); }}
            className="text-xs text-sky-700 font-bold hover:underline"
          >
            Réinitialiser les filtres
          </button>
        </div>
      )}

      {/* MODAL 1 : Diffusion WhatsApp Groupée ("à tout le monde au besoin") */}
      {modalDiffusionOuverte && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl border border-slate-200 my-auto text-slate-900 max-h-[90vh] flex flex-col">
            <div className="px-5 py-4 bg-gradient-to-r from-emerald-900 via-slate-900 to-slate-950 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-emerald-500 p-2 rounded-xl text-white shadow-sm shrink-0">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-sm sm:text-base text-white">
                    Diffusion WhatsApp à la Plateforme
                  </h3>
                  <p className="text-[11px] text-emerald-200 mt-0.5">
                    Envoyer un message officiel à tout le monde ou à une sélection ciblée
                  </p>
                </div>
              </div>
              <button
                onClick={() => setModalDiffusionOuverte(false)}
                className="text-slate-300 hover:text-white p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 space-y-4 text-xs overflow-y-auto flex-1">
              {/* 1. Choix des destinataires ciblés */}
              <div>
                <label className="block font-bold text-slate-800 mb-1">
                  1. Choisir les destinataires ({destinatairesDiffusion.length} sélectionnés) :
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setCibleDiffusion('tous')}
                    className={`p-2 rounded-lg border text-center font-bold text-[11px] transition-all ${
                      cibleDiffusion === 'tous' ? 'bg-emerald-50 border-emerald-500 text-emerald-900' : 'bg-slate-50 border-slate-200 text-slate-700'
                    }`}
                  >
                    🌍 Tout le monde ({profils.filter(p => p.actif).length})
                  </button>
                  <button
                    type="button"
                    onClick={() => setCibleDiffusion('militants')}
                    className={`p-2 rounded-lg border text-center font-bold text-[11px] transition-all ${
                      cibleDiffusion === 'militants' ? 'bg-emerald-50 border-emerald-500 text-emerald-900' : 'bg-slate-50 border-slate-200 text-slate-700'
                    }`}
                  >
                    📱 Tous les Militants ({profils.filter(p => p.actif && (p.sourceType === 'militant' || p.role === 'militant')).length})
                  </button>
                  <button
                    type="button"
                    onClick={() => setCibleDiffusion('cadres')}
                    className={`p-2 rounded-lg border text-center font-bold text-[11px] transition-all ${
                      cibleDiffusion === 'cadres' ? 'bg-emerald-50 border-emerald-500 text-emerald-900' : 'bg-slate-50 border-slate-200 text-slate-700'
                    }`}
                  >
                    🏛️ Cadres & Encadrement ({profils.filter(p => p.actif && p.sourceType === 'utilisateur').length})
                  </button>
                  <button
                    type="button"
                    onClick={() => setCibleDiffusion('coordonnateurs')}
                    className={`p-2 rounded-lg border text-center font-bold text-[11px] transition-all ${
                      cibleDiffusion === 'coordonnateurs' ? 'bg-emerald-50 border-emerald-500 text-emerald-900' : 'bg-slate-50 border-slate-200 text-slate-700'
                    }`}
                  >
                    🏛️ Coordonnateurs ({profils.filter(p => p.actif && p.role === 'coordonnateur').length})
                  </button>
                  <button
                    type="button"
                    onClick={() => setCibleDiffusion('commissaires')}
                    className={`p-2 rounded-lg border text-center font-bold text-[11px] transition-all ${
                      cibleDiffusion === 'commissaires' ? 'bg-emerald-50 border-emerald-500 text-emerald-900' : 'bg-slate-50 border-slate-200 text-slate-700'
                    }`}
                  >
                    📍 Commissaires ({profils.filter(p => p.actif && p.role === 'commissaire').length})
                  </button>
                  <button
                    type="button"
                    onClick={() => setCibleDiffusion('superviseurs')}
                    className={`p-2 rounded-lg border text-center font-bold text-[11px] transition-all ${
                      cibleDiffusion === 'superviseurs' ? 'bg-emerald-50 border-emerald-500 text-emerald-900' : 'bg-slate-50 border-slate-200 text-slate-700'
                    }`}
                  >
                    🏘️ Superviseurs ({profils.filter(p => p.actif && p.role === 'superviseur').length})
                  </button>
                </div>
              </div>

              {/* 2. Choix du modèle de message */}
              <div>
                <label className="block font-bold text-slate-800 mb-1">
                  2. Modèle de message républicain :
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <button
                    type="button"
                    onClick={() => setModeleChoisi('reunion')}
                    className={`p-2 rounded-lg border text-left text-[11px] font-semibold ${
                      modeleChoisi === 'reunion' ? 'bg-sky-50 border-sky-600 text-sky-900' : 'bg-slate-50 border-slate-200 text-slate-700'
                    }`}
                  >
                    📌 Réunion Générale
                  </button>
                  <button
                    type="button"
                    onClick={() => setModeleChoisi('parrainage')}
                    className={`p-2 rounded-lg border text-left text-[11px] font-semibold ${
                      modeleChoisi === 'parrainage' ? 'bg-sky-50 border-sky-600 text-sky-900' : 'bg-slate-50 border-slate-200 text-slate-700'
                    }`}
                  >
                    ⚡ Alerte Parrainages
                  </button>
                  <button
                    type="button"
                    onClick={() => setModeleChoisi('consigne')}
                    className={`p-2 rounded-lg border text-left text-[11px] font-semibold ${
                      modeleChoisi === 'consigne' ? 'bg-sky-50 border-sky-600 text-sky-900' : 'bg-slate-50 border-slate-200 text-slate-700'
                    }`}
                  >
                    🗳️ Consignes Terrain
                  </button>
                  <button
                    type="button"
                    onClick={() => setModeleChoisi('libre')}
                    className={`p-2 rounded-lg border text-left text-[11px] font-semibold ${
                      modeleChoisi === 'libre' ? 'bg-sky-50 border-sky-600 text-sky-900' : 'bg-slate-50 border-slate-200 text-slate-700'
                    }`}
                  >
                    ✏️ Message libre
                  </button>
                </div>
              </div>

              {/* Zone d'édition du message */}
              {modeleChoisi === 'libre' ? (
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Rédigez votre message personnalisé :</label>
                  <textarea
                    rows={4}
                    value={messagePersonnalise}
                    onChange={e => setMessagePersonnalise(e.target.value)}
                    placeholder="Tapez ici votre communication officielle. Utilisez [Nom] et [Commune] pour les variables automatiques..."
                    className="w-full p-3 rounded-lg border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-600 font-sans"
                  />
                </div>
              ) : (
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 font-mono text-[11px] text-slate-800 whitespace-pre-wrap">
                  {getMessageFinalDiffusion()}
                </div>
              )}

              {/* Bouton d'export des numéros pour liste de diffusion WhatsApp */}
              <div className="flex flex-wrap items-center justify-between gap-2 p-3 bg-emerald-50/70 border border-emerald-200 rounded-xl">
                <div>
                  <p className="font-bold text-emerald-950">Option Groupe & Liste de Diffusion WhatsApp :</p>
                  <p className="text-[11px] text-emerald-800">
                    Copiez tous les numéros en 1 clic pour créer une liste de diffusion sur WhatsApp Business.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleCopierTousNumeros}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs transition-colors"
                >
                  {copieSucces ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  <span>{copieSucces ? 'Numéros copiés !' : '📋 Copier tous les numéros'}</span>
                </button>
              </div>

              {/* 3. Liste des liens WhatsApp 1-clic par destinataire */}
              <div>
                <p className="font-bold text-slate-800 mb-2">
                  3. Envois individuels en direct (cliquez sur chaque contact pour ouvrir la discussion WhatsApp) :
                </p>
                <div className="max-h-52 overflow-y-auto space-y-2 pr-1 border border-slate-200 rounded-xl p-2 bg-slate-50">
                  {destinatairesDiffusion.map(d => {
                    const estEnvoye = numerosEnvoyes.has(d.id);
                    const lien = creerLienWhatsApp(d.telephone, getMessageFinalDiffusion(d));
                    return (
                      <div
                        key={d.id}
                        className="bg-white p-2.5 rounded-lg border border-slate-200 flex items-center justify-between text-xs"
                      >
                        <div className="min-w-0 pr-2">
                          <p className="font-bold text-slate-900 truncate">{d.nomComplet}</p>
                          <p className="text-[11px] text-slate-500 font-mono">
                            {d.telephone} · {d.roleLabel} ({d.communeNom})
                          </p>
                        </div>
                        <a
                          href={lien}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => setNumerosEnvoyes(prev => new Set(prev).add(d.id))}
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[11px] font-bold transition-colors shrink-0 ${
                            estEnvoye
                              ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                              : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs'
                          }`}
                        >
                          {estEnvoye ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Send className="w-3.5 h-3.5" />}
                          <span>{estEnvoye ? 'Envoyé ✓' : 'Envoyer WhatsApp'}</span>
                        </a>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setModalDiffusionOuverte(false)}
                className="px-4 py-2 font-bold text-xs text-slate-700 hover:bg-slate-200 rounded-xl transition-colors"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2 : Création / Édition d'un Compte Utilisateur Plateforme */}
      {modalUserOuvert && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-200 my-auto text-slate-900">
            <div className="px-5 py-4 bg-slate-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <UserPlus className="w-5 h-5 text-sky-400" />
                <h3 className="font-bold text-sm sm:text-base">
                  {userEnEdition ? `Modifier le Profil · ${userEnEdition.nomComplet}` : 'Nouveau Compte Utilisateur Plateforme'}
                </h3>
              </div>
              <button
                onClick={() => setModalUserOuvert(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSauvegarderUser} className="p-5 space-y-3.5 text-xs">
              {formErreur && (
                <div className="p-2.5 bg-rose-50 border border-rose-200 text-rose-800 rounded-lg font-medium">
                  {formErreur}
                </div>
              )}

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Identifiant de connexion *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: coord.medina"
                    value={formIdentifiant}
                    onChange={e => setFormIdentifiant(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 font-mono text-xs focus:ring-2 focus:ring-sky-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-medium text-slate-700 mb-1">Rôle sur la plateforme *</label>
                  <select
                    value={formRole}
                    onChange={e => setFormRole(e.target.value as Role)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 font-semibold text-xs focus:ring-2 focus:ring-sky-600 focus:outline-none"
                  >
                    <option value="admin">Administrateur Central</option>
                    <option value="coordonnateur">Coordonnateur communal</option>
                    <option value="superviseur">Superviseur de quartiers</option>
                    <option value="commissaire">Commissaire de quartier</option>
                    <option value="saisie">Opérateur de saisie</option>
                    <option value="decideur">Décideur / Consultation</option>
                    <option value="militant">Militant (Espace isolé)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Nom Complet *</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Babacar Seck"
                  value={formNomComplet}
                  onChange={e => setFormNomComplet(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-sky-600 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Téléphone mobile (+221) *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+221 77 123 45 67"
                    value={formTelephone}
                    onChange={e => setFormTelephone(e.target.value)}
                    className="w-full px-3 py-2 font-mono rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-sky-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-medium text-slate-700 mb-1">Email</label>
                  <input
                    type="email"
                    placeholder="contact@kiiraay.sn"
                    value={formEmail}
                    onChange={e => setFormEmail(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-sky-600 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Commune de rattachement</label>
                  <select
                    value={formCommuneId}
                    onChange={e => setFormCommuneId(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-sky-600 focus:outline-none"
                  >
                    {COMMUNES_GUEDIAWAYE.map(c => (
                      <option key={c.id} value={c.id}>{c.nom}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-medium text-slate-700 mb-1">Mot de passe initial</label>
                  <input
                    type="text"
                    value={formMotDePasse}
                    onChange={e => setFormMotDePasse(e.target.value)}
                    placeholder="pass123"
                    className="w-full px-3 py-2 font-mono rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-sky-600 focus:outline-none"
                  />
                </div>
              </div>

              <div className="pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formActif}
                    onChange={e => setFormActif(e.target.checked)}
                    className="rounded border-slate-300 text-sky-600 focus:ring-sky-600"
                  />
                  <span className="font-semibold text-slate-800">
                    Compte actif et autorisé à se connecter
                  </span>
                </label>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setModalUserOuvert(false)}
                  className="px-4 py-2 font-bold text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 font-bold text-white bg-sky-700 hover:bg-sky-800 rounded-lg shadow-sm transition-colors"
                >
                  {userEnEdition ? 'Mettre à jour' : 'Créer le compte'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
