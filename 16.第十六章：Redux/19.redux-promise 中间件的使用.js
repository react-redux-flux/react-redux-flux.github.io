const redux = require('redux');
const promise = require('redux-promise');

function reducer(state={name:'1'},action) {
    switch(action.type){
        case "CHANGENAME":
            return {name:action.payload.name};
        default:
            return state;
    }
}

const store = redux.createStore(reducer,redux.applyMiddleware(promise));

function action(name) {
    return {
        type:'CHANGENAME',
        payload:{name}
    }
}

let asyncAction = function (name) {
    return new Promise((resolve,reject) => {
        setTimeout(() => {
            resolve(action(name));  /*redux-promise  中间件只能对Promise对象进行解析，他把一个Action认为是一个Promise*/
        },1000);
    })
}



store.dispatch(asyncAction('zl'));

store.subscribe(() => {
    console.log(store.getState())
})