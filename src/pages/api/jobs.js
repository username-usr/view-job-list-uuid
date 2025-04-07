// File: pages/api/jobs.js

let jobStorage = {}; // temporary in-memory storage

export default async function handler(req, res) {
  const { session_id } = req.query;

  if (!session_id) {
    return res.status(400).json({ error: 'Missing session_id' });
  }

  // Return stored jobs if available
  if (req.method === 'GET') {
    const jobs = jobStorage[session_id];

    if (!jobs) {
      return res.status(404).json({ message: 'No jobs found for this session.' });
    }

    return res.status(200).json(jobs);
  }

  // Allow pushing jobs (optional use for crawler)
  if (req.method === 'POST') {
    const { jobs } = req.body;

    if (!jobs || !Array.isArray(jobs)) {
      return res.status(400).json({ message: 'Invalid jobs format' });
    }

    jobStorage[session_id] = jobs;
    return res.status(200).json({ message: 'Jobs stored successfully.' });
  }

  res.setHeader('Allow', ['GET', 'POST']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
