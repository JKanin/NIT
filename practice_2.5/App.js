import './CSS/App.css';
import countries from './data.js';
import Chart from './components/Chart.js';
import Table from './components/Table.js';
import { useState } from "react";

function App() {
	const [filteredData, setFilteredData] = useState(countries);
	return (
		<div className="App">
			<h3>Список стран мира</h3>
			<Chart data={filteredData} />
			<Table data={countries} onFilterChange={setFilteredData}/>
		</div>
	);
}

export default App;