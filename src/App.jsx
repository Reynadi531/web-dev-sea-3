import { useState } from 'react';
import TaskItem from './TaskItem';

export default function App() {
  const [tasks, setTasks] = useState([
    { id: 't1', text: 'Memahami JSX', done: false },
    { id: 't2', text: 'Mencoba props', done: false },
  ]);
  const [text, setText] = useState('');
  const [error, setError] = useState('');

  function handleAdd(event) {
    event.preventDefault();
    const trimmedText = text.trim();
    if (!trimmedText) {
      setError('Tulis nama tugas terlebih dahulu.');
      return;
    }
    const newTask = {
      id: crypto.randomUUID(),
      text: trimmedText,
      done: false,
    };
    setTasks((previous) => [...previous, newTask]);
    setText('');
    setError('');
  }

  function handleToggle(id) {
    setTasks((previous) => previous.map((task) => (
      task.id === id ? { ...task, done: !task.done } : task
    )));
  }

  function handleDelete(id) {
    setTasks((previous) => previous.filter((task) => task.id !== id));
  }

  const completedCount = tasks.filter((task) => task.done).length;

  return (
    <main className="app">
      <h1>Daftar Tugas Belajar</h1>
      <p>Target kecil, progres nyata.</p>

      <form onSubmit={handleAdd}>
        <label htmlFor="task-input">Tugas baru</label>
        <div className="input-row">
          <input
            id="task-input"
            value={text}
            onChange={(event) => {
              setText(event.target.value);
              setError('');
            }}
            placeholder="Contoh: Latihan component"
            aria-describedby={error ? 'task-error' : undefined}
            aria-invalid={Boolean(error)}
          />
          <button type="submit">Tambah</button>
        </div>
        {error && <p id="task-error" className="error" role="alert">{error}</p>}
      </form>

      <p className="summary" aria-live="polite">
        {completedCount} dari {tasks.length} tugas selesai
      </p>

      {tasks.length === 0 ? (
        <p>Belum ada tugas. Tambahkan satu!</p>
      ) : (
        <ul className="task-list">
          {tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onToggle={handleToggle}
              onDelete={handleDelete}
            />
          ))}
        </ul>
      )}
    </main>
  );
}
