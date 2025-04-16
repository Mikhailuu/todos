import './new-task-form.css';
import React, { Component } from 'react';

export default class NewTaskForm extends Component{
    constructor(props) {
        super(props);
        this.state = {
            label: ''
        }
    }

    onLabelChange = (e) => {
        this.setState ({
            label: e.target.value
        });
    };
    
    onSubmit = (e) => {
        e.preventDefault();
        this.props.onAddItem(this.state.label);

        this.setState({
            label: ''
        })
    }

    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <input 
                    type='text'
                    className="new-todo"
                    placeholder="What needs to be done?" 
                    autoFocus 
                    onChange={this.onLabelChange}
                    value={this.state.label}
                /> 
            </form>
        )
    }
}
