import './task-list.css';
import Task from '../task';

const TaskList = ({ todos, onToggleTask, onDeleted }) => {
    
    const items = todos.map((item) => {
        const {status, description, id} = item;
        return (
            <li key={id} className={status}>
                <Task 
                    description={description}
                    onDeleted={() => onDeleted(id)} 
                    onToggleTask={() => onToggleTask(id)}/>
                <input 
                    type='text'
                    className='edit' 
                    defaultValue='Editing status' 
                />
            </li>
        )
    });

    return (
        <ul className='todo-list'>
            {items}
        </ul>
    )
    
}

export default TaskList;