import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Header } from '@/components/layout/header';
import { Home } from '@/pages/home';
import { Events } from '@/pages/events';
import { EventDetails } from '@/pages/event-details';
import { SignIn } from '@/pages/sign-in';
import { SignUp } from '@/pages/sign-up';
import { Dashboard } from '@/pages/dashboard';
import { AuthProvider } from '@/contexts/auth-context';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen bg-gray-50">
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/events" element={<Events />} />
              <Route path="/events/:id" element={<EventDetails />} />
              <Route path="/sign-in" element={<SignIn />} />
              <Route path="/sign-up" element={<SignUp />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
          </main>
          <Toaster position="bottom-right" />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;