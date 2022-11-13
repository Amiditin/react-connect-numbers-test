import React from 'react';
import styles from './MainLayout.module.scss';

import { ConnectNumbers } from '../../pages';

export const MainLayout: React.FC = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <ConnectNumbers />
      </div>
    </div>
  );
};
