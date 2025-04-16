import './clear-completed.css';

const ClearCompleted = ({ onClear }) => {
    return (
        <button className='clear-completed' onClick={onClear}>Clear completed</button>
    )
}

export default ClearCompleted;