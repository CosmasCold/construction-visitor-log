// app/(checkin)/checkin/[siteSlug]/CheckinClient.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  ClipboardCheck,
  LogOut,
  Clock,
  AlertTriangle,
  Users,
  QrCode,
  Printer,
  Camera,
  XCircle,
  FileText,
  ChevronRight,
  Check,
  User,
  Briefcase,
  Phone,
  Mail,
  UserCircle,
  Shield,
  PenTool,
  X,
} from "lucide-react";

type ActiveVisitor = {
  id: string;
  fullName: string;
  company: string;
  hostName?: string | null;
  signedInAt: string;
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

export default function CheckinClient({
  siteId,
  siteName,
  safetyBriefing,
  questions = [],
}: {
  siteId: string;
  siteName: string;
  safetyBriefing: string;
  questions?: string[];
}) {
  const [fullName, setFullName] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [hostName, setHostName] = useState("");
  const [selectedHostId, setSelectedHostId] = useState<string>("");
  const [hosts, setHosts] = useState<Host[]>([]);
  const [safetyAcknowledged, setSafetyAcknowledged] = useState(false);
  const [activeVisitors, setActiveVisitors] = useState<ActiveVisitor[]>([]);
  const [loading, setLoading] = useState(false);
  const [showQr, setShowQr] = useState(false);
  const [expectedVisitors, setExpectedVisitors] = useState<ExpectedVisitor[]>([]);

  // Pre‑screening answers
  const [answers, setAnswers] = useState<Record<string, boolean>>({});

  // Photo capture state
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  // Error message
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Document signing state – hardcoded to true for now to always show the section
  const [documentSigningEnabled, setDocumentSigningEnabled] = useState(true);
  const [documentTemplateData, setDocumentTemplateData] = useState<string | null>(null);
  const [showSignaturePad, setShowSignaturePad] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);
  const [signatureDataUrl, setSignatureDataUrl] = useState<string | null>(null);
  const [signatureUrl, setSignatureUrl] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Visitor list privacy
  const [showVisitorList, setShowVisitorList] = useState(true);

  // Progress steps
  const steps = ["Safety", "Details", "Photo", "Sign"];
  const [currentStep, setCurrentStep] = useState(0);

  // Fetch hosts
  useEffect(() => {
    fetch(`/api/sites/${siteId}/hosts`)
      .then((res) => res.json())
      .then((data) => setHosts(Array.isArray(data) ? data : []))
      .catch(() => setHosts([]));
  }, [siteId]);

  // Fetch expected visitors
  useEffect(() => {
    fetch(`/api/sites/${siteId}/expected-visitors`)
      .then((res) => res.json())
      .then((data) => setExpectedVisitors(Array.isArray(data) ? data : []))
      .catch(() => setExpectedVisitors([]));
  }, [siteId]);

  // Fetch site settings – currently forcing document signing enabled for visibility
  useEffect(() => {
    fetch(`/api/sites/${siteId}`)
      .then((res) => res.json())
      .then((data) => {
        // setDocumentSigningEnabled(data.documentSigningEnabled || false);
        setDocumentSigningEnabled(true); // Force on – always show the signature pad
        setDocumentTemplateData(data.documentTemplateData || null);
        setShowVisitorList(data.showVisitorListOnCheckin ?? true);
      })
      .catch(() => {});
  }, [siteId]);

  // Fetch active visitors + auto‑refresh
  useEffect(() => {
    async function fetchActiveVisitors() {
      const res = await fetch(`/api/checkin/${siteId}/active`);
      if (res.ok) {
        const data = await res.json();
        setActiveVisitors(data);
      }
    }
    fetchActiveVisitors();
    const interval = setInterval(fetchActiveVisitors, 5000);
    return () => clearInterval(interval);
  }, [siteId]);

  async function capturePhoto(): Promise<string | null> {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user" },
      });
      const video = document.createElement("video");
      video.srcObject = stream;
      video.play();
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const canvas = document.createElement("canvas");
      canvas.width = video.videoWidth || 320;
      canvas.height = video.videoHeight || 240;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      }
      const dataUrl = canvas.toDataURL("image/jpeg", 0.8);
      stream.getTracks().forEach((track) => track.stop());
      video.remove();
      return dataUrl;
    } catch (err) {
      alert("Could not access camera: " + (err as Error).message);
      return null;
    }
  }

  async function uploadPhoto(dataUrl: string): Promise<string | null> {
    setUploading(true);
    // eslint-disable-next-line react-hooks/purity
    const fileName = `visitor-${Date.now()}.jpg`;
    const res = await fetch("/api/upload", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        imageBase64: dataUrl,
        fileName,
      }),
    });
    if (res.ok) {
      const data = await res.json();
      setPhotoUrl(data.url);
      setUploading(false);
      setCurrentStep(3);
      return data.url;
    }
    setUploading(false);
    alert("Failed to upload photo. Try again.");
    return null;
  }

  // Signature pad handlers
  function clearSignature() {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
      setSignatureDataUrl(null);
    }
  }

  function startDrawing(e: React.MouseEvent | React.TouchEvent) {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    ctx.beginPath();
    ctx.moveTo(x, y);
  }

  function draw(e: React.MouseEvent | React.TouchEvent) {
    if (!isDrawing) return;
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#000";
    ctx.lineTo(x, y);
    ctx.stroke();
  }

  function stopDrawing() {
    setIsDrawing(false);
    const canvas = canvasRef.current;
    if (canvas) {
      setSignatureDataUrl(canvas.toDataURL("image/png"));
    }
  }

  async function uploadSignature(dataUrl: string): Promise<string | null> {
    setUploading(true);
    // eslint-disable-next-line react-hooks/purity
    const fileName = `sig-${Date.now()}.png`;
    const res = await fetch("/api/upload", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        imageBase64: dataUrl,
        fileName,
      }),
    });
    if (res.ok) {
      const data = await res.json();
      setSignatureUrl(data.url);
      setUploading(false);
      clearSignature();           // clear canvas
      setShowSignaturePad(false); // collapse pad
      setCurrentStep(4);
      return data.url;
    }
    setUploading(false);
    return null;
  }

  async function handleSignIn(e: React.FormEvent) {
    e.preventDefault();
    setErrorMessage(null);

    if (!fullName || !company) {
      setErrorMessage("Full name and company are required.");
      return;
    }
    if (!safetyAcknowledged) {
      setErrorMessage("You must acknowledge the safety briefing before signing in.");
      return;
    }
    if (documentSigningEnabled && !signatureUrl) {
      setErrorMessage("You must sign the document before signing in.");
      return;
    }
    setLoading(true);

    const body: Record<string, unknown> = {
      fullName,
      company,
      phone: phone || undefined,
      email: email || undefined,
      hostName: selectedHostId ? undefined : hostName || undefined,
      hostId: selectedHostId || undefined,
      safetyAcknowledged,
      siteId,
      answers: Object.keys(answers).length > 0 ? answers : undefined,
      photoUrl: photoUrl || undefined,
      signatureUrl: signatureUrl || undefined,
    };

    const res = await fetch("/api/checkin/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await res.json();

    if (res.ok) {
      alert("Signed in successfully.");
      setFullName("");
      setCompany("");
      setPhone("");
      setEmail("");
      setHostName("");
      setSelectedHostId("");
      setSafetyAcknowledged(false);
      setAnswers({});
      setPhotoUrl(null);
      setSignatureUrl(null);
      setSignatureDataUrl(null);
      clearSignature();            // clear canvas
      setShowSignaturePad(false);  // collapse pad
      setErrorMessage(null);
      setCurrentStep(0);
      const refresh = await fetch(`/api/checkin/${siteId}/active`);
      if (refresh.ok) setActiveVisitors(await refresh.json());
      const refreshExpected = await fetch(`/api/sites/${siteId}/expected-visitors`);
      if (refreshExpected.ok) setExpectedVisitors(await refreshExpected.json());
    } else {
      if (res.status === 403 && data.blocked) {
        setErrorMessage(data.message || "Your entry has been flagged. Please contact security.");
      } else {
        setErrorMessage(data.error || "Sign‑in failed.");
      }
    }
    setLoading(false);
  }

  async function handleQuickSignIn(visitor: ExpectedVisitor) {
    if (!safetyAcknowledged) {
      setErrorMessage("You must acknowledge the safety briefing first.");
      return;
    }
    if (documentSigningEnabled && !signatureUrl) {
      setErrorMessage("You must sign the document before signing in.");
      return;
    }
    setErrorMessage(null);
    const res = await fetch("/api/checkin/quick-signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        expectedVisitorId: visitor.id,
        safetyAcknowledged: true,
        siteId,
        signatureUrl: signatureUrl || undefined,
      }),
    });
    if (res.ok) {
      alert(`${visitor.name} signed in.`);
      const refreshExpected = await fetch(`/api/sites/${siteId}/expected-visitors`);
      if (refreshExpected.ok) setExpectedVisitors(await refreshExpected.json());
      const refreshActive = await fetch(`/api/checkin/${siteId}/active`);
      if (refreshActive.ok) setActiveVisitors(await refreshActive.json());
      setSafetyAcknowledged(false);
      setSignatureUrl(null);
      setSignatureDataUrl(null);
      clearSignature();            // clear canvas
      setShowSignaturePad(false);  // collapse pad
      setErrorMessage(null);
      setCurrentStep(0);
    } else {
      const data = await res.json().catch(() => ({}));
      if (data.blocked) {
        setErrorMessage(data.message);
      } else {
        setErrorMessage("Sign‑in failed.");
      }
    }
  }

  function printBadgeForVisitor(
    visitorName: string,
    visitorCompany: string,
    visitorHost?: string | null,
    photoUrl?: string | null
  ) {
    const win = window.open("", "_blank", "width=500,height=400");
    if (win) {
      win.document.write(`
        <html>
          <head>
            <title>Visitor Badge</title>
            <style>
              @page { size: 4in 3in; margin: 0; }
              body {
                width: 4in; height: 3in;
                display: flex; align-items: center; justify-content: center;
                font-family: system-ui, sans-serif; margin: 0 auto;
              }
              .badge { text-align: center; padding: 12px; border: 1px dashed #ccc; border-radius: 8px; width: 100%; }
              img { width: 80px; height: 80px; object-fit: cover; border-radius: 6px; margin-bottom: 6px; }
              h2 { margin: 0 0 4px; font-size: 14px; }
              p { margin: 2px 0; font-size: 12px; }
              hr { border: 0.5px solid #ccc; margin: 8px 0; }
            </style>
          </head>
          <body>
            <div class="badge">
              <h2>${siteName}</h2>
              <hr />
              ${photoUrl ? `<img src="${photoUrl}" alt="${visitorName}" />` : ""}
              <p><strong>${visitorName}</strong></p>
              <p>${visitorCompany}</p>
              ${visitorHost ? `<p>Host: ${visitorHost}</p>` : ""}
              <p>${new Date().toLocaleString()}</p>
              <small>SiteSafe visitor log</small>
            </div>
          </body>
        </html>
      `);
      win.document.close();
      setTimeout(() => win.print(), 200);
    }
  }

  async function handleSignOut(id: string) {
    const res = await fetch("/api/checkin/signout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    if (res.ok) {
      const refresh = await fetch(`/api/checkin/${siteId}/active`);
      if (refresh.ok) setActiveVisitors(await refresh.json());
    } else {
      setErrorMessage("Sign‑out failed");
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0f1c] text-slate-200 py-6 px-4 sm:py-10">
      <div className="w-full max-w-lg mx-auto space-y-6">

        {/* ─── Header ─── */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-sky-500/10 border border-sky-500/20 mb-2">
            <ClipboardCheck className="w-6 h-6 text-sky-400" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            {siteName}
          </h1>
          <p className="text-sm text-slate-500">Visitor Check-In</p>
        </div>

        {/* ─── Progress Steps ─── */}
        <div className="flex items-center justify-between px-2">
          {steps.map((step, i) => (
            <div key={i} className="flex flex-col items-center gap-1.5 flex-1">
              <div className={`
                w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300
                ${i < currentStep 
                  ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" 
                  : i === currentStep 
                    ? "bg-sky-500 text-white ring-4 ring-sky-500/20" 
                    : "bg-white/5 text-slate-600 border border-white/10"
                }
              `}>
                {i < currentStep ? <Check className="w-4 h-4" /> : i + 1}
              </div>
              <span className={`
                text-[10px] font-medium uppercase tracking-wider transition-colors
                ${i <= currentStep ? "text-slate-300" : "text-slate-600"}
              `}>
                {step}
              </span>
              {i < steps.length - 1 && (
                <div className={`
                  absolute h-px w-full top-4 left-1/2 -z-10
                  ${i < currentStep ? "bg-emerald-500/30" : "bg-white/5"}
                `} style={{ width: 'calc(100% - 2rem)', marginLeft: '1rem' }} />
              )}
            </div>
          ))}
        </div>

        {/* ─── Error Banner ─── */}
        {errorMessage && (
          <div className="rounded-xl bg-rose-500/10 border border-rose-500/20 p-4 flex items-start gap-3 animate-fade-in-up">
            <XCircle className="w-5 h-5 text-rose-400 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-rose-200 leading-relaxed">{errorMessage}</p>
          </div>
        )}

        {/* ─── Safety Briefing ─── */}
        <div className="rounded-xl border border-white/5 bg-white/[0.03] overflow-hidden">
          <div className="bg-sky-500/10 border-b border-sky-500/20 px-5 py-3 flex items-center gap-2">
            <Shield className="w-4 h-4 text-sky-400" />
            <h2 className="text-xs font-bold uppercase tracking-wider text-sky-300">
              Safety Briefing
            </h2>
          </div>
          <div className="p-5">
            <p className="text-sm text-slate-300 leading-relaxed">{safetyBriefing}</p>
            <label className="flex items-start gap-3 mt-5 p-3 rounded-lg bg-white/5 border border-white/5 cursor-pointer hover:bg-white/[0.07] transition-colors">
              <input
                type="checkbox"
                checked={safetyAcknowledged}
                onChange={(e) => {
                  setSafetyAcknowledged(e.target.checked);
                  if (e.target.checked) setCurrentStep(1);
                }}
                className="mt-0.5 h-5 w-5 rounded border-slate-600 bg-white/10 text-sky-500 focus:ring-sky-500/50"
              />
              <span className="text-sm text-slate-200 leading-snug">
                I have read and understand the site safety briefing
              </span>
            </label>
          </div>
        </div>

        {/* ─── Pre-screening Questions ─── */}
        {questions.length > 0 && (
          <div className="rounded-xl border border-white/5 bg-white/[0.03] overflow-hidden">
            <div className="bg-amber-500/10 border-b border-amber-500/20 px-5 py-3 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              <h2 className="text-xs font-bold uppercase tracking-wider text-amber-300">
                Pre-screening
              </h2>
            </div>
            <div className="p-5 space-y-3">
              {questions.map((q, idx) => (
                <label key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-white/5 border border-white/5 cursor-pointer hover:bg-white/[0.07] transition-colors">
                  <input
                    type="checkbox"
                    checked={answers[q] || false}
                    onChange={(e) =>
                      setAnswers((prev) => ({ ...prev, [q]: e.target.checked }))
                    }
                    className="mt-0.5 h-5 w-5 rounded border-slate-600 bg-white/10 text-sky-500 focus:ring-sky-500/50"
                  />
                  <span className="text-sm text-slate-200 leading-snug">{q}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* ─── Document Signing ─── */}
        {documentSigningEnabled && (
          <div className="rounded-xl border border-white/5 bg-white/[0.03] overflow-hidden">
            <div className="bg-violet-500/10 border-b border-violet-500/20 px-5 py-3 flex items-center gap-2">
              <FileText className="w-4 h-4 text-violet-400" />
              <h2 className="text-xs font-bold uppercase tracking-wider text-violet-300">
                Document Signing
              </h2>
            </div>
            <div className="p-5 space-y-4">
              {documentTemplateData && (
                <a
                  href={documentTemplateData ?? "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-violet-400 hover:text-violet-300 underline underline-offset-2"
                >
                  <FileText className="w-3.5 h-3.5" /> View document
                </a>
              )}
              
              {!signatureUrl ? (
                <>
                  <button
                    onClick={() => {
                      if (showSignaturePad) {
                        clearSignature();
                      }
                      setShowSignaturePad(!showSignaturePad);
                    }}
                    className={`
                      w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-medium transition-all
                      ${showSignaturePad 
                        ? "bg-white/10 text-white border border-white/10" 
                        : "bg-violet-500/10 text-violet-300 border border-violet-500/20 hover:bg-violet-500/20"
                      }
                    `}
                  >
                    <PenTool className="w-4 h-4" />
                    {showSignaturePad ? "Cancel signing" : "Sign document"}
                  </button>

                  {showSignaturePad && (
                    <div className="space-y-3 animate-fade-in-up">
                      <div className="relative rounded-xl border border-white/10 bg-white overflow-hidden">
                        <canvas
                          ref={canvasRef}
                          width={400}
                          height={120}
                          className="w-full h-[120px] touch-none cursor-crosshair"
                          onMouseDown={startDrawing}
                          onMouseMove={draw}
                          onMouseUp={stopDrawing}
                          onMouseLeave={stopDrawing}
                          onTouchStart={startDrawing}
                          onTouchMove={draw}
                          onTouchEnd={stopDrawing}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <button
                          onClick={clearSignature}
                          className="text-xs text-slate-500 hover:text-white transition-colors px-3 py-1.5 rounded-lg hover:bg-white/5"
                        >
                          Clear
                        </button>
                        {signatureDataUrl && (
                          <button
                            onClick={async () => {
                              const url = await uploadSignature(signatureDataUrl!);
                              if (url) setSignatureUrl(url);
                            }}
                            disabled={uploading}
                            className="bg-violet-500 hover:bg-violet-600 disabled:opacity-50 text-white px-4 py-1.5 rounded-lg text-xs font-medium transition-all"
                          >
                            {uploading ? "Saving…" : "Accept signature"}
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="flex items-center gap-2 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-sm text-emerald-300">Signature captured</span>
                  <button
                    onClick={() => {
                      setSignatureUrl(null);
                      setSignatureDataUrl(null);
                      clearSignature();
                    }}
                    className="ml-auto text-xs text-slate-500 hover:text-white transition-colors"
                  >
                    Redo
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ─── Expected Visitors ─── */}
        {expectedVisitors.length > 0 && (
          <div className="rounded-xl border border-white/5 bg-white/[0.03] overflow-hidden">
            <div className="bg-emerald-500/10 border-b border-emerald-500/20 px-5 py-3 flex items-center gap-2">
              <Users className="w-4 h-4 text-emerald-400" />
              <h2 className="text-xs font-bold uppercase tracking-wider text-emerald-300">
                Expected Today
              </h2>
            </div>
            <div className="divide-y divide-white/5">
              {expectedVisitors.map((visitor) => (
                <div key={visitor.id} className="flex items-center justify-between p-4 hover:bg-white/[0.02] transition-colors">
                  <div>
                    <p className="text-sm font-medium text-white">{visitor.name}</p>
                    <p className="text-xs text-slate-500">{visitor.company}</p>
                  </div>
                  <button
                    onClick={() => handleQuickSignIn(visitor)}
                    className="bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/20 px-4 py-2 rounded-lg text-xs font-medium transition-all active:scale-[0.98]"
                  >
                    Quick Sign In
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ─── Sign-In Form ─── */}
        <div className="rounded-xl border border-white/5 bg-white/[0.03] overflow-hidden">
          <div className="bg-white/5 border-b border-white/5 px-5 py-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Visitor Details
            </h2>
          </div>
          <form onSubmit={handleSignIn} className="p-5 space-y-4">
            {/* Name */}
            <div className="relative">
              <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
              <input
                type="text"
                placeholder="Full name"
                value={fullName}
                onChange={(e) => {
                  setFullName(e.target.value);
                  if (e.target.value && company) setCurrentStep(2);
                }}
                required
                className="w-full bg-white/5 border border-white/10 rounded-xl pl-11 pr-4 py-3.5 text-base text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-sky-500/50 focus:border-sky-500/30 transition-all"
              />
            </div>

            {/* Company */}
            <div className="relative">
              <Briefcase className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
              <input
                type="text"
                placeholder="Company / Trade"
                value={company}
                onChange={(e) => {
                  setCompany(e.target.value);
                  if (fullName && e.target.value) setCurrentStep(2);
                }}
                required
                className="w-full bg-white/5 border border-white/10 rounded-xl pl-11 pr-4 py-3.5 text-base text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-sky-500/50 focus:border-sky-500/30 transition-all"
              />
            </div>

            {/* Phone */}
            <div className="relative">
              <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
              <input
                type="tel"
                placeholder="Phone (optional)"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl pl-11 pr-4 py-3.5 text-base text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-sky-500/50 focus:border-sky-500/30 transition-all"
              />
            </div>

            {/* Email */}
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
              <input
                type="email"
                placeholder="Email (optional)"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl pl-11 pr-4 py-3.5 text-base text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-sky-500/50 focus:border-sky-500/30 transition-all"
              />
            </div>

            {/* Host */}
            {hosts.length > 0 ? (
              <div className="relative">
                <UserCircle className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
                <select
                  value={selectedHostId}
                  onChange={(e) => {
                    setSelectedHostId(e.target.value);
                    if (e.target.value) {
                      setHostName(hosts.find((h) => h.id === e.target.value)?.name || "");
                    } else setHostName("");
                  }}
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-11 pr-4 py-3.5 text-base text-white focus:outline-none focus:ring-2 focus:ring-sky-500/50 focus:border-sky-500/30 transition-all appearance-none"
                >
                  <option value="" className="bg-[#0f172a] text-slate-400">Select a host (optional)</option>
                  {hosts.map((host) => (
                    <option key={host.id} value={host.id} className="bg-[#0f172a]">
                      {host.name}
                    </option>
                  ))}
                </select>
                <ChevronRight className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 rotate-90 pointer-events-none" />
              </div>
            ) : (
              <div className="relative">
                <UserCircle className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Host name (optional)"
                  value={hostName}
                  onChange={(e) => setHostName(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-11 pr-4 py-3.5 text-base text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-sky-500/50 focus:border-sky-500/30 transition-all"
                />
              </div>
            )}

            {/* Photo Capture */}
            <div className="pt-2">
              {photoUrl ? (
                <div className="flex flex-col items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/5">
                  <div className="relative">
                    <img src={photoUrl ?? ""} alt="Visitor" className="w-28 h-28 rounded-xl object-cover ring-2 ring-white/10" />
                    <button
                      type="button"
                      onClick={() => setPhotoUrl(null)}
                      className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-rose-500 text-white flex items-center justify-center text-xs hover:bg-rose-600 transition-colors shadow-lg"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      printBadgeForVisitor(
                        fullName || "Visitor",
                        company || "",
                        selectedHostId
                          ? hosts.find((h) => h.id === selectedHostId)?.name
                          : hostName,
                        photoUrl
                      )
                    }
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 border border-white/10 text-sm text-white hover:bg-white/20 transition-all active:scale-[0.98]"
                  >
                    <Printer className="w-4 h-4" /> Print Badge
                  </button>
                </div>
              ) : uploading ? (
                <div className="flex items-center justify-center gap-2 py-8 rounded-xl bg-white/5 border border-white/5 border-dashed">
                  <div className="w-5 h-5 border-2 border-sky-400 border-t-transparent rounded-full animate-spin" />
                  <span className="text-sm text-sky-400">Uploading photo…</span>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={async () => {
                    const dataUrl = await capturePhoto();
                    if (dataUrl) {
                      await uploadPhoto(dataUrl);
                    }
                  }}
                  disabled={uploading}
                  className="w-full flex flex-col items-center justify-center gap-2 py-8 rounded-xl bg-white/5 border border-white/5 border-dashed hover:bg-white/[0.07] hover:border-white/10 transition-all active:scale-[0.98] group"
                >
                  <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-sky-500/10 transition-colors">
                    <Camera className="w-5 h-5 text-slate-500 group-hover:text-sky-400 transition-colors" />
                  </div>
                  <span className="text-sm text-slate-500 group-hover:text-slate-300 transition-colors">Take photo</span>
                </button>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-sky-500 hover:bg-sky-600 disabled:bg-sky-500/30 text-white font-semibold tracking-wide rounded-xl px-6 py-4 text-base transition-all duration-200 active:scale-[0.98] flex items-center justify-center gap-2 mt-6"
            >
              <ClipboardCheck className="w-5 h-5" />
              {loading ? "Signing in…" : "Sign In"}
            </button>
          </form>
        </div>

        {/* ─── Active Visitors ─── */}
        {showVisitorList && (
          <div className="rounded-xl border border-white/5 bg-white/[0.03] overflow-hidden">
            <div className="bg-white/5 border-b border-white/5 px-5 py-3 flex items-center justify-between">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                <Users className="w-3.5 h-3.5" /> Currently on Site
              </h2>
              <span className="inline-flex items-center justify-center min-w-[24px] h-6 rounded-full bg-sky-500/10 text-sky-300 text-xs font-bold px-2">
                {activeVisitors.length}
              </span>
            </div>
            {activeVisitors.length === 0 ? (
              <div className="p-6 text-center">
                <p className="text-sm text-slate-600">No active visitors</p>
              </div>
            ) : (
              <div className="divide-y divide-white/5">
                {activeVisitors.map((v) => (
                  <div
                    key={v.id}
                    className="flex items-center justify-between p-4 hover:bg-white/[0.02] transition-colors"
                  >
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-white truncate">{v.fullName}</p>
                      <p className="text-xs text-slate-500">{v.company}</p>
                      {v.hostName && (
                        <p className="text-xs text-sky-400 mt-0.5">Host: {v.hostName}</p>
                      )}
                      <p className="text-[10px] text-slate-600 mt-1 flex items-center gap-1">
                        <Clock className="w-2.5 h-2.5" />
                        {new Date(v.signedInAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0 ml-3">
                      <button
                        onClick={() => printBadgeForVisitor(v.fullName, v.company, v.hostName)}
                        className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-all"
                        title="Print badge"
                      >
                        <Printer className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleSignOut(v.id)}
                        className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white/5 hover:bg-rose-500/10 text-slate-400 hover:text-rose-300 transition-all text-xs font-medium"
                      >
                        <LogOut className="w-3.5 h-3.5" /> Sign out
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ─── QR Code (Staff use) ─── */}
        <div className="text-center pt-4">
          <button
            onClick={() => setShowQr(!showQr)}
            className="inline-flex items-center gap-1.5 text-xs text-slate-600 hover:text-slate-400 transition-colors"
          >
            <QrCode className="w-3.5 h-3.5" />
            {showQr ? "Hide QR code" : "Show QR code for this site"}
          </button>
          {showQr && (
            <div className="mt-4 flex justify-center">
              <div className="p-4 rounded-xl bg-white border border-white/10">
                <Image
                  src={`/api/sites/${siteId}/qr`}
                  alt="QR code for check-in"
                  width={200}
                  height={200}
                  unoptimized
                  className="rounded-lg"
                />
                <p className="text-xs text-slate-600 text-center mt-2 font-medium">
                  Scan to check in
                </p>
              </div>
            </div>
          )}
        </div>

        <p className="text-center text-[10px] text-slate-700 pt-4 pb-2">
          Secure digital log • SiteSafe by TheSift
        </p>
      </div>
    </div>
  );
}