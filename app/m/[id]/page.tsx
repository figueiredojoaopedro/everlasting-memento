'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { doc, getDoc, collection, query, where, orderBy, onSnapshot, deleteDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuth } from '@/hooks/useAuth';
import { Memento, Memory } from '@/types';
import { Plus, Share2, Calendar as CalendarIcon, Heart, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { format } from 'date-fns';
import { MemoryCard } from '@/components/MemoryCard';

export default function MementoDashboard() {
  const { id } = useParams();
  const { user, loading: authLoading } = useAuth();
  const [memento, setMemento] = useState<Memento | null>(null);
  const [memories, setMemories] = useState<Memory[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (!id || !db) return;

    const fetchMemento = async () => {
      const docRef = doc(db, 'mementos', id as string);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        // Check if user owns this memento
        if (user && data.userId !== user.uid) {
          router.push('/');
          return;
        }
        setMemento({ id: docSnap.id, ...data } as Memento);
      } else {
        router.push('/');
      }
    };

    if (!authLoading) {
      fetchMemento();
    }

    // Real-time listener for memories
    const memoriesRef = collection(db, 'memories');
    const q = query(
      memoriesRef,
      where('mementoId', '==', id),
      orderBy('date', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const memoriesData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Memory[];
      setMemories(memoriesData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [id, router, user, authLoading]);

  const handleShare = () => {
    const shareUrl = `${window.location.origin}/view/${id}`;
    navigator.clipboard.writeText(shareUrl);
    alert('Share link copied to clipboard!');
  };

  const handleDeleteMemory = async (memoryId: string) => {
    if (!confirm('Are you sure you want to delete this memory?')) return;
    
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

  if (authLoading || loading) return (
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
