function createArrGraph(data, key) {  
    const groupObj = d3.group(data, d => d[key]);
    let arrGraph =[];
    for(let entry of groupObj) {
        const minMax = d3.extent(entry[1].map(d => d['Высота']));
        arrGraph.push({labelX : entry[0], values : minMax});
     }

     return arrGraph;
}

function drawGraph(data, dataForm) {   
    const keyX = dataForm.axisOX === "year" ? "Год" : "Страна";
    let arrGraph = createArrGraph(data, keyX);
    if (dataForm.axisOX === "year") {
        arrGraph.sort((a, b) => a.labelX - b.labelX);
    }

    const svg = d3.select("svg");  
    svg.selectAll('*').remove();
    const attr_area = {
        width: parseFloat(svg.style('width')),
        height: parseFloat(svg.style('height')),
        marginX: 50,
        marginY: 50
    };

    const showMin = dataForm.minHeight;
    const showMax = dataForm.maxHeight;
    const graphType = dataForm.graphType;
    if (!showMin && !showMax) return;
    const [scX, scY] = createAxis(svg, arrGraph, attr_area, showMin, showMax);
    if (graphType === "dot") {
        if (showMax) {
            createChart(svg, arrGraph, scX, scY, attr_area, "red", "max");
        }
        if (showMin) {
            createChart(svg, arrGraph, scX, scY, attr_area, "blue", "min");
        }
    }
    else if (graphType === "hist") {
        createHistogram(svg, arrGraph, scX, scY, attr_area, showMin, showMax);
    }
}

function createAxis(svg, data, attr_area, showMin, showMax) {
    let allValues = [];
    if (showMax) allValues = allValues.concat(data.map(d => d.values[1]));
    if (showMin) allValues = allValues.concat(data.map(d => d.values[0]));

    let yMin = d3.min(allValues);
    let yMax = d3.max(allValues);

    const scaleX = d3.scaleBand()
        .domain(data.map(d => d.labelX))
        .range([0, attr_area.width - 2 * attr_area.marginX])
        .paddingInner(0.15);
    const scaleY = d3.scaleLinear()
        .domain([yMin * 0.85, yMax * 1.1])
        .range([attr_area.height - 2 * attr_area.marginY, 0]);
    const axisX = d3.axisBottom(scaleX);
    const axisY = d3.axisLeft(scaleY);

    svg.append("g")
        .attr("transform", `translate(${attr_area.marginX}, ${attr_area.height - attr_area.marginY})`)
        .call(axisX)
        .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-0.8em")
        .attr("dy", "0.15em")
        .attr("transform", "rotate(-45)");
    svg.append("g")
        .attr("transform", `translate(${attr_area.marginX}, ${attr_area.marginY})`)
        .call(axisY);
    return [scaleX, scaleY];
}

function createChart(svg, data, scaleX, scaleY, attr_area, color, type) {
    const r = 4;
    const g = svg.append("g")
        .attr("transform", `translate(${attr_area.marginX}, ${attr_area.marginY})`);
    g.selectAll(".dot")
        .data(data)
        .enter()
        .append("circle")
        .attr("class", `dot-${type}`)
        .attr("r", r)
        .attr("cx", d => scaleX(d.labelX) + scaleX.bandwidth() / 2)
        .attr("cy", d => {
            let y = scaleY(d.values[type === "min" ? 0 : 1]);
            if (type === "min" && d.values[0] === d.values[1]) {
                y += 3;
            }
            return y;
        })
        .style("fill", color);
}

function createHistogram(svg, data, scaleX, scaleY, attr_area, showMin, showMax) {
    const g = svg.append("g")
        .attr("transform", `translate(${attr_area.marginX}, ${attr_area.marginY})`);
    const fullWidth = scaleX.bandwidth();
    const count = (showMin ? 1 : 0) + (showMax ? 1 : 0);
    const barWidth = fullWidth / count;
    data.forEach(d => {
        let pos = scaleX(d.labelX);
        if (showMin) {
            g.append("rect")
                .attr("x", pos)
                .attr("y", scaleY(d.values[0]))
                .attr("width", barWidth - barWidth * 0.2)
                .attr("height", scaleY.range()[0] - scaleY(d.values[0]))
                .attr("fill", "blue")
                .attr("stroke", "#222")
                .attr("stroke-width", 0.5);
            
            pos += barWidth;
        }

        if (showMax) {
            g.append("rect")
                .attr("x", pos)
                .attr("y", scaleY(d.values[1]))
                .attr("width", barWidth - barWidth * 0.2)
                .attr("height", scaleY.range()[0] - scaleY(d.values[1]))
                .attr("fill", "red")
                .attr("stroke", "#222")
                .attr("stroke-width", 0.5);
        }
    });
}