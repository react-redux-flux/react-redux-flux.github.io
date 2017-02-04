/**
 * Created by Acer on 2017/1/29.
 */
var Dispatcher = require('flux').Dispatcher;
var dispatcher = new Dispatcher();



var id1 = dispatcher.register(function(action){  //注册回调函数
    console.log('callback 1')
})
var id2 = dispatcher.register(function(action){
    dispatcher.waitFor([id1,id3]);  //waitFor排序，等待id1，id3执行完之后在执行id2
    console.log('callback 2')
})
var id3 = dispatcher.register(function(action){
    console.log('callback 3')
})

dispatcher.dispatch();  //调用注册的回调函数


// var store1,store2,store3;
// store1.id = dispatcher.register(function(action){  //注册回调函数
//     console.log('callback 1')
// })
// store2.id = dispatcher.register(function(action){
//     dispatcher.waitFor([store1.id,store3.id]);  //waitFor排序，等待id1，id3执行完之后在执行id2
//     console.log('callback 2')
// })
// store3.id = dispatcher.register(function(action){
//     console.log('callback 3')
// })
//
// dispatcher.dispatch();  //调用注册的回调函数






















