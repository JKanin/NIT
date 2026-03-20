document.addEventListener("DOMContentLoaded", function () {
    const table = document.getElementById('build');
    const hideButton = document.getElementById('hideButton');
    const graphButton = document.getElementById('graphButton');
    showTable('build', buildings);
    hideButton.addEventListener('click', () => {
        if (hideButton.value === "Скрыть таблицу") {
            table.innerHTML = '';
            hideButton.value = 'Показать таблицу';
        } else {
            showTable('build', buildings);
            hideButton.value = "Скрыть таблицу";
        }
    });
    document.getElementById('minHeight').addEventListener('change', () => {
        updateOYHighlight();
    });
    document.getElementById('maxHeight').addEventListener('change', () => {
        updateOYHighlight();
    });
    document.getElementById('graphButton').addEventListener('click', () => {
        hasTriedToBuild = true;
        updateOYHighlight();
        const minH = document.getElementById('minHeight').checked;
        const maxH = document.getElementById('maxHeight').checked;
        if (!minH && !maxH) {
            return;
        }
        drawGraph(buildings, getFormData());
    });
});

function getFormData() {
    const form = document.getElementById('setting');
    return {
        axisOX: form.querySelector('input[name="axisOX"]:checked')?.value || "country",
        minHeight: form.querySelector('#minHeight').checked,
        maxHeight: form.querySelector('#maxHeight').checked,
        graphType: form.querySelector('#graphType').value
    };
}

let hasTriedToBuild = false;
function updateOYHighlight() {
    const minHeight = document.getElementById('minHeight');
    const maxHeight = document.getElementById('maxHeight');
    const oyBlock = document.querySelector('#setting p:nth-of-type(2)');
    const shouldHighlight = hasTriedToBuild && !minHeight.checked && !maxHeight.checked;
    oyBlock.classList.toggle('error', shouldHighlight);
}