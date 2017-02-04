/**
 * Created by Acer on 2017/2/1.
 */
const Reflux = require('reflux');
const actions = Reflux.createActions({
    'action1':{
        asyncResult:true
    },
    'action2':{
        asyncResult:true
    }
})

const store = Reflux.createStore({
    listenables:actions,

    onAction1(){
        console.log(11111)
    },
    onAction1Completed(){
        console.log('action1 completed')
    },
    action2(){
        console.log(222222222)
    }
})

actions.action1();
actions.action2();
actions.action1.completed();


