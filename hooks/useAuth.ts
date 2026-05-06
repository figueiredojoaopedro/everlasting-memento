import { useState, useEffect } from "react";
import { onAuthStateChanged, signInAnonymously, User } from "firebase/auth";
import { auth } from "@/lib/firebase";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean | null>(auth ? true : false);

  useEffect(() => {
    const firebaseAuth = auth;
    if (!firebaseAuth) return;

    const unsubscribe = onAuthStateChanged(firebaseAuth, async (user) => {
      if (user) {
        setUser(user);
      } else {
        try {
          const cred = await signInAnonymously(firebaseAuth);
          setUser(cred.user);
        } catch (error) {
          console.error("Anonymous auth failed", error);
          setUser(null);
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { user, loading };
}
