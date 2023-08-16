// Task板块的Store
import {observable, action, runInAction} from 'mobx'

export default class TaskStore {
    constructor(root) {
        // root:最外层Store的实例【包含各板块store的实例】
        // 以后可以在TASK板块中，基于this.root获取根Store实例，基于根Store实例，访问其他板块实例
        this.root = root
    }

    @observable taskList = null

    // 异步获取全局任务
    @action.bound queryAllTaskAction() {
        runInAction(() => {
            this.taskList = []
        })
    }

    // 同步删除某一任务
    @action.bound removeTaskAction() {

    }
}