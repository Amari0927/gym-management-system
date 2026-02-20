import { displayError, displayPopUp } from "./helpers.js";
import { verifyIdNumber, verifyPassword, verifyEmail } from "./validation.js";

let count = 0;
export async function memberUserInput() {
    const member_id  = document.getElementById('member-login-number').value;
    const password = document.getElementById('member-password').value;
    if (!verifyIdNumber(member_id, "member")) {
        displayError('Invalid membership number!');
        incrementFailedAttempts('member');
        return false;
    }
    if (!verifyPassword(password)) {
        displayError('Invalid password!');
        incrementFailedAttempts('member');
        return false;
    }
    const info = JSON.stringify(
        {
        member_id : member_id,
        password : password,
        type : "member"
        }
    );
    try {
        const response = await fetch("http://localhost:8080/loginUser", {
            method: 'POST',
            headers:{'Content-Type': 'application/json'},
            body: info
        });
        const data = await response.json();
        if (response.ok) {
            let curUser = {
                member_id: data.credential,
                firstName: data.firstName, 
                lastName: data.lastName
            }
            sessionStorage.setItem('member', JSON.stringify(curUser));
            window.location.href = 'member_console.html';
        } else {
            displayError('Invalid Id or password!');
            incrementFailedAttempts('member');
        }
    } catch (error) {
        console.error('Fetch error', error);
        displayError('Server error. Please try again later.');
        return;
    }   
}


export async function trainerUserInput() {
    const email = document.getElementById('email').value;
    console.log("Email", email);
    const password = document.getElementById('password').value;
    if (!verifyEmail(email)) {
        displayError("Invalid email!");
        incrementFailedAttempts('trainer');
        return false;
    }
    if (!verifyPassword(password)) {
        displayError("Invalid password!");
        incrementFailedAttempts('trainer');
        return false;
    }
    const info = JSON.stringify(
        {
            email: email,
            password: password,
            type: "trainer"
        }
    );
    try {
        const response = await fetch("http://localhost:8080/loginUser", {
            method: 'POST',
            headers:{'Content-Type': 'application/json'},
            body: info
        });
        const data =  await response.json();
        if (response.ok) {
            let curUser = {
                member_id: data.credential,
                firstName: data.firstName, 
                lastName: data.lastName
            }
            sessionStorage.setItem('trainer', JSON.stringify(curUser));
            window.location.href = 'trainer_client.html';
            return;
        } else {
            displayError('Invalid email or password!');
            incrementFailedAttempts('trainer');
        }
    } catch (error) {
        console.error('Fetch error', error);
        displayError('Server error. Please try again later.');
        return;
    }
}


export async function adminUserInput() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    if (!verifyEmail(email)) {
        displayError("Invalid email!");
        incrementFailedAttempts('manager');
        return false;
    }
    if (!verifyPassword(password)) {
        displayError("Invalid password!");
        incrementFailedAttempts('manager');
        return false;
    }
    const info = JSON.stringify(
        {
            email: email,
            password: password,
            type: "manager"
        }
    );
    try {
        const response = await fetch("http://localhost:8080/loginUser", {
            method: 'POST',
            headers:{'Content-Type': 'application/json'},
            body: info
        });
        const data =  await response.json();
        if (response.ok) {
            let curUser = {
                member_id: data.credential,
                firstName: data.firstName, 
                lastName: data.lastName
            }
            sessionStorage.setItem('manager', JSON.stringify(curUser));
            window.location.href = 'admin_members.html';
        } else {
            displayError('Invalid email or password!');
            incrementFailedAttempts('manager');
        }
    } catch (error) {
        console.error('Fetch error', error);
        displayError('Server error. Please try again later.');
        return;
    }
}



// trainer password recovery function
export function findLostTrainerPassword() {
    const employeeTrainer = document.getElementById('employeeTrainer').value;
    if (employeeTrainer === 'trainer') {
        const trainerEmail = document.getElementById('trainer-recover').value;
        if (!verifyEmail(trainerEmail)) {
            return false;
        }

        const storedTrainer = JSON.parse(localStorage.getItem('trainers'));
        for (let i = 0; i <storedTrainer.length; i++) {
            if (storedTrainer[i].email === trainerEmail) {
                displayPopUp('Recovery link sent');
                return true;
            }
        }

        displayPopUp(`No account associated with email: ${trainerEmail}`);
        return false;
    }
}

// manager password recovery function
export function findLostManagerPassword() {
    const employeeManager = document.getElementById('employeeManager').value;
    if (employeeManager === 'manager') {
        const managerEmail = document.getElementById('manager-recover').value;
        if (!verifyEmail(managerEmail)) {
            return false;
        }

        const storedManager = JSON.parse(localStorage.getItem('managers'));
        for (let i = 0; i <storedManager.length; i++) {
            if (storedManager[i].email === managerEmail) {
                displayPopUp('Recovery link sent');
                return true;
            }
        }

        displayPopUp(`No account associated with email: ${managerEmail}`);
        return false;
    }

}



function incrementFailedAttempts(type) {
    count++;
    sessionStorage.setItem('loginAttempts', count);
    if (count >= 3) {
        displayError('Too many failed attempts. Try again later.');
        lockFields(type);
    }
}
function lockFields(type) {
    if (type === 'member') {
        document.getElementById('member-login-number').disabled = true;
        document.getElementById('member-password').disabled = true;
        setTimeout(() => {
            document.getElementById('member-login-number').disabled = false;
            document.getElementById('member-password').disabled = false;
            count = 0;
            sessionStorage.removeItem('loginAttempts');
        }, 10000);
    }
    if (type === 'trainer') {
        document.getElementById('email').disabled = true;
        document.getElementById('password').disabled = true;
        setTimeout(() => {
            document.getElementById('email').disabled = false;
            document.getElementById('password').disabled = false;
            count = 0;
            sessionStorage.removeItem('loginAttempts');
        }, 10000);
    }
    if (type === 'manager') {
        document.getElementById('email').disabled = true;
        document.getElementById('password').disabled = true;
        setTimeout(() => {
            document.getElementById('email').disabled = false;
            document.getElementById('password').disabled = false;
            count = 0;
            sessionStorage.removeItem('loginAttempts');
        }, 10000);
    }
}