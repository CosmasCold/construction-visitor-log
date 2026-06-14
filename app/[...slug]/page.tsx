export default function DebugCatchAll({ params }: { params: { slug: string[] } }) {
  const fullSlug = params.slug?.join('/') || 'nothing';
  return (
    <div style={{ color: 'white', padding: 40 }}>
      <h1>Catch‑all working</h1>
      <p>Full slug: <strong>{fullSlug}</strong></p>
    </div>
  );
}