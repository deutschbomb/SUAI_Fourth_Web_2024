
const textArea = document.querySelector('textarea');
const counter = document.querySelector('#counter');

textArea.addEventListener('input', onInput);

function onInput(event) {
    counter.textContent = event.target.value.length;
}