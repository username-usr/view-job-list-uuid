// File: api/push.js

let jobStorage = {}; // In-memory storage (ephemeral)

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { sessionId, jobs } = req.body;

    if (!sessionId || !jobs) {
      return res.status(400).json({ message: 'Missing sessionId or jobs' });
    }

    jobStorage[sessionId] = jobs;
    return res.status(200).json({ message: 'Jobs stored successfully' });
  }

  if (req.method === 'GET') {
    const { session_id } = req.query;
    const jobs = jobStorage[session_id];
    if (!jobs) {
      return res.status(404).json({ message: 'No jobs found' });
    }

    return res.status(200).json(jobs);
  }

  res.setHeader('Allow', ['POST', 'GET']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
