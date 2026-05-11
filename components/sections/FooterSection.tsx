import { Heart } from "lucide-react";

export function FooterSection() {
  return (
    <footer className="py-12 border-t border-border/50 text-center space-y-4">
      <div className="flex items-center justify-center space-x-2 mb-2">
        <Heart className="w-4 h-4 text-primary fill-current" />
        <span className="font-serif font-medium text-lg tracking-tight">
          Everlasting
        </span>
      </div>
      <p className="text-muted/60 text-xs uppercase tracking-widest">
        Built for the moments that matter.
      </p>
      <p className="text-muted/40 text-[10px] pt-4">
        &copy; {new Date().getFullYear()} Everlasting Mementos.
      </p>
    </footer>
  );
}
