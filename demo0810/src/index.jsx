import React from 'react';
import ReactDOM from 'react-dom/client';
// import './defineProperty'
// import './decorator'
// import './decorator2'
// import Demo from './views/mobxDemo2';
import Demo from './views/demo'
import {Provider} from 'mobx-react'
import store from './store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    // 基于Provider把各个板块Store实例，放到上下文中
    <Provider {...store}>
        <Demo />
    </Provider>
);

