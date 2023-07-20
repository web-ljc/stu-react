/**
 * 函数是-静态组件
 *  第一次渲染组件，把函数执行
 *      + 产生一个私有上下文EC(V)
 *      + 把解析出来的porps传递进来，但被冻结了
 *      + 把函数返回的JSX元素virtualDOM进行渲染
 *  当点击按钮时，会执行绑定函数
 *      + 修改上下文中的变量
 *      + 私有变量值发生了改变
 *      + 但是“视图不会更新”
 * =组件第一次渲染完毕后，组件中的内容，不会根据组件内的某些操作，再进行更新
 * =除非在父组件中，重新调用这个函数组件【传递不同的属性信息】
 * 
 * 真是项目中，有的需求：第一次渲染就不会再变化，可以使用函数组件
 * 大部分需求：需要在第一次渲染完毕后，基于组件内部的某些操作，让组件可以更新，一次呈现不同效果。
 * 类组件、Hooks组件
*/
const Vote = function Vote(props) {
    const { title } = props
    let supNum = 10,
        oppNum = 5

    return <div className="vote-box">
        <div className="header">
            <h2 className="title">
                {title}
            </h2>
            <span>{supNum + oppNum}</span>
        </div>
        <div className="main">
            <p>agree: {supNum}</p>
            <p>reject: {oppNum}</p>
        </div>
        <div className="footer">
            <button onClick={() => {supNum++; console.log(supNum);}}>agree</button>
            <button onClick={() => {oppNum++}}>reject</button>
        </div>
    </div>
}

export default Vote