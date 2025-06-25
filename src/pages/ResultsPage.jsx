import { useContext } from 'react';
import { CsvContext } from './CsvContext';

const ResultsPage = () => {
  const { csvData } = useContext(CsvContext)
  return (
    <>
      <h1>Results page</h1>
      <p>{JSON.stringify(csvData)}</p>
    </>
  )

};

export default ResultsPage;