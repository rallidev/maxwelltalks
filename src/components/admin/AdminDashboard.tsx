import { useState, useEffect } from 'react';
import { useCharacterStore } from '../../store/characterStore';
import { CharacterForm } from './CharacterForm';
import { Button } from '../ui/Button';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { Character } from '../../types';

export function AdminDashboard() {
  const { characters, fetchCharacters } = useCharacterStore();
  const [showForm, setShowForm] = useState(false);
  const [editingCharacter, setEditingCharacter] = useState<Character | null>(null);

  useEffect(() => {
    fetchCharacters();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this character?')) return;
    
    const { error } = await supabase
      .from('characters')
      .delete()
      .eq('id', id);
      
    if (error) {
      alert('Error deleting character');
      return;
    }
    
    fetchCharacters();
  };

  const handleSuccess = () => {
    setShowForm(false);
    setEditingCharacter(null);
    fetchCharacters();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Manage Characters</h2>
        <Button onClick={() => setShowForm(true)} className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add Character
        </Button>
      </div>

      {(showForm || editingCharacter) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-medium mb-4">
              {editingCharacter ? 'Edit Character' : 'New Character'}
            </h3>
            <CharacterForm 
              character={editingCharacter || undefined}
              onSuccess={handleSuccess}
            />
            <Button 
              variant="ghost" 
              onClick={() => {
                setShowForm(false);
                setEditingCharacter(null);
              }}
              className="mt-4"
            >
              Cancel
            </Button>
          </div>
        </div>
      )}

      <div className="bg-white shadow rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Character
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Specialty
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {characters.map((character) => (
              <tr key={character.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <img 
                      className="h-10 w-10 rounded-full"
                      src={character.avatar_url}
                      alt={character.name}
                    />
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {character.name}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{character.specialty}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setEditingCharacter(character)}
                    className="mr-2"
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(character.id)}
                  >
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}