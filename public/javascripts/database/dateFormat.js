
const dateBegin = document.querySelectorAll('#dateBegin');
const dateEnd = document.querySelectorAll('#dateEnd');

dateBegin.forEach((date) => {
    date.innerHTML = formatDate(new Date(date.innerHTML));
});

dateEnd.forEach((date) => {
    date.innerHTML = formatDate(new Date(date.innerHTML));
});
