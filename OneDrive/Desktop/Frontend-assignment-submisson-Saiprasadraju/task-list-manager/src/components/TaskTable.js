

const TaskTable = ({ tasks, deleteTask, setEditingTask, editingTask }) => {
  return (
    <table className="task-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Title</th>
          <th>Description</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {tasks.map((task) => (
          <tr
            key={task.id}
            className={editingTask?.id === task.id ? "editing" : ""}
          >
            <td>{task.id}</td>
            <td>{task.title}</td>
            <td>{task.description}</td>
            <td>{task.status}</td>
            <td>
              <button onClick={() => setEditingTask(task)}>Edit</button>
              <button onClick={() => deleteTask(task.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TaskTable;
