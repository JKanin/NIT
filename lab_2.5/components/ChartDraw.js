import * as d3 from "d3";
import { useEffect, useMemo, useRef } from "react";

const ChartDraw = (props) => {
	const chartRef = useRef(null);
	const { data, showMax, showMin, chartType } = props;
	const margin = { top: 10, bottom: 60, left: 50, right: 20};

	const values = [];
	if (showMax) values.push(...data.map(d => d.max));
	if (showMin) values.push(...data.map(d => d.min));
	const [min, max] = d3.extent(values);

	const scaleX = useMemo(() => {
		return d3
			.scaleBand()
			.domain(data.map(d => d.labelX))
			.range([0, 0])
	}, [data]);

	const scaleY = useMemo(() => {
		return d3
			.scaleLinear()
			.domain([min * 0.85, max * 1.1])
			.range([0, 0]);
	}, [min, max]);

	useEffect(() => {
		const svg = d3.select(chartRef.current);
    	svg.selectAll("*").remove();
		if (!showMax && !showMin) {
			return;
		}
		const width = parseFloat(svg.style('width'));
		const height = parseFloat(svg.style('height'));
		const boundsWidth = width - margin.left - margin.right;
		const boundsHeight = height - margin.top - margin.bottom;
		scaleX.range([0, boundsWidth]);
		scaleY.range([boundsHeight, 0]);

		const xAxis = d3.axisBottom(scaleX);
		svg.append("g")
			.attr("transform", `translate(${margin.left}, ${height - margin.bottom})`)
			.call(xAxis)
			.selectAll("text")
			.style("text-anchor", "end")
			.attr("dx", "-0.8em")
			.attr("dy", "0.15em")
			.attr("transform", "rotate(-30)");

		const yAxis = d3.axisLeft(scaleY);
		svg.append("g")
			.attr("transform", `translate(${margin.left}, ${margin.top})`)
			.call(yAxis);

		if (chartType === "dot") {
			if (showMax) {
				svg.selectAll(".dot-max")
					.data(data)
					.enter()
					.append("circle")
					.attr("r", 5)
					.attr("cx", d => scaleX(d.labelX) + scaleX.bandwidth() / 2)
					.attr("cy", d => scaleY(d.max))
					.attr("transform", `translate(${margin.left}, ${margin.top})`)
					.style("fill", "red");
			}

			if (showMin) {
				svg.selectAll(".dot-min")
					.data(data)
					.enter()
					.append("circle")
					.attr("r", 5)
					.attr("cx", d => scaleX(d.labelX) + scaleX.bandwidth() / 2)
					.attr("cy", d => scaleY(d.min) + 2)
					.attr("transform", `translate(${margin.left}, ${margin.top})`)
					.style("fill", "blue");
			}
		}

		else if (chartType === "hist") {
			const g = svg.append("g")
				.attr("transform", `translate(${margin.left}, ${margin.top})`);

			const fullWidth = scaleX.bandwidth();
			const count = (showMin ? 1 : 0) + (showMax ? 1 : 0);
			const barWidth = fullWidth / count;

			data.forEach(d => {
				let pos = scaleX(d.labelX);

				if (showMin) {
					g.append("rect")
						.attr("x", pos)
						.attr("y", scaleY(d.min))
						.attr("width", barWidth - barWidth * 0.2)
						.attr("height", scaleY.range()[0] - scaleY(d.min))
						.attr("fill", "blue")
						.attr("stroke", "black")
						.attr("stroke-width", 0.5);
					pos += barWidth;
				}

				if (showMax) {
					g.append("rect")
						.attr("x", pos)
						.attr("y", scaleY(d.max))
						.attr("width", barWidth - barWidth * 0.2)
						.attr("height", scaleY.range()[0] - scaleY(d.max))
						.attr("fill", "red")
						.attr("stroke", "black")
						.attr("stroke-width", 0.5);
				}
			});
		}

	}, [data, showMax, showMin, chartType, scaleX, scaleY]);

	return (
		<svg ref={chartRef}></svg>
	);
};

export default ChartDraw;