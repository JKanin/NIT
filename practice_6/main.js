function playfer(key){
	let alph = 'абвгдежзийклмнопрстуфхцчшщъыьэюя';
	alph = alph.split('');
	key = key.split('');
	key1 = [];

	key.forEach((item) => {
		if (!key1.includes(item)) {
			key1.push(item);
		}
	});

	alph.forEach((item) => {
		if (!key1.includes(item)) {
			key1.push(item);
		}
	});

	let m1 = [];
	let m2 = [];
	for (let r = 0; r < 4; r++) {
		m1[r] = [];
		for (let c = 0; c < 8; c++) {
			let index = r * 8 + c;
			m1[r][c] = key1[index];
		}
	}
	for (let r = 0; r < 8; r++) {
		m2[r] = [];
		for (let c = 0; c < 4; c++) {
			let index = r * 4 + c;
			m2[r][c] = key1[index];
		}
	}
	let result = [];

    for (let letter of key1) {
        let pos1 = [];
        let pos2 = [];
        outer1: for (let r = 0; r < 4; r++) {
            for (let c = 0; c < 8; c++) {
                if (m1[r][c] === letter) {
                    pos1 = String(r+1) + String(c+1);
                    break outer1;
                }
            }
        }
        outer2: for (let r = 0; r < 8; r++) {
            for (let c = 0; c < 4; c++) {
                if (m2[r][c] === letter) {
                    pos2 = String(r+1) + String(c+1);
                    break outer2;
                }
            }
        }

        result.push([letter, pos1, pos2]);
    }

    return result;
}

let keys = ['транспортировка', 'экзопланета', 'экзамен', 'атлетика', 'команда', 'поражение', 'сервер'];
let sh = '54 53 42 14 24 42 21 32 13 44 13 11 81 24 53 42 14 14 23 11 23 64 11 23 14 54 43 14 23 24 24 53 42 14 14 23 11 13 32 64 11 23 33 74 31 13 21 21 52 54 71 13 52 24 24 22 23 14 24 53 13 52 24 42 21 11 81 31 42 52 24 32 23 42 54 53 42 14 81 42 32 23 11 23 12 23 42 41 13 42 11 21 84 23 64 42 14 81 14 42 53 14 23 34 24 53 14 23 32 23 11 23 12 74 53 14 24 32 11 23 14 42 24 53 42 42 11 22 12 13 31 13 22 12 42 14 42 33 12 42 34 13 11 81';
sh = sh.split(' ');
let output = '';

for (let k = 0; k < keys.length; k++){
	let m = playfer(keys[k]);
	let res1 = '';
	for (let i = 0; i < sh.length; i++){
		for (let j = 0; j < m.length; j++){
			if (sh[i] == m[j][1]){
				res1 += m[j][0];
			}
		}
	}

	let res2 = '';
	for (let i = 0; i < sh.length; i++){
		for (let j = 0; j < m.length; j++){
			if (sh[i] == m[j][2]){
				res2 += m[j][0];
			}
		}
	}

	output += `Ключ: ${keys[k]}<br>`;
    output += `Вариант 1 (4×8): ${res1}<br>`;
    output += `Вариант 2 (8×4): ${res2}<br><br>`;
}

document.write(output);
