import { initDB, getEntries } from '../../utils/db';

export default async function handler(req, res) {
  try {
    await initDB();
    const entries = await getEntries();
    res.status(200).json(entries);
  } catch (err) {
    res.status(500).send('Error fetching entries');
  }
}
