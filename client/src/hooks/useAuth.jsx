import { useState } from "react";
import toast from "react-hot-toast";

const useAuth = (url, inputs) => {
  // States
  const [response, setResponse] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Credentials': 'include'
        },
        body: JSON.stringify(inputs)
      });
      const data = await res.json();
      
      if (data.success) {
        setResponse(data);
        toast.success(data.message);
        setLoading(false);
      } else {
        setError(data.message);
        toast.error(data.message);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      if (error.message === "Failed to fetch") {
        toast.error("Network error. Please check your connection.");
      } else {
        toast.error(error.message);
      }
      setLoading(false);
    }
  };

  // Return the data, error, and loading
  return { response, loading, error, fetchData };
};

export default useAuth;
