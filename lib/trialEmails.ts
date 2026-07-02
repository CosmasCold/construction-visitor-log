// lib/trialEmails.ts
// Localized trial email HTML templates (day-0 welcome, day-7 mid-trial, day-14 final)

const t = {
  en: {
    welcome: {
      subject: "Welcome to SiteSafe — your 14-day trial starts now",
      title: (name: string) => `Welcome to SiteSafe, ${name}!`,
      intro: "Your 14-day free trial has started. You can now:",
      items: [
        "Create your first site in under 2 minutes",
        "Share your unique QR code for touchless check-in",
        "Invite hosts and start tracking visitors",
      ],
      cta: "Go to your dashboard",
      footer: "No credit card required. Cancel anytime.",
    },
    midTrial: {
      subject: "How's your trial going?",
      title: (name: string) => `How's your trial going, ${name}?`,
      intro: "You're one week into your 14-day trial. Here are a few things you might have missed:",
      items: [
        "Set up pre-screening questions for your visitors",
        "Activate watchlist screening for extra security",
        "Export your visitor logs as PDF for audits",
      ],
      cta: "Manage your sites",
      footer: "Questions? Reply to this email — I answer personally.",
    },
    finalTrial: {
      subject: "Your trial ends tomorrow",
      title: () => "Your trial ends tomorrow",
      intro: (name: string) => `Hi ${name}, your free SiteSafe trial expires in 24 hours. To keep your visitor logs, dashboard, and compliance features active, subscribe now.`,
      cta: "Subscribe now — $49/mo",
      footer: "Flat pricing. No per-site fees. Cancel anytime.",
    },
  },
  pt: {
    welcome: {
      subject: "Bem-vindo ao SiteSafe — seu teste de 14 dias comeca agora",
      title: (name: string) => `Bem-vindo ao SiteSafe, ${name}!`,
      intro: "Seu teste gratis de 14 dias comecou. Agora voce pode:",
      items: [
        "Criar seu primeiro local em menos de 2 minutos",
        "Compartilhar seu QR code para check-in sem contato",
        "Convidar anfitrioes e comecar a rastrear visitantes",
      ],
      cta: "Acessar painel",
      footer: "Sem cartao de credito. Cancele quando quiser.",
    },
    midTrial: {
      subject: "Como esta indo seu teste?",
      title: (name: string) => `Como esta indo seu teste, ${name}?`,
      intro: "Voce esta na metade do seu teste de 14 dias. Aqui estao algumas coisas que pode ter perdido:",
      items: [
        "Configurar perguntas de pre-triagem para visitantes",
        "Ativar triagem de lista de bloqueio para mais seguranca",
        "Exportar registros de visitantes em PDF para auditorias",
      ],
      cta: "Gerenciar locais",
      footer: "Duvidas? Responda este e-mail — eu respondo pessoalmente.",
    },
    finalTrial: {
      subject: "Seu teste acaba amanha",
      title: () => "Seu teste acaba amanha",
      intro: (name: string) => `Oi ${name}, seu teste gratis do SiteSafe expira em 24 horas. Para manter seus registros, painel e recursos de conformidade ativos, assine agora.`,
      cta: "Assinar agora — R$249/mes",
      footer: "Preco fixo. Sem taxa por local. Cancele quando quiser.",
    },
  },
};

function baseHtml(locale: "en" | "pt", inner: string): string {
  const footer =
    locale === "pt"
      ? "SiteSafe — Controle de visitantes para equipes multi-local"
      : "SiteSafe — Visitor management for multi-location teams";

  return `<!DOCTYPE html>
<html lang="${locale === "pt" ? "pt-BR" : "en"}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0;padding:0;background:#0a0f1c;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
    <tr>
      <td align="center" style="padding:40px 16px;">
        <table role="presentation" width="100%" max-width="520" cellpadding="0" cellspacing="0" border="0" style="max-width:520px;width:100%;background:#0f172a;border:1px solid #1e293b;border-radius:16px;overflow:hidden;">
          <tr>
            <td style="padding:32px 32px 0;">
              <div style="display:flex;align-items:center;gap:10px;">
                <div style="width:32px;height:32px;background:#0ea5e9;border-radius:6px;display:inline-flex;align-items:center;justify-content:center;">
                  <span style="color:#fff;font-size:18px;font-weight:700;">S</span>
                </div>
                <span style="color:#fff;font-size:18px;font-weight:700;letter-spacing:-0.02em;">SiteSafe</span>
              </div>
            </td>
          </tr>
          <tr>
            <td style="padding:28px 32px 32px;">
              ${inner}
            </td>
          </tr>
          <tr>
            <td style="padding:0 32px 32px;">
              <div style="border-top:1px solid #1e293b;padding-top:20px;">
                <p style="margin:0;color:#475569;font-size:11px;line-height:1.5;">${footer}</p>
              </div>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export function welcomeEmailHtml(companyName: string, locale: "en" | "pt" = "en"): string {
  const copy = t[locale].welcome;
  const items = copy.items
    .map((item) => `<li style="margin-bottom:8px;color:#cbd5e1;font-size:15px;line-height:1.6;">${item}</li>`)
    .join("");

  const inner = `
    <h1 style="margin:0 0 16px;color:#38bdf8;font-size:22px;font-weight:700;line-height:1.3;">${copy.title(companyName)}</h1>
    <p style="margin:0 0 16px;color:#cbd5e1;font-size:15px;line-height:1.6;">${copy.intro}</p>
    <ul style="margin:0 0 24px;padding-left:20px;color:#cbd5e1;">
      ${items}
    </ul>
    <div style="margin:28px 0;text-align:center;">
      <a href="https://sitesafe.thesift.space/dashboard" style="display:inline-block;padding:14px 28px;background:#0ea5e9;color:#fff;text-decoration:none;border-radius:8px;font-weight:600;font-size:15px;">${copy.cta}</a>
    </div>
    <p style="margin:0;color:#64748b;font-size:12px;">${copy.footer}</p>
  `;

  return baseHtml(locale, inner);
}

export function midTrialEmailHtml(companyName: string, locale: "en" | "pt" = "en"): string {
  const copy = t[locale].midTrial;
  const items = copy.items
    .map((item) => `<li style="margin-bottom:8px;color:#cbd5e1;font-size:15px;line-height:1.6;">${item}</li>`)
    .join("");

  const inner = `
    <h1 style="margin:0 0 16px;color:#38bdf8;font-size:22px;font-weight:700;line-height:1.3;">${copy.title(companyName)}</h1>
    <p style="margin:0 0 16px;color:#cbd5e1;font-size:15px;line-height:1.6;">${copy.intro}</p>
    <ul style="margin:0 0 24px;padding-left:20px;color:#cbd5e1;">
      ${items}
    </ul>
    <div style="margin:28px 0;text-align:center;">
      <a href="https://sitesafe.thesift.space/dashboard" style="display:inline-block;padding:14px 28px;background:#0ea5e9;color:#fff;text-decoration:none;border-radius:8px;font-weight:600;font-size:15px;">${copy.cta}</a>
    </div>
    <p style="margin:0;color:#64748b;font-size:12px;">${copy.footer}</p>
  `;

  return baseHtml(locale, inner);
}

export function finalTrialEmailHtml(companyName: string, locale: "en" | "pt" = "en"): string {
  const copy = t[locale].finalTrial;

  const inner = `
    <h1 style="margin:0 0 16px;color:#38bdf8;font-size:22px;font-weight:700;line-height:1.3;">${copy.title()}</h1>
    <p style="margin:0 0 24px;color:#cbd5e1;font-size:15px;line-height:1.6;">${copy.intro(companyName)}</p>
    <div style="margin:28px 0;text-align:center;">
      <a href="https://sitesafe.thesift.space/settings" style="display:inline-block;padding:14px 28px;background:#0ea5e9;color:#fff;text-decoration:none;border-radius:8px;font-weight:600;font-size:15px;">${copy.cta}</a>
    </div>
    <p style="margin:0;color:#64748b;font-size:12px;">${copy.footer}</p>
  `;

  return baseHtml(locale, inner);
}