import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact - CognoSales" },
      { name: "description", content: "Talk to the CognoSales team. Book a demo, ask a question, or just say hello." },
      { property: "og:title", content: "Contact CognoSales" },
      { property: "og:description", content: "Book a demo or get in touch with our team." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [submitting, setSubmitting] = useState(false);
  return (
    <>
      <Toaster />
      <section className="relative overflow-hidden bg-gradient-hero-dark">
        <div className="container mx-auto max-w-5xl px-4 py-20 text-center md:py-28">
          <h1 className="font-display text-4xl font-bold leading-tight text-white md:text-6xl">
            Let's <span className="text-gradient">talk shop.</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-white/75">
            Book a demo, ask a question or get a custom quote. Our team usually replies within a few hours.
          </p>
        </div>
      </section>

      <section className="container mx-auto max-w-6xl px-4 pt-16 pb-24 md:pt-20">
        <div className="grid gap-10 md:grid-cols-5">
          <div className="md:col-span-2 space-y-6">
            {[
              { icon: Mail, label: "Email", value: "hello@cognosales.com" },
              { icon: MapPin, label: "Address", value: "Kelowna, British Columbia" },
              { icon: Clock, label: "Response time", value: "Within 24 hours" },
            ].map((c) => (
              <div key={c.label} className="flex items-start gap-4 rounded-2xl bg-gradient-card p-5 shadow-card">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-gradient-brand">
                  <c.icon className="h-5 w-5 text-brand-foreground" />
                </span>
                <div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground">{c.label}</div>
                  <div className="mt-1 font-medium">{c.value}</div>
                </div>
              </div>
            ))}
          </div>

          <form
            id="contact-form"
            className="md:col-span-3 rounded-2xl bg-gradient-card p-6 shadow-elegant md:p-8"
            onSubmit={(e) => {
              e.preventDefault();
              setSubmitting(true);
              setTimeout(() => {
                setSubmitting(false);
                toast.success("Message sent! We'll be in touch shortly.");
                (e.target as HTMLFormElement).reset();
              }, 700);
            }}
          >
            <h2 className="font-display text-2xl font-semibold">Send us a message</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Full name</Label>
                <Input id="name" required placeholder="Jane Doe" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Work email</Label>
                <Input id="email" type="email" required placeholder="jane@dealership.com" />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="company">Company</Label>
                <Input id="company" placeholder="Acme Auto Group" />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="message">How can we help?</Label>
                <Textarea id="message" required rows={5} placeholder="Tell us a bit about your team and goals…" />
              </div>
            </div>
            <Button
              type="submit"
              disabled={submitting}
              className="mt-6 w-full bg-gradient-brand text-brand-foreground hover:opacity-90"
            >
              {submitting ? "Sending…" : "Send message"}
            </Button>
          </form>
        </div>
      </section>
    </>
  );
}