import { useEffect } from "react";
import {
  Activity, ArrowRight, BookOpen, FileText,
  HeartPulse, Leaf, Shield, Timer, Users2, Play
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PayhipCheckout } from "@/components/PayhipCheckout";
import { Link } from "react-router-dom";

// --- Payhip : 1 URL par édition (produits distincts) ---
const PAYHIP_ESS = { url: "https://payhip.com/b/e61gt", id: "e61gt" };
const PAYHIP_SER = { url: "https://payhip.com/b/cyM7k", id: "cyM7k" };
const PAYHIP_PRE = { url: "https://payhip.com/b/DQR3b", id: "DQR3b" };

export default function CircuitVitalLanding() {
  useEffect(() => {
    document.title = "Circuit Vital — Bouge mieux, vis mieux (routine 10 min)";
  }, []);

  // Charge le script Payhip si absent, puis initialise
  useEffect(() => {
    if (!document.querySelector('script[src*="payhip.com/js/payhip.js"]')) {
      const s = document.createElement("script");
      s.src = "https://payhip.com/js/payhip.js";
      s.async = true;
      document.body.appendChild(s);
    }
    const w = window as any;
    if (typeof w?.payhipEmbedLoad === "function") w.payhipEmbedLoad();
    if (typeof w?.Payhip?.setup === "function") w.Payhip.setup();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#243646] via-[#59756F] to-[#B8CBB2] text-slate-900">
      <NavBar />

      {/* HERO */}
      <section className="mx-auto max-w-6xl px-4 pt-10 pb-6">
        <div className="rounded-3xl bg-white/90 backdrop-blur border border-slate-200 p-6 md:p-10 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <p className="inline-flex items-center gap-2 text-sm font-medium text-emerald-700">
              <Leaf className="h-4 w-4" /> Méthode douce, 100% sans matériel
            </p>
            <h1 className="mt-2 text-3xl md:text-5xl font-bold leading-tight tracking-tight text-slate-900">
              10 minutes par jour pour soulager ton corps et alléger ton mental.
            </h1>
            <p className="mt-4 text-slate-700 text-lg">
              Une routine fluide et guidée pour bouger mieux, vivre mieux — seule ou en équipe.
              Déployable en 2 heures, mesurable en quelques semaines.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <PayhipCheckout
                href={PAYHIP_SER.url}
                productId={PAYHIP_SER.id}
                label={
                  <>
                    <Activity className="mr-2 h-5 w-5" />
                    Télécharger / Commander
                  </>
                }
                className="rounded-2xl"
              />
              <a
                href="#experience"
                className="inline-flex items-center rounded-2xl border border-slate-200 px-4 py-2 text-sm hover:bg-slate-50"
              >
                <ArrowRight className="mr-2 h-5 w-5" /> Voir l'expérience
              </a>
            </div>
            <div className="mt-5 grid grid-cols-3 gap-3 text-sm">
              {[
                { k: "- douleurs", icon: HeartPulse },
                { k: "+ posture", icon: Shield },
                { k: "+ énergie", icon: Timer },
              ].map(({ k, icon: Icon }, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-slate-200 bg-white py-3 px-4 flex items-center gap-2 font-semibold text-slate-800"
                >
                  <Icon className="h-4 w-4" /> {k}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="bg-[radial-gradient(circle_at_center,_#d9f3e1_0%,_#216b4a_100%)] p-3 sm:p-4">
              <div className="aspect-video w-full rounded-xl overflow-hidden">
                <img
                  src="/Logo_CircuitVital.png"
                  alt="Circuit Vital — visuel"
                  className="h-full w-full object-cover"
                  loading="eager"
                  decoding="async"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section id="experience" className="mx-auto max-w-6xl px-4 pb-2">
        <div className="rounded-3xl bg-white/90 border border-slate-200 p-6 md:p-10">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">Faites-le. Ressentez. Transmettez.</h2>
          <div className="mt-4 grid md:grid-cols-2 gap-8 text-slate-700">
            <div>
              <p className="font-semibold text-slate-900">Chaque mouvement est une porte.</p>
              <p className="mt-2">
                Une ouverture vers soi, vers son corps, vers sa présence. Prendre 10 minutes chaque jour pour
                faire bouger ses articulations, c’est :
              </p>
              <ul className="list-disc ml-5 mt-2 space-y-1">
                <li>honorer le corps qui nous soutient</li>
                <li>nourrir une énergie simple et essentielle</li>
                <li>revenir ici, maintenant, dans le vivant</li>
                <li>se reconnecter à ce qui compte vraiment</li>
              </ul>
              <p className="mt-4 font-semibold text-slate-900">Ce guide n’est pas une performance.</p>
              <p className="mt-2">
                C’est un rituel d’attention. Un soin discret mais puissant. Un rendez-vous avec soi, pour aller
                mieux, un jour après l’autre.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <p className="font-semibold text-slate-900">Et maintenant ?</p>
              <p className="mt-2">
                Créez votre rituel. Laissez le corps vous parler. Partagez-le autour de vous, à votre façon.
                Quand le mouvement circule, la vie devient plus fluide — et parfois… tout change doucement,
                durablement.
              </p>
              <div className="mt-4">
                <PayhipCheckout
                  href={PAYHIP_SER.url}
                  productId={PAYHIP_SER.id}
                  label="Commencer aujourd’hui – Édition Sérénité"
                  className="rounded-xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SCIENCE */}
      <section id="science" className="mx-auto max-w-6xl px-4 pb-10">
        <div className="rounded-3xl bg-white/90 border border-slate-200 p-6 md:p-10">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">Ce que dit la science sur la mobilisation articulaire</h2>
          <div className="mt-6 grid md:grid-cols-2 gap-6">
            {[
              {
                t: "Gain d’amplitude articulaire",
                d: "Des routines simples permettent +10 à +25% d’amplitude en 4 à 6 semaines de pratique régulière.",
                s: "Reinold et al., J Orthop Sports Phys Ther, 2014.",
              },
              {
                t: "Réduction des douleurs musculo-squelettiques",
                d: "La mobilisation quotidienne diminue les douleurs chroniques liées à la posture ou au manque de mouvement de 30 à 50%.",
                s: "INRS 2019 ; NIH Pain Intervention Study, 2020.",
              },
              {
                t: "Préservation du cartilage",
                d: "Les mouvements doux stimulent le liquide synovial et entretiennent la nutrition du cartilage, prévenant l’arthrose.",
                s: "Journal of Anatomy, 2018 — Articular cartilage and movement.",
              },
              {
                t: "Attention & énergie",
                d: "Associée à la respiration, la routine réduit la fatigue perçue (−30%) et améliore la concentration (+20%).",
                s: "Occupational Health — Microbreaks Study, 2019.",
              },
              {
                t: "Prévention TMS au travail",
                d: "Intégrer ces mobilisations dans les rituels professionnels réduit de 40% certains troubles MS déclarés.",
                s: "INRS, recommandations ergonomiques, 2019.",
              },
            ].map((it, i) => (
              <Card key={i} className="rounded-2xl">
                <CardHeader>
                  <CardTitle className="text-slate-900">{it.t}</CardTitle>
                </CardHeader>
                <CardContent className="text-slate-700">
                  <p>{it.d}</p>
                  <p className="mt-2 text-xs opacity-80">Source : {it.s}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* KIT */}
      <section id="kit" className="mx-auto max-w-6xl px-4 pb-10">
        <div className="rounded-3xl bg-white/90 border border-slate-200 p-6 md:p-10">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">Ce que vous recevez</h2>
          <div className="mt-6 grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Le livret (A5 ou A4)",
                text: "Guidage pas à pas illustré. Papier 170 g demi-mat, créé et imprimé en France.",
                icon: BookOpen,
              },
              {
                title: "Poster d’équipe (A2 plié)",
                text: "Rituel affiché. Option Premium pour ancrer la pratique dans le quotidien.",
                icon: FileText,
              },
              {
                title: "Déploiement express",
                text: "Rituel installé en 60–90 minutes. Compatible open-space et atelier.",
                icon: Users2,
              },
            ].map((b, i) => (
              <Card key={i} className="rounded-2xl">
                <CardHeader className="flex flex-row items-center gap-3">
                  <b.icon className="h-5 w-5" />
                  <CardTitle className="text-slate-900">{b.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-slate-700">{b.text}</CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* TARIFS */}
      <section id="tarifs" className="mx-auto max-w-6xl px-4 pb-10">
        <div className="rounded-3xl bg-white/90 border border-slate-200 p-6 md:p-10">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">Choisissez votre édition</h2>

          <div className="mt-6 grid md:grid-cols-3 gap-6">
            {/* Essentielle */}
            <Card className="rounded-2xl flex flex-col justify-between">
              <CardHeader>
                <div className="flex items-start justify-between mb-3">
                  <CardTitle className="text-slate-900">Édition Essentielle</CardTitle>
                  <Badge className="bg-orange-500/10 text-orange-700 border border-orange-300 text-xs">Meilleur prix</Badge>
                </div>
                <div>
                  <div className="text-3xl font-bold mt-1">9,90 €</div>
                  <div className="text-xs text-slate-600 mt-1">A5 (compact) — frais de port 1,90 €</div>
                </div>
              </CardHeader>
              <CardContent className="flex flex-col flex-1 justify-between">
                <ul className="text-slate-700 list-disc ml-5 space-y-1 mb-4">
                  <li>Livret imprimé A5</li>
                  <li>Routine 10 min guidée</li>
                  <li>Papier 170 g demi-mat</li>
                </ul>
                <PayhipCheckout
                  href={PAYHIP_ESS.url}
                  productId={PAYHIP_ESS.id}
                  label="Choisir cette édition"
                  className="w-full rounded-xl mt-auto"
                />
              </CardContent>
            </Card>

            {/* Sérénité */}
            <Card className="rounded-2xl flex flex-col justify-between">
              <CardHeader>
                <div className="flex items-start justify-between mb-3">
                  <CardTitle className="text-slate-900">Édition Sérénité</CardTitle>
                  <Badge className="bg-orange-500/10 text-orange-700 border border-orange-300 text-xs">Populaire</Badge>
                </div>
                <div>
                  <div className="text-3xl font-bold mt-1">14,90 €</div>
                  <div className="text-xs text-slate-600 mt-1">A4 (confort) — frais de port offerts</div>
                </div>
              </CardHeader>
              <CardContent className="flex flex-col flex-1 justify-between">
                <ul className="text-slate-700 list-disc ml-5 space-y-1 mb-4">
                  <li>Livret imprimé A4</li>
                  <li>Lecture confortable</li>
                  <li>Papier 170 g demi-mat</li>
                </ul>
                <PayhipCheckout
                  href={PAYHIP_SER.url}
                  productId={PAYHIP_SER.id}
                  label="Choisir cette édition"
                  className="w-full rounded-xl mt-auto"
                />
              </CardContent>
            </Card>

            {/* Pack Vitalité */}
            <Card className="rounded-2xl flex flex-col justify-between">
              <CardHeader>
                <div className="flex items-start justify-between mb-3">
                  <CardTitle className="text-slate-900">Pack Vitalité (Premium)</CardTitle>
                  <Badge className="bg-orange-500/10 text-orange-700 border border-orange-300 text-xs">Équipe</Badge>
                </div>
                <div>
                  <div className="text-3xl font-bold mt-1">59,00 €</div>
                  <div className="text-xs text-slate-600 mt-1">5 livrets + 1 poster A2 plié — port offerts</div>
                </div>
              </CardHeader>
              <CardContent className="flex flex-col flex-1 justify-between">
                <ul className="text-slate-700 list-disc ml-5 space-y-1 mb-4">
                  <li>Déploiement d’équipe</li>
                  <li>Affichage rituel d’équipe</li>
                  <li>Idéal entreprises/associations</li>
                </ul>
                <PayhipCheckout
                  href={PAYHIP_PRE.url}
                  productId={PAYHIP_PRE.id}
                  label="Choisir cette édition"
                  className="w-full rounded-xl mt-auto"
                />
              </CardContent>
            </Card>
          </div>

          <p className="mt-4 text-xs text-slate-600">
            Paiement sécurisé via Payhip. Besoin d’une version entreprise ?{" "}
            <a
              className="underline"
              href="mailto:gilles.lortet@circuitvital.com?subject=Licence%20entreprise%20Circuit%20Vital"
            >
              Écrivez-moi
            </a>.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="mx-auto max-w-6xl px-4 pb-14">
        <div className="rounded-3xl bg-white/90 border border-slate-200 p-6 md:p-10">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">Questions fréquentes</h2>
          <div className="mt-6 grid md:grid-cols-2 gap-6">
            {[
              { q: "À qui s’adresse Circuit Vital ?", a: "À tous, de 4 à 99 ans. Options assis/debout, aucun matériel requis." },
              { q: "Quel temps d’installation ?", a: "Comptez 60–90 minutes pour lancer le rituel en équipe (poster + première session)." },
              { q: "Comment mesurer les effets ?", a: "Suivi simple : douleur perçue (RPE), amplitude, assiduité. Ajustements toutes les 2 semaines." },
              { q: "Compatible QVT/Sécurité ?", a: "Oui, parfait en ouverture de poste et prévention TMS dans les environnements de travail." },
            ].map((f, i) => (
              <Card key={i} className="rounded-2xl">
                <CardHeader>
                  <CardTitle className="text-lg text-slate-900">{f.q}</CardTitle>
                </CardHeader>
                <CardContent className="text-slate-700">{f.a}</CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-8 flex justify-center">
            <PayhipCheckout
              href={PAYHIP_SER.url}
              productId={PAYHIP_SER.id}
              label={
                <>
                  <Users2 className="mr-2 h-5 w-5" />
                  Rejoindre le mouvement
                </>
              }
              className="rounded-2xl"
            />
          </div>

          <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 text-slate-700">
            <p className="font-semibold text-slate-900">Merci d’avoir cheminé jusqu’ici.</p>
            <p className="mt-2">
              Circuit Vital n’est pas une performance. C’est un rituel simple, accessible, profondément humain.
              Quand le mouvement circule, la vie devient plus fluide — et parfois, tout change doucement, durablement.
            </p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="mx-auto max-w-6xl px-4 pb-10">
        <div className="rounded-2xl bg-white/80 backdrop-blur border border-slate-200 py-3 px-4 text-xs text-slate-600 text-center">
          © {new Date().getFullYear()} Gilles Lortet — Circuit Vital. Créé, imprimé et expédié en France.
        </div>
      </footer>
    </div>
  );
}

/* ========================
   NavBar (interne à la page)
   ======================== */
function NavBar() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      console.assert(true, "[test] CV NavBar loaded");
    }
  }, []);

  return (
    <div className="sticky top-0 z-50 backdrop-blur bg-white/70 border-b border-slate-200">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        {/* Retour Accueil */}
        <Link to="/" className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-xl bg-gradient-to-tr from-emerald-400 to-teal-500" />
          <span className="font-semibold tracking-tight">Gilles Lortet</span>
          <Badge className="ml-2 bg-orange-500/10 text-orange-600 border border-orange-400/30">
            Corps • Communication • Surconscience
          </Badge>
        </Link>

        {/* Liens SECTION de la page CV (ancres locales) */}
<nav className="hidden md:flex items-center gap-6 text-sm">
  <button onClick={() => document.getElementById("experience")?.scrollIntoView({behavior:"smooth"})} className="hover:text-slate-900">L’expérience</button>
  <button onClick={() => document.getElementById("science")?.scrollIntoView({behavior:"smooth"})}    className="hover:text-slate-900">Ce que dit la science</button>
  <button onClick={() => document.getElementById("kit")?.scrollIntoView({behavior:"smooth"})}        className="hover:text-slate-900">Le kit</button>
  <button onClick={() => document.getElementById("tarifs")?.scrollIntoView({behavior:"smooth"})}     className="hover:text-slate-900">Tarifs</button>
  <button onClick={() => document.getElementById("faq")?.scrollIntoView({behavior:"smooth"})}        className="hover:text-slate-900">FAQ</button>
</nav>

        <div className="flex items-center gap-2">
<Button asChild variant="ghost" className="hidden md:inline-flex">
  <a onClick={(e) => { e.preventDefault(); document.getElementById("experience")?.scrollIntoView({behavior:"smooth"}); }}>
    <Play className="mr-2 h-4 w-4" /> Vidéo
  </a>
</Button>
        </div>
      </div>
    </div>
  );
}
