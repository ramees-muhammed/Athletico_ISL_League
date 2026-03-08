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
  confirmText?: string; 
  isAlert?:boolean;
}

const Modal: React.FC<ModalProps> = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title, 
  message, 
  isLoading,
  confirmText = "Confirm" ,// Set a default value
  isAlert = false
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
              {/* Hide Cancel button if it's just an alert */}
              {!isAlert && (
                <Button variant="primary" onClick={onClose} disabled={isLoading}>
                  Cancel
                </Button>
              )}
              {/* Change color to primary if alert, keep danger if confirmation */}
              <Button 
                variant={isAlert ? "primary" : "danger"} 
                onClick={onConfirm} 
                isLoading={isLoading}
              >
                {confirmText} 
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default Modal;