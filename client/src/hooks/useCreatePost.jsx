import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { setUserPosts } from "../redux/userSlice";

// Custom Hook to create a post
const useCreatePost = (url) => {
  const dispatch = useDispatch();
  const userPosts = useSelector((state) => state.user.userPosts);
  // States for handling the response, loading, and error
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to handle form submission and make the POST request
  const createPost = async (inputs) => {
    setLoading(true); // Start loading state

    try {
      const res = await axios.post(url, inputs, { withCredentials: true });
      setLoading(false); // Stop loading after request

      // Handle success or failure based on the response
      if (res.data.success) {
        dispatch(setUserPosts([res.data.post, ...userPosts]));
        setResponse(res.data);
        toast.success(res.data.message);
      } else {
        setError(res.data.message);
        toast.error(res.data.message);
      }
    } catch (error) {
      setLoading(false);
      console.error(error);
      toast.error(error.response ? error.response.data.message : error.message);
      setError(error.message);
    }
  };

  // Return the state and the function to invoke the post creation
  return { response, loading, error, createPost };
};

export default useCreatePost;
