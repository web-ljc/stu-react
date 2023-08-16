import TaskStore from "./TaskStore";
import PersonalStore from "./PersonalStore";

class Store {
    constructor() {
        this.task = new TaskStore(this),
        this.personal = new PersonalStore(this)
    }
}

export default new Store()

/*
    store = {
        task: {
            taskList: null,
            __proto__: TaskStore.prototype
                queryAllTaskAction
                removeTaskAction
        },
        personal: {
            info: null,
            __proto__: PersonalStore.prototype
                queryInfo
        },
        __proto__: store.prototype
    }

*/