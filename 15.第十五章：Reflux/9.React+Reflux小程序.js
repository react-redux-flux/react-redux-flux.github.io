/**
 * Created by Acer on 2017/2/1.
 */
import {createAction, createStore} from 'reflux';
import React from 'react';
import ReactDOM from 'react-dom';

const action = createAction();
const store = createStore({
    init(){
        this.num = 0;
        this.listenTo(action,this.onClick);
    },
    onClick(){
        this.trigger(++this.num);
    }
})

var UI = React.createClass({
    getInitialState: function () {
        return { num:0 }
    },
    // onStatusChange: function (num) {
    //     this.setState({
    //         num
    //     })
    // },
    componentDidMount: function () {
        this.unsubscribe = store.listen(num => this.setState({num}))
    },
    componentWillUnmount: function () {
        this.unsubscribe();
    },
    render: function () {
        return(
            <div>
                {this.state.num}
                <button onClick={action}> + </button>
            </div>
        )
    }
});
ReactDOM.render(
    <UI />,
    document.body
)

