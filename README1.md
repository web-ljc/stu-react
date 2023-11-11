### React渲染机制
1. 把jsx语法编译为虚拟DOM【virtualDOM】
    + 基于babel-preset-react-app 把jsx视图编译为 React.createElement 格式
    + createElement 执行就会创建出对应的 virtualDOM

2. 基于ReactDOM中的render方法，把virtualDOM编译为真实DOM，最后把真实DOM交给浏览器

3. 当组件更新的时候
    + 会根据最新的数据，重新把“整个jsx”编译为新的virtualDOM【从头到尾进行编译】
    + 但不会把整个virtualDOM全部编译为真实的DOM，需要经过DOM-DIFF对比，把virtualDOM中差异部分获取到，把差异部分渲染为真实DOM，交给浏览器渲染

4. DOM-DIFF
    - DOM-DIFF主要就是组件更新时，可以实现差异化的更新，而不是整体全部更新，以此来优化组件渲染的速度，提高性能
    - React DOM-DIFF算法
        - 在ReactV16及以前：新老虚拟DOM对比
        - 在ReactV17及以后：老得DOM会构建出Fiber链表，拿最新创建的虚拟DOM和Fiber链表做对比
        
        - 优化原则
            1. 深度优先原则
            2. 同级比较
            3. 不同类型的元素，会产出不同结构：销毁老结构、创建新结构
            4. 可以通过key标识移动的元素：如果不设置key，则默认元素的索引就是key
        
        - 处理规则
            1. key和 类型 都相同：
                + 更新且复用老的节点 Update(4)
            2. key和 类型 只要有一个不同：
                - 删除老的 Deletion(8)
                - 插入新的 Placement(2)
                - 插入并更新，也就时挪动位置  PlacementAndUpdate(6)
        
        - 详细的处理步骤
            可能会经历二轮遍历
            + 第一轮：主要是处理节点的更新
            + 第二轮：主要处理节点的新增、删除和移动
            + 移动时的原则是尽量少量的移动，如果必须有一个要动，新地位高的不懂，新地位低的动
            + key不同退出第一轮循环

        - 循环创建元素需要设置唯一的key，不建议使用索引作为key值


        
5. 索引作为key的优化
    - 循环创建元素时，尽量不要用索引作为key值，用不会因为“位置或索引”改变而改变的值做key【例如ID值】


### Generator生成器 & Iterator迭代器
1. Iterator迭代器
    - 迭代器是一种机制（接口）规范：为各种不同的数据结构提供统一的访问机制，任何数据结构之遥部署Iterator接口，就可以完成遍历操作【for of循环】，依次处理该数据结构的所有成员
        + 拥有next方法用于依次遍历数据结构的成员
        + 每一次遍历返回的结果是一个对象{done: false, value: xxx}
            + done:记录是否遍历完成，true遍历完
            + value：当前遍历的结果

    - 拥有Symbol.iterator属性的数据结构（值），就具备迭代器规范，被称为可被遍历，可以基于for of循环处理
        + 数组：Array.prototype[Symbol(Symbol.iterator)]=function...
        + 部分类数组：
            + arguments[Symbol(Symbol.iterator)]
            + NodeList.prototype[Symbol(Symbol.iterator)]
            + HTMLCollection.prototype[Symbol(Symbol.iterator)]
        + 字符串：String.prototype[Symbol(Symbol.iterator)]
        + Set/Map
        + generator object
        + ...
    - 纯粹对象、或自己构建的类数组对象。默认不具备Symbol.iterator 属性，不具备迭代器规范，【不能直接使用for/of循环】
    
2. generator
    - 生成器对象是由一个generator function返回的，并且它符合可迭代协议和迭代器协议
    

