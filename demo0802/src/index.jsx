import React from 'react';
import ReactDOM from 'react-dom/client';
import store from './store';
import ThemeContext from './ThemeContext'
import Demo from './views/Demo';
import Vote from './views/Vote';

console.log(store);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    // <Demo x={10} y={20} enable={true} />
    <ThemeContext.Provider
        value={{
            store
        }}
    >
        <Vote />
    </ThemeContext.Provider>
);

