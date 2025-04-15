import './App.css';
import NewTaskForm from '../new-task-form';
import TaskList from '../task-list';
import Footer from '../footer';
import React, {Component} from 'react';

export default class App extends Component {
  state = {
    todoData: [
      {
        status: 'active', 
        description: 'Active task',
        id: 1
      },
      {
        status: 'active', 
        description: 'Active task',
        id: 2
      },
      {
        status: 'completed', 
        description: 'Completed task',
        id: 3
      }
    ]
  };

  onToggleTask = (id) => {

    const toggle = () => {
      const [ toggledItem ] = this.state.todoData.filter((item) => item.id === id);
      console.log(toggledItem);
      if (toggledItem.status === 'active') {
        toggledItem.status = 'completed';
        toggledItem.description = 'Completed task';
      } else {
        toggledItem.status = 'active';
        toggledItem.description = 'Active task';
      }

      return toggledItem;
    }
    const toggledItem = toggle();
    console.log(toggledItem);

    this.setState(({ todoData }) => {
      const idx = todoData.findIndex(item => item.id === id);

      const newData = [
        ...todoData.slice(0, idx),
        toggledItem,
        ...todoData.slice(idx + 1)
      ];

      return {
        todoData: newData
      }
    });
  };

  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex(item => item.id === id);      

      return {
        todoData: todoData.toSpliced(idx, 1)
      };
    });
  };

  render() {
    return (
      <section className='todoapp'>
        <header className="header">
          <h1>todos</h1>
        </header>
        <section className="main">
          <NewTaskForm />
          <TaskList 
            todos={this.state.todoData}
            onDeleted={this.deleteItem} 
            onToggleTask={this.onToggleTask}/>
          <Footer />
      </section>    
      </section>
    );
  }
}
