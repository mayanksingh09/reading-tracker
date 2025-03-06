import styles from '../styles/Home.module.css';
import { useState } from 'react';

export default function Home() {
  const [entries, setEntries] = useState([]);
  const [newName, setNewName] = useState('');
  const [newLink, setNewLink] = useState('');

  const addEntry = (e) => {
    e.preventDefault();
    if (!newName || !newLink) return;
    setEntries([...entries, { name: newName, link: newLink, read: false }]);
    setNewName('');
    setNewLink('');
  };

  return (
    <div className={styles.container}>
      <h1>Reading Tracker</h1>
      
      {/* Add Entry Form */}
      <form onSubmit={addEntry} className={styles.form}>
        <input 
          type="text" 
          placeholder="Article/Book Name"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          required
        />
        <input 
          type="url" 
          placeholder="Link URL"
          value={newLink}
          onChange={(e) => setNewLink(e.target.value)}
          required
        />
        <button type="submit">+</button>
      </form>

      {/* Entry List */}
      {entries.map((entry, index) => (
        <div key={index} className={styles.entry}>
          <a href={entry.link} target="_blank" rel="noopener">
            {entry.name}
          </a>
          <label>
            Read?
            <input 
              type="checkbox"
              checked={entry.read}
              onChange={() => {
                const newEntries = [...entries];
                newEntries[index].read = !newEntries[index].read;
                setEntries(newEntries);
              }}
            />
          </label>
        </div>
      ))}
    </div>
  );
}
