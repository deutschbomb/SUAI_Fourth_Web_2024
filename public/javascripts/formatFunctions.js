
// форматирование даты
const formatDateText = (unformattedDate) => {
    return unformattedDate.toLocaleDateString('ru-RU', {
        day: 'numeric', month: 'long', year: 'numeric'
    });
}

const formatDate = (unformattedDate) => {
    return unformattedDate.toLocaleDateString('en-CA');
}

// форматирование значения услуги
const formatValue = (string) => {
    return string.replace(/[01]/g, match => match === "0" ? "❌" : "✔️");
}