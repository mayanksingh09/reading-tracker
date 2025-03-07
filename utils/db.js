const sqlite3 = require('sqlite3').verbose();

let db;

function initDB() {
  return new Promise((resolve, reject) => {
    db = new sqlite3.Database(__dirname + '/../entries.db', (err) => {
      if (err) { console.error(err); reject(err); }
      resolve(db);
    });
    
    const stmt = `CREATE TABLE IF NOT EXISTS entries (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      link TEXT NOT NULL,
      read BOOLEAN DEFAULT 0
    )`;
    
    db.run(stmt, (err) => { if (err) console.error(err); });
  });
}

async function getEntries() {
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM entries', [], (err, rows) => 
      err ? reject(err) : resolve(rows));
  });
}

async function addEntry(name, link) {
  return new Promise((resolve, reject) => {
    db.run('INSERT INTO entries (name, link) VALUES (?,?)',
           [name, link], (err) => 
             err ? reject(err) : resolve(this.lastID));
  });
}

async function updateReadStatus(id, read) {
  return new Promise((resolve, reject) => {
    db.run('UPDATE entries SET read = ? WHERE id = ?', 
           [read, id], (err) => { if (err) reject(err); else resolve(); });
  });
}

module.exports = { initDB, getEntries, addEntry, updateReadStatus };
