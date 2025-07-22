import { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { CsvContext } from './CsvContext';
import { data } from 'react-router-dom';

// Chart.js
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
ChartJS.register(ArcElement, Tooltip, Legend);

const ResultsPage = () => {
  const { csvData } = useContext(CsvContext);
  const [movieData, setMovieData] = useState([]);

  // Key -> Genre name    Value -> Nr of occurrences
  const [genresMap, setGenresMap] = useState(new Map());


  const pieChartData = {
    labels: Array.from(genresMap.keys()),
    datasets: [
      {
        label: 'Genres',
        data: Array.from(genresMap.values()),
      },
    ],
  };


  const pieChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },

  }

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

    return data;
  };

  function findGenres() {
    let result = new Map();

    for (const movie of movieData) {
      if (!movie || !movie.Genre) {
        console.log("Coulnd't find genre");
        continue;
      }

      movie.Genre.split(',').map(g => g.trim()).forEach(genre => {
        result.set(genre, (result.get(genre) || 0) + 1);
      });
    }
    setGenresMap(result);
  }

  useEffect(() => {
    async function analyzeTitles() {
      if (csvData !== null) {
        const titles = Object.values(csvData).map(item => item.Title);
        const result = await Promise.all(titles.map(fetchMovie));
        setMovieData(result);
        console.log("Done with analyzing");
      } else {
        console.log("No CSV data");
      }
    }
    analyzeTitles();
  }, [csvData]);

  useEffect(() => {
    findGenres();
  }, [movieData]);


  return (
    <>
      <h1>Results page</h1>
      {/* <p>{JSON.stringify(movieData, null)}</p> */}

      <h2>Top Genres</h2>
      <ul>
        {genresMap &&
          Array.from(genresMap.entries()).map(([genre, count]) => (
            <li key={genre}>{genre}: {count}</li>
          ))
        }
      </ul>

      <Pie data={pieChartData} options={pieChartOptions} />
    </>
  )

};

export default ResultsPage;