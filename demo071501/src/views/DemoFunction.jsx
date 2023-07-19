import React from "react";
import PropTypes from "prop-types";

const DemoFunction = function DemoFunction(props) {
    // props.title = '23' // error
    // console.log(Object.isExtensible(props));
    let { className, title, x: x, children } = props
    x = 1000
    // 对children的数据类型做处理
    // children = !children ? [] : Array.isArray(children) ? children : [children]
    // 可以基于 React.Children 对象中提供的方法，对props.children做处理: count\forEach\map\toArray
    // 好处：在这些方法的内部，已经对children的各种形式做了处理
    children = React.Children.toArray(children)
    // 传递进来的插槽信息，都是编译为virtualDOM后传递进来的[而不是传递标签]
    let headerSolt = children.filter(i => i.props.slot === 'header')
    let footerSolt = children.filter(i => i.props.slot === 'footer')

    return <div className={`demop-box ${className}`}>
        {headerSolt}
        <br />
        我是{title}
        <br />
        {footerSolt}
    </div>
}

/* 通过把函数当做对象，设置静态的私有属性方法，来给其设置属性的校验规则 */
DemoFunction.defaultProps = {
    title: '',
    className: 'test'
}
DemoFunction.propTypes = {
    className: PropTypes.string.isRequired,
    title: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ])
}

export default DemoFunction
