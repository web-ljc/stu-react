import React from "react";
// import FastClick from 'fastclick'; // 使用FastClick解决移动端使用click事件的300ms延迟问题
// console.dir(FastClick);

class Demo8 extends React.Component {
    handle = (ev) => {
        // FastClick.attach(document.body)
    }
  
    render() {
        return <div>
            <button
                onClick={this.handle}
                >
                提交
            </button>
        </div>
    }
    /*
        React中合成事件的处理原则

    */
}

export default Demo8
