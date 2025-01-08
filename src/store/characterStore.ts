import { create } from 'zustand';
import { Character } from '../types';
import { supabase } from '../lib/supabase';

interface CharacterState {
  characters: Character[];
  loading: boolean;
  error: string | null;
  fetchCharacters: () => Promise<void>;
}

export const useCharacterStore = create<CharacterState>((set) => ({
  characters: [],
  loading: false,
  error: null,
  fetchCharacters: async () => {
    set({ loading: true, error: null });
    try {
      const { data, error } = await supabase
        .from('characters')
        .select('*')
        .order('name');
      
      if (error) throw error;
      set({ characters: data || [] });
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Failed to fetch characters' });
    } finally {
      set({ loading: false });
    }
  },
}));