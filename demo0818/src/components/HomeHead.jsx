import React from "react";
import {Link, useLocation} from "react-router-dom"

const HomeHead = () => {
    // console.log(useLocation());
    return <div>
        <Link to="/a">A</Link>
        <Link to="/b">B</Link>
        <Link to="/c">C</Link>
    </div>
}

export default HomeHead
