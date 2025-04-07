import { useState } from "react";

function JobList({ jobs }) {
  const [selectedJobs, setSelectedJobs] = useState(new Set());
  const [error, setError] = useState(null);

  const toggleJobSelection = (jobId) => {
    setSelectedJobs((prev) => {
      const updated = new Set(prev);
      updated.has(jobId) ? updated.delete(jobId) : updated.add(jobId);
      return updated;
    });
  };

  const applyForJobs = () => {
    const selectedJobsArray = jobs.filter((job) => selectedJobs.has(job.id));
    fetch("/api/apply", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(selectedJobsArray),
    })
      .then((res) => res.json())
      .then((data) => alert(data.message))
      .catch((err) => {
        console.error("Apply error:", err);
        setError("Failed to apply for jobs. Please try again.");
      });
  };

  return (
    <div className="min-h-screen bg-white p-6 font-[Inter,Poppins,Helvetica,sans-serif] relative">
      {/* Header */}
      <h1 className="text-4xl font-extrabold text-center text-blue-700 mb-6">
        Job Listings
      </h1>

      {/* Apply Button */}
      <button
        onClick={selectedJobs.size > 0 ? applyForJobs : null}
        className={`absolute top-8 right-8 px-4 py-2 rounded-md text-sm shadow-md transition-all ${
          selectedJobs.size > 0
            ? "bg-green-600 text-white hover:bg-green-700 cursor-pointer"
            : "bg-gray-300 text-gray-500 cursor-not-allowed"
        }`}
        disabled={selectedJobs.size === 0}
      >
        Apply ({selectedJobs.size})
      </button>

      {/* Error Message */}
      {error && <p className="text-red-500 text-center text-lg">{error}</p>}

      {/* Job List */}
      <div className="max-w-4xl mx-auto mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.length === 0 && !error ? (
          <p className="text-center text-gray-600 text-lg animate-pulse col-span-full">
            Loading jobs...
          </p>
        ) : (
          jobs.map((job) => (
            <div
              key={job.id}
              className={`relative z-10 p-5 bg-white shadow-md rounded-md flex flex-col justify-between border border-gray-200 transition-all duration-300 ${
                selectedJobs.has(job.id)
                  ? "shadow-[0_0_15px_rgba(0,123,255,0.8)]"
                  : "hover:shadow-lg"
              }`}
            >
              {/* Job Details */}
              <div>
                <h2 className="text-xl font-semibold text-gray-900">{job.title}</h2>
                <p className="text-gray-600">{job.company}</p>
                <p className="text-gray-500">{job.location}</p>
                <a
                  href={job.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline mt-2 inline-block"
                >
                  View Job
                </a>
              </div>

              {/* Checkbox for Multi-Selection */}
              <input
                type="checkbox"
                checked={selectedJobs.has(job.id)}
                onChange={() => toggleJobSelection(job.id)}
                className="w-5 h-5 accent-blue-600 cursor-pointer mt-4 self-end"
              />
            </div>
          ))
        )}
      </div>

      {/* Footer */}
      <footer className="mt-10 bg-white py-6 border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-4">
          {/* Moving Text */}
          <div className="overflow-hidden whitespace-nowrap">
            <span className="inline-block animate-marquee text-sm text-gray-500 font-medium">
              Quoted by JobSeekers | Trusted by Thousands | Empowering Careers Worldwide
            </span>
          </div>

          {/* Made with Love */}
          <p className="text-center text-gray-600 text-sm mt-4">
            Made with ❤️ by Your Team
          </p>
        </div>
      </footer>
    </div>
  );
}

export default JobList;
