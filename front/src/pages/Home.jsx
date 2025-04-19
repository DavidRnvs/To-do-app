import { useState } from "react";
import { useLocation } from "react-router";

function Home() {
  const location = useLocation();
  const { state } = location;
  const userData = state?.user;
  const [tasks, setTasks] = useState([
    
  ]);

  const [activeTab, setActiveTab] = useState("Active Task");
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [currentTask, setCurrentTask] = useState({
    nom_tache: "",
    etat: "Planifiée!",
    user: userData.id,
    description: "",
    date_de_creation: null,
    date_de_fin: null,
  });
  const [editingId, setEditingId] = useState(null);

  const toggleTaskCompletion = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const startEditing = (task) => {
    setCurrentTask({
      title: task.title,
      description: task.description,
      time: task.time,
      category: task.category,
    });
    setEditingId(task.id);
    setIsAddingTask(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentTask({
      ...currentTask,
      [name]: value,
    });
  };

  console.log(tasks)

  const saveTask = (e) => {
    e.preventDefault();

    if (editingId) {
      // Mise à jour de la tâche existante
      setTasks(
        tasks.map((task) =>
          task.id === editingId ? { ...task, ...currentTask } : task
        )
      );
    } else {
      // Ajout d'une nouvelle tâche
      const newTask = {
        ...currentTask,
        id: Math.max(...tasks.map((t) => t.id), 0) + 1,
        completed: false,
      };
      console.log(currentTask)
      setTasks([...tasks, newTask]);
    }

    // Réinitialisation
    setCurrentTask({ nom_tache: "", description: "", date_de_creation: "", category: "work" });
    setEditingId(null);
    setIsAddingTask(false);
  };

  const filteredTasks =
    activeTab === "Active Task"
      ? tasks.filter((task) => !task.completed)
      : tasks.filter((task) => task.completed);

  const getCategoryColor = (category) => {
    const colors = {
      meeting: "#C5DFFF",
      branding: "#D3C5FF",
      report: "#FFECC5",
      plan: "#FFC5EB",
      work: "#C5FFD9",
    };
    return colors[category] || "#C5FFD9";
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Todo List</h1>
        <h2>21st Feb, 2025</h2>
      </header>

      <div className="tabs">
        <div
          className={`tab ${activeTab === "Active Task" ? "active" : ""}`}
          onClick={() => setActiveTab("Active Task")}
        >
          Active Task
        </div>
        <div
          className={`tab ${activeTab === "Completed" ? "active" : ""}`}
          onClick={() => setActiveTab("Completed")}
        >
          Completed
        </div>
      </div>

      <div className="tasks-container">
        {filteredTasks.map((task) => (
          <div
            key={task.id}
            className="task-card"
            style={{ backgroundColor: getCategoryColor(task.category) }}
          >
            <div className="task-content">
              <div className="task-header">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTaskCompletion(task.id)}
                  className="task-checkbox"
                />
                <h3 className="task-title">{task.nom_tache}</h3>
                <div className="task-actions">
                  <button
                    className="edit-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      startEditing(task);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="delete-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteTask(task.id);
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
              <p className="task-description">{task.description}</p>
              <div className="task-time">{task.date_de_creation}</div>
            </div>
          </div>
        ))}
      </div>

      {!isAddingTask ? (
        <button className="add-task-btn" onClick={() => setIsAddingTask(true)}>
          + Add New Task
        </button>
      ) : (
        <div className="task-form-container">
          <form className="task-form" onSubmit={saveTask}>
            <h3>{editingId ? "Edit Task" : "Add New Task"}</h3>

            <div className="form-group">
              <label>Title</label>
              <input
                type="text"
                name="nom_tache"
                value={currentTask.title}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Description</label>
              <textarea
                name="description"
                value={currentTask.description}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Date de creation</label>
              <input
                type="datetime-local"
                name="date_de_creation"
                value={currentTask.time}
                onChange={handleInputChange}
                min="2020-01-01T00:00"
                max="2030-12-31T23:59"
                placeholder="10:30 AM - 12:00 PM"
                required
              />
            </div>

            <div className="form-group">
              <label>Category</label>
              <select
                name="category"
                value={currentTask.category}
                onChange={handleInputChange}
              >
                <option value="meeting">Meeting</option>
                <option value="work">Work</option>
                <option value="branding">Branding</option>
                <option value="report">Report</option>
                <option value="plan">Plan</option>
              </select>
            </div>

            <div className="form-buttons">
              <button type="submit" className="save-btn">
                {editingId ? "Update Task" : "Add Task"}
              </button>
              <button
                type="button"
                className="cancel-btn"
                onClick={() => {
                  setIsAddingTask(false);
                  setEditingId(null);
                  setCurrentTask({
                    title: "",
                    description: "",
                    time: "",
                    category: "work",
                  });
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default Home;
