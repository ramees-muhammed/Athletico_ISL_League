import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';
import './Toast.scss';

export type ToastType = 'success' | 'error' | 'info';

interface ToastProps {
  message: string;
  type: ToastType;
  isVisible: boolean;
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, type, isVisible, onClose }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(onClose, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className={`toast-notification ${type}`}
          initial={{ opacity: 0, y: -50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
          whileHover={{ scale: 1.02 }}
        >
          <div className="toast-content">
            <span className="icon">
              {type === 'success' && '✓'}
              {type === 'error' && '✕'}
              {type === 'info' && 'ℹ'}
            </span>
            <p>{message}</p>
          </div>
          <button className="close-btn" onClick={onClose}>&times;</button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Toast;