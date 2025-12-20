function xyz(){
	let result = '';
	let m = [];
	for (let i = 0; i < arguments.length; i++){
		x = String(arguments[i]);
		let flag = x.includes('.');
		if (flag) {
			if (!m.includes(Math.round(arguments[i] * 1000) / 1000)){
				m.push(Math.round(arguments[i] * 1000) / 1000);
				result = result + arguments[i] + ' ';
			}
		}
	}
	return result;
}

document.write(xyz('5', '5.0', '6.27', '25.13456', '4', '5.0001', '4.99999'));
