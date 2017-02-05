/**
 * Created by Acer on 2017/2/5.
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
module.exports = Store;