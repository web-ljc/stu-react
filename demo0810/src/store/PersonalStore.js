// Personal板块的Store
import {observable, action} from 'mobx'

export default class PersonalStore {
    constructor(root) {
        // root:最外层Store的实例【包含各板块store的实例】
        this.root = root
    }
    @observable info = null
    @action.bound queryInfo() {

    }
}