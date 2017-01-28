/**
 * Created by Acer on 2017/1/27.
 */
const List = require('./List');
const React = require('react');
const ReactDOM = require('react-dom');
const Dispatcher = require('./Dispatcher')

Dispatcher.use(function log(action,next){
    setTimeout(function(){
        console.log('log',action.actionType);
        next();
    },1)
}).use(function bzd (action,next){
    setTimeout(function(){
        console.log('bzd',action.actionType);
        next();
    },1)
})

ReactDOM.render(
    <List/>,
    document.body
)