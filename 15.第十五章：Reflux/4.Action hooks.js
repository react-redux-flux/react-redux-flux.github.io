/**
 * Created by Acer on 2017/1/31.
 */
const Reflux = require('reflux');
const action = Reflux.createAction({
    preEmit(data){
        return 'leo'
    }
});

action.listen(data => console.log(data));
action('action hooks')


