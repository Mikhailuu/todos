import './task-edit.css';
import React, { Component } from 'react';

export default class TaskEdit extends Component {
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
        this.props.onSubmit(this.state.label);

        this.setState({
            label: ''
        })
    }

    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <input 
                    type='text'
                    className='edit' 
                    defaultValue='Editing status'  
                    onChange={this.onLabelChange}
                    value={this.state.label}                   
                />
            </form>
        )
    }
}