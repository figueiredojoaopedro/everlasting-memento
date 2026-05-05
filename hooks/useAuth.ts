import { useState, useEffect } from 'react';
import { onAuthStateChanged, signInAnonymously, User } from 'firebase/auth';
import { auth } from '@/lib/firebase';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!auth) {
      setLoading(false);
      return;
    }
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
      } else {
        // For MVP, we can auto-sign in anonymously if not logged in
        // This ensures every memento has a userId
        try {
          const cred = await signInAnonymously(auth);
          setUser(cred.user);
        } catch (error) {
          console.error("Anonymous auth failed", error);
          setUser(null);
        }
      }
      setLoading(loading => false);
    });

    return () => unsubscribe();
  }, []);

  return { user, loading };
}
