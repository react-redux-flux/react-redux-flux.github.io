/*
 * 步骤：
 * 1.创建react组件
 * 2.创建redux
 *   a.创建store  store = Redux.createStore(reducer);
 *   b.创建reducer  function reducer(state,action){};
 *   c.创建actions
 *   d.合并多个actions Redux.bindActionCreators(action,store.display);
 * 3.react与redux融合
 *   a.给render函数里的UI组件添加数据（实参）
 *       通过获取store的状态来获取num和access的值
 *   b.监听store  store.subscribe()
 * */

const React = require('react');
const ReactDOM = require('react-dom');
const Redux = require('redux');

function reducer(state={num:0,name:''},action) {
    switch (action.type){
        case 'CHANGENAME':
            return Object.assign({},state,action.payload);
        case 'ACCESS':
            return Object.assign({},state,{num:++state.num});
        default:
            return state;
    }
}

const store = Redux.createStore(reducer);

const actions = {
    changeName(name){
        return{
            type:'CHANGENAME',
            name
        }
    },
    access(){
        return{
            type:'ACCESS'
        }
    }
}

const action = Redux.bindActionCreators(actions,store.dispatch);

const UI = React.createClass({
    render(){
        return(
            <div>
                <p>{this.props.name}</p>
                <p>{this.props.num}</p>
                <input type="text" onChange = {this.props.changeName = e => e.target.value} />
                <button onClick = {this.props.access()}> access </button>
            </div>
        )
    }
})

function render(){
    let state = store.getState();
    ReactDOM.render(
        <UI changeName={action.changeName} access={action.access} num={state.num} name={state.name} />,
        document.body
    )
}

render()

store.subscribe(render);