import { Character } from '../../types';
import { Button } from '../ui/Button';
import { MessageCircle } from 'lucide-react';

interface CharacterCardProps {
  character: Character;
  onSelect: (character: Character) => void;
}

export function CharacterCard({ character, onSelect }: CharacterCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <img 
        src={character.avatar_url} 
        alt={character.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-medium mb-2">{character.name}</h3>
        <p className="text-sm text-gray-600 mb-2">{character.specialty}</p>
        <p className="text-sm text-gray-500 mb-4 line-clamp-2">{character.background}</p>
        <Button 
          onClick={() => onSelect(character)}
          className="w-full flex items-center justify-center gap-2"
        >
          <MessageCircle className="w-4 h-4" />
          Chat Now
        </Button>
      </div>
    </div>
  );
}