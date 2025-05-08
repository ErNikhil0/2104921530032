import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { TopUsers } from './pages/TopUsers';
import { TrendingPosts } from './pages/TrendingPosts';
import { Feed } from './pages/Feed';
import { NotFound } from './pages/NotFound';
import { useEffect } from 'react';
import { registerWithServer, getAuthToken } from './api/socialMediaApi';

function App() {
  useEffect(() => {
    // Register and authenticate when app loads
    const initializeApp = async () => {
      try {
        await registerWithServer();
        await getAuthToken();
      } catch (error) {
        console.error('Initialization error:', error);
      }
    };

    initializeApp();
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <main className="pb-12">
          <Routes>
            <Route path="/" element={<Feed />} />
            <Route path="/top-users" element={<TopUsers />} />
            <Route path="/trending-posts" element={<TrendingPosts />} />
            <Route path="/feed" element={<Feed />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;