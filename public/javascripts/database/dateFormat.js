
const dateBegin = document.querySelectorAll('#dateBegin');
const dateEnd = document.querySelectorAll('#dateEnd');

dateBegin.forEach((date) => {
    const unformattedDateBegin = new Date(date.innerHTML);

    date.innerHTML = formatDate(unformattedDateBegin);
});

dateEnd.forEach((date) => {
    const unformattedDateEnd = new Date(date.innerHTML);

    date.innerHTML = formatDate(unformattedDateEnd);
});
