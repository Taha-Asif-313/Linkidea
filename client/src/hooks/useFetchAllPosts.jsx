import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setAllPosts } from "../redux/postSlice";

const useFetchAllPosts = (url) => {
  const dispatch = useDispatch();
  // States
  const [response, setresponse] = useState(null);
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState(null);

  const fetchData = async () => {
    try {
      setloading(true);
      await axios.get(url, { withCredentials: true }).then((res) => {
        if (res.data.success) {
          dispatch(setAllPosts(res.data.allposts));
          setresponse(res.data.allposts);
        }
        setloading(false);
      });
    } catch (error) {
      seterror(error.response ? error.response.data.message : error.message);
      console.log(error);
      setloading(false);
    }
  };

  // UseEffect to fetch data from api
  useEffect(() => {
    fetchData();
  }, [url]);

  // Return the data error and loading
  return { response, loading, error };
};

export default useFetchAllPosts;
