// import { notification } from "antd";
import { useState, useEffect } from "react";

const TaskForm = ({ addTask, updateTask, editingTask, setEditingTask,notification }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("To Do");

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setDescription(editingTask.description);
      setStatus(editingTask.status);
    } else {
      setTitle("");
      setDescription("");
      setStatus("To Do");
    }
  }, [editingTask]);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingTask) {
      updateTask({ ...editingTask, title, description, status });
    } else {
      addTask({ title, description, status });
      notification.success({message:"Successful",duration:3,description:`Added ${title} succesfully to the list`})
      setTitle("");
      setDescription("");
      setStatus("To Do");
    }
    
    
    
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Task Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Task Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <select value={status} onChange={(e) => setStatus(e.target.value)}>

        <option value="To Do">To Do</option>
        <option value="In Progress">In Progress</option>
        <option value="Done">Done</option>
      </select>
      <button type="submit">{editingTask ? "Update Task" : "Add Task"}</button>
      {editingTask && <button onClick={() => setEditingTask(null)}>Cancel</button>}
    </form>
  );
};

export default TaskForm;
