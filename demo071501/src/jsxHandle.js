/*
 * 封装一个对象迭代方法
 *  - 基于传统的for/in循环，会存在一些弊端，性能差：即迭代私有、也迭代公有。只能迭代“可枚举、非Symbol类型”的属性..
 *  - 解决思路：获取对象的所有私有属性：私有的、不论是否可枚举，不论类型
 *       Object.getOwnPropertyNames(arr) -- 获取对象非Symbol类型的私有属性，无关可枚举
 *       Object.getOwnPropertySymbols(arr) -- 获取Symbol类型的私有属性
 *       获取所有私有属性
 *       let keys = Object.getOwnPropertyNames(arr).concat(Object.getOwnPropertySymbols(arr))
 *       可以基于ES6的Reflect.ownkeys代替上边操作，不兼容IE
 *       let keys = Reflect.ownKeys(arr)
*/
const each = function each(obj, callback) {
    if (obj === null || typeof obj !== "object") throw new TypeError('obj is not a object')
    if (typeof callback !== "function") throw new TypeError('callback is not a function')
    const keys = Reflect.ownKeys(obj)
    keys.forEach(key => {
        const value = obj[key]
        callback(value, key)
    })
}
// Array.prototype.BB = 200
// let arr = [10, 20]
// arr[Symbol('AA')] = 100
// console.log(arr);
// for (let key in arr) {
//     console.log(key);
// }
// console.log(Object.getOwnPropertyNames(arr));
// let keys = Object.getOwnPropertyNames(arr).concat(Object.getOwnPropertySymbols(arr))
// let keys = Reflect.ownKeys(arr)
// console.log(keys, 222);
// each(arr, (v, k) => console.log(v, k))

/**
 * createElement: 创建virtualDOM对象
*/
export function createElement (ele, props, ...children) {
    let virtualDOM = {
        $$typeof: Symbol('react.element'),
        key: null,
        ref: null,
        type: null,
        props: {}
    }
    let len = children.length

    virtualDOM.type = ele
    if (props !== null) {
        virtualDOM.props = {
            ...props
        }
    }
    if (len === 1) virtualDOM.props.children = children[0]
    if (len > 1) virtualDOM.props.children = children

    return virtualDOM
}

/**
 * render: virtualDOM对象转为真实DOM
 * 给当前元素设置属性[自定义/内置]2种方式
 *  1. div[k] = v 
 *      原理：对于内置属性，是设置在元素的标签上；对于自定义属性来讲，是给对象的堆内存空间中新增成员[不会设置到标签上]、
 *      获取：元素.属性
 *      删除：delete 元素.属性
 * 
 *  2. div.setAttribute(k, v)
 *      原理：直接写在元素的标签上
 *      获取：div.getAttribute(k)
 *      删除：div.removeAttribute(k)
 * 
 * 二者不能混淆
*/
export const render = (virtualDOM, container) => {
    const {type, props} = virtualDOM
    if (typeof type === 'string') {
        // 创建元素
        const ele = document.createElement(type)
        // 为标签设置相关的属性 & 字节点
        each(props, (v, k) => {
            // className处理，v储存的是样式类名
            if (k === 'className') {
                ele.setAttribute('class', v)
                return
            }
            // style处理，v存储的是对象
            if (k === 'style') {
                each(v, (val, attr) => {
                    ele.style[attr] = val
                })
                return
            }
            // 拼接子节点
            if (k === 'children') {
                let children = v
                if (!Array.isArray(children)) children = [children]
                children.forEach(child => {
                    // 字节点是文本节点：直接插入即可
                    if (/^(string|number)$/.test(typeof child)) {
                        ele.appendChild(document.createTextNode(child))
                        return
                    }
                    // 子节点是virtualDOM：递归处理
                    render(child, ele)
                })
                return
            }
            ele.setAttribute(k, v)
        })
        // 新增标签，增加到指定容器
        container.appendChild(ele)
    }
    if (typeof type === 'function') {
        type(props)
    }
}