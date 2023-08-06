import React from 'react';
import ReactDOM from 'react-dom/client';
import store from './store/index';
import Vote from './views/Vote';
import {Provider} from 'react-redux'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <Vote />
    </Provider>
);

