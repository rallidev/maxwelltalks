import { useState } from 'react';
import { Button } from '../ui/Button';
import { supabase } from '../../lib/supabase';
import { Character } from '../../types';

interface CharacterFormProps {
  character?: Character;
  onSuccess: () => void;
}

export function CharacterForm({ character, onSuccess }: CharacterFormProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: character?.name || '',
    avatar_url: character?.avatar_url || '',
    specialty: character?.specialty || '',
    background: character?.background || '',
    conversation_style: character?.conversation_style || ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (character) {
        const { error } = await supabase
          .from('characters')
          .update(form)
          .eq('id', character.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('characters')
          .insert([form]);
        if (error) throw error;
      }
      onSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Name</label>
        <input
          type="text"
          value={form.name}
          onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Avatar URL</label>
        <input
          type="url"
          value={form.avatar_url}
          onChange={e => setForm(f => ({ ...f, avatar_url: e.target.value }))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Specialty</label>
        <input
          type="text"
          value={form.specialty}
          onChange={e => setForm(f => ({ ...f, specialty: e.target.value }))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Background</label>
        <textarea
          value={form.background}
          onChange={e => setForm(f => ({ ...f, background: e.target.value }))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          required
          rows={3}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Conversation Style</label>
        <input
          type="text"
          value={form.conversation_style}
          onChange={e => setForm(f => ({ ...f, conversation_style: e.target.value }))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          required
        />
      </div>

      {error && <div className="text-red-500 text-sm">{error}</div>}

      <Button type="submit" disabled={loading}>
        {loading ? 'Saving...' : character ? 'Update Character' : 'Create Character'}
      </Button>
    </form>
  );
}