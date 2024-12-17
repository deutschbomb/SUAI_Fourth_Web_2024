
const dateBeginText = document.querySelector('#dateBeginText');
const dateEndText = document.querySelector('#dateEndText');

const unformattedDateBeginText = new Date(dateBeginText.value);
const unformattedDateEndText = new Date(dateEndText.value);

dateBeginText.value = formatDateText(unformattedDateBeginText);
dateEndText.value = formatDateText(unformattedDateEndText);
