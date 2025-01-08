import { useState, useEffect } from 'react';
import { useAuthStore } from '../../store/authStore';
import { Button } from '../ui/Button';
import { supabase } from '../../lib/supabase';

interface UserProfileFormProps {
  categoryId: string;
}

export function UserProfileForm({ categoryId }: UserProfileFormProps) {
  const { user } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    goals: '',
    challenges: '',
    preferences: ''
  });

  useEffect(() => {
    if (user) {
      setForm({
        goals: user.goals || '',
        challenges: user.challenges || '',
        preferences: user.preferences || ''
      });
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          goals: form.goals,
          challenges: form.challenges,
          preferences: form.preferences
        })
        .eq('id', user.id);

      if (error) throw error;
      alert('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          What are your goals?
        </label>
        <textarea
          value={form.goals}
          onChange={(e) => setForm(f => ({ ...f, goals: e.target.value }))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          rows={3}
          placeholder="What do you want to achieve?"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          What challenges are you facing?
        </label>
        <textarea
          value={form.challenges}
          onChange={(e) => setForm(f => ({ ...f, challenges: e.target.value }))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          rows={3}
          placeholder="What obstacles are in your way?"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Any specific preferences or requirements?
        </label>
        <textarea
          value={form.preferences}
          onChange={(e) => setForm(f => ({ ...f, preferences: e.target.value }))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          rows={3}
          placeholder="What approach works best for you?"
        />
      </div>

      <Button type="submit" disabled={loading}>
        {loading ? 'Saving...' : 'Save Profile'}
      </Button>
    </form>
  );
}