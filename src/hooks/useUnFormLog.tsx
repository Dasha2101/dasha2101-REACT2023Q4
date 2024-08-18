import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { setForm1Data } from '../redux/formSlice/FormSlice';
import { validateForms } from './useFormValidation';
import { useNavigate } from 'react-router-dom';

export const useFormLogic = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const repeatRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const genderRef = useRef<HTMLSelectElement>(null);
  const termsRef = useRef<HTMLInputElement>(null);

  const formData = useSelector((state: RootState) => state.forms);
  const base64Image = useSelector((state: RootState) => state.image.base64);
  const [selectedCountry, setSelectedCountry] = useState<string>('');
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [password, setPassword] = useState<string>('');
  const [terms, setTerms] = useState(false);

  const handleCountrySelect = (countryCode: string) => {
    setSelectedCountry(countryCode);
  };

  useEffect(() => {
    if (nameRef.current) nameRef.current.value = formData.name || '';
    if (emailRef.current) emailRef.current.value = formData.email || '';
    if (passwordRef.current)
      passwordRef.current.value = formData.password || '';
    if (repeatRef.current)
      repeatRef.current.value = formData.repeatPassword || '';
    if (ageRef.current) ageRef.current.value = formData.age?.toString() || '';
    if (genderRef.current) genderRef.current.value = formData.gender || '';
    if (termsRef.current) termsRef.current.checked = formData.terms || false;
    setSelectedCountry(formData.country || '');
  }, [formData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formValues = {
      name: nameRef.current?.value || '',
      email: emailRef.current?.value || '',
      password: passwordRef.current?.value || '',
      repeatPassword: repeatRef.current?.value || '',
      age: Number(ageRef.current?.value) || 0,
      gender: genderRef.current?.value || '',
      image: base64Image || '',
      country: selectedCountry,
      terms: termsRef.current?.checked || false,
    };

    const { isValid, errors } = validateForms(formValues);

    if (!isValid) {
      setFormErrors(errors);
      return;
    }

    dispatch(setForm1Data(formValues));
    navigate('/');
  };

  return {
    nameRef,
    emailRef,
    passwordRef,
    repeatRef,
    ageRef,
    genderRef,
    termsRef,
    formErrors,
    password,
    terms,
    setTerms,
    selectedCountry,
    setPassword,
    handleCountrySelect,
    handleSubmit,
  };
};
