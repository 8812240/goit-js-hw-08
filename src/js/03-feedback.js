import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const email = document.querySelector('input[name="email"]');
const message = document.querySelector('textarea[name="message"]');
const LOCALSTORAGE_KEY = 'feedback-form-state';

onReload();
//zapisuje w localStorage obiekt z wartościami pól email i message//
const formRefill = () => {
    const refill = {
    email: email.value,
    message: message.value,
    };
    localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(refill));
};
form.addEventListener('input', throttle(formRefill, 500));

//po załadowaniu strony, jeśli w localStorage są dane - wypełnia nimi pola
function onReload() {
    const data = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY));
    if (data) {
    email.value = data.email;
    message.value = data.message;
    }
}
//po wysłaniu formularza czyści storage i pola formularza

function onSubmit(event) {
    event.preventDefault();
    console.log({ email: email.value, message: message.value });
    if (email.value === '' || message.value === '') {
    return alert("Please fill in all the fields!");
    }
    localStorage.removeItem(LOCALSTORAGE_KEY);
    form.reset();
}


form.addEventListener('submit', onSubmit);
