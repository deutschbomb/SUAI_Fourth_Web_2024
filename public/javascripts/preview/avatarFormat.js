
const avatar = document.querySelector('#avatar');
const sex = document.querySelector('#sex');

avatar.src = '../../images/';
switch (sex.value) {
    case ('Мужской'):
        avatar.src += 'male.png';
        break;
    case ('Женский'):
        avatar.src += 'female.png';
        break;
    default:
}