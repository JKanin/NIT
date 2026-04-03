import TableHead from './TableHead.js';
import TableBody from './TableBody.js';
import Filter from './Filter.js';
import Sort from './Sort.js';
import { useState } from "react";

const Table = (props) => {
	const { data = [], amountRows = 10 , showPagination = true} = props;
	const [activePage, setActivePage] = useState(1);
	const [filteredData, setFilteredData] = useState(data);
	const [sortedData, setSortedData] = useState(data);

	const updateFilter = (newFiltered) => {
		setFilteredData(newFiltered);
		setSortedData(newFiltered);
		setActivePage(1);
	};

	const updateSort = (newSorted) => {
		setSortedData(newSorted);
		setActivePage(1);
	};

	const resetSort = () => {
		setSortedData(filteredData);
		setActivePage(1);
	};

	const changeActive = (event) => {
		setActivePage(Number(event.target.innerHTML));
	};

	const totalPages = Math.ceil(sortedData.length / amountRows);
	const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);
	const pages = pageNumbers.map(num => (
		<span key={num} onClick={changeActive} className={num === activePage ? "page active" : "page"}>
			{num}
		</span>
	));

	return (
		<>
			<h4>Фильтры</h4>
			<Filter filtering={updateFilter} fullData={data} />
			<h4>Сортировка</h4>
			<Sort 
				currentData={sortedData}
				fullData={data}
				filtering={updateSort}
				onReset={resetSort}
			/>
			<table>
				<TableHead head={Object.keys(data[0])} />
				<TableBody 
					body={sortedData} 
					amountRows={showPagination ? amountRows : sortedData.length}
					numPage={activePage} 
				/>
			</table>
			<div className="pagination"> 
				{pages} 
			</div>
		</>
	);
};

export default Table;