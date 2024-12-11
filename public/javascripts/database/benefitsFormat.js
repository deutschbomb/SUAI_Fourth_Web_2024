
const gym = document.querySelectorAll('#gym');
const pool = document.querySelectorAll('#pool');
const spa= document.querySelectorAll('#spa');

gym.forEach((value) => {
    value.innerHTML = formatValue(value.innerHTML);
});

pool.forEach((value) => {
    value.innerHTML = formatValue(value.innerHTML);
});

spa.forEach((value) => {
    value.innerHTML = formatValue(value.innerHTML);
});
