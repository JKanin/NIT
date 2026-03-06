function drawSnow(svg) {
    const g = svg.append("g")
        .attr("stroke", "blue")
        .attr("stroke-width", 2.5)
        .attr("stroke-linecap", "round")
        .style("fill", "none");
    const size = 60;
    const centerX = 0;
    const centerY = 0;

    for (let i = 0; i < 6; i++) {
        const angle = (Math.PI * 2 / 6) * i;
        const x = size * Math.cos(angle);
        const y = size * Math.sin(angle);
        g.append("line")
            .attr("x1", centerX)
            .attr("y1", centerY)
            .attr("x2", x)
            .attr("y2", y);
    }

    const hexSize = size * 0.38;
    for (let i = 0; i < 6; i++) {
        const a1 = (Math.PI * 2 / 6) * i;
        const a2 = (Math.PI * 2 / 6) * (i + 1);
        const x1 = hexSize * Math.cos(a1);
        const y1 = hexSize * Math.sin(a1);
        const x2 = hexSize * Math.cos(a2);
        const y2 = hexSize * Math.sin(a2);
        g.append("line")
            .attr("x1", x1).attr("y1", y1)
            .attr("x2", x2).attr("y2", y2);
    }

    return g;
}