import { useState, useContext, useEffect } from 'react'
import './App.css'
import Papa from 'papaparse'
import { useNavigate } from 'react-router-dom';
import { CsvContext } from './pages/CsvContext';

function App() {
	const [selectedFile, setSelectedFile] = useState(null);
	const navigate = useNavigate();
	const { setCsvData } = useContext(CsvContext); // CSV data sent to the ResultsPage component
	const [showInstructions, setShowInstructions] = useState(false);

	const onFileChange = (event) => {
		const file = event.target.files[0];
		setSelectedFile(file);
	};

	useEffect(() => {
		setShowInstructions(true); // Triggers animation
	}, []);

	const onFileUpload = () => {
		// Parsing CSV
		if (selectedFile) {
			Papa.parse(selectedFile, {
				header: true,
				skipEmptyLines: true,
				complete: function (results) {
					console.log("Parsed CSV data:", results.data)
					setCsvData(results.data)
					navigate('/analyze')
				},
				error: function (err) {
					console.error("Error parsing CSV:", err);
				}
			});
		}
	};


	// Instruction components
	const instructions = [
		{
			number: 1,
			text: "Download viewing activity as CSV from your Netflix Account.",
			extra: (
				<p className="text-amber-300 underline cursor-pointer hover:text-amber-600 transition">
					See Instructions</p>
			),
		},
		{
			number: 2,
			text: "Upload the CSV file and click Analyze!"
		},
		{
			number: 3,
			text: "See the statistics."
		}
	];



	return (
		// File uploading group
		<div className='flex flex-col divide-dashed'>
			<h1>Upload Your Activity</h1>

			<div className="card">
				<p id='instructions'>See instructions</p>
				<p>
					CSV file:
				</p>
				<div>
					<input type="file" onChange={onFileChange} />
					<button onClick={() => {
						onFileUpload();
					}}>
						Analyze!
					</button>
				</div>
			</div>


			{/* Instructions group */}
			<div className={`shadow-xl border-t-2
			p-8 flex flex-col items-center space-y-4
			transform transition-all duration-800 ease-out
			${showInstructions ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
				<h1 className="text-3xl font-bold underline text-red-800">How It Works?</h1>
				<div>
					{instructions.map((step) => (
						<div key={step.number} className="flex space-x-2 [&>*]:text-lg">
							<p className="text-red-300">{step.number}.</p>
							<p>{step.text}</p>

							{/* If exists */}
							{step.extra}
						</div>
					))}
				</div>
			</div>
		</div>
	)
}

export default App
