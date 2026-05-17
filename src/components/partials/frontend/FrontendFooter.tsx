import { Link } from "react-router-dom";
import { Activity, Mail } from "lucide-react";

import { container } from "@/lib/container";
import { cn } from "@/lib/utils";

type FooterLink = { label: string; to?: string; href?: string };

const FOOTER_COLUMNS: { title: string; links: readonly FooterLink[] }[] = [
  {
    title: "Study Materials",
    links: [
      { label: "SPI (Ultrasound Physics)", to: "/spi" },
      { label: "Abdominal Sonography", to: "/abdominal" },
      { label: "OB/Gyn Sonography", to: "/ob-gyn" },
      { label: "Vascular Sonography", to: "/vascular" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Pricing", to: "/pricing" },
      { label: "Explore Resources", to: "/explore" },
      { label: "About us", to: "/about" },
      { label: "FAQ", to: "/faq" },
    ],
  },
];

function FooterColumn({ title, links }: { title: string; links: readonly FooterLink[] }) {
  return (
    <div>
      <h4 className="font-heading text-sm font-semibold uppercase tracking-wide text-ink-heading">
        {title}
      </h4>
      <ul className="mt-4 flex list-none flex-col gap-2 p-0">
        {links.map((link) => (
          <li key={link.label}>
            {link.to ? (
              <Link
                to={link.to}
                className="text-sm text-ink-muted transition-colors hover:text-brand"
              >
                {link.label}
              </Link>
            ) : (
              <a
                href={link.href ?? "#"}
                className="text-sm text-ink-muted transition-colors hover:text-brand"
              >
                {link.label}
              </a>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function FrontendFooter() {
  return (
    <footer className="border-t border-border-light bg-white">
      <div className={cn(container, "py-12 sm:py-16")}>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.2fr_1fr_1fr_1fr]">
          <div>
            <Link to="/" className="inline-flex items-center gap-2">
              <span className="relative inline-flex h-9 w-9 items-center justify-center rounded-full bg-brand-soft text-brand-deep">
                <Activity className="h-5 w-5" aria-hidden />
              </span>
              <span className="font-heading text-lg font-bold tracking-tight text-ink-heading">
                Sonographer<span className="text-brand"> Pal</span>
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-6 text-ink-muted">
              Comprehensive digital resources designed specifically for sonographers preparing for
              ARDMS<sup>&reg;</sup>, ARRT<sup>&reg;</sup>, and CCI<sup>&reg;</sup> specialty
              examinations.
            </p>
          </div>

          {FOOTER_COLUMNS.map((column) => (
            <FooterColumn key={column.title} title={column.title} links={column.links} />
          ))}

          <div>
            <h4 className="font-heading text-sm font-semibold uppercase tracking-wide text-ink-heading">
              Connect With Us
            </h4>
            <ul className="mt-4 flex list-none flex-col gap-3 p-0">
              <li>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 text-sm text-ink-muted hover:text-brand"
                >
                  Contact
                </Link>
              </li>
              <li>
                <a
                  href="mailto:info@sonographerpal.com"
                  className="inline-flex items-center gap-2 text-sm text-ink-muted hover:text-brand"
                >
                  <Mail className="size-4" aria-hidden />
                  info@sonographerpal.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-border-light pt-6 sm:flex-row sm:items-center">
          <p className="text-xs text-ink-muted">
            &copy; {new Date().getFullYear()} Sonographer Pal. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/terms" className="text-xs text-ink-muted hover:text-brand">
              Terms of Service
            </Link>
            <Link to="/privacy-policy" className="text-xs text-ink-muted hover:text-brand">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
