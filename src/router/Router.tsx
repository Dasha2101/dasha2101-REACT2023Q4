import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NotFound from '../components/nofFoundPage/NotFoundPage';
import SearchPage from '../pages/Search';

const RouterComponent: React.FC = () => {
  return (
    <Router>
      <div data-testid="router-component">
        <Routes>
          <Route path="/" element={<SearchPage />} />
          <Route path="/search/:page?" element={<SearchPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
};

export default RouterComponent;
