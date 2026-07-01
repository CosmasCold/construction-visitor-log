"use client";

import { useState, useEffect } from "react";
import { ArrowRight, X } from "lucide-react";

const t = {
  en: {
    skip: "Skip tutorial",
    back: "Back",
    next: "Next",
    finish: "Start using SiteSafe",
    progress: (current: number, total: number) => `${current} of ${total}`,
    steps: [
      {
        title: "Welcome to SiteSafe",
        description:
          "Let's quickly walk through your dashboard. You can skip this anytime.",
      },
      {
        title: "Your sites",
        description:
          "Each site gets its own QR code and a check-in link. Share the QR code at reception, or send the link to each floor, station, or device — it all goes to the same place.",
      },
      {
        title: "Watchlist / Blocklist",
        description:
          "Flag unwanted visitors. Blocked visitors are stopped at check-in and you're alerted instantly.",
      },
      {
        title: "Webhooks",
        description:
          "Send real-time events (check-in, check-out, blocklist hits) to your own tools.",
      },
      {
        title: "Analytics & Exports",
        description:
          "Use the toolbar at the top to export visitor logs as CSV, Excel, or PDF, and visit the Analytics page to see 30-day trend charts.",
      },
      {
        title: "Emergency Evacuation List",
        description:
          "Click the ⚠️ icon on any site card to instantly download a PDF of everyone currently on site — including photos and host names.",
      },
      {
        title: "Lockdown Mode",
        description:
          "Activate lockdown from the shield icon on a site card. It blocks all new check-ins and flags the site. One click to end it.",
      },
      {
        title: "Document Signing",
        description:
          "When editing a site, enable document signing to require visitors to sign an NDA or waiver right on the check-in screen.",
      },
      {
        title: "You're all set",
        description:
          "Create your first site, share the QR code or link, and start checking in visitors. No sales calls, no hidden fees.",
      },
    ],
  },
  pt: {
    skip: "Pular tutorial",
    back: "Voltar",
    next: "Próximo",
    finish: "Começar a usar a SiteSafe",
    progress: (current: number, total: number) => `${current} de ${total}`,
    steps: [
      {
        title: "Bem-vindo à SiteSafe",
        description:
          "Vamos fazer um tour rápido pelo seu painel. Você pode pular isso a qualquer momento.",
      },
      {
        title: "Seus locais",
        description:
          "Cada local recebe seu próprio QR code e link de check-in. Compartilhe o QR code na recepção ou envie o link para cada andar, estação ou dispositivo — tudo vai para o mesmo lugar.",
      },
      {
        title: "Lista de bloqueio / Watchlist",
        description:
          "Sinalize visitantes indesejados. Visitantes bloqueados são impedidos no check-in e você recebe alertas instantâneos.",
      },
      {
        title: "Webhooks",
        description:
          "Envie eventos em tempo real (check-in, check-out, detecções na lista de bloqueio) para suas próprias ferramentas.",
      },
      {
        title: "Análises & Exportações",
        description:
          "Use a barra de ferramentas no topo para exportar registros de visitantes como CSV, Excel ou PDF, e visite a página de Análises para ver gráficos de tendência de 30 dias.",
      },
      {
        title: "Lista de evacuação de emergência",
        description:
          "Clique no ícone ⚠️ em qualquer card de local para baixar instantaneamente um PDF de todos que estão no local — incluindo fotos e nomes dos anfitriões.",
      },
      {
        title: "Modo lockdown",
        description:
          "Ative o lockdown pelo ícone de escudo no card do local. Ele bloqueia todos os novos check-ins e sinaliza o local. Um clique para encerrar.",
      },
      {
        title: "Assinatura de documentos",
        description:
          "Ao editar um local, ative a assinatura de documentos para exigir que visitantes assinem um NDA ou termo diretamente na tela de check-in.",
      },
      {
        title: "Tudo pronto",
        description:
          "Crie seu primeiro local, compartilhe o QR code ou link e comece a registrar visitantes. Sem ligações de vendas, sem taxas ocultas.",
      },
    ],
  },
};

interface DashboardTutorialProps {
  locale?: "en" | "pt";
}

export default function DashboardTutorial({ locale = "en" }: DashboardTutorialProps) {
  const copy = t[locale];
  const [currentStep, setCurrentStep] = useState(0);
  const [visible, setVisible] = useState(false);

  const steps = copy.steps;
  const step = steps[currentStep];

  // Defer visibility check to an animation frame (asynchronous)
  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      const done = localStorage.getItem("sitesafe_tutorial_done");
      if (!done) setVisible(true);
    });
    return () => cancelAnimationFrame(raf);
  }, []);

  function dismiss() {
    localStorage.setItem("sitesafe_tutorial_done", "true");
    setVisible(false);
  }

  function next() {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      dismiss();
    }
  }

  function prev() {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  }

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-slate-900 border border-white/10 rounded-2xl p-8 max-w-md w-full shadow-2xl text-center relative">
        <button
          onClick={dismiss}
          className="absolute top-4 right-4 text-slate-400 hover:text-white"
          aria-label={locale === "pt" ? "Fechar tutorial" : "Close tutorial"}
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-4">
          <span className="text-xs text-slate-500">
            {copy.progress(currentStep + 1, steps.length)}
          </span>
        </div>

        <h3 className="text-xl font-semibold text-white mb-2">{step.title}</h3>
        <p className="text-sm text-slate-300 mb-6">{step.description}</p>

        <div className="flex justify-between items-center">
          <button
            onClick={currentStep === 0 ? dismiss : prev}
            className="text-xs text-slate-400 hover:text-white"
          >
            {currentStep === 0 ? copy.skip : copy.back}
          </button>
          <button
            onClick={next}
            className="inline-flex items-center gap-2 bg-sky-500 hover:bg-sky-600 text-white font-medium rounded-xl px-6 py-3 text-sm transition-colors"
          >
            {currentStep === steps.length - 1 ? copy.finish : copy.next}
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {currentStep > 0 && (
          <button
            onClick={dismiss}
            className="text-xs text-slate-400 hover:text-white block mx-auto mt-3"
          >
            {copy.skip}
          </button>
        )}
      </div>
    </div>
  );
}