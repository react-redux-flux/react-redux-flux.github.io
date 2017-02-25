/**
 * Created by Acer on 2017/2/24.
 */
const Redux = require('redux');

const logger = store => nextDispatch => action => {
    console.log('start',action.type);
    let result = nextDispatch(action);
    console.log('end',action.type);
    return result;
}

const thunk = store => nextDispatch => action => {
    if(typeof action === 'function'){
        action(nextDispatch);
    }else{
        nextDispatch(action);
    }
}

const createStore = Redux.applyMiddleware(thunk,logger)(Redux.createStore);

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

store.dispatch(thunkAction('zl'));
console.log('first');



