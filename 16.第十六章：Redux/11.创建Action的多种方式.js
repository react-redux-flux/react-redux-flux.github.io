/**
 * Created by Acer on 2017/2/24.
 */
/*第一步创建一个store*/
/*第二步创建一个Action*/

const Redux = require('redux');
/*创建store 方法一*/
const store = Redux.createStore(function(state={},action){
    switch (action.type){
        case 'CHANGENAME':
            return Object.assign({},state,{name:action.name})
        default :
            return {}
    }
})

// /*创建store 方法二  忘记怎么写了*/
// const createStore = Redux.createStore;
// const store = createStore(reducer,action);
// reducer


/*创建Action 方法一*/
// const action = {
//     type:'CHANGENAME',
//     name:'leo'
// }
// const action1 = {
//     type:'CHANGENAME',
//     name:'zl'
// }
// store.dispatch(action);
// store.dispatch(action1);


/*创建Action  方法二*/
// function createAction(name){
//     return{
//         name,
//         type:"CHANGENAME"
//     }
// }
// store.dispatch(createAction(leo));
// store.dispatch(createAction(zl));


/*创建Action  方法三*/
// function createAction(action,dispatch){
//     return function (opt) {
//         action = Object.assign({},action,opt,{type:action.type})
//         dispatch(action);
//     }
// }
// var action = createAction({type:'CHANGENAME',name:'leo'},store.dispatch);
// action();
// action({name:'zl'})


/*创建Action  方法四*/
function createActions(actions,dispatch){
    function createAction(action,dispatch){
        return function(opt){
            action = Object.assign({},action,opt,{type:action.type});
            dispatch(action);
        }
    }
    if(typeof actions === 'function'){
        return createAction(actions,dispatch);
    }else{
        let result = {};
        for(var k in actions){
            result[k] = createAction(actions[k],dispatch)
            return result;
        }
    }
}
let a = {type:'a'};
let b = {type:'b'};
let c = {type:'c'};
let actions = createActions({a,b,c},store.dispatch);
actions.a(11);


/*创建Action  方法五利用redux提供的方法*/
// function a(name) {
//     return{
//         type:'a',
//         name
//     }
// }
// function b(name){
//     return{
//         type:'b',
//         name
//     }
// }
// let actions = Redux.bindActionCreators({a,b},store.dispatch);
// actions.a('leo');



