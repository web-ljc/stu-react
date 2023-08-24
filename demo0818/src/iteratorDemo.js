// 创建Iterator类，来实现ES6中的迭代器规范
class Iterator{
    constructor(assemble) {
        // assemble:需要迭代的数据结构
        this.assemble = assemble
        // index:记录迭代的次数（或索引）
        this.index = -1
    }

    // next方法
    next() {
        this.index++
        const {assemble, index} = this
        const val = assemble[index]
        return {
            done: index >= assemble.length,
            value: val
        }
    }
}

/*
    创建一个实例对象，应该具备迭代器规范的要求
        itor.next()具备next方法，执行这个方法可以依次获取到数据结构中的每一个成员值
        每一次获取的成员值是一个对象
            + done：是否迭代完毕
            + value：当前获取的那个值
        符合以上2个特点，称为符合迭代器规范的对象
*/
const arr = [10, 20, 30, 40],
    itor = new Iterator(arr)

// console.log(itor.next()); // {done: false, value: 1}
// console.log(itor.next()); // {done: false, value: 2}
// console.log(itor.next()); // {done: false, value: 3}
// console.log(itor.next()); // {done: false, value: 4}
// console.log(itor.next()); // {done: true, value: undefined}

/*
    // for/of循环主要用于获取数据结构中每一项的值
    for (let val of arr) {
        console.log(val)
    }
    原理：
        1.迭代执行，先执行数组的Symbol.iterator方法，获取一个具备迭代器规范的对象-itor
        2.开始迭代：每一次迭代都是把 itor.next 方法执行
            + 把获取对象中的value属性值，赋值给val这个变量
            + 在看对象中done这个属性，如果是false则继续迭代，如果是true，则结束迭代
*/

arr[Symbol.iterator] = function() {
    let self = this,
        index = -1
    return {
        next() {
            index++
            return {
                done: index >= self.length,
                value: self[index]
            }
        }
    }
}
// for (let val of arr) {
//     console.log(val);
// }


// 对象添加Symbol.iterator方法
const obj2 = {
    name: 'test',
    age: 12,
    [Symbol('AA')]: 100
}
Object.prototype[Symbol.iterator] = function() {
    const self = this,
        keys = [...Object.getOwnPropertyNames(self), ...Object.getOwnPropertySymbols(self)]
    let index = -1
    
    return {
        next() {
            index++
            return {
                done: index >= keys.length,
                value: self[keys[index]]
            }
        }
    }
}
// console.log(obj2);
// for (let val2 of obj2) {
//     console.log(val2);
// }


// 如果是类数组，可以直接借用类数组原型上的Symbol.iterator方法
// const obj = {
//     0: 'test',
//     1: 12,
//     length: 2
// }
// Object.prototype[Symbol.iterator] = Array.prototype[Symbol.iterator]
// for (let val2 of obj) {
//     console.log(val2);
// }

// jq使用的就是数组原型上方法
