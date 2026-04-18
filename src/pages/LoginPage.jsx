import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LogIn } from 'lucide-react';

const LoginPage = () => {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Demo Mode: Direct navigate
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="glass w-full max-w-md p-8 rounded-[2rem] text-center space-y-8 animate-in fade-in zoom-in duration-500">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
            SuperApp
          </h1>
          <p className="text-slate-500">All your services in one place</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2 text-left">
            <label className="text-sm font-medium text-slate-700 ml-1">Email</label>
            <input 
              type="email" 
              placeholder="demo@example.com"
              className="w-full input-field"
              required
            />
          </div>
          <div className="space-y-2 text-left">
            <label className="text-sm font-medium text-slate-700 ml-1">Password</label>
            <input 
              type="password" 
              placeholder="••••••••"
              className="w-full input-field"
              required
            />
          </div>
          
          <button type="submit" className="w-full btn-primary flex items-center justify-center gap-2 mt-4">
            <LogIn size={20} />
            Sign In to Demo
          </button>
        </form>

        <p className="text-xs text-slate-400">
          This is a prototype demonstration. No actual account required.
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
