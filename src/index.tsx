import React from 'react';
import ReactDOM from 'react-dom/client';

import { MainLayout } from './layouts/MainLayout';
import './scss/app.scss';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

// root.render(
//   <React.StrictMode>
//     <MainLayout />
//   </React.StrictMode>,
// );

root.render(<MainLayout />);
