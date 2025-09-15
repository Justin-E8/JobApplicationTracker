import { useEffect, useState } from 'react';

export default function MyJobs() {
    const [jobs, setJobs] = useState([]);
    const [editingJobId, setEditingJobId] = useState(null);
    const [editedStatus, setEditedStatus] = useState('');
    const userId = localStorage.getItem('userId');

    //Method to fetch a users jobs
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

    //Method to allow users to update their added jobs
    const handleSave = async (jobId) => {
        try {
          const response = await fetch(`http://localhost:3000/jobs/${jobId}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ status: editedStatus }),
          });
    
          if (!response.ok) throw new Error('Update failed');
    
          const updatedJobs = jobs.map((job) =>
            job._id === jobId ? { ...job, status: editedStatus } : job
          );
    
          setJobs(updatedJobs);
          setEditingJobId(null);
          setEditedStatus('');
        } catch (error) {
          console.error('Error updating job status:', error);
        }
      };

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
                
                {editingJobId === job._id ? (
                    <>
                    <label className="block font-semibold mb-1 mt-2">Status:</label>
                    <select
                        value={editedStatus}
                        onChange={(e) => setEditedStatus(e.target.value)}
                        className="w-full p-2 border rounded mb-2"
                    >
                        <option value="">Select status</option>
                        <option value="Applied">Applied</option>
                        <option value="Interview">Interview</option>
                        <option value="Offer">Offer</option>
                        <option value="Rejected">Rejected</option>
                    </select>
                    <div className="flex gap-2">
                        <button
                        onClick={() => handleSave(job._id)}
                        className="bg-green-500 text-white px-3 py-1 rounded"
                        >
                        Save
                        </button>
                        <button
                        onClick={() => {
                            setEditingJobId(null);
                            setEditedStatus('');
                        }}
                        className="bg-gray-500 text-white px-3 py-1 rounded"
                        >
                        Cancel
                        </button>
                    </div>
                    </>
                ) : (
                    <>
                    <p><strong>Status:</strong> {job.status}</p>
                    <button
                        onClick={() => {
                        setEditingJobId(job._id);
                        setEditedStatus(job.status);
                        }}
                        className="mt-2 bg-blue-500 text-white px-3 py-1 rounded"
                    >
                        Edit Status
                    </button>
                    </>
                )}

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
