/*
向服务器发送数据请求的方案：
    1. XMLHttpRequest
        + ajax
        + axios：第三方库，对XMLHttpRequest进行封装【基于Promise进行封装】
    2. fetch
        + ES6内置API，本身基于promise，用全新的方案实现客户端和服务端的数据请求
        + 不兼容IE
        + 机制的完善度上，还不如XMLHttpRequest【例如无法设置超时时间、没有内置的请求中断的处理】
    3. 其他方案，主要是跨域为主
        + jsonp
        + postMessage
        + 利用img的src发送请求，实现数据埋点、上报

let promise实例 = fetch(请求地址, 配置项)
    + 请求成功,p的状态是fulfilled，值时请求回来的内容，请求失败，p的状态时rejected，值是失败原因
    + fetch和axios不一样的地方
        + 在fetch中，只要服务器有反馈信息（不论HTTP状态码是多少），都说明网络请求成功，最后的实例p都是fulfilled
        只有服务器没有任何反馈(例如：请求中断、请求超时、断网等)，实例p才是rejected
        + 在axios中，只有返回的状态码是以2开始的，才会让实例是成功态
    -----
    配置项 
        + method 请求的方式，默认是GET // GET、HEAD、DELETE、OPTIONS、POST、PUT、PATCH
        + mode 请求模式 // no-cors，*cors，same-origin
        + cache 缓存模式
        + credentials 资源凭证
*/ 


let p = fetch('./api/getTaskList')
p.then(v  => {
    console.log(v);
}).catch(e => {
    console.log(e);
})
console.log(p.json());


