import React from "react";
import {PureComponents, memo} from './utils'

/*

    shouldComponentUpdate优化项目
    PureComponent/React.memo/immutable
*/


export default class App extends React.Component {
    state = {
        title: '标题',
        number: 0
    }
    render() {
        console.log('App render');
        const {title, number} = this.state
        return (
            <div>
                <button onClick={() => this.setState({number: number+1})}>add1</button>
                <button onClick={() => this.setState({number: number+0})}>add0</button>
                <Counter  number={number}/>
                <ClassTitle title={title} />
                <FunctionTitle title={title} />
            </div>
        )
    }
} 

class Counter extends PureComponents {
    render() {
        console.log('Counter render');
        return <p>
            {this.props.number}
        </p>
    }
}

class ClassTitle extends PureComponents {
    render() {
        console.log('classTitle render');
        return <p>
            {this.props.title}
        </p>
    }
}

const FunctionTitle = memo((props) => {
    console.log('FunctionTitle render');
    return <p>
        {props.title}
    </p>
})
