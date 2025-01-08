import { Category } from '../../types';
import { categories } from '../../data/categories';
import { 
  BarChart3, 
  Lightbulb, 
  Dumbbell, 
  Heart, 
  UserCircle, 
  Clock 
} from 'lucide-react';

const iconMap = {
  'marketing': BarChart3,
  'strategy': Lightbulb,
  'wellness': Dumbbell,
  'mindfulness': Heart,
  'personal': UserCircle,
  'lifestyle': Clock,
};

interface CategoryGridProps {
  onSelectCategory: (category: Category) => void;
}

export function CategoryGrid({ onSelectCategory }: CategoryGridProps) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Explore Categories</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => {
          const Icon = iconMap[category.icon as keyof typeof iconMap];
          return (
            <button
              key={category.id}
              onClick={() => onSelectCategory(category)}
              className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-blue-50">
                  <Icon className="w-6 h-6 text-blue-500" />
                </div>
                <div className="text-left">
                  <h3 className="text-lg font-medium">{category.name}</h3>
                  <p className="text-sm text-gray-500">{category.description}</p>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}