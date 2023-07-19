import React from "react"
import PropTypes from "prop-types"

const Dialog = function Dialog(props) {
    let {title, content, children} = props
    children = React.Children.toArray(children)

    return (
        <div className="dialog-box">
            <div className="header">
                <h2>{title}</h2>
                <span>X</span>
            </div>
            <div className="main">{content}</div>
            {
                children.length ? (
                    <div className="footer">
                        {children}
                    </div>
                ): null
            }
        </div>
    )
}
/* 属性校验 */
Dialog.defaultProps = {
    title: '温馨提示',
    content: '提示内容'
}
Dialog.propTypes = {
    title: PropTypes.string,
    content: PropTypes.string.isRequired
}

export default Dialog