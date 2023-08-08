import React from "react";
import { connect } from "react-redux";
import action from '../store/actions'
import { bindActionCreators } from "redux"

const Vote = (props) => {
    console.log(props, 22);
    const {supNum, oppNum} = props
    return (
        <div>
            <div className="header">
                <h2>{props.title}</h2>
                <span>{supNum + oppNum}</span>
            </div>
            <VoteMain2 />
            <VoteFooter2 />
        </div>
    )
}

class VoteFooter extends React.PureComponent {
    render() {
        console.log(this.props,  2);
        const {support, oppose} = this.props
        return (
            <div className="footer">
                {/* 5. 派发任务 */} 
                <button onClick={support}>
                    agree
                </button>
                <button onClick={oppose}>
                    reject
                </button>
            </div>
        )
    }
}
const VoteFooter2 = connect(null, action.vote)(VoteFooter)
/*
    {
        support() {
            return {
                type: TYPES.VOTE_SUP
            }
        },
        oppose() {
            return {
                type: TYPES.VOTE_OPP
            }
        }
    }
*/
// const VoteFooter2 = connect(null, dispatch => {
//      console.log(bindActionCreators(action.vote, dispatch))
//     return {
//         support() {
//             dispatch(action.vote.support())
//         },
//         oppose() {
//             dispatch(action.vote.oppose())
//         },
//     }
// })(VoteFooter)

class VoteMain extends React.Component {
    render() {
        const  {supNum, oppNum} = this.props
        let ratio =  '--',
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
const VoteMain2 = connect(state => state.vote)(VoteMain)

export default connect(state => state.vote)(Vote)

/*
    connect(mapStateToProps, mapDispatchToProps)(我们要渲染的组件)
        1. mapStateToProps：可以获取到redux的公共状态，把需要的信息作为属性，传递组件即可
            connect(state => {
                // 存储redux容器中，所有模块的公共状态信息
                // 返回对象中的信息，就是要作为属性，传递给组件的信息
                return {
                    supNum: state.vote.supNum
                }
            })(Vote)
        2. mapDispatchToProps把需要派发的任务当作属性传递给组件
            connect(
                null,
                dispatch => {
                    // dispatch: store.dispatch 派发任务的方法
                    return {
                        ...
                    }
                }
            )(Vote)
*/