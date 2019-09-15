import defaultAxios from 'axios';
import React, { useEffect, useState } from 'react';

const useAxios = (opts, axiosInstance = defaultAxios) => {
  const [state, setState] = useState({
    loading: true,
    error: null,
    data: null
  });
  const [trigger, setTrigger] = useState(0);
  // if (!opts.url) {
  //   return;
  // }
  const refetch = () => {
    setState({
      ...state,
      loading: true
    });
    setTrigger(Date.now());
  };
  useEffect(() => {
    axiosInstance(opts)
      .then(data => {
        setState({
          ...state,
          loading: false,
          data,
        });
      }).catch(error => {
        setState({
          ...state,
          loading: false,
          error,
        });
      });
  }, [trigger]);
  return { ...state, refetch };
};

const App = () => {
  const { loading, data, error, refetch } = useAxios({ url: 'https://yts.lt/api/v2/list_movies.json' });
  return (
    <div>
      <h1>{data && data.status}</h1>
      <h2>{loading && 'Loading'}</h2>
      <button onClick={refetch}>Refetch</button>
    </div>
  )
};

export default App;