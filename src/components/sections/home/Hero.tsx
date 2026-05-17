import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { container } from "@/lib/container";
import { cn } from "@/lib/utils";

type ScanTile = {
  /** Optional aria/text label */
  label: string;
  /** Tailwind gradient classes for the underlying scan look */
  background: string;
  /** Whether to overlay color Doppler flow */
  variant: "mono" | "doppler-warm" | "doppler-cool" | "doppler-mix";
};

const TILES: ScanTile[] = [
  {
    label: "Fetal ultrasound scan",
    background:
      "bg-[radial-gradient(circle_at_35%_45%,#5b5b5b_0%,#2a2a2a_55%,#000_100%)]",
    variant: "mono",
  },
  {
    label: "Doppler color flow scan",
    background:
      "bg-[radial-gradient(circle_at_50%_50%,#3b3b3b_0%,#1a1a1a_55%,#000_100%)]",
    variant: "doppler-warm",
  },
  {
    label: "Vascular color flow scan",
    background:
      "bg-[radial-gradient(circle_at_50%_50%,#262626_0%,#0e0e0e_55%,#000_100%)]",
    variant: "doppler-cool",
  },
  {
    label: "Mixed Doppler scan",
    background:
      "bg-[radial-gradient(circle_at_50%_50%,#2f2f2f_0%,#121212_55%,#000_100%)]",
    variant: "doppler-mix",
  },
];

function UltrasoundFanMask({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="absolute inset-3 overflow-hidden"
      style={{
        // Wedge / fan shape typical of an ultrasound image
        clipPath: "polygon(50% 0%, 92% 95%, 8% 95%)",
      }}
    >
      {children}
    </div>
  );
}

function ScanArt({ variant }: { variant: ScanTile["variant"] }) {
  return (
    <>
      {/* Tissue speckle pattern */}
      <div
        className="absolute inset-0 opacity-70 mix-blend-screen"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.22) 1px, transparent 1px), radial-gradient(rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "5px 5px, 9px 9px",
          backgroundPosition: "0 0, 2px 3px",
        }}
      />

      {/* Anatomical bright bands (tissue interfaces) */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-50"
        style={{
          background:
            "repeating-radial-gradient(circle at 50% 0%, rgba(255,255,255,0.08) 0 2%, rgba(255,255,255,0) 2% 6%)",
        }}
      />

      {/* Bright anatomical curve (head/silhouette suggestion) */}
      <div
        className="absolute left-1/2 top-[55%] h-2/3 w-2/3 -translate-x-1/2 -translate-y-1/2 opacity-40 blur-[1.5px]"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(255,255,255,0.65) 0%, rgba(255,255,255,0) 70%)",
        }}
      />

      {variant === "doppler-warm" ? (
        <div className="absolute left-1/2 top-[55%] h-28 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-amber-300/80 via-red-500/70 to-rose-600/70 mix-blend-screen blur-[2px]" />
      ) : null}
      {variant === "doppler-cool" ? (
        <div className="absolute left-1/2 top-[55%] h-28 w-36 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-sky-300/70 via-emerald-400/70 to-blue-600/80 mix-blend-screen blur-[2px]" />
      ) : null}
      {variant === "doppler-mix" ? (
        <>
          <div className="absolute left-1/3 top-1/2 h-20 w-20 -translate-y-1/2 rounded-full bg-gradient-to-br from-orange-400/80 via-red-500/70 to-rose-600/70 mix-blend-screen blur-[2px]" />
          <div className="absolute right-1/4 top-1/2 h-16 w-16 -translate-y-1/2 rounded-full bg-gradient-to-br from-sky-400/70 to-blue-600/80 mix-blend-screen blur-[2px]" />
        </>
      ) : null}
    </>
  );
}

function ScanTileCard({ tile }: { tile: ScanTile }) {
  return (
    <div
      role="img"
      aria-label={tile.label}
      className={cn(
        "relative h-32 w-full overflow-hidden rounded-md border border-black/40 shadow-md sm:h-40 lg:h-44",
        tile.background,
      )}
    >
      <UltrasoundFanMask>
        <ScanArt variant={tile.variant} />
      </UltrasoundFanMask>
      {/* Corner marker like real scanner UI */}
      <span className="absolute right-2 top-2 size-2 rounded-full bg-amber-300/80 shadow" />
    </div>
  );
}

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-hero-cream">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          background:
            "radial-gradient(60% 60% at 15% 30%, rgba(244,166,8,0.18) 0%, rgba(244,166,8,0) 70%)",
        }}
      />

      <div className={cn(container, "relative grid gap-10 py-16 lg:grid-cols-2 lg:gap-12 lg:py-24")}>
        <div className="max-w-xl">
          <h1 className="font-heading text-4xl font-bold leading-[1.1] tracking-tight text-ink-heading sm:text-5xl">
            Pass Your Sonography Exams
            <br />
            with Confidence
          </h1>
          <p className="mt-5 max-w-lg text-base leading-7 text-ink-muted sm:text-[17px]">
            Expert-created and reviewed exam prep materials, developed by registered sonographers
            and board-certified physicians. Get full access to SPI, ARDMS, CCI, and ARRT
            sonography exam preparation &mdash; built for ultrasound students and professionals.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button
              asChild
              type="button"
              className="h-11 rounded-lg bg-brand px-6 text-base font-semibold text-white shadow-none hover:bg-brand-deep"
            >
              <Link to="/register">Get Started</Link>
            </Button>
            <Button
              asChild
              type="button"
              variant="outline"
              className="h-11 rounded-lg border-ink-heading/20 bg-transparent px-6 text-base font-semibold text-ink-heading hover:bg-white"
            >
              <Link to="/explore">Explore Resources</Link>
            </Button>
          </div>
        </div>

        <div className="relative w-full lg:ml-auto lg:max-w-lg">
          <div className="rounded-xl border border-black/10 bg-black p-2 shadow-2xl shadow-amber-900/10 sm:p-3">
            <div className="grid grid-cols-2 gap-2 sm:gap-3">
              {TILES.map((tile) => (
                <ScanTileCard key={tile.label} tile={tile} />
              ))}
            </div>
          </div>
          <div
            aria-hidden
            className="absolute -bottom-6 -right-6 -z-10 h-40 w-40 rounded-full bg-brand/20 blur-3xl"
          />
        </div>
      </div>
    </section>
  );
}
