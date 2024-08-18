import React from 'react';
import { Link } from 'react-router-dom';
import MyInput from './myInput/MyInput';
import ImageForm from './ImageForm/ImageForm';
import CountrySelect from './countryForm/CountryForm';
import PasswordStrength from '../checkPassword/CheckPassword';
import { useFormLogic } from '../../hooks/useUnFormLog';
import './UncontroledForm.css';

const FormHook: React.FC = () => {
  const {
    nameRef,
    emailRef,
    passwordRef,
    repeatRef,
    ageRef,
    genderRef,
    termsRef,
    formErrors,
    password,
    selectedCountry,
    setPassword,
    handleCountrySelect,
    handleSubmit,
  } = useFormLogic();

  return (
    <div className="form-container">
      <Link to="/">
        <button>Return to main page</button>
      </Link>
      <form onSubmit={handleSubmit}>
        <div className="input-wrapper">
          <label htmlFor="name">Name:</label>
          <MyInput type="text" ref={nameRef} placeholder="Enter your name" />
          {formErrors.name && (
            <p className="error-message">{formErrors.name}</p>
          )}
        </div>
        <div className="input-wrapper">
          <label htmlFor="email">Email:</label>
          <MyInput type="text" ref={emailRef} placeholder="Enter your email" />
          {formErrors.email && (
            <p className="error-message">{formErrors.email}</p>
          )}
        </div>
        <div className="input-wrapper">
          <label htmlFor="password">Password:</label>
          <MyInput
            type="password"
            ref={passwordRef}
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <PasswordStrength password={password} />
          {formErrors.password && (
            <p className="error-message">{formErrors.password}</p>
          )}
        </div>
        <div className="input-wrapper">
          <label htmlFor="repeat">Repeat password:</label>
          <MyInput
            type="password"
            ref={repeatRef}
            placeholder="Repeat your password"
          />
          {formErrors.repeatPassword && (
            <p className="error-message">{formErrors.repeatPassword}</p>
          )}
        </div>
        <div className="input-wrapper">
          <label htmlFor="age">Age:</label>
          <MyInput type="number" ref={ageRef} placeholder="Enter your age" />
          {formErrors.age && <p className="error-message">{formErrors.age}</p>}
        </div>
        <div className="input-wrapper">
          <label htmlFor="gender">Gender:</label>
          <MyInput
            type="select"
            id="gender"
            ref={genderRef}
            options={[
              {
                value: '',
                label: 'Select your gender',
                disabled: true,
                hidden: true,
              },
              {
                value: 'Male',
                label: 'Male',
              },
              {
                value: 'Female',
                label: 'Female',
              },
            ]}
          />
          {formErrors.gender && (
            <p className="error-message">{formErrors.gender}</p>
          )}
        </div>
        <CountrySelect
          selectedCountry={selectedCountry}
          onSelectCountry={handleCountrySelect}
        />
        {formErrors.country && (
          <p className="error-message">{formErrors.country}</p>
        )}
        <ImageForm />
        {formErrors.image && (
          <p className="error-message">{formErrors.image}</p>
        )}
        <div className="input-wrapper">
          <label htmlFor="terms">I accept the Terms and Conditions:</label>
          <MyInput type="checkbox" ref={termsRef} />
          {formErrors.terms && (
            <p className="error-message">{formErrors.terms}</p>
          )}
        </div>
        <button className="submit" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default FormHook;
