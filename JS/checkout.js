import { checkEmail, checkPhone, checkFirstName, checkLastName   } from "./Validation.js";



var button
var emailInput;
var phoneInput;
var firstNameInput;
var lastNameInput;


window.onload = init;

function init(){
    button = document.getElementById('order-button');
    button.disabled = true

    emailInput = document.querySelector('.Email')
    phoneInput = document.querySelector('.phone_number');
    firstNameInput = document.querySelector('.first_name');
    lastNameInput = document.querySelector('.last_name');

    emailInput.addEventListener('input', ()=> checkEmail(emailInput.value, button));
    phoneInput.addEventListener('input', ()=> checkPhone(phoneInput.value, button));
    firstNameInput.addEventListener('input', ()=> checkFirstName(firstNameInput.value, button));
    lastNameInput.addEventListener('input', ()=> checkLastName(lastNameInput.value, button));
}

