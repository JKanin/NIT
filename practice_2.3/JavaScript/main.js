document.addEventListener("DOMContentLoaded", function () {
    const table = document.getElementById('countries');
    const hideButton = document.getElementById('hideButton');
    const graphButton = document.getElementById('graphButton');
    showTable('countries', countries);
    hideButton.addEventListener('click', () => {
        if (hideButton.value === "Скрыть таблицу") {
            table.innerHTML = '';
            hideButton.value = 'Показать таблицу';
        } else {
            showTable('countries', countries);
            hideButton.value = "Скрыть таблицу";
        }
    });
    document.getElementById('minGdp').addEventListener('change', () => {
        updateOYHighlight();
    });
    document.getElementById('maxGdp').addEventListener('change', () => {
        updateOYHighlight();
    });
    document.getElementById('graphButton').addEventListener('click', () => {
        hasTriedToBuild = true;
        updateOYHighlight();
        const minH = document.getElementById('minGdp').checked;
        const maxH = document.getElementById('maxGdp').checked;
        if (!minH && !maxH) {
            return;
        }
        drawGraph(countries, getFormData());
    });
});

function getFormData() {
    const form = document.getElementById('setting');
    return {
        axisOX: form.querySelector('input[name="axisOX"]:checked').value,
        minGdp: form.querySelector('#minGdp').checked,
        maxGdp: form.querySelector('#maxGdp').checked,
        graphType: form.querySelector('#graphType').value
    };
}

let hasTriedToBuild = false;
function updateOYHighlight() {
    const minHeight = document.getElementById('minGdp');
    const maxHeight = document.getElementById('maxGdp');
    const oyBlock = document.querySelector('#setting p:nth-of-type(2)');
    const shouldHighlight = hasTriedToBuild && !minHeight.checked && !maxHeight.checked;
    oyBlock.classList.toggle('error', shouldHighlight);
}
