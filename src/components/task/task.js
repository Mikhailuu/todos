import './task.css';
import Timer from './data/data';

const Task = ({description, onToggleTask, onDeleted, onEdit}) =>  {
    return (                    
        <div className='view'>
            <input className='toggle' type='checkbox' onClick={onToggleTask}></input>
            <label>
                <span className='description'>{description}</span>
                <Timer date={new Date()}/>
            </label>
            <button className='icon icon-edit' onClick={onEdit}></button>
            <button className='icon icon-destroy' onClick={onDeleted}></button>
        </div>     
    )
}

export default Task;