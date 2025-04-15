import './task-filter.css';

const TaskFilter = () => {
    return (
        <ul className='filters'>
            <li className='selected'>
                <button>All</button>
            </li>
            <li><button>Active</button></li>
            <li><button>Completed</button></li>
        </ul>
    )
}

export default TaskFilter;