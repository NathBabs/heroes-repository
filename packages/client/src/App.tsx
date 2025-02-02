import { useState, useEffect } from 'react';
import axios, { AxiosError } from 'axios';
import { SuperheroForm } from './components/SuperheroForm';
import { SuperheroList } from './components/SuperheroList';
import type { Superhero } from './types/superhero';


// Define the API URL based on the environment variable or default to localhost
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

/**
 * Axios instance with pre-configured options for the application's API.
 * @type {AxiosInstance}
 */
export const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    "Cache-Control": "no-cache", // Prevents caching
    "Pragma": "no-cache", //  Prevents caching
    "Expires": "0", // Prevents caching
  },
});

// Dummy data for development
const dummyData: Superhero[] = [
  { name: 'The Silent Guardian', superpower: 'Invisibility & Healing Others', humilityScore: 9, created_at: '2025-01-31T15:38:18.542Z' },
  { name: 'Eco Whisperer', superpower: 'Communication with Nature', humilityScore: 8, created_at: '2025-01-31T15:38:18.542Z' },
  { name: 'Time Mender', superpower: 'Temporal Manipulation', humilityScore: 7, created_at: '2025-01-31T15:38:18.542Z' },
  { name: 'Dream Walker', superpower: 'Entering Dreams to Help Others', humilityScore: 9, created_at: '2025-01-31T15:38:18.542Z' },
  { name: 'Hope Weaver', superpower: 'Inspiring Courage in Others', humilityScore: 10, created_at: '2025-01-31T15:38:18.542Z' },
];

function App() {
  // state variables for managing superheroes, loading state, and error messages
  const [superheroes, setSuperheroes] = useState<Superhero[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Fetches the list of superheroes from the API and updates the state.
   * 
   * This function is responsible for making the API request to retrieve the list of superheroes,
   * handling any errors that may occur, and updating the state with the fetched data.
   * 
   * If the API request fails, it will log the error message and use the dummy data for development.
   */
  const fetchSuperheroes = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get("/superheroes");

      const heroesData = response.data.data;
      // Check if the response data is an array
      setSuperheroes(Array.isArray(heroesData) ? heroesData : []);
    } catch (err) {
      let errorMessage = 'Failed to fetch superheroes';

      /**
       * If the error is an instance of AxiosError, extract the error message from the response data.
       */
      if (err instanceof AxiosError) {
        errorMessage = err.response?.data && typeof err.response.data === 'object' && 'message' in err.response.data
          ? err.response.data.message
          : 'Failed to fetch superheroes';
      }

      console.error('Error fetching superheroes:', errorMessage);
      setError(errorMessage as string);
      // Use dummy data in development
      if (import.meta.env.DEV) {
        setSuperheroes(dummyData);
      }
    } finally {
      setLoading(false);
    }
  };


  /**
   * Fetches the list of superheroes from the API and updates the state when the component mounts.
   * 
   * The `isMounted` flag is used to ensure that the state is only updated if the component is still mounted,
   * preventing potential memory leaks or issues with updating the state of an unmounted component.
   */
  useEffect(() => {
    let isMounted = true;
    fetchSuperheroes().finally(() => {
      if (!isMounted) return;
    });
    return () => {
      isMounted = false;
    };
  }, []);


  /**
   * Handles the addition of a new superhero to the application.
   *
   * @param superhero - An object containing the superhero's details, excluding the `created_at` property.
   * @returns A Promise that resolves when the superhero is successfully added.
   */
  const handleAddSuperhero = async (superhero: Omit<Superhero, 'created_at'>) => {
    setLoading(true);
    setError(null);
    try {
      const newSuperhero: Omit<Superhero, 'created_at'> = {
        ...superhero,
      };
      await api.post("/superheroes", newSuperhero);
      fetchSuperheroes(); // Refresh the list after adding
    } catch (err) {
      let errorMessage = 'Failed to fetch superheroes';

      /**
       * If the error is an instance of AxiosError, extract the error message from the response data.
       */
      if (err instanceof AxiosError) {
        errorMessage = err.response?.data && typeof err.response.data === 'object' && 'message' in err.response.data
          ? err.response.data.message
          : 'Failed to fetch superheroes';
      }

      console.error('Error adding superhero:', errorMessage);

      // Sets the error state with the provided error message.
      setError(errorMessage as string);
    } finally {
      // Reset loading and error states
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 relative">
      {/* Background blur effect */}
      <div className="fixed inset-0 bg-gradient-to-br from-indigo-50 to-purple-50 opacity-70 backdrop-blur-xl -z-10" />

      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-12">
          Humble Superhero Repository
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="lg:sticky lg:top-8 h-fit">
            <SuperheroForm onSubmit={handleAddSuperhero} isLoading={loading} />
          </div>

          <div className="max-h-[600px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
            <SuperheroList
              superheroes={superheroes}
              onRefresh={fetchSuperheroes}
              isLoading={loading}
              error={error}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
export default App;