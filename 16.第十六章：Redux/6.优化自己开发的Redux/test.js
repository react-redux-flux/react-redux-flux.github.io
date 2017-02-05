/**
 * Created by Acer on 2017/2/5.
 */
const {createStore,useMiddleware} = require('./index');

const logger = store => next => action =>{
    console.log('Action begin',action.type)
    next.call(store,action);
    console.log('Action end',action.type)
}
// const logger = store => next => action =>{}
// /*等价于*/
// const logger = function(store){
//     return function(next){
//         return function(action){
//
//         }
//     }
// }

const store = createStore(function(state,action){
    if(action.type === 'changeName'){
        return {
            name:action.name
        }
    }else{
        return state
    }
},{name:'leo'});

useMiddleware(store,[logger]);

store.listen(() => {
    console.log(store.state);
});

store.dispatch({
    type:'changeName',
    name:'zeng liang'
})



