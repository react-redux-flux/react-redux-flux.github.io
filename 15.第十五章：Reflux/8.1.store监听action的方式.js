/**
 * Created by Acer on 2017/2/1.
 */
const Reflux = require('reflux');
const actions = Reflux.createActions(['action1','action2'])

const store = Reflux.createStore({
    listenables:actions,
    // init(){
    //     this.listenToMany(actions)  //store以这种方式监听多个action时，action的处理函数名默认为action名或者onAction名
    // },

    onAction1(){
        console.log(11111)
    },
    action2(){
        console.log(222222222)
    }
})

actions.action1();
actions.action2();


