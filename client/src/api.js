import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// Mock data store
let trips = [
  { id: 1, destination: 'Paris', startDate: '2025-07-01', endDate: '2025-07-07' },
  { id: 2, destination: 'Tokyo', startDate: '2025-08-15', endDate: '2025-08-22' },
];

export const signup = async (userData) => {
  return { data: { token: 'mock-token', userId: 'mock-user-id' } };
};

export const login = async (credentials) => {
  return { data: { token: 'mock-token', userId: 'mock-user-id' } };
};

export const getTrips = async () => {
  return { data: trips };
};

export const createTrip = async (tripData) => {
  const newTrip = { id: trips.length + 1, ...tripData };
  trips.push(newTrip);
  return { data: newTrip };
};

export const updateTrip = async (id, tripData) => {
  trips = trips.map((trip) =>
    trip.id === parseInt(id) ? { ...trip, ...tripData } : trip
  );
  return { data: trips.find((trip) => trip.id === parseInt(id)) };
};

export const deleteTrip = async (id) => {
  trips = trips.filter((trip) => trip.id !== parseInt(id));
  return { data: { success: true } };
};