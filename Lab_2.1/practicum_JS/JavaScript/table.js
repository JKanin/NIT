const createTable = (data, idTable) => {
	const table = document.getElementById(idTable);
	const hasHeader = table.querySelector('tr') !== null || table.rows.length > 0;
	let headerRow;
	if (!hasHeader) {
		const header = Object.keys(data[0] || {});
		headerRow = createHeaderRow(header);
		table.appendChild(headerRow);
	}
	const tbody = createBodyRows(data);
	table.appendChild(tbody);
};

const createHeaderRow = (headers) => {
    const tr = document.createElement('tr');
    headers.forEach(header => {
        const th = document.createElement('th');
        th.innerHTML = header;
        tr.append(th);
    });
    return tr;
};

const createBodyRows = (data) => {
    const tbody = document.createElement('tbody');
    data.forEach(item => {
        const row = document.createElement('tr');
        Object.values(item).forEach(value => {
            const cell = document.createElement('td');
            cell.textContent = value;
            row.appendChild(cell);
        });
        tbody.appendChild(row);
    });
    return tbody;
};

const clearTable = (idTable) => {
	const table = document.getElementById(idTable);
	const tbody = table.querySelector('tbody');
    if (tbody) {
        tbody.remove();
    }
	return;
}