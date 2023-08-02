import React from "react";

class VoteMain extends React.Component {
    static defaultProps = {
        supNum: 0,
        oppNum: 0
    }

    render() {
        const { supNum, oppNum } = this.props
        let ratio = '--',
            total = supNum + oppNum;
        if (total > 0) ratio = (supNum / total * 100).toFixed(2) + '%'

        return (
            <div className="main">
                <p>支持{supNum}人</p>
                <p>反对{oppNum}人</p>
                <p>支持比率 {ratio}</p>
            </div>
        )
    }
}

export default VoteMain