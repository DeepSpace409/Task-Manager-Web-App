import { useState, useEffect } from 'react';
/*Sad to say I needed AI for this, didn't realize until I got this far in 
that I needed to know react.
I've only learned to code in *pure* JavaScript.
By the time you read this, I will have learned React.
Hopefully. */
type Task = {
  id: number
  title: string
  description?: string
  priority: string
  completed: boolean
  createdAt: string
  updatedAt: string
}
/*Pray this function works, I am fueled by 2 hours of sleep
and and an hour of looping
"Wizard Fistfight" on youtube. */
export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newPriority, setNewPriority] = useState('low');

  const fetchTasks = async () => {
    const res = await fetch('/api/tasks');
    const data = await res.json();
    setTasks(data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async () => {
    if (!newTask.trim()) return;
    const res = await fetch('/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: newTask,
        description: newDescription,
        priority: newPriority,
      }),
    });
    if (res.ok) {
      setNewTask('');
      setNewDescription('');
      setNewPriority('low');
      await fetchTasks();
    }
  };

  const markComplete = async (id: number) => {
    const res = await fetch('/api/tasks', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, completed: true }),
    });
    if (res.ok) fetchTasks();
  };

  const deleteTask = async (id: number) => {
    const res = await fetch('/api/tasks', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    if (res.ok) fetchTasks();
  };

  return (
    <div>
      <h1>Task Manager</h1>
      <div style={{ marginBottom: '16px' }}>
        <input
          value={newTask}
          onChange={e => setNewTask(e.target.value)}
          placeholder="New task"
          style={{ marginRight: '8px' }}
        />
        <input
          value={newDescription}
          onChange={e => setNewDescription(e.target.value)}
          placeholder="Description (optional)"
          style={{ marginRight: '8px' }}
        />
        <select
          value={newPriority}
          onChange={e => setNewPriority(e.target.value)}
          style={{ marginRight: '8px' }}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="critical">Critical</option>
        </select>
        <button onClick={addTask}>Add Task</button>
      </div>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {tasks.map(task => (
          <li
            key={task.id}
            style={{
              marginBottom: '24px',
              padding: '12px',
              border: '1px solid #ddd',
              borderRadius: '8px',
              background: task.completed ? '#f2f2f2' : '#fff',
            }}
          >
            <span
              style={{
                textDecoration: task.completed ? 'line-through' : 'none',
                color: task.completed ? '#888' : '#000',
                fontWeight: 'bold',
                fontSize: '1.1em',
              }}
            >
              {task.title}
            </span>
            {task.description && (
              <div style={{ fontStyle: 'italic', color: '#666', marginTop: '4px' }}>
                {task.description}
              </div>
            )}
            <div>
              <span
                style={{
                  color:
                    task.priority === 'critical'
                      ? 'red'
                      : task.priority === 'medium'
                      ? 'orange'
                      : 'green',
                  fontWeight: 'bold',
                  marginLeft: '8px',
                }}
              >
                {task.priority.toUpperCase()}
              </span>
            </div>
            <div style={{ fontSize: '0.8em', color: '#999', marginTop: '4px' }}>
              <span>Created: {new Date(task.createdAt).toLocaleString()}</span>
              <span style={{ marginLeft: '8px' }}>
                Updated: {new Date(task.updatedAt).toLocaleString()}
              </span>
            </div>
            <div style={{ marginTop: '8px' }}>
              {!task.completed ? (
                <button onClick={() => markComplete(task.id)}>Mark Completed</button>
              ) : (
                <button onClick={() => deleteTask(task.id)}>Delete</button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}