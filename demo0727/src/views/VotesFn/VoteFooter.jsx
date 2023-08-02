import React from "react";

const VoteFooter = (props) => {
    const {handle} = props
    console.log('render');
    return (
        <div className="footer">
            <button onClick={handle.bind(null, 'sup')}>
                agree
            </button>
            <button onClick={handle.bind(null, 'opp')}>
                reject
            </button>
        </div>
    )
}

export default React.memo(VoteFooter)