import React from "react";
import { observer, inject } from "mobx-react";

@observer
@inject('task', 'personal')
class Demo extends React.Component {
    render() {
        return <div>
            23
        </div>
    }
}