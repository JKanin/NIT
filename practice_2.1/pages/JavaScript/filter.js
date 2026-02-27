const correspond = {
    "Название": "country",
    "Столица": "capital",
    "Форма правления": "government",
    "Режим": "regime",
    "Континент": "continent",
    "Население": ["populationFrom", "populationTo"],
    "ВВП на душу населения($)": ["gdpFrom", "gdpTo"]
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
			if (key === "Население") {
				let population = Number(val);
				if (!isNaN(population)) {
					let from = datafilter.populationFrom ?? -Infinity;
					let to = datafilter.populationTo ?? Infinity;
					result &&= (population >= from && population <= to);
				}
			}
			if (key === "ВВП на душу населения($)") {
				let gdp = Number(val);
				if (!isNaN(gdp)) {
					let from = datafilter.gdpFrom ?? -Infinity;
					let to = datafilter.gdpTo ?? Infinity;
					result &&= (gdp >= from && gdp <= to);
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