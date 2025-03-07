import { useState } from "react";
import axios from "axios";

// Create a custom hook to make API calls
const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Base URL for the API
  const baseURL = "http://localhost:5000/api";

  // GET Request function
  const getRequest = async (endpoint) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${baseURL}${endpoint}`);
      setLoading(false);
      return response.data; // Return data from the GET request
    } catch (err) {
      setLoading(false);
      setError(err.message); // Set error if request fails
      throw err; // Rethrow the error to be handled elsewhere
    }
  };

  // POST Request function
  const postRequest = async (endpoint, data) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(`${baseURL}${endpoint}`, data);
      setLoading(false);
      return response.data; // Return data from the POST request
    } catch (err) {
      setLoading(false);
      setError(err.message); // Set error if request fails
      throw err; // Rethrow the error to be handled elsewhere
    }
  };

  return {
    getRequest,
    postRequest,
    loading,
    error,
  };
};

export default useApi;
