import { useState } from 'react';
import { Button } from '../ui/Button';
import { Mail, Phone, MapPin } from 'lucide-react';

export function ContactPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', form);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 gap-16">
          <div>
            <h1 className="text-4xl font-bold mb-8">Get in Touch</h1>
            <p className="text-gray-600 mb-8">
              Have questions about Mindful Companion? We're here to help.
            </p>

            <div className="space-y-6">
              <ContactInfo 
                icon={<Mail className="w-6 h-6" />}
                title="Email"
                content="support@mindfulcompanion.ai"
              />
              <ContactInfo 
                icon={<Phone className="w-6 h-6" />}
                title="Phone"
                content="+1 (555) 123-4567"
              />
              <ContactInfo 
                icon={<MapPin className="w-6 h-6" />}
                title="Address"
                content="123 AI Street, Tech City, TC 12345"
              />
            </div>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-sm">
            <h2 className="text-2xl font-semibold mb-6">Send us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  value={form.message}
                  onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  rows={6}
                  required
                />
              </div>

              <Button type="submit" className="w-full">
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

function ContactInfo({ 
  icon, 
  title, 
  content 
}: { 
  icon: React.ReactNode;
  title: string;
  content: string;
}) {
  return (
    <div className="flex items-start gap-4">
      <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
        {icon}
      </div>
      <div>
        <h3 className="font-medium">{title}</h3>
        <p className="text-gray-600">{content}</p>
      </div>
    </div>
  );
}