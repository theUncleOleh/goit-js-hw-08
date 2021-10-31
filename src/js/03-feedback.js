import throttle from 'lodash.throttle';
const refs = {
form : document.querySelector(".feedback-form"),
textarea : document.querySelector(".feedback-form textarea"),
mailInput : document.querySelector(".feedback-form input"),
}

let feedbackForm = {};
initForm();

// console.log(feedbackForm);
// console.log("refs.form",refs.form);
// console.log("refs.textarea", refs.textarea);
// console.log("refs.input", refs.mailInput);

refs.form.addEventListener('input', throttle(handleFormInput, 500));
refs.form.addEventListener('submit', handleFormSubmit);
// refs.textarea.addEventListener('input', handleTextareaInput);
// refs.mailInput.addEventListener('input', handleMailInput);

function handleFormSubmit(evt) {
evt.preventDefault();
evt.currentTarget.reset();
console.log('good-bye form');
console.log(feedbackForm );
feedbackForm = {};
localStorage.removeItem('feedback-form-state');

}

// function handleTextareaInput(evt) {
// const message = evt.target.value;
// localStorage.setItem('form-message', message);
// }

// function handleMailInput(evt) {
// const email = evt.target.value;
// localStorage.setItem('feedback-email', email);
// }


function handleFormInput(evt) {
   
    const formData = new FormData(refs.form);
   formData.forEach((value, name) => 
   feedbackForm[name] = value);
// console.log(feedbackForm);
localStorage.setItem('feedback-form-state', JSON.stringify(feedbackForm));
   
}

function initForm(evt) {
let saveForm = localStorage.getItem('feedback-form-state');
if(saveForm) {
    saveForm = JSON.parse(saveForm);
    // console.log(saveForm);
    Object.entries(saveForm).forEach(([name, value]) => {
        feedbackForm[name] = value;
        refs.form.elements[name].value = value;
    });
   
}
}



// function  handleFormSubmit(evt) {
//     evt.preventDefault();
//     const formTargetName = evt.target.name;
//     const formTargetValue = evt.target.value;
// console.log(formTargetName);
// console.log(formTargetValue);
// }