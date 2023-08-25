import React, { useEffect, useState } from "react";
// import VirtualList from 'react-tiny-virtual-list'


let data = new Array(30).fill(0)

/*
    1. 创建可滚动的可视区，内置所有内容总高度的区域，内置内容列表并设置相对位置
    2. 获取可视区内start、end位置，获取需要填充内容的数组
    3. 给可视区绑定滚动事件，滚动时更新start位置
*/
class VirtualList extends React.Component {
    state = {start: 0} // 起始索引
    scrollBox = React.createRef()
    handleScroll = () => {
        const {itemSize} = this.props
        const {scrollTop} = this.scrollBox.current
        const start = Math.floor(scrollTop/itemSize)
        this.setState({start})
    }
    render() {
        // height容器高度 width容器宽度 itemCount多少条目 itemSize每个条目多高
        const {width, height, itemCount, itemSize, renderItem} = this.props
        // 开始结束位置
        const {start} = this.state
        let end = start + Math.floor(height/itemSize) + 1
        end = end > itemCount ? itemCount : end // 结束的索引越界，则赋值总条数
        // visibleList=[{index:0},....,{index:10}] 获取可视列表
        const visibleList = new Array(end-start).fill(0).map((item, index) => ({index: start+index}))
        // 每条样式
        let itemStyle = {position: 'absolute', left: 0, width: '100%', height: 50}
        
        return (
            <div style={{overflow: 'auto', willChange: 'transform', height, width}} ref={this.scrollBox} onScroll={this.handleScroll}>
                <div style={{position: 'relative', width: '100%', height: `${itemCount*itemSize}px`}}>
                    {
                        visibleList.map(({index}) => renderItem({index, style: {...itemStyle, top: itemSize*index}}))
                    }
                </div>
            </div>
        )
    }
}

export default class App extends React.Component {
    state = {
        list: []
    }
    
    render() {
        console.log('App render');
        return (
            <VirtualList
                width="50%"
                height={500}
                itemCount={data.length}
                itemSize={50}
                renderItem={
                    data => {
                        console.log(data);
                        let {index, style} = data
                        return (
                            <div key={index} style={{...style, background: index%2===0 ? 'green' : 'red'}}>
                                {index + 1}
                            </div>
                        )
                    }
                }
            />
        )
    }
} 


