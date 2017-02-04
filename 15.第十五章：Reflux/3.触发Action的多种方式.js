/**
 * Created by Acer on 2017/1/31.
 */
const Reflux = require('reflux');
const action = Reflux.createAction({
    click(){
        this.trigger('自定义调用')
    }
});

action.listen(data => console.log('listen 1',data));
action.listen(data => console.log('listen 2',data));

action.trigger('leo');
setTimeout(function(){
    action.trigger('sb')
})
action.triggerAsync('async')

action.click()
console.log('-----------end-----------')
