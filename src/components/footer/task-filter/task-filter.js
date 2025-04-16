import './task-filter.css';
import React, { Component } from 'react';

export default class TaskFilter extends Component {
    constructor(props) {
        super (props);
        this.filterChange = this.filterChange.bind(this);
    }

    filterChange(e) {
        this.props.onFiltered(e.target.name);
    }

    render() {
        return (
            <ul className='filters'>
                <li className='selected'>
                    <button name='all' onClick={this.filterChange}>All</button>
                </li>
                <li><button name='active' onClick={this.filterChange}>Active</button></li>
                <li><button name='completed' onClick={this.filterChange}>Completed</button></li>
            </ul>
        )
    }
}
