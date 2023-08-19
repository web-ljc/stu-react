import {Suspense} from 'react'
import {Routes, Route, useNavigate, useLocation, useSearchParams, useParams} from 'react-router-dom'
import routes from "./routes";

/* 统一渲染的组件: 可以做权限、登录状态检验，传递属性 */
const Element = (props) => {
    const {component: Component} = props
    // 把路由信息先获取懂啊，最后基于属性传递给组件: 只要基于Route匹配渲染组件，都可以基于属性获取路由信息
    const navigate = useNavigate(),
        location = useLocation(),
        params = useParams(),
        [usp] = useSearchParams()

    // 最后把Component组件进行渲染
    return <Component navigate={navigate} location={location} params={params} usp={usp} />
}

/* 递归创建Router */
const createRouter = (routes) => {
    return <>
        {
            routes.map((item, index) => {
                const {path, children} = item
                return <Route key={index} path={path} element={<Element {...item}/>}>
                    {
                        Array.isArray(children) ? createRouter(children) : null
                    }
                </Route>
            })
        }
    </>
}

/* 路由容器 */
export default function RouterView() {
    return <Suspense fallback={<>正在处理...</>}>
        <Routes>
            {createRouter(routes)}
        </Routes>
    </Suspense>
}

/* 创建withRouter */
export const withRouter = (Component) => {
    return (props) => {
        const navigate = useNavigate(),
            location = useLocation(),
            params = useParams(),
            [usp] = useSearchParams()

        return <Component {...props} navigate={navigate} location={location} params={params} usp={usp} />
    }
}