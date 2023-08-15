/*
    类中属性/方法的装饰器

*/

// 给实例设置私有属性的时候，触发装饰器函数执行，以此来给属性进行装饰
const test = (target, name, descriptor) => {
    // target：Demo.prototype
    // name: 'x'
    // descriptor：{configurable: true, enumerable: true, writable: true, initializer: f} 
    // 修饰的属性值，则初始值是基于initializer函数设置的
    
    // target：Demo.prototype
    // name: 'getX'
    // descriptor：{configurable: true, enumerable: false, writable: true, value: f} 
    // 修饰的函数，则初始值是基于value属性设置的
}

class Demo {
    @test x = 100

    @test
    getX() {}
}
let d = new Demo()
console.log(d);

// 创建只读修饰器
const readonly = (_, name, descriptor) => {
    // 把修饰的name属性/方法设置为只读的规则
    descriptor.writable = false
}
// 创建记录执行时间日志的修饰器
const loggerTime = (_, name, descriptor) => {
    let func = descriptor.value
    // 重写函数
    descriptor.value = function proxy(...params) {
        console.time(name)
        let res = func.call(this, ...params) // 更改函数this指向，并返回执行结果
        console.timeEnd(name)
        return res // 返回执行结果
    }
}

class Demo2 {
    @readonly x = 100

    @readonly
    @loggerTime
    getX(a, b) {
        return this.x
    }
}

let p2 = new Demo2()
p2.getX(10, 20)

// 1 3 4 2  // 需要先把外层函数执行，执行的返回值（小函数）作为装饰器函数，从下到上的顺序执行


const test2 = (target, name, descriptor) => {
    // 返回值必须是一个规则的描述对象，也就是对name修饰属性/方法的描述规则
    return {
        enumerable: false,
        initializer() {
            return '@@'
        }
    }
}

class Demo{
    @test2
    x = 100
}