/**
 * Created by Acer on 2017/1/28.
 */

// const store = Symbol('store');
//
// class Actions {
//     constructor(_store){
//         this[store] = _store
//     }
//     add(name){
//         this[store]._add(name)
//     }
// }
// const EventEmitter = require('events').EventEmitter;

// class Actions extends EventEmitter{
//     constructor(){
//         super();
//     }
//     add(name){
//         var action = {
//             actionType : 'add',
//             name
//         };
//         this.emit('create',action)
//     }
// }

const Dispatcher = require('./Dispatcher');
const WebAPI = require('./WebAPI')
class Actions {
    add(name){
        var action = {
            actionType : 'add',
            name
        };
        Dispatcher.dispatch(action)
    }
    getAll(){
        WebAPI.getAll(function(data){
            var action = {
                actionType:'getAll',
                list:data
            }
            Dispatcher.dispatch(action)
        });
    }
}

module.exports = Actions;