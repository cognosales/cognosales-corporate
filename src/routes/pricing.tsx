import { createFileRoute, Link } from "@tanstack/react-router";
import { Sparkles, Star, Check, Users, Mail, MessageSquare, Headphones, MessagesSquare, Bot, BarChart3, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMemo, useState } from "react";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Pricing - CognoSales" },
      { name: "description", content: "Unified Suite at one flat price, or pick only the modules you need. Transparent CAD pricing with no per-seat fees." },
      { property: "og:title", content: "CognoSales Pricing" },
      { property: "og:description", content: "All-in-one Unified Suite or à la carte Custom Suite - your call." },
    ],
  }),
  component: PricingPage,
});

const unifiedFeatures = [
  "CRM & Lead Management",
  "Email Marketing & Campaigns",
  "SMS Marketing & Automation",
  "Calls & Dialer",
  "Conversations (Unified Inbox)",
  "AI Chatbot Builder",
  "Analytics & Reporting",
  "Integrations Marketplace",
  "Inventory Management",
  "Automation Builder",
  "Priority Support",
  "Unlimited Users",
];

const services = [
  { id: "crm", icon: Users, name: "CRM", desc: "Lead management, pipeline tracking & customer profiles", price: 500 },
  { id: "email", icon: Mail, name: "Email", desc: "Email campaigns, templates & automation", price: 300 },
  { id: "sms", icon: MessageSquare, name: "SMS", desc: "SMS campaigns, inbox & compliance tools", price: 200 },
  { id: "calls", icon: Headphones, name: "Calls", desc: "Dialer, call recording & analytics", price: 500 },
  { id: "conversations", icon: MessagesSquare, name: "Conversations", desc: "Unified inbox across all channels", price: 100 },
  { id: "chatbot", icon: Bot, name: "Chatbot", desc: "AI chatbot builder with live chat", price: 200 },
  { id: "analytics", icon: BarChart3, name: "Analytics", desc: "Dashboards, reports & source tracking", price: 500 },
];

function PricingPage() {
  const [selected, setSelected] = useState<Record<string, boolean>>({});
  const total = useMemo(
    () => services.reduce((sum, s) => (selected[s.id] ? sum + s.price : sum), 0),
    [selected],
  );
  const count = Object.values(selected).filter(Boolean).length;

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-hero-dark">
        <div className="container mx-auto max-w-5xl px-4 py-20 text-center md:py-28">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs text-white/80 backdrop-blur">
            <Zap className="h-3.5 w-3.5" /> Simple, transparent pricing
          </span>
          <h1 className="mt-6 font-display text-4xl font-bold leading-tight text-white md:text-6xl">
            One price for everything. <br />
            <span className="text-gradient">Or only what you need.</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-white/75">
            Unlimited users on every plan. No per-seat fees. Cancel anytime.
          </p>
        </div>
      </section>

      {/* PLANS */}
      <section className="container mx-auto max-w-6xl px-4 py-16 md:py-20">
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Unified Suite */}
          <div className="relative rounded-3xl bg-gradient-card p-8 shadow-elegant md:p-10">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-brand shadow-glow">
                  <Sparkles className="h-6 w-6 text-brand-foreground" />
                </span>
                <div>
                  <h2 className="font-display text-2xl font-semibold">Unified Suite</h2>
                  <p className="text-sm text-muted-foreground">Everything you need, one price</p>
                </div>
              </div>
              <span className="rounded-full bg-primary/15 px-3 py-1 text-xs font-medium text-primary">Best Value</span>
            </div>

            <div className="mt-6 flex items-baseline gap-2">
              <span className="font-display text-5xl font-bold md:text-6xl">$2,000</span>
              <span className="text-sm text-muted-foreground">CAD/mo</span>
            </div>
            <p className="mt-2 text-sm font-medium text-primary">
              Billed annually at $24,000 CAD/year
            </p>

            <Link to="/contact" className="mt-6 block">
              <Button size="lg" className="w-full bg-gradient-brand text-brand-foreground shadow-glow hover:opacity-90">
                <Zap className="h-4 w-4" /> Get Started
              </Button>
            </Link>

            <div className="mt-8 border-t border-border pt-6">
              <h3 className="text-sm font-semibold">Everything included:</h3>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {unifiedFeatures.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-primary/15 text-primary">
                      <Check className="h-3 w-3" />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Custom Suite */}
          <div className="relative rounded-3xl bg-gradient-card p-8 shadow-elegant md:p-10">
            <div className="flex items-center gap-3">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-accent/15">
                <Star className="h-6 w-6 text-accent" />
              </span>
              <div>
                <h2 className="font-display text-2xl font-semibold">Custom Suite</h2>
                <p className="text-sm text-muted-foreground">Pick only what you need</p>
              </div>
            </div>

            <div className="mt-6 flex items-baseline gap-2">
              <span className="font-display text-5xl font-bold md:text-6xl">${total.toLocaleString()}</span>
              <span className="text-sm text-muted-foreground">CAD/mo</span>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              {count === 0 ? "Select services below to see pricing" : `${count} service${count > 1 ? "s" : ""} selected`}
            </p>

            <div className="mt-6 space-y-3">
              {services.map((s) => {
                const isOn = !!selected[s.id];
                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setSelected((p) => ({ ...p, [s.id]: !p[s.id] }))}
                    className={`flex w-full items-center gap-4 rounded-xl border p-4 text-left transition-smooth ${
                      isOn
                        ? "border-primary bg-primary/5 shadow-card"
                        : "border-border bg-card/40 hover:border-primary/40 hover:bg-card"
                    }`}
                  >
                    <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-lg ${isOn ? "bg-gradient-brand text-brand-foreground" : "bg-muted text-muted-foreground"}`}>
                      <s.icon className="h-5 w-5" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="font-medium">{s.name}</div>
                      <div className="truncate text-xs text-muted-foreground">{s.desc}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">${s.price}</div>
                      <div className="text-xs text-muted-foreground">/mo</div>
                    </div>
                    <span
                      aria-hidden
                      className={`grid h-5 w-5 shrink-0 place-items-center rounded-full border ${
                        isOn ? "border-primary bg-primary" : "border-border bg-background"
                      }`}
                    >
                      {isOn && <Check className="h-3 w-3 text-primary-foreground" />}
                    </span>
                  </button>
                );
              })}
            </div>

            <Link to="/contact" className="mt-6 block">
              <Button
                size="lg"
                disabled={count === 0}
                className="w-full bg-gradient-brand text-brand-foreground shadow-glow hover:opacity-90 disabled:opacity-50"
              >
                Subscribe ({count} {count === 1 ? "service" : "services"})
              </Button>
            </Link>
          </div>
        </div>

        <p className="mt-10 text-center text-sm text-muted-foreground">
          Need something custom or enterprise volume?{" "}
          <Link to="/contact" className="font-medium text-primary underline-offset-4 hover:underline">
            Talk to sales
          </Link>
          .
        </p>
      </section>
    </>
  );
}