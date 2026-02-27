import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdmin } from '../../context/AdminContext';
import './Navbar.scss';
import Modal from '../ui/Modal/Modal';

const Navbar = () => {
  const navigate = useNavigate();
  const { isAdmin, logout } = useAdmin();
  
  // State to control the Logout Confirmation Modal
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const handleLogoutConfirm = () => {
    logout();
    setIsLogoutModalOpen(false);
    navigate('/'); // Optional: Redirect to home after logout
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-logo" onClick={() => navigate('/')}>
          <img src="/athletico_logo.jpeg" alt="Athletico" />
          <span className="logo-text">ATHLETICO <span>VPM</span></span>
        </div>
        
        <div className="nav-actions">
          <button className="nav-link" onClick={() => navigate('/players')}>
            Player Lists
          </button>
          
          {isAdmin ? (
            <div className="admin-group">
              <span className="admin-indicator">Admin Mode</span>
              {/* Trigger the modal instead of calling logout immediately */}
              <button 
                onClick={() => setIsLogoutModalOpen(true)} 
                className="btn-auth logout"
              >
                LOGOUT
              </button>
            </div>
          ) : (
            <button onClick={() => navigate('/admin-login')} className="btn-auth login">
              ADMIN
            </button>
          )}
        </div>
      </div>

      {/* Logout Confirmation Modal */}
<Modal 
  isOpen={isLogoutModalOpen}
  onClose={() => setIsLogoutModalOpen(false)}
  onConfirm={handleLogoutConfirm}
  title="Confirm Logout"
  message="Are you sure you want to end your admin session?"
  confirmText="Logout" // Pass the specific text here
/>
    </nav>
  );
};

export default Navbar;