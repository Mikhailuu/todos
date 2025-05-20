import "./App.css";
import NewTaskForm from "../new-task-form";
import TaskList from "../task-list";
import Footer from "../footer";
import React, { useState, useEffect, useRef } from "react";

const App = () => {
  const MAX_ID = useRef(100);
  const EDIT_ID = useRef(0);
  const timer = useRef(null);

  const [state, setState] = useState(() => {
    try {
      const savedTasks = localStorage.getItem("tasks");
      if (savedTasks) {
        const parsedTasks = JSON.parse(savedTasks);
        if (parsedTasks.length > 0) {
          MAX_ID.current = Math.max(...parsedTasks.map((task) => task.id)) + 1;
        }

        return {
          todoData: parsedTasks,
          tab: "all",
        };
      }

      return {
        todoData: [
          {
            status: "active",
            description: "Active task",
            duration: 120,
            createdAt: new Date(),
            id: 1,
          },
          {
            status: "active",
            description: "Active task",
            duration: 240,
            createdAt: new Date(),
            id: 2,
          },
          {
            status: "active",
            description: "Active task",
            duration: 360,
            createdAt: new Date(),
            id: 3,
          },
        ],
        tab: "all",
      };
    } catch (e) {
      console.error("Ошибка парсинга сохранённых задач", e);
    }
  });
  const [editingId, setEditingId] = useState(null);

  const timerTask = () => {
    timer.current = setInterval(() => {
      setState((prevState) => ({
        ...prevState,
        todoData: prevState.todoData.map((task) =>
          task.isRunning && task.duration > 0 ? { ...task, duration: task.duration - 1 } : task,
        ),
      }));
    }, 1000);
  };

  useEffect(() => {
    timerTask();

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(state.todoData));
  }, [state.todoData]);

  const toggleTask = (id) => {
    setState((prevState) => {
      const newData = prevState.todoData.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            status: item.status === "active" ? "completed" : "active",
          };
        }

        return item;
      });

      return { ...prevState, todoData: newData };
    });
  };

  const deleteItem = (id) => {
    setState((prevState) => ({
      ...prevState,
      todoData: prevState.todoData.filter((item) => item.id !== id),
    }));
  };

  const addItem = (text, duration, isRunning) => {
    text = !text.trim() ? "Empty" : text.trim();

    const newItem = {
      status: "active",
      description: text,
      duration,
      isRunning,
      id: MAX_ID.current++,
      createdAt: new Date(),
    };

    setState((prevState) => ({
      ...prevState,
      todoData: [...prevState.todoData, newItem],
    }));
  };

  const countItems = () => {
    return state.todoData.filter((item) => item.status === "active").length;
  };

  const filterItems = (filter) => {
    switch (filter) {
      default:
        return state.todoData;
      case "active":
        return state.todoData.filter((item) => item.status === "active");
      case "completed":
        return state.todoData.filter((item) => item.status === "completed");
    }
  };

  const handleFilterChange = (newFilter) => {
    setState((prevState) => ({ ...prevState, tab: newFilter }));
  };

  const clearCompleted = () => {
    setState((prevState) => ({
      ...prevState,
      todoData: prevState.todoData.filter((item) => item.status === "active"),
    }));
  };

  const handleEditTask = (id) => {
    if (editingId !== null && editingId !== id) return;

    setEditingId(id);
    EDIT_ID.current = id;

    setState((prevState) => {
      const newData = prevState.todoData.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            oldStatus: item.status,
            status: "editing",
          };
        }
        return item;
      });

      return { ...prevState, todoData: newData };
    });
  };

  const onChangeTask = (text) => {
    text = !text.trim() ? "Empty" : text.trim();

    setState((prevState) => {
      const newData = prevState.todoData.map((item) => {
        if (item.id === EDIT_ID.current) {
          return {
            ...item,
            status: item.oldStatus,
            description: text,
          };
        }

        return item;
      });

      return { ...prevState, todoData: newData };
    });

    setEditingId(null);
  };

  const onTimerPlay = (id) => {
    setState((prevState) => {
      const newData = prevState.todoData.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            isRunning: true,
          };
        }

        return item;
      });

      return { ...prevState, todoData: newData };
    });
  };

  const onTimerStop = (id) => {
    setState((prevState) => {
      const newData = prevState.todoData.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            isRunning: false,
          };
        }

        return item;
      });

      return { ...prevState, todoData: newData };
    });
  };

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
      </header>
      <section className="main">
        <NewTaskForm onAddItem={addItem} />
        <TaskList
          todos={filterItems(state.tab)}
          onDeleted={deleteItem}
          onToggleTask={toggleTask}
          onEditTask={handleEditTask}
          onChangeTask={onChangeTask}
          onTimerPlay={onTimerPlay}
          onTimerStop={onTimerStop}
          isEditingAnyTask={editingId !== null}
          editingId={editingId}
        />
        <Footer
          count={countItems(state)}
          onFilterItems={handleFilterChange}
          onClearCompleted={clearCompleted}
        />
      </section>
    </section>
  );
};

export default App;
