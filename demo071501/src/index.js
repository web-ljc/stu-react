import React from 'react';
import ReactDOM from 'react-dom/client';
import '@/index.less';

const root = ReactDOM.createRoot(document.getElementById('root'));

class Number extends React.Component {
    state = {
        num: 0
    }

    render() {
        let { num } = this.state;
        return <>
            <span>{num}</span>
            <div onClick={() => {
                this.setState({
                    num: num + 1
                })
            }}>累加</div>
        </>
    }
}

root.render(
    <Number></Number>
);

fetch('/jian/subscriptions/recommended_collections')
.then(response => response.json())
.then(value => console.log(value))
