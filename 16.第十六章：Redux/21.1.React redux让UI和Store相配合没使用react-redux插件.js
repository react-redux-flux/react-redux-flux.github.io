/**
 * Created by Acer on 2017/3/5.
 */

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

const UI = React.createClass({     /*步骤1.创建react组件，想好需要什么数据*/
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

function render() {  /*步骤1.1编写render函数，渲染UI组件，数据（实参）等写完redux的action之后在写*/
    let state = store.getState();
    ReactDOM.render(<UI changeName={actions.changeName} access={actions.access} name={state.name} num={state.num} />,document.body)
}

render();
store.subscribe(render);
