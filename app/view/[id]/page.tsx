'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { doc, getDoc, collection, query, where, orderBy, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Memento, Memory } from '@/types';
import { Calendar as CalendarIcon, Heart, Loader2 } from 'lucide-react';
import { format } from 'date-fns';
import { MemoryCard } from '@/components/MemoryCard';
import Link from 'next/link';

export default function PublicMementoView() {
  const { id } = useParams();
  const [memento, setMemento] = useState<Memento | null>(null);
  const [memories, setMemories] = useState<Memory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id || !db) return;

    const fetchData = async () => {
      try {
        const docRef = doc(db, 'mementos', id as string);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          setMemento({ id: docSnap.id, ...docSnap.data() } as Memento);
          
          const memoriesRef = collection(db, 'memories');
          const q = query(
            memoriesRef,
            where('mementoId', '==', id),
            orderBy('date', 'desc')
          );
          
          const querySnapshot = await getDocs(q);
          const memoriesData = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          })) as Memory[];
          setMemories(memoriesData);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background">
      <Loader2 className="w-8 h-8 text-primary animate-spin mb-4" />
      <p className="text-muted font-serif italic">Opening a shared memento...</p>
    </div>
  );

  if (!memento) return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-6 text-center">
      <h2 className="text-2xl font-serif mb-4">Memento not found</h2>
      <p className="text-muted mb-8">The link might be incorrect or the memento has been removed.</p>
      <Link href="/" className="bg-primary text-white px-8 py-3 rounded-full">Go Home</Link>
    </div>
  );

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Hero Section */}
      <div className="relative h-[50vh] md:h-[70vh] w-full overflow-hidden">
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
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-20 text-white text-center">
          <div className="max-w-4xl mx-auto space-y-4">
            <h1 className="text-5xl md:text-8xl font-serif font-medium leading-tight">{memento.title}</h1>
            <div className="flex items-center justify-center space-x-6 text-white/90">
              {memento.date && (
                <p className="flex items-center text-base md:text-lg font-light">
                  <CalendarIcon className="w-5 h-5 mr-2 opacity-70" />
                  {format(new Date(memento.date), 'MMMM d, yyyy')}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Timeline Section */}
      <main className="max-w-xl mx-auto px-6 py-16">
        <div className="text-center mb-20 space-y-4">
          <div className="inline-block px-4 py-1 bg-primary/10 rounded-full">
            <p className="text-[10px] font-bold text-primary uppercase tracking-[0.2em]">A shared journey</p>
          </div>
          {memento.whoIsThisFor && (
            <p className="text-xl md:text-2xl text-muted italic font-serif">
              "Dedicated to {memento.whoIsThisFor}"
            </p>
          )}
        </div>

        {memories.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-muted italic">No memories have been shared in this timeline yet.</p>
          </div>
        ) : (
          <div className="space-y-32">
            {memories.map((memory) => (
              <MemoryCard key={memory.id} memory={memory} />
            ))}
          </div>
        )}

        <div className="mt-40 pt-20 border-t border-border/50 text-center space-y-8">
          <div className="space-y-2">
            <h3 className="text-2xl font-serif">Every moment matters.</h3>
            <p className="text-muted">Create your own space for the things that mean the most.</p>
          </div>
          <Link 
            href="/"
            className="inline-block bg-primary hover:bg-accent text-white font-medium px-10 py-4 rounded-full transition-all shadow-md hover:shadow-lg transform hover:-translate-y-1"
          >
            Start your memento
          </Link>
          <p className="text-[10px] text-muted/40 uppercase tracking-[0.3em] pt-8">
            Everlasting Mementos
          </p>
        </div>
      </main>
    </div>
  );
}
