function createHeartPath() {
    const svg = d3.select("svg");
    const width  = svg.attr("width");
    const height = svg.attr("height");
    const centerX = width / 2;
    const centerY = height / 2;
    const scale = Math.min(width, height) * 0.02;
    let data = [];
    for (let t = 0; t <= 2 * Math.PI; t += 0.03) {
        let x_base = 16 * Math.pow(Math.sin(t + Math.PI), 3);
        let y_base = 13 * Math.cos(t + Math.PI) - 5 * Math.cos(2 * (t + Math.PI)) 
                   - 2 * Math.cos(3 * (t + Math.PI)) - Math.cos(4 * (t + Math.PI));
        let x_rot = -y_base;
        let y_rot = x_base;
        const x = centerX + x_rot * scale;
        const y = centerY + y_rot * scale;
        data.push({ x, y });
    }
    return data;
}

function createPathCircle() {
    const svg = d3.select("svg")
	const width = svg.attr("width")
	const height = svg.attr("height")
    let data = [];
    for (let t = 0 ; t <= Math.PI * 2; t += 0.1) {
        data.push(
            {x: width / 2 + width / 3 * Math.sin(t),
             y: height / 2 + height / 3 * Math.cos(t)}
        );
    }
    return data
}

function drawPath() {
    const dataPoints = createHeartPath();
    const line = d3.line()
        .x(d => d.x)
        .y(d => d.y);
    const svg = d3.select("svg");
    const path = svg.append("path")
        .attr("d", line(dataPoints))
        .attr("stroke", "red")
        .attr("fill", "none");
    return path;
};

function translateAlong(path) {
    const length = path.getTotalLength();
    return function() {
        return function(t) {
            const {x, y} = path.getPointAtLength(t * length);
            return `translate(${x},${y})`;
        }
    }
}