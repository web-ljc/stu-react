import React from 'react';
import ReactDOM from 'react-dom/client';
import '@/index.less';
import { createElement, render } from './jsxHandle';
import DemoFunction from '@/views/DemoFunction';
import Dialog from '@/components/Dialog';
import Vote from '@/views/Vote';
import Demo2 from '@/views/Demo2';
import Demo3 from '@/views/Demo3';
import Demo4 from '@/views/Demo4';

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

class DataRender extends React.Component {
    // 渲染机制
    state = {
        x: 10,
        y: 20
    }
    render() {
        let styObj = {
            color: 'red',
            fontSize: '40px'
        },
        {x, y} = this.state

        // console.log(React.createElement(
        //     "React.Fragment",
        //     null,
        //     React.createElement(
        //         "h2",
        //         { className: "title", style: styObj }, 
        //         "\u5B66\u4E60React"
        //     ),
        //     React.createElement(
        //         "div",
        //         { className: "box" },
        //         React.createElement("span", null, x), 
        //         React.createElement("span", null, y)
        //     )
        // ));

        // console.log(createElement(
        //     "React.Fragment",
        //     null,
        //     createElement(
        //         "h2",
        //         { className: "title", style: styObj }, 
        //         "\u5B66\u4E60React"
        //     ),
        //     createElement(
        //         "div",
        //         { className: "box" },
        //         createElement("span", null, x), 
        //         createElement("span", null, y)
        //     )
        // ));

        return (
            <>
                <h2 className='title' style={styObj}>学习React</h2>
                <div className="box">
                    <span>{x}</span>
                    <span>{y}</span>
                </div>
                {/* 可嵌入jsx元素对象 */}
                { React.createElement('button', { id: '1' }, '提交') }
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
        <DataRender />
        <DemoFunction title="函数组件" className="box" data={[100, 200]} style={{fontSize: '20px'}}>
            <span slot="footer">我是页脚</span>
            <span slot="header">我是页眉</span>
        </DemoFunction>
        <DemoFunction title={11} />
        <Dialog title="友情提示" content="注意防晒" />
        <Dialog>
            <button>确定</button>
        </Dialog>
        <Vote title="投票组件" />
        <Demo2 />
        <Demo3 />
        <Demo4 />
    </>
);

// const jsxObj = createElement(
//     "div",
//     {className: 'contianer'},
//     createElement(
//         "h2",
//         { className: "title", style: {fontSize: '20px'} },
//         "\u5B66\u4E60React"
//     ),
//     createElement(
//         "div",
//         { className: "box" },
//         createElement("span", null, 10),
//         createElement("span", null, '20')
//     )
// )
// render(jsxObj, document.getElementById('root'))

// console.log(React.createElement(DemoFunction, {
//     title: "\u51FD\u6570\u7EC4\u4EF6",
//     className: "box",
//     data: [100, 200]
// }));

fetch('/jian/subscriptions/recommended_collections')
.then(response => response.json())
// .then(value => console.log(value))


let obj = {
    x: 10,
    y: 20
}
Object.freeze(obj)
// obj.x = 100
// obj.z = 200
// delete obj.y
// console.log(Object.isFrozen(obj), obj);

console.log(React.cloneElement({
    type: Vote,
    props: {
        title: '标题'
    }
}));