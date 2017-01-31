'use strict'

const Dispatcher = require('flux').Dispatcher;
const dispatcher = new Dispatcher;
const Store = require('flux/utils').Store;   //抽象的store，是个抽象类

class MyStore extends Store{
    constructor(dispatcher){
        super(dispatcher);
        this.data = '';
    }
    // 第二步
    __onDispatch(action){
        this.__changed = true;
        switch(action.type){
            case 'update':
                this.data += action.data;
                break;
        }
    }
}
// UI  第三步
let store = new MyStore(dispatcher);
store.addListener(function callback(args){
    console.log('args = ', args);
    console.log('data = ', store.data);
})
// UI -> CLICK -> ACTION 第一步
dispatcher.dispatch({
    type:'update',
    data:'leo'
})














