import './task-list.css';
import Task from '../task';
import TaskEdit from './task-edit';

const TaskList = ({ todos, onToggleTask, onDeleted, onEditTask, onChangeTask }) => {
    
    const items = todos.map((item) => {
        const {status, description, id} = item;
        return (
            <li key={id} className={status}>
                <Task 
                    description={description}
                    onDeleted={() => onDeleted(id)} 
                    onToggleTask={() => onToggleTask(id)}
                    onEdit={() => onEditTask(id)}/>
                <TaskEdit 
                    onSubmit={onChangeTask} />
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