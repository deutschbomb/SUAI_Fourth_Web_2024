
const input = document.querySelector('#mp3');
const loadInfo = document.querySelector('#load-info')

input.onchange = () => {
    let file = input.files[0];

    if (file === undefined) {
        loadInfo.innerHTML = ' - Не загружено!'
    } else {
        if (file.name.split('.').pop() !== 'mp3') {
            alert('Необходимо выбрать .mp3-файл!');
            input.value = null;
        } else {
            let size = file.size;

            if (1024 * 1024 > size || size > 5 * 1024 * 1024) {
                alert('Допустимый размер файла: 1-5 Мб!');
                input.value = null;
            } else {
                loadInfo.innerHTML = ' - Загружено!'
            }
        }
    }
}

