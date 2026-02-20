// Invalid info error message function
export function displayError(message) {
    const errorDiv = document.getElementById('error-message');
    errorDiv.innerHTML = `<p style="color: red; font-size: 14px; font-weight: 500;">${message}</p>`;
    setTimeout(() => {
        errorDiv.innerHTML='';
    }, 3000);
}

export function displaySuccess(message) {
    const successDiv = document.getElementById('success-message');
    successDiv.innerHTML = `<p style="color: green; font-size: 14px; font-weight: 500;">${message}</p>`;
    setTimeout(() => {
        successDiv.innerHTML='';
    }, 3000);
}

export function fieldError(element, message){
    const error = document.createElement('span');
    error.className = 'error-message';
    error.style.color = 'red';
    error.style.fontSize = 'small';
    error.style.marginLeft = '10px';
    error.textContent = message;
    element.parentElement.insertBefore(error, element.nextSibling);
}

// popup message function
export function displayPopUp(message) {
    let popup = document.getElementById("pop");
    popup.innerText = message;
    popup.style.visibility = "visible"; 
    popup.classList.add("show");

    setTimeout(() => {
        popup.style.visibility = "hidden";
        popup.classList.remove("show");
    }, 3000);
}



export const generateId = function (type) {
    if (type !== "member" && type !== 'trainer') 
        {
            displayError('Invalid parameter value received for function verifyIdNumbers()');
            return false;
        } 

    if (type === 'member') {
        let newId = String(Math.floor(Math.random() * (999999 - 900000 + 1)) + 900000);
        let storedMember = JSON.parse(localStorage.getItem('members'));
        let i = 0;
        while (i < storedMember.length) {
            if (newId === storedMember[i].member_id) {
                newId = String(Math.floor(Math.random() * (999999 - 900000 + 1)) + 900000);
                i = 0;
            }
            i++;
        }
        document.getElementById('member_id').value = newId;
        return true;
    }

    if (type === 'trainer') {
        let newId = String(Math.floor(Math.random() * (799999 - 700000 + 1)) + 700000);
        let storedTrainer = JSON.parse(localStorage.getItem('trainers'))
        let i = 0;
        while (i < storedTrainer.length) {
            if (newId === storedTrainer[i].member_id) {
                newId = String(Math.floor(Math.random() * (799999 - 700000 + 1)) + 700000);
                i = 0;
            }
            i++;
        }
        document.getElementById('trainer_id').value = newId;
        return true;
    }
    
} 


