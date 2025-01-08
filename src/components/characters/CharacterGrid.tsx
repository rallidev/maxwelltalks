import { useEffect } from 'react';
import { useCharacterStore } from '../../store/characterStore';
import { CharacterCard } from './CharacterCard';
import { Character } from '../../types';
import { Loader2 } from 'lucide-react';

interface CharacterGridProps {
  onSelectCharacter: (character: Character) => void;
}

export function CharacterGrid({ onSelectCharacter }: CharacterGridProps) {
  const { characters, loading, error, fetchCharacters } = useCharacterStore();

  useEffect(() => {
    fetchCharacters();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 py-8">
        {error}
      </div>
    );
  }

  if (!characters.length) {
    return (
      <div className="text-center text-gray-500 py-8">
        No characters available at the moment.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {characters.map((character) => (
        <CharacterCard
          key={character.id}
          character={character}
          onSelect={onSelectCharacter}
        />
      ))}
    </div>
  );
}