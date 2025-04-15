import './task.css';

const Task = ({description, onToggleTask, onDeleted}) =>  {
    return (                    
        <div className='view'>
            <input className='toggle' type='checkbox' onClick={onToggleTask}></input>
            <label>
                <span className='description'>{description}</span>
            </label>
            <button className='icon icon-edit'></button>
            <button className='icon icon-destroy' onClick={onDeleted}></button>
        </div>     
    )
}

export default Task;