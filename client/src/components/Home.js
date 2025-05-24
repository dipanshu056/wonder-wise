import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import Signup from './Signup';
import Login from './Login';
import Dashboard from './Dashboard';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

function Home() {
  const { user } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState('signup');

  const heroVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 1 } },
  };

  const waveVariants = {
    animate: {
      y: [0, -10, 0],
      transition: { repeat: Infinity, duration: 3, ease: 'easeInOut' },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[var(--primary)] to-[var(--accent)] relative overflow-hidden">
      {/* Wave Animation */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-24 bg-[var(--accent)] opacity-30"
        variants={waveVariants}
        animate="animate"
        style={{ clipPath: 'polygon(0 50%, 100% 0%, 100% 100%, 0% 100%)' }}
      />
      {/* Hero Section */}
      <motion.div
        className="text-center pt-16 pb-8"
        variants={heroVariants}
        initial="hidden"
        animate="visible"
      >
        <h1 className="text-5xl md:text-6xl font-bold text-primary mb-4">
          <i className="fas fa-globe-americas mr-2"></i>Wonder Wise
        </h1>
        <p className="text-xl text-neutral-gray mb-6 max-w-2xl mx-auto">
          Plan your dream adventures with ease and embark on unforgettable journeys.
        </p>
        {!user && (
          <Link
            to="#auth"
            className="gradient-button px-6 py-3 text-lg"
            onClick={() => setActiveTab('signup')}
          >
            <i className="fas fa-plane-departure mr-2"></i>Start Planning
          </Link>
        )}
      </motion.div>
      {/* Auth or Dashboard */}
      <div className="max-w-4xl mx-auto p-6">
        {user ? (
          <Dashboard />
        ) : (
          <div id="auth" className="glassmorphism p-6 rounded-lg">
            <div className="flex justify-center mb-4">
              <button
                className={`px-4 py-2 mx-2 rounded ${
                  activeTab === 'signup'
                    ? 'bg-accent text-neutral-gray'
                    : 'bg-neutral-light text-primary'
                }`}
                onClick={() => setActiveTab('signup')}
              >
                Sign Up
              </button>
              <button
                className={`px-4 py-2 mx-2 rounded ${
                  activeTab === 'login'
                    ? 'bg-accent text-neutral-gray'
                    : 'bg-neutral-light text-primary'
                }`}
                onClick={() => setActiveTab('login')}
              >
                Login
              </button>
            </div>
            {activeTab === 'signup' ? <Signup /> : <Login />}
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;