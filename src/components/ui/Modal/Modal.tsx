import { motion, AnimatePresence } from 'framer-motion';

import './Modal.scss';
import Button from '../Button/Button';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  isLoading?: boolean;
  confirmText?: string; // Add this optional prop
}

const Modal: React.FC<ModalProps> = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title, 
  message, 
  isLoading,
  confirmText = "Confirm" // Set a default value
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="modal-overlay">
          <motion.div 
            className="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.div 
            className="modal-content"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            <div className="modal-header">
              <h2>{title}</h2>
              <button className="close-x" onClick={onClose}>&times;</button>
            </div>
            
            <div className="modal-body">
              <p>{message}</p>
            </div>

            <div className="modal-actions">
              <Button variant="primary" onClick={onClose} disabled={isLoading}>
                Cancel
              </Button>
              <Button variant="danger" onClick={onConfirm} isLoading={isLoading}>
                {confirmText} {/* Use the dynamic prop here */}
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default Modal;