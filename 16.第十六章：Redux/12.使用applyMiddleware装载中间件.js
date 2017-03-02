const Redux = require('redux');
const applyMiddleware = Redux.applyMiddleware; /*中间件装载器，装载着各种中间件函数*/

const logger = store => nextDispatch => action => {
    console.log('start',action.type);
    let result = nextDispatch(action);
    console.log('end',action.type);
    return result;
}

const createStore = applyMiddleware(logger)(Redux.createStore);

function reducer(state={},action) {
    switch (action.type){
        case "CHANGENAME":
            return {name:action.name};
        default:
            return state;
    }
};

const store = createStore(reducer,{name:'leo'});
store.subscribe(() => console.log(store.getState()))
store.dispatch({type:'CHANGENAME',name:'zl'})




