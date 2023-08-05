import React from 'react';
import ReactDOM from 'react-dom/client';
import store from './store/index';
import store2 from './store/index2';
import ThemeContext from './ThemeContext'
import Demo from './views/Demo';
import Vote from './views/Vote2';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    // <Demo x={10} y={20} enable={true} />
    <ThemeContext.Provider
        value={{
            store,
            store2
        }}
    >
        <Vote />
    </ThemeContext.Provider>
);

