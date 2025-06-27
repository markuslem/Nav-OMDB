import { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { CsvContext } from './CsvContext';

const ResultsPage = () => {
  const { csvData } = useContext(CsvContext);
  const [movieData, setMovieData] = useState([]);
  const [titles, setTitles] = useState(null);

  // Parses the title of the movie from the given String
  const parseTitle = (line) => {
    console.log(line);
  };

  /* Makes OMDb API request with the given title (String) */
  const fetchMovie = async (title) => {
    // Fetching from OMDb
    const apiKey = import.meta.env.VITE_OMDB_API_KEY;
    const { data } = await axios.get(`https://www.omdbapi.com/`, {
      params: {
        t: title,
        apikey: apiKey,
      },
    });

    // For emulating the real functionality
    // const data = { Title: title, Year: "2025", Genre: "Drama, Thriller" };
    setMovieData(prev => [...prev, data]);

    // console.log(JSON.stringify(data));
  };

  useEffect(() => {
    fetchMovie("STRAW");
    if (csvData !== null) {
      Object.values(csvData).forEach(item =>
        fetchMovie(item.Title)
      );
    } else {
      console.log("No CSV data");
    }
  }, [csvData]);

  return (
    <>
      <h1>Results page</h1>
      <p>{JSON.stringify(movieData, null)}</p>
    </>
  )

};

export default ResultsPage;