import React, {PureComponent, Suspense} from "react"


const Loading = () => <div>Loading</div>

/*
    实现路由分割
    @params loadComponent () => import('./views/Home')
*/
export function dynamic(loadComponent) {
    const LazyComponent = lazy(loadComponent)

    return () => (
        <Suspense fallback={<Loading />}>
            <LazyComponent />
        </Suspense>
    )
}
// 组件加载完，执行导入组件方法，获取内容并渲染
function lazy(loadComponent) {
    return class extends React.Component {
        state = {Component: null}
        componentDidMount() {
            loadComponent().then(result => {
                this.setState({ Component: result.default })
            })
        }
        render() {
            const {Component} = this.state
            return Component && <Component />
        }
    }
}


// 浅比较props与state，属性与值是否发生变化
export class PureComponents extends React.Component {
    shouldComponentUpdate(nextProps, nextStates) {
        return !shallowEqual(this.props, nextProps) || !shallowEqual(this.state, nextStates)
    }
}
// 浅比较，比较一层性能高
const shallowEqual = (obj1, obj2) => {
    if (obj1 === obj2) return true // 比较引用地址
    let keys1 = Object.keys(obj1),
        keys2 = Object.keys(obj2)
    if (keys1.length !== keys2.length) return false
    for (let key of keys1) {
        if(!obj2.hasOwnProperty(key) || obj1[key] !== obj2[key]) {
            return false
        }
    }
    return true
}

// 传入组件进行对比，并传入参数
export const memo = (FunctionComponent) => {
    return class extends PureComponents{
        render() {
            return <FunctionComponent {...this.props} />
        }
    }
}
