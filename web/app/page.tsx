import NodusSimulator from './components/NodusSimulator';

export default function Home() {
  return (
    <main className="min-h-dvh flex items-center justify-center p-3 sm:p-6">
      <div className="w-full max-w-lg rounded-2xl sm:rounded-3xl border border-[var(--border)] bg-[rgba(17,21,19,0.78)] backdrop-blur-xl p-5 sm:p-8 md:p-10 relative overflow-hidden">
        {/* Glow top */}
        <div className="pointer-events-none absolute inset-x-0 -top-20 mx-auto h-40 w-80 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(157,223,75,0.18),transparent_68%)] blur-3xl" />
        <NodusSimulator />
      </div>
    </main>
  );
}
