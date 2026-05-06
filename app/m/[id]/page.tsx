'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { doc, collection, query, where, orderBy, onSnapshot, deleteDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuth } from '@/hooks/useAuth';
import { Memento, Memory } from '@/types';
import { Plus, Share2, Calendar as CalendarIcon, Heart, Loader2, Clock, Sparkles, AlertTriangle } from 'lucide-react';
import Link from 'next/link';
import { format, differenceInDays, differenceInHours } from 'date-fns';
import { MemoryCard } from '@/components/MemoryCard';

function PlanStatusBanner({ memento, id }: { memento: Memento; id: string }) {
  const [now] = useState(() => Date.now());
  const isExpired = memento.expiresAt && memento.expiresAt < now;
  const isPending = !memento.plan;

  if (isPending) {
    return (
      <div className="max-w-xl mx-auto px-6 pt-8">
        <div className="bg-amber-50 border border-amber-200/50 rounded-[2rem] p-6 flex items-center justify-between">
          <div className="flex items-start space-x-4">
            <Clock className="w-5 h-5 text-amber-500 mt-1 shrink-0" />
            <div>
              <p className="font-medium text-amber-900">Choose a plan</p>
              <p className="text-sm text-amber-700/70 mt-1">
                Pick how long you want this memento to last.
              </p>
            </div>
          </div>
          <Link
            href={`/plans?mementoId=${id}`}
            className="bg-amber-500 hover:bg-amber-600 text-white px-5 py-2.5 rounded-full text-sm font-medium transition-all shrink-0 ml-4"
          >
            Choose plan
          </Link>
        </div>
      </div>
    );
  }

  if (isExpired) {
    return (
      <div className="max-w-xl mx-auto px-6 pt-8">
        <div className="bg-red-50 border border-red-200/50 rounded-[2rem] p-6 flex items-center justify-between">
          <div className="flex items-start space-x-4">
            <AlertTriangle className="w-5 h-5 text-red-500 mt-1 shrink-0" />
            <div>
              <p className="font-medium text-red-900">Memento expired</p>
              <p className="text-sm text-red-700/70 mt-1">
                This memento expired on{" "}
                {format(new Date(memento.expiresAt!), "MMMM d, yyyy")}.
                Renew to keep it accessible.
              </p>
            </div>
          </div>
          <Link
            href={`/plans?mementoId=${id}`}
            className="bg-red-500 hover:bg-red-600 text-white px-5 py-2.5 rounded-full text-sm font-medium transition-all shrink-0 ml-4"
          >
            Renew
          </Link>
        </div>
      </div>
    );
  }

  if (memento.expiresAt) {
    const daysLeft = differenceInDays(memento.expiresAt, now);
    const hoursLeft = differenceInHours(memento.expiresAt, now);
    const isSoon = daysLeft < 7;

    return (
      <div className="max-w-xl mx-auto px-6 pt-8">
        <div
          className={`rounded-[2rem] p-4 flex items-center justify-between ${
            isSoon
              ? "bg-orange-50 border border-orange-200/50"
              : "bg-green-50 border border-green-200/50"
          }`}
        >
          <div className="flex items-center space-x-3">
            <Sparkles
              className={`w-4 h-4 ${
                isSoon ? "text-orange-500" : "text-green-500"
              }`}
            />
            <p
              className={`text-sm ${
                isSoon ? "text-orange-800" : "text-green-800"
              }`}
            >
              {daysLeft > 0
                ? `Expires in ${daysLeft} day${daysLeft === 1 ? "" : "s"}`
                : `Expires in ${hoursLeft} hour${hoursLeft === 1 ? "" : "s"}`}
            </p>
          </div>
          <span className="text-[10px] uppercase tracking-wider text-muted/60 font-medium">
            {memento.plan === "yearly" ? "Yearly" : "Weekly"} plan
          </span>
        </div>
      </div>
    );
  }

  return null;
}

export default function MementoDashboard() {
  const { id } = useParams();
  const { user } = useAuth();
  const [memento, setMemento] = useState<Memento | null>(null);
  const [memories, setMemories] = useState<Memory[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (!id || !db) return;

    const unsubMemento = onSnapshot(
      doc(db, 'mementos', id as string),
      (docSnap) => {
        if (!docSnap.exists()) {
          router.push('/');
          return;
        }
        const data = docSnap.data();
        if (user && data.userId !== user.uid) {
          router.push('/');
          return;
        }
        setMemento({ id: docSnap.id, ...data } as Memento);
        setLoading(false);
      },
    );

    const memoriesRef = collection(db, 'memories');
    const q = query(
      memoriesRef,
      where('mementoId', '==', id),
      orderBy('date', 'desc')
    );

    const unsubMemories = onSnapshot(q, (snapshot) => {
      const memoriesData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Memory[];
      setMemories(memoriesData);
    });

    return () => {
      unsubMemento();
      unsubMemories();
    };
  }, [id, router, user]);

  const handleShare = () => {
    const shareUrl = `${window.location.origin}/view/${id}`;
    navigator.clipboard.writeText(shareUrl);
    alert('Share link copied to clipboard!');
  };

  const handleDeleteMemory = async (memoryId: string) => {
    if (!confirm('Are you sure you want to delete this memory?') || !db) return;
    
    setIsDeleting(memoryId);
    try {
      await deleteDoc(doc(db, 'memories', memoryId));
    } catch (error) {
      console.error('Error deleting memory:', error);
      alert('Failed to delete memory.');
    } finally {
      setIsDeleting(null);
    }
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background">
      <Loader2 className="w-8 h-8 text-primary animate-spin mb-4" />
      <p className="text-muted font-serif italic">Loading your memento...</p>
    </div>
  );

  if (!memento) return null;

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Hero Section */}
      <div className="relative h-[40vh] md:h-[60vh] w-full overflow-hidden">
        {memento.coverImageUrl ? (
          <img 
            src={memento.coverImageUrl} 
            alt={memento.title} 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-secondary flex items-center justify-center">
            <Heart className="w-12 h-12 text-primary/40" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 text-white">
          <div className="max-w-4xl mx-auto flex items-end justify-between">
            <div className="space-y-2">
              <h1 className="text-4xl md:text-7xl font-serif font-medium leading-tight">{memento.title}</h1>
              <div className="flex items-center space-x-4 text-white/90">
                {memento.date && (
                  <p className="flex items-center text-sm md:text-base font-light">
                    <CalendarIcon className="w-4 h-4 mr-2" />
                    {format(new Date(memento.date), 'MMMM d, yyyy')}
                  </p>
                )}
                {memento.whoIsThisFor && (
                  <p className="text-sm md:text-base italic opacity-80 border-l border-white/30 pl-4">
                    For {memento.whoIsThisFor}
                  </p>
                )}
              </div>
            </div>
            <button 
              onClick={handleShare}
              className="bg-white/20 hover:bg-white/30 backdrop-blur-md text-white p-4 rounded-full transition-all group"
              title="Share Memento"
            >
              <Share2 className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      <PlanStatusBanner memento={memento} id={id as string} />

      {/* Timeline Section */}
      <main className="max-w-xl mx-auto px-6 py-16">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-2xl font-serif font-medium">Timeline</h2>
            <p className="text-xs text-muted uppercase tracking-widest mt-1">
              {memories.length} {memories.length === 1 ? 'Memory' : 'Memories'}
            </p>
          </div>
          <Link 
            href={`/m/${id}/new`}
            className="flex items-center bg-primary hover:bg-accent text-white px-6 py-3 rounded-full text-sm font-medium transition-all shadow-sm hover:shadow-md"
          >
            <Plus className="w-4 h-4 mr-1" />
            Add Memory
          </Link>
        </div>

        {memories.length === 0 ? (
          <div className="text-center py-24 bg-white/50 rounded-[2.5rem] border border-dashed border-border flex flex-col items-center">
            <div className="w-16 h-16 bg-secondary/50 rounded-full flex items-center justify-center mb-6">
              <Plus className="w-8 h-8 text-primary/40" />
            </div>
            <p className="text-muted mb-6 max-w-[200px] mx-auto">Your timeline is empty. Start by adding your first memory.</p>
            <Link 
              href={`/m/${id}/new`}
              className="text-primary font-medium hover:underline text-sm uppercase tracking-widest"
            >
              Add first memory
            </Link>
          </div>
        ) : (
          <div className="space-y-20">
            {memories.map((memory) => (
              <div key={memory.id} className={isDeleting === memory.id ? 'opacity-50 pointer-events-none' : ''}>
                <MemoryCard 
                  memory={memory} 
                  isPrivate={true} 
                  onDelete={handleDeleteMemory} 
                />
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Floating Action Button for Mobile */}
      <Link 
        href={`/m/${id}/new`}
        className="fixed bottom-8 right-8 bg-primary hover:bg-accent text-white p-5 rounded-full shadow-2xl transition-all transform hover:scale-110 active:scale-95 md:hidden"
      >
        <Plus className="w-6 h-6" />
      </Link>
    </div>
  );
}
