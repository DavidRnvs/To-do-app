import { useState } from "react";

function Home () {
    const [tasks, setTasks] = useState([
        { 
          id: 1, 
          title: 'Team Meeting', 
          description: 'Lorem ipsum dolor sit amet, consectetur elit iddv niorem idjsfjf.', 
          time: '10:30 AM - 12:00 PM', 
          completed: false, 
          category: 'meeting' 
        },
        { 
          id: 2, 
          title: 'Create a planer', 
          description: 'Lorem ipsum dolor sit amet, consectetur elit iddv niorem idjsfjf.', 
          time: '10:30 AM - 12:00 PM', 
          completed: false, 
          category: 'work' 
        },
        { 
          id: 3, 
          title: 'Work on Branding', 
          description: 'Lorem ipsum dolor sit amet, consectetur elit iddv niorem idjsfjf.', 
          time: '10:30 AM - 12:00 PM', 
          completed: false, 
          category: 'branding' 
        },
        { 
          id: 4, 
          title: 'Make a Report for client', 
          description: 'Lorem ipsum dolor sit amet, consectetur elit iddv niorem idjsfjf.', 
          time: '10:30 AM - 12:00 PM', 
          completed: false, 
          category: 'report' 
        },
        { 
          id: 5, 
          title: 'Create Treatment Plan', 
          description: 'Lorem ipsum dolor sit amet, consectetur elit iddv niorem idjsfjf.', 
          time: '10:30 AM - 12:00 PM', 
          completed: false, 
          category: 'plan' 
        }
      ]);
    
      const [activeTab, setActiveTab] = useState('Active Task');
      const [isAddingTask, setIsAddingTask] = useState(false);
      const [currentTask, setCurrentTask] = useState({ 
        title: '', 
        description: '', 
        time: '', 
        category: 'work' 
      });
      const [editingId, setEditingId] = useState(null);
    
      const toggleTaskCompletion = (id) => {
        setTasks(tasks.map(task => 
          task.id === id ? { ...task, completed: !task.completed } : task
        ));
      };
    
      const deleteTask = (id) => {
        setTasks(tasks.filter(task => task.id !== id));
      };
    
      const startEditing = (task) => {
        setCurrentTask({
          title: task.title,
          description: task.description,
          time: task.time,
          category: task.category
        });
        setEditingId(task.id);
        setIsAddingTask(true);
      };
    
      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCurrentTask({
          ...currentTask,
          [name]: value
        });
      };
    
      const saveTask = (e) => {
        e.preventDefault();
        
        if (editingId) {
          // Mise à jour de la tâche existante
          setTasks(tasks.map(task => 
            task.id === editingId ? { ...task, ...currentTask } : task
          ));
        } else {
          // Ajout d'une nouvelle tâche
          const newTask = {
            ...currentTask,
            id: Math.max(...tasks.map(t => t.id), 0) + 1,
            completed: false
          };
          setTasks([...tasks, newTask]);
        }
        
        // Réinitialisation
        setCurrentTask({ title: '', description: '', time: '', category: 'work' });
        setEditingId(null);
        setIsAddingTask(false);
      };
    
      const filteredTasks = activeTab === 'Active Task' 
        ? tasks.filter(task => !task.completed)
        : tasks.filter(task => task.completed);
    
      const getCategoryColor = (category) => {
        const colors = {
          meeting: '#FF9F40',
          work: '#4CAF50',
          branding: '#2196F3',
          report: '#9C27B0',
          plan: '#FF5252'
        };
        return colors[category] || '#4CAF50';
      };
    
      return (
        <div className="app">
          <header className="app-header">
            <h1>Todo List</h1>
            <h2>21st Feb, 2025</h2>
          </header>
    
          <div className="tabs">
            <div 
              className={`tab ${activeTab === 'Active Task' ? 'active' : ''}`}
              onClick={() => setActiveTab('Active Task')}
            >
              Active Task
            </div>
            <div 
              className={`tab ${activeTab === 'Completed' ? 'active' : ''}`}
              onClick={() => setActiveTab('Completed')}
            >
              Completed
            </div>
          </div>
    
          <div className="tasks-container">
            {filteredTasks.map(task => (
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
                    <h3 className="task-title">{task.title}</h3>
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
                  <div className="task-time">{task.time}</div>
                </div>
              </div>
            ))}
          </div>
    
          {!isAddingTask ? (
            <button 
              className="add-task-btn"
              onClick={() => setIsAddingTask(true)}
            >
              + Add New Task
            </button>
          ) : (
            <div className="task-form-container">
              <form className="task-form" onSubmit={saveTask}>
                <h3>{editingId ? 'Edit Task' : 'Add New Task'}</h3>
                
                <div className="form-group">
                  <label>Title</label>
                  <input
                    type="text"
                    name="title"
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
                  <label>Time</label>
                  <input
                    type="text"
                    name="time"
                    value={currentTask.time}
                    onChange={handleInputChange}
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
                    {editingId ? 'Update Task' : 'Add Task'}
                  </button>
                  <button 
                    type="button" 
                    className="cancel-btn"
                    onClick={() => {
                      setIsAddingTask(false);
                      setEditingId(null);
                      setCurrentTask({ title: '', description: '', time: '', category: 'work' });
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
    )
}

export default Home;