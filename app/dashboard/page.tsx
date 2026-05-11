"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { collection, query, where, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/hooks/useAuth";
import { Memento } from "@/types";
import {
  Plus,
  Heart,
  Loader2,
  Clock,
  Sparkles,
  AlertTriangle,
} from "lucide-react";
import Link from "next/link";
import { differenceInDays } from "date-fns";

function MementoRow({ memento }: { memento: Memento }) {
  const [now] = useState(() => Date.now());
  const isExpired = memento.expiresAt && memento.expiresAt < now;
  const isPending = !memento.plan;
  const daysLeft =
    memento.expiresAt && differenceInDays(memento.expiresAt, now);

  return (
    <Link
      key={memento.id}
      href={`/m/${memento.id}`}
      className="block bg-white/50 rounded-[2rem] border border-border/50 overflow-hidden transition-all hover:shadow-md hover:-translate-y-0.5 active:translate-y-0"
    >
      <div className="flex items-center p-4 md:p-6 space-x-4">
        <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl overflow-hidden shrink-0 bg-secondary">
          {memento.coverImageUrl ? (
            <img
              src={memento.coverImageUrl}
              alt={memento.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Heart className="w-6 h-6 text-primary/40" />
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-serif font-medium text-lg truncate">
            {memento.title}
          </h3>
          {memento.whoIsThisFor && (
            <p className="text-xs text-muted italic truncate mt-0.5">
              For {memento.whoIsThisFor}
            </p>
          )}
          <div className="flex items-center mt-2 space-x-3">
            {isPending ? (
              <span className="inline-flex items-center text-[10px] font-bold uppercase tracking-wider text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full">
                <Clock className="w-3 h-3 mr-1" />
                No plan
              </span>
            ) : isExpired ? (
              <span className="inline-flex items-center text-[10px] font-bold uppercase tracking-wider text-red-600 bg-red-50 px-2.5 py-1 rounded-full">
                <AlertTriangle className="w-3 h-3 mr-1" />
                Expired
              </span>
            ) : (
              <span className="inline-flex items-center text-[10px] font-bold uppercase tracking-wider text-green-600 bg-green-50 px-2.5 py-1 rounded-full">
                <Sparkles className="w-3 h-3 mr-1" />
                {daysLeft != null && daysLeft > 0
                  ? `${daysLeft}d left`
                  : "Active"}
              </span>
            )}
            {memento.plan && (
              <span className="text-[10px] text-muted/60 uppercase tracking-wider font-medium">
                {memento.plan === "yearly" ? "Yearly" : "Weekly"}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function Dashboard() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [mementos, setMementos] = useState<Memento[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authLoading) return;
    if (!user || !db) {
      router.push("/login");
      return;
    }

    const q = query(
      collection(db, "mementos"),
      where("userId", "==", user.uid),
      orderBy("createdAt", "desc"),
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(
        (doc) => ({ id: doc.id, ...doc.data() }) as Memento,
      );
      setMementos(data);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user, authLoading, router]);

  if (authLoading || loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-background">
        <Loader2 className="w-8 h-8 text-primary animate-spin mb-4" />
        <p className="text-muted font-serif italic">Loading your mementos...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="bg-white/50 border-b border-border/50">
        <div className="max-w-2xl mx-auto px-6 py-8 md:py-12">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-2 text-primary mb-2">
                <Heart className="w-4 h-4 fill-current" />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em]">
                  Dashboard
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-serif font-medium">
                My Mementos
              </h1>
            </div>
            <Link
              href="/create"
              className="bg-primary hover:bg-accent text-white p-4 rounded-full transition-all shadow-lg hover:shadow-primary/20"
            >
              <Plus className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Memento List */}
      <main className="max-w-2xl mx-auto px-6 py-8">
        {mementos.length === 0 ? (
          <div className="text-center py-24 bg-white/50 rounded-[2.5rem] border border-dashed border-border flex flex-col items-center">
            <div className="w-16 h-16 bg-secondary/50 rounded-full flex items-center justify-center mb-6">
              <Heart className="w-8 h-8 text-primary/40" />
            </div>
            <p className="text-muted mb-6 max-w-[240px] mx-auto">
              You haven&apos;t created any mementos yet.
            </p>
            <Link
              href="/create"
              className="bg-primary hover:bg-accent text-white px-8 py-3 rounded-full font-medium transition-all"
            >
              Create your first memento
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {mementos.map((memento) => <MementoRow key={memento.id} memento={memento} />)}
          </div>
        )}
      </main>

      {/* Create FAB */}
      <Link
        href="/create"
        className="fixed bottom-8 right-8 bg-primary hover:bg-accent text-white p-5 rounded-full shadow-2xl transition-all transform hover:scale-110 active:scale-95"
      >
        <Plus className="w-6 h-6" />
      </Link>
    </div>
  );
}
