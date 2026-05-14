"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Loader2, Heart, Check, Sparkles, Clock } from "lucide-react";
import Link from "next/link";

const PLANS = [
  {
    id: "weekly" as const,
    name: "Weekly",
    price: "R$ 18,90",
    description: "Perfect for a short-term tribute",
    duration: "Lasts 1 week",
    icon: Clock,
  },
  {
    id: "yearly" as const,
    name: "Yearly",
    price: "R$ 29,90",
    description: "Keep the memories alive for longer",
    duration: "Lasts 1 year",
    icon: Sparkles,
    featured: true,
  },
];

export default function PlansPage() {
  const router = useRouter();
  const [loading, setLoading] = useState<string | null>(null);

  const handleSelectPlan = async (planId: string) => {
    setLoading(planId);

    // TODO: Integrate Stripe payment here
    // const res = await fetch("/api/create-checkout", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ plan: planId }),
    // });
    // const { url } = await res.json();
    // window.location.replace(url);

    // For now, redirect straight to create after plan selection
    setTimeout(() => {
      router.push("/create");
    }, 500);
  };

  return (
    <div className="min-h-screen bg-background p-6 md:p-12 lg:p-24 flex flex-col">
      <div className="max-w-2xl mx-auto w-full flex-1 flex flex-col justify-center">
        <Link
          href="/"
          className="inline-flex items-center text-muted hover:text-foreground mb-12 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Home
        </Link>

        <div className="mb-12 space-y-2 text-center">
          <div className="flex items-center justify-center space-x-2 text-primary mb-2">
            <Heart className="w-5 h-5 fill-current" />
            <span className="text-xs font-bold uppercase tracking-[0.2em]">
              Choose your plan
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-medium">
            How long should it last?
          </h1>
          <p className="text-muted font-light text-lg max-w-md mx-auto">
            Pick a plan that matches how long you want this memento to be
            visible.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto w-full">
          {PLANS.map((plan) => {
            const Icon = plan.icon;
            const isSelected = loading === plan.id;

            return (
              <button
                key={plan.id}
                onClick={() => handleSelectPlan(plan.id)}
                disabled={loading !== null}
                className={`relative text-left bg-white/50 p-8 rounded-[2.5rem] border-2 transition-all duration-300 shadow-sm hover:shadow-lg disabled:opacity-60 ${
                  plan.featured
                    ? "border-primary shadow-md hover:shadow-primary/10"
                    : "border-border/50 hover:border-primary/50"
                } ${isSelected ? "scale-[0.98]" : "hover:-translate-y-1"}`}
              >
                {plan.featured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white text-[10px] font-bold uppercase tracking-[0.2em] px-4 py-1.5 rounded-full">
                    Best value
                  </div>
                )}

                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 ${
                    plan.featured
                      ? "bg-primary/10 text-primary"
                      : "bg-secondary/50 text-muted"
                  }`}
                >
                  <Icon className="w-6 h-6" />
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-2xl font-serif font-medium">
                      {plan.name}
                    </h3>
                    <p className="text-muted text-sm mt-1">
                      {plan.description}
                    </p>
                  </div>

                  <div>
                    <span className="text-4xl font-serif font-medium">
                      {plan.price}
                    </span>
                  </div>

                  <div className="flex items-center text-xs text-muted uppercase tracking-wider font-medium">
                    <Check className="w-3 h-3 mr-2 text-primary" />
                    {plan.duration}
                  </div>

                  <div
                    className={`w-full py-4 rounded-2xl text-center font-medium transition-all ${
                      isSelected
                        ? "bg-primary/20 text-primary"
                        : plan.featured
                          ? "bg-primary text-white hover:bg-accent"
                          : "bg-white border border-border/50 text-foreground hover:border-primary"
                    }`}
                  >
                    {isSelected ? (
                      <span className="flex items-center justify-center">
                        <Loader2 className="w-4 h-4 animate-spin mr-2" />
                        Redirecting...
                      </span>
                    ) : (
                      `Choose ${plan.name}`
                    )}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        <p className="text-center text-[10px] text-muted/40 uppercase tracking-[0.3em] mt-12">
          Secure payment via Stripe
        </p>
      </div>
    </div>
  );
}
