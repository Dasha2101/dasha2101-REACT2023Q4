import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import './Main.css';

const Home: React.FC = () => {
  const formData = useSelector((state: RootState) => state.forms);
  const [highlighted, setHighlighted] = useState<boolean>(false);

  useEffect(() => {
    if (formData) {
      setHighlighted(true);
      const time = setTimeout(() => setHighlighted(false), 3000);
      return () => clearTimeout(time);
    }
  }, [formData]);

  return (
    <div className="main-page">
      <h1>Main page</h1>
      <nav>
        <Link to="/form-hook">
          <button>Link to Form one</button>
        </Link>
        <Link to="/form">
          <button>Link to Form two</button>
        </Link>
      </nav>
      {formData && (
        <div className={`form-data ${highlighted ? 'highlighted' : ''}`}>
          <div className="data-item">
            <strong>Name:</strong> {formData.name}
          </div>
          <div className="data-item">
            <strong>Email:</strong> {formData.email}
          </div>
          <div className="data-item">
            <strong>Age:</strong> {formData.age}
          </div>
          <div className="data-item">
            <strong>Gender:</strong> {formData.gender}
          </div>
          <div className="data-item">
            <strong>Password:</strong> {formData.password}
          </div>
          <div className="data-item">
            <strong>Repeat password:</strong> {formData.repeatPassword}
          </div>
          <div className="data-item">
            <strong>Country:</strong> {formData.country}
          </div>
          <div className="data-item">
            <strong>Image:</strong>
            {formData.image && (
              <img
                src={formData.image}
                alt="Uploaded"
                className="uploaded-image"
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
