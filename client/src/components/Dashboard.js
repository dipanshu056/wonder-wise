import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { getTrips, deleteTrip } from '../api';
import { motion } from 'framer-motion';
import LoadingSpinner from './LoadingSpinner';

function Dashboard() {
  const { user, logout } = useContext(AuthContext);
  const [trips, setTrips] = useState([]);
  const [filteredTrips, setFilteredTrips] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sortBy, setSortBy] = useState('destination'); // New: sort state
  const [sortOrder, setSortOrder] = useState('asc'); // New: sort order

  useEffect(() => {
    const fetchTrips = async () => {
      setIsLoading(true);
      try {
        const response = await getTrips();
        setTrips(response.data);
        setFilteredTrips(response.data);
      } catch (error) {
        console.error('Error fetching trips:', error);
      } finally {
        setIsLoading(false);
      }
    };
    if (user) fetchTrips();
  }, [user]);

  useEffect(() => {
    let sortedTrips = [...trips].filter((trip) =>
      trip.destination.toLowerCase().includes(searchTerm.toLowerCase())
    );
    sortedTrips.sort((a, b) => {
      const isAsc = sortOrder === 'asc' ? 1 : -1;
      if (sortBy === 'destination') {
        return isAsc * a.destination.localeCompare(b.destination);
      } else if (sortBy === 'startDate') {
        return isAsc * (new Date(a.startDate) - new Date(b.startDate));
      }
      return 0;
    });
    setFilteredTrips(sortedTrips);
  }, [searchTerm, trips, sortBy, sortOrder]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this trip?')) {
      setIsLoading(true);
      try {
        await deleteTrip(id);
        setTrips(trips.filter((trip) => trip.id !== id));
      } catch (error) {
        console.error('Error deleting trip:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="max-w-4xl mx-auto mt-8 p-6 glassmorphism">
      {isLoading && <LoadingSpinner />}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-primary">Your Dashboard</h2>
        {user && (
          <button
            onClick={logout}
            className="gradient-button px-4 py-2"
          >
            <i className="fas fa-sign-out-alt mr-2"></i>Logout
          </button>
        )}
      </div>
      {user ? (
        <>
          <h3 className="text-xl font-semibold mb-4 text-primary">
            <i className="fas fa-plane mr-2"></i>Your Trips
          </h3>
          <div className="mb-4 flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search trips by destination..."
                value={searchTerm}
                onChange={handleSearch}
                className="w-full p-2 pl-10 border rounded border-neutral-gray bg-neutral-light text-neutral-gray focus:ring-accent focus:border-accent"
              />
              <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-gray"></i>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleSort('destination')}
                className="px-3 py-2 bg-neutral-light text-primary rounded hover:bg-accent hover:text-neutral-gray"
              >
                Sort by Destination {sortBy === 'destination' && (sortOrder === 'asc' ? '↑' : '↓')}
              </button>
              <button
                onClick={() => handleSort('startDate')}
                className="px-3 py-2 bg-neutral-light text-primary rounded hover:bg-accent hover:text-neutral-gray"
              >
                Sort by Date {sortBy === 'startDate' && (sortOrder === 'asc' ? '↑' : '↓')}
              </button>
            </div>
          </div>
          {filteredTrips.length === 0 ? (
            <p className="text-neutral-gray">
              {searchTerm ? 'No trips match your search.' : 'No trips yet. Create one!'}
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredTrips.map((trip) => (
                <motion.div
                  key={trip.id}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  className="p-4 border border-neutral-gray rounded-lg bg-neutral-light"
                >
                  <h4 className="text-lg font-bold text-primary">
                    <i className="fas fa-map-marker-alt mr-2"></i>{trip.destination}
                  </h4>
                  <p className="text-neutral-gray">
                    <i className="fas fa-calendar-alt mr-2"></i>Start: {trip.startDate}
                  </p>
                  <p className="text-neutral-gray">
                    <i className="fas fa-calendar-alt mr-2"></i>End: {trip.endDate}
                  </p>
                  <p className="text-neutral-gray">
                    <i className="fas fa-sticky-note mr-2"></i>Notes: {trip.notes || 'None'}
                  </p>
                  <div className="mt-2 flex space-x-2">
                    <Link
                      to={`/trips/edit/${trip.id}`}
                      className="inline-block bg-accent text-neutral-gray px-3 py-1 rounded hover:bg-secondary"
                    >
                      <i className="fas fa-edit mr-2"></i>Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(trip.id)}
                      className="inline-block bg-secondary text-neutral-light px-3 py-1 rounded hover:bg-red-700"
                    >
                      <i className="fas fa-trash-alt mr-2"></i>Delete
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
          <Link
            to="/trips/new"
            className="mt-4 inline-block gradient-button px-4 py-2"
          >
            <i className="fas fa-plus mr-2"></i>Create New Trip
          </Link>
        </>
      ) : (
        <p className="text-secondary">Please log in to view your dashboard.</p>
      )}
    </div>
  );
}

export default Dashboard;