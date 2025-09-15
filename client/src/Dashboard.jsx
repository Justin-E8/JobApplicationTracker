import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    //Creates a dashboard so that users can choose what to do when opening the application
    <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded-lg shadow-md text-center space-y-6">
      <h2 className="text-2xl font-bold">Welcome to your Dashboard!</h2>
      <div className="space-y-4">
        <Link to="/job-form">
          <button className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
            Add a New Job
          </button>
        </Link>
        <Link to="/my-jobs">
          <button className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700">
            View My Jobs
          </button>
        </Link>
      </div>
    </div>
  );
}
