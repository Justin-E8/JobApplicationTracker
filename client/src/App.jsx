import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import SignupForm from './SignupForm';
import JobForm from './JobForm';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <div className="text-center mt-20 space-y-4">
            <h1 className="text-3xl font-bold">Welcome to Job Tracker!</h1>
            <Link to="/signup" className="text-blue-500 underline">Sign Up</Link><br />
            <Link to="/job-form" className="text-blue-500 underline">Add Job</Link>
          </div>
        } />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/job-form" element={<JobForm />} />
      </Routes>
    </Router>
  );
}


export default App;
