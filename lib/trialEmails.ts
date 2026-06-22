// lib/trialEmails.ts
export function welcomeEmailHtml(companyName: string): string {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #1e293b; border-radius: 12px; padding: 30px; color: #e2e8f0;">
      <h2 style="color: #38bdf8;">Welcome to SiteSafe, ${companyName}!</h2>
      <p>Your 14‑day free trial has started. You can now:</p>
      <ul>
        <li>Create your first site in under 2 minutes</li>
        <li>Share your unique QR code for touchless check‑in</li>
        <li>Invite hosts and start tracking visitors</li>
      </ul>
      <p style="text-align: center; margin: 30px 0;">
        <a href="https://sitesafe.thesift.space/dashboard" style="background: #0ea5e9; color: #ffffff; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold;">Go to your dashboard</a>
      </p>
      <p style="font-size: 12px; color: #64748b;">No credit card required. Cancel anytime.</p>
    </div>`;
}

export function midTrialEmailHtml(companyName: string): string {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #1e293b; border-radius: 12px; padding: 30px; color: #e2e8f0;">
      <h2 style="color: #38bdf8;">How's your trial going, ${companyName}?</h2>
      <p>You're one week into your 14‑day trial. Here are a few things you might have missed:</p>
      <ul>
        <li>📋 Set up <strong>pre‑screening questions</strong> for your visitors</li>
        <li>🛡️ Activate <strong>watchlist screening</strong> for extra security</li>
        <li>📊 Export your visitor logs as PDF for audits</li>
      </ul>
      <p style="text-align: center; margin: 30px 0;">
        <a href="https://sitesafe.thesift.space/dashboard" style="background: #0ea5e9; color: #ffffff; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold;">Manage your sites</a>
      </p>
      <p style="font-size: 12px; color: #64748b;">Questions? Reply to this email — I answer personally.</p>
    </div>`;
}

export function finalTrialEmailHtml(companyName: string): string {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #1e293b; border-radius: 12px; padding: 30px; color: #e2e8f0;">
      <h2 style="color: #38bdf8;">Your trial ends tomorrow</h2>
      <p>Hi ${companyName}, your free SiteSafe trial expires in 24 hours. To keep your visitor logs, dashboard, and compliance features active, subscribe now.</p>
      <p style="text-align: center; margin: 30px 0;">
        <a href="https://sitesafe.thesift.space/settings" style="background: #0ea5e9; color: #ffffff; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold;">Subscribe now — $49/mo</a>
      </p>
      <p style="font-size: 12px; color: #64748b;">Flat pricing. No per‑site fees. Cancel anytime.</p>
    </div>`;
}