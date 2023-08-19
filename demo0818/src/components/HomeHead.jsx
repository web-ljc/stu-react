import React from "react";
import {Link, useLocation} from "react-router-dom"
import {withRouter} from '../router/index'

const HomeHead = (props) => {
    // console.log(useLocation());
    console.log(props);
    return <div>
        <Link to="/a">A</Link>
        <Link to="/b">B</Link>
        <Link to="/c">C</Link>
    </div>
}

export default withRouter(HomeHead)
