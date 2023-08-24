/*
    如何创建一个Generator生成器函数
        + 把创建的function后面加一个*
        + 箭头函数无法变为生成器函数
    
    每一个生成器函数，都是GeneratorFunction这个类的实例
        fn.__pro__   -->   GeneratorFunction.__proto__   -->   Function.__proto__
        多了一个私有属性：[[IsGenerator]]: true
    普通函数的原型链
        fn.__pro__   -->   Function.__proto__

    当生成器函数执行：
        + 首先并不会立即把函数中的代码执行
        + 而是返回一个具有迭代器规范的对象【itor】
            itor.__pro__
            + next
            + throw
            + return
            + Symbol(Symbol.iterator): function
            + ...
        + 当进行itor.next()执行的时候
            + 把函数体中的代码开始执行
            + 返回一个对象
                + done: 记录代码是否执行完毕
                + value: 记录本次处理的结果

    Generator生成器函数的作用：
        - 可以基于返回的itor(迭代器对象),基于其next方法，控制函数体中的代码一步步去执行
        - 每一次执行next，控制函数体中的代码开始执行[或从上次结束的位置继续执行]，遇到yield则暂停
            done: false
            value: yield后面的值
        - 当遇到函数体中的return，或执行到函数最末尾的位置
            done: true
            value: 函数返回值 或 undefined
        - itor.next() 每一次执行next方法，传递的值会作为上一个yield的返回值，所以第一次执行next方法，传递的值是没用的，因为在它之前没有yield


*/

// const fn = function* () {
//     console.log(10);
//     return 100
// }
// const itor = fn()
// console.log(itor.next()); // {value: 100, done: true}
// console.log(itor.next()); // {value: undefinded, done: true}


let obj = {
    // sum: function() {}
    // sum() {} // ES6的写法，等同于上边写法。简写的对象方法不能用作构造函数，会报错。
}


const fn = function* () {
    console.log('a');
    yield 100
    console.log('b');
    yield 200
    console.log('c');
    // return 300
}
const itor = fn()
// console.log(itor.next()); // {value: 100, done: false}

// console.log(itor.next()); // {value: 200, done: false}
// console.log(itor.next()); // {value: 300, done: true}
// console.log(itor.next()); // {value: 300, done: true}

// console.log(itor.throw('hhhh')); // 手动抛异常，控制台报错，后续代码停止执行
// console.log(itor.next()); // 抛出异常后，它下面的代码也不会执行了
// console.log('外边的'));

// console.log(itor.return('哈哈哈哈')); // {value: '哈哈哈哈', done: true} 相当于在函数体中执行遇到了return，结束整个函数的继续执行，传递的值相当于return的值
// console.log(itor.next()); // {value: undefinded, done: true}
// console.log('外边的'); // 外边的


const fn2 = function* (...params) {
    console.log(params);
    let y = yield 100
    console.log(y);
    yield 200
}
const itor2 = fn2(100)
// console.log(itor2.next());
// console.log(itor2.next('second'));
/*
    [100]
    {value: 100, done: false}
    second
    {value: 200, done: false}

    itor.next() 每一次执行next方法，传递的值回座位上一个yield的返回值，所以第一次执行next方法，传递的值是没用的，因为在它之前没有yield
*/


const sum = function*() {
    yield 3
    yield 4
    console.log(3);
}
const fn3 = function*() {
    yield 1
    yield* sum() // yield* 支持我们进入另一个生成器中去一步步执行
    yield 2
}
let itor3 = fn3()
// console.log(itor3.next()); //{value: 1, done: false}
// console.log(itor3.next()); //{value: 3, done: false}
// console.log(itor3.next()); //{value: 4, done: false}
// console.log(itor3.next()); //{value: 2, done: false}
// console.log(itor3.next()); //{value: undefined, done: true}


const delay = (interval = 1000) => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(`@@${interval}`)
        }, interval)
    })
}
// delay(1000)
//     .then(v => {
//         console.log(v);
//         return delay(2000)
//     })
//     .then(v => {
//         console.log(v);
//         // return delay(3000)
//         return Promise.resolve(3000)
//     })
//     .then(v => {
//         console.log(v);
//     })
//     .catch(v => {
//         console.log(v);
//     })

// (async() => {
//     try {
//         let val = await delay(1000)
//         console.log(val);
//         val = await delay(2000)
//         console.log(val);
//         val = await delay(3000)
//         console.log(val);
//     } catch(v) {
//         console.log(v);
//     }
// })()


// 基于Generator函数，模拟Await的语法，是实现请求的串行
const handle = function*() {
    let val = yield delay(1000)
    console.log(val);
    val = yield delay(2000)
    console.log(val);
    val = yield delay(3000)
    console.log(val);
}
// let itor4 = handle()
// let {done, value} = itor4.next()
// value.then(x => {
//     // @@1000
//     let {done, value} =itor4.next(x)
//     value.then(x => {
//         // @@2000
//         let {done, value} =itor4.next(x)
//     })
// })

/*
编写通知Generator中代码逐一执行的方法
ES8中提供了async/await语法：用来简化Promise的操作
    它是Promise + Generator的语法糖
    我们自己实现了AsyncFunction和Generator函数，就是async/await的原理
*/
const AsyncFunction = (generator, ...params) => {
    let itor = generator(...params)
    const next = x => {
        let {done, value} = itor.next(x)
        // 校验
        if (done) return
        if (!(value instanceof Promise)) value = Promise.resolve(value)
        // 执行then，把第1次的结果传递给第2次
        value.then(next)
    }
    next()
}
// AsyncFunction(handle)
AsyncFunction(function*(x, y) {
    let total = x + y
    let value = yield total
    console.log('@1', value);

    yield delay(2000)
    console.log('@2', 'test');
}, 10, 20);

(async(x, y) => {
    let total = x + y
    let value = await total
    console.log('@1', value);

    await delay(2000)
    console.log('@2', 'test');
})(10, 20)
