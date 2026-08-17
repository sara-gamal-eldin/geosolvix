import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Scout | Geosolvix',
  description: 'Scout by Geosolvix — Coming Soon',
};

export default function ScoutPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#001a43] text-white px-6">
      {/* Background grid pattern */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(#3b6fd4 1px, transparent 1px), linear-gradient(90deg, #3b6fd4 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative z-10 flex flex-col items-center text-center max-w-xl">
        {/* Logo / wordmark */}
        <div className="mb-8 flex items-center gap-3">
          <span className="text-2xl font-bold tracking-tight text-white">
            Geosolvix
          </span>
          <span className="h-6 w-px bg-white/30" />
          <span className="text-2xl font-bold tracking-tight text-[#4a9fff]">
            Scout
          </span>
        </div>

        {/* Badge */}
        <span className="mb-6 inline-block rounded-full border border-[#4a9fff]/40 bg-[#4a9fff]/10 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-[#4a9fff]">
          Coming Soon
        </span>

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-4">
          Something exciting<br />is on the way.
        </h1>

        {/* Subtext */}
        <p className="text-white/60 text-base sm:text-lg leading-relaxed">
          Scout is our next-generation geospatial intelligence tool. We&apos;re
          putting the finishing touches on it and will be ready soon.
        </p>

        {/* Back link */}
        <a
          href="https://geosolvix.com"
          className="mt-10 inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-2.5 text-sm font-medium text-white/80 transition hover:border-white/50 hover:text-white"
        >
          ← Back to Geosolvix
        </a>
      </div>
    </div>
  );
}
