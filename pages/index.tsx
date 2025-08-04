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
  /* Had AI help with Tailwind styling. Got to a point where marking tasks as completed
  would make the bg color disappear, the bg color of list items was wrong,
  and the bg of the page didnt go all the way down.
  I now am diagnosed with clinical depression.
  I am now also diagnosed with a severe case of "I hate this code" */
  return (
    <div className='bg-gray-600 min-h-screen'>
      <h1 className='text-2xl font-bold mb-4 text-center text-gray-400'>Task Manager</h1>
      <div className="flex justify-center items-center mb-4 font-bold">
        <input
          value={newTask}
          onChange={e => setNewTask(e.target.value)}
          placeholder="New task"
          className="border border-gray-300 rounded-md p-2 mr-2"
        />
        <input
          value={newDescription}
          onChange={e => setNewDescription(e.target.value)}
          placeholder="Description (optional)"
          className="border border-gray-300 rounded-md p-2 mr-2"
        />
        <select
          value={newPriority}
          onChange={e => setNewPriority(e.target.value)}
          className="border border-gray-300 rounded-md p-2 mr-2 colors-grey700"
        >
          <option value="low" className='text-green-900 font-bold'>Low</option>
          <option value="medium" className='text-orange-600 font-bold'>Medium</option>
          <option value="critical" className='text-red-600 font-bold'>Critical</option>
        </select>
        <button onClick={addTask} className='bg-gray-500 hover:bg-gray-600 text-white rounded-md p-2'>Add Task</button>
      </div>
      <ul className="list-none p-0">
        {tasks.map(task => (
      <li
  key={task.id}
  className={`mb-6 p-3 border border-gray-300 rounded-lg ${
    task.completed ? 'bg-gray-700' : 'bg-gray-900'
  }`}
>
  <span
    className={`font-bold text-[1.1em] ${task.completed ? 'line-through text-gray-400' : 'text-white'}`}
  >
    {task.title}
  </span>
      {task.description && (
        <div className="italic text-gray-500 mt-1">
          {task.description}
        </div>
      )}
      <div>
        <span
          className={`font-bold ml-2 ${
            task.priority === 'critical'
              ? 'text-red-600'
              : task.priority === 'medium'
              ? 'text-orange-500'
              : 'text-green-600'
          }`}
        >
          {task.priority.toUpperCase()}
        </span>
      </div>
      <div className="text-xs text-gray-400 mt-1">
        <span>Created: {new Date(task.createdAt).toLocaleString()}</span>
        <span className="ml-2">
          Updated: {new Date(task.updatedAt).toLocaleString()}
        </span>
      </div>
      <div className="mt-2">
        {!task.completed ? (
          <button
            onClick={() => markComplete(task.id)}
            className="bg-grey-500 hover:bg-grey-600 text-white rounded px-3"
          >
            Mark Completed
          </button>
        ) : (
          <button
            onClick={() => deleteTask(task.id)}
            className="bg-red-500 hover:bg-red-600 text-white rounded px-3"
          >
            Delete
          </button>
        )}
      </div>
    </li>
  ))}
</ul>
    </div>
  );
}