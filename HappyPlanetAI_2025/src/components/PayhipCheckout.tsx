import { useEffect } from "react";
import type { ReactNode } from "react";

type Props = {
  href: string;                         // lien Payhip (produit/checkout)
  productId?: string;                   // optionnel si tu veux le vrai modal Payhip
  label: ReactNode;                     // texte ou JSX
  className?: string;                   // util classes (w-full, mt-auto, etc.)
  mode?: "modal" | "redirect";          // tolère mode="modal" dans tes appels
};

const BASE_BTN =
  "inline-flex items-center justify-center rounded-2xl " +
  "bg-emerald-600 px-5 py-3 text-white font-semibold shadow-sm " +
  "hover:bg-emerald-700 hover:scale-[1.02] transition-transform duration-150 " +
  "focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 " +
  "disabled:opacity-50";

export function PayhipCheckout({
  href,
  productId,
  label,
  className,
  mode = "redirect",
}: Props) {
  // Si un jour tu veux le modal Payhip, décommente ce bloc :
  useEffect(() => {
    if (mode === "modal") {
      // const id = "payhip-js";
      // if (!document.getElementById(id)) {
      //   const s = document.createElement("script");
      //   s.src = "https://payhip.com/js/payhip.js";
      //   s.id = id;
      //   s.defer = true;
      //   document.body.appendChild(s);
      // }
    }
  }, [mode]);

  // En "redirect", on ouvre Payhip dans un nouvel onglet.
  // En "modal" sans script, ça reste un lien classique (pas grave pour le build).
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`payhip-buy-button ${BASE_BTN} ${className ?? ""}`}
      {...(productId ? { "data-product": productId } : {})}
    >
      {label}
    </a>
  );
}
