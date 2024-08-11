import React from 'react';
import styles from './Loading.module.css';

const Loading: React.FC = () => {
  return (
    <div className={styles.loading} data-testid="loading-indicator">
      <div className={styles.loader}></div>
    </div>
  );
};

export default Loading;
