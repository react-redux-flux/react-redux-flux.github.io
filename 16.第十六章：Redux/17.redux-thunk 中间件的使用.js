const redux = require('redux');
const thunk = require('redux-thunk').default;

function reducer(state={name:'1'},action) {
    switch(action.type){
        case "CHANGENAME":
            return {name:action.name};
        default:
            return state;
    }
}

const store = redux.createStore(reducer,redux.applyMiddleware(thunk));   /*thunk.withExtraArgument({default:'js'}) */

function action(name) {
    return {
        type:'CHANGENAME',
        name
    }
}

let asyncAction = function (name) {
    // let action = {
    //     type:'CHANGENAME',
    //     name
    // }
    // return (dispatch,getState,api) => {  //getState获取上一次状态，用于判断
    //     // if(getState().name === '1') return;  /*如果上一个name的值等于1结束函数*/
    //     console.log(api)
    //     setTimeout(() => {
    //         dispatch(action);
    //     },1000)
    // }

    return dispatch => {
        return new Promise((resolve,reject) => {
            setTimeout(() => {
                dispatch(action('action1'));
                resolve();
            },1000);
        }).then(function (parans) {
            return new Promise(resolve => {
                setTimeout(function (params) {
                    dispatch(action('action2'));
                    resolve();
                },3000)
            })

        }).then(function (parans) {
            dispatch(action('action3'))
        })
    }
}

store.dispatch(asyncAction('zl'));

store.subscribe(() => {
    console.log(store.getState())
})