/**
 * Created by Acer on 2017/2/1.
 */
const Reflux = require('reflux');
const actions = Reflux.createActions(['action1','action2'])

const store = Reflux.createStore({
    init(){
        this.listenTo(actions.action1,this.onAction1);
        this.listenTo(actions.action2,this.onAction1);
    },

    onAction1(){
        console.log(11111)
    }
})

actions.action1();
actions.action2();


