/**
 * Created by Acer on 2017/2/4.
 */
const EventEmitter = require('events').EventEmitter;
/*nodeJs中的EventEmitter发布*/

class Store {
    constructor(state) {
        this._state = state || {};
        this._updates = {};
        this._emitter = new EventEmitter;
    }

    get state() {
        return JSON.parse(JSON.stringify(this._state));
    }

    /*fns - function or object*/
    setUpdates(fns) {
        this._updates = fns;
    }

    /*action*/
    dispatch(action) {
        if (typeof this._updates === 'function') {
            this._state = this._updates(this.state, action);
            /*return new state*/
        } else {
            let newState = {};
            const keys = Object.keys(this._updates);
            keys.forEach(key => {
                let updater = this._updates[key];
                let value = this.state[key];
                let newSubState = updater(value, action);
                newState[key] = newSubState;
            })
            this._state = Object.assign({}, this.state, newState);
        }
        this._emitter.emit('change');
    }

    /*add listener*/
    listen(listener) {
        this._emitter.on('change', listener);
    }
}

function createStore(updaters, defaultState) {
    const sto = new Store(defaultState);
    sto.setUpdates(updaters);
    return sto;
}
const sto = createStore({
    name: nameUpdater,
    num: numUpdater
},{name: 'leo', num: 5})

function numUpdater(oldNum, action) {
    switch (action.type) {
        case '+':
            return ++oldNum;
        case '-':
            return --oldNum;
        default:
            return oldNum;
    }
}

function nameUpdater(oldName, action) {
    if (action.type === 'changeName') {
        return action.name;
    } else {
        return oldName;
    }
}

sto.listen(() => {
    console.log(sto.state)
})

// const action = {
//     type: '+'
// }

// function createChangeAction(name){
//     return {
//         type:'changeName',
//         name
//     }
// }

// let action1 = createChangeAction('zl');

// /*打印日志*/
// console.log('Action begin',action1.type)
// sto.dispatch(action1)
// console.log('Action end',action1.type)
//
// /*异步获取数据*/
// function ajaxDate(callback){
//     setTimeout(() => {
//         callback({name:'hello world'})
//     },2000)
// }
// ajaxDate(data => {
//     sto.dispatch(createChangeAction(data.name))
// })


/*日志中间件*/
function logger(store){
    let next = store.dispatch;

    store.dispatch = function(action){
        console.log('Action begin',action.type)
        next.call(store,action);
        console.log('Action end',action.type)
    }
    return store;
}

/*异步获取数据*/
function ajaxData(store){
    let next = store.dispatch;
    store.dispatch = function(action){
        if(action.url){
            setTimeout(() => {
                action.name = 'ajax OK!!!';
                next.call(store,action)
            },2000)
        }else {
            next.call(store,action)
        }
    }
    return store;
}

/*logger, ajaxData*/
function useMiddleware(store,middles){ /*middles是一个数组*/
    middles.reverse();  //根据实际代码可以看出最外层

    middles.forEach(middle => {
        middle(store);
    })
    return store;
}

useMiddleware(sto,[logger,ajaxData]);

sto.dispatch({
    type:'changeName',
    url:'////'
})

