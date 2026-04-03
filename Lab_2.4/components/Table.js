import TableHead from './TableHead.js';
import TableBody from './TableBody.js';
import Filter from './Filter.js';
import { useState } from "react";

const Table = (props) => {
	const {
		data = [],
		amountRows = 10,
		showPagination = true,
	} = props;

	const [activePage, setActivePage] = useState(1);
	const changeActive = (event) => {
		setActivePage(Number(event.target.innerHTML));
	};

	const [dataTable, setDataTable] = useState(data);
    const updateDataTable = (value) => setDataTable(value);

	const totalPages = Math.ceil(dataTable.length / amountRows);

	const pageNumbers = showPagination ? Array.from({ length: totalPages }, (_, i) => i + 1) : [];
	const pages = pageNumbers.map(num => (
		<span key={num} onClick={ changeActive } className={num === activePage ? "page active" : "page"}>
			{num}
		</span>
	));
	return (
		<>
		<h4>Фильтры</h4>
        <Filter filtering={ updateDataTable } data={ dataTable } fullData={ props.data }/>
		<table>
			<TableHead head={ Object.keys(props.data[0]) } />
            <TableBody body={ dataTable } amountRows={showPagination ? amountRows : dataTable.length} numPage={activePage} />
		</table>
		{showPagination && totalPages > 1 && (<div className="pagination"> {pages} </div>)}
		</>
	);
};

export default Table;