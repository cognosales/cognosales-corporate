import { createFileRoute } from "@tanstack/react-router";
import { Brain, Users, Sparkles, Target, Heart, Rocket } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — CognoSales" },
      { name: "description", content: "We're transforming dealership software from storing data to talking to data — putting AI at the center of every decision." },
      { property: "og:title", content: "About CognoSales" },
      { property: "og:description", content: "AI at the center. Data on every side. One ecosystem for the modern dealership." },
    ],
  }),
  component: AboutPage,
});

const values = [
  { icon: Brain, title: "AI-native, not bolted on", body: "Every module was designed around an AI core — not a chatbot pasted onto legacy software." },
  { icon: Sparkles, title: "Talk to your data", body: "Stop digging through dashboards. Ask a question, get an answer, take action." },
  { icon: Target, title: "One price, one platform", body: "Replace 6 tools with one ecosystem — or pick only the modules you need." },
  { icon: Rocket, title: "Built for speed", body: "A unified data layer means no lag, no syncing, no waiting between tools." },
  { icon: Users, title: "Made with operators", body: "Built side-by-side with sales teams, marketers and inventory specialists across industries." },
  { icon: Heart, title: "Customer obsessed", body: "Your success is our roadmap. Real humans, real fast, every step." },
];

function AboutPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-gradient-hero">
        <div className="container mx-auto max-w-5xl px-4 py-24 text-center md:py-32">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-3 py-1 text-xs text-muted-foreground">
            About CognoSales
          </span>
          <h1 className="mt-6 font-display text-4xl font-bold leading-tight md:text-6xl">
            Transforming CRM <br />
            <span className="text-gradient">from storing to talking.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            For decades, dealership software just stored data. We built CognoSales so your data finally talks back —
            connecting CRM, inventory, analytics, marketing and conversations into one intelligent ecosystem.
          </p>
        </div>
      </section>

      <section className="container mx-auto max-w-6xl px-4 py-20">
        <div className="grid items-start gap-12 md:grid-cols-2">
          <div>
            <h2 className="font-display text-3xl font-bold md:text-4xl">Our mission</h2>
            <p className="mt-4 text-muted-foreground">
              Dealers are drowning in tools — a CRM here, an analytics dashboard there, an inventory system, a marketing platform,
              a chatbot tacked on. The data sits in silos. The decisions get slower. The opportunities slip away.
            </p>
            <p className="mt-4 text-muted-foreground">
              CognoSales puts <span className="text-foreground font-medium">AI at the center</span>, with every data source
              feeding into it. Ask a question across CRM, inventory, ads and conversations — get a single, intelligent answer.
              That's how modern dealerships sell.
            </p>
          </div>
          <div className="rounded-2xl bg-gradient-card p-8 shadow-card">
            <h3 className="font-display text-xl font-semibold">By the numbers</h3>
            <div className="mt-6 grid grid-cols-2 gap-6">
              {[
                { k: "6+", v: "Tools replaced" },
                { k: "1", v: "Unified data layer" },
                { k: "10x", v: "Faster decisions" },
                { k: "24/7", v: "AI assistant" },
              ].map((s) => (
                <div key={s.v}>
                  <div className="font-display text-3xl font-bold text-gradient">{s.k}</div>
                  <div className="mt-1 text-sm text-muted-foreground">{s.v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto max-w-6xl px-4 pb-24">
        <h2 className="text-center font-display text-3xl font-bold md:text-4xl">What we believe</h2>
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {values.map((v) => (
            <div key={v.title} className="rounded-2xl bg-gradient-card p-6 shadow-card transition-smooth hover:-translate-y-1 hover:shadow-glow">
              <span className="grid h-11 w-11 place-items-center rounded-lg bg-gradient-brand shadow-glow">
                <v.icon className="h-5 w-5 text-brand-foreground" />
              </span>
              <h3 className="mt-4 font-display text-lg font-semibold">{v.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{v.body}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}