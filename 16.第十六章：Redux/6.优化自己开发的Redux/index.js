/**
 * Created by Acer on 2017/2/5.
 */

const Store = require('./Store')

/*创建store实例*/
exports.createStore = function createStore(updaters, defaultState) {
    const sto = new Store(defaultState);
    sto.setUpdates(updaters);
    return sto;
}

/*加入中间件*/
/*logger, ajaxData*/
exports.useMiddleware = function useMiddleware(store,middles){ /*middles是一个数组*/
    middles.reverse();  //根据实际代码可以看出最外层

    middles.forEach(middle => {
        let next = store.dispatch;
        store.dispatch = middle(store)(next.bind(store));
    })
    return store;
}


//exports.createStore = ...   exports.useMiddleware = ...
//等价于
// module.exports = {createStore,useMiddleware}

