import { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Activity, LogIn, LogOut, Menu, Settings, User, X } from "lucide-react";

import { useAuth } from "@/auth/useAuth";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { container } from "@/lib/container";
import { cn } from "@/lib/utils";

type NavItem = { label: string; to: string };

const NAV_ITEMS: NavItem[] = [
  { label: "Home", to: "/" },
  { label: "Explore Resources", to: "/explore" },
  { label: "SPI", to: "/spi" },
  { label: "Vascular", to: "/vascular" },
  { label: "OB/GYN", to: "/ob-gyn" },
  { label: "Abdominal", to: "/abdominal" },
  { label: "About Us", to: "/about" },
  { label: "Test", to: "/test" },
];

function BrandLogo({ className }: { className?: string }) {
  return (
    <Link to="/" className={cn("inline-flex items-center gap-2", className)}>
      <span className="relative inline-flex h-9 w-9 items-center justify-center rounded-full bg-brand-soft text-brand-deep">
        <Activity className="h-5 w-5" aria-hidden />
      </span>
      <span className="leading-tight">
        <span className="block font-heading text-lg font-bold tracking-tight text-ink-heading">
          Sonographer<span className="text-brand"> Pal</span>
        </span>
        <span className="block text-[10px] uppercase tracking-[0.18em] text-ink-muted">
          Exam prep
        </span>
      </span>
    </Link>
  );
}

function DesktopNav() {
  return (
    <nav className="hidden items-center gap-1 lg:flex">
      {NAV_ITEMS.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          end={item.to === "/"}
          className={({ isActive }) =>
            cn(
              "rounded-md px-3 py-2 text-sm font-medium transition-colors",
              isActive
                ? "text-brand"
                : "text-ink-muted hover:text-ink-heading",
            )
          }
        >
          {item.label}
        </NavLink>
      ))}
    </nav>
  );
}

function AuthMenu() {
  const { isAuthenticated, logout, user } = useAuth();

  if (!isAuthenticated) {
    return (
      <div className="hidden items-center gap-2 lg:flex">
        <Button
          asChild
          type="button"
          variant="ghost"
          className="h-10 gap-2 rounded-lg px-3 text-sm font-medium text-ink-heading hover:bg-cream"
        >
          <Link to="/login">
            <User className="size-4" aria-hidden />
            Log In
          </Link>
        </Button>
        <Button
          asChild
          type="button"
          className="h-10 rounded-lg bg-brand px-5 text-sm font-semibold text-white shadow-none hover:bg-brand-deep"
        >
          <Link to="/register">Get Started</Link>
        </Button>
      </div>
    );
  }

  const initials =
    (user?.name ?? user?.email ?? "U")
      .split(/\s+/)
      .map((part) => part[0])
      .filter(Boolean)
      .slice(0, 2)
      .join("")
      .toUpperCase() || "U";

  return (
    <div className="hidden items-center gap-2 lg:flex">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            type="button"
            variant="outline"
            className="h-10 gap-2 rounded-lg border-border-gray bg-white pl-2 pr-3 text-sm font-medium text-ink-heading"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand text-xs font-bold text-white">
              {initials}
            </span>
            <span className="max-w-[120px] truncate">{user?.name ?? user?.email}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="min-w-48">
          <DropdownMenuLabel>My account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link to="/dashboard" className="flex items-center gap-2">
              <Settings className="size-4" aria-hidden />
              Dashboard
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onSelect={() => {
              void logout();
            }}
            className="text-destructive focus:text-destructive"
          >
            <LogOut className="size-4" aria-hidden />
            Sign out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

function MobileNav() {
  const [open, setOpen] = useState(false);
  const { isAuthenticated, logout, user } = useAuth();
  const location = useLocation();

  function close() {
    setOpen(false);
  }

  return (
    <div className="lg:hidden">
      <Button
        type="button"
        variant="ghost"
        className="h-10 w-10 rounded-lg p-0 text-ink-heading hover:bg-cream"
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((prev) => !prev)}
      >
        {open ? <X className="size-5" aria-hidden /> : <Menu className="size-5" aria-hidden />}
      </Button>

      {open ? (
        <>
          <button
            type="button"
            aria-label="Close menu overlay"
            className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
            onClick={close}
          />
          <div className="absolute left-0 right-0 top-full z-50 border-t border-border-light bg-white px-4 py-4 shadow-xl">
            <nav className="flex flex-col gap-1">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={close}
                  className={cn(
                    "rounded-md px-3 py-2 text-sm font-medium",
                    location.pathname === item.to
                      ? "bg-cream text-brand"
                      : "text-ink-heading hover:bg-surface-soft",
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="mt-4 border-t border-border-light pt-4">
              {isAuthenticated ? (
                <div className="space-y-2">
                  <p className="px-3 text-xs uppercase tracking-wide text-ink-muted">
                    Signed in as {user?.email ?? user?.name}
                  </p>
                  <Button
                    asChild
                    type="button"
                    variant="outline"
                    className="w-full justify-start gap-2"
                    onClick={close}
                  >
                    <Link to="/dashboard">
                      <Settings className="size-4" aria-hidden />
                      Dashboard
                    </Link>
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full justify-start gap-2 text-destructive"
                    onClick={() => {
                      close();
                      void logout();
                    }}
                  >
                    <LogOut className="size-4" aria-hidden />
                    Sign out
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  <Button
                    asChild
                    type="button"
                    variant="outline"
                    className="h-11 gap-2 rounded-lg"
                    onClick={close}
                  >
                    <Link to="/login">
                      <LogIn className="size-4" aria-hidden />
                      Log In
                    </Link>
                  </Button>
                  <Button
                    asChild
                    type="button"
                    className="h-11 rounded-lg bg-brand text-white hover:bg-brand-deep"
                    onClick={close}
                  >
                    <Link to="/register">Get Started</Link>
                  </Button>
                </div>
              )}
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}

export function FrontendHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border-light bg-white/95 backdrop-blur">
      <div className={cn(container, "relative flex h-16 items-center justify-between gap-4 lg:h-20")}>
        <BrandLogo />
        <DesktopNav />
        <AuthMenu />
        <MobileNav />
      </div>
    </header>
  );
}
