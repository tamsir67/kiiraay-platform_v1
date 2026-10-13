import React, { useState } from 'react';
import { Utilisateur } from '../types';
import { store } from '../services/store';
import { KiiraayLogo } from '../components/KiiraayLogo';
import { 
  Lock, 
  User, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  ShieldCheck, 
  UserPlus, 
  Smartphone, 
  CheckCircle2, 
  AlertCircle,
  HelpCircle,
  QrCode,
  Sparkles
} from 'lucide-react';

interface LoginPageProps {
  onLoginSuccess: (user: Utilisateur) => void;
  onOpenInscription: () => void;
  onOpenVerifyModal?: () => void;
  onOpenInstallModal?: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({
  onLoginSuccess,
  onOpenInscription,
  onOpenVerifyModal,
  onOpenInstallModal
}) => {
  const [identifiant, setIdentifiant] = useState('');
  const [motDePasse, setMotDePasse] = useState('');
  const [afficherMdp, setAfficherMdp] = useState(false);
  const [chargement, setChargement] = useState(false);
  const [erreur, setErreur] = useState<string | null>(null);
  const [boiteTestOuverte, setBoiteTestOuverte] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErreur(null);

    if (!identifiant.trim()) {
      setErreur("Veuillez saisir votre identifiant, numéro de téléphone ou matricule KRY.");
      return;
    }

    setChargement(true);

    setTimeout(() => {
      const res = store.login(identifiant.trim(), motDePasse.trim());
      setChargement(false);

      if (res.success && res.user) {
        onLoginSuccess(res.user);
      } else {
        setErreur(res.error || "Identifiants invalides.");
      }
    }, 250);
  };

  const handleConnexionRapide = (id: string, mdp: string = 'pass123') => {
    setIdentifiant(id);
    setMotDePasse(mdp);
    setErreur(null);
    setChargement(true);

    setTimeout(() => {
      const res = store.login(id, mdp);
      setChargement(false);
      if (res.success && res.user) {
        onLoginSuccess(res.user);
      } else {
        setErreur(res.error || "Impossible de se connecter avec ce compte.");
      }
    }, 200);
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col justify-between text-slate-100 p-3 sm:p-6 relative overflow-x-hidden selection:bg-sky-600 selection:text-white">
      {/* Halo décoratif aux couleurs républicaines */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-sky-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-rose-600/15 rounded-full blur-3xl pointer-events-none" />

      {/* Barre supérieure discrète */}
      <header className="max-w-5xl w-full mx-auto flex items-center justify-between py-2 relative z-10">
        <div className="flex items-center gap-2">
          <KiiraayLogo size="sm" variant="horizontal" />
        </div>

        <div className="flex items-center gap-2">
          {onOpenInstallModal && (
            <button
              onClick={onOpenInstallModal}
              className="text-xs font-semibold px-2.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-sky-200 transition-colors flex items-center gap-1.5"
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Installer l'application</span>
              <span className="sm:hidden">Installer</span>
            </button>
          )}

          <button
            onClick={onOpenInscription}
            className="text-xs font-bold px-3 py-1.5 rounded-lg bg-[#0284c7] hover:bg-sky-500 text-white transition-colors flex items-center gap-1.5 shadow-sm"
          >
            <UserPlus className="w-3.5 h-3.5 text-rose-300" />
            <span>Adhérer en ligne</span>
          </button>
        </div>
      </header>

      {/* Conteneur de connexion */}
      <main className="max-w-md w-full mx-auto my-auto py-6 relative z-10">
        <div className="bg-white text-slate-900 rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200/80 space-y-6">
          {/* Logo & Titre */}
          <div className="text-center space-y-2">
            <div className="inline-block bg-slate-50 p-2.5 rounded-2xl shadow-inner border border-slate-100">
              <KiiraayLogo size="md" variant="emblem-only" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900">
                Connexion Plateforme
              </h1>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                KIIRAAY · Les Patriotes Républicains de Guédiawaye
              </p>
            </div>
          </div>

          {/* Formulaire de Connexion */}
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            {erreur && (
              <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 rounded-xl font-medium flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <span className="text-xs">{erreur}</span>
              </div>
            )}

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Identifiant, Téléphone ou Matricule KRY
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  placeholder="Ex: admin, 776000001 ou KRY-GDW..."
                  value={identifiant}
                  onChange={e => setIdentifiant(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0284c7] font-medium text-xs bg-slate-50/50"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block font-bold text-slate-700">
                  Mot de passe
                </label>
                <span className="text-[11px] text-slate-400">
                  (Défaut : pass123)
                </span>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type={afficherMdp ? 'text' : 'password'}
                  required
                  placeholder="••••••••"
                  value={motDePasse}
                  onChange={e => setMotDePasse(e.target.value)}
                  className="w-full pl-9 pr-10 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0284c7] font-medium text-xs bg-slate-50/50"
                />
                <button
                  type="button"
                  onClick={() => setAfficherMdp(!afficherMdp)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5"
                >
                  {afficherMdp ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={chargement}
              className="w-full py-3 px-4 font-bold text-xs text-white bg-[#0284c7] hover:bg-[#0369a1] rounded-xl shadow-md transition-all flex items-center justify-center gap-2 transform active:scale-98"
            >
              {chargement ? (
                <span>Vérification de la session...</span>
              ) : (
                <>
                  <span>Se connecter à mon espace</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Connexions rapides de test (Démo facilitée) */}
          <div className="border-t border-slate-100 pt-4 space-y-2">
            <button
              type="button"
              onClick={() => setBoiteTestOuverte(!boiteTestOuverte)}
              className="w-full flex items-center justify-between text-left text-xs font-bold text-slate-700 hover:text-[#0284c7] transition-colors"
            >
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>Connexion Rapide en 1 Clic (Comptes de Test)</span>
              </span>
              <span className="text-[11px] text-slate-400 font-normal">
                {boiteTestOuverte ? 'Masquer' : 'Afficher'}
              </span>
            </button>

            {boiteTestOuverte && (
              <div className="grid grid-cols-2 gap-2 pt-1 text-[11px]">
                <button
                  type="button"
                  onClick={() => handleConnexionRapide('admin')}
                  className="p-2 rounded-lg bg-slate-50 hover:bg-sky-50 border border-slate-200 text-left transition-colors flex flex-col"
                >
                  <span className="font-bold text-slate-900">👑 Admin Central</span>
                  <span className="text-[10px] text-slate-500 font-mono">admin / pass123</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleConnexionRapide('coord.golfsud')}
                  className="p-2 rounded-lg bg-slate-50 hover:bg-sky-50 border border-slate-200 text-left transition-colors flex flex-col"
                >
                  <span className="font-bold text-slate-900">🏛️ Coord. Golf Sud</span>
                  <span className="text-[10px] text-slate-500 font-mono">Ousmane Sall</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleConnexionRapide('commissaire.fadia')}
                  className="p-2 rounded-lg bg-slate-50 hover:bg-sky-50 border border-slate-200 text-left transition-colors flex flex-col"
                >
                  <span className="font-bold text-slate-900">📍 Commissaire Quartier</span>
                  <span className="text-[10px] text-slate-500 font-mono">Cité Fadia</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleConnexionRapide('militant.demo')}
                  className="p-2 rounded-lg bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-left transition-colors flex flex-col"
                >
                  <span className="font-bold text-emerald-950">📱 Espace Militant</span>
                  <span className="text-[10px] text-emerald-700 font-mono">Accès restreint seul</span>
                </button>
              </div>
            )}
          </div>

          {/* Section d'adhésion citoyenne en ligne */}
          <div className="bg-sky-50/70 border border-sky-200/80 p-3.5 rounded-2xl text-center space-y-2">
            <p className="text-xs text-sky-950 font-bold">
              Vous êtes un militant ou nouveau sympathisant ?
            </p>
            <p className="text-[11px] text-sky-800">
              Inscrivez-vous en ligne en 2 minutes avec votre position GPS de quartier.
            </p>
            <button
              type="button"
              onClick={onOpenInscription}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 font-bold text-xs text-white bg-sky-700 hover:bg-sky-800 rounded-xl transition-colors shadow-xs"
            >
              <UserPlus className="w-3.5 h-3.5 text-rose-300" />
              <span>Adhérer à KIIRAAY (Formulaire citoyen)</span>
            </button>
          </div>

          {/* Bouton de vérification publique d'une carte */}
          {onOpenVerifyModal && (
            <div className="text-center pt-1">
              <button
                type="button"
                onClick={onOpenVerifyModal}
                className="text-[11px] text-slate-500 hover:text-slate-800 transition-colors inline-flex items-center gap-1.5"
              >
                <QrCode className="w-3.5 h-3.5 text-slate-400" />
                <span>Scanner ou vérifier l'authenticité d'une carte officielle</span>
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Footer légal */}
      <footer className="max-w-5xl w-full mx-auto text-center py-3 text-[11px] text-slate-400 relative z-10 space-y-1">
        <p className="flex items-center justify-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>Plateforme officielle conforme à la Loi sénégalaise 2008-12 et aux directives de la CDP</span>
        </p>
        <p className="text-slate-500">
          KIIRAAY · Département de Guédiawaye (Golf Sud, Sam Notaire, Ndiarème Limamoulaye, Wakhinane Nimzatt, Médina Gounass)
        </p>
      </footer>
    </div>
  );
};
