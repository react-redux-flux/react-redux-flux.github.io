/**
 * Created by Acer on 2017/1/31.
 */
const Reflux = require('reflux');
const action = Reflux.createAction();

action.listen(data => console.log('listener1 , data is', data));
action.listen(data => console.log('listener2 , data is', data));

action.trigger('leo')




