document.addEventListener("DOMContentLoaded", function() {
    const drawButton = document.getElementById('btn-draw');
	drawButton.addEventListener('click', () => {
		draw(document.getElementById('setting'));
	});
	const clearButton = document.getElementById('btn-clear');
	clearButton.addEventListener('click', () => {
		svg.selectAll('*').remove();
	});
	const animCheck = document.getElementById('check-anim');
	const animButton = document.getElementById('btn-anim');
	const animSelect = document.getElementById('anim-method');
	const wayCheck = document.getElementById('check-way');
	animCheck.addEventListener('change', function() {
        if (this.checked) {
            drawButton.style.display = 'none';
            animButton.style.display = 'inline-block';
			animSelect.style.display = 'inline-block';
			document.getElementById('way-block').style.display = 'block';
        } else {
            drawButton.style.display = 'inline-block';
            animButton.style.display = 'none';
			animSelect.style.display = 'none';
			document.getElementById('way-block').style.display = 'none';
        }
    });
	animButton.addEventListener('click', () => {
		runAnimation(document.getElementById('setting'));
	});
    wayCheck.addEventListener('change', function() {
        const coordsBlock = document.getElementById('coords-block');
        const pathBlock = document.getElementById('path-block');
		const scaleBlock = document.getElementById('scale-block');
		const rotationBlock = document.getElementById('rotation-block');
        if (this.checked) {
            coordsBlock.style.display = 'none';
			scaleBlock.style.display = 'none';
			rotationBlock.style.display = 'none';
            pathBlock.style.display = 'block';
        } else {
            coordsBlock.style.display = 'block';
			scaleBlock.style.display = 'block';
			rotationBlock.style.display = 'block';
            pathBlock.style.display = 'none';
        }
    });
	const width = 600;
    const height = 600;
    const svg = d3.select("svg")
       .attr("width", width)
	   .attr("height", height);
})

const draw = (dataForm) => {
	const svg = d3.select("svg")
	let pict = drawSmile(svg)
	pict.attr("transform", 
		`translate(${dataForm.cx.value}, ${dataForm.cy.value}) 
		scale(${dataForm.scx.value}, ${dataForm.scy.value})
		rotate(${dataForm.rot.value})`);
}

const runAnimation = (dataForm) => {
    const svg = d3.select("svg");
    let pict = drawSmile(svg);
    pict.attr("transform", 
        `translate(${dataForm.cx.value}, ${dataForm.cy.value})
         scale(${dataForm.scx.value}, ${dataForm.scy.value})
         rotate(${dataForm.rot.value})`);
	const wayCheck = document.getElementById('check-way');
    const isPathMode = wayCheck && wayCheck.checked;
    if (!isPathMode) {
		const method = document.getElementById('anim-method').value;
		let easeFunc;
		switch (method) {
			case 'linear':
				easeFunc = d3.easeLinear;
				break;
			case 'elastic':
				easeFunc = d3.easeElastic;
				break;
			case 'bounce':
				easeFunc = d3.easeBounce;
				break;
			default:
				easeFunc = d3.easeLinear;
		}
		pict.transition()
			.duration(6000)
			.ease(easeFunc)
			.attr("transform", 
				`translate(${dataForm.cx_finish.value}, ${dataForm.cy_finish.value})
				scale(${dataForm.scx_finish.value}, ${dataForm.scy_finish.value})
				rotate(${dataForm.rot_finish.value})`);
	} else {
        const pathSelect = document.getElementById('path-type');
        const pathValue = pathSelect ? pathSelect.value : 'g';
        const typePath = (pathValue === 'g') ? 0 : 1;
        let path = drawPath(typePath);
        const method = document.getElementById('anim-method').value;
        let easeFunc = d3.easeLinear;
        switch (method) {
            case 'linear':
                easeFunc = d3.easeLinear;
                break;
            case 'elastic':
                easeFunc = d3.easeElasticOut;
                break;
            case 'bounce':
                easeFunc = d3.easeBounceOut;
                break;
        }
        pict.transition()
            .duration(6000)
            .ease(easeFunc)
            .attrTween("transform", translateAlong(path.node()));
    }
}