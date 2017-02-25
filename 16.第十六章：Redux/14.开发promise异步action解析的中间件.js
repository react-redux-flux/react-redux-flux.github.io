/**
 * Created by Acer on 2017/2/25.
 */
const Redux = require('redux');

const logger = store => nextDispatch => action => {
    console.log('start',action.type);
    let result = nextDispatch(action);
    console.log('end',action.type);
    return result;
}

/*方法一 thunk*/
const thunk = store => nextDispatch => action => {
    if(typeof action === 'function'){
        action(nextDispatch);
    }else{
        nextDispatch(action);
    }
}

/*方法二  promise */
const promise = store => nextDispatch => action => {
    if(action instanceof Promise){
        action.then(function(action){
            nextDispatch(action);
        })
    }else{
        nextDispatch(action);
    }
}


// const createStore = Redux.applyMiddleware(thunk,logger)(Redux.createStore);
const createStore = Redux.applyMiddleware(promise,logger)(Redux.createStore);

function thunkAction(name) {  /*所谓的异步就是调用dispatch之前的时间差*/
    return dispatch => {
        setTimeout(function () {
            dispatch({
                type:'CHANGENAME',
                name
            })
        },3000)
    }
}

function promiseAction(name){
    return new Promise((resolve,reject) => {
        setTimeout(function (params) {
            resolve({
                type:'CHANGENAME',
                name
            })
        },3000)
    })
}

function reducer(state={name:''},action) {
    switch(action.type){
        case 'CHANGENAME':
            return {name:action.name}
        default:
            return state;
    }
}

const store = createStore(reducer,{name:''});

store.subscribe(() => {
    console.log('result => ',store.getState());
})

// store.dispatch(thunkAction('zl'));
store.dispatch(promiseAction('zl'));

console.log('first');




