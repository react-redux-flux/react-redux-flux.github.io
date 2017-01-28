/**
 * Created by Acer on 2017/1/27.
 */
const EventEmitter = require('events').EventEmitter;
const Dispatcher = require('./Dispatcher')

// store主要任务更改数据

class Store extends EventEmitter{
    constructor(dispatcher){
        // console.log(actions,'Iam actions')
        // actions.on('create',action => {
        //     switch(action.actionType){
        //         case 'add':
        //             this._add(action.name);
        //             break;
        //     }
        // });
        //
        // super();
        // this._list = [];

        super();
        this._list = [];
        Dispatcher.register(action => {
            switch(action.actionType){
                case 'add':
                    this._add(action.name);
                    break;
                case 'getAll':
                    this._list = action.list;
                    this.emit('change',this.list);
                    break;
            }
        })

    }

     _add(item){
        this._list.push(item);
        this.emit('change',this._list);  //触发change事件
     }

    // get list(){    //视频里面是有这些的，但是注释之后也没任何影响，不知道是干嘛用的
    //     return this._list
    // }
}

module.exports = Store;
