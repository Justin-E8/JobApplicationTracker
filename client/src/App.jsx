import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import SignupForm from './SignupForm';
import LoginForm from './LoginForm';
import JobForm from './JobForm';
import Dashboard from './Dashboard';
import MyJobs from './MyJobs';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <div className="text-center mt-20 space-y-4">
            <h1 className="text-3xl font-bold">Welcome to Job Tracker!</h1>
            <Link to="/signup" className="text-blue-500 underline">Sign Up</Link><br />
            <Link to="/login" className="text-blue-500 underline">Login</Link><br />
          </div>
        } />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/job-form" element={<JobForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/my-jobs" element={<MyJobs />} />
      </Routes>
    </Router>
  );
}


export default App;
