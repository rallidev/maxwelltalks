import { Brain, Users, Shield, Target } from 'lucide-react';

export function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">About Mindful Companion</h1>
          <p className="text-xl text-center text-blue-100 max-w-3xl mx-auto">
            Revolutionizing personal development through the power of AI-driven companionship and guidance
          </p>
        </div>
      </div>

      {/* Mission Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
            <p className="text-lg text-gray-600 mb-6">
              We believe everyone deserves access to high-quality mentorship and guidance. Our mission is to democratize personal development by leveraging artificial intelligence to provide personalized, expert-level coaching across multiple disciplines.
            </p>
            <img 
              src="https://images.unsplash.com/photo-1552664730-d307ca884978" 
              alt="Team collaboration" 
              className="rounded-lg shadow-lg"
            />
          </div>
          <div className="space-y-8">
            <ValueCard
              icon={<Brain className="w-8 h-8" />}
              title="Innovation"
              description="Pushing the boundaries of AI technology to create meaningful human-AI interactions"
            />
            <ValueCard
              icon={<Users className="w-8 h-8" />}
              title="Accessibility"
              description="Making expert-level guidance available to everyone, anywhere, anytime"
            />
            <ValueCard
              icon={<Shield className="w-8 h-8" />}
              title="Trust & Security"
              description="Ensuring the highest standards of privacy and data protection"
            />
            <ValueCard
              icon={<Target className="w-8 h-8" />}
              title="Impact"
              description="Creating measurable positive change in people's lives"
            />
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-12 text-center">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <ProcessCard
              number="01"
              title="Connect"
              description="Choose from our diverse range of AI companions specialized in different areas of expertise"
            />
            <ProcessCard
              number="02"
              title="Interact"
              description="Engage in meaningful conversations and receive personalized guidance tailored to your needs"
            />
            <ProcessCard
              number="03"
              title="Grow"
              description="Track your progress and achieve your personal development goals with continuous support"
            />
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <StatCard number="10k+" label="Active Users" />
            <StatCard number="50+" label="AI Companions" />
            <StatCard number="95%" label="Satisfaction Rate" />
            <StatCard number="24/7" label="Support" />
          </div>
        </div>
      </div>
    </div>
  );
}

function ValueCard({ icon, title, description }: { 
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="flex gap-4">
      <div className="flex-shrink-0">
        <div className="w-12 h-12 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
          {icon}
        </div>
      </div>
      <div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
}

function ProcessCard({ number, title, description }: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-white p-8 rounded-lg shadow-sm">
      <div className="text-4xl font-bold text-blue-600 mb-4">{number}</div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

function StatCard({ number, label }: { number: string; label: string }) {
  return (
    <div className="text-center">
      <div className="text-4xl font-bold text-blue-600 mb-2">{number}</div>
      <div className="text-gray-600">{label}</div>
    </div>
  );
}