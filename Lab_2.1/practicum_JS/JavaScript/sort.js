const createSortArr = (data) => {
    let sortArr = [];
    const sortSelects = data.getElementsByTagName('select');
    for (const item of sortSelects) {   
        const keySort = item.value;
        if (keySort == 0) {
            break;
        }
        const desc = document.getElementById(item.id + 'Desc').checked; 
        sortArr.push({column: keySort - 1, direction: desc}); 
    }
    return sortArr; 
};

const sortTable = (idTable, formData) => {
    const sortArr = createSortArr(formData);
    const table = document.getElementById(idTable);
    if (!table) return false;
    preSortRows = Array.from(table.rows).slice(1).map(row => row.cloneNode(true));
    const hasSorting = sortArr.length > 0 && sortArr.some(s => s.column !== null && s.column !== undefined);
    if (!hasSorting) {
        if (preSortRows && preSortRows.length > 0) {
            while (table.rows.length > 1) {
                table.deleteRow(1);
            }
            const fragment = document.createDocumentFragment();
            preSortRows.forEach(row => fragment.appendChild(row.cloneNode(true)));
            table.appendChild(fragment);
        }
        return true;
    }

    let rowData = Array.from(table.rows);
    const headerRow = rowData.shift();

    rowData.sort((first, second) => {
        for (let { column, direction } of sortArr) {
            if (column === null || column === undefined) continue;
            const firstCell = first.cells[column]?.textContent?.trim()  || '';
            const secondCell = second.cells[column]?.textContent?.trim() || '';
            let a = Number(firstCell);
            let b = Number(secondCell);
            let comparison;
            if (!isNaN(a) && !isNaN(b)) {
                comparison = a - b;
            } else {
                comparison = firstCell.localeCompare(secondCell);
            }
            if (comparison !== 0) {
                return direction ? -comparison : comparison;
            }
        }
        return 0;
    });
    while (table.rows.length > 1) {
        table.deleteRow(1);
    }
    const fragment = document.createDocumentFragment();
    rowData.forEach(row => fragment.appendChild(row));
    table.appendChild(fragment);

    return true;
};

function resetSorting() {
    const table = document.getElementById('list');
    const sortForm = document.getElementById('sort');
    sortForm.reset();
    if (preSortRows && preSortRows.length > 0) {
        while (table.rows.length > 1) {
            table.deleteRow(1);
        }
        const fragment = document.createDocumentFragment();
        preSortRows.forEach(clonedRow => {
            fragment.appendChild(clonedRow.cloneNode(true));
        });
        table.appendChild(fragment);
    }
	document.getElementById("fieldsSecond").disabled = true;
}