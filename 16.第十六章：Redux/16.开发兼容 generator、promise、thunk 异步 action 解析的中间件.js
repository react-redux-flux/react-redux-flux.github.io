/**
 * Created by Acer on 2017/3/2.
 */
const Redux = require('redux');

const logger = store => nextDispatch => action => {
    console.log('start', action.type);
    let result = nextDispatch(action);
    console.log('end', action.type);
    return result;
}

/*方法一 thunk*/
const thunk = store => nextDispatch => action => {
    if (typeof action === 'function') {
        action(nextDispatch);
    } else {
        nextDispatch(action);
    }
}

/*方法二  promise */
const promise = store => nextDispatch => action => {
    if (action instanceof Promise) {
        action.then(function (action) {
            nextDispatch(action);
        })
    } else {
        nextDispatch(action);
    }
}

/*方法三  generator*/
const generator = store => nextDispatch => action => {
    if(typeof action === 'function' && action.constructor.name === 'GeneratorFunction'){ /*Generator函数构造器的name本身就是'GeneratorFunction*/
        let g = action();
        let v = g.next(); /*在这里  v表示 {done:false,value:new Promise()}*/
        function run(v){
            if(v.done){
                nextDispatch(v.value);
            }else{
                if(v.value && v.value instanceof Promise){
                    v.value.then(function(name){
                        run(g.next(name));
                    })
                }else{ /*yield右侧除了Promise还可能是其他内容，假设除了Promise可以形成异步的函数机制之外其他都是普通的，如果不是Promise就按照正常的走*/
                    nextDispatch(v.value);
                }
            }
        }
        run(v)
    }
}



const asyncMiddleware = store => nextDispatch => action => {
    if(typeof action === 'function'){
        if(action.constructor.name === 'GeneratorFunction'){  /*Generator函数构造器的name本身就是'GeneratorFunction*/
            let g = action();
            let v = g.next(); /*在这里  v表示 {done:false,value:new Promise()}*/
            function run(v){
                if(v.done){
                    nextDispatch(v.value);
                }else{
                    if(v.value && v.value instanceof Promise){
                        v.value.then(function(name){
                            run(g.next(name));
                        })
                    }else{ /*yield右侧除了Promise还可能是其他内容，假设除了Promise可以形成异步的函数机制之外其他都是普通的，如果不是Promise就按照正常的走*/
                        nextDispatch(v.value);
                    }
                }
            }
            run(v)
        }
        action(nextDispatch);
    }else if(action instanceof Promise){
        action.then(function (action) {
            nextDispatch(action);
        })
    }else {
        nextDispatch(action);
    }
}


// const createStore = Redux.applyMiddleware(thunk,logger)(Redux.createStore);
// const createStore = Redux.applyMiddleware(promise, logger)(Redux.createStore);
// const createStore = Redux.applyMiddleware(generator, logger)(Redux.createStore);
const createStore = Redux.applyMiddleware(asyncMiddleware, logger)(Redux.createStore);

function thunkAction(name) {  /*所谓的异步就是调用dispatch之前的时间差*/
    return dispatch => {
        setTimeout(function () {
            dispatch({
                type: 'CHANGENAME',
                name
            })
        }, 3000)
    }
}

function promiseAction(name) {
    return new Promise((resolve, reject) => {
        setTimeout(function (params) {
            resolve({
                type: 'CHANGENAME',
                name
            })
        }, 3000)
    })
}

/*generator  action*/
function gAction(){
    return function *generatorAction() {
        let name = yield new Promise(function(resolve,reject){
            setTimeout(function(){
                resolve('leo');
            },1000)
        });
        return{
            name,
            type:'CHANGENAME'
        }
    }
}


function reducer(state = {name: ''}, action) {
    switch (action.type) {
        case 'CHANGENAME':
            return {name: action.name}
        default:
            return state;
    }
}

const store = createStore(reducer, {name: ''});

store.subscribe(() => {
    console.log('result => ', store.getState());
})

// store.dispatch(thunkAction('zl'));
// store.dispatch(promiseAction('zl'));
// store.dispatch(generator)
// store.dispatch(asyncMiddleware())

console.log('first');




