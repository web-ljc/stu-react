import React from "react";
import {useLocation, useSearchParams, useParams} from 'react-router-dom'

const C = () => {
    const {search, pathname, state} = useLocation()
    const sup = new URLSearchParams(search)
    const [sup1] = useSearchParams()
    console.log(search, sup1.get('id'));

    const match = useParams()
    console.log(match);

    console.log(state);

    return <div className="box">
        C组件内容
    </div>
}

export default C