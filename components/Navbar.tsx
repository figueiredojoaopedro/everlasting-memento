import Link from "next/link";
import { Heart } from "lucide-react";

export function Navbar() {
  return (
    <nav className="p-6 md:p-10 flex justify-between items-center z-10">
      <Link href="/" className="flex items-center space-x-2">
        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
          <Heart className="w-4 h-4 text-white fill-current" />
        </div>
        <span className="font-serif font-medium text-xl tracking-tight">
          Everlasting
        </span>
      </Link>
      <Link
        href="/login"
        className="text-sm font-medium text-muted hover:text-foreground transition-colors border border-border/50 px-5 py-2.5 rounded-full hover:border-primary/50"
      >
        Sign in
      </Link>
    </nav>
  );
}
