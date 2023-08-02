import React from "react";

class VoteFooter extends React.PureComponent {

    render() {
        console.log('footer');
        const {handle} = this.props
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
}

export default VoteFooter