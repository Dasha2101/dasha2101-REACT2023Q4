import { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setForm1Data } from '../redux/formSlice/FormSlice';
import { RootState } from '../redux/store';
import validationSchema from './useYup';

export type FormValues = {
  name: string;
  email: string;
  password: string;
  repeatPassword: string;
  age: number;
  gender: string;
  country: string;
  terms?: boolean | undefined;
  image?: string;
};

export const useControlledForm = () => {
  const formData = useSelector((state: RootState) => state.forms);
  const countries = useSelector((state: RootState) => state.country.countries);
  const image = useSelector((state: RootState) => state.image.base64);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const methods = useForm<FormValues>({
    resolver: yupResolver(validationSchema),
    mode: 'onChange',
    defaultValues: {
      ...formData,
      image: image || '',
    },
  });

  const {
    handleSubmit,
    formState: { errors, isValid },
    control,
    register,
    watch,
  } = methods;

  useEffect(() => {
    console.log('Form is valid:', isValid);
  }, [isValid]);

  const [password, setPassword] = useState<string>('');

  useEffect(() => {
    const subscription = watch((value) => {
      dispatch(setForm1Data(value));
    });
    return () => subscription.unsubscribe();
  }, [watch, dispatch]);

  useEffect(() => {
    console.log('Validation errors:', errors);
  }, [errors]);

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log('Form data:', data);
    const formData = { ...data, image };
    dispatch(setForm1Data(formData));
    navigate('/');
  };

  return {
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
  };
};
