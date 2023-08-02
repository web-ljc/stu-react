import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Demo from './views/Demo13'
import Vote from './views/Vote3'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <div>
        <Vote title="学习React要js基础好3" />
        {/* <Demo x={10} y={20} /> */}
    </div>
);
