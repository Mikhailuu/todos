import './footer.css';
import TodoCount from './todo-count';
import TaskFilter from './task-filter';
import ClearCompiled from './clear-compiled';

const Footer = () => {
    return (
        <footer className='footer'>
            <TodoCount />
            <TaskFilter />
            <ClearCompiled />
        </footer>
    )
}

export default Footer;