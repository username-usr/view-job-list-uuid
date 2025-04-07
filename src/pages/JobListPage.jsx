// pages/JobListPage.jsx
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import JobList from '../components/JobList.jsx';


const JobListPage = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!sessionId) {
      setError('No session ID found.');
      setLoading(false);
      return;
    }

    const fetchJobs = async () => {
      try {
        const res = await fetch(`https://see-your-scrapped-data.vercel.app/api/jobs?session_id=${sessionId}`);
        if (!res.ok) throw new Error("Couldn't fetch jobs");
        const data = await res.json();
        setJobs(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [sessionId]);

  if (loading) return <p>Loading jobs...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Job Listings</h1>
      <JobList jobs={jobs} />
    </div>
  );
};

export default JobListPage;
