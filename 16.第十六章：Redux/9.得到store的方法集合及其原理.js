/**
 * Created by Acer on 2017/2/5.
 */
const Redux = require('redux');

const reducer = (state,action) => {
    switch(action.type){
        case 'changeName' :
            return Object.assign({},state,{name:action.name})
        default :
            return state
    }
}

const store = Redux.createStore(reducer,{name:'leo'}); /*新的状态，初始化state*/

var {subscribe,dispatch,getState} = store;

store.subscribe(() => {
    console.log(store.getState())
})

function callAction(){
    var promiseAction = new Promise((resolve,reject) => {
        setTimeout(() => {
            var action = {
                type:'TEST',
                data:{name:'leo'}
            }
            resolve(action)
        },2000)
    })
    promiseAction.then((action) => {
        store.dispatch(action);
    })
}
callAction()
// const action = {
//     type:'CHANGE_NAME',
//     name:'zengliang'
// }
//
// store.dispatch(action);

















