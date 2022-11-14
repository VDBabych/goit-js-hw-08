import throttle from "lodash.throttle";
const DATA_KEY = "formData"
const formEl = document.querySelector(".feedback-form");
const throttledonFormElInput = throttle(onFormElInput, 250)
formEl.addEventListener('input', throttledonFormElInput);
formEl.addEventListener("submit", onFormElSubmit);

function onFormElInput() {
    const dataForSave = {};
    dataForSave.email = formEl.elements['email'].value;
    dataForSave.message = formEl.elements['message'].value;
    localStorage.setItem(DATA_KEY, JSON.stringify(dataForSave));
}

function onFormElSubmit(e) {
    e.preventDefault();
    const dataForCl = {};
    const formData = new FormData(e.currentTarget);

    for (let [name, value] of formData.entries()) {
        if (!value) {
            alert('Заповніть усі поля');
            return;
        }
        dataForCl[name] = value;
    }

    console.log(dataForCl);
    setTimeout(localStorage.removeItem(DATA_KEY), 250);
    e.currentTarget.reset();
}





(() => {
    let savedData = JSON.parse(localStorage.getItem(DATA_KEY));
    if (!savedData) return;
    for (let key in savedData) {
        if (savedData.hasOwnProperty(key)) {
            formEl.elements[key].value = savedData[key];
       }
    }
})();