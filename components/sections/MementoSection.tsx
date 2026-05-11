import Link from "next/link";
import { PhoneMockup } from "@/components/PhoneMockup";

export function MementoSection() {
  return (
    <div className="w-full bg-secondary/30 py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-12 md:gap-20">
        <PhoneMockup />

        <div className="flex-1 flex flex-col justify-center md:justify-start md:items-start max-w-lg space-y-8">
          <h2 className="text-4xl md:text-5xl font-serif font-medium text-foreground leading-tight">
            A digital memory space
          </h2>
          <p className=" text-lg md:text-xl text-muted font-light leading-relaxed">
            Create a beautiful timeline for a relationship, trip, wedding,
            anniversary or any meaningful moment.
          </p>
          <div className="grid grid-cols-2 gap-x-8 gap-y-3">
            {["Photos", "Stories", "Voice notes", "Dates", "Messages"].map(
              (item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 text-foreground"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-primary/60 shrink-0" />
                  <span className="text-sm font-medium">{item}</span>
                </div>
              ),
            )}
          </div>
          <p className="text-muted font-light leading-relaxed">
            Then privately share it with the people you love.
          </p>
          <Link
            href="/mockup"
            className="text-center inline-block bg-primary hover:bg-accent text-white font-medium px-8 py-4 rounded-full transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
          >
            See an example memento
          </Link>
        </div>
      </div>
    </div>
  );
}
