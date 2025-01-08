import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageSquare } from 'lucide-react';
import { Button } from '../ui/Button';
import { Category, Character } from '../../types';
import { supabase } from '../../lib/supabase';
import { useAuthStore } from '../../store/authStore';

interface CategoryExpertsProps {
  category: Category;
}

export function CategoryExperts({ category }: CategoryExpertsProps) {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [experts, setExperts] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);
  const [userProfile, setUserProfile] = useState<any>(null);

  useEffect(() => {
    fetchExperts();
    if (user) {
      fetchUserProfile();
    }
  }, [category.id, user]);

  const fetchUserProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user?.id)
        .single();

      if (error) throw error;
      setUserProfile(data);
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const fetchExperts = async () => {
    try {
      const { data, error } = await supabase
        .from('characters')
        .select('*')
        .eq('category_id', category.id)
        .order('name');

      if (error) throw error;
      
      // Sort experts based on user's goals and challenges if available
      if (userProfile?.goals || userProfile?.challenges) {
        const sortedExperts = data.sort((a, b) => {
          const aRelevance = calculateRelevance(a, userProfile);
          const bRelevance = calculateRelevance(b, userProfile);
          return bRelevance - aRelevance;
        });
        setExperts(sortedExperts);
      } else {
        setExperts(data || []);
      }
    } catch (error) {
      console.error('Error fetching experts:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateRelevance = (expert: Character, profile: any) => {
    let score = 0;
    const profileText = `${profile.goals} ${profile.challenges}`.toLowerCase();
    const expertText = `${expert.specialty} ${expert.background}`.toLowerCase();

    // Simple keyword matching - can be enhanced with more sophisticated matching
    const keywords = profileText.split(' ');
    keywords.forEach(keyword => {
      if (expertText.includes(keyword)) {
        score += 1;
      }
    });

    return score;
  };

  if (loading) {
    return <div className="bg-white p-6 rounded-lg shadow-sm">Loading...</div>;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h3 className="text-xl font-semibold mb-6">Recommended Experts</h3>
      <div className="space-y-4">
        {experts.map((expert) => (
          <div
            key={expert.id}
            className="flex items-center gap-4 p-4 rounded-lg border border-gray-200 hover:border-blue-500 transition-colors"
          >
            <img
              src={expert.avatar_url}
              alt={expert.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div className="flex-1">
              <h4 className="font-medium">{expert.name}</h4>
              <p className="text-sm text-gray-500">{expert.specialty}</p>
              {userProfile && (
                <div className="mt-1 text-xs text-blue-600">
                  Matched based on your profile
                </div>
              )}
            </div>
            <Button
              onClick={() => navigate(`/chat/${expert.id}`)}
              className="flex items-center gap-2"
            >
              <MessageSquare className="w-4 h-4" />
              Chat
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}