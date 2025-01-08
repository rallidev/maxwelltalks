export interface User {
  id: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
  created_at: string;
  is_admin?: boolean;
  goals?: string;
  challenges?: string;
  preferences?: string;
  subscription_status?: 'active' | 'trialing' | 'past_due' | 'canceled' | 'incomplete' | null;
  subscription_tier?: 'basic' | 'pro' | 'enterprise' | null;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export interface Character {
  id: string;
  name: string;
  avatar_url: string;
  category_id: string;
  role: string;
  specialty: string;
  background: string;
  conversation_style: string;
}

export interface ChatMessage {
  id: string;
  user_id: string;
  character_id: string;
  content: string;
  is_ai: boolean;
  created_at: string;
}

export interface UserProfile {
  goals: string;
  challenges: string;
  preferences: string;
}

export interface SubscriptionTier {
  id: 'basic' | 'pro' | 'enterprise';
  name: string;
  price: number;
  features: string[];
  priceId: string;
}