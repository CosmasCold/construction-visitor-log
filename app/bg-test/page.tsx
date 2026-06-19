export default function BgTestPage() {
  return (
    <div style={{ color: "white", padding: 40 }}>
      <h1>Background image test</h1>
      <p>If you see a photo below, the file is working.</p>
      <img
        src="/hero-bg.webp"
        alt="Hero background"
        style={{ width: "100%", maxWidth: 800, border: "2px solid white" }}
      />
      <p style={{ marginTop: 20 }}>
        Image URL: https://sitesafe.thesift.space/hero-bg.webp
      </p>
    </div>
  );
}