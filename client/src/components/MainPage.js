import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import Signup from './Signup';
import Login from './Login';
import Dashboard from './Dashboard';
import { motion } from 'framer-motion';

function MainPage() {
  const { user } = useContext(AuthContext);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
  };

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[var(--primary)] to-[var(--accent)] p-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-4xl w-full glassmorphism p-6 rounded-lg">
        {user ? (
          <Dashboard />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Signup />
            <Login />
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default MainPage;