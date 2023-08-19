import React from 'react';
import ReactDOM from 'react-dom/client';
import {HashRouter, Routes, Route, Navigate} from 'react-router-dom';
import HomeHead from './components/HomeHead';
import RouterView from './router/index'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HashRouter>
        <HomeHead />
        <RouterView />
    </HashRouter>
  </React.StrictMode>
);


