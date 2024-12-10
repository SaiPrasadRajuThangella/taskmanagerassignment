
const FilterTasks = ({ setFilter }) => (
  <div className="filter-tasks">
    <label>Filter by Status: </label>
    <select onChange={(e) => setFilter(e.target.value)}>
      <option value="">All</option>
      <option value="To Do">To Do</option>
      <option value="In Progress">In Progress</option>
      <option value="Done">Done</option>
    </select>
  </div>
);

export default FilterTasks;
