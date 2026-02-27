import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { useAdmin } from '../context/AdminContext';
import { pageTransition } from '../utils/motion';
import Input from '../components/ui/Input/Input';
import Button from '../components/ui/Button/Button';
import './AdminLoginPage.scss';
import Toast from '../components/ui/Toaster/Toast';

const AdminLoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAdmin();
  
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info'; isVisible: boolean }>({
    message: '',
    type: 'success',
    isVisible: false,
  });

  const showToast = (message: string, type: 'success' | 'error' | 'info') => {
    setToast({ message, type, isVisible: true });
  };

  const validationSchema = Yup.object({
    idNumber: Yup.string().required("Admin ID is required"),
    password: Yup.string().required("Password is required"),
  });

  const formik = useFormik({
    initialValues: { idNumber: '', password: '' },
    validationSchema,
    onSubmit: async (values) => {
      setIsLoggingIn(true);
      
      // Simulate premium delay
      setTimeout(() => {
        const success = login(values.idNumber, values.password);
        
        if (success) {
          showToast("Login Successful! Welcome, Admin.", "success");
          // Small delay so they see the success toast before the page slides away
          setTimeout(() => {
            navigate('/players');
          }, 1500);
        } else {
          showToast("Access Denied: Invalid Credentials", "error");
          setIsLoggingIn(false);
        }
      }, 1000);
    },
  });

  return (
    <motion.div {...pageTransition} className="admin-login-container">
      <Toast 
        isVisible={toast.isVisible} 
        message={toast.message} 
        type={toast.type} 
        onClose={() => setToast({ ...toast, isVisible: false })} 
      />

      <div className="login-card">
        <header>
          <div className="logo-shield">
             <img src="/images/home_page_img.jpeg" alt="Athletico Logo" />
          </div>
          <h2>ADMIN <span>PORTAL</span></h2>
          <p>Enter <strong>admin123</strong> / <strong>athletico2026</strong> to test</p>
        </header>

        <form onSubmit={formik.handleSubmit} noValidate>
          <Input 
            label="Admin ID Number" 
            placeholder="admin123"
            {...formik.getFieldProps('idNumber')}
            error={formik.errors.idNumber}
            touched={formik.touched.idNumber}
          />

          <Input 
            label="Password" 
            type="password"
            placeholder="athletico2026"
            {...formik.getFieldProps('password')}
            error={formik.errors.password}
            touched={formik.touched.password}
          />

          <Button 
            type="submit" 
            isLoading={isLoggingIn} 
            variant="primary"
          >
            Authorize Access
          </Button>
        </form>
      </div>
    </motion.div>
  );
};

export default AdminLoginPage;