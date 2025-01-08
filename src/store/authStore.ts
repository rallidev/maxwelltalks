import { create } from 'zustand';
import { User } from '../types';
import { supabase } from '../lib/supabase';

interface AuthState {
  user: User | null;
  loading: boolean;
  setUser: (user: User | null) => void;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, fullName: string) => Promise<void>;
  signOut: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: true,
  setUser: (user) => set({ user }),
  
  signIn: async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    if (error) {
      if (error.message === 'Invalid login credentials') {
        throw new Error('Invalid email or password');
      }
      throw error;
    }

    if (data.user) {
      // Ensure profile exists
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', data.user.id)
        .single();

      if (profileError && profileError.code === 'PGRST116') {
        // Profile doesn't exist, create it
        const { error: insertError } = await supabase
          .from('profiles')
          .insert([{
            id: data.user.id,
            email: data.user.email,
            created_at: data.user.created_at
          }]);

        if (insertError) throw insertError;
      } else if (profileError) {
        throw profileError;
      }
    }
  },

  signUp: async (email, password, fullName) => {
    const { data: { user }, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    });

    if (signUpError) throw signUpError;

    // Profile creation is handled by the database trigger
  },

  signOut: async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    set({ user: null });
  },
}));