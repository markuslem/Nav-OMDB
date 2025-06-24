import { useState } from 'react'
import axios from 'axios'
import './App.css'
import Papa from 'papaparse'

function App() {
	const [selectedFile, setSelectedFile] = useState(null);

	const onFileChange = (event) => {
		const file = event.target.files[0];
		setSelectedFile(file);
	};

	const onFileUpload = () => {
		// Parsing CSV
		if (selectedFile) {
			Papa.parse(selectedFile, {
				header: true,
				skipEmptyLines: true,
				complete: function (results) {
					console.log("Parsed CSV data:", results.data);
				},
				error: function (err) {
					console.error("Error parsing CSV:", err);
				}
			});
		}
	};

	// Displaying the file information
	const fileData = () => {
		if (selectedFile) {
			return (
				<div>
					<h2>File Details:</h2>
					<p>File Name: {selectedFile.name}</p>
					<p>File Type: {selectedFile.type}</p>
				</div>
			);
		} else {
			return (
				<div>
					<br />
					<h4>Choose before Pressing the Upload button</h4>
				</div>
			);
		}
	};

	return (
		<>
			<h1>Upload Your Activity</h1>

			<div className="card">
				<p id='instructions'>See instructions</p>
				<p>
					CSV file:
				</p>
				<div>
					<input type="file" onChange={onFileChange} />
					<button onClick={onFileUpload}>Upload!</button>
				</div>
				{fileData()}
			</div>
		</>
	)
}

export default App
