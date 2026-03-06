document.addEventListener("DOMContentLoaded", function() {
	const clearButton = document.getElementById('btn-clear');
	clearButton.addEventListener('click', () => {
		svg.selectAll('*').remove();
	});
	const animButton = document.getElementById('btn-anim');
	animButton.addEventListener('click', () => {
		runAnimation(document.getElementById('setting'));
	});
	const width = 600;
    const height = 600;
    const svg = d3.select("svg")
       .attr("width", width)
	   .attr("height", height);
})

const runAnimation = (dataForm) => {
    const svg = d3.select("svg");
    let pict = drawSnow(svg)
    const duration = parseInt(document.getElementById('time').value) || 5000;
    const scx_start = +dataForm.scx.value;
    const scx_end = +dataForm.scx_finish.value;
    const scy_start = +dataForm.scy.value;
    const scy_end = +dataForm.scy_finish.value;
    const rot_start = +dataForm.rot.value;
    const rot_end = +dataForm.rot_finish.value;
    const method = document.getElementById('anim-method').value;
    let easeFunc = d3.easeLinear;
    if (method === 'elastic') easeFunc = d3.easeElasticOut;
    if (method === 'bounce') easeFunc = d3.easeBounceOut;

    let path = drawPath();
    pict.transition()
        .duration(duration)
        .ease(easeFunc)
        .attrTween("transform", function() {
            return function(t) {
                const p = path.node().getPointAtLength(t * path.node().getTotalLength());
                const scx = scx_start + t * (scx_end - scx_start);
                const scy = scy_start + t * (scy_end - scy_start);
                const rot = rot_start + t * (rot_end - rot_start);
                return `translate(${p.x}, ${p.y}) rotate(${rot}) scale(${scx}, ${scy})`;
            };
        })
};