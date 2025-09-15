import { useState } from 'react';

function JobForm() {

  //Sets the fields needed to add a job application, and tracks the current state of the field
  const [company, setCompany] = useState('');
  const [role, setRole] = useState('');
  const [status, setStatus] = useState('Applied');
  const [jobDescription, setJobDescription] = useState('');
  const [otherInfo, setOtherInfo] = useState('');
  const [dateApplied, setDateApplied] = useState('');
  const [salary, setSalary] = useState('');
  const [message, setMessage] = useState('');

  //Async function used to send the application to the backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = localStorage.getItem('userId');    
    console.log("userId from localStorage:", userId); // <-- SEE THIS IN THE BROWSER CONSOLE!

    if (!userId) {
      alert("You must be logged in to submit a job.");
      return;
    }
    const newJob = {
      company,
      role,
      status,
      jobDescription,
      otherInfo,
      dateApplied,
      salary,
      userId,
    };
    //Uses fetch and the POST route in the backend to save the application to the database
    try {
        const response = await fetch('http://localhost:3000/jobs', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(newJob)
        });
    
        const savedJob = await response.json();
        if (!response.ok) {
          setMessage(savedJob.message || 'Something went wrong');
        }else{
          setMessage('Adding job successful!');
        }
    
      } catch (error) {
        //console.error('Error:', error.message);
        console.log("Sending job:", savedJob);
        alert('There was an error saving the job.');
      }
    

  };
  //Job form that collects job information from the user
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Job Application Form</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Company"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="text"
            placeholder="Role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="text"
            placeholder="Status (e.g., Applied, Interview)"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="text"
            placeholder="Job Description"
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Other Info"
            value={otherInfo}
            onChange={(e) => setOtherInfo(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="date"
            placeholder="Date Applied"
            value={dateApplied}
            onChange={(e) => setDateApplied(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Salary"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700 transition duration-200"
          >
            Submit Job
          </button>
        </form>
        {message && (
          <p className="mt-4 text-center text-green-600 font-medium">{message}</p>
        )}
        </div>
     </div>
  );
}

export default JobForm;
