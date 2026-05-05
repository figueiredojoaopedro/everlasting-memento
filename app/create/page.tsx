'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '@/lib/firebase';
import { useAuth } from '@/hooks/useAuth';
import { Camera, Calendar, User, ArrowLeft, Loader2, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function CreateMemento() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [title, setTitle] = useState('Our Story');
  const [date, setDate] = useState('');
  const [whoIsThisFor, setWhoIsThisFor] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !db || !storage) {
      alert('Firebase is not configured. Please check your environment variables.');
      return;
    }

    setIsSubmitting(true);
    try {
      let coverImageUrl = '';
      if (image) {
        const storageRef = ref(storage, `mementos/${user.uid}/${Date.now()}-${image.name}`);
        const snapshot = await uploadBytes(storageRef, image);
        coverImageUrl = await getDownloadURL(snapshot.ref);
      }

      const mementoData = {
        userId: user.uid,
        title,
        date,
        whoIsThisFor,
        coverImageUrl,
        createdAt: Date.now(),
      };

      const docRef = await addDoc(collection(db, 'mementos'), mementoData);
      router.push(`/m/${docRef.id}`);
    } catch (error) {
      console.error('Error creating memento:', error);
      alert('Failed to create memento. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (authLoading) return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background">
      <Loader2 className="w-8 h-8 text-primary animate-spin" />
    </div>
  );

  return (
    <div className="min-h-screen bg-background p-6 md:p-12 lg:p-24">
      <div className="max-w-2xl mx-auto">
        <Link href="/" className="inline-flex items-center text-muted hover:text-foreground mb-12 transition-colors group">
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to start
        </Link>

        <div className="mb-12 space-y-2">
          <div className="flex items-center space-x-2 text-primary mb-2">
            <Sparkles className="w-5 h-5" />
            <span className="text-xs font-bold uppercase tracking-[0.2em]">New Journey</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-medium">Create your space</h1>
          <p className="text-muted font-light text-lg">Every great story begins with a single moment.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-10 bg-white/50 p-8 md:p-12 rounded-[2.5rem] border border-border/50 shadow-sm">
          <div className="space-y-4">
            <label className="text-xs font-bold text-muted uppercase tracking-[0.2em]">What is this story called?</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-white border border-border/50 rounded-2xl p-5 text-xl font-serif focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all shadow-sm"
              placeholder="e.g. Our Summer in Paris"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <label className="text-xs font-bold text-muted uppercase tracking-[0.2em] flex items-center">
                <Calendar className="w-3 h-3 mr-2" />
                Date (Optional)
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full bg-white border border-border/50 rounded-2xl p-4 focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all shadow-sm"
              />
            </div>
            <div className="space-y-4">
              <label className="text-xs font-bold text-muted uppercase tracking-[0.2em] flex items-center">
                <User className="w-3 h-3 mr-2" />
                Who is this for?
              </label>
              <input
                type="text"
                value={whoIsThisFor}
                onChange={(e) => setWhoIsThisFor(e.target.value)}
                className="w-full bg-white border border-border/50 rounded-2xl p-4 focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all shadow-sm"
                placeholder="Optional"
              />
            </div>
          </div>

          <div className="space-y-4">
            <label className="text-xs font-bold text-muted uppercase tracking-[0.2em] flex items-center">
              <Camera className="w-3 h-3 mr-2" />
              Cover Image
            </label>
            <div 
              className={`relative border-2 border-dashed border-border/50 rounded-[2rem] h-64 flex flex-col items-center justify-center cursor-pointer overflow-hidden transition-all hover:border-primary bg-white/50 group ${imagePreview ? 'border-none shadow-xl' : ''}`}
              onClick={() => document.getElementById('image-upload')?.click()}
            >
              {imagePreview ? (
                <>
                  <img src={imagePreview} alt="Preview" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <p className="text-white font-medium px-6 py-2 border border-white/30 rounded-full backdrop-blur-md">Change image</p>
                  </div>
                </>
              ) : (
                <div className="text-center p-8 space-y-3">
                  <div className="w-12 h-12 bg-secondary/50 rounded-2xl flex items-center justify-center mx-auto mb-2 text-primary/40 group-hover:text-primary transition-colors">
                    <Camera className="w-6 h-6" />
                  </div>
                  <p className="text-muted font-medium">Upload a cover photo</p>
                  <p className="text-[10px] text-muted/60 uppercase tracking-widest">Something that represents this story</p>
                </div>
              )}
              <input
                id="image-upload"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </div>
          </div>

          <div className="pt-6">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-primary hover:bg-accent text-white font-medium py-5 rounded-2xl transition-all duration-300 disabled:opacity-50 shadow-lg hover:shadow-primary/20 transform hover:-translate-y-1 active:translate-y-0 flex items-center justify-center"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin mr-3" />
                  Creating your space...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 mr-2" />
                  Create my space
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
