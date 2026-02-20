import {displayError} from "./helpers.js";

export function verifyIdNumber(id, type) 
{
    if (type !== "member" && type !== "trainer") 
    {
        displayError('Invalid parameter value received for function verifyIdNumbers()');
        return false;
    } 
    if (id.length === 6 && (id.charAt(0) === '9' || id.charAt(0) === '7') && !isNaN(id.slice(1))) {
        return true;
    }
    return false;
}

export function verifyEmail(email) {
    if ((email.includes("fitnessuniverse.com") === true) || 
    (email.includes("fitnessuniverse.bb") === true) || 
    (email.includes("fitnessu.life") === true)) {
        return true;
    }
    return false;
}

export function verifyPassword(pwd, confirmpwd='', confirm=false) {
    if ((pwd.length < 8 || pwd.length > 16)) {
        displayError('Invalid password length!');
        return false;
    }

    const specialChars = ['&', '$', '#', '@'];
    let isSpecial = false;
    let isUpper = false;
    let isNum = false;

    for (let i = 0; i < pwd.length; i++) {
        const letter = pwd[i];

        if (specialChars.includes(letter)) {
            isSpecial = true;
        }

        if (letter >= 'A' && letter <= 'Z') {
            isUpper = true;
        }

        if (letter >= '0' && letter <= '9') {
            isNum = true;
        }

        if (isSpecial && isUpper && isNum) {
            break;
        } 
    }
    if (!(isSpecial && isUpper && isNum)) {
        displayError('Invalid password');
        return false;
    }
    if (confirmpwd !== '') {
        if (pwd === confirmpwd) {
            confirm =true;
            return true;
        } else {
            displayError('Passwords do not match!'); 
            return false;
        }
    } else {
        return true;
    }
    
    
}

export function checkName(name) {
    for (let i = 0; i < name.length; i++) {
        if (!(name[i] >= 'A' && name[i] <= 'Z') && 
            !(name[i] >= 'a' && name[i] <= 'z')) {
            return false; 
        }
    }
    return true; 
}


export function verifyAddress(addr) {
    for (let i = 0; i < addr.length; i++) {
        if (!(addr[i] >= 'a' && addr[i] <= 'z') &&
            !(addr[i] >= 'A' && addr[i] <= 'Z') &&
            !(addr[i] >= '0' && addr[i] <= '9') &&
            !(addr[i] == ' ')) {
            return false;
        }
    }
    return true;
}

export function isAgeValid(date) {
    const dob = new Date(date);
    const today = new Date();
    let age = today.getFullYear() - dob.getFullYear();
    if (age < 18) {
        return false;
    }
    return true;
}

export function checkLevel(level, type) {
    if (type === 'member') {
        if (level.value === "Select Membership Type") {
            return false;
        }
        return true;
    }

    if (type === 'trainer') {
        if (level.type === 'Select Level') {
            return false;
        }
        return true;
    }
}


export function checkParish(parish) {
    if (parish.value === "-- Choose One --") {
        return false;
    }
    return true;
}

export function checkGender(gender) {
    if (gender === null) {
        return false;
    }
    return true;
}