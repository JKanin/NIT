import { useState, useEffect } from "react";

const Sort = (props) => {
    const { currentData, fullData, filtering, onReset } = props;
    const fields = Object.keys(fullData[0]);
    const [field1, setField1] = useState('');
    const [field2, setField2] = useState('');
    const [field3, setField3] = useState('');
    const [desc1, setDesc1] = useState(false);
    const [desc2, setDesc2] = useState(false);
    const [desc3, setDesc3] = useState(false);

	useEffect(() => {
		if (field1 === '') {
			setField2('');
			setField3('');
			setDesc2(false);
			setDesc3(false);
		} else if (field2 === field1) {
			setField2('');
		}
	}, [field1]);

	useEffect(() => {
		if (field2 === '') {
			setField3('');
			setDesc3(false);
		} else if (field3 === field2) {
			setField3('');
		}
	}, [field2]);

	useEffect(() => {
		if (field3 === field1 || field3 === field2) {
			setField3('');
		}
	}, [field1, field2]);

    const sortSubmit = (event) => {
    event.preventDefault();
    if (!field1) return;

    let arr = [...currentData];

    const dir1 = desc1 ? -1 : 1;
    const dir2 = desc2 ? -1 : 1;
    const dir3 = desc3 ? -1 : 1;

    arr.sort((f1, f2) => {
        let val1 = f1[field1];
        let val2 = f2[field1];
        let cmp;
        if (typeof val1 === 'number' && typeof val2 === 'number') {
            cmp = val1 - val2;
        } else {
            cmp = val1.toLowerCase().localeCompare(val2.toLowerCase(), 'ru');
        }
        if (cmp !== 0) return dir1 * cmp;

        if (field2) {
            val1 = f1[field2];
            val2 = f2[field2];
            if (typeof val1 === 'number' && typeof val2 === 'number') {
                cmp = val1 - val2;
            } else {
                cmp = val1.toLowerCase().localeCompare(val2.toLowerCase(), 'ru');
            }
            if (cmp !== 0) return dir2 * cmp;
        }

        if (field3) {
            val1 = f1[field3];
            val2 = f2[field3];
            if (typeof val1 === 'number' && typeof val2 === 'number') {
                cmp = val1 - val2;
            } else {
                cmp = val1.toLowerCase().localeCompare(val2.toLowerCase(), 'ru');
            }
            if (cmp !== 0) return dir3 * cmp;
        }

        return 0;
    });

    filtering(arr);
};

    const sortReset = () => {
        setField1(''); 
		setField2(''); 
		setField3('');
        setDesc1(false); 
		setDesc2(false); 
		setDesc3(false);
        onReset()
    };

    return (
        <form onSubmit={sortSubmit}>
            <p>Сортировать по</p>
            <p>
                <select value={field1} onChange={e => setField1(e.target.value)}>
                    <option value="">Нет</option>
                    {fields.map(f => <option key={f} value={f}>{f}</option>)}
                </select>
                по убыванию?
				<input type="checkbox" checked={desc1} onChange={e => setDesc1(e.target.checked)} />
            </p>
            <p>
                <select value={field2} onChange={e => setField2(e.target.value)} disabled={!field1}>
                    <option value="">Нет</option>
                    {fields.filter(f => f !== field1).map(f => <option key={f} value={f}>{f}</option>)}
                </select>
                по убыванию?
				<input type="checkbox" checked={desc2} onChange={e => setDesc2(e.target.checked)} />
            </p>
            <p>
                <select value={field3} onChange={e => setField3(e.target.value)} disabled={!field2}>
                    <option value="">Нет</option>
                    {fields.filter(f => f !== field1 && f !== field2).map(f => <option key={f} value={f}>{f}</option>)}
                </select>
                по убыванию?
				<input type="checkbox" checked={desc3} onChange={e => setDesc3(e.target.checked)} />
            </p>
            <p>
                <button type="submit">Сортировать</button>
                <button type="button" onClick={sortReset}>Сбросить сортировку</button>
            </p>
        </form>
    );
};

export default Sort;