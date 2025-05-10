import "./App.css";
import NewTaskForm from "../new-task-form";
import TaskList from "../task-list";
import Footer from "../footer";
import React, { Component } from "react";

export default class App extends Component {
  MAX_ID = 100;
  EDIT_ID = 0;

  loadTasks = () => {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks)
      this.setState({
        todoData: JSON.parse(savedTasks),
      });
  };

  timerTask = () => {
    this.timer = setInterval(() => {
      this.setState((prevState) => ({
        todoData: prevState.todoData.map((task) =>
          task.isRunning && task.duration > 0 ? { ...task, duration: task.duration - 1 } : task,
        ),
      }));
    }, 1000);
  };

  componentDidMount() {
    this.loadTasks();
    this.timerTask();
  }

  componentDidUpdate() {
    localStorage.setItem("tasks", JSON.stringify(this.state.todoData));
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  state = {
    todoData: [
      {
        status: "active",
        description: "Active task",
        duration: 120,
        id: 1,
      },
      {
        status: "active",
        description: "Active task",
        duration: 240,
        id: 2,
      },
      {
        status: "active",
        description: "Active task",
        duration: 360,
        id: 3,
      },
    ],
    tab: "all",
    timer: null,
  };

  toggleTask = (id) => {
    const toggle = () => {
      const [toggledItem] = this.state.todoData.filter((item) => item.id === id);

      if (toggledItem.status === "active") {
        toggledItem.status = "completed";
      } else if (toggledItem.status === "completed") {
        toggledItem.status = "active";
      }

      return toggledItem;
    };
    const toggledItem = toggle();

    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((item) => item.id === id);

      const newData = [...todoData.slice(0, idx), toggledItem, ...todoData.slice(idx + 1)];

      return {
        todoData: newData,
      };
    });
  };

  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((item) => item.id === id);

      return {
        todoData: todoData.toSpliced(idx, 1),
      };
    });
  };

  addItem = (text, duration, isRunning) => {
    text = !text.trim() ? "Empty" : text.trim();

    const newItem = {
      status: "active",
      description: text,
      duration,
      isRunning,
      id: this.MAX_ID++,
    };
    this.setState(({ todoData }) => {
      const newTodo = [...todoData, newItem];
      return {
        todoData: newTodo,
      };
    });
  };

  countItems = ({ todoData }) => {
    return todoData.filter((item) => item.status === "active").length;
  };

  filterItems = (filter) => {
    let todos = this.state.todoData;
    switch (filter) {
      default:
        return todos;
      case "active":
        return todos.filter((item) => {
          console.log(item);
          return item.status === "active";
        });
      case "completed":
        return todos.filter((item) => item.status === "completed");
    }
  };

  handleFilterChange = (newFilter) => {
    this.setState({
      tab: newFilter,
    });
  };

  clearCompleted = () => {
    this.setState({
      todoData: this.state.todoData.filter((item) => item.status === "active"),
    });
  };

  handleEditTask = (id) => {
    this.EDIT_ID = id;
    const todoData = this.state.todoData;
    const [editingTask] = todoData.filter((item) => item.id === id);
    [editingTask.oldStatus, editingTask.status] = [editingTask.status, "editing"];

    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((item) => item.id === id);
      const newData = [...todoData.slice(0, idx), editingTask, ...todoData.slice(idx + 1)];

      return {
        todoData: newData,
      };
    });
  };

  onChangeTask = (text) => {
    text = !text.trim() ? "Empty" : text.trim();

    const todoData = this.state.todoData;
    const [editingTask] = todoData.filter((item) => item.id === this.EDIT_ID);
    editingTask.status = editingTask.oldStatus;
    editingTask.description = text;

    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((item) => item.id === this.EDIT_ID);
      const newData = [...todoData.slice(0, idx), editingTask, ...todoData.slice(idx + 1)];

      return {
        todoData: newData,
      };
    });
  };

  onTimerPlay = (id) => {
    const todoData = this.state.todoData;
    const [playTask] = todoData.filter((item) => item.id === id);
    playTask.isRunning = true;
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((item) => item.id === id);
      const newData = [...todoData.slice(0, idx), playTask, ...todoData.slice(idx + 1)];

      return {
        todoData: newData,
      };
    });
  };

  onTimerStop = (id) => {
    const todoData = this.state.todoData;
    const [playTask] = todoData.filter((item) => item.id === id);
    playTask.isRunning = false;
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((item) => item.id === id);
      const newData = [...todoData.slice(0, idx), playTask, ...todoData.slice(idx + 1)];

      return {
        todoData: newData,
      };
    });
  };

  render() {
    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
        </header>
        <section className="main">
          <NewTaskForm onAddItem={this.addItem} />
          <TaskList
            todos={this.filterItems(this.state.tab)}
            onDeleted={this.deleteItem}
            onToggleTask={this.toggleTask}
            onEditTask={this.handleEditTask}
            onChangeTask={this.onChangeTask}
            onTimerPlay={this.onTimerPlay}
            onTimerStop={this.onTimerStop}
          />
          <Footer
            count={this.countItems(this.state)}
            onFilterItems={this.handleFilterChange}
            onClearCompleted={this.clearCompleted}
          />
        </section>
      </section>
    );
  }
}
