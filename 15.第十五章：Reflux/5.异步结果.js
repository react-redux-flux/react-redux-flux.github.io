/**
 * Created by Acer on 2017/1/31.
 */
const Reflux = require('reflux');
const action = Reflux.createAction({asyncResult:true,children:['clickme']})

action.completed.listen(function(){
    console.log('completed');
})

action.failed.listen(function(){
    console.log('failed')
})

action.clickme.listen(function(){
    console.log('clickme')
})

action.listen(function(data){
    console.log('listen');
    setTimeout(function(){
        this.completed();
        this.failed();
        this.clickme();
    }.bind(this))
});
action.trigger();

