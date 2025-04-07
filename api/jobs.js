// api/jobs.js

export default async function handler(req, res) {
    const { session_id } = req.query;
  
    if (!session_id) {
      return res.status(400).json({ error: 'Missing session_id' });
    }
  
    // Example: simulate fetching data from a database or scrapped data
    // Replace this with your actual data source logic
    const dummyJobs = [
      { id: 1, title: 'Frontend Developer', company: 'Google' },
      { id: 2, title: 'Backend Developer', company: 'Amazon' },
    ];
  
    // You could filter based on session_id if relevant
    const filteredJobs = dummyJobs; // Placeholder logic
  
    return res.status(200).json({ session_id, jobs: filteredJobs });
  }
  