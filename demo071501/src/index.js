import React from 'react';
import ReactDOM from 'react-dom/client';
import '@/index.less';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <div>12399</div>
);

fetch('/jian/subscriptions/recommended_collections')
.then(response => response.json())
.then(value => console.log(value))
