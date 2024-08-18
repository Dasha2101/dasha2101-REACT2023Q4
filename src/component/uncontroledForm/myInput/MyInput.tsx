import React, {
  forwardRef,
  InputHTMLAttributes,
  SelectHTMLAttributes,
} from 'react';
import './MyInput.css';

type Option = {
  value: string;
  label: string;
  disabled?: boolean;
  hidden?: boolean;
};

type MyInputProps = InputHTMLAttributes<HTMLInputElement> &
  SelectHTMLAttributes<HTMLSelectElement> & {
    type?: 'text' | 'number' | 'password' | 'checkbox' | 'select' | 'file';
    options?: Option[];
    onFileChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  };

const MyInput = forwardRef<HTMLInputElement | HTMLSelectElement, MyInputProps>(
  (props, ref) => {
    const { type, options, onFileChange, defaultValue, ...restProps } = props;

    if (type === 'select') {
      return (
        <select
          className="input-field"
          ref={ref as React.Ref<HTMLSelectElement>}
          defaultValue={defaultValue}
          {...restProps}
        >
          {options?.map((option) => (
            <option
              key={option.value}
              value={option.value}
              disabled={option.disabled}
              hidden={option.hidden}
            >
              {option.label}
            </option>
          ))}
        </select>
      );
    }

    if (type === 'file') {
      return (
        <input
          className="input-field"
          type="file"
          ref={ref as React.Ref<HTMLInputElement>}
          {...restProps}
          onChange={onFileChange}
        />
      );
    }

    if (type === 'checkbox') {
      return (
        <input
          className="input-field"
          type="checkbox"
          ref={ref as React.Ref<HTMLInputElement>}
          {...restProps}
        />
      );
    }

    return (
      <input
        type={type}
        ref={ref as React.Ref<HTMLInputElement>}
        {...restProps}
      />
    );
  }
);

export default MyInput;
