const Filter = (props) => {
	const handleSubmit = (event) => {        
        event.preventDefault();		
		const filterField = {
			"Название": event.target["country"].value.toLowerCase(),
		    "Столица": event.target["capital"].value.toLowerCase(),
			"Форма правления": event.target["government"].value.toLowerCase(),
		    "Режим": event.target["regime"].value.toLowerCase(),
			"Континент": event.target["continent"].value.toLowerCase(),
			"Население": [event.target["populationStart"].value, event.target["populationFinish"].value],
			"ВВП на душу населения($)": [event.target["gdpStart"].value, event.target["gdpFinish"].value]
	    };

        let arr = props.fullData;
        for(const key in filterField) {
			if (key === "Население" || key === "ВВП на душу населения($)") continue;
			arr = arr.filter(item => item[key].toLowerCase().includes(filterField[key]));  
        }

		const [popFrom, popTo] = filterField["Население"].map(v => v ? Number(v) : null);
        if (popFrom || popTo) {
            arr = arr.filter(item => {
                const p = item["Население"];
                if (isNaN(p)) return false;
                if (popFrom !== null && p < popFrom) return false;
                if (popTo !== null && p > popTo) return false;
                return true;
            });
        }

        const [gdpFrom, gdpTo] = filterField["ВВП на душу населения($)"].map(v => v ? Number(v) : null);
        if (gdpFrom || gdpTo) {
            arr = arr.filter(item => {
                const g =item["ВВП на душу населения($)"];
                if (isNaN(g)) return false;
                if (gdpFrom !== null && g < gdpFrom) return false;
                if (gdpTo !== null && g > gdpTo) return false;
                return true;
            });
        }
        props.filtering(arr);
	}

	const handleReset = (event) => {
        event.target.form.reset();
        props.filtering(props.fullData);
    };

    return (
		<form onSubmit={ handleSubmit }>
			<p>
				<label>Название:</label>
				<input name="country" type="text" />
			</p>  
			<p>
				<label>Столица:</label>		
				<input name="capital" type="text" />
			</p>
			<p>
				<label>Форма правления:</label>		
				<input name="government" type="text" />
			</p>
			<p>
				<label>Режим:</label>		
				<input name="regime" type="text" />
			</p>
			<p>
				<label>Континент:</label>		
				<input name="continent" type="text" />
			</p>
			<p>
				<label>Население от:</label>		
				<input name="populationStart" type="number" />
			</p>
			<p>
				<label>Население до:</label>		
				<input name="populationFinish" type="number" />
			</p>
			<p>
				<label>ВВП на душу населения ($) от:</label>		
				<input name="gdpStart" type="number" />
			</p>
			<p>
				<label>ВВП на душу населения ($) до:</label>		
				<input name="gdpFinish" type="number" />
			</p>
			<p>         
				<button type="submit">Фильтровать</button>   
				<button type="reset" onClick={handleReset}>Очистить фильтр</button>
			</p>  
		</form> 
		)
}

export default Filter;