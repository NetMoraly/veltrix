'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { SupabaseClient, Session } from '@supabase/supabase-js';

interface AuthContextType {
  session: Session | null;
  loading: boolean;
  authenticated: boolean;
  supabase: SupabaseClient<any, 'public', any>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const supabase = createClientComponentClient();

  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  const logout = async () => {
    try {
      await supabase.auth.signOut();
      setSession(null);
      setAuthenticated(false);
    } catch (error) {
      console.error('Ошибка при выходе:', error);
    }
  };

  useEffect(() => {
    async function loadSession() {
      try {
        const { data } = await supabase.auth.getSession();
        const currentSession = data?.session ?? null;

        setSession(currentSession);
        setAuthenticated(!!currentSession);
      } catch (error) {
        console.error('Ошибка загрузки сессии:', error);
      } finally {
        setLoading(false);
      }
    }

    loadSession();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setAuthenticated(!!session);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, [supabase]);

  return (
    <AuthContext.Provider value={{ session, loading, authenticated, supabase, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
