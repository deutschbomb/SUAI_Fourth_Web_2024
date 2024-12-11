
const dateBegin = document.querySelector('#dateBegin');
const dateEnd = document.querySelector('#dateEnd');

const unformattedDateBegin = new Date (dateBegin.value);
const unformattedDateEnd = new Date (dateEnd.value);

dateBegin.value = formatDate(unformattedDateBegin);
dateEnd.value = formatDate(unformattedDateEnd);
