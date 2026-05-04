import { Link } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-card/30">
      <div className="container mx-auto max-w-7xl px-4 py-12">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2">
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-brand">
                <Sparkles className="h-4 w-4 text-brand-foreground" />
              </span>
              <span className="font-display text-base font-semibold">
                Cogno<span className="text-gradient">Sales</span>
              </span>
            </Link>
            <p className="mt-3 max-w-sm text-sm text-muted-foreground">
              The AI-native dealership platform. Talk to your data, act on the answers, sell more.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-foreground">Product</h4>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li>CRM</li>
              <li>Analytics</li>
              <li>Inventory</li>
              <li>Chatbot</li>
              <li>Email & SMS</li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-foreground">Company</h4>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li><Link to="/about" className="hover:text-foreground">About</Link></li>
              <li><Link to="/contact" className="hover:text-foreground">Contact</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-10 border-t border-border pt-6 text-xs text-muted-foreground">
          © {new Date().getFullYear()} CognoSales. All rights reserved.
        </div>
      </div>
    </footer>
  );
}