import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { container } from "@/lib/container";
import { cn } from "@/lib/utils";

export function CallToAction() {
  return (
    <section className="relative overflow-hidden bg-cta-amber">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 70% at 50% 0%, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0) 60%)",
        }}
      />
      <div className={cn(container, "relative py-14 text-center sm:py-20")}>
        <h2 className="font-heading text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Your Sonography Exam Success Starts Here
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-base leading-7 text-white/90 sm:text-[17px]">
          Join the trusted platform helping sonographers and sonography students pass their board
          exams and grow their careers.
        </p>
        <div className="mt-8 flex justify-center">
          <Button
            asChild
            type="button"
            className="h-11 rounded-lg bg-ink-heading px-7 text-base font-semibold text-white shadow-none hover:bg-ink"
          >
            <Link to="/register">Get Started</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
