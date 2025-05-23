import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { signup } from '../api';
import { AuthContext } from '../context/AuthContext';

function Signup() {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [errors, setErrors] = useState({});
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    if (!formData.username.trim()) newErrors.username = 'Username is required';
    if (!formData.email.includes('@')) newErrors.email = 'Valid email is required';
    if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    return newErrors;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    try {
      const response = await signup(formData);
      login(response.data);
      navigate('/dashboard');
    } catch (error) {
      setErrors({ form: 'Signup failed. Try again.' });
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 glassmorphism">
    <h2 className="text-2xl font-bold mb-4 text-center text-primary">Sign Up</h2>
    {errors.form && <p className="text-secondary mb-4">{errors.form}</p>}
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block text-neutral-gray">Username</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          className={`w-full p-2 border rounded ${errors.username ? 'border-secondary' : 'border-neutral-gray'} bg-neutral-light text-neutral-gray focus:ring-accent focus:border-accent`}
          placeholder="Enter username"
        />
        {errors.username && <p className="text-secondary text-sm">{errors.username}</p>}
      </div>
      <div className="mb-4">
        <label className="block text-neutral-gray">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={`w-full p-2 border rounded ${errors.email ? 'border-secondary' : 'border-neutral-gray'} bg-neutral-light text-neutral-gray focus:ring-accent focus:border-accent`}
          placeholder="Enter email"
        />
        {errors.email && <p className="text-secondary text-sm">{errors.email}</p>}
      </div>
      <div className="mb-4">
        <label className="block text-neutral-gray">Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className={`w-full p-2 border rounded ${errors.password ? 'border-secondary' : 'border-neutral-gray'} bg-neutral-light text-neutral-gray focus:ring-accent focus:border-accent`}
          placeholder="Enter password"
        />
        {errors.password && <p className="text-secondary text-sm">{errors.password}</p>}
      </div>
      <button
        type="submit"
        className="w-full gradient-button p-2"
      >
        Sign Up
      </button>
    </form>
  </div>
  );
}

export default Signup;