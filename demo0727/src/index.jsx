import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Demo from './views/Demo10'
import Vote from './views/Vote'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <div>
        {/* <Vote title="学习React要js基础好" /> */}
        <Demo x={10} y={20} />
    </div>
);
