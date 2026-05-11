"use client";

import { Suspense, useState } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { Mail, Lock, ArrowLeft, Loader2, Heart, LogIn } from "lucide-react";
import Link from "next/link";

function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth) return;

    setError("");
    setIsSubmitting(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/dashboard");
    } catch (err: unknown) {
      if (err instanceof Error) {
        const code = (err as { code?: string }).code;
        if (code === "auth/user-not-found" || code === "auth/invalid-credential") {
          setError("No account found with this email. Please register first.");
        } else if (code === "auth/wrong-password") {
          setError("Wrong password. Try again.");
        } else if (code === "auth/invalid-email") {
          setError("Invalid email address.");
        } else {
          setError(err.message);
        }
      } else {
        setError("Login failed. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background p-6 md:p-12 lg:p-24 flex flex-col">
      <div className="max-w-md mx-auto w-full flex-1 flex flex-col justify-center">
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
              Welcome back
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-medium">
            Sign in
          </h1>
          <p className="text-muted font-light text-lg">
            Access your mementos and memories.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 bg-white/50 p-8 md:p-10 rounded-[2.5rem] border border-border/50 shadow-sm"
        >
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-5 py-4 rounded-2xl text-sm">
              {error}
            </div>
          )}

          <div className="space-y-3">
            <label className="text-xs font-bold text-muted uppercase tracking-[0.2em] flex items-center">
              <Mail className="w-3 h-3 mr-2" />
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white border border-border/50 rounded-2xl p-5 text-lg focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all shadow-sm"
              placeholder="you@example.com"
              required
            />
          </div>

          <div className="space-y-3">
            <label className="text-xs font-bold text-muted uppercase tracking-[0.2em] flex items-center">
              <Lock className="w-3 h-3 mr-2" />
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white border border-border/50 rounded-2xl p-5 text-lg focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all shadow-sm"
              placeholder="Your password"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-primary hover:bg-accent text-white font-medium py-5 rounded-2xl transition-all duration-300 disabled:opacity-50 shadow-lg hover:shadow-primary/20 transform hover:-translate-y-1 active:translate-y-0 flex items-center justify-center"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin mr-3" />
                Signing in...
              </>
            ) : (
              <>
                <LogIn className="w-5 h-5 mr-2" />
                Sign in
              </>
            )}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-sm text-muted">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="text-primary font-medium hover:underline"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="flex flex-col items-center justify-center min-h-screen bg-background">
          <Loader2 className="w-8 h-8 text-primary animate-spin" />
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
