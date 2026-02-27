const correspond = {
    "Название": "structure",
    "Тип": "category",
    "Страна": "country",
    "Город": "city",
    "Год": ["yearFrom", "yearTo"],
    "Высота": ["heightFrom", "heightTo"]
}

const dataFilter = (dataForm) => {
	let dictFilter = {};
	for (const item of dataForm.elements) {
		let valInput = item.value.trim();
		if (item.type === "text" || item.type === "number") {
			if (item.id.includes('From') || item.id.includes('To')) {
				if (valInput === '') {
					if (item.id.includes('From')) {
						valInput = -Infinity;
					} else if (item.id.includes('To')) {
						valInput = Infinity;
					}
				} else {
					const numValue = Number(valInput);
				}
			} else {
				valInput = valInput.toLowerCase();
			}
		}
		dictFilter[item.id] = valInput;
	}
	return dictFilter;
}

const filterTable = (data, idTable, dataForm) =>{
	const datafilter = dataFilter(dataForm);
	let tableFilter = data.filter(item => {
		let result = true;
		Object.entries(item).map(([key, val]) => {
			if (typeof val == 'string') {
				result &&= val.toLowerCase().includes(datafilter[correspond[key]]) 
			}
			if (key === "Год") {
				let year = Number(val);
				if (!isNaN(year)) {
					let from = datafilter.yearFrom ?? -Infinity;
					let to = datafilter.yearTo ?? Infinity;
					result &&= (year >= from && year <= to);
				}
			}
			if (key === "Высота") {
				let height = Number(val);
				if (!isNaN(height)) {
					let from = datafilter.heightFrom ?? -Infinity;
					let to = datafilter.heightTo ?? Infinity;
					result &&= (height >= from && height <= to);
				}
			}
		});
		return result;
	});
	clearTable(idTable);
	createTable(tableFilter, idTable); 
	preSortRows = null;
}

function clearFilter(idTable, originalData, form) {
	form.reset();
	clearTable(idTable);
	createTable(originalData, idTable);
}