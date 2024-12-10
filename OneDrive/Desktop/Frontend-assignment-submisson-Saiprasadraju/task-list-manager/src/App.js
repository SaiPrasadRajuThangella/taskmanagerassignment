import { useState, useEffect } from "react";
import TaskTable from "./components/TaskTable";
import TaskForm from "./components/TaskForm";
import FilterTasks from "./components/FilterTasks";
import "./App.css";

import useNotification from "antd/es/notification/useNotification";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("");
  const [editingTask, setEditingTask] = useState(null);
  const [notification, contextHolder] = useNotification();

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos"
      );
      const data = await response.json();
      console.log(data.slice(0, 20));
      const formattedTasks = data.slice(0, 20).map((task) => ({
        id: task.id,
        title: task.title,
        description: `Sample Description for ${task.id}`,
        status: task.completed ? "Done" : "To Do",
      }));
      // console.log(formattedTasks)
      setTasks(formattedTasks);
    };
    fetchTasks();
  }, []);

  const addTask = (newTask) => {
    setTasks([...tasks, { ...newTask, id: tasks.length + 1 }]);
  };

  const updateTask = (updatedTask) => {
    setTasks(
      tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
    notification.success({message: "Task Updated Successfully",duration:3})

    setEditingTask(null);
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
    
    notification.success({message:`Deleted Successfully`,duration:3})
  };

  const filteredTasks = filter
    ? tasks.filter((task) => task.status === filter)
    : tasks;

  return (
    <div className="app">
      <h1>Task List Manager</h1>
      {contextHolder}
      <TaskForm
        notification={notification}
        addTask={addTask}
        updateTask={updateTask}
        editingTask={editingTask}
        setEditingTask={setEditingTask}
      />
      <FilterTasks setFilter={setFilter} />
      <TaskTable
        tasks={filteredTasks}
        deleteTask={deleteTask}
        setEditingTask={setEditingTask}
        editingTask={editingTask}
      />
    </div>
  );
};

export default App;
