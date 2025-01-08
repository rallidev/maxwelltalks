import { useState } from 'react';
import { Search, ArrowRight, Calendar, Clock, Tag } from 'lucide-react';

export function BlogPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const featuredPost = {
    id: 1,
    title: 'The Future of AI-Powered Personal Development',
    excerpt: 'Discover how artificial intelligence is revolutionizing the way we approach personal growth and development in 2024 and beyond.',
    category: 'AI & Technology',
    readTime: '8 min read',
    date: 'Mar 15, 2024',
    imageUrl: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee',
    author: {
      name: 'Sarah Johnson',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330'
    }
  };

  const posts = [
    {
      id: 2,
      title: 'Maximizing Your Growth with AI Companions',
      excerpt: 'Learn how to get the most out of your AI companion interactions for optimal personal development.',
      category: 'Growth',
      readTime: '6 min read',
      date: 'Mar 10, 2024',
      imageUrl: 'https://images.unsplash.com/photo-1535378917042-10a22c95931a',
      author: {
        name: 'Michael Chen',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e'
      }
    },
    {
      id: 3,
      title: 'The Science Behind AI Coaching',
      excerpt: 'Understanding the psychological principles and technology that power effective AI-based coaching.',
      category: 'Science',
      readTime: '10 min read',
      date: 'Mar 5, 2024',
      imageUrl: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485',
      author: {
        name: 'Dr. Emily Williams',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80'
      }
    },
    {
      id: 4,
      title: 'Building Better Habits with AI Support',
      excerpt: 'How artificial intelligence can help you develop and maintain positive habits more effectively.',
      category: 'Productivity',
      readTime: '7 min read',
      date: 'Mar 1, 2024',
      imageUrl: 'https://images.unsplash.com/photo-1434494878577-86c23bcb06b9',
      author: {
        name: 'Alex Thompson',
        avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12'
      }
    }
  ];

  return (
    <div className="min-h-screen bg-[#f5f5f7]">
      {/* Hero Section */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="relative">
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-14 pl-14 pr-6 rounded-2xl bg-gray-100 border-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
            <Search className="absolute left-5 top-4 text-gray-400 w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Featured Post */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-8 flex flex-col justify-center">
              <div className="flex items-center gap-2 text-sm text-blue-600 mb-4">
                <Tag className="w-4 h-4" />
                {featuredPost.category}
              </div>
              <h1 className="text-3xl font-bold mb-4">{featuredPost.title}</h1>
              <p className="text-gray-600 mb-6">{featuredPost.excerpt}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={featuredPost.author.avatar}
                    alt={featuredPost.author.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <div className="font-medium">{featuredPost.author.name}</div>
                    <div className="text-sm text-gray-500 flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {featuredPost.date}
                      <span className="mx-2">•</span>
                      <Clock className="w-4 h-4" />
                      {featuredPost.readTime}
                    </div>
                  </div>
                </div>
                <button className="text-blue-600 hover:text-blue-700 flex items-center gap-2">
                  Read More
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="relative h-[400px]">
              <img
                src={featuredPost.imageUrl}
                alt={featuredPost.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Recent Posts Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <h2 className="text-2xl font-bold mb-8">Recent Articles</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="relative h-48">
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 text-sm text-blue-600 mb-3">
                  <Tag className="w-4 h-4" />
                  {post.category}
                </div>
                <h3 className="text-xl font-semibold mb-3">{post.title}</h3>
                <p className="text-gray-600 mb-4 line-clamp-2">{post.excerpt}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={post.author.avatar}
                      alt={post.author.name}
                      className="w-8 h-8 rounded-full"
                    />
                    <div className="text-sm">
                      <div className="font-medium">{post.author.name}</div>
                      <div className="text-gray-500">{post.date}</div>
                    </div>
                  </div>
                  <div className="text-sm text-gray-500 flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {post.readTime}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}