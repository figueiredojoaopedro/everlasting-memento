"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "@/lib/firebase";
import { useAuth } from "@/hooks/useAuth";
import {
  Camera,
  Calendar,
  ArrowLeft,
  Heart,
  Loader2,
  Sparkles,
} from "lucide-react";
import Link from "next/link";

export default function AddMemory() {
  const { id: mementoId } = useParams();
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [meaning, setMeaning] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
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
    if (!user || !db || !storage || !image) {
      if (!db || !storage)
        alert(
          "Firebase is not configured. Please check your environment variables.",
        );
      else if (!image) alert("Please select a photo for this memory.");
      return;
    }

    setIsSubmitting(true);
    try {
      const storageRef = ref(
        storage,
        `memories/${user.uid}/${Date.now()}-${image.name}`,
      );
      const snapshot = await uploadBytes(storageRef, image);
      const imageUrl = await getDownloadURL(snapshot.ref);

      const memoryData = {
        mementoId,
        imageUrl,
        title,
        description,
        meaning,
        date,
        createdAt: Date.now(),
      };

      await addDoc(collection(db, "memories"), memoryData);
      router.push(`/m/${mementoId}`);
    } catch (error) {
      console.error("Error adding memory:", error);
      alert("Failed to save memory. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (authLoading)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-background">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
    );

  return (
    <div className="min-h-screen bg-background p-6 md:p-12 lg:p-24">
      <div className="max-w-2xl mx-auto">
        <Link
          href={`/m/${mementoId}`}
          className="inline-flex items-center text-muted hover:text-foreground mb-12 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Timeline
        </Link>

        <div className="mb-12 space-y-2">
          <div className="flex items-center space-x-2 text-primary mb-2">
            <Heart className="w-5 h-5 fill-current" />
            <span className="text-xs font-bold uppercase tracking-[0.2em]">
              Add a Moment
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-medium">
            Capture a memory
          </h1>
          <p className="text-muted font-light text-lg">
            What makes this moment worth holding onto?
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-12">
          {/* Image Upload Area */}
          <div className="space-y-4">
            <div
              className={`relative aspect-[4/5] border-2 border-dashed border-border/50 rounded-[2.5rem] flex flex-col items-center justify-center cursor-pointer overflow-hidden transition-all hover:border-primary bg-white shadow-sm group ${imagePreview ? "border-none shadow-2xl" : ""}`}
              onClick={() => document.getElementById("image-upload")?.click()}
            >
              {imagePreview ? (
                <>
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <p className="text-white font-medium px-6 py-2 border border-white/30 rounded-full backdrop-blur-md">
                      Change photo
                    </p>
                  </div>
                </>
              ) : (
                <div className="text-center p-12 space-y-4">
                  <div className="w-16 h-16 bg-secondary/50 rounded-3xl flex items-center justify-center mx-auto mb-2 text-primary/40 group-hover:text-primary transition-colors">
                    <Camera className="w-8 h-8" />
                  </div>
                  <div>
                    <p className="text-xl font-serif font-medium">
                      Add a photo
                    </p>
                    <p className="text-sm text-muted/60 mt-1">
                      The heart of this memory
                    </p>
                  </div>
                </div>
              )}
              <input
                id="image-upload"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
                required
              />
            </div>
          </div>

          <div className="bg-white/50 p-8 md:p-12 rounded-[2.5rem] border border-border/50 shadow-sm space-y-10">
            <div className="space-y-4">
              <label className="text-xs font-bold text-muted uppercase tracking-[0.2em]">
                The Story
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full bg-white border border-border/50 rounded-2xl p-6 min-h-[120px] text-lg focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all resize-none shadow-sm"
                placeholder="What happened in this moment?"
                required
              />
            </div>

            <div className="space-y-4">
              <label className="text-xs font-bold text-muted uppercase tracking-[0.2em] flex items-center">
                <Heart className="w-3 h-3 mr-2 text-primary" />
                The Meaning
              </label>
              <input
                type="text"
                value={meaning}
                onChange={(e) => setMeaning(e.target.value)}
                className="w-full bg-white border border-border/50 rounded-2xl p-5 text-lg italic focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all shadow-sm"
                placeholder="Why does this matter to you?"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <label className="text-xs font-bold text-muted uppercase tracking-[0.2em]">
                  Title (Optional)
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-white border border-border/50 rounded-2xl p-5 focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all shadow-sm"
                  placeholder="Give it a name"
                />
              </div>
              <div className="space-y-4">
                <label className="text-xs font-bold text-muted uppercase tracking-[0.2em] flex items-center">
                  <Calendar className="w-3 h-3 mr-2" />
                  Date
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-white border border-border/50 rounded-2xl p-5 focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all shadow-sm"
                  required
                />
              </div>
            </div>

            <div className="pt-6">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary hover:bg-accent text-white font-medium py-6 rounded-2xl transition-all duration-300 disabled:opacity-50 shadow-lg hover:shadow-primary/20 transform hover:-translate-y-1 active:translate-y-0 flex items-center justify-center text-lg"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-6 h-6 animate-spin mr-3" />
                    Preserving your memory...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 mr-3" />
                    Save memory
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
