import React from 'react';
import ReactDOM from 'react-dom/client';
import Demo from './views/Demo';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Demo x={10} y={20} enable={true} />
);

