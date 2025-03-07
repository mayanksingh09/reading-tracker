import { initDB, addEntry } from '../../utils/db';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      await initDB();
      const newId = await addEntry(req.body.name, req.body.link);
      res.status(201).json({ id: newId, ...req.body, read:false });
    } catch (err) { 
      res.status(500).send('Error adding entry'); 
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end();
  }
}
