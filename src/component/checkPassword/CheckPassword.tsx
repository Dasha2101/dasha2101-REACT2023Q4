import React, { useState, useEffect } from 'react';
import { StrengthProps } from './types';
import './CheckPassword.css';

const PasswordStrength: React.FC<StrengthProps> = ({ password }) => {
  const [strength, setStrength] = useState<number>(0);

  const passwordStrength = (password: string) => {
    let strength = 0;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength += 1;
    if (/[A-Za-zА-Яа-я]/.test(password)) strength += 1;
    if (/\d/.test(password)) strength += 1;
    return strength;
  };

  useEffect(() => {
    setStrength(passwordStrength(password));
  }, [password]);

  return (
    <div className="password-container">
      <div className="password-bar">
        <div
          className={`password-strength-fill strength-${strength}`}
          style={{ width: `${(strength / 3) * 100}%` }}
        />
      </div>
    </div>
  );
};

export default PasswordStrength;
