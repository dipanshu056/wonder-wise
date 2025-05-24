let trips = [
  {
    id: 1,
    destination: 'Paris',
    startDate: '2025-07-01',
    endDate: '2025-07-07',
    notes: 'Visit Eiffel Tower, Louvre',
  },
];

export const getTrips = async () => {
  return { data: trips };
};

export const createTrip = async (trip) => {
  const newTrip = { id: trips.length + 1, ...trip };
  trips.push(newTrip);
  return { data: newTrip };
};

export const updateTrip = async (id, updatedTrip) => {
  trips = trips.map((trip) =>
    trip.id === parseInt(id) ? { ...trip, ...updatedTrip } : trip
  );
  return { data: updatedTrip };
};

export const deleteTrip = async (id) => {
  trips = trips.filter((trip) => trip.id !== parseInt(id));
  return { data: null };
};

export const signup = async (userData) => {
  return { data: { token: 'mock-token', userId: 1 } };
};

export const login = async (credentials) => {
  return { data: { token: 'mock-token', userId: 1 } };
};