import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import type { SiteContent } from "@/lib/content";
import Logo from "./Logo";

function SocialIcon({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <a
      href="#"
      aria-label={label}
      className="grid h-9 w-9 place-items-center rounded-full border border-slate-200 text-slate-600 transition hover:border-violet-400 hover:bg-violet-600 hover:text-white"
    >
      {children}
    </a>
  );
}

export default function Footer({
  identite,
  footer,
  contact,
}: {
  identite: SiteContent["identite"];
  footer: SiteContent["footer"];
  contact: SiteContent["contact"];
}) {
  return (
    <footer id="contact" className="border-t border-slate-100 bg-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr_1.3fr]">
        {/* Marque */}
        <div>
          <Link href="/" className="flex items-center gap-2.5">
            <Logo className="h-10 w-[52px]" src={identite.logo} />
            <p className="text-xl font-extrabold tracking-tight">
              <span className="text-slate-900">{identite.nomPartie1}</span>{" "}
              <span className="bg-gradient-to-r from-fuchsia-600 to-red-500 bg-clip-text text-transparent">
                {identite.nomPartie2}
              </span>
            </p>
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-500">
            {footer.description}
          </p>
          <div className="mt-5 flex gap-2.5">
            <SocialIcon label="Facebook">
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
                <path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.24.2 2.24.2v2.46H15.2c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.45 2.89h-2.33v6.99A10 10 0 0 0 22 12Z" />
              </svg>
            </SocialIcon>
            <SocialIcon label="Instagram">
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" stroke="none" />
              </svg>
            </SocialIcon>
            <SocialIcon label="TikTok">
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
                <path d="M16.6 5.82A4.28 4.28 0 0 1 15.54 3h-3.09v12.4a2.59 2.59 0 1 1-2.59-2.59c.27 0 .53.04.78.12v-3.15a5.74 5.74 0 1 0 4.96 5.69V9.01a7.35 7.35 0 0 0 4.3 1.38V7.3a4.28 4.28 0 0 1-3.3-1.48Z" />
              </svg>
            </SocialIcon>
            <SocialIcon label="WhatsApp">
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
                <path d="M12.04 2a9.94 9.94 0 0 0-8.6 14.93L2 22l5.2-1.36A9.94 9.94 0 1 0 12.04 2Zm0 18.13a8.15 8.15 0 0 1-4.16-1.14l-.3-.18-3.08.81.82-3.01-.2-.31a8.18 8.18 0 1 1 6.92 3.83Zm4.49-6.13c-.25-.12-1.46-.72-1.68-.8-.23-.09-.39-.13-.56.12-.16.25-.64.8-.78.97-.14.16-.29.18-.53.06-.25-.12-1.04-.38-1.98-1.22a7.42 7.42 0 0 1-1.37-1.7c-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.12-.15.16-.25.25-.42.08-.16.04-.31-.02-.43-.06-.12-.55-1.34-.76-1.83-.2-.48-.4-.42-.56-.42h-.47c-.17 0-.43.06-.66.31-.22.25-.86.84-.86 2.05 0 1.22.88 2.39 1 2.55.13.17 1.74 2.65 4.2 3.72.59.25 1.05.4 1.4.52.6.19 1.13.16 1.56.1.47-.07 1.46-.6 1.66-1.17.21-.58.21-1.07.15-1.17-.06-.11-.23-.17-.47-.29Z" />
              </svg>
            </SocialIcon>
          </div>
        </div>

        {/* Colonnes de liens */}
        {footer.colonnes.map((col) => (
          <div key={col.titre}>
            <p className="text-sm font-bold text-slate-900">{col.titre}</p>
            <ul className="mt-4 space-y-2.5">
              {col.liens.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.lien || "#"}
                    className="text-sm text-slate-500 transition hover:text-violet-600"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Contact */}
        <div>
          <p className="text-sm font-bold text-slate-900">Contact</p>
          <ul className="mt-4 space-y-3">
            <li className="flex items-center gap-2.5 text-sm text-slate-500">
              <Phone className="h-4 w-4 shrink-0 text-violet-600" />
              {contact.telephone}
            </li>
            <li className="flex items-center gap-2.5 text-sm text-slate-500">
              <Mail className="h-4 w-4 shrink-0 text-violet-600" />
              {contact.email}
            </li>
            <li className="flex items-center gap-2.5 text-sm text-slate-500">
              <MapPin className="h-4 w-4 shrink-0 text-violet-600" />
              {contact.adresse}
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-slate-100 py-5">
        <p className="text-center text-xs text-slate-400">{footer.copyright}</p>
      </div>
    </footer>
  );
}
