import React, { useContext, useEffect, useMemo, useState } from "react"
import { bindActionCreators } from "redux"
const ThemeContext = React.createContext()

/* Provide:把传进来的store放在根组件的上下文中 */
export function Provider(props) {
    let {store, children} = props

    return <ThemeContext.Provider
        value={{
            store
        }}>
        {children}
    </ThemeContext.Provider>
}

/* connect:获取上下文中的store，把公共状态、要派发的方法等，都基于属性传递给需要渲染的组件，把让组件更新的方法放在redux事件池中 */
export function connect(mapStateToProps, mapDispatchToProps) {
    // 处理默认值
    if (!mapStateToProps) {
        mapStateToProps = () => {
            // 不写则什么都不给组件传递
            return {}
        }
    }
    if (!mapDispatchToProps) {
        mapDispatchToProps = (dispatch) => {
            // 不写则把dispatch方法传递给组件
            return {
                dispatch
            }
        }
    }

    return function currying(Component) {
        // Component最终渲染的组件
        // HOC:基于export default导出的组件
        return function HOC(porps) {
            // 获取上下文store
            const {store} = useContext(ThemeContext),
                {getState, dispatch, subscribe} = store

            // 向事件池中加入组件更新的方法
            let [, fourceUpdate] = useState(0)
            useEffect(() => {
                const unsubscribe = subscribe(() => {
                    fourceUpdate(+new Date())
                })
                return () => {
                    unsubscribe()
                }
            }, [])

            // 把mapStateToProps/mapDispatchToProps执行，返回值传递给组件
            const state = getState(),
                nextState = useMemo(() => {
                    return mapStateToProps(state)
                }, [state])
            let dispatchProps = {}
            if (typeof mapDispatchToProps === 'function') {
                // 函数可以直接执行
                dispatchProps = mapDispatchToProps(dispatch)
            } else {
                // 是actionCreator对象，需要经过bindActionCreators处理
                dispatchProps = bindActionCreators(mapDispatchToProps, dispatch)
            }

            return <Component
                {...porps}
                {...nextState}
                {...dispatchProps}
            />
        }
    }
}


// dispatchProps
//    {
//         support() {
//             dispatch(action.vote.support())
//         },
//         oppose() {
//             dispatch(action.vote.oppose())
//         },
//     }
