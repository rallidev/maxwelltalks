import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/authStore';
import { AuthForm } from './components/auth/AuthForm';
import { Dashboard } from './components/dashboard/Dashboard';
import { ChatInterface } from './components/chat/ChatInterface';
import { LandingPage } from './components/landing/LandingPage';
import { AboutPage } from './components/landing/AboutPage';
import { PricingPage } from './components/landing/PricingPage';
import { BlogPage } from './components/landing/BlogPage';
import { ContactPage } from './components/landing/ContactPage';
import { PublicNavbar } from './components/layout/PublicNavbar';
import { supabase } from './lib/supabase';

function App() {
  const { user, setUser } = useAuthStore();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUser({
          id: session.user.id,
          email: session.user.email!,
          created_at: session.user.created_at,
          ...session.user.user_metadata
        });
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser({
          id: session.user.id,
          email: session.user.email!,
          created_at: session.user.created_at,
          ...session.user.user_metadata
        });
      } else {
        setUser(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <Router>
      {!user && <PublicNavbar />}
      <Routes>
        <Route path="/" element={user ? <Navigate to="/dashboard" /> : <LandingPage />} />
        <Route path="/about" element={user ? <Navigate to="/dashboard" /> : <AboutPage />} />
        <Route path="/pricing" element={user ? <Navigate to="/dashboard" /> : <PricingPage />} />
        <Route path="/blog" element={user ? <Navigate to="/dashboard" /> : <BlogPage />} />
        <Route path="/contact" element={user ? <Navigate to="/dashboard" /> : <ContactPage />} />
        <Route path="/auth" element={user ? <Navigate to="/dashboard" /> : <AuthForm />} />
        <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/auth" />} />
        <Route path="/chat/:characterId" element={user ? <ChatInterface /> : <Navigate to="/auth" />} />
      </Routes>
    </Router>
  );
}

export default App;