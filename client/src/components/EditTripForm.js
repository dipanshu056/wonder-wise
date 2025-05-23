import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { updateTrip, getTrips } from '../api';

function EditTripForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    destination: '',
    startDate: '',
    endDate: '',
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchTrip = async () => {
      try {
        const response = await getTrips();
        const trip = response.data.find((t) => t.id === parseInt(id));
        if (trip) {
          setFormData({
            destination: trip.destination,
            startDate: trip.startDate,
            endDate: trip.endDate,
          });
        }
      } catch (error) {
        console.error('Error fetching trip:', error);
      }
    };
    fetchTrip();
  }, [id]);

  const validate = () => {
    const newErrors = {};
    if (!formData.destination.trim()) newErrors.destination = 'Destination is required';
    if (!formData.startDate) newErrors.startDate = 'Start date is required';
    if (!formData.endDate) newErrors.endDate = 'End date is required';
    if (formData.startDate && formData.endDate && formData.startDate > formData.endDate) {
      newErrors.endDate = 'End date must be after start date';
    }
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
      await updateTrip(id, formData);
      navigate('/dashboard');
    } catch (error) {
      setErrors({ form: 'Failed to update trip. Try again.' });
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 glassmorphism">
      <h2 className="text-2xl font-bold mb-4 text-center text-primary">Edit Trip</h2>
      {errors.form && <p className="text-secondary mb-4">{errors.form}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-neutral-gray">Destination</label>
          <input
            type="text"
            name="destination"
            value={formData.destination}
            onChange={handleChange}
            className={`w-full p-2 border rounded ${
              errors.destination ? 'border-secondary' : 'border-neutral-gray'
            } bg-neutral-light text-neutral-gray focus:ring-accent focus:border-accent`}
            placeholder="Enter destination"
          />
          {errors.destination && <p className="text-secondary text-sm">{errors.destination}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-neutral-gray">Start Date</label>
          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            className={`w-full p-2 border rounded ${
              errors.startDate ? 'border-secondary' : 'border-neutral-gray'
            } bg-neutral-light text-neutral-gray focus:ring-accent focus:border-accent`}
          />
          {errors.startDate && <p className="text-secondary text-sm">{errors.startDate}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-neutral-gray">End Date</label>
          <input
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            className={`w-full p-2 border rounded ${
              errors.endDate ? 'border-secondary' : 'border-neutral-gray'
            } bg-neutral-light text-neutral-gray focus:ring-accent focus:border-accent`}
          />
          {errors.endDate && <p className="text-secondary text-sm">{errors.endDate}</p>}
        </div>
        <button type="submit" className="w-full gradient-button p-2">
          Update Trip
        </button>
      </form>
    </div>
  );
}

export default EditTripForm;