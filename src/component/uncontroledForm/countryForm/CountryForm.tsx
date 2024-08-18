import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import './CountryForm.css';

interface CountrySelectProps {
  selectedCountry: string;
  onSelectCountry: (countryCode: string) => void;
}

const CountrySelect: React.FC<CountrySelectProps> = ({
  selectedCountry,
  onSelectCountry,
}) => {
  const countries = useSelector((state: RootState) => state.country.countries);

  const handleCountryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const countryCode = event.target.value;
    onSelectCountry(countryCode);
  };

  const options = countries.map((country) => (
    <option key={country.code} value={country.code}>
      {country.name}
    </option>
  ));
  return (
    <select
      className="country-select"
      value={selectedCountry}
      onChange={handleCountryChange}
    >
      <option value="" disabled hidden>
        Select your country
      </option>
      {options}
    </select>
  );
};
export default CountrySelect;
