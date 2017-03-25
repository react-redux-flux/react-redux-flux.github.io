/**
 * Created by Acer on 2017/3/5.
 */
const React = require('react');
const ReactDOM = require('react-dom');
const Redux = require('redux');
const {connect,Provider} = require('react-redux');

function reducer(state={name:'',num:0},action) {
    console.log(state.num)
    switch (action.type){
        case 'CHANGENAME':
            return Object.assign({},state,action.payload);
        case 'ACCESS':
            return Object.assign({},state,{num: ++state.num});
        default:
            return state;
    }
}

const store = Redux.createStore(reducer);

let actions = {
    changeName(name){
        return{
            type:'CHANGENAME',
            payload:{name}
        }
    },
     access(){
        return{
            type:'ACCESS'
        }
     }
}

actions = Redux.bindActionCreators(actions,store.dispatch);

let UI = React.createClass({
    render(){
        return(
            <div>
                <p>{this.props.name}</p>
                <p>{this.props.num}</p>
                <input type="text" onChange={e => this.props.changeName(e.target.value)} />
                <button onClick={this.props.access}>access</button>
            </div>
        )
    }
})

function  getState(state) {
    return state;
}

function getActions() {
    return actions;
}

UI = connect(getState,getActions)(UI);
ReactDOM.render(<Provider store={store}><UI /></Provider>,document.body)

// UI = connect(getState,getActions)(<Provider store={store}><UI/></Provider>)
//
// ReactDOM.render(<UI />,document.body);



// function render() {
//     let state = store.getState();
//     ReactDOM.render(<UI changeName={actions.changeName} access={actions.access} name={state.name} num={state.num} />,document.body)
// }
//
// render();
// store.subscribe(render);
