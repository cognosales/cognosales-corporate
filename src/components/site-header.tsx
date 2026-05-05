import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/cognosales-logo.png";

const nav: { to: "/" | "/about" | "/pricing" | "/contact"; label: string }[] = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/pricing", label: "Pricing" },
  { to: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 w-full glass">
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="CognoSales logo" className="h-9 w-9 object-contain" />
          <span className="font-display text-lg font-semibold tracking-tight">
            Cogno<span className="text-gradient">Sales</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to as any}
              className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-smooth hover:bg-secondary hover:text-foreground"
              activeProps={{ className: "rounded-md px-3 py-2 text-sm text-foreground bg-secondary" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <Link to="/contact" hash="contact-form">
            <Button size="sm" className="bg-gradient-brand text-brand-foreground hover:opacity-90">
              Get started
            </Button>
          </Link>
        </div>

        <button
          className="md:hidden rounded-md p-2 text-foreground"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border md:hidden">
          <nav className="container mx-auto flex max-w-7xl flex-col gap-1 px-4 py-3">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to as any}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-secondary hover:text-foreground"
                activeProps={{ className: "rounded-md px-3 py-2 text-sm text-foreground bg-secondary" }}
              >
                {n.label}
              </Link>
            ))}
            <Link to="/contact" hash="contact-form" onClick={() => setOpen(false)}>
              <Button size="sm" className="mt-2 w-full bg-gradient-brand text-brand-foreground">
                Get started
              </Button>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}