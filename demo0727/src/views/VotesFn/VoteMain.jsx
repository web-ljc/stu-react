import React, { useMemo } from "react";

const VoteMain = (props) => {
    const {supNum, oppNum} = props

    // 基于useMemo实现缓存处理
    let ratio = useMemo(() => {
        let ratio =  '--',
            total = supNum + oppNum;
        if (total > 0) ratio = (supNum / total * 100).toFixed(2) + '%'
        return ratio
    }, [supNum, oppNum])

    return (
        <div className="main">
            <p>支持{supNum}人</p>
            <p>反对{oppNum}人</p>
            <p>支持比率 {ratio}</p>
        </div>
    )
}
VoteMain.defaultProps = {
    supNum: 0,
    oppNum: 0
}

export default VoteMain