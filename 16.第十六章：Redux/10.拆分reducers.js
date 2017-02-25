/**
 * Created by Acer on 2017/2/12.
 */

const Redux = require('redux');
const createStore = Redux.createStore;
// const combineReducers = Redux.combineReducers;
//不用redux里面的combineReducers自己写一个
function combineReducers(reducers){
    return function reducer(state,action){
        let newState = {}
        for(let key in reducers){
            newState[key] = reducers[key](state[key],action);
        }
        return newState
    }
}


// state -> {a:[], b:[], c:{name:'',group:[]}}   //规定(a,b)的state是个数组c的state是个对象
// action a -> {type,data(string)}   //规定action是个字符串
// const reducers = {a:function(state,action){}, b:function(state,action){}}

function aReducer(state=[],action){
    switch(action.type){
        case 'a':
            return state.concat(action.data);
        default:
            return state;
    }
}

function bReducer(state=[],action){
    switch(action.type){
        case 'b':
            return state.concat(action.data);
        default:
            return state;
    }
}

function cNameReducer(state='',action){
    if(action.type === 'c'){
        return action.name;
    }else{
        return state;
    }
}
function cGroupReducer(state=[],action){
    if(action.type === 'c'){
        return state.concat(action.item);
    }else{
        return state;
    }
}
// cAction:{type,name,item}  //规定caction的类型
function cReducer(state=[],action){
    switch(action.type){
        case 'c':
            return combineReducers({name:cNameReducer,group:cGroupReducer})(state,action)
            //一定要调用

            // {
            //     name:cNameReducer(undefined,action),
            //     group:cGroupReducer(undefined,action)
            // };
        default:
            return state;
    }
}

// const reducers = {aReducer,bReducer};
const reducers = {a:aReducer,b:bReducer,c:cReducer};

const reducer = combineReducers(reducers);
const store = createStore(reducer,{a:[111],b:[222],c:{name:'',group:[]}})

store.subscribe(function listener(){
    console.log(store.getState());
});

let actionA = {
    type:'a',
    data:'leo'
}
let actionB = {
    type:'b',
    data:'zl'
}
let actionC = {
    type:'c',
    name:'复杂状态',
    item:'111222'
}

// store.dispatch(actionA)
// store.dispatch(actionB)
store.dispatch(actionC);

