
const dateBegin = document.querySelector('#dateBegin');
const dateEnd = document.querySelector('#dateEnd');
const today = new Date();

dateBegin.min = dateEnd.min = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`
