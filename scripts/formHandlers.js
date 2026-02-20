import {verifyIdNumber, checkName, verifyPassword, verifyEmail,
    verifyAddress, checkParish, isAgeValid, checkGender, checkLevel } from './validation.js';

import {fieldError, displayError} from './helpers.js';


export function newMember() {
    const member_id = document.getElementById('member_id').value;
    if (!verifyIdNumber(member_id, 'member')) {
        return false;
    }

    const firstName = document.getElementById('firstName').value;
    if (!checkName(firstName)) {
        displayError('Invalid first name!');
        return false;
    }

    const lastName = document.getElementById('lastName').value;
    if (!checkName(lastName)) {
        displayError('Invalid last name!');
        return false;
    }

    const email = document.getElementById('email').value;
    if (!verifyEmail(email)) {
        displayError('Invalid email!');
        return false;
    }

    const password = document.getElementById('password').value;
    const con_password = document.getElementById('con-password').value;
    if (!verifyPassword(password, con_password)) {
        return false;
    }

    const address1 = document.getElementById('address_1').value;
    if(!verifyAddress(address1)){
        displayError('Invalid address!');
        return false;
    }

    const address2 = document.getElementById('address_2').value;
    if (address2 != '') {
        if(!verifyAddress(address2)){
            displayError('Invalid address!');
            return false;
        }
    }

    const parish = document.getElementById('parish');
    let selectedParish = parish.options[parish.selectedIndex].value;
    if (!checkParish(selectedParish)) {
        displayError('Please select a parish!');
        return false;
    }

    const dateOfBirth = document.getElementById('dob').value;
    if (!isAgeValid(dateOfBirth)) {
        displayError('Invalid age!');
        return false;
    }

    const membershipType = document.getElementById('membership_type').value;
    if (!checkLevel(membershipType, 'member')) {
        displayError('Select a Membership Type!');
        return false;
    }

    const gender = document.querySelector('input[name="gender"]:checked');
    if (!checkGender(gender)) {
        displayError('Please select a gender!');
        return false;
    }

    return true;
}

export function newTrainer() {
    
    const trainer_id = document.getElementById('trainer_id').value;
    if (!verifyIdNumber(trainer_id, 'trainer')) {
        return false;
    }

    const firstName = document.getElementById('firstName').value;
    if (!checkName(firstName)) {
        displayError('Invalid first name!');
        return false;
    }

    const lastName = document.getElementById('lastName').value;
    if (!checkName(lastName)) {
        displayError('Invalid last name!');
        return false;
    }

    const email = document.getElementById('email').value;
    if (!verifyEmail(email)) {
        displayError('Invalid email!');
        return false;
    }

    const password = document.getElementById('password').value;
    const con_password = document.getElementById('con-password').value;
    if (!verifyPassword(password, con_password)) {
        return false;
    }

    const address1 = document.getElementById('address_1').value;
    if(!verifyAddress(address1)){
        displayError('Invalid address!');
        return false;
    }

    const address2 = document.getElementById('address_2').value;
    if (address2 != '') {
        if(!verifyAddress(address2)){
            displayError('Invalid address!');
            return false;
        }
    }

    const parish = document.getElementById('parish');
    let selectedParish = parish.options[parish.selectedIndex].value;
    if (!checkParish(selectedParish)) {
        displayError('Please select a parish!');
        return false;
    }

    const dateOfBirth = document.getElementById('dob').value;
    if (!isAgeValid(dateOfBirth)) {
        displayError('Invalid age!');
        return false;
    }

    const trainer_lvl = document.getElementById('level').value
    if (!checkLevel(trainer_lvl, 'trainer')) {
        displayError('Select a level!');
        return false;
    }

    const gender = document.querySelector('input[name="gender"]:checked');
    if (!checkGender(gender)) {
        displayError('Please select a gender!');
        return false;
    }

    return true;
}

export function isEmpty(type) {
    let isValid = true; 
    if (type === 'member') {
        const form = document.forms['mem-form']
        const requiredFields = ['member_id', 'firstName', 'lastName', 'email', 'password', 'con-password',
            'address_1', 'parish', 'dob', 'membership_type'];
            document.querySelectorAll('.error-message').forEach(error => error.remove());
        requiredFields.forEach(field => {
            const input = form[field];
            if (input && input.value === '') {
                input.style.border ="2px solid red";
                fieldError(input, "Please fill in this field!");
                isValid = false
            } else {
                input.style.border = "";
            }
        });
        return isValid;
    }

    if (type === 'trainer') {
        const form = document.forms['trainer-form']
        const requiredFields = ['trainer_id', 'firstName', 'lastName', 'email', 'password', 'con-password',
            'address_1', 'parish', 'dob', 'level'];
            document.querySelectorAll('.error-message').forEach(error => error.remove());
        requiredFields.forEach(field => {
            const input = form[field];
            if (input && input.value === '') {
                input.style.border ="2px solid red";
                fieldError(input, "Please fill in this field!");
                isValid = false
            } else {
                input.style.border = "";
            }
        });
    return isValid;
    }
}