import './todo-count.css';

const TodoCount = ({ count }) => {
    return (
        <span className='todo-count'>{`${count} items left`}</span>
    )
}

export default TodoCount;