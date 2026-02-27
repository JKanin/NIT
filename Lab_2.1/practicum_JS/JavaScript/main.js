let originalRows = null;
let preSortRows = null;

document.addEventListener('DOMContentLoaded', () => {
    createTable(buildings, 'list');
    const findButton = document.getElementById('btn-find');
    const clearButton = document.getElementById('btn-clear');
    const filterForm = document.getElementById('filter');
    const tableId = 'list';
    const table = document.getElementById('list');
    if (table && table.rows.length > 1) {
        originalRows = Array.from(table.rows).slice(1).map(row => row.cloneNode(true));
    }
    findButton.addEventListener('click', () => {
        filterTable(buildings, tableId, filterForm);
    });
    clearButton.addEventListener('click', () => {
        clearFilter(tableId, buildings, filterForm);
		resetSorting();
    });

    const sortForm = document.getElementById('sort');
    setSortSelects(buildings[0], sortForm);

    const firstSelect = document.getElementById('fieldsFirst');
    const secondSelectId = 'fieldsSecond';
    firstSelect.addEventListener('change', () => {
        changeNextSelect(firstSelect, secondSelectId);
    });
    changeNextSelect(firstSelect, secondSelectId);

    const sortButton = document.getElementById('btn-sort');
    sortButton.addEventListener('click', () => {
        sortTable(tableId, sortForm);
    });

    const resetSortButton = document.getElementById('btn-reset');
    resetSortButton.addEventListener('click', resetSorting);
});

const createOption = (str, val) => {
    let item = document.createElement('option');
    item.text = str;
    item.value = val;
    return item;
}

const setSortSelect = (arr, sortSelect) => {
    sortSelect.append(createOption('Нет', 0));
    arr.forEach((item, index) => {
        sortSelect.append(createOption(item, index + 1));
    });
}

const setSortSelects = (data, dataForm) => { 
    const head = Object.keys(data);
    const allSelect = dataForm.getElementsByTagName('select');
    for(const item of dataForm.elements){
        setSortSelect(head, item);
		if (item.tagName === 'SELECT' && item !== allSelect[0]) {
			item.disabled = true;
		}
    }
}

const changeNextSelect = (curSelect, nextSelectId) => {
	let nextSelect = document.getElementById(nextSelectId);
	nextSelect.disabled = false;
	nextSelect.innerHTML = curSelect.innerHTML;
	if (curSelect.value != 0) {
		nextSelect.remove(curSelect.value);
	} else {
		nextSelect.disabled = true;
	}
}