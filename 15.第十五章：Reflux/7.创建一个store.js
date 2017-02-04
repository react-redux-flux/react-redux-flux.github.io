/**
 * Created by Acer on 2017/2/1.
 */

const Reflux = require('reflux');
const action = Reflux.createAction();
const store = Reflux.createStore({
    init(){
        this.data = {num:0};
        this.listenTo(action,this.onClick);
    },
    onClick(data){
        ++ this.data.num;
        this.trigger(this.data)
    }
});

store.listen(function(state){
    console.log(state)
})
action();








