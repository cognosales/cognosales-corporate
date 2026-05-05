import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Sparkles,
  Database,
  BarChart3,
  Bot,
  Boxes,
  MessagesSquare,
  Mail,
  ArrowRight,
  Check,
  Zap,
  Layers,
  DollarSign,
  Brain,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImg from "@/assets/hero.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CognoSales - Talk to your data. Sell smarter." },
      { name: "description", content: "AI-native CRM, analytics, inventory, chatbot and marketing for modern dealerships. Ask your data anything - get answers, not dashboards." },
      { property: "og:title", content: "CognoSales - Talk to your data. Sell smarter." },
      { property: "og:description", content: "AI at the center. CRM, analytics, inventory, chatbot, email & SMS - one ecosystem, one price." },
    ],
  }),
  component: Index,
});

const tools = [
  { icon: Database, title: "AI CRM", body: "Ask 'show me leads from Google Ads last month' or 'which sources give the best leads?' - get instant answers, not exports." },
  { icon: BarChart3, title: "Cross-Data Analytics", body: "Unify CRM, inventory, GA4, Search Console, ad platforms and marketplaces - and let them talk to each other." },
  { icon: Boxes, title: "Smart Inventory", body: "'What sold most?', 'What sat over 100 days?', 'What will sell next season?' - your inventory finally answers back." },
  { icon: Bot, title: "AI Chatbot", body: "Customers chat directly with your catalog: 'I'm looking for something under $20,000.' Done." },
  { icon: MessagesSquare, title: "Unified Conversations", body: "Facebook, Instagram, WhatsApp, SMS, email, chatbot - every conversation in one inbox, with full context." },
  { icon: Mail, title: "AI Email Marketing", body: "Generate on-brand templates and campaigns in minutes, not days." },
];

const problems = [
  { q: "Which sources give me the best leads?", a: "AI ranks every channel by lead quality, conversion and ROI in one view." },
  { q: "If I have $10,000, where should I spend it?", a: "Get an AI-recommended budget split across all your paid channels." },
  { q: "What's selling most this season?", a: "AI surfaces seasonal patterns from years of inventory & sales data." },
  { q: "Which inventory has aged over 100 days?", a: "Instant filter - plus AI suggestions to move it (price, ad, channel)." },
];

const usps = [
  { icon: Brain, title: "AI at the center", body: "Every tool feeds one intelligent core. Data doesn't just sit - it talks." },
  { icon: Layers, title: "Cross-data conversations", body: "Marketing, sales, inventory & service data all answer questions together." },
  { icon: DollarSign, title: "All-in-one pricing", body: "Replace 6 vendor bills with one - or subscribe only to the modules you need." },
  { icon: Zap, title: "One smooth ecosystem", body: "No tab-hopping. No syncing lag. Built as one platform from day one." },
];

function Index() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-hero-dark">
        <div
          className="absolute inset-0 opacity-60"
          style={{
            backgroundImage: `url(${heroImg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          aria-hidden
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, oklch(0.18 0.04 265 / 0.55) 0%, oklch(0.18 0.04 265 / 0.75) 70%, oklch(0.18 0.04 265) 100%)",
          }}
          aria-hidden
        />
        <div className="relative container mx-auto max-w-6xl px-4 pt-20 pb-24 text-center md:pt-28 md:pb-32">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs text-white/80 backdrop-blur">
            <Sparkles className="h-3.5 w-3.5 text-white" />
            AI-native Customer Engagement Platform
          </span>

          <h1 className="mx-auto mt-6 max-w-4xl font-display text-4xl font-bold leading-[1.05] text-white md:text-7xl">
            Stop storing data. <br />
            <span className="text-gradient">Start talking to it.</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base text-white/75 md:text-lg">
            CognoSales unifies CRM, analytics, inventory, chatbot and marketing into one AI-powered
            ecosystem - built to grow sales and help your team make informed decisions, fast.
          </p>

          {/* Demo prompt card */}
          <div className="mx-auto mt-14 max-w-3xl">
            <div className="rounded-2xl border border-white/15 bg-white/10 p-1 shadow-elegant backdrop-blur animate-pulse-glow">
              <div className="rounded-xl bg-[oklch(0.18_0.04_265)] p-5 text-left">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="h-2 w-2 rounded-full bg-destructive/70" />
                  <span className="h-2 w-2 rounded-full bg-primary/70" />
                  <span className="h-2 w-2 rounded-full bg-accent/70" />
                  <span className="ml-2 text-white/60">CognoSales · Ask your data</span>
                </div>
                <div className="mt-4 font-mono text-sm md:text-base">
                  <span className="text-white/50">›</span>{" "}
                  <span className="text-white">Which sources gave us the best leads last month?</span>
                </div>
                <div className="mt-3 rounded-lg bg-white/5 p-3 text-sm text-white/75">
                  <span className="text-[oklch(0.78_0.16_220)]">CognoAI:</span> Google Ads delivered <b className="text-white">42%</b> of converted leads
                  at <b className="text-white">$38 CPL</b>. Marketplace listings had highest lead quality (8.6/10).
                  Suggested next-month split: Google 55%, Marketplaces 30%, Meta 15%.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* USPs */}
      <section className="container mx-auto max-w-6xl px-4 py-20">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <span className="text-xs font-medium uppercase tracking-wider text-primary">Why CognoSales</span>
          <h2 className="mt-3 font-display text-3xl font-bold md:text-5xl">
            Built to <span className="text-gradient">grow sales.</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            For dealerships, e-commerce, retail and any business with inventory and customers - make informed decisions, faster.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {usps.map((u) => (
            <div key={u.title} className="rounded-2xl bg-gradient-card p-6 shadow-card transition-smooth hover:-translate-y-1 hover:shadow-glow">
              <span className="grid h-11 w-11 place-items-center rounded-lg bg-gradient-brand">
                <u.icon className="h-5 w-5 text-brand-foreground" />
              </span>
              <h3 className="mt-4 font-display text-lg font-semibold">{u.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{u.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TOOLS */}
      <section className="container mx-auto max-w-6xl px-4 py-20">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-medium uppercase tracking-wider text-primary">Platform</span>
          <h2 className="mt-3 font-display text-3xl font-bold md:text-5xl">
            Six tools. <span className="text-gradient">One brain.</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            Buy them all, or pick the ones you need. Either way, they share the same data and the same AI.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {tools.map((t) => (
            <div
              key={t.title}
              className="group relative overflow-hidden rounded-2xl bg-gradient-card p-6 shadow-card transition-smooth hover:-translate-y-1 hover:shadow-glow"
            >
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-brand shadow-glow">
                <t.icon className="h-6 w-6 text-brand-foreground" />
              </span>
              <h3 className="mt-5 font-display text-xl font-semibold">{t.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{t.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ASK ANYTHING */}
      <section className="container mx-auto max-w-6xl px-4 py-20">
        <div className="rounded-3xl bg-gradient-card p-8 shadow-elegant md:p-14">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-bold md:text-5xl">
              Ask anything. <span className="text-gradient">Get answers.</span>
            </h2>
            <p className="mt-4 text-muted-foreground">
              Your team already asks these questions. CognoSales just answers them - instantly.
            </p>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {problems.map((p) => (
              <div key={p.q} className="rounded-xl border border-border bg-card/60 p-5">
                <div className="flex items-start gap-3">
                  <span className="mt-1 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-gradient-brand text-xs font-bold text-brand-foreground">?</span>
                  <p className="font-medium">{p.q}</p>
                </div>
                <p className="mt-3 pl-9 text-sm text-muted-foreground">{p.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY DIFFERENT */}
      <section className="container mx-auto max-w-6xl px-4 py-20">
        <div className="grid gap-12 md:grid-cols-2 md:items-center">
          <div>
            <span className="text-xs font-medium uppercase tracking-wider text-primary">Why CognoSales</span>
            <h2 className="mt-3 font-display text-3xl font-bold md:text-5xl">
              The end of <span className="text-gradient">tool sprawl.</span>
            </h2>
            <p className="mt-4 text-muted-foreground">
              Most teams run 5–7 disconnected tools, pay for each one, and still can't get a straight answer.
              CognoSales replaces them with a single, fast, AI-native platform.
            </p>

            <ul className="mt-6 space-y-3">
              {[
                "One price for the entire ecosystem",
                "Or subscribe to individual tools - your call",
                "Built as one platform - no syncing lag, no broken integrations",
                "AI assistant trained on YOUR data, not generic templates",
              ].map((b) => (
                <li key={b} className="flex items-start gap-3 text-sm">
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-gradient-brand">
                    <Check className="h-3 w-3 text-brand-foreground" />
                  </span>
                  <span className="text-muted-foreground">{b}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative">
            <div className="rounded-2xl bg-gradient-card p-6 shadow-elegant">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground">Monthly tool stack</div>
                  <div className="mt-1 font-display text-2xl font-bold text-destructive">$2,200+ CAD</div>
                </div>
                <span className="rounded-full bg-destructive/15 px-3 py-1 text-xs text-destructive">Before</span>
              </div>
              <div className="my-4 space-y-2 text-sm text-muted-foreground">
                {["CRM · $500", "Analytics · $500", "Calls · $500", "Email · $300", "SMS · $200", "Chatbot · $200", "Conversations · $100"].map((x) => (
                  <div key={x} className="flex items-center justify-between rounded-lg bg-secondary/40 px-3 py-2">
                    <span>{x}</span>
                    <span className="text-muted-foreground/70">monthly</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative -mt-4 rounded-2xl bg-gradient-brand p-6 shadow-glow">
              <div className="flex items-center justify-between text-brand-foreground">
                <div>
                  <div className="text-xs uppercase tracking-wider opacity-80">CognoSales - Unified Suite</div>
                  <div className="mt-1 font-display text-3xl font-bold">$2,000<span className="text-sm font-normal opacity-80"> CAD/mo</span></div>
                </div>
                <span className="rounded-full bg-brand-foreground/15 px-3 py-1 text-xs">After</span>
              </div>
              <p className="mt-3 text-sm text-brand-foreground/90">Every tool above + AI across all of them. Or pick only what you need.</p>
              <Link to="/pricing" className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-brand-foreground underline-offset-4 hover:underline">
                See pricing <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto max-w-5xl px-4 py-24">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-brand p-10 text-center shadow-glow md:p-16">
          <h2 className="font-display text-3xl font-bold text-brand-foreground md:text-5xl">
            Ready to talk to your data?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-brand-foreground/90">
            Join the teams using CognoSales to make faster decisions and close more deals.
          </p>
          <div className="mt-8 flex items-center justify-center">
            <Link to="/contact">
              <Button size="lg" variant="secondary" className="bg-background text-foreground hover:bg-background/90">
                Talk to sales <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
