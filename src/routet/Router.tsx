import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SearchResult from '../components/searchResult/SearchResult';
// import NotFound from '../components/nofFoundPage/NotFoundPage';

const RouterComponent: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/search/:page?" element={<SearchResult results={[]} />} />
      </Routes>
    </Router>
  );
};

export default RouterComponent;
