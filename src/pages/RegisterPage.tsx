import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
// import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

// import { storage } from '../api/firebase.config';
// import { registerPlayer } from '../api/playerApi';
import { pageTransition } from '../utils/motion';
import { CLUBS, POSITIONS } from '../utils/constants';


import './RegisterPage.scss';
import Input from '../components/ui/Input/Input';
import Button from '../components/ui/Button/Button';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { registerPlayer } from '../api/playerApi';
import { storage } from '../api/firebase.config';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  //State for preview images
  const [facePreview, setFacePreview] = useState<string | null>(null);
  const [fullPreview, setFullPreview] = useState<string | null>(null);


  const validationSchema = Yup.object({
    fullname: Yup.string().min(3, "Name too short").required("Required"),
    phone: Yup.string().matches(/^[0-9]{10}$/, "10 digits required").required("Required"),
    place: Yup.string().required("Required"),
    age: Yup.number().min(10).max(60).required("Required"),
    club: Yup.string().required("Required"),
    position: Yup.string().required("Required"),
  });

  const formik = useFormik({
    initialValues: {
      fullname: '', phone: '', place: '', age: '', club: '', position: 'FW' as any,
      facePhoto: null as File | null,
      fullPhoto: null as File | null
    },
    validationSchema,
    onSubmit: async (values) => {

console.log("valueeees", values);

    

      if (!values.facePhoto || !values.fullPhoto) {
        alert("Please upload both required photos.");
        return;
      }

      setIsSubmitting(true);

      try {
        
// 1. Upload Images to Firebase Storage
        const uploadImage = async (file: File, folder: string) => {
          const storageRef = ref(storage, `players/${folder}/${Date.now()}_${file.name}`);
          const snapshot = await uploadBytes(storageRef, file);
          return await getDownloadURL(snapshot.ref);
        };

        const faceUrl = await uploadImage(values.facePhoto, 'faces');
        const fullUrl = await uploadImage(values.fullPhoto, 'full_bodies');

        //  Save Data to Firestore
        await registerPlayer({
      fullname: values.fullname,
  phone: values.phone,
  place: values.place,
  age: Number(values.age),
  club: values.club,
  position: values.position,
  facePhotoUrl: faceUrl,
  fullPhotoUrl: fullUrl,
        });

        alert("Registration Successful!");
        navigate('/players');


      } catch (error) {
        console.error(error);
        alert("Registration failed. Please try again.");
      } finally {
        setIsSubmitting(false);
      }
     
    },
  });


const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    const file = e.currentTarget.files?.[0];
    if (file) {
      formik.setFieldValue(field, file);
      const reader = new FileReader();
      reader.onloadend = () => {
        field === 'facePhoto' ? setFacePreview(reader.result as string) : setFullPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <motion.div {...pageTransition} className="register-container">
      <div className="form-card">
        <header>
          <h2>PLAYER <span>REGISTRATION</span></h2>
          <p>Fill in the details to join the league</p>
        </header>

        <form onSubmit={formik.handleSubmit}>
          <Input label="Full Name" {...formik.getFieldProps('fullname')} error={formik.errors.fullname} touched={formik.touched.fullname} />
          
          <div className="input-row">
            <Input label="Phone" type="tel" {...formik.getFieldProps('phone')} error={formik.errors.phone} touched={formik.touched.phone} />
            <Input label="Age" type="number" {...formik.getFieldProps('age')} error={formik.errors.age} touched={formik.touched.age} />
          </div>

          <Input label="Place" {...formik.getFieldProps('place')} error={formik.errors.place} touched={formik.touched.place} />

          <div className="input-row">
            <Input label="Club" isSelect options={CLUBS} {...formik.getFieldProps('club')} error={formik.errors.club} touched={formik.touched.club} />
            <Input 
  label="Position" 
  isSelect 
  options={POSITIONS} 
  {...formik.getFieldProps('position')} 
  error={formik.errors.position as string} // Add 'as string'
  touched={formik.touched.position} 
/>
          </div>

       <div className="photo-section">
  {/* Face Photo Card */}
  <div className={`upload-card ${facePreview ? 'has-image' : ''}`}>
    <label>Face Photo (Passport)</label>
    <div className="preview-container">
      {facePreview ? (
        <>
          <img src={facePreview} alt="Face Preview" />
          <button type="button" className="remove-btn" onClick={() => { setFacePreview(null); formik.setFieldValue('facePhoto', null) }}>✕</button>
        </>
      ) : (
        <div className="upload-placeholder">
          <span>+ Upload Photo</span>
          <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, 'facePhoto')} />
        </div>
      )}
    </div>
  </div> {/* Closing Face Photo Card properly */}

  {/* Full Body Photo Card */}
  <div className={`upload-card ${fullPreview ? 'has-image' : ''}`}>
    <label>Full Body Photo</label>
    <div className="preview-container">
      {fullPreview ? (
        <>
          <img src={fullPreview} alt="Full Preview" />
          <button type="button" className="remove-btn" onClick={() => { setFullPreview(null); formik.setFieldValue('fullPhoto', null) }}>✕</button>
        </>
      ) : (
        <div className="upload-placeholder">
          <span>+ Upload Photo</span>
          <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, 'fullPhoto')} />
        </div>
      )}
    </div>
  </div>
</div>

          <Button type="submit" isLoading={isSubmitting} variant="secondary">
            SUBMIT REGISTRATION
          </Button>
        </form>
      </div>
    </motion.div>
  );
};

export default RegisterPage;