import React from 'react';
import { Link } from 'react-router-dom';
import { Controller, FormProvider } from 'react-hook-form';
import useImageUpload from '../../hooks/useImageUpload';
import { useControlledForm } from '../../hooks/useConFormLogic';
import PasswordStrength from '../checkPassword/CheckPassword';
import './ControlledForm.css';

const ReactFormHook: React.FC = () => {
  const {
    methods,
    password,
    setPassword,
    handleSubmit,
    errors,
    isValid,
    control,
    register,
    countries,
    onSubmit,
  } = useControlledForm();

  const { handleFileChange, error: imageError } = useImageUpload();

  return (
    <FormProvider {...methods}>
      <div className="form-container">
        <Link to="/">
          <button>Return to main page</button>
        </Link>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="input-wrapper">
            <label htmlFor="name">Name:</label>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  placeholder="Enter your name"
                  autoComplete="name"
                />
              )}
            />
            {errors.name && (
              <p style={{ color: 'red' }}>{errors.name.message}</p>
            )}
          </div>
          <div className="input-wrapper">
            <label htmlFor="email">Email:</label>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <input {...field} type="email" placeholder="Enter your email" />
              )}
            />
            {errors.email && (
              <p style={{ color: 'red' }}>{errors.email.message}</p>
            )}
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password:</label>
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="password"
                  placeholder="Enter your password"
                  onChange={(e) => {
                    field.onChange(e);
                    setPassword(e.target.value);
                  }}
                />
              )}
            />
            {errors.password && (
              <p style={{ color: 'red' }}>{errors.password.message}</p>
            )}
            <PasswordStrength password={password} />
          </div>
          <div className="input-wrapper">
            <label htmlFor="repeatPassword">Repeat password:</label>
            <Controller
              name="repeatPassword"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="password"
                  placeholder="Repeat your password"
                />
              )}
            />
            {errors.repeatPassword && (
              <p style={{ color: 'red' }}>{errors.repeatPassword.message}</p>
            )}
          </div>

          <div className="input-wrapper">
            <label htmlFor="age">Age:</label>
            <Controller
              name="age"
              control={control}
              render={({ field }) => (
                <input {...field} type="number" placeholder="Enter your age" />
              )}
            />
            {errors.age && <p style={{ color: 'red' }}>{errors.age.message}</p>}
          </div>

          <div className="input-wrapper">
            <label htmlFor="gender">Gender:</label>
            <Controller
              name="gender"
              control={control}
              render={({ field }) => (
                <select {...field}>
                  <option value="" disabled>
                    Select a gender
                  </option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              )}
            />
            {errors.gender && (
              <p style={{ color: 'red' }}>{errors.gender.message}</p>
            )}
          </div>

          <div className="input-wrapper">
            <label htmlFor="country">Country:</label>
            <select
              id="country"
              {...register('country', { required: 'Country is required' })}
            >
              <option value="" disabled>
                Select a country
              </option>
              {countries.map((country) => (
                <option key={country.code} value={country.code}>
                  {country.name}
                </option>
              ))}
            </select>
            {errors.country && (
              <p style={{ color: 'red' }}>{errors.country.message}</p>
            )}
          </div>
          <div className="input-wrapper">
            <label htmlFor="imageUpload">Image:</label>
            <Controller
              name="image"
              control={control}
              render={({ field }) => (
                <input
                  type="file"
                  id="imageUpload"
                  accept=".png, .jpeg, .jpg"
                  onChange={(event) => {
                    handleFileChange(event);
                    field.onChange(
                      event.target.files ? [event.target.files[0]] : []
                    );
                  }}
                />
              )}
            />
            {imageError && (
              <p style={{ color: 'red' }} className="error-message">
                {imageError}
              </p>
            )}
          </div>
          <div className="input-wrapper">
            <label htmlFor="terms">I accept the Terms and Conditions:</label>
            <input
              type="checkbox"
              id="terms"
              {...register('terms', {
                required: 'You must accept the terms and conditions',
              })}
            />
            {errors.terms && (
              <p style={{ color: 'red' }}>{errors.terms.message}</p>
            )}
          </div>
          <button className="submit" type="submit" disabled={!isValid}>
            Submit
          </button>
        </form>
      </div>
    </FormProvider>
  );
};

export default ReactFormHook;
