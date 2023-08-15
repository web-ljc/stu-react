/*
    类的装饰器

    @fn
    class Xxxx {}
    创建类的时候，会把装饰器函数执行
        + target：当前装饰的类
        + 可以在装饰器函数中，给类设置一些静态私有的属性方法、或者原型上的属性方法等
        + 装饰器函数执行的返回结果，会替换原有的类
    
    同一个装饰器可以作用在多个类上，【基于class创建】
    同一个类也可以使用多个装饰器，从下向上执行

*/

// const test = (target) => {
//     // target:Demo 此处就是给类设置静态私有属性方法
//     target.num = 100
//     target.getNum = function getNum() {}
//     target.prototype.say = function() {}
// }
// @test
// class Demo{}
// @test
// class Child{}


// const test = (target) => {
//     target.num = 100
//     // 装饰器函数执行的返回结果，会替换原有的类
//     // return 100 ==> Demo = 100
// }
// @test
// class Demo{}


// const sum = target => {
//     target.prototype.sum = () => {}
// }
// const staticNum = target => {
//     target.num = 10
// }

// // 先处理staticNum、再处理sum
// @sum
// @staticNum
// class Demo{}


// 可以基于传递不同的值，让装饰器有不同的效果
const test = (x, y) => {
    console.log(1);
    // 返回的是装饰器函数
    return (target) => {
        console.log(2);
        target.num = x + y
    }
}
const handle = () => {
    console.log(3);
    return (target) => {
        console.log(4);
        target.handle = 'AAA'
    }
}
// @test(10, 20)
// @handle()
// class Demo{}
// 1 3 4 2  // 需要先把外层函数执行，获取装饰器函数后，再按照从下到上的顺序执行，来执行装饰器函数


// ES6中类的创建
class Fn2 {
    // 等价构造函数体
    constructor() {
        this.x = 100
    }
    y = 200
    getY = () => {
        console.log(this.y);
    }
    // 在原型上加方法1
    getX() {
        console.log(this.x);
    }
    // 把Fn2当作普通对象设置键值对，调取的时候Fn2.getZ()
    static getZ() {
        console.log(this.z);
    }
    static z = 300
}
// 原型上加方法2
// Fn2.prototype.getZ1 = function() {}