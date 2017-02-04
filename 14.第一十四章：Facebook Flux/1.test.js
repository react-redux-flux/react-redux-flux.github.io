/**
 * Created by Acer on 2017/1/29.
 */


// 上机课实现flux的方式
var store;
dispatcher.register(store1); //注册store
dispatcher.register(store2); //注册store
dispatcher.register(store3); //注册store
dispatcher.register(store4); //注册store

dispatcher.dispatch(action);  //for


// fackbook实现flux的方式
dispatcher.register(function callback(action){  //注册一个回调函数
    //可以在里面注册store，也可以在里面编写一些逻辑代码
    store(action);
})

dispatcher.dispatch(action);

{
    actionType:'add'
}






