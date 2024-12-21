import axios from "axios";
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
      const res = await axios.post(url, inputs, { withCredentials: true });
      
      if (res.data.success) {
        setResponse(res.data);
        toast.success(res.data.message);
        setLoading(false);
      } else {
        setError(res.data.message);
        toast.error(res.data.message);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      if (error.code === "ERR_NETWORK") {
        toast.error("Network error. Please check your connection.");
      } else {
        toast.error(error.response ? error.response.data.message : error.message);
      }
      setLoading(false);
    }
  };

  // Return the data, error, and loading
  return { response, loading, error, fetchData };
};

export default useAuth;
