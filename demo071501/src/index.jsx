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
        return <React.Fragment>
            <span>{num}</span>
            <div onClick={() => {
                this.setState({
                    num: num + 1
                })
            }}>累加</div>
        </React.Fragment>
    }
}

class H2 extends React.Component {
    render() {
        return <h2 className='box' style={{
            color: 'red',
            fontSize: '30px'
        }}>我在学习React</h2>
    }
}

class DataHiddle extends React.Component {
    // 需求1: 基于数据的值，来判断元素的显示隐藏
    state = {
        flag: false,
        isRun: true,
    }
    render() {
        let { flag, isRun } = this.state
        return <>
            {/* 控制元素的display样式，不论现实隐藏，元素本身都渲染 */}
            <button style={{
                display: flag ? 'block' : 'none'
            }}>按钮1</button>

            <br />

            {/* 控制元素渲染或不渲染 */}
            {flag ? <button>按钮2</button> : null}

            <br />
            <button>{isRun ? '正在处理中' : '立即提交注册'}</button>
        </>
    }
}

class DataList extends React.Component {
    // 需求2:从服务器获取一组列表数据，循环渲染
    state = {
        data: [
            {id: 1, title: 'one'},
            {id: 2, title: 'two'},
            {id: 3, title: 'three'},
        ]
    }
    render() {
        let { data } = this.state
        return (
            <>
                <h2> 今日新闻 </h2>
                <ul className='title'>
                    {
                        data.map(({id, title}) => <li key={id}>
                            {/* 循环元素设置key属性，属性值是本次循环中的唯一值，优化DOM-DIFF */}
                            <em>{id}</em>
                            &nbsp;&nbsp;
                            <span>{title}</span>
                        </li>)
                    }            
                </ul>
                {
                    // 稀疏数组，每一项为empty，不能使用迭代方法forEach map filter reduce
                    // 没有数组，单独循环5次
                    new Array(5).fill(null).map((_, index) => <button key={index}>按钮{index+1}</button>)
                }
            </>
        )
    }
}



root.render(
    <>
        <Number/>
        <H2 />
        <DataHiddle />
        <DataList />
    </>
);

fetch('/jian/subscriptions/recommended_collections')
.then(response => response.json())
.then(value => console.log(value))
