import React from "react";
import PropTypes from "prop-types";

const DemoFunction = function DemoFunction(props) {
    // props.title = '23' // error
    // console.log(Object.isExtensible(props));
    let { className, title, x: x } = props
    x = 1000
    return <div className={`demop-box ${className}`}>
        我是{title}
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
