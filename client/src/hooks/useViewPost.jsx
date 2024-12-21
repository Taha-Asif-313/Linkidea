import axios from "axios";
import { useState, useEffect } from "react";

const useViewPost = (url) => {
  // States for managing response, loading, and errors
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const res = await axios.get(url, { withCredentials: true });
      if (res.data.success) {
        setResponse(res.data);
      }
    } catch (error) {
      setError(error.response ? error.response.data.message : error.message);
    } finally {
      setLoading(false); // Set loading to false after the request is completed
    }
  };

  // UseEffect runs only once on mount
  useEffect(() => {
    fetchData();
    // Empty dependency array ensures this runs only once on initial mount
  }, [url]); // Optionally, if `url` changes, it will refetch.

  // Return state variables for use in components
  return { response, loading, error };
};

export default useViewPost;
