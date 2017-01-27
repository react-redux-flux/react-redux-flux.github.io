/**
 * Created by Acer on 2017/1/27.
 */
const EventEmitter = require('events').EventEmitter;

class Store extends EventEmitter{
    constructor(){
        super();
        this._list = [];
    }

     _add(item){
        this._list.push(item);
        this.emit('change',this._list);  //触发change事件
     }

    list(){
        return this._list
    }
}

module.exports = Store;
