import { initDB, updateReadStatus } from '../../utils/db';

export default async function handler(req, res) {
  if (req.method === 'PUT') {
    try {
      await initDB();
      await updateReadStatus(req.body.id, req.body.read);
      res.status(200).json({ success: true });
    } catch (err) { 
      res.status(500).send('Error updating entry'); 
    }
  } else {
    res.setHeader('Allow', ['PUT']);
    res.status(405).end();
  }
}
