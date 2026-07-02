// lib/email.ts

// ── Translation dictionary ──────────────────────────────────────────
const t = {
  en: {
    // Password reset
    resetSubject: "Reset your SiteSafe password",
    resetHeading: "Reset your password",
    resetBody: "You requested a password reset for your SiteSafe account.",
    resetCta: "Reset password",
    resetExpires: "This link expires in 1 hour.",
    resetIgnore: "If you didn't request this, please ignore this email.",

    // Welcome
    welcomeSubject: "Welcome to SiteSafe — your 14-day trial starts now",
    welcomeHeading: "You're in. Let's get your first site set up.",
    welcomeBody:
      "Your 14-day free trial is active. No credit card required. Set up your first location in under 3 minutes.",
    welcomeCta: "Go to Dashboard",
    welcomeTip:
      "Tip: Print the QR code and tape it to your gate. Visitors scan, read the safety briefing, and check in automatically.",

    // Invite
    inviteSubject: "You've been invited to join {company} on SiteSafe",
    inviteHeading: "Join your team on SiteSafe",
    inviteBody:
      "{inviter} invited you to join {company} on SiteSafe. Accept the invitation to start managing visitor access.",
    inviteCta: "Accept invitation",

    // Password change notification
    passwordChangeSubject: "Your SiteSafe password was changed",
    passwordChangeHeading: "Password changed",
    passwordChangeBody:
      "Your SiteSafe password was just changed. If you made this change, no further action is required.",
    passwordChangeWarning:
      "If you did NOT change your password, reset it immediately:",
    passwordChangeCta: "Reset password",

    // Generic footer
    footer: "SiteSafe — Visitor management for multi-location teams",
    footerUnsubscribe: "You received this because you have a SiteSafe account.",
  },

  pt: {
    // Password reset
    resetSubject: "Redefina sua senha do SiteSafe",
    resetHeading: "Redefinir senha",
    resetBody: "Voce solicitou a redefinicao de senha da sua conta SiteSafe.",
    resetCta: "Redefinir senha",
    resetExpires: "Este link expira em 1 hora.",
    resetIgnore: "Se voce nao solicitou isso, ignore este e-mail.",

    // Welcome
    welcomeSubject: "Bem-vindo ao SiteSafe — seu teste de 14 dias comeca agora",
    welcomeHeading: "Voce esta dentro. Vamos configurar seu primeiro local.",
    welcomeBody:
      "Seu teste gratis de 14 dias esta ativo. Sem cartao de credito. Configure seu primeiro local em menos de 3 minutos.",
    welcomeCta: "Acessar Painel",
    welcomeTip:
      "Dica: Imprima o QR code e cole na portaria. Visitantes escaneiam, leem o briefing de seguranca e fazem check-in automaticamente.",

    // Invite
    inviteSubject: "Voce foi convidado para {company} no SiteSafe",
    inviteHeading: "Entre para o time no SiteSafe",
    inviteBody:
      "{inviter} convidou voce para {company} no SiteSafe. Aceite o convite para comecar a gerenciar acesso de visitantes.",
    inviteCta: "Aceitar convite",

    // Password change notification
    passwordChangeSubject: "Sua senha do SiteSafe foi alterada",
    passwordChangeHeading: "Senha alterada",
    passwordChangeBody:
      "Sua senha do SiteSafe foi alterada agora. Se voce fez essa mudanca, nenhuma acao e necessaria.",
    passwordChangeWarning:
      "Se voce NAO alterou sua senha, redefina imediatamente:",
    passwordChangeCta: "Redefinir senha",

    // Generic footer
    footer: "SiteSafe — Controle de visitantes para equipes multi-local",
    footerUnsubscribe: "Voce recebeu isso porque tem uma conta SiteSafe.",
  },
};

// ── HTML email wrapper ──────────────────────────────────────────────
function wrapHtml(
  locale: "en" | "pt",
  content: { heading: string; body: string; cta?: { text: string; url: string }; tip?: string }
): string {
  const copy = t[locale];

  const ctaBlock = content.cta
    ? `
    <div style="margin: 28px 0;">
      <a href="${content.cta.url}" style="display:inline-block;padding:14px 28px;background:#0ea5e9;color:#fff;text-decoration:none;border-radius:8px;font-weight:600;font-size:15px;">
        ${content.cta.text}
      </a>
    </div>`
    : "";

  const tipBlock = content.tip
    ? `
    <div style="margin-top:24px;padding:16px;border-left:3px solid #0ea5e9;background:#0f172a;border-radius:0 8px 8px 0;">
      <p style="margin:0;color:#94a3b8;font-size:13px;line-height:1.6;">${content.tip}</p>
    </div>`
    : "";

  return `<!DOCTYPE html>
<html lang="${locale}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${content.heading}</title>
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
              <h1 style="margin:0 0 16px;color:#fff;font-size:22px;font-weight:700;line-height:1.3;letter-spacing:-0.01em;">
                ${content.heading}
              </h1>
              <p style="margin:0 0 20px;color:#cbd5e1;font-size:15px;line-height:1.6;">
                ${content.body}
              </p>
              ${ctaBlock}
              ${tipBlock}
            </td>
          </tr>
          <tr>
            <td style="padding:0 32px 32px;">
              <div style="border-top:1px solid #1e293b;padding-top:20px;">
                <p style="margin:0 0 6px;color:#64748b;font-size:12px;line-height:1.5;">
                  ${copy.footer}
                </p>
                <p style="margin:0;color:#475569;font-size:11px;line-height:1.5;">
                  ${copy.footerUnsubscribe}
                </p>
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

// ── Generic sender (Brevo) ─────────────────────────────────────────
async function sendBrevo({
  to,
  subject,
  htmlContent,
}: {
  to: string;
  subject: string;
  htmlContent: string;
}) {
  if (!process.env.BREVO_API_KEY) {
    console.log(`📧 Email to ${to} (no provider): ${subject}`);
    return;
  }

  const response = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      "api-key": process.env.BREVO_API_KEY,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      sender: {
        name: "SiteSafe",
        email: process.env.BREVO_SENDER_EMAIL || "noreply@sitesafe.space",
      },
      to: [{ email: to }],
      subject,
      htmlContent,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    console.error("Brevo email error:", error);
    throw new Error("Failed to send email");
  }
}

// ── Public API ──────────────────────────────────────────────────────

export async function sendPasswordResetEmail(
  email: string,
  resetUrl: string,
  locale: "en" | "pt" = "en"
) {
  const copy = t[locale];
  await sendBrevo({
    to: email,
    subject: copy.resetSubject,
    htmlContent: wrapHtml(locale, {
      heading: copy.resetHeading,
      body: copy.resetBody,
      cta: { text: copy.resetCta, url: resetUrl },
      tip: copy.resetExpires + " " + copy.resetIgnore,
    }),
  });
}

export async function sendWelcomeEmail(
  email: string,
  dashboardUrl: string,
  locale: "en" | "pt" = "en"
) {
  const copy = t[locale];
  await sendBrevo({
    to: email,
    subject: copy.welcomeSubject,
    htmlContent: wrapHtml(locale, {
      heading: copy.welcomeHeading,
      body: copy.welcomeBody,
      cta: { text: copy.welcomeCta, url: dashboardUrl },
      tip: copy.welcomeTip,
    }),
  });
}

export async function sendInviteEmail(
  email: string,
  inviteUrl: string,
  companyName: string,
  inviterName: string,
  locale: "en" | "pt" = "en"
) {
  const copy = t[locale];
  const body = copy.inviteBody
    .replace("{inviter}", inviterName)
    .replace("{company}", companyName);
  await sendBrevo({
    to: email,
    subject: copy.inviteSubject.replace("{company}", companyName),
    htmlContent: wrapHtml(locale, {
      heading: copy.inviteHeading,
      body,
      cta: { text: copy.inviteCta, url: inviteUrl },
    }),
  });
}

export async function sendPasswordChangeEmail(
  email: string,
  resetUrl: string,
  locale: "en" | "pt" = "en"
) {
  const copy = t[locale];
  await sendBrevo({
    to: email,
    subject: copy.passwordChangeSubject,
    htmlContent: wrapHtml(locale, {
      heading: copy.passwordChangeHeading,
      body: copy.passwordChangeBody,
      cta: { text: copy.passwordChangeCta, url: resetUrl },
      tip: copy.passwordChangeWarning,
    }),
  });
}

export async function sendEmail({
  to,
  subject,
  htmlContent,
}: {
  to: string;
  subject: string;
  htmlContent: string;
}) {
  await sendBrevo({ to, subject, htmlContent });
}