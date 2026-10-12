import React from 'react';
import { Militant, Utilisateur } from '../types';
import { COMMUNES_GUEDIAWAYE, QUARTIERS_GUEDIAWAYE } from '../data/referentiel';
import { KiiraayLogo } from '../components/KiiraayLogo';
import { CreditCard, ShieldCheck, MessageSquare } from 'lucide-react';

interface EspaceMilitantPageProps {
  militant: Militant;
  currentUser: Utilisateur;
  onOpenCardModal: (militant: Militant) => void;
  onNavigateTab: (tab: any) => void;
}

export const EspaceMilitantPage: React.FC<EspaceMilitantPageProps> = ({
  militant,
  currentUser,
  onOpenCardModal,
  onNavigateTab
}) => {
  const commune = COMMUNES_GUEDIAWAYE.find(c => c.id === militant.communeId);
  const quartier = QUARTIERS_GUEDIAWAYE.find(q => q.id === militant.quartierId);

  return (
    <div className="p-3 sm:p-6 max-w-4xl mx-auto space-y-4 sm:space-y-6">
      {/* Bannière de Bienvenue avec Logo Officiel */}
      <div className="bg-gradient-to-r from-slate-950 via-sky-950 to-slate-900 text-white rounded-2xl p-4 sm:p-6 shadow-md border border-sky-800/60 flex flex-col md:flex-row md:items-center justify-between gap-4 sm:gap-6">
        <div className="flex items-center gap-4">
          <div className="bg-white p-2 rounded-xl shadow-md shrink-0">
            <KiiraayLogo size="md" variant="emblem-only" />
          </div>
          <div>
            <div className="flex items-center gap-2 text-xs font-black tracking-wider">
              <span className="text-sky-400">KIIRAAY</span>
              <span className="text-rose-500 font-black">·</span>
              <span className="text-rose-400">LES PATRIOTES RÉPUBLICAINS</span>
            </div>
            <h1 className="text-xl font-extrabold mt-1">
              Bienvenue, {militant.prenom} {militant.nom}
            </h1>
            <p className="text-xs text-sky-200 mt-0.5 font-mono">
              Matricule : {militant.numeroKry} · {commune?.nom} ({quartier?.codeQuartier ? `${quartier.codeQuartier} · ` : ''}{quartier?.nom})
            </p>
          </div>
        </div>

        <button
          onClick={() => onOpenCardModal(militant)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs shadow-md transition-colors shrink-0"
        >
          <CreditCard className="w-4 h-4 text-rose-300" />
          <span>Afficher ma Carte Officielle</span>
        </button>
      </div>

      {/* Statut de l'adhésion */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-2xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-sky-700" />
            <h2 className="text-sm font-bold text-slate-900">
              Statut de votre Adhésion Républicaine
            </h2>
          </div>
          <span className="px-2.5 py-0.5 rounded text-xs font-bold bg-sky-50 text-sky-700 border border-sky-200">
            Adhésion Active Validée
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="bg-slate-50 p-4 rounded-lg border border-slate-100 space-y-2">
            <h3 className="font-bold text-slate-800">Vos Informations Enregistrées</h3>
            <p>Nom complet : <b>{militant.prenom} {militant.nom}</b></p>
            <p>Téléphone : <b className="font-mono">{militant.telephone}</b></p>
            <p>Date d'adhésion : <b>{militant.dateAdhesion}</b></p>
            <p>Fonction : <b>{militant.fonctionParti || 'Militant de base'}</b></p>
          </div>

          <div className="bg-slate-50 p-4 rounded-lg border border-slate-100 space-y-2">
            <h3 className="font-bold text-slate-800">Votre Cellule Territoriale</h3>
            <p>Commune de rattachement : <b>{commune?.nom}</b></p>
            <p>Quartier de mobilisation : <b>{quartier?.nom}</b></p>
            <p>Commissaire de quartier : <b>{quartier?.commissaire}</b></p>
            <p>Contact commissaire : <b className="font-mono text-sky-700">{quartier?.telephoneCommissaire || 'Permanence locale'}</b></p>
          </div>
        </div>

        <div className="pt-2 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="text-slate-700">
            Besoin de signaler un déménagement ou de poser une question à vos délégués ?
          </div>
          <button
            onClick={() => onNavigateTab('messagerie')}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-800 font-semibold transition-colors"
          >
            <MessageSquare className="w-3.5 h-3.5 text-sky-700" />
            <span>Écrire à mon commissaire de quartier</span>
          </button>
        </div>
      </div>
    </div>
  );
};
