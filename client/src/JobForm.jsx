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

  //Function used to send the application to the backend
  const handleSubmit = (e) => {
    e.preventDefault();

    const newJob = {
      company,
      role,
      status,
      jobDescription,
      otherInfo,
      dateApplied,
      salary
    };

    console.log('Submitting job:', newJob);

  };
  //Job form that collects job information from the user
  return (
    <form onSubmit={handleSubmit}>
      <h2>Add a Job Application</h2>

      <input
        type="text"
        placeholder="Company"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
        required
      />

      <input
        type="text"
        placeholder="Role"
        value={role}
        onChange={(e) => setRole(e.target.value)}
        required
      />

      <select value={status} onChange={(e) => setStatus(e.target.value)} required>
        <option value="Applied">Applied</option>
        <option value="Interview">Interview</option>
        <option value="Offer">Offer</option>
        <option value="Rejected">Rejected</option>
      </select>

      <textarea
        placeholder="Job Description"
        value={jobDescription}
        onChange={(e) => setJobDescription(e.target.value)}
      />

      <input
        type="date"
        value={dateApplied}
        onChange={(e) => setDateApplied(e.target.value)}
      />

      <input
        type="text"
        placeholder="Salary"
        value={salary}
        onChange={(e) => setSalary(e.target.value)}
     />
       <textarea
        placeholder="Other Info"
        value={otherInfo}
        onChange={(e) => setOtherInfo(e.target.value)}
      />

      <button type="submit">Submit</button>
    </form>
  );
}

export default JobForm;
