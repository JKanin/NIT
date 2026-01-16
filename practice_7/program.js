function calculate(data) {
	let inp3 = document.querySelector('label[for="input3"]');
	if (inp3.textContent === 'h = '){
		let a = data.input1.value;
		if (Number(a) <= 0 || isNaN(a)) { 
			data.input1.classList.add("error"); 
			return false; 
		}
		let b = data.input2.value;
		if (Number(b) <= 0 || isNaN(b)) { 
			data.input2.classList.add("error"); 
			return false; 
		}
		let h = data.input3.value;
		if (Number(h) <= 0 || isNaN(h)) { 
			data.input3.classList.add("error"); 
			return false; 
		}

		if (!(data.task1.checked || data.task2.checked || data.task3.checked || data.task4.checked)) {
			document.getElementById('tasks').classList.add("h-error");
			return false;
		}

		let output = document.getElementById('output');
		output.innerHTML = "<p>Результат:</p>"; 
		if (data.task1.checked){
			let s = b * h;
			let h2 = s / a;
			let newElement1 = document.createElement('p'); 
			newElement1.innerHTML = `h2 = ${ h2 }`; 
			output.appendChild(newElement1);
		}
		if (data.task2.checked){
			let cos = Math.sqrt(1 - (h / a)**2);
			let d1 = Math.sqrt(a**2 + b**2 - 2*a*b*cos);
			let d2 = Math.sqrt(a**2 + b**2 + 2*a*b*cos);
			let newElement2 = document.createElement('p'); 
			newElement2.innerHTML = `d1 = ${ d1 } ; d2 = ${ d2 }`; 
			output.appendChild(newElement2);
		}
		if (data.task3.checked){
			let s = b * h;
			let newElement3 = document.createElement('p'); 
			newElement3.innerHTML = `s = ${ s }`; 
			output.appendChild(newElement3);
		}
		if (data.task4.checked){
			let s = b * h;
			let cos = Math.sqrt(1 - (h / a)**2);
			let d1 = Math.sqrt(a**2 + b**2 - 2*a*b*cos);
			let d2 = Math.sqrt(a**2 + b**2 + 2*a*b*cos);
			let alph = Math.asin((2 * s)/(d1 * d2));
			let newElement4 = document.createElement('p'); 
			newElement4.innerHTML = `α = ${ alph }`; 
			output.appendChild(newElement4);
		}
	}

	else if (inp3.textContent === 'α = '){
		let a = data.input1.value;
		if (Number(a) <= 0 || isNaN(a)) { 
			data.input1.classList.add("error"); 
			return false; 
		}
		let h = data.input2.value;
		if (Number(h) <= 0 || isNaN(h)) { 
			data.input2.classList.add("error"); 
			return false; 
		}
		let alph = data.input3.value;
		if (Number(alph) <= 0 || isNaN(alph)) { 
			data.input3.classList.add("error"); 
			return false; 
		}

		if (!(data.task1.checked || data.task2.checked || data.task3.checked || data.task4.checked)) {
			document.getElementById('tasks').classList.add("h-error");
			return false;
		}

		let output = document.getElementById('output');  
		output.innerHTML = "<p>Результат:</p>";
		if (data.task1.checked){
			let h2 = a * Math.sin(alph);
			let newElement1 = document.createElement('p'); 
			newElement1.innerHTML = `h2 = ${ h2 }`; 
			output.appendChild(newElement1);
		}
		if (data.task2.checked){
			let h2 = a * Math.sin(alph);
			let s = h2 * a;
			let b = s / h;
			let d1 = Math.sqrt(a**2 + b**2 - 2*a*b*Math.cos(alph));
			let d2 = Math.sqrt(a**2 + b**2 + 2*a*b*Math.cos(alph));
			let newElement2 = document.createElement('p'); 
			newElement2.innerHTML = `d1 = ${ d1 } ; d2 = ${ d2 }`; 
			output.appendChild(newElement2);
		}
		if (data.task3.checked){
			let h2 = a * Math.sin(alph);
			let s = h2 * a;
			let newElement3 = document.createElement('p'); 
			newElement3.innerHTML = `s = ${ s }`; 
			output.appendChild(newElement3);
		}
		if (data.task4.checked){
			let h2 = a * Math.sin(alph);
			let s = h2 * a;
			let b = s / h;
			let d1 = Math.sqrt(a**2 + b**2 - 2*a*b*Math.cos(alph));
			let d2 = Math.sqrt(a**2 + b**2 + 2*a*b*Math.cos(alph));
			let beta = Math.asin((2*s) / (d1*d2));
			let newElement4 = document.createElement('p'); 
			newElement4.innerHTML = `β = ${ beta }`; 
			output.appendChild(newElement4);
		}
	}

	return true; 
}

function show(data){
	let image = document.getElementById('image');
	let inp1 = document.querySelector('label[for="input1"]');
	let inp2 = document.querySelector('label[for="input2"]');
	let inp3 = document.querySelector('label[for="input3"]');
	if (data.radio1.checked){
		image.src = 'images/parallelogram1.png';
		inp1.textContent= 'a = ';
		inp2.textContent  = 'b = ';
		inp3.textContent = 'h = ';
	}
	else if (data.radio2.checked){
		image.src = 'images/parallelogram2.png';
		inp1.textContent = 'a = ';
		inp2.textContent = 'h = ';
	inp3.textContent = 'α = ';
	}

	return true;
}

function clearForm(data){
	document.getElementById('input1').value = '';
	document.getElementById('input2').value = '';
	document.getElementById('input3').value = '';

	document.getElementById('task1').checked = false;
	document.getElementById('task2').checked = false;
	document.getElementById('task3').checked= false;
	document.getElementById('task4').checked = false;

	document.getElementById('output').innerHTML = '';
	
	return true;
}

let input1 = document.getElementById('input1'); 
input1.onfocus = function() { 
	this.classList.remove('error'); 
};
let input2 = document.getElementById('input2'); 
input2.onfocus = function() { 
	this.classList.remove('error'); 
};
let input3 = document.getElementById('input3'); 
input3.onfocus = function() { 
	this.classList.remove('error'); 
};

let checkboxes = [
    document.getElementById('task1'),
    document.getElementById('task2'),
    document.getElementById('task3'),
    document.getElementById('task4')
];
checkboxes.forEach(function(checkbox) {
    checkbox.onfocus = function() {
        document.getElementById('tasks').classList.remove('h-error');
    };
    checkbox.onclick = function() {
        document.getElementById('tasks').classList.remove('h-error');
    };
});

document.getElementById('btn-show').addEventListener('click', function() {
    show(this.form);
});

document.getElementById('btn-calculate').addEventListener('click', function() {
    calculate(this.form);
});

document.getElementById('btn-clear').addEventListener('click', function() {
    clearForm(this.form);
});