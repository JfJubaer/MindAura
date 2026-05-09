import React from 'react';
import styles from './Input.module.css';

const Input = React.forwardRef(({ 
  label, 
  error, 
  id, 
  className = '', 
  type = 'text', 
  showPasswordToggle = false,
  ...props 
}, ref) => {
  const [showPassword, setShowPassword] = React.useState(false);

  const togglePassword = () => setShowPassword(!showPassword);

  const inputType = type === 'password' && showPassword ? 'text' : type;

  return (
    <div className={`${styles.inputWrapper} ${className}`}>
      {label && <label htmlFor={id} className={styles.label}>{label}</label>}
      <div className={styles.fieldContainer}>
        <input
          ref={ref}
          id={id}
          type={inputType}
          className={`${styles.input} ${error ? styles.inputError : ''}`}
          {...props}
        />
        {type === 'password' && showPasswordToggle && (
          <button 
            type="button" 
            className={styles.toggleBtn}
            onClick={togglePassword}
            tabIndex="-1"
          >
            {showPassword ? 'Hide' : 'Show'}
          </button>
        )}
      </div>
      {error && <p className={styles.errorMessage}>{error}</p>}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
