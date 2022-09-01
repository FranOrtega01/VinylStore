export const rangeInputs = document.querySelector('#range');
export const rangeNumber = document.querySelector('#rangeValue')

const radioInputAscending = document.querySelector('#ascending');
const radioInputDescending = document.querySelector('#descending');

rangeInputs.min = rangeNumber.min
rangeInputs.max = rangeNumber.max
rangeInputs.value = rangeNumber.value

function rangeInputChangeWithSlider(e) {
    const min = e.target.min
    const max = e.target.max
    const val = e.target.value
    e.target.style.backgroundSize = (val - min) * 100 / (max - min) + '% 100%'
}
function rangeInputChangeWithNumber(e){
    const min = e.target.min
    const max = e.target.max
    const val = e.target.value
    rangeInputs.style.backgroundSize = (val - min) * 100 / (max - min) + '% 100%'
}

rangeInputs.addEventListener('input', rangeInputChangeWithSlider)
rangeInputs.addEventListener('input', () => {
    rangeNumber.value = rangeInputs.value
    });

rangeNumber.addEventListener('input', rangeInputChangeWithNumber)
rangeNumber.addEventListener('input', () => {
    rangeInputs.value = rangeNumber.value
});

