"use client";

import { useState, useEffect, useMemo, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { logEvent } from "@/lib/analytics";
import Image from "next/image";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import {
  RefreshCw,
  FileSpreadsheet,
  FileText,
  FileDown,
  LogOut,
  Copy,
  Pencil,
  Trash2,
  Plus,
  X,
  Users,
  Building2,
  ClipboardList,
  CheckCircle2,
  XCircle,
  QrCode,
  DoorClosed,
  ShieldCheck,
  AlertTriangle,
  Zap,
  ShieldAlert,
  Clock,
  TrendingUp,
  ChevronDown,
  Lock,
  Download,
  BarChart3,
  MoreHorizontal,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Search,
  Filter,
  ChevronRight,
  ExternalLink,
  Eye,
  EyeOff,
  Printer,
  Camera,
  PenTool,
  MessageSquare,
  Key,
  BadgeCheck,
  Star,
  ArrowRight,
  ArrowLeft,
  Settings,
  Globe,
} from "lucide-react";
import Link from "next/link";
import ConfirmModal from "@/components/ConfirmModal";
import QRModal from "@/components/QRModal";
import DashboardTutorial from "@/components/DashboardTutorial";
import SkeletonTable from "@/components/SkeletonTable";
import { useToast } from "@/components/Toast";

/* ═══════════════════════════════════════════════════════════════
   PREMIUM DASHBOARD — CompanyDashboardClient
   Same logic, upgraded visuals
   ═══════════════════════════════════════════════════════════════ */

/* ─── Types ─── */
type Visitor = {
  id: string;
  fullName: string;
  company: string;
  phone: string | null;
  hostName: string | null;
  safetyAcknowledged: boolean;
  signedInAt: string;
  signedOutAt: string | null;
  siteName: string;
  siteId: string;
  answers?: Record<string, boolean> | null;
  photoUrl?: string | null;
  signatureUrl?: string | null;
};

type Site = {
  id: string;
  name: string;
  slug: string;
  address: string | null;
  safetyBriefingText: string;
  visitorsToday: number;
  questions?: string[] | null;
  documentSigningEnabled?: boolean;
  documentTemplateData?: string | null;
  lockdownEnabled?: boolean;
  showVisitorListOnCheckin?: boolean;
  locale?: string;
};

type Host = {
  id: string;
  name: string;
  email: string;
};

type ExpectedVisitor = {
  id: string;
  name: string;
  company: string;
};

type BlocklistEntry = {
  id: string;
  value: string;
  type: string;
  note?: string | null;
};

type Locale = "en" | "pt";

/* ─── Translations (unchanged) ─── */
const t: Record<Locale, Record<string, string>> = {
  en: {
    dashboard: "Dashboard",
    welcomeTitle: "Welcome to SiteSafe",
    welcomeDesc: "Start by renaming your first site or adding a new one below. Click {edit} next to your site to customize its name, safety briefing, and check-in settings.",
    edit: "Edit",
    activeNow: "Active now",
    onSite: "on site",
    todayVisitors: "Today's visitors",
    checkedIn: "checked in",
    avgVisit: "Avg. visit",
    minutes: "minutes",
    totalSites: "Total sites",
    locations: "locations",
    apply: "Apply",
    clear: "Clear",
    csv: "CSV",
    excel: "Excel",
    pdf: "PDF",
    newSite: "New Site",
    cancel: "Cancel",
    createSite: "Create Site",
    yourSites: "Your Sites",
    sitesOf: "of 20 sites",
    noSites: "No sites yet",
    noSitesDesc: "Create your first site to start checking in visitors.",
    siteName: "Site Name",
    slug: "URL Slug (e.g., main-office)",
    address: "Address (optional)",
    editSite: "Edit Site",
    basicInfo: "Basic Info",
    hosts: "Hosts",
    preScreening: "Pre-screening",
    docSigning: "Document Signing",
    privacy: "Privacy",
    saveChanges: "Save Changes",
    safetyBriefing: "Safety Briefing",
    checkinLanguage: "Check-in Language",
    checkinLanguageDesc: "Language shown to visitors during check-in",
    hostName: "Name",
    hostEmail: "Email",
    add: "Add",
    remove: "Remove",
    adding: "Adding...",
    questionPlaceholder: "e.g., Completed site induction?",
    requireDocSign: "Require visitors to sign a document before entry",
    templateUploaded: "Template uploaded",
    view: "View",
    removeTemplate: "Remove",
    showVisitorList: "Show visitor list on check-in page (disable for privacy)",
    copyUrl: "Copy URL",
    copied: "Check-in URL copied!",
    qrCode: "QR Code",
    emergencyList: "Emergency List",
    lockdown: "Lockdown",
    endLockdown: "End Lockdown",
    lockdownActive: "Lockdown Active",
    watchlist: "Watchlist / Blocklist",
    watchlistDesc: "Flag visitors by name, email, or phone. Alerts show at check-in.",
    nameEmailPhone: "Name, email, or phone",
    noteOptional: "Note (optional)",
    noEntries: "No entries yet. Add your first watchlist item above.",
    webhooks: "Webhooks",
    webhooksDesc: "Receive real-time JSON payloads for check-ins, check-outs, and blocklist hits.",
    webhookPlaceholder: "https://your-tool.com/webhook",
    save: "Save",
    testEvent: "Send test event",
    visitorLog: "Visitor Log",
    records: "records",
    photo: "Photo",
    visitor: "Visitor",
    site: "Site",
    host: "Host",
    time: "Time",
    status: "Status",
    safety: "Safety",
    preScreeningShort: "Pre-screening",
    signature: "Signature",
    actions: "Actions",
    noVisitors: "No visitors found",
    noVisitorsDesc: "Share the check-in link to get started",
    in: "In",
    out: "Out",
    completed: "Completed",
    onSiteStatus: "On site",
    ok: "OK",
    no: "No",
    answered: "answered",
    signOut: "Sign out",
    signOutRemote: "Sign out remotely",
    deleteSite: "Delete site",
    deleteSiteConfirm: "This will permanently delete the site and all its visitor records. This action cannot be undone.",
    delete: "Delete",
    logout: "Logout",
    refresh: "Refresh data",
    analytics: "Analytics",
    visitorSignedOut: "Visitor signed out",
    failedSignOut: "Failed to sign out visitor",
    siteCreated: "Site created",
    failedCreateSite: "Failed to create site",
    siteUpdated: "Site updated",
    failedUpdateSite: "Failed to update site",
    siteDeleted: "Site deleted",
    failedDeleteSite: "Failed to delete site",
    blocklistAdded: "Blocklist entry added",
    failedBlocklist: "Failed to add blocklist entry",
    entryRemoved: "Entry removed",
    webhookSaved: "Webhook saved",
    uploadFailed: "Upload failed",
    testEventSent: "Test event sent",
    lockdownActivated: "Lockdown activated",
    lockdownEnded: "Lockdown ended",
    english: "English",
    portuguese: "Português (Brazil)",
    settings: "Settings",
    search: "Search",
    filter: "Filter",
    export: "Export",
    print: "Print",
    close: "Close",
    confirm: "Confirm",
    areYouSure: "Are you sure?",
    thisActionCannotBeUndone: "This action cannot be undone.",
    yesContinue: "Yes, continue",
    nevermind: "Nevermind",
    loading: "Loading...",
    saving: "Saving...",
    creating: "Creating...",
    updating: "Updating...",
    deleting: "Deleting...",
    redirecting: "Redirecting...",
    copyLink: "Copy link",
    share: "Share",
    viewDetails: "View details",
    editDetails: "Edit details",
    manage: "Manage",
    back: "Back",
    next: "Next",
    previous: "Previous",
    submit: "Submit",
    done: "Done",
    success: "Success",
    error: "Error",
    warning: "Warning",
    info: "Info",
    optional: "optional",
    required: "required",
    enabled: "Enabled",
    disabled: "Disabled",
    active: "Active",
    inactive: "Inactive",
    pending: "Pending",
    trialing: "Trialing",
    trialEnded: "Trial ended",
    subscribed: "Subscribed",
    notSubscribed: "Not subscribed",
    billing: "Billing",
    plan: "Plan",
    subscription: "Subscription",
    trial: "Trial",
    freeTrial: "Free trial",
    daysRemaining: "days remaining",
    dayRemaining: "day remaining",
    upgrade: "Upgrade",
    downgrade: "Downgrade",
    changePlan: "Change plan",
    currentPlan: "Current plan",
    features: "Features",
    integrations: "Integrations",
    apiKey: "API Key",
    apiAccess: "API Access",
    generateKey: "Generate key",
    regenerateKey: "Regenerate key",
    keyCopied: "Key copied",
    slackWebhook: "Slack webhook",
    slackNotifications: "Slack notifications",
    testSlack: "Test Slack",
    password: "Password",
    changePassword: "Change password",
    currentPassword: "Current password",
    newPassword: "New password",
    confirmPassword: "Confirm new password",
    passwordUpdated: "Password updated",
    passwordMismatch: "Passwords do not match",
    passwordTooShort: "Password must be at least 8 characters",
    companyName: "Company name",
    companyEmail: "Company email",
    companySlug: "Company slug",
    account: "Account",
    profile: "Profile",
    security: "Security",
    notifications: "Notifications",
    language: "Language",
    selectLanguage: "Select language",
    dateRange: "Date range",
    from: "From",
    to: "To",
    today: "Today",
    yesterday: "Yesterday",
    last7Days: "Last 7 days",
    last30Days: "Last 30 days",
    thisMonth: "This month",
    lastMonth: "Last month",
    custom: "Custom",
    allSites: "All sites",
    allStatuses: "All statuses",
    signedInStatus: "Signed in",
    signedOutStatus: "Signed out",
    expectedVisitors: "Expected visitors",
    addExpectedVisitor: "Add expected visitor",
    expectedVisitorName: "Name",
    expectedVisitorCompany: "Company",
    expectedVisitorDate: "Expected date",
    removeExpectedVisitor: "Remove expected visitor",
    documentTemplate: "Document template",
    uploadTemplate: "Upload template",
    uploading: "Uploading...",
    replaceTemplate: "Replace template",
    noTemplate: "No template uploaded",
    preview: "Preview",
    download: "Download",
    emergency: "Emergency",
    emergencyContacts: "Emergency contacts",
    contactName: "Contact name",
    contactPhone: "Contact phone",
    contactRole: "Role",
    addContact: "Add contact",
    removeContact: "Remove contact",
    noContacts: "No emergency contacts added",
    lockdownDesc: "Prevent all new check-ins immediately. Existing visitors can still sign out.",
    lockdownConfirm: "Activate lockdown? This will prevent all new visitor check-ins.",
    endLockdownConfirm: "End lockdown? Visitors will be able to check in again.",
    lockdownBanner: "Lockdown is active. New check-ins are disabled.",
    blocklistEntryType: "Type",
    blocklistEntryValue: "Value",
    blocklistEntryNote: "Note",
    blocklistExactMatch: "Exact match",
    blocklistPartialMatch: "Partial match",
    blocklistTriggered: "Blocklist triggered",
    visitorBlocked: "Visitor blocked",
    blocklistAlert: "Blocklist alert",
    unblock: "Unblock",
    block: "Block",
    flagged: "Flagged",
    notFlagged: "Not flagged",
    checkInUrl: "Check-in URL",
    publicUrl: "Public URL",
    directLink: "Direct link",
    sendToPhone: "Send to phone",
    printQr: "Print QR code",
    downloadQr: "Download QR code",
    qrForSite: "QR code for",
    scanToCheckIn: "Scan to check in",
    poweredBy: "Powered by SiteSafe",
    terms: "Terms",
    help: "Help",
    support: "Support",
    contactUs: "Contact us",
    feedback: "Feedback",
    whatsNew: "What's new",
    changelog: "Changelog",
    version: "Version",
    logoutConfirm: "Are you sure you want to log out?",
    sessionExpired: "Your session has expired. Please sign in again.",
    unauthorized: "Unauthorized",
    forbidden: "Forbidden",
    notFound: "Not found",
    serverError: "Server error",
    tryAgain: "Try again",
    reload: "Reload",
    goBack: "Go back",
    goHome: "Go home",
    pageNotFound: "Page not found",
    pageNotFoundDesc: "The page you are looking for does not exist.",
    returnToDashboard: "Return to dashboard",
    maintenance: "Maintenance",
    maintenanceDesc: "We are performing scheduled maintenance. Please check back soon.",
    comingSoon: "Coming soon",
    featureComingSoon: "This feature is coming soon.",
    notifyMe: "Notify me",
    beta: "Beta",
    new: "New",
    updated: "Updated",
    improved: "Improved",
    fixed: "Fixed",
    removed: "Removed",
    deprecated: "Deprecated",
    experimental: "Experimental",
    phone: "Phone",
    sending: "Sending...",
  },
  pt: {
    dashboard: "Painel",
    welcomeTitle: "Bem-vindo à SiteSafe",
    welcomeDesc: "Comece renomeando seu primeiro local ou adicionando um novo abaixo. Clique em {edit} ao lado do seu local para personalizar o nome, briefing de segurança e configurações de check-in.",
    edit: "Editar",
    activeNow: "Ativos agora",
    onSite: "no local",
    todayVisitors: "Visitantes hoje",
    checkedIn: "registrados",
    avgVisit: "Média visita",
    minutes: "minutos",
    totalSites: "Total de locais",
    locations: "locais",
    apply: "Aplicar",
    clear: "Limpar",
    csv: "CSV",
    excel: "Excel",
    pdf: "PDF",
    newSite: "Novo Local",
    cancel: "Cancelar",
    createSite: "Criar Local",
    yourSites: "Seus Locais",
    sitesOf: "de 20 locais",
    noSites: "Nenhum local ainda",
    noSitesDesc: "Crie seu primeiro local para começar a registrar visitantes.",
    siteName: "Nome do Local",
    slug: "Slug da URL (ex: escritorio-principal)",
    address: "Endereço (opcional)",
    editSite: "Editar Local",
    basicInfo: "Informações Básicas",
    hosts: "Anfitriões",
    preScreening: "Pré-triagem",
    docSigning: "Assinatura de Documento",
    privacy: "Privacidade",
    saveChanges: "Salvar Alterações",
    safetyBriefing: "Briefing de Segurança",
    checkinLanguage: "Idioma do Check-in",
    checkinLanguageDesc: "Idioma exibido aos visitantes durante o check-in",
    hostName: "Nome",
    hostEmail: "E-mail",
    add: "Adicionar",
    remove: "Remover",
    adding: "Adicionando...",
    questionPlaceholder: "ex: Concluiu a indução do local?",
    requireDocSign: "Exigir que visitantes assinem um documento antes da entrada",
    templateUploaded: "Modelo enviado",
    view: "Ver",
    removeTemplate: "Remover",
    showVisitorList: "Mostrar lista de visitantes na página de check-in (desative para privacidade)",
    copyUrl: "Copiar URL",
    copied: "URL de check-in copiada!",
    qrCode: "QR Code",
    emergencyList: "Lista de Emergência",
    lockdown: "Lockdown",
    endLockdown: "Encerrar Lockdown",
    lockdownActive: "Lockdown Ativo",
    watchlist: "Lista de Observação / Bloqueio",
    watchlistDesc: "Sinalize visitantes por nome, e-mail ou telefone. Alertas aparecem no check-in.",
    nameEmailPhone: "Nome, e-mail ou telefone",
    noteOptional: "Nota (opcional)",
    noEntries: "Nenhuma entrada ainda. Adicione seu primeiro item acima.",
    webhooks: "Webhooks",
    webhooksDesc: "Receba payloads JSON em tempo real para check-ins, check-outs e alertas da lista de bloqueio.",
    webhookPlaceholder: "https://sua-ferramenta.com/webhook",
    save: "Salvar",
    testEvent: "Enviar evento de teste",
    visitorLog: "Registro de Visitantes",
    records: "registros",
    photo: "Foto",
    visitor: "Visitante",
    site: "Local",
    host: "Anfitrião",
    time: "Horário",
    status: "Status",
    safety: "Segurança",
    preScreeningShort: "Pré-triagem",
    signature: "Assinatura",
    actions: "Ações",
    noVisitors: "Nenhum visitante encontrado",
    noVisitorsDesc: "Compartilhe o link de check-in para começar",
    in: "Entrada",
    out: "Saída",
    completed: "Concluído",
    onSiteStatus: "No local",
    ok: "OK",
    no: "Não",
    answered: "respondidas",
    signOut: "Registrar saída",
    signOutRemote: "Registrar saída remotamente",
    deleteSite: "Excluir local",
    deleteSiteConfirm: "Isso excluirá permanentemente o local e todos os seus registros de visitantes. Esta ação não pode ser desfeita.",
    delete: "Excluir",
    logout: "Sair",
    refresh: "Atualizar dados",
    analytics: "Análises",
    visitorSignedOut: "Saída registrada",
    failedSignOut: "Falha ao registrar saída",
    siteCreated: "Local criado",
    failedCreateSite: "Falha ao criar local",
    siteUpdated: "Local atualizado",
    failedUpdateSite: "Falha ao atualizar local",
    siteDeleted: "Local excluído",
    failedDeleteSite: "Falha ao excluir local",
    blocklistAdded: "Entrada adicionada à lista",
    failedBlocklist: "Falha ao adicionar entrada",
    entryRemoved: "Entrada removida",
    webhookSaved: "Webhook salvo",
    uploadFailed: "Falha no envio",
    testEventSent: "Evento de teste enviado",
    lockdownActivated: "Lockdown ativado",
    lockdownEnded: "Lockdown encerrado",
    english: "English",
    portuguese: "Português (Brazil)",
    settings: "Configurações",
    search: "Buscar",
    filter: "Filtrar",
    export: "Exportar",
    print: "Imprimir",
    close: "Fechar",
    confirm: "Confirmar",
    areYouSure: "Tem certeza?",
    thisActionCannotBeUndone: "Esta ação não pode ser desfeita.",
    yesContinue: "Sim, continuar",
    nevermind: "Deixa pra lá",
    loading: "Carregando...",
    saving: "Salvando...",
    creating: "Criando...",
    updating: "Atualizando...",
    deleting: "Excluindo...",
    redirecting: "Redirecionando...",
    copyLink: "Copiar link",
    share: "Compartilhar",
    viewDetails: "Ver detalhes",
    editDetails: "Editar detalhes",
    manage: "Gerenciar",
    back: "Voltar",
    next: "Próximo",
    previous: "Anterior",
    submit: "Enviar",
    done: "Concluído",
    success: "Sucesso",
    error: "Erro",
    warning: "Aviso",
    info: "Informação",
    optional: "opcional",
    required: "obrigatório",
    enabled: "Ativado",
    disabled: "Desativado",
    active: "Ativo",
    inactive: "Inativo",
    pending: "Pendente",
    trialing: "Em teste",
    trialEnded: "Teste encerrado",
    subscribed: "Assinado",
    notSubscribed: "Não assinado",
    billing: "Faturamento",
    plan: "Plano",
    subscription: "Assinatura",
    trial: "Teste",
    freeTrial: "Teste grátis",
    daysRemaining: "dias restantes",
    dayRemaining: "dia restante",
    upgrade: "Upgrade",
    downgrade: "Downgrade",
    changePlan: "Mudar plano",
    currentPlan: "Plano atual",
    features: "Recursos",
    integrations: "Integrações",
    apiKey: "Chave API",
    apiAccess: "Acesso API",
    generateKey: "Gerar chave",
    regenerateKey: "Regenerar chave",
    keyCopied: "Chave copiada",
    slackWebhook: "Webhook Slack",
    slackNotifications: "Notificações Slack",
    testSlack: "Testar Slack",
    password: "Senha",
    changePassword: "Alterar senha",
    currentPassword: "Senha atual",
    newPassword: "Nova senha",
    confirmPassword: "Confirmar nova senha",
    passwordUpdated: "Senha atualizada",
    passwordMismatch: "As senhas não coincidem",
    passwordTooShort: "A senha deve ter pelo menos 8 caracteres",
    companyName: "Nome da empresa",
    companyEmail: "E-mail da empresa",
    companySlug: "Slug da empresa",
    account: "Conta",
    profile: "Perfil",
    security: "Segurança",
    notifications: "Notificações",
    language: "Idioma",
    selectLanguage: "Selecionar idioma",
    dateRange: "Período",
    from: "De",
    to: "Até",
    today: "Hoje",
    yesterday: "Ontem",
    last7Days: "Últimos 7 dias",
    last30Days: "Últimos 30 dias",
    thisMonth: "Este mês",
    lastMonth: "Mês passado",
    custom: "Personalizado",
    allSites: "Todos os locais",
    allStatuses: "Todos os status",
    signedInStatus: "Registrados",
    signedOutStatus: "Saíram",
    expectedVisitors: "Visitantes esperados",
    addExpectedVisitor: "Adicionar visitante esperado",
    expectedVisitorName: "Nome",
    expectedVisitorCompany: "Empresa",
    expectedVisitorDate: "Data esperada",
    removeExpectedVisitor: "Remover visitante esperado",
    documentTemplate: "Modelo de documento",
    uploadTemplate: "Enviar modelo",
    uploading: "Enviando...",
    replaceTemplate: "Substituir modelo",
    noTemplate: "Nenhum modelo enviado",
    preview: "Visualizar",
    download: "Baixar",
    emergency: "Emergência",
    emergencyContacts: "Contatos de emergência",
    contactName: "Nome do contato",
    contactPhone: "Telefone do contato",
    contactRole: "Função",
    addContact: "Adicionar contato",
    removeContact: "Remover contato",
    noContacts: "Nenhum contato de emergência adicionado",
    lockdownDesc: "Impedir todos os novos check-ins imediatamente. Visitantes existentes ainda podem registrar saída.",
    lockdownConfirm: "Ativar lockdown? Isso impedirá todos os novos check-ins de visitantes.",
    endLockdownConfirm: "Encerrar lockdown? Visitantes poderão fazer check-in novamente.",
    lockdownBanner: "Lockdown está ativo. Novos check-ins estão desabilitados.",
    blocklistEntryType: "Tipo",
    blocklistEntryValue: "Valor",
    blocklistEntryNote: "Nota",
    blocklistExactMatch: "Correspondência exata",
    blocklistPartialMatch: "Correspondência parcial",
    blocklistTriggered: "Lista de bloqueio acionada",
    visitorBlocked: "Visitante bloqueado",
    blocklistAlert: "Alerta de bloqueio",
    unblock: "Desbloquear",
    block: "Bloquear",
    flagged: "Sinalizado",
    notFlagged: "Não sinalizado",
    checkInUrl: "URL de check-in",
    publicUrl: "URL pública",
    directLink: "Link direto",
    sendToPhone: "Enviar para celular",
    printQr: "Imprimir QR code",
    downloadQr: "Baixar QR code",
    qrForSite: "QR code para",
    scanToCheckIn: "Escaneie para fazer check-in",
    poweredBy: "Powered by SiteSafe",
    terms: "Termos",
    help: "Ajuda",
    support: "Suporte",
    contactUs: "Fale conosco",
    feedback: "Feedback",
    whatsNew: "Novidades",
    changelog: "Registro de alterações",
    version: "Versão",
    logoutConfirm: "Tem certeza que deseja sair?",
    sessionExpired: "Sua sessão expirou. Por favor, entre novamente.",
    unauthorized: "Não autorizado",
    forbidden: "Acesso negado",
    notFound: "Não encontrado",
    serverError: "Erro no servidor",
    tryAgain: "Tentar novamente",
    reload: "Recarregar",
    goBack: "Voltar",
    goHome: "Ir para início",
    pageNotFound: "Página não encontrada",
    pageNotFoundDesc: "A página que você está procurando não existe.",
    returnToDashboard: "Voltar ao painel",
    maintenance: "Manutenção",
    maintenanceDesc: "Estamos realizando manutenção programada. Por favor, volte em breve.",
    comingSoon: "Em breve",
    featureComingSoon: "Este recurso estará disponível em breve.",
    notifyMe: "Me avise",
    beta: "Beta",
    new: "Novo",
    updated: "Atualizado",
    improved: "Melhorado",
    fixed: "Corrigido",
    removed: "Removido",
    deprecated: "Descontinuado",
    experimental: "Experimental",
    phone: "Telefone",
    sending: "Enviando...",
  },
};

/* ─── Premium Helper Components ─── */

function AmbientSpotlight() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 80, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 80, damping: 30 });

  useEffect(() => {
    const handle = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handle);
    return () => window.removeEventListener("mousemove", handle);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-0"
      style={{
        background: useTransform(
          [springX, springY],
          ([x, y]) =>
            `radial-gradient(600px circle at ${x}px ${y}px, rgba(14,165,233,0.06), transparent 40%)`
        ),
      }}
    />
  );
}

function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const handle = () => {
      const h = document.documentElement;
      setProgress(
        h.scrollTop / (h.scrollHeight - h.clientHeight)
      );
    };
    window.addEventListener("scroll", handle);
    return () => window.removeEventListener("scroll", handle);
  }, []);
  return (
    <div className="fixed top-0 left-0 right-0 z-[60] h-[2px] bg-white/5">
      <motion.div
        className="h-full bg-gradient-to-r from-sky-500 via-teal-400 to-emerald-400"
        style={{ width: `${progress * 100}%` }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      />
    </div>
  );
}

function NoiseOverlay() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-[1] opacity-[0.015]"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        backgroundRepeat: "repeat",
        backgroundSize: "256px 256px",
      }}
    />
  );
}

function TiltCard({
  children,
  className = "",
  glowColor = "rgba(14,165,233,0.15)",
}: {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(y, [0, 1], [8, -8]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [0, 1], [-8, 8]), { stiffness: 300, damping: 30 });
  const bgX = useSpring(useTransform(x, [0, 1], ["0%", "100%"]), { stiffness: 300, damping: 30 });
  const bgY = useSpring(useTransform(y, [0, 1], ["0%", "100%"]), { stiffness: 300, damping: 30 });

  const handleMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      x.set((e.clientX - rect.left) / rect.width);
      y.set((e.clientY - rect.top) / rect.height);
    },
    [x, y]
  );

  const handleLeave = useCallback(() => {
    x.set(0.5);
    y.set(0.5);
  }, [x, y]);

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d", perspective: 1000 }}
      className={`relative ${className}`}
    >
      <motion.div
        className="absolute inset-0 rounded-[inherit] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(300px circle at ${bgX} ${bgY}, ${glowColor}, transparent 60%)`,
        }}
      />
      {children}
    </motion.div>
  );
}

function MagneticButton({
  children,
  className = "",
  onClick,
  disabled,
  type,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 15 });
  const springY = useSpring(y, { stiffness: 150, damping: 15 });

  const handleMove = useCallback(
    (e: React.MouseEvent) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      x.set((e.clientX - cx) * 0.15);
      y.set((e.clientY - cy) * 0.15);
    },
    [x, y]
  );

  const handleLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ x: springX, y: springY }}
      className={className}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {children}
    </motion.button>
  );
}

function AnimatedCounter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    const start = 0;
    const end = value;
    const duration = 800;
    const startTime = performance.now();
    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(start + (end - start) * eased));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [value]);
  return <span>{display}{suffix}</span>;
}

function SectionReveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function GradientBorder({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`relative p-[1px] rounded-[inherit] overflow-hidden ${className}`}>
      <div className="absolute inset-0 rounded-[inherit] animate-spin-slow"
        style={{
          background: "conic-gradient(from 0deg, transparent 0%, rgba(14,165,233,0.4) 20%, rgba(20,184,166,0.4) 40%, transparent 60%)",
          animation: "spin 4s linear infinite",
        }}
      />
      <div className="relative rounded-[inherit] bg-[#0a0f1c]">{children}</div>
    </div>
  );
}

/* ─── Main Component ─── */
export default function CompanyDashboardClient({
  companyId,
  companySlug,
  companyName,
  logs,
  sites: initialSites,
  currentDateFrom,
  currentDateTo,
  locale = "en",
}: {
  companyId: string;
  companySlug: string;
  companyName: string;
  logs: Visitor[];
  sites: Site[];
  currentDateFrom?: string;
  currentDateTo?: string;
  locale?: Locale;
}) {
  const router = useRouter();
  const { addToast } = useToast();
  const copy = t[locale];
  const isPT = locale === "pt";

  /* ─── State ─── */
  const [sites, setSites] = useState(initialSites);
  const [selectedSite, setSelectedSite] = useState<Site | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [visitors, setVisitors] = useState<Visitor[]>(logs);
  const [loading, setLoading] = useState(false);
  const [dateFrom, setDateFrom] = useState(currentDateFrom || "");
  const [dateTo, setDateTo] = useState(currentDateTo || "");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "in" | "out">("all");
  const [siteFilter, setSiteFilter] = useState<string>("all");
  const [showLangMenu, setShowLangMenu] = useState(false);
  const langMenuRef = useRef<HTMLDivElement>(null);

  /* Create site modal */
  const [showCreate, setShowCreate] = useState(false);
  const [newName, setNewName] = useState("");
  const [newSlug, setNewSlug] = useState("");
  const [newAddress, setNewAddress] = useState("");
  const [newBriefing, setNewBriefing] = useState("");
  const [creating, setCreating] = useState(false);

  /* Edit site modal / accordion */
  const [editingSiteId, setEditingSiteId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [editSlug, setEditSlug] = useState("");
  const [editAddress, setEditAddress] = useState("");
  const [editBriefing, setEditBriefing] = useState("");
  const [editQuestions, setEditQuestions] = useState<string[]>([]);
  const [editLocale, setEditLocale] = useState<string>("en");
  const [hostsForEdit, setHostsForEdit] = useState<Host[]>([]);
  const [newHostName, setNewHostName] = useState("");
  const [newHostEmail, setNewHostEmail] = useState("");
  const [docSigningEnabled, setDocSigningEnabled] = useState(false);
  const [showVisitorList, setShowVisitorList] = useState(true);
  const [openSection, setOpenSection] = useState<string | null>("basic");
  const [savingEdit, setSavingEdit] = useState(false);

  /* Delete confirmation */
  const [deleteSiteId, setDeleteSiteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  /* QR modal */
  const [qrSite, setQrSite] = useState<Site | null>(null);

  /* Blocklist */
  const [blocklist, setBlocklist] = useState<BlocklistEntry[]>([]);
  const [blockValue, setBlockValue] = useState("");
  const [blockType, setBlockType] = useState("name");
  const [blockNote, setBlockNote] = useState("");
  const [addingBlock, setAddingBlock] = useState(false);

  /* Webhooks */
  const [webhookUrl, setWebhookUrl] = useState("");
  const [savingWebhook, setSavingWebhook] = useState(false);
  const [testingWebhook, setTestingWebhook] = useState(false);

  /* Expected visitors */
  const [expectedVisitors, setExpectedVisitors] = useState<ExpectedVisitor[]>([]);

  /* Document template */
  const [templateFile, setTemplateFile] = useState<File | null>(null);
  const [uploadingTemplate, setUploadingTemplate] = useState(false);

  /* Lockdown */
  const [lockdownSiteId, setLockdownSiteId] = useState<string | null>(null);
  const [togglingLockdown, setTogglingLockdown] = useState(false);

  /* Tutorial */
  const [showTutorial, setShowTutorial] = useState(false);

  /* ─── Derived ─── */
  const filteredVisitors = visitors.filter((v) => {
    const matchesSearch =
      !searchQuery ||
      v.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.company.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all"
        ? true
        : statusFilter === "in"
        ? !v.signedOutAt
        : !!v.signedOutAt;
    const matchesSite = siteFilter === "all" ? true : v.siteId === siteFilter;
    return matchesSearch && matchesStatus && matchesSite;
  });

  const activeNow = visitors.filter((v) => !v.signedOutAt).length;
  const todayCount = sites.reduce((sum, site) => sum + (site.visitorsToday || 0), 0);

  const avgDuration = useMemo(() => {
    const today = new Date().toDateString();
    const todayVisitors = visitors.filter((v) => {
      const signedIn = new Date(v.signedInAt).toDateString();
      return signedIn === today && v.signedOutAt;
    });
    if (todayVisitors.length === 0) return 0;
    const totalMinutes = todayVisitors.reduce((acc, v) => {
      const diff =
        new Date(v.signedOutAt!).getTime() - new Date(v.signedInAt).getTime();
      return acc + diff / 60000;
    }, 0);
    return Math.round(totalMinutes / todayVisitors.length);
  }, [visitors]);

  /* ─── Data fetchers ─── */
  async function fetchVisitors() {
    setLoading(true);
    const params = new URLSearchParams();
    if (dateFrom) params.set("from", dateFrom);
    if (dateTo) params.set("to", dateTo);
    const res = await fetch(`/api/visitors?${params.toString()}`);
    if (res.ok) {
      const data = await res.json();
      setVisitors(data);
    }
    setLoading(false);
  }

  /* ─── Effects ─── */
  useEffect(() => {
    (async () => {
      const res = await fetch("/api/blocklist");
      if (res.ok) {
        const data = await res.json();
        setBlocklist(data);
      }
    })();
    (async () => {
      const res = await fetch("/api/webhooks");
      if (res.ok) {
        const data = await res.json();
        setWebhookUrl(data.url || "");
      }
    })();
  }, []);

  useEffect(() => {
    if (editingSiteId) {
      (async () => {
        const res = await fetch(`/api/sites/${editingSiteId}/hosts`);
        if (res.ok) {
          const data = await res.json();
          setHostsForEdit(Array.isArray(data) ? data : []);
        }
      })();
      (async () => {
        const res = await fetch(`/api/sites/${editingSiteId}/expected-visitors`);
        if (res.ok) {
          const data = await res.json();
          setExpectedVisitors(Array.isArray(data) ? data : []);
        }
      })();
    }
  }, [editingSiteId]);

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const res = await fetch(`/api/dashboard/data?companyId=${companyId}`);
        if (!res.ok) return;
        const data = await res.json();
        setSites(data.sites);
        setVisitors(data.logs);
      } catch (err) {
        console.error("Auto-refresh failed:", err);
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [companyId]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (langMenuRef.current && !langMenuRef.current.contains(e.target as Node)) {
        setShowLangMenu(false);
      }
    }
    if (showLangMenu) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [showLangMenu]);

  /* ─── Handlers ─── */
  async function handleCreateSite(e: React.FormEvent) {
    e.preventDefault();
    if (!newName.trim()) return;
    setCreating(true);
    const res = await fetch("/api/sites", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: newName.trim(),
        slug: newSlug.trim() || undefined,
        address: newAddress.trim() || undefined,
        safetyBriefingText: newBriefing.trim() || undefined,
      }),
    });
    if (res.ok) {
      const newSite = await res.json();
      setSites((prev) => [
        ...prev,
        {
          id: newSite.id,
          name: newSite.name,
          slug: newSite.slug,
          address: newSite.address,
          safetyBriefingText: newSite.safetyBriefingText || "",
          visitorsToday: 0,
          questions: [],
          documentSigningEnabled: false,
          documentTemplateData: null,
          lockdownEnabled: false,
          showVisitorListOnCheckin: true,
          locale: "en",
        },
      ]);
      addToast(copy.siteCreated, "success");
      setShowCreate(false);
      setNewName("");
      setNewSlug("");
      setNewAddress("");
      setNewBriefing("");
      logEvent("site_created");
    } else {
      addToast(copy.failedCreateSite, "error");
    }
    setCreating(false);
  }

  function startEdit(site: Site) {
    setEditingSiteId(site.id);
    setEditName(site.name);
    setEditSlug(site.slug);
    setEditAddress(site.address || "");
    setEditBriefing(site.safetyBriefingText);
    setEditQuestions(site.questions || []);
    setDocSigningEnabled(site.documentSigningEnabled || false);
    setShowVisitorList(site.showVisitorListOnCheckin ?? true);
    setEditLocale(site.locale || "en");
    setOpenSection("basic");
    setNewHostName("");
    setNewHostEmail("");
  }

  async function saveEdit() {
    if (!editingSiteId) return;
    setSavingEdit(true);
    const res = await fetch(`/api/sites/${editingSiteId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: editName,
        slug: editSlug,
        address: editAddress,
        safetyBriefingText: editBriefing,
        questions: editQuestions,
        documentSigningEnabled: docSigningEnabled,
        showVisitorListOnCheckin: showVisitorList,
        locale: editLocale,
      }),
    });
    if (res.ok) {
      setSites((prev) =>
        prev.map((s) =>
          s.id === editingSiteId
            ? {
                ...s,
                name: editName,
                slug: editSlug,
                address: editAddress,
                safetyBriefingText: editBriefing,
                questions: editQuestions,
                documentSigningEnabled: docSigningEnabled,
                showVisitorListOnCheckin: showVisitorList,
                locale: editLocale,
              }
            : s
        )
      );
      addToast(copy.siteUpdated, "success");
      setEditingSiteId(null);
    } else {
      addToast(copy.failedUpdateSite, "error");
    }
    setSavingEdit(false);
  }

  async function handleDeleteSite() {
    if (!deleteSiteId) return;
    setDeleting(true);
    const res = await fetch(`/api/sites/${deleteSiteId}`, { method: "DELETE" });
    if (res.ok) {
      setSites((prev) => prev.filter((s) => s.id !== deleteSiteId));
      addToast(copy.siteDeleted, "success");
      setDeleteSiteId(null);
    } else {
      addToast(copy.failedDeleteSite, "error");
    }
    setDeleting(false);
  }

  async function handleSignOut(id: string) {
    const res = await fetch("/api/checkin/signout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    if (res.ok) {
      setVisitors((prev) =>
        prev.map((v) =>
          v.id === id ? { ...v, signedOutAt: new Date().toISOString() } : v
        )
      );
      addToast(copy.visitorSignedOut, "success");
    } else {
      addToast(copy.failedSignOut, "error");
    }
  }

  async function handleAddHost() {
    if (!editingSiteId || !newHostName.trim()) return;
    const res = await fetch(`/api/sites/${editingSiteId}/hosts`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: newHostName.trim(),
        email: newHostEmail.trim() || undefined,
      }),
    });
    if (res.ok) {
      const host = await res.json();
      setHostsForEdit((prev) => [...prev, host]);
      setNewHostName("");
      setNewHostEmail("");
    }
  }

  async function handleRemoveHost(hostId: string) {
    if (!editingSiteId) return;
    const res = await fetch(`/api/sites/${editingSiteId}/hosts/${hostId}`, {
      method: "DELETE",
    });
    if (res.ok) {
      setHostsForEdit((prev) => prev.filter((h) => h.id !== hostId));
    }
  }

  async function handleAddQuestion() {
    setEditQuestions((prev) => [...prev, ""]);
  }

  async function handleRemoveQuestion(idx: number) {
    setEditQuestions((prev) => prev.filter((_, i) => i !== idx));
  }

  async function handleAddBlocklist(e: React.FormEvent) {
    e.preventDefault();
    if (!blockValue.trim()) return;
    setAddingBlock(true);
    const res = await fetch("/api/blocklist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        value: blockValue.trim(),
        type: blockType,
        note: blockNote.trim() || undefined,
      }),
    });
    if (res.ok) {
      const entry = await res.json();
      setBlocklist((prev) => [...prev, entry]);
      setBlockValue("");
      setBlockNote("");
      addToast(copy.blocklistAdded, "success");
    } else {
      addToast(copy.failedBlocklist, "error");
    }
    setAddingBlock(false);
  }

  async function handleRemoveBlocklist(id: string) {
    const res = await fetch(`/api/blocklist/${id}`, { method: "DELETE" });
    if (res.ok) {
      setBlocklist((prev) => prev.filter((b) => b.id !== id));
      addToast(copy.entryRemoved, "success");
    }
  }

  async function handleSaveWebhook() {
    setSavingWebhook(true);
    const res = await fetch("/api/webhooks", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: webhookUrl.trim() }),
    });
    if (res.ok) {
      addToast(copy.webhookSaved, "success");
    }
    setSavingWebhook(false);
  }

  async function handleTestWebhook() {
    setTestingWebhook(true);
    const res = await fetch("/api/webhooks/test", { method: "POST" });
    if (res.ok) {
      addToast(copy.testEventSent, "success");
    }
    setTestingWebhook(false);
  }

  async function handleUploadTemplate() {
    if (!editingSiteId || !templateFile) return;
    setUploadingTemplate(true);
    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64 = reader.result as string;
      const res = await fetch(`/api/sites/${editingSiteId}/document-template`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: base64 }),
      });
      if (res.ok) {
        addToast(copy.templateUploaded, "success");
        setTemplateFile(null);
      } else {
        addToast(copy.uploadFailed, "error");
      }
      setUploadingTemplate(false);
    };
    reader.readAsDataURL(templateFile);
  }

  async function handleToggleLockdown(siteId: string, current: boolean) {
    setLockdownSiteId(siteId);
    setTogglingLockdown(true);
    try {
      const res = await fetch(`/api/sites/${siteId}/lockdown`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lockdownEnabled: !current }),
      });
      if (res.ok) {
        const data = await res.json();
        setSites((prev) =>
          prev.map((s) =>
            s.id === siteId ? { ...s, lockdownEnabled: data.lockdownEnabled } : s
          )
        );
        addToast(data.lockdownEnabled ? copy.lockdownActivated : copy.lockdownEnded, "success");
      } else {
        const err = await res.json().catch(() => ({ error: "Unknown error" }));
        addToast(err.error || copy.error, "error");
      }
    } catch {
      addToast(copy.error, "error");
    }
    setTogglingLockdown(false);
    setLockdownSiteId(null);
  }

  function exportCSV() {
    const headers = [copy.visitor, copy.site, copy.company, copy.host, copy.time, copy.status];
    const rows = filteredVisitors.map((v) => [
      v.fullName,
      v.siteName,
      v.company,
      v.hostName || "",
      new Date(v.signedInAt).toLocaleString(isPT ? "pt-BR" : "en-US"),
      v.signedOutAt ? copy.out : copy.in,
    ]);
    const csv = [headers, ...rows]
      .map((r) => r.map((c) => `"${String(c).replace(/"/g, "\"\"")}"`).join(","))
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `visitors-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function exportExcel() {
    exportCSV();
  }

  function exportPDF() {
    window.print();
  }

  function copyCheckinUrl(slug: string) {
    const url = `${window.location.origin}/checkin/${slug}`;
    navigator.clipboard.writeText(url);
    addToast(copy.copied, "success");
  }

  /* ─── Render ─── */
  return (
    <div className="min-h-screen bg-[#0a0f1c] text-slate-200 selection:bg-sky-500/30 selection:text-sky-100">
      <AmbientSpotlight />
      <NoiseOverlay />
      <ScrollProgress />

      {/* Header */}
      <header className="border-b border-white/5 bg-[#0a0f1c]/80 backdrop-blur-2xl sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-sky-500 to-teal-500 flex items-center justify-center shadow-lg shadow-sky-500/20">
              <ShieldCheck className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-sm text-white tracking-tight">SiteSafe</h1>
              <p className="text-[10px] text-slate-500 font-medium">{copy.dashboard}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href={isPT ? "/br/faq" : "/faq"}
              className="text-xs text-slate-500 hover:text-sky-400 transition-colors"
            >
              {copy.help}
            </Link>
            <div className="relative" ref={langMenuRef}>
              <button
                onClick={() => setShowLangMenu(!showLangMenu)}
                className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-white transition-colors px-2 py-1 rounded-lg hover:bg-white/5"
              >
                <Globe className="w-3.5 h-3.5" />
                {locale === "pt" ? "PT" : "EN"}
              </button>
              <AnimatePresence>
                {showLangMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: -4, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -4, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-1 w-32 rounded-xl border border-white/10 bg-[#1a1f2e]/95 backdrop-blur-xl shadow-2xl py-1 z-50"
                  >
                    <button
                      onClick={() => {
                        document.cookie = "sitesafe-locale=en; path=/; max-age=31536000; SameSite=Lax";
                        router.refresh();
                        setShowLangMenu(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-xs transition-colors ${
                        locale === "en" ? "text-sky-400 bg-sky-500/10" : "text-slate-400 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      English
                    </button>
                    <button
                      onClick={() => {
                        document.cookie = "sitesafe-locale=pt; path=/; max-age=31536000; SameSite=Lax";
                        router.refresh();
                        setShowLangMenu(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-xs transition-colors ${
                        locale === "pt" ? "text-sky-400 bg-sky-500/10" : "text-slate-400 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      Português
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <Link
              href="/settings"
              className="text-xs text-slate-500 hover:text-white transition-colors flex items-center gap-1"
            >
              <Settings className="w-3.5 h-3.5" /> {copy.settings}
            </Link>
            <button
              onClick={() => {
                if (confirm(copy.logoutConfirm)) signOut({ callbackUrl: "/" });
              }}
              className="text-xs text-slate-500 hover:text-rose-400 transition-colors flex items-center gap-1"
            >
              <LogOut className="w-3.5 h-3.5" /> {copy.logout}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 relative z-10">

        {/* Welcome */}
        <AnimatePresence>
          {sites.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="relative rounded-2xl border border-white/5 bg-white/[0.03] backdrop-blur-xl p-8 text-center overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-sky-500/30 to-transparent" />
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-sky-500/20 to-teal-500/20 border border-sky-500/20 flex items-center justify-center mx-auto mb-4">
                <Building2 className="w-6 h-6 text-sky-400" />
              </div>
              <h2 className="text-xl font-bold text-white mb-2">{copy.welcomeTitle}</h2>
              <p className="text-sm text-slate-400 max-w-md mx-auto leading-relaxed">
                {copy.welcomeDesc.replace("{edit}", copy.edit)}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Stats */}
        <SectionReveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: Users, label: copy.activeNow, value: activeNow, sub: copy.onSite, color: "sky", glow: "rgba(14,165,233,0.15)" },
              { icon: ClipboardList, label: copy.todayVisitors, value: todayCount, sub: copy.checkedIn, color: "emerald", glow: "rgba(16,185,129,0.15)" },
              { icon: Clock, label: copy.avgVisit, value: avgDuration, sub: copy.minutes, color: "amber", glow: "rgba(245,158,11,0.15)" },
              { icon: Building2, label: copy.totalSites, value: sites.length, sub: copy.locations, color: "violet", glow: "rgba(139,92,246,0.15)" },
            ].map((stat, i) => (
              <TiltCard key={stat.label} glowColor={stat.glow} className="group">
                <div className="relative rounded-xl border border-white/5 bg-white/[0.03] backdrop-blur-xl p-5 overflow-hidden transition-colors hover:bg-white/[0.05] hover:border-white/10">
                  <div className={`absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-${stat.color}-500/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity`} />
                  <div className="flex items-center gap-2 mb-3">
                    <div className={`w-8 h-8 rounded-lg bg-${stat.color}-500/10 border border-${stat.color}-500/20 flex items-center justify-center`}>
                      <stat.icon className={`w-4 h-4 text-${stat.color}-400`} />
                    </div>
                    <span className="text-[10px] uppercase tracking-wider text-slate-500 font-medium">{stat.label}</span>
                  </div>
                  <p className="text-3xl font-bold text-white tracking-tight">
                    <AnimatedCounter value={stat.value} />
                  </p>
                  <p className="text-xs text-slate-500 mt-1">{stat.sub}</p>
                </div>
              </TiltCard>
            ))}
          </div>
        </SectionReveal>

        {/* Sites */}
        <SectionReveal>
          <div className="relative">
            {/* Ambient orb */}
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-sky-500/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-white tracking-tight">{copy.yourSites}</h2>
              <div className="flex items-center gap-3">
                <span className="text-xs text-slate-500">{sites.length} {copy.sitesOf}</span>
                <MagneticButton
                  onClick={() => setShowCreate(true)}
                  className="bg-gradient-to-r from-sky-500 to-teal-500 hover:from-sky-400 hover:to-teal-400 text-white px-4 py-2 rounded-xl text-xs font-medium transition-all flex items-center gap-1.5 shadow-lg shadow-sky-500/20 hover:shadow-sky-500/30"
                >
                  <Plus className="w-3.5 h-3.5" /> {copy.newSite}
                </MagneticButton>
              </div>
            </div>

            {sites.length === 0 ? (
              <div className="rounded-xl border border-white/5 bg-white/[0.03] backdrop-blur-xl p-8 text-center">
                <p className="text-sm text-slate-400 mb-2">{copy.noSites}</p>
                <p className="text-xs text-slate-600">{copy.noSitesDesc}</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {sites.map((site, idx) => (
                  <motion.div
                    key={site.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <TiltCard glowColor={site.lockdownEnabled ? "rgba(244,63,94,0.15)" : "rgba(14,165,233,0.1)"} className="group">
                      <div
                        onClick={(e) => {
                          if ((e.target as HTMLElement).closest("button")) return;
                          window.open(`/checkin/${site.slug}`, "_blank");
                        }}
                        className={`relative rounded-xl border bg-white/[0.03] backdrop-blur-xl overflow-hidden transition-all hover:bg-white/[0.05] cursor-pointer ${
                          site.lockdownEnabled
                            ? "border-rose-500/30 hover:border-rose-500/50"
                            : "border-white/5 hover:border-white/10"
                        }`}
                      >
                        {/* Top gradient line */}
                        <div className={`absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent ${site.lockdownEnabled ? "via-rose-500/40" : "via-sky-500/30"} to-transparent opacity-0 group-hover:opacity-100 transition-opacity`} />

                        {site.lockdownEnabled && (
                          <div className="absolute inset-0 bg-rose-500/[0.02] pointer-events-none" />
                        )}

                        <div className="p-5 relative">
                          <div className="flex items-start justify-between mb-3">
                            <div className="min-w-0">
                              <h3 className="font-semibold text-white text-sm truncate">{site.name}</h3>
                              <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1">
                                <span className="font-mono">/{site.slug}</span>
                                <span className="text-slate-700">•</span>
                                <span>{site.visitorsToday} {isPT ? "hoje" : "today"}</span>
                                {site.locale === "pt" && (
                                  <span className="ml-1 inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                                    🇧🇷 PT
                                  </span>
                                )}
                              </div>
                            </div>
                            {site.lockdownEnabled && (
                              <motion.span
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400 text-[10px] font-medium"
                              >
                                <ShieldAlert className="w-3 h-3" /> {copy.lockdownActive}
                              </motion.span>
                            )}
                          </div>

                          <div className="flex flex-wrap gap-2">
                            <button
                              onClick={() => startEdit(site)}
                              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white text-xs transition-all border border-transparent hover:border-white/10"
                            >
                              <Pencil className="w-3 h-3" /> {copy.edit}
                            </button>
                            <button
                              onClick={() => copyCheckinUrl(site.slug)}
                              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white text-xs transition-all border border-transparent hover:border-white/10"
                            >
                              <Copy className="w-3 h-3" /> {copy.copyUrl}
                            </button>
                            <button
                              onClick={() => setQrSite(site)}
                              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white text-xs transition-all border border-transparent hover:border-white/10"
                            >
                              <QrCode className="w-3 h-3" /> {copy.qrCode}
                            </button>
                            <button
                              onClick={() => handleToggleLockdown(site.id, !!site.lockdownEnabled)}
                              disabled={togglingLockdown && lockdownSiteId === site.id}
                              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs transition-all border ${
                                site.lockdownEnabled
                                  ? "bg-rose-500/10 text-rose-400 border-rose-500/20 hover:bg-rose-500/20"
                                  : "bg-white/5 text-slate-300 hover:text-white hover:bg-white/10 border-transparent hover:border-white/10"
                              }`}
                            >
                              <DoorClosed className="w-3 h-3" />
                              {site.lockdownEnabled ? copy.endLockdown : copy.lockdown}
                            </button>
                            <button
                              onClick={() => setDeleteSiteId(site.id)}
                              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-rose-500/10 text-slate-300 hover:text-rose-400 text-xs transition-all border border-transparent hover:border-rose-500/20"
                            >
                              <Trash2 className="w-3 h-3" /> {copy.delete}
                            </button>
                          </div>
                        </div>
                      </div>
                    </TiltCard>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </SectionReveal>

        {/* Visitor Log */}
        <SectionReveal>
          <div className="relative">
            <div className="absolute -top-20 -left-20 w-64 h-64 bg-teal-500/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
              <h2 className="text-lg font-bold text-white tracking-tight">{copy.visitorLog}</h2>
              <div className="flex flex-wrap items-center gap-2">
                <div className="relative group">
                  <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-600 group-focus-within:text-sky-400 transition-colors" />
                  <input
                    type="text"
                    placeholder={copy.search}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-white/5 border border-white/10 rounded-xl pl-8 pr-3 py-2 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-sky-500/30 focus:border-sky-500/30 w-40 transition-all"
                  />
                </div>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as "all" | "in" | "out")}
                  className="bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-sky-500/30 cursor-pointer"
                >
                  <option value="all">{copy.allStatuses}</option>
                  <option value="in">{copy.signedInStatus}</option>
                  <option value="out">{copy.signedOutStatus}</option>
                </select>
                <select
                  value={siteFilter}
                  onChange={(e) => setSiteFilter(e.target.value)}
                  className="bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-sky-500/30 cursor-pointer"
                >
                  <option value="all">{copy.allSites}</option>
                  {sites.map((s) => (
                    <option key={s.id} value={s.id}>{s.name}</option>
                  ))}
                </select>
                <div className="flex items-center gap-1">
                  <button onClick={exportCSV} className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-all border border-transparent hover:border-white/10" title={copy.csv}>
                    <FileSpreadsheet className="w-3.5 h-3.5" />
                  </button>
                  <button onClick={exportExcel} className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-all border border-transparent hover:border-white/10" title={copy.excel}>
                    <FileDown className="w-3.5 h-3.5" />
                  </button>
                  <button onClick={exportPDF} className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-all border border-transparent hover:border-white/10" title={copy.pdf}>
                    <FileText className="w-3.5 h-3.5" />
                  </button>
                </div>
                <button
                  onClick={fetchVisitors}
                  disabled={loading}
                  className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-all border border-transparent hover:border-white/10"
                  title={copy.refresh}
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
                </button>
              </div>
            </div>

            <div className="rounded-xl border border-white/5 bg-white/[0.03] backdrop-blur-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-white/5 bg-white/[0.02]">
                      <th className="px-4 py-3 font-medium text-slate-500">{copy.visitor}</th>
                      <th className="px-4 py-3 font-medium text-slate-500">{copy.site}</th>
                      <th className="px-4 py-3 font-medium text-slate-500">{copy.company}</th>
                      <th className="px-4 py-3 font-medium text-slate-500">{copy.host}</th>
                      <th className="px-4 py-3 font-medium text-slate-500">{copy.time}</th>
                      <th className="px-4 py-3 font-medium text-slate-500">{copy.status}</th>
                      <th className="px-4 py-3 font-medium text-slate-500">{copy.actions}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {filteredVisitors.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="px-4 py-8 text-center">
                          <p className="text-sm text-slate-400">{copy.noVisitors}</p>
                          <p className="text-xs text-slate-600 mt-1">{copy.noVisitorsDesc}</p>
                        </td>
                      </tr>
                    ) : (
                      filteredVisitors.map((v, i) => (
                        <motion.tr
                          key={v.id}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.02, duration: 0.3 }}
                          className="hover:bg-white/[0.02] transition-colors group"
                        >
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              {v.photoUrl ? (
                                <img src={v.photoUrl} alt="" className="w-7 h-7 rounded-full object-cover ring-2 ring-white/5" />
                              ) : (
                                <div className="w-7 h-7 rounded-full bg-white/5 ring-2 ring-white/5 flex items-center justify-center text-[10px] text-slate-500 font-medium">
                                  {v.fullName.charAt(0)}
                                </div>
                              )}
                              <span className="text-white font-medium">{v.fullName}</span>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-slate-400">{v.siteName}</td>
                          <td className="px-4 py-3 text-slate-400">{v.company}</td>
                          <td className="px-4 py-3 text-slate-400">{v.hostName || "—"}</td>
                          <td className="px-4 py-3 text-slate-400">
                            <div className="flex flex-col">
                              <span>{new Date(v.signedInAt).toLocaleTimeString(isPT ? "pt-BR" : "en-US", { hour: "2-digit", minute: "2-digit" })}</span>
                              {v.signedOutAt && (
                                <span className="text-slate-600">
                                  {new Date(v.signedOutAt).toLocaleTimeString(isPT ? "pt-BR" : "en-US", { hour: "2-digit", minute: "2-digit" })}
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            {v.signedOutAt ? (
                              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-500/10 border border-slate-500/20 text-slate-400 text-[10px] font-medium">
                                <CheckCircle2 className="w-3 h-3" /> {copy.completed}
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-medium">
                                <Clock className="w-3 h-3" /> {copy.onSiteStatus}
                              </span>
                            )}
                          </td>
                          <td className="px-4 py-3">
                            {!v.signedOutAt && (
                              <button
                                onClick={() => handleSignOut(v.id)}
                                className="text-xs text-slate-400 hover:text-rose-400 transition-colors flex items-center gap-1"
                              >
                                <LogOut className="w-3 h-3" /> {copy.signOut}
                              </button>
                            )}
                          </td>
                        </motion.tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </SectionReveal>

        {/* Blocklist */}
        <SectionReveal>
          <div className="relative rounded-xl border border-white/5 bg-white/[0.03] backdrop-blur-xl overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-rose-500/20 to-transparent" />
            <div className="bg-white/[0.02] border-b border-white/5 px-6 py-4 flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-rose-400" />
              <h2 className="text-sm font-bold text-white tracking-tight">{copy.watchlist}</h2>
            </div>
            <div className="p-6 space-y-4">
              <p className="text-xs text-slate-500 leading-relaxed">{copy.watchlistDesc}</p>
              <form onSubmit={handleAddBlocklist} className="flex flex-wrap gap-2">
                <select
                  value={blockType}
                  onChange={(e) => setBlockType(e.target.value)}
                  className="bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-rose-500/30 cursor-pointer"
                >
                  <option value="name">{copy.visitor}</option>
                  <option value="email">{copy.hostEmail}</option>
                  <option value="phone">{copy.phone}</option>
                </select>
                <input
                  type="text"
                  placeholder={copy.nameEmailPhone}
                  value={blockValue}
                  onChange={(e) => setBlockValue(e.target.value)}
                  required
                  className="flex-1 min-w-[200px] bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-rose-500/30 transition-all"
                />
                <input
                  type="text"
                  placeholder={copy.noteOptional}
                  value={blockNote}
                  onChange={(e) => setBlockNote(e.target.value)}
                  className="flex-1 min-w-[200px] bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-rose-500/30 transition-all"
                />
                <button
                  type="submit"
                  disabled={addingBlock}
                  className="bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-400 hover:to-orange-400 disabled:opacity-50 text-white px-4 py-2 rounded-xl text-xs font-medium transition-all shadow-lg shadow-rose-500/20"
                >
                  {addingBlock ? copy.adding : copy.add}
                </button>
              </form>
              {blocklist.length === 0 ? (
                <p className="text-xs text-slate-600">{copy.noEntries}</p>
              ) : (
                <div className="divide-y divide-white/5">
                  {blocklist.map((entry) => (
                    <div key={entry.id} className="flex items-center justify-between py-3 group">
                      <div>
                        <p className="text-sm text-white font-medium">{entry.value}</p>
                        <p className="text-xs text-slate-500">
                          {entry.type} {entry.note && `• ${entry.note}`}
                        </p>
                      </div>
                      <button
                        onClick={() => handleRemoveBlocklist(entry.id)}
                        className="text-xs text-slate-500 hover:text-rose-400 transition-colors flex items-center gap-1 opacity-0 group-hover:opacity-100"
                      >
                        <Trash2 className="w-3 h-3" /> {copy.remove}
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </SectionReveal>

        {/* Webhooks */}
        <SectionReveal>
          <div className="relative rounded-xl border border-white/5 bg-white/[0.03] backdrop-blur-xl overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/20 to-transparent" />
            <div className="bg-white/[0.02] border-b border-white/5 px-6 py-4 flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-400" />
              <h2 className="text-sm font-bold text-white tracking-tight">{copy.webhooks}</h2>
            </div>
            <div className="p-6 space-y-4">
              <p className="text-xs text-slate-500 leading-relaxed">{copy.webhooksDesc}</p>
              <div className="flex gap-2">
                <input
                  type="url"
                  placeholder={copy.webhookPlaceholder}
                  value={webhookUrl}
                  onChange={(e) => setWebhookUrl(e.target.value)}
                  className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-amber-500/30 transition-all"
                />
                <button
                  onClick={handleSaveWebhook}
                  disabled={savingWebhook}
                  className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 disabled:opacity-50 text-white px-4 py-2 rounded-xl text-xs font-medium transition-all shadow-lg shadow-amber-500/20"
                >
                  {savingWebhook ? copy.saving : copy.save}
                </button>
                <button
                  onClick={handleTestWebhook}
                  disabled={testingWebhook || !webhookUrl}
                  className="bg-white/5 hover:bg-white/10 border border-white/10 text-white px-4 py-2 rounded-xl text-xs font-medium transition-all disabled:opacity-50"
                >
                  {testingWebhook ? copy.sending : copy.testEvent}
                </button>
              </div>
            </div>
          </div>
        </SectionReveal>
      </main>

      {/* Create Site Modal */}
      <AnimatePresence>
        {showCreate && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="w-full max-w-md rounded-2xl border border-white/10 bg-[#0f172a]/95 backdrop-blur-2xl p-6 space-y-4 shadow-2xl"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-white tracking-tight">{copy.newSite}</h3>
                <button onClick={() => setShowCreate(false)} className="text-slate-500 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/5">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <form onSubmit={handleCreateSite} className="space-y-3">
                <div>
                  <label className="text-[10px] uppercase tracking-wider text-slate-500 font-medium mb-1.5 block">{copy.siteName}</label>
                  <input
                    type="text"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-sky-500/30 focus:border-sky-500/30 transition-all"
                  />
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-wider text-slate-500 font-medium mb-1.5 block">{copy.slug}</label>
                  <input
                    type="text"
                    value={newSlug}
                    onChange={(e) => setNewSlug(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-sky-500/30 focus:border-sky-500/30 transition-all"
                  />
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-wider text-slate-500 font-medium mb-1.5 block">{copy.address}</label>
                  <input
                    type="text"
                    value={newAddress}
                    onChange={(e) => setNewAddress(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-sky-500/30 focus:border-sky-500/30 transition-all"
                  />
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-wider text-slate-500 font-medium mb-1.5 block">{copy.safetyBriefing}</label>
                  <textarea
                    value={newBriefing}
                    onChange={(e) => setNewBriefing(e.target.value)}
                    rows={3}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-sky-500/30 focus:border-sky-500/30 transition-all resize-none"
                  />
                </div>
                <div className="flex gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowCreate(false)}
                    className="flex-1 bg-white/5 hover:bg-white/10 text-white px-4 py-2.5 rounded-xl text-sm font-medium transition-all border border-white/10"
                  >
                    {copy.cancel}
                  </button>
                  <MagneticButton
                    type="submit"
                    disabled={creating}
                    className="flex-1 bg-gradient-to-r from-sky-500 to-teal-500 hover:from-sky-400 hover:to-teal-400 disabled:opacity-50 text-white px-4 py-2.5 rounded-xl text-sm font-medium transition-all shadow-lg shadow-sky-500/20"
                  >
                    {creating ? copy.creating : copy.createSite}
                  </MagneticButton>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Edit Site Modal */}
      <AnimatePresence>
        {editingSiteId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="w-full max-w-lg rounded-2xl border border-white/10 bg-[#0f172a]/95 backdrop-blur-2xl p-6 max-h-[90vh] overflow-y-auto shadow-2xl"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-white tracking-tight">{copy.editSite}</h3>
                <button onClick={() => setEditingSiteId(null)} className="text-slate-500 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/5">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-3">
                {/* Basic Info */}
                <div className="rounded-xl border border-white/5 bg-white/[0.03] overflow-hidden">
                  <button
                    onClick={() => setOpenSection(openSection === "basic" ? null : "basic")}
                    className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-white/[0.02] transition-colors"
                  >
                    <span className="text-sm font-medium text-white">{copy.basicInfo}</span>
                    <motion.div animate={{ rotate: openSection === "basic" ? 180 : 0 }} transition={{ duration: 0.2 }}>
                      <ChevronDown className="w-4 h-4 text-slate-500" />
                    </motion.div>
                  </button>
                  <AnimatePresence>
                    {openSection === "basic" && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="px-4 pb-4 space-y-3">
                          <div>
                            <label className="text-[10px] uppercase tracking-wider text-slate-500 font-medium mb-1.5 block">{copy.siteName}</label>
                            <input
                              type="text"
                              value={editName}
                              onChange={(e) => setEditName(e.target.value)}
                              className="w-full bg-[#0f172a] border border-white/10 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-sky-500/30 focus:border-sky-500/30 transition-all"
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <label className="text-[10px] uppercase tracking-wider text-slate-500 font-medium mb-1.5 block">Slug</label>
                              <input
                                type="text"
                                value={editSlug}
                                onChange={(e) => setEditSlug(e.target.value)}
                                className="w-full bg-[#0f172a] border border-white/10 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-sky-500/30 focus:border-sky-500/30 transition-all"
                              />
                            </div>
                            <div>
                              <label className="text-[10px] uppercase tracking-wider text-slate-500 font-medium mb-1.5 block">{copy.address}</label>
                              <input
                                type="text"
                                value={editAddress}
                                onChange={(e) => setEditAddress(e.target.value)}
                                className="w-full bg-[#0f172a] border border-white/10 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-sky-500/30 focus:border-sky-500/30 transition-all"
                              />
                            </div>
                          </div>
                          <div>
                            <label className="text-[10px] uppercase tracking-wider text-slate-500 font-medium mb-1.5 block">{copy.safetyBriefing}</label>
                            <textarea
                              value={editBriefing}
                              onChange={(e) => setEditBriefing(e.target.value)}
                              rows={3}
                              className="w-full bg-[#0f172a] border border-white/10 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-sky-500/30 focus:border-sky-500/30 transition-all resize-none"
                            />
                          </div>
                          <div>
                            <label className="text-[10px] uppercase tracking-wider text-slate-500 font-medium mb-1.5 block">{copy.checkinLanguage}</label>
                            <select
                              value={editLocale}
                              onChange={(e) => setEditLocale(e.target.value)}
                              className="w-full bg-[#0f172a] border border-white/10 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-sky-500/30 focus:border-sky-500/30 transition-all cursor-pointer"
                            >
                              <option value="en" className="bg-[#0f172a]">{copy.english}</option>
                              <option value="pt" className="bg-[#0f172a]">{copy.portuguese}</option>
                            </select>
                            <p className="text-[10px] text-slate-600 mt-1">{copy.checkinLanguageDesc}</p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Hosts */}
                <div className="rounded-xl border border-white/5 bg-white/[0.03] overflow-hidden">
                  <button
                    onClick={() => setOpenSection(openSection === "hosts" ? null : "hosts")}
                    className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-white/[0.02] transition-colors"
                  >
                    <span className="text-sm font-medium text-white">{copy.hosts} ({hostsForEdit.length})</span>
                    <motion.div animate={{ rotate: openSection === "hosts" ? 180 : 0 }} transition={{ duration: 0.2 }}>
                      <ChevronDown className="w-4 h-4 text-slate-500" />
                    </motion.div>
                  </button>
                  <AnimatePresence>
                    {openSection === "hosts" && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="px-4 pb-4 space-y-3">
                          <div className="flex gap-2">
                            <input
                              type="text"
                              placeholder={copy.hostName}
                              value={newHostName}
                              onChange={(e) => setNewHostName(e.target.value)}
                              className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-sky-500/30 transition-all"
                            />
                            <input
                              type="email"
                              placeholder={copy.hostEmail}
                              value={newHostEmail}
                              onChange={(e) => setNewHostEmail(e.target.value)}
                              className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-sky-500/30 transition-all"
                            />
                            <button
                              onClick={handleAddHost}
                              className="bg-gradient-to-r from-sky-500 to-teal-500 hover:from-sky-400 hover:to-teal-400 text-white px-3 py-2 rounded-xl text-xs font-medium transition-all shadow-lg shadow-sky-500/20"
                            >
                              {copy.add}
                            </button>
                          </div>
                          {hostsForEdit.map((host) => (
                            <div key={host.id} className="flex items-center justify-between py-2 group">
                              <div>
                                <p className="text-sm text-white">{host.name}</p>
                                <p className="text-xs text-slate-500">{host.email}</p>
                              </div>
                              <button
                                onClick={() => handleRemoveHost(host.id)}
                                className="text-xs text-slate-500 hover:text-rose-400 transition-colors opacity-0 group-hover:opacity-100"
                              >
                                {copy.remove}
                              </button>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Pre-screening */}
                <div className="rounded-xl border border-white/5 bg-white/[0.03] overflow-hidden">
                  <button
                    onClick={() => setOpenSection(openSection === "screening" ? null : "screening")}
                    className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-white/[0.02] transition-colors"
                  >
                    <span className="text-sm font-medium text-white">{copy.preScreening} ({editQuestions.length})</span>
                    <motion.div animate={{ rotate: openSection === "screening" ? 180 : 0 }} transition={{ duration: 0.2 }}>
                      <ChevronDown className="w-4 h-4 text-slate-500" />
                    </motion.div>
                  </button>
                  <AnimatePresence>
                    {openSection === "screening" && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="px-4 pb-4 space-y-2">
                          {editQuestions.map((q, i) => (
                            <div key={i} className="flex gap-2">
                              <input
                                type="text"
                                value={q}
                                onChange={(e) => {
                                  const next = [...editQuestions];
                                  next[i] = e.target.value;
                                  setEditQuestions(next);
                                }}
                                placeholder={copy.questionPlaceholder}
                                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-sky-500/30 transition-all"
                              />
                              <button
                                onClick={() => handleRemoveQuestion(i)}
                                className="text-xs text-slate-500 hover:text-rose-400 transition-colors px-2"
                              >
                                {copy.remove}
                              </button>
                            </div>
                          ))}
                          <button
                            onClick={handleAddQuestion}
                            className="text-xs text-sky-400 hover:text-sky-300 flex items-center gap-1 transition-colors"
                          >
                            <Plus className="w-3 h-3" /> {copy.add}
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Document Signing */}
                <div className="rounded-xl border border-white/5 bg-white/[0.03] overflow-hidden">
                  <button
                    onClick={() => setOpenSection(openSection === "docs" ? null : "docs")}
                    className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-white/[0.02] transition-colors"
                  >
                    <span className="text-sm font-medium text-white">{copy.docSigning}</span>
                    <motion.div animate={{ rotate: openSection === "docs" ? 180 : 0 }} transition={{ duration: 0.2 }}>
                      <ChevronDown className="w-4 h-4 text-slate-500" />
                    </motion.div>
                  </button>
                  <AnimatePresence>
                    {openSection === "docs" && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="px-4 pb-4 space-y-3">
                          <label className="flex items-start gap-3 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={docSigningEnabled}
                              onChange={(e) => setDocSigningEnabled(e.target.checked)}
                              className="mt-0.5 rounded border-white/20 bg-white/5 text-sky-500 focus:ring-sky-500/30"
                            />
                            <span className="text-sm text-slate-300">{copy.requireDocSign}</span>
                          </label>
                          <div className="flex gap-2">
                            <input
                              type="file"
                              accept=".pdf,.doc,.docx"
                              onChange={(e) => setTemplateFile(e.target.files?.[0] || null)}
                              className="flex-1 text-xs text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:bg-white/5 file:text-white hover:file:bg-white/10 transition-all"
                            />
                            <button
                              onClick={handleUploadTemplate}
                              disabled={!templateFile || uploadingTemplate}
                              className="bg-gradient-to-r from-sky-500 to-teal-500 hover:from-sky-400 hover:to-teal-400 disabled:opacity-50 text-white px-3 py-2 rounded-xl text-xs font-medium transition-all shadow-lg shadow-sky-500/20"
                            >
                              {uploadingTemplate ? copy.uploading : copy.uploadTemplate}
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Privacy */}
                <div className="rounded-xl border border-white/5 bg-white/[0.03] overflow-hidden">
                  <button
                    onClick={() => setOpenSection(openSection === "privacy" ? null : "privacy")}
                    className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-white/[0.02] transition-colors"
                  >
                    <span className="text-sm font-medium text-white">{copy.privacy}</span>
                    <motion.div animate={{ rotate: openSection === "privacy" ? 180 : 0 }} transition={{ duration: 0.2 }}>
                      <ChevronDown className="w-4 h-4 text-slate-500" />
                    </motion.div>
                  </button>
                  <AnimatePresence>
                    {openSection === "privacy" && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="px-4 pb-4">
                          <label className="flex items-start gap-3 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={showVisitorList}
                              onChange={(e) => setShowVisitorList(e.target.checked)}
                              className="mt-0.5 rounded border-white/20 bg-white/5 text-sky-500 focus:ring-sky-500/30"
                            />
                            <span className="text-sm text-slate-300">{copy.showVisitorList}</span>
                          </label>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <MagneticButton
                  onClick={saveEdit}
                  disabled={savingEdit}
                  className="w-full bg-gradient-to-r from-sky-500 to-teal-500 hover:from-sky-400 hover:to-teal-400 disabled:opacity-50 text-white px-4 py-3 rounded-xl text-sm font-medium transition-all shadow-lg shadow-sky-500/20"
                >
                  {savingEdit ? copy.saving : copy.saveChanges}
                </MagneticButton>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation */}
      <ConfirmModal
        open={!!deleteSiteId}
        title={copy.deleteSite}
        message={copy.deleteSiteConfirm}
        confirmLabel={copy.delete}
        onConfirm={handleDeleteSite}
        onCancel={() => setDeleteSiteId(null)}
      />

      {/* QR Modal */}
      {qrSite && (
        <QRModal
          open={true}
          siteName={qrSite.name}
          qrUrl={`${typeof window !== "undefined" ? window.location.origin : ""}/api/sites/${qrSite.id}/qr`}
          onClose={() => setQrSite(null)}
        />
      )}

      {/* Tutorial */}
      {showTutorial && <DashboardTutorial locale={locale} />}
    </div>
  );
}