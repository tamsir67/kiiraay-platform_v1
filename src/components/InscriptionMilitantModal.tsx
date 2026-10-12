import React, { useState } from 'react';
import { Militant, Sexe } from '../types';
import { COMMUNES_GUEDIAWAYE, QUARTIERS_GUEDIAWAYE } from '../data/referentiel';
import { KiiraayLogo } from './KiiraayLogo';
import { X, CheckCircle2, UserPlus, ShieldCheck } from 'lucide-react';

interface InscriptionMilitantModalProps {
  quartiers: typeof QUARTIERS_GUEDIAWAYE;
  onInscrire: (data: any) => Militant;
  onClose: () => void;
}

export const InscriptionMilitantModal: React.FC<InscriptionMilitantModalProps> = ({
  quartiers,
  onInscrire,
  onClose
}) => {
  const [prenom, setPrenom] = useState('');
  const [nom, setNom] = useState('');
  const [sexe, setSexe] = useState<Sexe>('M');
  const [dateNaissance, setDateNaissance] = useState('2000-01-01');
  const [telephone, setTelephone] = useState('+221 77 ');
  const [email, setEmail] = useState('');
  const [cni, setCni] = useState('');
  
  const [communeId, setCommuneId] = useState('golf-sud');
  const [quartierId, setQuartierId] = useState(
    quartiers.find(q => q.communeId === 'golf-sud')?.id || 'glf-hamo-1'
  );
  const [adresse, setAdresse] = useState('');
  const [repere, setRepere] = useState('');
  const [consentement, setConsentement] = useState(true);

  const [erreur, setErreur] = useState<string | null>(null);
  const [militantInscrit, setMilitantInscrit] = useState<Militant | null>(null);

  const quartiersDisponibles = quartiers.filter(q => q.communeId === communeId);

  const handleCommuneChange = (nouvelleCommune: string) => {
    setCommuneId(nouvelleCommune);
    const qList = quartiers.filter(q => q.communeId === nouvelleCommune);
    if (qList.length > 0) {
      setQuartierId(qList[0].id);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErreur(null);

    if (!prenom.trim() || !nom.trim()) {
      setErreur('Le prénom et le nom sont obligatoires.');
      return;
    }

    if (!telephone.trim() || telephone.length < 9) {
      setErreur('Un numéro de téléphone sénégalais valide est obligatoire.');
      return;
    }

    // Vérification de la majorité électorale (18 ans révolus)
    const anneeNaiss = new Date(dateNaissance).getFullYear();
    const age = 2026 - anneeNaiss;
    if (age < 18) {
      setErreur('L’adhésion à KIIRAAY requiert d’avoir au moins 18 ans révolus.');
      return;
    }

    if (cni && cni.replace(/\s+/g, '').length !== 13) {
      setErreur('Le numéro de Carte Nationale d’Identité (CNI) doit comporter 13 chiffres.');
      return;
    }

    if (!consentement) {
      setErreur('Vous devez accepter le traitement de vos coordonnées conformément à la loi sénégalaise 2008-12.');
      return;
    }

    const q = quartiers.find(item => item.id === quartierId);

    const nouveau = onInscrire({
      prenom: prenom.trim(),
      nom: nom.trim(),
      sexe,
      dateNaissance,
      telephone: telephone.trim(),
      email: email.trim() || undefined,
      cni: cni.trim() || undefined,
      communeId,
      quartierId,
      adresse: adresse.trim() || `Quartier ${quartierId}`,
      repere: repere.trim() || 'Domicile principal',
      latitude: q ? q.centre[0] : 14.7735,
      longitude: q ? q.centre[1] : -17.3941,
      sourceCollecte: 'Auto-inscription citoyenne en ligne',
      fonctionParti: 'Militant de base',
      personneInformee: true,
      dateAdhesion: new Date().toISOString().split('T')[0]
    });

    setMilitantInscrit(nouveau);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-200 my-auto">
        {/* Header avec Logo KIIRAAY */}
        <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <KiiraayLogo size="sm" variant="emblem-only" />
            <div>
              <h3 className="font-bold text-slate-900 text-xs sm:text-sm">
                Adhésion Militante · Guédiawaye 2027
              </h3>
              <p className="text-[11px] text-slate-600">
                Formulaire citoyen d'inscription en ligne
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {militantInscrit ? (
          /* Écran de confirmation de l'adhésion */
          <div className="p-4 sm:p-6 text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-sky-50 text-sky-600 flex items-center justify-center mx-auto border border-sky-200">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <h4 className="text-base font-bold text-slate-900">
                Demande d'adhésion enregistrée avec succès !
              </h4>
              <p className="text-xs text-slate-600 mt-1 max-w-sm mx-auto">
                Bienvenue dans les rangs des Patriotes Républicains de Guédiawaye. Votre dossier a été transmis pour validation.
              </p>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-left text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-600">Numéro de dossier KRY :</span>
                <span className="font-mono font-bold text-sky-700">{militantInscrit.numeroKry}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Militant(e) :</span>
                <span className="font-semibold text-slate-900">{militantInscrit.prenom} {militantInscrit.nom}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Rattachement :</span>
                <span className="font-semibold text-slate-900">{militantInscrit.communeId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Statut initial :</span>
                <span className="font-semibold text-sky-700">En attente de validation par l'administration</span>
              </div>
            </div>

            <div className="p-3 bg-sky-50/60 rounded-lg border border-sky-200/80 text-[11px] text-sky-900 text-left flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
              <span>
                L'administrateur et le coordonnateur communal vont vérifier vos informations. Une fois validé, vous recevrez votre carte d'adhésion officielle avec QR code.
              </span>
            </div>

            <button
              onClick={onClose}
              className="w-full py-2.5 px-4 font-bold text-xs text-white bg-sky-600 hover:bg-sky-700 rounded-lg shadow-sm transition-colors"
            >
              Terminer et fermer
            </button>
          </div>
        ) : (
          /* Formulaire de saisie */
          <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4 text-xs max-h-[75vh] overflow-y-auto">
            {erreur && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg font-medium">
                {erreur}
              </div>
            )}

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-medium text-slate-700 mb-1">Prénom *</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Babacar"
                  value={prenom}
                  onChange={e => setPrenom(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-600"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Nom *</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Ndiaye"
                  value={nom}
                  onChange={e => setNom(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-600"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-medium text-slate-700 mb-1">Genre *</label>
                <select
                  value={sexe}
                  onChange={e => setSexe(e.target.value as Sexe)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-600"
                >
                  <option value="M">Masculin (H)</option>
                  <option value="F">Féminin (F)</option>
                </select>
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Date de naissance *</label>
                <input
                  type="date"
                  required
                  value={dateNaissance}
                  onChange={e => setDateNaissance(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-600"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-medium text-slate-700 mb-1">Numéro de téléphone *</label>
                <input
                  type="text"
                  required
                  placeholder="+221 77 000 00 00"
                  value={telephone}
                  onChange={e => setTelephone(e.target.value)}
                  className="w-full px-3 py-2 font-mono rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-600"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">CNI (13 chiffres)</label>
                <input
                  type="text"
                  maxLength={13}
                  placeholder="Ex: 1752200001234"
                  value={cni}
                  onChange={e => setCni(e.target.value.replace(/\D/g, ''))}
                  className="w-full px-3 py-2 font-mono rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-600"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-medium text-slate-700 mb-1">Commune de résidence *</label>
                <select
                  value={communeId}
                  onChange={e => handleCommuneChange(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 font-semibold focus:outline-none focus:ring-2 focus:ring-sky-600"
                >
                  {COMMUNES_GUEDIAWAYE.map(c => (
                    <option key={c.id} value={c.id}>{c.nom}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Quartier *</label>
                <select
                  value={quartierId}
                  onChange={e => setQuartierId(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-600"
                >
                  {quartiersDisponibles.map(q => (
                    <option key={q.id} value={q.id}>
                      {q.codeQuartier ? `${q.codeQuartier} — ` : ''}{q.nom}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block font-medium text-slate-700 mb-1">Adresse ou repère de proximité</label>
              <input
                type="text"
                placeholder="Ex: Près du marché, face à la mosquée..."
                value={repere}
                onChange={e => setRepere(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-600"
              />
            </div>

            <div className="pt-2">
              <label className="flex items-start gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={consentement}
                  onChange={e => setConsentement(e.target.checked)}
                  className="mt-0.5 rounded border-slate-300 text-sky-600 focus:ring-sky-600"
                />
                <span className="text-[11px] text-slate-600">
                  Je confirme mon souhait d'adhérer au parti KIIRAAY — Les Patriotes Républicains pour Guédiawaye 2027 et consens au traitement de mes coordonnées selon la loi 2008-12.
                </span>
              </label>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
              >
                Annuler
              </button>
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 px-4 py-2 font-bold text-white bg-sky-600 hover:bg-sky-700 rounded-lg shadow-sm transition-colors"
              >
                <UserPlus className="w-3.5 h-3.5 text-rose-300" />
                <span>Soumettre mon adhésion</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
