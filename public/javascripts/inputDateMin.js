
const dateBegin = document.querySelector('#dateBegin');
const dateEnd = document.querySelector('#dateEnd');
const today = new Date();

dateBegin.min = dateEnd.min = `${today.toISOString().split('T')[0]}`
