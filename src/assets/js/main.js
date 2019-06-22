// Input fields
const phone = document.getElementById('phone');
const password = document.getElementById('password');
const toggleInput = document.querySelector('#remember');
const submitBtn = document.querySelector('.form__btn-submit');

let isPhoneValid = false;
let isPasswordValid = false;

// Form
const form = document.getElementById('form');

// Handlers
form.addEventListener('submit', function (event) {
    // Prevent default behaviour
    event.preventDefault();
    if (validatePhone() && validatePassword()) {
        setTimeout(function () {
            alert("form submitted")
        }, 1000);
    }
});

phone.addEventListener("focusout", validatePhone);

password.addEventListener("focusout", validatePassword);

// Validators
function validatePhone() {
    // check if is empty
    if (checkIfEmpty(phone)) return;
    // is if it valid characters for phone number
    if (!containsCharacters(phone, 3)) return;
    isPhoneValid = !isPhoneValid;
    isPasswordValid ? toggleInput.disabled = false : true;
    isPasswordValid && isPhoneValid? submitBtn.disabled = false : true;
    return true;
}

function validatePassword() {
    // Empty check
    if (checkIfEmpty(password)) return;
    // Must of in certain length
    if (!meetLength(password, 5, 100)) return;
    // check password against our character set
    // 1- a
    // 2- a 1
    // 3- A a 1
    // 4- A a 1 @
    if (!containsCharacters(password, 2)) return;
    isPasswordValid = !isPasswordValid;
    isPasswordValid ? toggleInput.disabled = false : true;
    isPasswordValid && isPhoneValid? submitBtn.disabled = false : true;
    return true;
}

// Utility functions
function checkIfEmpty(field) {
    if (isEmpty(field.value.length)) {
        // set field invalid
        setInvalid(field, `${field.name} must not be empty`);
        return true;
    } else {
        // set field valid
        setValid(field);
        return false;
    }
}

function isEmpty(value) {
    if (value === '') return true;
    return false;
}

function meetLength(field, minLength, maxLength) {
    if (field.value.length >= minLength && field.value.length < maxLength) {
        setValid(field);
        return true;
    } else if (field.value.length < minLength) {
        setInvalid(
            field,
            `${field.name} must be at least ${minLength} characters long`
        );
        return false;
    } else {
        setInvalid(
            field,
            `${field.name} must be shorter than ${maxLength} characters`
        );
        return false;
    }
}

function containsCharacters(field, code) {
    let regEx;
    switch (code) {
        case 1:
            // letters
            regEx = /(?=.*[a-zA-Z])/;
            return matchWithRegEx(regEx, field, 'Must contain at least one letter');
        case 2:
            // letter and numbers
            regEx = /(?=.*\d)(?=.*[a-zA-Z])/;
            return matchWithRegEx(
                regEx,
                field,
                'Must contain at least one letter and one number'
            );
        case 3:
            // phone number
            regEx = /^[+]?[\s./0-9]*[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/g;
            return matchWithRegEx(
                regEx,
                field,
                'Invalid type of phone number'
            );
        default:
            return false;
    }
}

function matchWithRegEx(regEx, field, message) {
    if (field.value.match(regEx)) {
        setValid(field);
        return true;
    } else {
        setInvalid(field, message);
        return false;
    }
}

function setInvalid(field, message) {
    field.parentElement.classList.add('label-txt--invalid');
    field.nextElementSibling.firstElementChild.innerHTML = message;
}

function setValid(field) {
    field.parentElement.classList.remove('label-txt--invalid');
    field.parentElement.classList.add('label-txt--valid');
    field.nextElementSibling.firstElementChild.innerHTML = "";
}