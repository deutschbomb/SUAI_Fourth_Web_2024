
const dateBegin = document.querySelector('#dateBegin');
const dateEnd = document.querySelector('#dateEnd');

dateBegin.value = formatDate(new Date(dateBegin.value));
dateEnd.value = formatDate(new Date(dateEnd.value));