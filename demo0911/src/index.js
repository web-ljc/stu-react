import React from 'react';
import ReactDOM from './react-dom/react-dom';

class Ding extends React.Component{
    render() {
        return (
            <div>
                <h1>
                    name
                </h1>
                <h2>
                    123
                    <p>
                        456
                    </p>
                </h2>
                <h3>
                    <span></span>
                </h3>
            </div>
        )
    }
}

ReactDOM.render(
    <Ding props={111} key="2222"></Ding>,
    document.getElementById('root')
)

