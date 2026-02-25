import React from 'react';
import {type FormikErrors, type FormikTouched } from 'formik';
import './Input.scss';

interface InputProps {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  isSelect?: boolean;
  options?: { label: string; value: any }[] | string[];
  // Updated to match Formik's complex error types
  error?: string | string[] | FormikErrors<any> | FormikErrors<any>[];
  touched?: boolean | FormikTouched<any> | FormikTouched<any>[];
  // Standard spread props from formik.getFieldProps
  onChange: React.ChangeEventHandler<any>;
  onBlur: React.FocusEventHandler<any>;
  value: any;
}

const Input: React.FC<InputProps> = ({ 
  label, 
  name, 
  isSelect, 
  options, 
  error, 
  touched, 
  ...props 
}) => {
  /**
   * Formik errors can be objects or arrays for nested forms.
   * Since this is a standard input, we ensure we only try to render 
   * the error if it is a string.
   */
  const errorMessage = typeof error === 'string' ? error : undefined;
  const isInvalid = !!(touched && errorMessage);

  return (
    <div className={`input-container ${isInvalid ? 'invalid' : ''}`}>
      <label htmlFor={name} className="input-label">
        {label}
      </label>
      
      <div className="input-wrapper">
        {isSelect ? (
          <select 
            id={name} 
            name={name} 
            className="custom-input" 
            {...props}
          >
            <option value="" disabled>
              Select {label}
            </option>
            {options?.map((opt, index) => {
              const val = typeof opt === 'string' ? opt : opt.value;
              const lbl = typeof opt === 'string' ? opt : opt.label;
              return (
                <option key={`${val}-${index}`} value={val}>
                  {lbl}
                </option>
              );
            })}
          </select>
        ) : (
          <input 
            id={name} 
            name={name} 
            className="custom-input" 
            {...props} 
          />
        )}
      </div>

      {isInvalid && (
        <span className="error-message" role="alert">
          {errorMessage}
        </span>
      )}
    </div>
  );
};

export default Input;