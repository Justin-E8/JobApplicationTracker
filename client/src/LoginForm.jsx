import { useState } from 'react';
import { useNavigate } from "react-router-dom";

export default function LoginForm(){
    //Attributes thats value is determined by the users inputs
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    //Used to toggle between viewing and not viewing password
    const [showPassword, setShowPassword] = useState(false);
    //Used to redirect users to other pages
    const navigate = useNavigate();
    //Attributes thats value is determined by the users inputs
    const handleLogin = async (e) => {
        e.preventDefault();
    
        const loginInfo = { email, password }

        try {
            const response = await fetch('http://localhost:3000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginInfo)
            });
            const loginData = await response.json();
            if (!response.ok) {
                setMessage(userData.message || 'Login credentials are invalid');
              } else {
                localStorage.setItem('userId', loginData._id);
                setMessage('Login successful!');
                navigate('/dashboard');
              }
            } catch (error) {
              console.error(error);
              setMessage('Error logging in');
            }
        }
        //Login form showed to users
        return (
            <div className="max-w-md mx-auto mt-12 p-6 bg-white rounded-lg shadow-md">
              <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
              <form onSubmit={handleLogin}>
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2 border rounded mb-3"
                  required
                />
                <div className="relative mb-3">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-2 border rounded pr-16"
                    required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-blue-600"
                >
                    {showPassword ? "Hide" : "Show"}
                </button>
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
                >
                  Login
                </button>
              </form>
              {message && <p className="mt-4 text-center">{message}</p>}
            </div>
          );
    }
