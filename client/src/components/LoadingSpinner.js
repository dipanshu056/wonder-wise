
import { motion } from 'framer-motion';

function LoadingSpinner() {
  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center bg-[var(--glass-bg)] backdrop-blur-md z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="w-16 h-16 border-4 border-t-accent border-primary rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      />
    </motion.div>
  );
}

export default LoadingSpinner;