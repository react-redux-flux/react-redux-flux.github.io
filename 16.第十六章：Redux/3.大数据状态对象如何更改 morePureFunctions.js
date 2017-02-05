/**
 * Created by Acer on 2017/2/4.
 */

'use strict';
let state = {
    aaa:{name:'leo'},
    bbb:{group:'javascript'},
    ccc:{age:24}
}

function update(updaters,state){

    let newState = {};

    const keys = Object.keys(updaters);
    keys.forEach(key => {
        let updater = updaters[key];
        let value = state[key];
        console.log(updater)
        // console.log( updater(value) )

        let newSubState = updater(value);
        newState[key] = newSubState;
    })
    let result = Object.assign({},newState)
    console.log(result)
    //
    // function aaaUpdater(subState){
    //     console.log(1111111)
    //     return {name:'lz'}
    // }
    // function bbbUpdater(substate){
    //     return {group:'node.js'}
    // }
}


function aaaUpdater(subState){
    return {name:'lz'}
}
function bbbUpdater(substate){
    return {group:'node.js'}
}

update({
    aaa:aaaUpdater,
    bbb:bbbUpdater
},state);







