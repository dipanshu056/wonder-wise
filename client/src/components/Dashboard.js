import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { getTrips, deleteTrip } from '../api';

function Dashboard() {
  const { user, logout } = useContext(AuthContext);
  const [trips, setTrips] = useState([]);
  const [filteredTrips, setFilteredTrips] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const response = await getTrips();
        setTrips(response.data);
        setFilteredTrips(response.data);
      } catch (error) {
        console.error('Error fetching trips:', error);
      }
    };
    if (user) fetchTrips();
  }, [user]);

  useEffect(() => {
    setFilteredTrips(
      trips.filter((trip) =>
        trip.destination.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, trips]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this trip?')) {
      try {
        await deleteTrip(id);
        setTrips(trips.filter((trip) => trip.id !== id));
      } catch (error) {
        console.error('Error deleting trip:', error);
      }
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="max-w-4xl mx-auto mt-8 p-6 glassmorphism">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-primary">Your Dashboard</h2>
        {user && (
          <button
            onClick={logout}
            className="gradient-button px-4 py-2"
          >
            Logout
          </button>
        )}
      </div>
      {user ? (
        <>
          <h3 className="text-xl font-semibold mb-4 text-primary">Your Trips</h3>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search trips by destination..."
              value={searchTerm}
              onChange={handleSearch}
              className="w-full p-2 border rounded border-neutral-gray bg-neutral-light text-neutral-gray focus:ring-accent focus:border-accent"
            />
          </div>
          {filteredTrips.length === 0 ? (
            <p className="text-neutral-gray">
              {searchTerm ? 'No trips match your search.' : 'No trips yet. Create one!'}
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredTrips.map((trip) => (
                <div key={trip.id} className="p-4 border border-neutral-gray rounded-lg bg-neutral-light">
                  <h4 className="text-lg font-bold text-primary">{trip.destination}</h4>
                  <p className="text-neutral-gray">Start: {trip.startDate}</p>
                  <p className="text-neutral-gray">End: {trip.endDate}</p>
                  <div className="mt-2 flex space-x-2">
                    <Link
                      to={`/trips/edit/${trip.id}`}
                      className="inline-block bg-accent text-neutral-gray px-3 py-1 rounded hover:bg-secondary"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(trip.id)}
                      className="inline-block bg-secondary text-neutral-light px-3 py-1 rounded hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
          <Link
            to="/trips/new"
            className="mt-4 inline-block gradient-button px-4 py-2"
          >
            Create New Trip
          </Link>
        </>
      ) : (
        <p className="text-secondary">Please log in to view your dashboard.</p>
      )}
    </div>
  );
}

export default Dashboard;