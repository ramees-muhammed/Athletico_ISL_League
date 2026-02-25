import { useState } from 'react';
import { motion } from 'framer-motion';

import { useFormik } from 'formik';
import * as Yup from 'yup';

// import { useAdmin } from '../context/AdminContext';
import { pageTransition } from '../utils/motion';

import './AdminLoginPage.scss';
import Input from '../components/ui/Input/Input';
import Button from '../components/ui/Button/Button';

const AdminLoginPage = () => {
  // const navigate = useNavigate();
  // const { login } = useAdmin();
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  setIsLoggingIn(true)
  // Validation Schema
  const validationSchema = Yup.object({
    idNumber: Yup.string()
      .min(3, "ID must be at least 3 characters")
      .required("Admin ID is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      idNumber: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      console.log(values);
      
      // setIsLoggingIn(true);
      
      // // Artificial delay for premium UX feedback
      // setTimeout(() => {
      //   const success = login(values.idNumber, values.password);
      //   if (success) {
      //     navigate('/players');
      //   } else {
      //     alert("Access Denied: Invalid Credentials");
      //   }
      //   setIsLoggingIn(false);
      // }, 1200);
    },
  });

  return (
    <motion.div {...pageTransition} className="admin-login-container">
      <div className="login-card">
        <header>
          <div className="logo-shield">
             <img src="/images/home_page_img.jpeg" alt="Athletico Logo" />
          </div>
          <h2>ADMIN <span>PORTAL</span></h2>
          <p>Please enter your credentials to manage the league</p>
        </header>

        <form onSubmit={formik.handleSubmit} noValidate>
          <Input 
            label="Admin ID Number" 
            placeholder="e.g. ADM-101"
            {...formik.getFieldProps('idNumber')}
            error={formik.errors.idNumber}
            touched={formik.touched.idNumber}
          />

          <Input 
            label="Password" 
            type="password"
            placeholder="••••••••"
            {...formik.getFieldProps('password')}
            error={formik.errors.password}
            touched={formik.touched.password}
          />

          <Button 
            type="submit" 
            isLoading={isLoggingIn} 
            variant="primary"
            className="login-submit-btn"
          >
            Authorize Access
          </Button>
        </form>
        
        <div className="login-footer">
          <p>Restricted Area: Authorized Personnel Only</p>
        </div>
      </div>
    </motion.div>
  );
};

export default AdminLoginPage;