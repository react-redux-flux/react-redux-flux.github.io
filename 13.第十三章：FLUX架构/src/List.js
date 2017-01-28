/**
 * Created by Acer on 2017/1/27.
 */
const React = require('react');
const Store = require('./Store');
const Actions = require('./Actions');
const actions = new Actions();
const store = new Store()
// const store = new Store(actions);
// const actions = new Actions(store);

//top level component , container and controller-view
//angular controller
class List extends React.Component{
    constructor(props){
        console.log(props,'Iam props')
        super(props);
        this.state = {
            list:[]
        };
    }
    add(){
        // store._add(this.refs.nameInput.value); //伪代码
        actions.add(this.refs.nameInput.value)
        console.log(actions, 'List + actions')
    }
    componentDidMount(){

        actions.getAll()

        store.on('change',list => {
            this.setState({list})
        })
    }
    render(){
        return(
            <ul>
                {this.state.list.map(item => <li>{item}</li>)}
                <li>
                    <input type="text" defaultValue="" ref="nameInput" />
                    <button onClick={this.add.bind(this)} >add</button>
                </li>
            </ul>
        )
    }
}

module.exports = List;