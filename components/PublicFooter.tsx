import Link from "next/link";

interface PublicFooterProps {
  locale: "en" | "pt";
}

const t = {
  en: {
    encrypted: "Encrypted data · GDPR / LGPD ready · No third‑party ad trackers",
    terms: "Terms of Service",
    privacy: "Privacy Policy",
    blog: "Blog",
    apiDocs: "API Docs",
    features: "Features",
    integrations: "Integrations",
    faq: "FAQ",
    compare: "Compare",
    changelog: "Changelog",
    pricing: "Pricing",
    locations: "Locations",
    press: "Press",
    about: "About",
    security: "Security",
    contact: "Contact",
    email: "Email",
    builtWith: "Proudly built with",
    copyright: "All rights reserved.",
  },
  pt: {
    encrypted: "Dados criptografados · GDPR / LGPD prontos · Sem rastreadores de anúncios",
    terms: "Termos de Serviço",
    privacy: "Política de Privacidade",
    blog: "Blog",
    apiDocs: "Documentação API",
    features: "Funcionalidades",
    integrations: "Integrações",
    faq: "FAQ",
    compare: "Comparar",
    changelog: "Registro de Alterações",
    pricing: "Preços",
    locations: "Locais",
    press: "Imprensa",
    about: "Sobre",
    security: "Segurança",
    contact: "Contato",
    email: "E-mail",
    builtWith: "Desenvolvido com",
    copyright: "Todos os direitos reservados.",
  },
};

export default function PublicFooter({ locale }: PublicFooterProps) {
  const copy = t[locale];

  return (
    <footer className="bg-black/20 border-t border-white/5 text-slate-400 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center text-xs text-slate-500">
          {copy.encrypted}
        </div>

        <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm">
          <Link href="/terms" className="hover:text-white transition-colors duration-150">{copy.terms}</Link>
          <Link href="/privacy" className="hover:text-white transition-colors duration-150">{copy.privacy}</Link>
          <Link href="/blog" className="hover:text-white transition-colors duration-150">{copy.blog}</Link>
          <Link href="/docs" className="hover:text-white transition-colors duration-150">{copy.apiDocs}</Link>
          <Link href="/features" className="hover:text-white transition-colors duration-150">{copy.features}</Link>
          <Link href="/integrations" className="hover:text-white transition-colors duration-150">{copy.integrations}</Link>
          <Link href="/faq" className="text-sky-400 hover:text-sky-300 transition-colors duration-150 inline-flex items-center gap-1">
            <span className="text-lg leading-none">?</span> {copy.faq}
          </Link>
          <Link href="/compare" className="hover:text-white transition-colors duration-150">{copy.compare}</Link>
          <Link href="/changelog" className="hover:text-white transition-colors duration-150">{copy.changelog}</Link>
          <Link href="/pricing" className="hover:text-white transition-colors duration-150">{copy.pricing}</Link>
          <Link href="/locations" className="hover:text-white transition-colors duration-150">{copy.locations}</Link>
          <Link href="/press" className="hover:text-white transition-colors duration-150">{copy.press}</Link>
          <a
            href="https://x.com/sitesafehq"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors duration-150"
            aria-label="SiteSafe on X"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>
          <a
            href="https://linkedin.com/company/sitesafe-smart-visitor-management"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors duration-150"
            aria-label="SiteSafe on LinkedIn"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </a>
          <Link href="/about" className="hover:text-white transition-colors duration-150">{copy.about}</Link>
          <Link href="/security" className="hover:text-white transition-colors duration-150">{copy.security}</Link>
          <Link href="/contact" className="hover:text-white transition-colors duration-150">{copy.contact}</Link>
          <a
            href="mailto:hello@sitesafe.thesift.space"
            className="hover:text-white transition-colors duration-150"
          >
            {copy.email}
          </a>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-xs text-slate-500">
          <span>{copy.builtWith}</span>
          <div className="flex items-center gap-3">
            <span className="bg-white/10 px-2 py-0.5 rounded">Neon</span>
            <span className="bg-white/10 px-2 py-0.5 rounded">Vercel</span>
            <span className="bg-white/10 px-2 py-0.5 rounded">Brevo</span>
            <span className="bg-white/10 px-2 py-0.5 rounded">Upstash</span>
          </div>
        </div>

        <div className="text-sm text-center">
          &copy; {new Date().getFullYear()} SiteSafe. {copy.copyright}
        </div>
      </div>
    </footer>
  );
}