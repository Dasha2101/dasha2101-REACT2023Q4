import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from '../pages/main/Main';
import FormHook from '../pages/formOne/FormOne';
import Form from '../pages/formTwo/FormTwo';

const RouterComponent: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/form-hook" element={<FormHook />} />
        <Route path="/form" element={<Form />} />
      </Routes>
    </Router>
  );
};

export default RouterComponent;
