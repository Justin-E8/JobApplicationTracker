import { useEffect, useState } from 'react';

export default function MyJobs() {
    const [jobs, setJobs] = useState([]);
    const userId = localStorage.getItem('userId');

    useEffect(() => {
        async function fetchJobs() {
            try {
                const response = await fetch(`http://localhost:3000/jobs/${userId}`);
                const data = await response.json();
                setJobs(data);
            } catch (err) {
                console.error('Error fetching jobs:', err);
            }
        }

        fetchJobs();
    }, [userId]);

    return (
        //List containing all of the jobs a specific user has applied to
        <div className="max-w-3xl mx-auto mt-12 p-6 bg-white rounded shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-center">My Job Applications</h2>
            {jobs.length === 0 ? (
                <p className="text-center text-gray-500">You haven't added any jobs yet.</p>
            ) : (
                <ul className="space-y-4">
                    {jobs.map((job) => (
                        <li key={job._id} className="border p-4 rounded shadow-sm">
                        <p><strong>Role:</strong> {job.role}</p>
                        <p><strong>Company:</strong> {job.company}</p>
                        <p><strong>Status:</strong> {job.status}</p>
                        <p><strong>Date Applied:</strong> {job.dateApplied?.substring(0, 10) || "N/A"}</p>
                        <p><strong>Salary:</strong> {job.salary || "N/A"}</p>
                        <p><strong>Job Description:</strong> {job.jobDescription || "N/A"}</p>
                        <p><strong>Other Info:</strong> {job.otherInfo || "N/A"}</p>
                        </li>
                    ))}
                    </ul>
            )}
        </div>
    );
}
