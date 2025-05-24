import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { updateTrip, getTrips } from '../api';
import DatePicker from 'react-datepicker';
import { Tooltip } from 'react-tooltip';

function EditTripForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    destination: '',
    startDate: null,
    endDate: null,
    notes: '', // New: notes field
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
            startDate: trip.startDate ? new Date(trip.startDate) : null,
            endDate: trip.endDate ? new Date(trip.endDate) : null,
            notes: trip.notes || '',
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

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    try {
      await updateTrip(id, {
        ...formData,
        startDate: formData.startDate.toISOString().split('T')[0],
        endDate: formData.endDate.toISOString().split('T')[0],
        notes: formData.notes, // Include notes
      });
      navigate('/');
    } catch (error) {
      setErrors({ form: 'Failed to update trip. Try again.' });
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 glassmorphism">
      <h2 className="text-2xl font-bold mb-4 text-center text-primary">
        <i className="fas fa-edit mr-2"></i>Edit Trip
      </h2>
      {errors.form && <p className="text-secondary mb-4">{errors.form}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-neutral-gray">
            <i className="fas fa-map-marker-alt mr-2"></i>Destination
          </label>
          <input
            type="text"
            name="destination"
            value={formData.destination}
            onChange={(e) => handleChange('destination', e.target.value)}
            className={`w-full p-2 border rounded ${
              errors.destination ? 'border-secondary' : 'border-neutral-gray'
            } bg-neutral-light text-neutral-gray focus:ring-accent focus:border-accent`}
            placeholder="Enter destination"
            data-tooltip-id="destination-tooltip"
            data-tooltip-content="Update the city or place"
          />
          <Tooltip
            id="destination-tooltip"
            className="glassmorphism bg-[var(--glass-bg)] text-neutral-gray border border-white/20"
          />
          {errors.destination && <p className="text-secondary text-sm">{errors.destination}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-neutral-gray">
            <i className="fas fa-calendar-alt mr-2"></i>Start Date
          </label>
          <DatePicker
            selected={formData.startDate}
            onChange={(date) => handleChange('startDate', date)}
            className={`w-full p-2 border rounded ${
              errors.startDate ? 'border-secondary' : 'border-neutral-gray'
            } bg-neutral-light text-neutral-gray focus:ring-accent focus:border-accent`}
            placeholderText="Select start date"
            dateFormat="yyyy-MM-dd"
            data-tooltip-id="start-date-tooltip"
            data-tooltip-content="Update the trip start date"
          />
          <Tooltip
            id="start-date-tooltip"
            className="glassmorphism bg-[var(--glass-bg)] text-neutral-gray border border-white/20"
          />
          {errors.startDate && <p className="text-secondary text-sm">{errors.startDate}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-neutral-gray">
            <i className="fas fa-calendar-alt mr-2"></i>End Date
          </label>
          <DatePicker
            selected={formData.endDate}
            onChange={(date) => handleChange('endDate', date)}
            className={`w-full p-2 border rounded ${
              errors.endDate ? 'border-secondary' : 'border-neutral-gray'
            } bg-neutral-light text-neutral-gray focus:ring-accent focus:border-accent`}
            placeholderText="Select end date"
            dateFormat="yyyy-MM-dd"
            data-tooltip-id="end-date-tooltip"
            data-tooltip-content="Update the trip end date (must be after start date)"
          />
          <Tooltip
            id="end-date-tooltip"
            className="glassmorphism bg-[var(--glass-bg)] text-neutral-gray border border-white/20"
          />
          {errors.endDate && <p className="text-secondary text-sm">{errors.endDate}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-neutral-gray">
            <i className="fas fa-sticky-note mr-2"></i>Notes
          </label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={(e) => handleChange('notes', e.target.value)}
            className="w-full p-2 border rounded border-neutral-gray bg-neutral-light text-neutral-gray focus:ring-accent focus:border-accent"
            placeholder="Update trip notes (e.g., itinerary, packing list)"
            rows="4"
            data-tooltip-id="notes-tooltip"
            data-tooltip-content="Update optional notes for your trip"
          />
          <Tooltip
            id="notes-tooltip"
            className="glassmorphism bg-[var(--glass-bg)] text-neutral-gray border border-white/20"
          />
        </div>
        <button
          type="submit"
          className="w-full gradient-button p-2"
          data-tooltip-id="submit-tooltip"
          data-tooltip-content="Save your updated trip details"
        >
          <i className="fas fa-save mr-2"></i>Update Trip
        </button>
        <Tooltip
          id="submit-tooltip"
          className="glassmorphism bg-[var(--glass-bg)] text-neutral-gray border border-white/20"
        />
      </form>
    </div>
  );
}

export default EditTripForm;