import { useNavigate } from 'react-router-dom';
import { Character } from '../../types';
import { CharacterGrid } from './CharacterGrid';

export function CharacterSelection() {
  const navigate = useNavigate();

  const handleSelectCharacter = (character: Character) => {
    navigate(`/chat/${character.id}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h2 className="text-2xl font-bold mb-6">Choose Your Companion</h2>
      <CharacterGrid onSelectCharacter={handleSelectCharacter} />
    </div>
  );
}