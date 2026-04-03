const Filter = (props) => {
	const handleSubmit = (event) => {        
        event.preventDefault();		
		const filterField = {
			"Название": event.target["structure"].value.toLowerCase(),
		    "Тип": event.target["type"].value.toLowerCase(),
			"Страна": event.target["country"].value.toLowerCase(),
		    "Город": event.target["city"].value.toLowerCase(),
			"Год": [event.target["yearStart"].value, event.target["yearFinish"].value],
			"Высота": [event.target["heightStart"].value, event.target["heightFinish"].value]
	    };

        let arr = props.fullData;
        for(const key in filterField) {
			if (key === "Год" || key === "Высота") continue;
			arr = arr.filter(item => item[key].toLowerCase().includes(filterField[key]));  
        }
		const [yearFrom, yearTo] = filterField["Год"].map(v => v ? v : null);
        if (yearFrom || yearTo) {
            arr = arr.filter(item => {
                const y = item["Год"];
                if (isNaN(y)) return false;
                if (yearFrom !== null && y < yearFrom) return false;
                if (yearTo !== null && y > yearTo) return false;
                return true;
            });
        }

        const [heightFrom, heightTo] = filterField["Высота"].map(v => v ? v : null);
        if (heightFrom || heightTo) {
            arr = arr.filter(item => {
                const h = item["Высота"];
                if (isNaN(h)) return false;
                if (heightFrom !== null && h < heightFrom) return false;
                if (heightTo !== null && h > heightTo) return false;
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
				<input name="structure" type="text" />
			</p>  
			<p>
				<label>Тип:</label>		
				<input name="type" type="text" />
			</p>
			<p>
				<label>Страна:</label>		
				<input name="country" type="text" />
			</p>
			<p>
				<label>Город:</label>		
				<input name="city" type="text" />
			</p>
			<p>
				<label>Год от:</label>		
				<input name="yearStart" type="number" />
			</p>
			<p>
				<label>Год до:</label>		
				<input name="yearFinish" type="number" />
			</p>
			<p>
				<label>Высота от:</label>		
				<input name="heightStart" type="number" />
			</p>
			<p>
				<label>Высота до:</label>		
				<input name="heightFinish" type="number" />
			</p>
			<p>         
				<button type="submit">Фильтровать</button>   
				<button type="reset" onClick={handleReset}>Очистить фильтр</button>
			</p>  
		</form> 
		)
}

export default Filter;