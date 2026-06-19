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

  // Document signing state
  const [documentSigningEnabled, setDocumentSigningEnabled] = useState(false);
  const [documentTemplateData, setDocumentTemplateData] = useState<string | null>(null);
  const [showSignaturePad, setShowSignaturePad] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);
  const [signatureDataUrl, setSignatureDataUrl] = useState<string | null>(null);
  const [signatureUrl, setSignatureUrl] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Visitor list privacy
  const [showVisitorList, setShowVisitorList] = useState(true);

  // Progress steps
  const steps = ["Safety", "Info", "Photo", "Sign"];
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

  // Fetch site settings for document signing and visitor list privacy
  useEffect(() => {
    fetch(`/api/sites/${siteId}`)
      .then((res) => res.json())
      .then((data) => {
        setDocumentSigningEnabled(data.documentSigningEnabled || false);
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
    const res = await fetch("/api/upload", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        imageBase64: dataUrl,
        fileName: `visitor-${Date.now()}.jpg`,
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
    const res = await fetch("/api/upload", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        imageBase64: dataUrl,
        fileName: `sig-${Date.now()}.png`,
      }),
    });
    if (res.ok) {
      const data = await res.json();
      setSignatureUrl(data.url);
      setUploading(false);
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
    <div className="min-h-screen flex items-center justify-center py-10 px-4">
      <div className="w-full max-w-md space-y-6 animate-fade-in-up">
        {/* Header + QR */}
        <div className="text-center">
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center justify-center gap-2">
            <ClipboardCheck className="w-6 h-6 text-sky-400" /> {siteName}
          </h1>
          <p className="text-slate-400 text-sm mt-1">Visitor sign‑in</p>
          <button
            onClick={() => setShowQr(!showQr)}
            className="text-sky-400 hover:text-sky-300 text-xs underline underline-offset-2 transition-colors duration-150 mt-2 flex items-center justify-center gap-1 mx-auto"
          >
            <QrCode className="w-4 h-4" />
            {showQr ? "Hide QR" : "Scan QR to open on your phone"}
          </button>
          {showQr && (
            <div className="mt-3 flex justify-center">
              <Image
                src={`/api/sites/${siteId}/qr`}
                alt="QR code for check‑in"
                width={192}
                height={192}
                unoptimized
                className="bg-white p-2 rounded-xl shadow-lg"
              />
            </div>
          )}
        </div>

        {/* Progress indicator */}
        <div className="step-indicator">
          {steps.map((step, i) => (
            <div
              key={i}
              className={`step ${i === currentStep ? "active" : i < currentStep ? "completed" : ""}`}
            />
          ))}
        </div>

        {/* Safety briefing */}
        <div className="bg-sky-500/10 backdrop-blur-lg rounded-2xl border-l-4 border-sky-400 p-5 shadow-card-dipped flex gap-3 accent-glow">
          <AlertTriangle className="w-5 h-5 text-sky-400 flex-shrink-0 mt-0.5" />
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-sky-300 mb-1">
              Safety Briefing
            </h2>
            <p className="text-sm text-slate-200 leading-relaxed">{safetyBriefing}</p>
          </div>
        </div>

        {/* Safety acknowledgment checkbox */}
        <label className="flex items-center gap-2 text-sm text-slate-200 justify-center">
          <input
            type="checkbox"
            checked={safetyAcknowledged}
            onChange={(e) => {
              setSafetyAcknowledged(e.target.checked);
              if (e.target.checked) setCurrentStep(1);
            }}
            className="h-4 w-4 rounded border-slate-600 bg-white/10 text-sky-500 focus:ring-sky-500/50"
          />
          I have read and understand the site safety briefing.
        </label>

        {/* Pre‑screening questions */}
        {questions.length > 0 && (
          <div className="bg-white/[0.10] backdrop-blur-lg rounded-2xl border border-white/10 shadow-card-raised p-6 accent-glow aurora-bg">
            <h3 className="text-sm font-semibold text-white mb-3">Pre‑screening questions</h3>
            {questions.map((q, idx) => (
              <label key={idx} className="flex items-center gap-2 text-sm text-slate-200 mb-2">
                <input
                  type="checkbox"
                  checked={answers[q] || false}
                  onChange={(e) =>
                    setAnswers((prev) => ({ ...prev, [q]: e.target.checked }))
                  }
                  className="h-4 w-4 rounded border-slate-600 bg-white/10 text-sky-500 focus:ring-sky-500/50"
                />
                {q}
              </label>
            ))}
          </div>
        )}

        {/* Document signing */}
        {documentSigningEnabled && (
          <div className="bg-white/[0.10] backdrop-blur-lg rounded-2xl border border-white/10 shadow-card-raised p-6 accent-glow aurora-bg">
            <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
              <FileText className="w-4 h-4 text-sky-400" /> Document Signing
            </h3>
            {documentTemplateData && (
              <a
                href={documentTemplateData ?? "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sky-400 hover:text-sky-300 text-xs underline mb-3 block"
              >
                View the document
              </a>
            )}
            <button
              onClick={() => setShowSignaturePad(!showSignaturePad)}
              className="text-sky-400 text-xs hover:text-sky-300 mb-2"
            >
              {showSignaturePad ? "Hide signature pad" : "Sign the document"}
            </button>
            {showSignaturePad && (
              <div className="space-y-2">
                <canvas
                  ref={canvasRef}
                  width={300}
                  height={100}
                  className="border border-white/10 bg-white rounded"
                  onMouseDown={startDrawing}
                  onMouseMove={draw}
                  onMouseUp={stopDrawing}
                  onMouseLeave={stopDrawing}
                  onTouchStart={startDrawing}
                  onTouchMove={draw}
                  onTouchEnd={stopDrawing}
                />
                <button onClick={clearSignature} className="text-xs text-slate-400 hover:text-white">
                  Clear
                </button>
                {signatureDataUrl && (
                  <div className="flex gap-2 items-center">
                    <img src={signatureDataUrl ?? ""} alt="Preview" className="h-8 bg-white rounded" />
                    <button
                      onClick={async () => {
                        const url = await uploadSignature(signatureDataUrl!);
                        if (url) setSignatureUrl(url);
                      }}
                      disabled={uploading}
                      className="text-xs bg-sky-500 hover:bg-sky-600 text-white px-3 py-1 rounded"
                    >
                      {uploading ? "Uploading…" : "Accept signature"}
                    </button>
                  </div>
                )}
              </div>
            )}
            {signatureUrl && (
              <p className="text-emerald-400 text-xs mt-2">Signature captured</p>
            )}
          </div>
        )}

        {/* Expected visitors (quick sign‑in) */}
        {expectedVisitors.length > 0 && (
          <div className="bg-white/[0.10] backdrop-blur-lg rounded-2xl border border-white/10 shadow-card-raised p-6 accent-glow aurora-bg">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-200 mb-3">
              Expected today
            </h2>
            <ul className="divide-y divide-white/5">
              {expectedVisitors.map((visitor) => (
                <li key={visitor.id} className="py-2 flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium text-white">{visitor.name}</p>
                    <p className="text-xs text-slate-400">{visitor.company}</p>
                  </div>
                  <button
                    onClick={() => handleQuickSignIn(visitor)}
                    className="bg-sky-500 hover:bg-sky-600 text-white px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200"
                  >
                    Sign in
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Sign‑in form */}
        <div className="bg-white/[0.10] backdrop-blur-lg rounded-2xl border border-white/10 shadow-card-raised p-6 accent-glow aurora-bg">
          {errorMessage && (
            <div className="mb-4 bg-rose-500/10 backdrop-blur-md rounded-xl border border-rose-400/30 p-4 flex items-start gap-3">
              <XCircle className="w-5 h-5 text-rose-400 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-rose-200">{errorMessage}</p>
            </div>
          )}

          <form onSubmit={handleSignIn} className="space-y-4">
            {/* Floating label inputs */}
            <div className="floating-label">
              <input
                type="text"
                id="name"
                placeholder=" "
                value={fullName}
                onChange={(e) => {
                  setFullName(e.target.value);
                  if (e.target.value && company) setCurrentStep(2);
                }}
                required
                className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-sky-500/50 transition-all duration-200"
              />
              <label htmlFor="name">Full name</label>
            </div>
            <div className="floating-label">
              <input
                type="text"
                id="company"
                placeholder=" "
                value={company}
                onChange={(e) => {
                  setCompany(e.target.value);
                  if (fullName && e.target.value) setCurrentStep(2);
                }}
                required
                className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-sky-500/50 transition-all duration-200"
              />
              <label htmlFor="company">Company / Trade</label>
            </div>
            <div className="floating-label">
              <input
                type="tel"
                id="phone"
                placeholder=" "
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-sky-500/50 transition-all duration-200"
              />
              <label htmlFor="phone">Phone (optional)</label>
            </div>
            <div className="floating-label">
              <input
                type="email"
                id="email"
                placeholder=" "
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-sky-500/50 transition-all duration-200"
              />
              <label htmlFor="email">Email (optional)</label>
            </div>

            {/* Host selection */}
            {hosts.length > 0 ? (
              <select
                value={selectedHostId}
                onChange={(e) => {
                  setSelectedHostId(e.target.value);
                  if (e.target.value) {
                    setHostName(
                      hosts.find((h) => h.id === e.target.value)?.name || ""
                    );
                  } else setHostName("");
                }}
                className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-3 text-sm text-white [&_option]:text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500/50 transition-all duration-200"
              >
                <option value="">Select a host (optional)</option>
                {hosts.map((host) => (
                  <option key={host.id} value={host.id}>
                    {host.name}
                  </option>
                ))}
              </select>
            ) : (
              <div className="floating-label">
                <input
                  type="text"
                  id="host"
                  placeholder=" "
                  value={hostName}
                  onChange={(e) => setHostName(e.target.value)}
                  className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-sky-500/50 transition-all duration-200"
                />
                <label htmlFor="host">Host name (optional)</label>
              </div>
            )}

            {/* Photo capture */}
            <div className="flex flex-col items-center gap-2">
              {photoUrl ? (
                <>
                  <div className="relative">
                    <img src={photoUrl ?? ""} alt="Visitor" className="w-24 h-24 rounded-lg object-cover photo-flash" />
                    <button
                      type="button"
                      onClick={() => setPhotoUrl(null)}
                      className="absolute -top-1 -right-1 bg-rose-500 text-white rounded-full w-5 h-5 text-xs leading-none"
                    >
                      x
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
                    className="flex items-center gap-2 bg-white/10 border border-white/10 rounded-xl px-4 py-2 text-sm text-white hover:bg-white/20 transition-colors"
                  >
                    <Printer className="w-4 h-4" /> Print badge
                  </button>
                </>
              ) : uploading ? (
                <p className="text-sm text-sky-400">Uploading photo…</p>
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
                  className="flex items-center gap-2 bg-white/10 border border-white/10 rounded-xl px-4 py-2 text-sm text-white hover:bg-white/20 transition-colors disabled:opacity-50"
                >
                  <Camera className="w-4 h-4" /> Take photo
                </button>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-sky-500 hover:bg-sky-600 disabled:bg-sky-400/50 text-white font-medium tracking-wide rounded-xl px-6 py-3 text-sm transition-all duration-200 active:scale-[0.98] flex items-center justify-center gap-2"
            >
              <ClipboardCheck className="w-4 h-4" />
              {loading ? "Signing in…" : "Sign In"}
            </button>
          </form>
        </div>

        {/* Active visitors – conditionally shown */}
        {showVisitorList && (
          <div className="bg-white/[0.10] backdrop-blur-lg rounded-2xl border border-white/10 shadow-card-raised p-6 accent-glow aurora-bg">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-200 flex items-center gap-2">
                <Users className="w-4 h-4" /> Currently on Site
              </h2>
              <span className="inline-flex items-center justify-center min-w-[24px] h-6 rounded-full bg-sky-500/20 text-sky-300 text-xs font-bold px-2">
                {activeVisitors.length}
              </span>
            </div>
            {activeVisitors.length === 0 ? (
              <p className="text-sm text-slate-400 italic">No active visitors</p>
            ) : (
              <ul className="divide-y divide-white/5">
                {activeVisitors.map((v) => (
                  <li
                    key={v.id}
                    className="py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 hover:bg-white/[0.03] rounded-lg transition-colors px-2"
                  >
                    <div>
                      <p className="text-sm font-medium text-white">{v.fullName}</p>
                      <p className="text-xs text-slate-400">{v.company}</p>
                      {v.hostName && (
                        <p className="text-xs text-sky-300">Host: {v.hostName}</p>
                      )}
                      <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-1">
                        <Clock className="w-3 h-3" />{" "}
                        {new Date(v.signedInAt).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          printBadgeForVisitor(v.fullName, v.company, v.hostName)
                        }
                        className="inline-flex items-center rounded-xl border border-white/10 bg-white/10 px-2 py-1.5 text-xs font-medium text-slate-200 hover:bg-white/20 transition-all duration-200"
                        title="Print badge"
                      >
                        <Printer className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => handleSignOut(v.id)}
                        className="inline-flex items-center rounded-xl border border-white/10 bg-white/10 px-3 py-1.5 text-xs font-medium text-slate-200 hover:bg-white/20 transition-all duration-200 active:scale-[0.98] gap-1"
                      >
                        <LogOut className="w-3 h-3" /> Sign out
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        <p className="text-center text-xs text-slate-500">
          Secure digital log – replaces paper forms
        </p>
      </div>
    </div>
  );
}