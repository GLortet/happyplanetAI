import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  Brain,
  Activity,
  Bot,
  Mail,
  Play,
  Calendar,
  Linkedin,
  X
} from "lucide-react";
// ========================
// Cookie Consent (RGPD basics)
// ========================
function CookieConsent() {
  const [consent, setConsent] = useState<string | null>(null);
  useEffect(() => {
    const v = localStorage.getItem('site_consent');
    setConsent(v);
  }, []);
  const accept = () => {
    localStorage.setItem('site_consent', 'accepted');
    setConsent('accepted');
    window.dispatchEvent(new Event('site_consent_changed'));
  };
  const decline = () => {
    localStorage.setItem('site_consent', 'denied');
    setConsent('denied');
    window.dispatchEvent(new Event('site_consent_changed'));
  };
  if (consent) return null;
  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[60] max-w-3xl w-[92%] rounded-2xl bg-white shadow-lg border border-slate-200 p-4 md:p-5">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <p className="text-sm text-slate-700">
          Nous utilisons des services externes (YouTube, Calendly) susceptibles de déposer des cookies.
          Choisis « Accepter » pour activer ces contenus, ou « Refuser » pour continuer sans. Tu peux changer d'avis dans les Mentions légales.
        </p>
        <div className="flex gap-2 shrink-0">
          <Button onClick={decline} variant="outline" className="rounded-xl">Refuser</Button>
          <Button onClick={accept} className="rounded-xl bg-slate-800 text-white hover:bg-slate-900">Accepter</Button>
        </div>
      </div>
    </div>
  );
}

// ========================
// Root Component
// ========================
export default function Home() {
  // load Calendly only after consent
  const loadCalendly = () => {
    if (!document.querySelector('link[href*="calendly.com/assets/external/widget.css"]')) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://assets.calendly.com/assets/external/widget.css';
      document.head.appendChild(link);
    }
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    script.onload = () => {
      const w = window as any;
      if (w && w.Calendly) {
        w.Calendly.initBadgeWidget({
          url: 'https://calendly.com/lortet-gilles/echange-decouverte-communication-pcm',
          text: 'Réserver un échange (visio/tél)',
          color: '#E37335',
          textColor: '#ffffff',
          branding: true,
        });
      }
    };
    document.body.appendChild(script);
  };

  useEffect(() => {
    // SEO / OpenGraph / Favicon injection
    const title = "Gilles Lortet — Corps • Communication • Surconscience";
    const description = "Faire bouger les corps, améliorer les relations, transcender les idées. Une approche intégrée du corps, de la communication et de l’intelligence.";
    const ogImage = "/Logo_HappyplanetAI.png";

    document.title = title;
    const ensureTag = (selector: string, tag: keyof HTMLElementTagNameMap, attrs: Record<string,string>) => {
      let el = document.head.querySelector(selector) as HTMLElement | null;
      if (!el) { el = document.createElement(tag); document.head.appendChild(el); }
      Object.entries(attrs).forEach(([k,v]) => el!.setAttribute(k, v));
      return el;
    };

    ensureTag('link[rel="icon"]', 'link', { rel: 'icon', href: '/favicon.ico' });
    ensureTag('link[rel="apple-touch-icon"]', 'link', { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' });
    ensureTag('meta[name="theme-color"]', 'meta', { name: 'theme-color', content: '#243646' });

    // Open Graph & Twitter
    ensureTag('meta[property="og:title"]', 'meta', { property: 'og:title', content: title });
    ensureTag('meta[property="og:description"]', 'meta', { property: 'og:description', content: description });
    ensureTag('meta[property="og:image"]', 'meta', { property: 'og:image', content: ogImage });
    ensureTag('meta[property="og:type"]', 'meta', { property: 'og:type', content: 'website' });
    ensureTag('meta[property="og:url"]', 'meta', { property: 'og:url', content: window.location.href });
    ensureTag('meta[name="twitter:card"]', 'meta', { name: 'twitter:card', content: 'summary_large_image' });
    ensureTag('meta[name="twitter:site"]', 'meta', { name: 'twitter:site', content: '@GillesLortet' });
    ensureTag('meta[name="twitter:title"]', 'meta', { name: 'twitter:title', content: title });
    ensureTag('meta[name="twitter:description"]', 'meta', { name: 'twitter:description', content: description });
    ensureTag('meta[name="twitter:image"]', 'meta', { name: 'twitter:image', content: ogImage });

    // Calendly only if consent accepted
    const init = () => { if (localStorage.getItem('site_consent') === 'accepted') loadCalendly(); };
    init();
    const handler = () => init();
    window.addEventListener('site_consent_changed', handler);
    return () => window.removeEventListener('site_consent_changed', handler);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#243646] via-[#59756F] to-[#B8CBB2] text-slate-900">
      <CookieConsent />
      <NavBar />
      <Hero />
      <Pillars />
      <Proof />
      <Offer />
      <FAQ />
      <CTA />
      <Legal />
      <Footer />
    </div>
  );
}

// ========================
// NavBar
// ========================
function NavBar() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      console.assert(typeof Pillars === 'function', '[test] Pillars component must be defined');
    }
  }, []);

const navigate = useNavigate();
const location = useLocation();

const goToSection = (id: string) => {
  const scroll = () => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Si on est déjà sur la Home, on scroll direct
  if (location.pathname === "/") {
    scroll();
  } else {
    // Sinon on revient à la Home, puis on scroll
    navigate("/");
    // Laisse React peindre la page avant de scroller
    setTimeout(scroll, 0);
  }
};


  return (
    <div className="sticky top-0 z-50 backdrop-blur bg-white/70 border-b border-slate-200">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <a href="#home" className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-xl bg-gradient-to-tr from-emerald-400 to-teal-500" />
          <span className="font-semibold tracking-tight">Gilles Lortet</span>
          <Badge className="ml-2 bg-orange-500/10 text-orange-600 border border-orange-400/30">Corps • Communication • Surconscience</Badge>
        </a>
        <nav className="hidden md:flex items-center gap-6 text-sm">
  <button onClick={() => goToSection("pillars")} className="hover:text-slate-900">Piliers</button>
  <button onClick={() => goToSection("offer")}   className="hover:text-slate-900">Offres</button>
  <button onClick={() => goToSection("faq")}     className="hover:text-slate-900">FAQ</button>
  <button onClick={() => goToSection("contact")} className="hover:text-slate-900">Contact</button>
</nav>
        <div className="flex items-center gap-2">
          <Button asChild variant="ghost" className="hidden md:inline-flex">
            <a href="#demo"><Play className="mr-2 h-4 w-4"/>Vidéo</a>
          </Button>
          <Button asChild>
            <a href="#newsletter"><Mail className="mr-2 h-4 w-4"/>S'abonner</a>
          </Button>
        </div>
      </div>
    </div>
  );
}

// ========================
// Hero
// ========================
function Hero() {
  return (
    <section id="home" className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#243646] via-[#59756F] to-[#B8CBB2]" />
      <div className="mx-auto max-w-6xl px-4 py-20 grid md:grid-cols-2 gap-10 items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="mt-4 text-4xl md:text-5xl font-bold leading-tight tracking-tight text-slate-50 drop-shadow">
            Faire bouger les corps, améliorer les relations, transcender les idées.
          </h1>
          <p className="mt-5 text-slate-100 text-lg">
            Une approche intégrée du corps, de la communication et de l’intelligence — pour remettre du sens et du mouvement dans la vie et le travail.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg" className="rounded-2xl">
              <Link to="/circuit-vital">
                <Activity className="mr-2 h-5 w-5" />
                Découvrir Circuit Vital
              </Link>
            </Button>

            <Button
              asChild
              size="lg"
              className="rounded-2xl bg-orange-600 text-white hover:bg-orange-700 shadow"
            >
              <a
                href="https://calendly.com/lortet-gilles/echange-decouverte-communication-pcm"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Calendar className="mr-2 h-5 w-5" />
                Réserver une place PCM
              </a>
            </Button>

            <Button
              asChild
              size="lg"
              className="rounded-2xl bg-slate-800 text-white hover:bg-slate-900 shadow"
            >
              <a
                href="https://github.com/GLortet/InnerShift"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Bot className="mr-2 h-5 w-5" />
                InnerShift (concept)
              </a>
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="relative aspect-[4/3] rounded-3xl border border-white/10 shadow-lg overflow-hidden bg-gradient-to-tr from-[#0b2238] to-[#113555] flex items-center justify-center">
            {/* Halo lumineux */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.15)_0%,transparent_70%)]" />
            <img
              src="/Logo_HappyplanetAI.png"
              alt="Logo HappyPlanetAI par Gilles Lortet"
              className="w-3/4 h-auto object-contain drop-shadow-[0_0_25px_rgba(255,255,255,0.25)]"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).style.display = "none";
              }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
// ========================
// Proof (méthode commune + tabs)
// ========================
function Proof() {
  const [consent, setConsent] = useState<string | null>(null);
  const [tab, setTab] = useState<'circuitvital' | 'pcm' | 'innershift'>('circuitvital');
  const [playVideo, setPlayVideo] = useState(false);

  useEffect(() => {
    setConsent(localStorage.getItem('site_consent'));
    const handler = () => setConsent(localStorage.getItem('site_consent'));
    window.addEventListener('site_consent_changed', handler);
    return () => window.removeEventListener('site_consent_changed', handler);
  }, []);

  const content = {
    circuitvital: {
      title: 'Circuit Vital',
      text: "Mise en mouvement courte (10 min), consignes simples et mesurables. Objectif : fluidité articulaire, posture, respiration.",
      kpis: ['10 min/j', '+ posture', '- douleurs'],
      videoId: '8-WO2Duo-9c',
      cta: { label: 'Découvrir Circuit Vital', href: '/circuit-vital' },
    },
    pcm: {
      title: 'PCM & Coaching',
      text: "Langage motivationnel, gestion du stress, prévention des conflits. On pratique sur des cas réels (équipe, sport).",
      kpis: ['+ clarté', '- frictions', '+ engagement'],
      videoId: null as string | null,
      cta: { label: 'Réserver un échange PCM', href: 'https://calendly.com/lortet-gilles/echange-decouverte-communication-pcm' },
    },
    innershift: {
      title: 'InnerShift (concept)',
      text: "IA miroir : transcription, analyse, priorités. Feedback actionnable et PDF généré pour ancrer les décisions.",
      kpis: ['+ clarté', '+ vitesse', 'trace PDF'],
      videoId: null as string | null,
      cta: { label: 'Voir le repo / Coaching IA', href: 'https://github.com/GLortet/InnerShift' },
    },
  } as const;

  const active = content[tab];
  const embedUrl = active.videoId ? `https://www.youtube-nocookie.com/embed/${active.videoId}` : null;

  useEffect(() => {
    console.assert(!!active.title && !!active.text, '[test] Proof active content defined');
    setPlayVideo(false);
  }, [tab]);

  return (
    <section id="demo" className="mx-auto max-w-6xl px-4 py-14">
      <div className="rounded-3xl bg-white/90 backdrop-blur border border-slate-200 p-6 md:p-10">
        <div className="mb-6">
          <h3 className="text-2xl md:text-3xl font-semibold tracking-tight text-slate-900">Comment on travaille (méthode commune)</h3>
          <p className="mt-2 text-slate-700">Un même cadre : courte action, langage précis, feedback immédiat. Puis on mesure, on ajuste, on ancre. Choisis un pilier :</p>
          <div className="mt-4 inline-flex gap-2 rounded-2xl bg-slate-100 p-1">
            {([
              { id: 'circuitvital', label: 'Circuit Vital' },
              { id: 'pcm', label: 'PCM' },
              { id: 'innershift', label: 'InnerShift' },
            ] as const).map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`px-3 py-1.5 rounded-xl text-sm transition ${tab === t.id ? 'bg-white shadow border border-slate-200 text-slate-900' : 'text-slate-600 hover:text-slate-800'}`}
                aria-pressed={tab === t.id}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h4 className="text-xl font-semibold text-slate-900">{active.title}</h4>
            <p className="mt-3 text-slate-700">{active.text}</p>
            <div className="mt-6 grid sm:grid-cols-3 gap-4">
              {active.kpis.map((k, i) => (
                <div key={i} className="rounded-2xl border border-slate-200 py-6 text-center font-semibold text-slate-800">
                  {k}
                </div>
              ))}
            </div>
            <div className="mt-6">
              <Button asChild>
                {active.cta.href === '/circuit-vital' ? (
                  <Link to="/circuit-vital">
                    <ArrowRight className="mr-2 h-4 w-4" />
                    {active.cta.label}
                  </Link>
                ) : (
                  <a href={active.cta.href} target="_blank" rel="noopener noreferrer">
                    <ArrowRight className="mr-2 h-4 w-4" />
                    {active.cta.label}
                  </a>
                )}
              </Button>

              {active.videoId && (
                <Button asChild variant="outline" className="ml-3">
                  <a href={`https://youtu.be/${active.videoId}`} target="_blank" rel="noopener noreferrer">
                    Voir sur YouTube
                  </a>
                </Button>
              )}
            </div>
          </div>

          <div className="relative aspect-[4/3] rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
            {embedUrl && consent === 'accepted' ? (
              playVideo ? (
                <iframe
                  key={`${active.videoId}-${consent}-${playVideo}`}
                  className="absolute inset-0 w-full h-full"
                  src={embedUrl}
                  title={`${active.title} — vidéo`}
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              ) : (
                <button
                  onClick={() => setPlayVideo(true)}
                  className="absolute inset-0 w-full h-full group text-left"
                  aria-label="Charger la vidéo YouTube"
                >
                  <img
                    src={`https://i.ytimg.com/vi/${active.videoId}/hqdefault.jpg`}
                    alt={`${active.title} — miniature vidéo`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition" />
                  <div className="absolute inset-0 grid place-items-center">
                    <div className="flex items-center gap-2 rounded-full px-4 py-2 bg-white/90 shadow-md">
                      <Play className="h-4 w-4" />
                      <span className="text-sm font-medium">Lire la vidéo</span>
                    </div>
                  </div>
                </button>
              )
            ) : (
              <div className="absolute inset-0 grid place-items-center bg-slate-50 text-center p-6">
                <div>
                  <p className="text-slate-700 mb-3">
                    {embedUrl ? 'La vidéo est désactivée tant que les cookies ne sont pas acceptés.' : 'Pas de vidéo publique pour le moment.'}
                  </p>
                  {embedUrl ? (
                    <div className="flex flex-col items-center gap-2">
                      <Button
                        onClick={() => {
                          localStorage.setItem('site_consent', 'accepted');
                          window.dispatchEvent(new Event('site_consent_changed'));
                        }}
                        className="rounded-xl bg-slate-800 text-white hover:bg-slate-900"
                      >
                        Autoriser la vidéo
                      </Button>
                      <a className="text-xs underline text-slate-600" href={`https://youtu.be/${active.videoId}`} target="_blank" rel="noopener noreferrer">
                        Ou lire directement sur YouTube
                      </a>
                    </div>
                  ) : (
                    <Button asChild className="rounded-xl bg-slate-800 text-white hover:bg-slate-900">
                      {active.cta.href === '/circuit-vital' ? (
                        <Link to="/circuit-vital">{active.cta.label}</Link>
                      ) : (
                        <a href={active.cta.href} target="_blank" rel="noopener noreferrer">
                          {active.cta.label}
                        </a>
                      )}
                    </Button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
// ========================
// Pillars
// ========================
function Pillars() {
  const items = [
    {
      id: "circuitvital",
      icon: Activity,
      title: "Circuit Vital",
      subtitle: "Routine 10 minutes • Santé & QVT au travail",
      desc:
        "Une méthode simple et universelle pour remettre le corps en mouvement, prévenir les douleurs et renforcer la cohésion d’équipe. Déployable sur site ou à distance, avec licence entreprise et atelier d’intégration.",
      cta: "Découvrir Circuit Vital",
      href: "/circuit-vital",
      bullets: [
        "Pack PDF A4/A5 + posters + guide d’intégration",
        "Atelier d’initiation (60–90 min, site ou visio)",
        "Licence entreprise (usage collectif)",
      ],
      badge: { label: "Nouveau", tone: "emerald" },
    },
    {
      id: "pcm",
      icon: Brain,
      title: "PCM & Coaching",
      subtitle: "Communication, stress, leadership authentique",
      desc:
        "En certification formateur PCM (2026). Intégrez mes formations tests PCM1 certifiantes (2 places restantes, entre novembre et janvier), ou réservez une place pour les formations PCM1 / PCM2 à partir de janvier 2026.",
      cta: "Réserver / Découvrir les formations",
      href:
        "https://calendly.com/lortet-gilles/echange-decouverte-communication-pcm",
      bullets: [
        "PCM1 certifiante (2 places restantes, Nov–Jan)",
        "PCM1 / PCM2 (réservation dès Jan 2026)",
        "Outils : stress / conflits / langage motivationnel / conscience de soi",
      ],
      badge: { label: "Recommandé", tone: "orange" },
    },
    {
      id: "innershift",
      icon: Bot,
      title: "InnerShift (concept)",
      subtitle: "Codex + GPT-5 • IA miroir & auto-analyse",
      desc:
        "Un exemple concret de ce que je conçois avec ChatGPT et Codex : une IA qui analyse des conversations et génère un feedback personnalisé. Coaching pour intégrer l’IA dans votre travail.",
      cta: "Découvrir InnerShift / Coaching IA",
      href: "https://github.com/GLortet/InnerShift",
      bullets: [
        "Démonstration : audio → analyse → PDF dynamique",
        "Coaching IA (workflow & adoption)",
        "Conception de PoC IA sur mesure",
      ],
      badge: { label: "R&D", tone: "sky" },
    },
  ];

  const toneMap = {
    emerald:
      "bg-emerald-500/15 text-emerald-700 border border-emerald-400/30",
    orange: "bg-orange-500/15 text-orange-700 border border-orange-400/30",
    sky: "bg-sky-500/15 text-sky-700 border border-sky-400/30",
  } as const;

  const toneClass = (t: string) =>
    (toneMap as Record<string, string>)[t] ??
    "bg-slate-500/15 text-slate-700 border border-slate-400/30";

  return (
    <section id="pillars" className="mx-auto max-w-6xl px-4 py-14">
      <div className="rounded-3xl bg-white/90 backdrop-blur border border-slate-200 p-6 md:p-10">
        <div className="mb-6 md:mb-8">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
            Trois piliers, une même cohérence
          </h2>
          <p className="mt-2 text-slate-700">
            Mouvement, conscience, technologie — un seul langage : le concret
            qui change la vie.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {items.map(
            ({ id, icon: Icon, title, subtitle, desc, cta, href, bullets, badge }) => {
              return (
                <Card
                  key={id}
                  className="rounded-2xl shadow-sm border-slate-200 bg-white h-full flex flex-col"
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 grid place-items-center rounded-2xl bg-orange-500/10 border border-orange-400/30">
                          <Icon className="h-5 w-5 text-orange-600" />
                        </div>
                        <div>
                          <CardTitle className="leading-tight text-slate-900">
                            {title}
                          </CardTitle>
                          <div className="text-sm text-slate-700">
                            {subtitle}
                          </div>
                        </div>
                      </div>
                      {badge && (
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-medium ${toneClass(
                            badge.tone
                          )}`}
                        >
                          {badge.label}
                        </span>
                      )}
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4 flex flex-col flex-1">
                    <p className="text-slate-800">{desc}</p>
                    <ul className="text-sm list-disc ml-5 text-slate-700 space-y-1">
                      {bullets.map((b, i) => (
                        <li key={i}>{b}</li>
                      ))}
                    </ul>
                    <div className="mt-auto">
  <Button asChild className="w-full rounded-xl">
    {href.startsWith("/") ? (
      <Link to={href}>
        {cta}
        <ArrowRight className="ml-2 h-4 w-4" />
      </Link>
    ) : (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {cta}
        <ArrowRight className="ml-2 h-4 w-4" />
      </a>
    )}
  </Button>
</div>
                  </CardContent>
                </Card>
              );
            }
          )}
        </div>
      </div>
    </section>
  );
}
// ========================
// Offer
// ========================
function Offer() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      console.assert(typeof Offer === 'function', '[test] Offer component exists');
    }
  }, []);

  return (
    <section id="offer" className="mx-auto max-w-6xl px-4 py-14">
      <div className="rounded-3xl bg-white/90 backdrop-blur border border-slate-200 p-6 md:p-10">
        <h3 className="text-2xl md:text-3xl font-semibold tracking-tight text-slate-900">Offres simples et actionnables</h3>
        <p className="mt-2 text-slate-700">Choisis le point d'entrée qui te parle aujourd'hui — on grandit ensuite en cohérence.</p>

        <div className="mt-8 grid md:grid-cols-3 gap-6">
          {/* Circuit Vital */}
          <Card className="rounded-2xl bg-white shadow border border-slate-200 flex flex-col">
            <CardHeader>
              <CardTitle>Starter • Circuit Vital</CardTitle>
              <div className="text-sm text-slate-700">PDF A5/A4 + posters + guide d'intégration</div>
            </CardHeader>
            <CardContent className="space-y-4 flex flex-col h-full">
              <ul className="text-sm list-disc ml-5 text-slate-700 space-y-1">
                <li>Routine 10 min, accessible à tous</li>
                <li>Pack entreprise (licence interne)</li>
                <li>Option atelier 60–90 min</li>
              </ul>
              <div className="mt-auto">
                <Button asChild className="w-full rounded-xl bg-emerald-600 text-white hover:bg-emerald-700">
                  <Link to="/circuit-vital">Acheter / Demander un devis</Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* PCM — Recommandé */}
          <Card className="rounded-2xl bg-white shadow border-2 border-orange-300 flex flex-col">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Team • PCM & Leadership</CardTitle>
                <Badge className="bg-orange-500/10 text-orange-700 border border-orange-400">Recommandé</Badge>
              </div>
              <div className="text-sm text-slate-700">Atelier communication & gestion du stress</div>
            </CardHeader>
            <CardContent className="space-y-4 flex flex-col h-full">
              <ul className="text-sm list-disc ml-5 text-slate-700 space-y-1">
                <li>Découverte des bases PCM</li>
                <li>Mises en situation vivantes pour décoder ses réactions et renforcer la connexion humaine</li>
                <li>Plan d’action sur mesure pour réaligner ton énergie et ton leadership</li>
              </ul>
              <div className="mt-auto">
                <Button asChild className="w-full rounded-xl bg-orange-600 text-white hover:bg-orange-700">
                  <a href="https://calendly.com/lortet-gilles/echange-decouverte-communication-pcm" target="_blank" rel="noopener noreferrer">
                    Prendre rendez-vous
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* InnerShift */}
          <Card className="rounded-2xl bg-white shadow border border-slate-200 flex flex-col">
            <CardHeader>
              <CardTitle>Beta • InnerShift</CardTitle>
              <div className="text-sm text-slate-700">PoC IA (audio → insights → PDF)</div>
            </CardHeader>
            <CardContent className="space-y-4 flex flex-col h-full">
              <ul className="text-sm list-disc ml-5 text-slate-700 space-y-1">
                <li>Transcription + mots-clés + priorités</li>
                <li>Cartographie multi-intelligences</li>
                <li>PDF auto-généré avec graphiques</li>
              </ul>
              <div className="mt-auto">
                <Button asChild className="w-full rounded-xl bg-slate-700 text-white hover:bg-slate-800">
                  <a href="https://github.com/GLortet/InnerShift" target="_blank" rel="noopener noreferrer">
                    Rejoindre la beta
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
// ========================
// FAQ
// ========================
function FAQ() {
  const rows = [
    { q: "Pourquoi trois piliers ?", a: "Parce que corps, langage et décision sont indissociables dans le réel. Bouger sans langage, c'est fragile. Parler sans corps, c'est désincarné. Décider sans feedback, c'est aléatoire." },
    { q: "Tu es déjà certifié formateur PCM ?", a: "Certification formateur PCM planifiée pour 2026 (parcours en cours). J'accompagne déjà équipes et sportifs avec les fondamentaux et des exercices concrets." },
    { q: "InnerShift est-il disponible ?", a: "Le projet est en cours de développement. InnerShift vise à créer une IA miroir capable d’analyser des échanges et de restituer des insights actionnables. Aujourd’hui, je conçois et teste les modules étape par étape : analyse de texte, génération de PDF, et bientôt l’analyse vocale." },
    { q: "Peut-on déployer Circuit Vital en entreprise ?", a: "Oui : pack licences + posters + atelier de démarrage. Intégration possible aux rituels QVT et sécurité." },
  ];
  return (
    <section id="faq" className="mx-auto max-w-6xl px-4 py-14">
      <h3 className="text-2xl md:text-3xl font-semibold tracking-tight text-slate-900">Questions fréquentes</h3>
      <div className="mt-6 grid md:grid-cols-2 gap-6">
        {rows.map((r, i) => (
          <Card key={i} className="rounded-2xl bg-white shadow border border-slate-200">
            <CardHeader>
              <CardTitle className="text-lg text-slate-900">{r.q}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-700">{r.a}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

// ========================
// CTA / Newsletter (backend Flask /subscribe)
// ========================
function CTA() {
  const emailRef = useRef<HTMLInputElement>(null);
  const [status, setStatus] = useState<'idle'|'loading'|'success'|'error'>('idle');
  const [msg, setMsg] = useState<string>('');

  const handleSubscribe = async () => {
    const email = emailRef.current?.value.trim();
    if (!email) { setStatus('error'); setMsg('Merci de renseigner un email valide.'); return; }
    setStatus('loading');
    try {
      const fd = new FormData();
      fd.append('email', email);
      const res = await fetch('/subscribe', { method: 'POST', body: fd });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data?.ok) {
        setStatus('success');
        setMsg(data.msg || "Merci ! C'est bien reçu.");
        if (emailRef.current) emailRef.current.value = '';
      } else {
        setStatus('error');
        setMsg(data?.msg || "Oups, une erreur est survenue. Réessaie dans un instant.");
      }
    } catch {
      setStatus('error');
      setMsg("Erreur réseau. Tu peux m'écrire directement : gilles.lortet@circuitvital.com");
    }
  };

  return (
    <section id="contact" className="mx-auto max-w-6xl px-4 py-14">
      <div className="rounded-3xl border border-slate-200 bg-white shadow p-8 md:p-12">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h3 className="text-2xl md:text-3xl font-semibold tracking-tight text-slate-900">Restons connectés</h3>
            <p className="mt-2 text-slate-700">Reçois mes retours d'expérience (Lean, PCM, IA, sport) et des ressources concrètes pour progresser chaque semaine.</p>
            <div aria-live="polite" className="mt-4 min-h-[1.5rem]">
              {status === 'success' && (<div className="rounded-lg border border-emerald-300 bg-emerald-50 text-emerald-800 px-3 py-2 text-sm">{msg}</div>)}
              {status === 'error' && (<div className="rounded-lg border border-rose-300 bg-rose-50 text-rose-800 px-3 py-2 text-sm">{msg}</div>)}
            </div>
          </div>

          <form
            id="newsletter"
            className="flex gap-3 w-full"
            action="/subscribe"
            method="POST"
            onSubmit={(e)=>{ e.preventDefault(); handleSubscribe(); }}
            noValidate
          >
            <input
              ref={emailRef}
              type="email"
              name="email"
              required
              placeholder="ton.email@exemple.com"
              className="flex-1 rounded-xl border border-slate-300 bg-white px-4 text-slate-900 placeholder:text-slate-400"
            />
            {/* honeypot simple */}
            <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" className="hidden" />
            <Button type="submit" disabled={status==='loading'} className="rounded-xl bg-slate-800 text-white hover:bg-slate-900 disabled:opacity-60 disabled:cursor-not-allowed">
              {status==='loading' ? 'Envoi…' : "S'abonner"}
            </Button>
          </form>

          <div className="mt-3 text-xs text-slate-500">
            Problème d’envoi ? <a className="underline" href="mailto:gilles.lortet@circuitvital.com?subject=Newsletter%20%2F%20Contact">Écris-moi directement</a>.
          </div>
        </div>
      </div>
    </section>
  );
}

// ========================
// Legal / Mentions & RGPD basics
// ========================
function Legal() {
  return (
    <section id="legal" className="mx-auto max-w-6xl px-4 py-10">
      <div className="rounded-3xl bg-white/90 backdrop-blur border border-slate-200 p-6 md:p-10">
        <h3 className="text-xl md:text-2xl font-semibold tracking-tight text-slate-900">Mentions légales & RGPD</h3>
        <div className="mt-4 grid md:grid-cols-2 gap-6 text-sm text-slate-700">
          <div>
            <h4 className="font-semibold text-slate-900">Éditeur</h4>
            <p>Gilles Lortet — {new Date().getFullYear()}</p>
            <p>Contact : <a className="underline" href="mailto:gilles.lortet@circuitvital.com">gilles.lortet@circuitvital.com</a></p>
          </div>
          <div>
            <h4 className="font-semibold text-slate-900">Données personnelles</h4>
            <ul className="list-disc ml-5 space-y-1">
              <li>Finalité : newsletter et prise de rendez-vous.</li>
              <li>Base légale : consentement (art. 6.1.a RGPD).</li>
              <li>Durée : 24 mois maximum sans activité.</li>
              <li>Droits : accès, rectification, effacement, opposition (<a className="underline" href="mailto:gilles.lortet@circuitvital.com">me contacter</a>).</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-slate-900">Cookies & services tiers</h4>
            <p>Nous n'utilisons pas d'analytics. Des cookies peuvent être déposés par YouTube et Calendly lors de l'activation des contenus.</p>
            <p className="mt-2">Changer mon choix :
              <button onClick={() => { localStorage.removeItem('site_consent'); window.location.reload(); }} className="ml-2 underline">Réinitialiser mon consentement</button>
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-slate-900">Hébergement</h4>
            <p>PythonAnywhere — Royaume-Uni. Sauvegardes et sécurité gérées par l'hébergeur.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ========================
// Footer (compact, one line)
// ========================
function Footer() {
  return (
    <footer className="mx-auto max-w-6xl px-4 pb-10">
      <div className="mt-10 rounded-2xl bg-white/80 backdrop-blur border border-slate-200 py-3 px-4 text-xs text-slate-600 text-center flex flex-col md:flex-row md:justify-center md:items-center gap-1 md:gap-4">
        <span>© {new Date().getFullYear()} Gilles Lortet — Tous droits réservés.</span>
        <span className="hidden md:inline">•</span>
        <a href="https://www.linkedin.com/in/gilles-lortet/" target="_blank" rel="noreferrer" className="hover:text-slate-900 flex items-center justify-center gap-1">
          <Linkedin size={14} />
          <span>LinkedIn</span>
        </a>
        <span className="hidden md:inline">•</span>
        <a href="https://x.com/GillesLortet" target="_blank" rel="noreferrer" className="hover:text-slate-900 flex items-center justify-center gap-1">
          <X size={14} />
          <span>X</span>
        </a>
        <span className="hidden md:inline">•</span>
        <a href="mailto:gilles.lortet@circuitvital.com" className="hover:text-slate-900">Email</a>
        <span className="hidden md:inline">•</span>
        <a href="#legal" className="hover:text-slate-900">Mentions légales</a>
      </div>
    </footer>
  );
}

