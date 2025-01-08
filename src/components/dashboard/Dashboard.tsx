import { useState } from 'react';
import { useAuthStore } from '../../store/authStore';
import { Navbar } from '../layout/Navbar';
import { CategoryGrid } from '../categories/CategoryGrid';
import { CategoryView } from '../categories/CategoryView';
import { AdminDashboard } from '../admin/AdminDashboard';
import { Category } from '../../types';

export function Dashboard() {
  const { user } = useAuthStore();
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  if (user?.is_admin) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <AdminDashboard />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {selectedCategory ? (
          <CategoryView 
            category={selectedCategory} 
            onBack={() => setSelectedCategory(null)}
          />
        ) : (
          <CategoryGrid onSelectCategory={setSelectedCategory} />
        )}
      </main>
    </div>
  );
}