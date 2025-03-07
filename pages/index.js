import styles from '../styles/Home.module.css';
import { useState } from 'react';

import { useEffect } from 'react';
import { initDB, getEntries, addEntry, updateReadStatus } from '../utils/db';

export default function Home() {
  const [entries, setEntries] = useState([]);
  const [newName, setNewName] = useState('');
  const [newLink, setNewLink] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        await initDB();
        const entriesData = await getEntries();
        setEntries(entriesData);
      } catch (err) { console.error(err); }
    };

    fetchData();
  }, []);

  const addEntry = async (e) => {
    e.preventDefault();
    if (!newName || !newLink) return;

    try {
      const res = await fetch('/api/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newName, link: newLink })
      });

      if (res.ok) {
        const newEntry = await res.json();
        setEntries([...entries, newEntry]);
        setNewName('');
        setNewLink('');
      }
    } catch (err) { console.error(err); }
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
              onChange={async () => {
                const entryId = entries[index].id;
                const newReadStatus = !entry.read;

                // Update state immediately
                const newEntries = [...entries];
                newEntries[index].read = newReadStatus;
                setEntries(newEntries);

                try {
                  await fetch('/api/update-read', {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ id: entryId, read: newReadStatus })
                  });
                } catch (err) { console.error(err); }
              }}
            />
          </label>
        </div>
      ))}
    </div>
  );
}
