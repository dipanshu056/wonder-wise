import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(formData);
      navigate('/');
    } catch (err) {
      setError('Login failed. Try again.');
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4 text-primary">
        <i className="fas fa-sign-in-alt mr-2"></i>Login
      </h2>
      {error && <p className="text-secondary mb-4">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-neutral-gray">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border border-neutral-gray rounded bg-neutral-light text-neutral-gray focus:ring-accent focus:border-accent"
            placeholder="Enter email"
          />
        </div>
        <div className="mb-4">
          <label className="block text-neutral-gray">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 border border-neutral-gray rounded bg-neutral-light text-neutral-gray focus:ring-accent focus:border-accent"
            placeholder="Enter password"
          />
        </div>
        <button type="submit" className="w-full gradient-button p-2">
          <i className="fas fa-sign-in-alt mr-2"></i>Login
        </button>
      </form>
    </div>
  );
}

export default Login;