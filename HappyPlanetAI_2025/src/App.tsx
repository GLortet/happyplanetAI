import { Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import CircuitVitalLanding from "@/pages/CircuitVitalLanding";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/circuit-vital" element={<CircuitVitalLanding />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

// ========================
// PAGE 404 OPTIONNELLE
// ========================
function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center p-8 bg-gradient-to-b from-[#243646] via-[#59756F] to-[#B8CBB2] text-slate-100">
      <h1 className="text-4xl font-bold mb-3">404 — Page non trouvée</h1>
      <p className="text-slate-300 mb-6">
        Cette page n’existe pas (encore) ou a été déplacée.
      </p>
      <a
        href="/"
        className="px-4 py-2 bg-white text-slate-900 rounded-xl font-medium hover:bg-slate-200"
      >
        Retour à l’accueil
      </a>
    </div>
  );
}
