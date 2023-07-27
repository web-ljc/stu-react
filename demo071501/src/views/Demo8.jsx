import React from "react";

class Demo8 extends React.Component {
    // 手指按下，记录位置
    touchstart = (ev) => {
        const finger = ev.changedTouches[0]
        this.touch = {
            startX: finger.pageX,
            startY: finger.pageY,
            isMove: false,
        }
    }
    // 手指移动：记录手指偏移，和误差对比，分析出是否移动
    touchmove = (ev) => {
        const finger = ev.changedTouches[0],
            {startX, startY} = this.touch,
            changeX = finger.pageX - startX,
            changeY = finger.pageY - startY
        if (Math.abs(changeX) > 10 || Math.abs(changeY) > 10) {
            this.touch.isMove = true
        }
    }
    // 手指离开
    touchend = () => {
        const {isMove} = this.touch
        if(isMove) return
        console.log('点击了按钮');
    }

    render() {
        return <div>
            <button
                onTouchStart={this.touchstart}
                onTouchMove={this.touchmove}
                onTouchEnd={this.touchend}
                >
                提交8
            </button>
        </div>
    }
    /*
        React中合成事件的处理原则

    */
}

export default Demo8
