import React from "react";
import {Link, useHistory, useLocation, useRouteMatch, withRouter} from 'react-router-dom'

/*
    只要在HashRouter/BrowserRouter中渲染的组件：
        我们在组件内部，可以基于useHistory/useLocation/useRouteMatch这些Hook函数，就可以获取history/location/match对象信息
        即便这个组件不是基于Route渲染

        只有基于Route匹配渲染的组件，才可以基于props属性，获取这三个对象信息
    
    问题：如果当前组件是一个类组件，在HashRouter内，但是并没有经过Route匹配渲染，该如何获取三个对象信息？
    解决方案：基于高阶组件，包裹一层进行处理
    在react-router-dom V5版本中，自带了高阶组件withRouter，解决这个问题
*/

class HomeHead extends React.Component {
    render() {
        console.log(this.props);
        return <nav>
                <Link to="/a">A</Link>
                <Link to="/b">B</Link>
                <Link to="/c">C</Link>
            </nav>
    }
}

// 高阶组件
const handle = (Component) => {
    // 返回一个代理/高阶组件【导出去供别的地方调用的就是HOC组件】，直接返回组件报错
    return (props) => {
        const history = useHistory(),
            location = useLocation(),
            match = useRouteMatch()
        // props：调用HOC传递的属性，这些属性原本是传递给HomeHead
        return <Component {...props} history={history} location={location} match={match} />
    }
}

// const HomeHead = (props) => {
//     console.log(props, 222);
//     const history = useHistory()
//     console.log(history);
//     return <nav>
//         <Link to="/a">A</Link>
//         <Link to="/b">B</Link>
//         <Link to="/c">C</Link>
//     </nav>
// }
export default withRouter(HomeHead)