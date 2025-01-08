import { useState } from 'react';
import { useAuthStore } from '../../store/authStore';
import { Button } from '../ui/Button';
import { Category } from '../../types';
import { supabase } from '../../lib/supabase';

const categoryPrompts = {
  marketing: {
    first: 'What are your key marketing objectives?',
    second: 'What marketing challenges are you facing?'
  },
  strategy: {
    first: 'What strategic goals do you want to achieve?',
    second: 'What business challenges need addressing?'
  },
  wellness: {
    first: 'What are your fitness and wellness goals?',
    second: 'What health challenges are you experiencing?'
  },
  mindfulness: {
    first: 'What aspects of mental well-being do you want to improve?',
    second: 'What emotional challenges are you dealing with?'
  },
  personal: {
    first: 'What personal development goals do you have?',
    second: 'What growth challenges are you facing?'
  },
  lifestyle: {
    first: 'What habits do you want to develop?',
    second: 'What daily challenges do you want to overcome?'
  }
};

interface CategoryProfileProps {
  category: Category;
}

export function CategoryProfile({ category }: CategoryProfileProps) {
  const { user } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [goals, setGoals] = useState('');
  const [challenges, setChallenges] = useState('');
  
  const prompts = categoryPrompts[category.id as keyof typeof categoryPrompts];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          goals,
          challenges
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
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h3 className="text-xl font-semibold mb-6">Your {category.name} Profile</h3>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {prompts.first}
          </label>
          <textarea
            value={goals}
            onChange={(e) => setGoals(e.target.value)}
            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            rows={4}
            placeholder="Share your goals..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {prompts.second}
          </label>
          <textarea
            value={challenges}
            onChange={(e) => setChallenges(e.target.value)}
            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            rows={4}
            placeholder="Describe your challenges..."
          />
        </div>

        <Button type="submit" disabled={loading} className="w-full">
          {loading ? 'Saving...' : 'Save Profile'}
        </Button>
      </form>
    </div>
  );
}