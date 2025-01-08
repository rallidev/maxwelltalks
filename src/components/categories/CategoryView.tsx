import { ArrowLeft } from 'lucide-react';
import { Button } from '../ui/Button';
import { Category } from '../../types';
import { CategoryProfile } from './CategoryProfile';
import { CategoryExperts } from './CategoryExperts';

interface CategoryViewProps {
  category: Category;
  onBack: () => void;
}

export function CategoryView({ category, onBack }: CategoryViewProps) {
  return (
    <div>
      <div className="flex items-center gap-4 mb-8">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h2 className="text-2xl font-bold">{category.name}</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <CategoryProfile category={category} />
        <CategoryExperts category={category} />
      </div>
    </div>
  );
}