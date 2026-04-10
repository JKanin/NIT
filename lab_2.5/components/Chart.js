import * as d3 from "d3";
import { useState } from "react";
import ChartDraw from './ChartDraw.js';

const Chart = (props) => {
	const [ox, setOx] = useState("Страна");
	const [oy, setOy] = useState([true, false]);
	const [hasError, setError] = useState(false);
	const [chartType, setChartType] = useState("dot");

    const handleSubmit = (event) => {        
        event.preventDefault();
        if (!event.target["oy"][0].checked && !event.target["oy"][1].checked) {
            setError(true);
			setOy([false, false]);
            return;
        } else {
			setError(false);
		}
        setError(false);
        setOx(event.target["ox"].value); 
		setOy([event.target["oy"][0].checked, event.target["oy"][1].checked]);
		setChartType(event.target["chartType"].value);
	};

	const createArrGraph = (data, key) => {   
        const groupObj = d3.group(data, d => d[key]);
        let arrGraph = [];

        for (let entry of groupObj) {
            const heights = entry[1].map(d => d['Высота']).filter(h => h != null);
            if (heights.length === 0) continue;
            arrGraph.push({ labelX: entry[0], max: d3.max(heights), min: d3.min(heights) });
        }
		if (key === 'Год'){
			arrGraph.sort((a, b) => a.labelX - b.labelX);
		}
        return arrGraph;
    };

	return (
    <div>
		<h4>Визуализация</h4>
		<form onSubmit={handleSubmit}>
			<p>Значение по оси OX:</p>
			<div>
				<input type="radio" name="ox" value="Страна" defaultChecked={ox === "Страна"} />
				Страна<br/>	
				<input type="radio" name="ox" value="Год" />
				Год
			</div>
			<p>Значение по оси OY:</p>
			<div className={hasError ? "error" : ""}>
				<input type="checkbox" name="oy" defaultChecked={oy[0]} onChange={() => setError(false)}/>
				Максимальная высота<br/>
				<input type="checkbox" name="oy" onChange={() => setError(false)}/>
				Минимальная высота
			</div>
			<p>Тип графика
			<select name="chartType">
				<option value='dot'>Точечная диаграмма</option>
				<option value='hist'>Гистограмма</option>
			</select>
			</p>
			<p>
				<button type="submit">Построить</button>
			</p>
		</form>
		<ChartDraw data={createArrGraph(props.data, ox)} showMax={oy[0]} showMin={oy[1]} chartType={chartType}/>
	</div>
    );
};

export default Chart;