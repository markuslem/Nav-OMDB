import { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { CsvContext } from './CsvContext';

const ResultsPage = () => {
  const { csvData } = useContext(CsvContext);
  const [ movieData, setMovieData ] = useState(null);


  const fetchMovie = async (title) => {
    const apiKey = import.meta.env.VITE_OMDB_API_KEY;
    const { data } = await axios.get(`https://www.omdbapi.com/`, {
      params: {
        t: title,
        apikey: apiKey,
      },
    });
    setMovieData(data);
  };

  useEffect(() => {
    fetchMovie("STRAW");
  }, []);

  return (
    <>
      <h1>Results page</h1>
      <p>{JSON.stringify(movieData, null)}</p>
    </>
  )

};

export default ResultsPage;