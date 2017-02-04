/**
 * Created by Acer on 2017/1/31.
 */
const React = require('react');
const ReactDOM = require('react-dom');
const Dispatcher = require('flux').Dispatcher;
const dispatcher = new Dispatcher;
const Store = require('flux/utils').Store;

console.log('aaa')

class ListStore extends Store{
    constructor(props){
        super(props);
        this.state = [];
    }
    __onDispatch(action){
        this.__changed = true;
        switch(action.type){
            case 'add':
                this.state.push(action.item);
                break;
        }
    }
}
let store = new ListStore(dispatcher);

class ContainerUI extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            list:[]
        };
    }

    componentDidMount(){
        this.remove = store.addListener(() => this.setState({list:store.state}))
    }

    componentWillUnmount(){
        this.remove();
    }

    click(){
        let value = this.refs.input.value;
        let addValue = {
            type:'add',
            item:value
        }
        dispatcher.dispatch(addValue)
    }

    render(){
        let list = this.state.list.map(item => <li>{item}</li>)
        return(
            <ul>
                <li>
                    <input type="text" ref="input" />
                    <button onClick={this.click.bind(this)}> ADD </button>
                </li>
                {list}
            </ul>
        )
    }
}

ReactDOM.render(
    <ContainerUI/>,
    document.body
)