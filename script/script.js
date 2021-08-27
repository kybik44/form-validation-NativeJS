const $button = document.getElementById("button");
const $firstName = document.getElementById('firstName');
const $lastName = document.getElementById('lastName');
const $select = document.getElementById("select");
const $table = document.querySelector(".table");
const $formFields = document.querySelectorAll(".form-field");
const $radioSex = document.getElementsByName("sex");
const $form = document.getElementById("form");
const $helper = document.querySelector(".select-helper-text")


const sendInformation = (e) => {
    e.preventDefault()
    if (
        validateFirstName() &&
        validateLastName() &&
        validateRadio()
    ) {
        const data = getData($formFields);
        renderTable(data)
        clearForm($form, $formFields)
    }

};

$button.addEventListener("click", sendInformation);

const userList = []
const getData = (fields) => {
    const sex = [...$radioSex].reduce((acc, radio) => {
        if (radio.checked) {
            return radio.value
        }
        return acc
    }, "");
    const newUser = [...fields].reduce((acc, field) => {
        acc[field.name] = field.value;
        return acc;
    }, {});
    newUser.sex = sex;
    return [...userList, newUser];
}

function clearForm(form, fields) {
    form.reset();
    for (let field of fields) {
        field.className = "form-field";
        if (field.name.includes("city")) {
            field.className += " select";
        }

    }
    $helper.innerHTML = ""
}

function renderTable(data) {
    $table.innerHTML = data.reduce((tableTd, fieldValue, index) => {
        tableTd += `<tr data-id="${index}">    
                        <td>${ fieldValue.firstName }</td>
                        <td>${ fieldValue.lastName }</td>
                        <td>${ fieldValue.city }</td>
                        <td>${ fieldValue.sex }</td>
                        
                      </tr>`;
        return tableTd
    }, '');
}


function validateFirstName() {
    if (checkIfEmpty($firstName)) return;
    if (!checkIfOnlyLetters($firstName)) return;
    return true;
}

function validateLastName() {
    if (checkIfEmpty($lastName)) return;
    if (!checkIfOnlyLetters($lastName)) return;
    return true;
}

function validateRadio() {
    if (checkIfChecked($radioSex)) return true;
    return false;
}

function isEmpty(value) {
    if (value === '') return true;
    return false;
}

function setInvalid(field, message) {
    field.className = 'invalid';
    field.nextElementSibling.innerHTML = message;
    field.nextElementSibling.style.color = "red";
}

function setValid(field) {
    field.className = 'valid';
    field.nextElementSibling.innerHTML = '';
}

function checkIfOnlyLetters(field) {
    if (/^[a-zA-Z ]+$/.test(field.value)) {
        setValid(field);
        return true;
    } else {
        setInvalid(field, `Must contain only letters`);
        return false;
    }
}

function validateFirstName() {
    if (checkIfEmpty($firstName)) return;
    if (!checkIfOnlyLetters($firstName)) return;
    return true;
}

function validateLastName() {
    if (checkIfEmpty($lastName)) return;
    if (!checkIfOnlyLetters($lastName)) return;
    return true;
}

function checkIfEmpty(field) {
    if (isEmpty(field.value.trim())) {
        setInvalid(field, `Must not be empty`);
        return true;
    } else {
        setValid(field);
        return false;
    }
}

function isEmpty(value) {
    if (value === '') return true;
    return false;
}

function setInvalid(field, message) {
    field.className = 'invalid';
    field.nextElementSibling.innerHTML = message;
    field.nextElementSibling.style.color = "red";
}

function setValid(field) {
    field.className = 'valid';
    field.nextElementSibling.innerHTML = '';
}

function checkIfOnlyLetters(field) {
    if (/^[a-zA-Z ]+$/.test(field.value)) {
        setValid(field);
        return true;
    } else {
        setInvalid(field, `Must contain only letters`);
        return false;
    }
}

function checkIfChecked(radioButtons) {
    if (radioButtons[0].checked == true) {} else if (radioButtons[1].checked == true) {} else {
        $helper.innerHTML = "Сhoose your gender";
        $helper.style.color = "red";
        return false;
    }
    return true;
}