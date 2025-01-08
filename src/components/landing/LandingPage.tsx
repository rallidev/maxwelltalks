import { Brain, Users, Shield, Sparkles } from 'lucide-react';
import { Button } from '../ui/Button';
import { useNavigate } from 'react-router-dom';
import { categories } from '../../data/categories';

export function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Your AI-Powered Personal Growth Companion
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Connect with expert AI mentors across multiple disciplines to accelerate your growth
            </p>
            <Button 
              onClick={() => navigate('/auth')}
              size="lg"
              className="bg-white text-blue-600 hover:bg-blue-50"
            >
              Get Started
            </Button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">
              Why Choose Mindful Companion?
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              icon={<Brain className="w-8 h-8" />}
              title="AI-Powered Expertise"
              description="Access personalized guidance from AI mentors trained in various disciplines"
            />
            <FeatureCard
              icon={<Users className="w-8 h-8" />}
              title="Diverse Categories"
              description="From marketing to mindfulness, find experts in multiple fields"
            />
            <FeatureCard
              icon={<Shield className="w-8 h-8" />}
              title="Secure & Private"
              description="Enterprise-grade security with Supabase authentication"
            />
            <FeatureCard
              icon={<Sparkles className="w-8 h-8" />}
              title="Personalized Growth"
              description="Tailored advice based on your goals and challenges"
            />
          </div>
        </div>
      </div>

      {/* Categories Preview */}
      <div className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Explore Growth Categories
            </h2>
            <p className="text-xl text-gray-600">
              Find the perfect mentor for your journey
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.slice(0, 3).map((category) => (
              <div 
                key={category.id}
                className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
              >
                <h3 className="text-xl font-semibold mb-2">{category.name}</h3>
                <p className="text-gray-600 mb-4">{category.description}</p>
                <Button 
                  variant="ghost"
                  onClick={() => navigate('/auth')}
                  className="text-blue-600 hover:text-blue-700"
                >
                  Learn More →
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Start Your Growth Journey?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Join thousands of others who are accelerating their personal and professional growth
          </p>
          <Button 
            onClick={() => navigate('/auth')}
            size="lg"
            className="bg-white text-blue-600 hover:bg-blue-50"
          >
            Get Started Now
          </Button>
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { 
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm text-center">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 text-blue-600 mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}