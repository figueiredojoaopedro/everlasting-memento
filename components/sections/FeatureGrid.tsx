import { Sparkles, Shield, Share2 } from "lucide-react";

export function FeatureGrid() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-24 grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
      <div className="space-y-4">
        <div className="w-12 h-12 bg-secondary/50 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <Sparkles className="w-6 h-6 text-primary" />
        </div>
        <h3 className="text-xl font-serif font-medium">Emotional Focus</h3>
        <p className="text-muted text-sm leading-relaxed font-light">
          Not just photos. Turn your moments into a story that lives on.
        </p>
      </div>
      <div className="space-y-4">
        <div className="w-12 h-12 bg-secondary/50 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <Shield className="w-6 h-6 text-primary" />
        </div>
        <h3 className="text-xl font-serif font-medium">
          Private by Default
        </h3>
        <p className="text-muted text-sm leading-relaxed font-light">
          Your memento is private. You decide when and who to share it with.
          No social media noise.
        </p>
      </div>
      <div className="space-y-4">
        <div className="w-12 h-12 bg-secondary/50 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <Share2 className="w-6 h-6 text-primary" />
        </div>
        <h3 className="text-xl font-serif font-medium">
          Beautiful Sharing
        </h3>
        <p className="text-muted text-sm leading-relaxed font-light">
          Share a clean, read-only timeline that looks like a digital art
          gallery of your moments.
        </p>
      </div>
    </div>
  );
}
