import { Link } from "react-router-dom";
import { BookOpen, GraduationCap, Home, LogOut } from "lucide-react";

import { useAuth } from "@/auth/useAuth";
import { Button } from "@/components/ui/button";
import { container } from "@/lib/container";
import { cn } from "@/lib/utils";

export default function UserDashboard() {
  const { user, logout } = useAuth();
  const displayName = user?.name ?? user?.email ?? "Student";

  return (
    <div className="min-h-dvh bg-surface-soft">
      <div className={cn(container, "py-10 sm:py-14")}>
        <div className="mx-auto max-w-4xl">
          <header className="rounded-2xl border border-border-light bg-card p-7 shadow-sm">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full bg-brand-soft px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand-deep">
                  <GraduationCap className="size-3.5" aria-hidden />
                  User Dashboard
                </span>
                <h1 className="mt-3 font-heading text-3xl font-bold tracking-tight text-ink-heading sm:text-4xl">
                  Welcome back, {displayName}!
                </h1>
                <p className="mt-2 max-w-xl text-base leading-7 text-ink-muted">
                  Continue your sonography exam prep. Pick a specialty below to jump back
                  into your study materials, flashcards, and practice questions.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <Button
                  asChild
                  type="button"
                  variant="outline"
                  className="h-10 gap-2 rounded-lg border-border-gray px-4"
                >
                  <Link to="/">
                    <Home className="size-4" aria-hidden />
                    Home
                  </Link>
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="h-10 gap-2 rounded-lg border-border-gray px-4 text-destructive"
                  onClick={() => {
                    void logout();
                  }}
                >
                  <LogOut className="size-4" aria-hidden />
                  Sign out
                </Button>
              </div>
            </div>
          </header>

          <section className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: "SPI", to: "/spi" },
              { label: "Abdominal", to: "/abdominal" },
              { label: "OB/GYN", to: "/ob-gyn" },
              { label: "Vascular", to: "/vascular" },
            ].map((item) => (
              <Link
                key={item.label}
                to={item.to}
                className="group flex h-full flex-col rounded-2xl border border-border-light bg-card p-5 transition-all hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-md"
              >
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-brand-soft text-brand-deep">
                  <BookOpen className="size-5" aria-hidden />
                </span>
                <p className="mt-4 font-heading text-base font-semibold text-ink-heading">
                  {item.label}
                </p>
                <p className="mt-1 text-sm text-ink-muted">Open study materials</p>
              </Link>
            ))}
          </section>

          {user?.email ? (
            <p className="mt-8 text-sm text-ink-muted">
              Signed in as <span className="font-medium text-ink">{user.email}</span>
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
