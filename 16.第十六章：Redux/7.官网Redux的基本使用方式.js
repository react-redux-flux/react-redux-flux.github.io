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

const store = Redux.createStore(reducer,{name:'leo'}); /*新的状态，初始化状态*/

store.subscribe(() => {
    console.log(store.getState())
})

const action = {
    type:'CHANGE_NAME',
    name:'zengliang'
}

store.dispatch(action);










