import {observable, action, autorun, observe, computed, reaction, configure, runInAction} from 'mobx'

// mobx全局配置
configure({
    // 强调使用action方法模式，去修改状态；不允许单独基于实例修改状态
    enforceActions: 'observed'
})

const query = () => {}

class Store {
    // observable：把状态变为可监测的，只有这样基于autorun/@observer等监测机制才会生效
    @observable x = 10

    // 修改函数的装饰器，让函数中的状态更改为“异步批处理”
    // action.bound 保证函数无论如何执行，函数中的this都是store实例
    @action.bound
    async change() {
        this.x++
        let res = await query()
        // 需要在异步结束后，基于runInAction去修改状态
        runInAction(() => {
            this.x = res
        })
    }

    @observable count = 3
    @observable price = 100
    // computed：装饰器，创建一个具备计算缓存的计算属性
    @computed total() {
        return this.count * this.price
    }
}
let store = new Store()
autorun(() => {
    // 首先会立即执行一次，自动建立起依赖检测；当依赖的状态值发生改变，callback会重新执行
    console.log('autorun', store.x, store.total);
})
// reaction和autorun一样，都是监听器，提供更细粒化的状态监测【默认是不会执行的】
reaction(
    () => [store.x, store.total],
    () => {}
)
setTimeout(() => {
    // 基于runInAction可以实现和@action一样的效果
    runInAction(() => {
        store.x = 1000 // total计算属性不会重新执行，用之前缓存的结果
    })
    // store.count = 10 // total属性需要重新计算执行，计算出新的值
    store.change() // this--store // 返回promise实例，当异步操作结束后，实例会变为成功的
    // let func = store.change
    // func() // 没设置bound this--undefined；设置bound后this--store

})
export default <>12</>

// ES6中的Proxy【mobx>=5不支持IE原因】
// 对当前某个对象进行数据劫持和代理：这样就可以在操作对象成员的时候，触发get/set劫持函数，做一些特殊处理
// let obj = {
//     x: 10
// }
// let proxyObj = new Proxy(obj, {
//     get(target, key) {
//         console.log('GETTER',target, key);
//         return target[key]
//     },
//     set(target, key, value) {
//         console.log("SETTER", target, key, value);
//         target[key] = value
//         return key
//     }
// })
// console.log(proxyObj); // 返回的代理对象是被劫持的
// console.log(proxyObj.x); // 返回某个成员值的时候，就会触发get函数
// proxyObj.x = 1000 // 设置成员值的时候，触发set函数


// 经过observable处理后的数据，是基于ES6Proxy做过数据劫持的
// 后期修改状态值，可以在STTER函数中做一些特殊处理，例如：把依赖其值的监听器触发执行
let obj = observable({
    x: 10
})
console.log(obj);
// 创建监听器，对对象进行监听，当对象中的某个成员发生改变，触发回调函数执行【前提：对象基于observable修饰的】
observe(obj, change => {
    console.log(change); // {type: 'update', name:'x', oldvalue:10, newValue:1000, ...}
})
obj.x = 1000

// observable无法直接装饰原始值，需要使用observable.box处理
let x = observable.box(10)
console.log(x); // ObservableValue
console.log(x.get());
observe(x, change => {
    console.log(change);
})
x.set(1000)

