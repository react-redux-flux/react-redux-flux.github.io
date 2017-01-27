/**
 * Created by Acer on 2017/1/27.
 */
const React = require('react');
const Store = require('./Store');

const store = new Store();

//top level component , container and controller-view
//angular controller
class List extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            list:[]
        };
    }
    add(){
        store._add(this.refs.nameInput.value)
    }
    componentDidMount(){
        store.on('change',list => {
            // this.setState(list)
            this.forceUpdate();
        })
    }
    render(){
        return(
            <ul>
                {console.log(this.state.list,'render')}
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