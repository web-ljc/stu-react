/*
    Object.defineProperty(obj, key, descriptor)
        1. 设置对象中某个成员规则
            + 如果成员存在，则修改其规则
            + 如果成员不存在，则新增成员，并设置规则【默认所有规则为false】
        2. 数据劫持

    对象成员规则限制：
        + Object.getOwnPropertyDescriptor(对象, 成员) 获取对象中某个成员的规则
        + Object.getOwnPropertyDescriptors(对象) 获取对象所有成员的规则
        + 规则：
            configurable: true  是否可以删除
            enumerable: true    是否可以枚举 for/in Object/keys列举出来
            writable: true      是否可以更改
            value: 100          值
*/

let obj = {
    x: 100
}
Object.defineProperty(obj, 'x', {
    get() {
        // 获取x成员信息时，就会触发GET函数执行
        // 返回内容则是成员值
        console.log('GETTER触发了');
        return '@@'
    },
    set(val) {
        // 设置成员值的时候，触发setter函数
        console.log('SETTER触发了', val);
    }
})

// Object.defineProperty(obj, 'x', {
//     configurable: false,
//     writable: false
// })
// Object.defineProperty(obj, 'y', {
//     configurable: false
// })

obj.x = 200
console.log(obj.x);

console.log(Object.getOwnPropertyDescriptor(obj, 'x'));
console.log(Object.getOwnPropertyDescriptors(obj));
