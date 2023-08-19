import React from "react";
import {Link, Outlet} from 'react-router-dom'

const A = (props) => {
    console.log(props, 2);
    return <div>
        <Link to="/a/a1">A1</Link>
        <Link to="/a/a2">A2</Link>
        <Link to="/a/a3">A3</Link>
        <div>
            <Outlet />
        </div>
    </div>
}

export default A