import { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Send, History, Plus, X, ArrowLeft } from 'lucide-react';
import { Button } from '../ui/Button';
import { useAuthStore } from '../../store/authStore';
import { supabase } from '../../lib/supabase';
import { getChatResponse } from '../../lib/openai';
import type { ChatMessage, Character } from '../../types';

export function ChatInterface() {
  const { characterId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [character, setCharacter] = useState<Character | null>(null);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (characterId) {
      fetchCharacter();
      fetchMessages();
    }
  }, [characterId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const fetchCharacter = async () => {
    const { data, error } = await supabase
      .from('characters')
      .select('*')
      .eq('id', characterId)
      .single();

    if (error) {
      console.error('Error fetching character:', error);
      return;
    }

    setCharacter(data);
  };

  const fetchMessages = async () => {
    if (!user?.id || !characterId) return;
    
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .eq('character_id', characterId)
      .eq('user_id', user.id)
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Error fetching messages:', error);
      return;
    }

    setMessages(data || []);
  };

  const handleLoadPrevious = () => {
    fetchMessages();
  };

  const handleNewConversation = async () => {
    setMessages([]);
  };

  const handleEndConversation = () => {
    navigate('/dashboard');
  };

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !user || !character) return;

    setLoading(true);
    
    try {
      // Save user message
      const { data: messageData, error: messageError } = await supabase
        .from('messages')
        .insert([{
          content: newMessage,
          user_id: user.id,
          character_id: character.id,
          is_ai: false
        }])
        .select()
        .single();

      if (messageError) throw messageError;

      setMessages(prev => [...prev, messageData]);
      setNewMessage('');

      // Get AI response using OpenAI directly
      const reply = await getChatResponse(newMessage, character);

      // Save AI response
      const { data: aiMessageData, error: aiMessageError } = await supabase
        .from('messages')
        .insert([{
          content: reply,
          user_id: user.id,
          character_id: character.id,
          is_ai: true
        }])
        .select()
        .single();

      if (aiMessageError) throw aiMessageError;

      setMessages(prev => [...prev, aiMessageData]);
    } catch (error) {
      console.error('Error in chat:', error);
      alert('Failed to send message');
    } finally {
      setLoading(false);
    }
  };

  if (!character) return <div>Loading...</div>;

  return (
    <div className="flex flex-col h-screen max-h-screen">
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/dashboard')}
            className="p-2"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex items-center">
            <img
              src={character.avatar_url}
              alt={character.name}
              className="w-10 h-10 rounded-full mr-3"
            />
            <div>
              <h2 className="font-medium">{character.name}</h2>
              <p className="text-sm text-gray-500">{character.specialty}</p>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleLoadPrevious}
            className="flex items-center gap-1"
          >
            <History className="w-4 h-4" />
            Load Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleNewConversation}
            className="flex items-center gap-1"
          >
            <Plus className="w-4 h-4" />
            New Chat
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleEndConversation}
            className="flex items-center gap-1 text-red-500 hover:text-red-600"
          >
            <X className="w-4 h-4" />
            End Chat
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.is_ai ? 'justify-start' : 'justify-end'}`}
          >
            <div
              className={`max-w-[80%] p-3 rounded-lg ${
                message.is_ai
                  ? 'bg-gray-100 text-gray-800'
                  : 'bg-blue-500 text-white'
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={sendMessage} className="p-4 border-t">
        <div className="flex gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 rounded-lg border border-gray-300 p-2 focus:outline-none focus:border-blue-500"
            disabled={loading}
          />
          <Button type="submit" disabled={loading}>
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </form>
    </div>
  );
}