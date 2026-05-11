import { Pen, Image, Share2 } from "lucide-react";

const STEPS = [
  {
    number: "01",
    icon: Pen,
    title: "Create your memento",
    description:
      "Give it a title, pick a date, and upload a cover image. It takes less than a minute.",
  },
  {
    number: "02",
    icon: Image,
    title: "Add your memories",
    description:
      "Photos, descriptions, dates, and what each moment means to you. Build your story one memory at a time.",
  },
  {
    number: "03",
    icon: Share2,
    title: "Share with who matters",
    description:
      "Send the private link. They see a beautiful timeline — no ads, no algorithms, no noise.",
  },
];

export function HowItWorks() {
  return (
    <div className="w-full py-24 md:py-32">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-16 md:mb-20 space-y-4">
          <h2 className="text-4xl md:text-5xl font-serif font-medium text-foreground leading-tight">
            How it works
          </h2>
          <p className="text-lg md:text-xl text-muted font-light max-w-xl mx-auto leading-relaxed">
            Three simple steps. No clutter, no learning curve.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16">
          {STEPS.map((step, i) => (
            <div key={i} className="text-center space-y-5">
              <div className="relative">
                <div className="w-16 h-16 mx-auto rounded-2xl bg-primary/10 flex items-center justify-center">
                  <step.icon className="w-7 h-7 text-primary" />
                </div>
                <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-primary text-white text-[10px] font-bold flex items-center justify-center">
                  {step.number}
                </span>
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-serif font-medium text-foreground">
                  {step.title}
                </h3>
                <p className="text-muted text-sm leading-relaxed font-light">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
