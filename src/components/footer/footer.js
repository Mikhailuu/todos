import './footer.css';
import TodoCount from './todo-count';
import TaskFilter from './task-filter';
import ClearCompleted from './clear-completed';
import React, { Component } from 'react';

export default class Footer extends Component {

    render () {
        const count = this.props.count;
        const onFilterItems = this.props.onFilterItems;
        const onClearCompleted = this.props.onClearCompleted;

        return (
            <footer className='footer'>
                <TodoCount count={count}/>
                <TaskFilter onFiltered={onFilterItems}/>
                <ClearCompleted onClear={onClearCompleted}/>
            </footer>
        )
    }
}