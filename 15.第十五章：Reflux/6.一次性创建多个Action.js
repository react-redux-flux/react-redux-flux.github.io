/**
 * Created by Acer on 2017/2/1.
 */
const Reflux = require('reflux');
// const actions = Reflux.createActions(['action1','action2']); //方法1
const actions = Reflux.createActions({
    action1:{},
    action2:{asyncResult:true}
})

actions.action1.listen(data => console.log('action1'))
actions.action2.listen(data => console.log('action2'))

actions.action1();
actions.action2.trigger()
