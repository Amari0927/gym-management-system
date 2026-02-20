import { displaySuccess } from "./helpers.js";


export async function showLevels(type) {
    try {
        const response = await fetch('http://localhost:8080/levels');
        if (response.ok) {
            const data = await response.json();
            let selectElement;
            if (type === "member") {
                selectElement = '<select name="membership_type" id="membership_type">';
                selectElement += '<option value="">Select Membership Type</option>';
                // Filter the levels for member types
                const memberLevels = data.filter(level => level.member_level_name !== undefined);
                for (let i = 0; i < memberLevels.length; i++) {
                    const levelName = memberLevels[i].member_level_name;
                    selectElement += `<option value='${levelName}'>${levelName}</option>`;
                }
                selectElement += '</select>';
                document.querySelector('.form-div #membership-sec').insertAdjacentHTML('afterend', selectElement);
            }
            
            if (type === "trainer") {
                selectElement = '<select name="level" id="level">';
                selectElement += '<option value="">Select Level</option>';
                // Filter the levels for trainer types
                const trainerLevels = data.filter(level => level.trainer_level_name !== undefined);
                for (let i = 0; i < trainerLevels.length; i++) {
                    const levelName = trainerLevels[i].trainer_level_name;
                    selectElement += `<option value='${levelName}'>${levelName}</option>`;
                }
                selectElement += '</select>';
                document.querySelector('.form-div #trainer-lvl-sec').insertAdjacentHTML('afterend', selectElement);
            }
        } else {
            throw new Error("Network response was not ok " + response.statusText);
        }
    } catch (error) {
        console.error('Fetch error', error);
        return;
    }
}


export async function showParishes() {
    try {
        const response = await fetch('http://localhost:8080/parishes');
        if (response.ok) {
            const data = await response.json();
            var selectElement = '<select name="parish" id="parish">';
            selectElement += '<option value="">-- Choose One --</option>';
            for (const parish of data) {
                const keys = Object.keys(parish);
                const parishKey = keys.find(key => key !== '_id');
                const parishName = parish[parishKey];
                selectElement += `<option value='${parishName}'>${parishName}</option>`;
            }
            selectElement += '</select>';
            const container = document.querySelector('.form-div #parish-sec');
            if (container) {
                container.insertAdjacentHTML('afterend', selectElement);
            }
        } else {
            throw new Error("Network response was not ok " + response.statusText);
        }
    } catch (error) {
        console.error('Fetch error', error);
        return;
    }
}


export async function getAllClients() {
    const tableBody = document.querySelector('.table-sec table tbody');
    tableBody.innerHTML = ''; 
    try {
        const response = await fetch('http://localhost:8080/client/all');
        if (!response.ok) {
            throw new Error("Network response was not ok" + response.statusText);
        }
        const clientData = await response.json();
        clientData.forEach(member => {
            const row = document.createElement('tr');
            row.innerHTML = `
            <td><a href="${member.member_id}" class="member-edit-btn">Edit</a></td>
            <td><a href="${member.member_id}" class="member-cancel-btn">Cancel</a></td>
            <td><a href="#">Renew</a></td>
            <td>${member.membership_type}</td>
            <td>${member.firstName}</td>
            <td>${member.lastName}</td>
        `;
        tableBody.appendChild(row);
        });
    } catch (error) {
        console.error('Fetch error', error);
    }
    tableBody.addEventListener('click', async (event) => {
        const target = event.target;
        event.preventDefault(); // Prevent default link behavior
        if (target && target.classList.contains('member-edit-btn')) {
            const id = target.getAttribute('href');
            await getClient(id);
        }
        if (target && target.classList.contains('member-cancel-btn')) {
            const id = target.getAttribute('href'); // Extract the ID
            await removeClient(id); // Call the removeClient function
        }
    });
}

export async function getAllTrainers() {
    const tableBody = document.querySelector('.table-sec table tbody');
    tableBody.innerHTML = ''; 
    try {
        const response = await fetch('http://localhost:8080/trainer/all');
        if (!response.ok) {
            throw new Error("Network response was not ok: " + response.statusText);
        }
        const trainerData = await response.json();
        trainerData.forEach(trainer => {
            const row = document.createElement('tr');
            row.innerHTML = `
            <td><a href="${trainer.trainer_id}" class="trainer-edit-btn">Edit</a></td>
            <td><a href="${trainer.trainer_id}" class="trainer-deactivate-btn">Deactivate</a></td>
            <td><a href="#">Renew</a></td>
            <td>${trainer.level}</td>
            <td>${trainer.firstName}</td>
            <td>${trainer.lastName}</td>
            `;
            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error('Fetch error:', error);
    }

    tableBody.addEventListener('click', async (event) => {
        const target = event.target;
        event.preventDefault(); // Prevent default link behavior
        if (target && target.classList.contains('trainer-edit-btn')) {
            const id = target.getAttribute('href');
            await getTrainer(id);
        }
        if (target && target.classList.contains('trainer-deactivate-btn')) {
            const id = target.getAttribute('href'); // Extract the ID
            await removeTrainer(id); // Call the removeTrainer function
        }
    });

}


async function removeClient(id) {
    try {
        const response = await fetch(`http://localhost:8080/client/remove/${id}`,
                { method: 'POST' });
        if (!response.ok) {
            throw new Error("Failed to remove client");
        }
        await getAllClients(); 
    } catch (error) {
        console.error("Error removing client:", error);
    }
}

async function removeTrainer(id) {
    try {
        const response = await fetch(`http://localhost:8080/trainer/remove/${id}`,
                { method: 'POST' });
        if (!response.ok) {
            throw new Error("Failed to remove trainer");
        }
        await getAllTrainers();
    } catch (error) {
        console.error("Error removing trainer:", error);
    }
}

async function getClient(id) {
    try {
        const response = await fetch(`http://localhost:8080/client/${id}`);
        if (!response.ok) {
            throw new Error("Network response was not ok " + response.statusText);
        }
        const data = await response.json();
        sessionStorage.setItem('memberToEdit', JSON.stringify(data));
        window.location.href = '../update_member.html'; 
    } catch (error) {
        console.error('Fetch error', error);
    }
}


export async function updateClient(id) {
    try {
        const formData = new FormData(document.getElementById('update-mem-form'));
        const data = Object.fromEntries(formData.entries());

        const response = await fetch(`http://localhost:8080/client/update/${id}`, {
            method: 'PUT', // Ensure this matches the server's method
            headers: {
                'Content-Type': 'application/json', // This tells the server to expect JSON data
            },
            body: JSON.stringify(data), // Convert the data to JSON string
        });

        if (!response.ok) {
            throw new Error(`Submission failed: ${response.status} ${response.statusText}`);
        }

        const responseData = await response.json();
        displaySuccess(responseData.message); // Assuming displaySuccess handles the success response
    } catch (error) {
        console.error('Error:', error);
    }
}

export async function updateTrainer(id) {
    try {
        const formData = new FormData(document.getElementById('update-trainer-form'));
        const data = Object.fromEntries(formData.entries());
        const response = await fetch(`http://localhost:8080/trainer/update/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            throw new Error(`Submission failed: ${response.status} ${response.statusText}`);
        }
        const responseData =  await response.json();
        displaySuccess(responseData.message)
    } catch (error) {
        console.error('Error:', error);
    }
}

export function updateForm(type) {
    if (type === "member") {
        const memInfo = JSON.parse(sessionStorage.getItem('memberToEdit'));
        if (memInfo) {
            document.getElementById('member_id').value = memInfo.member_id;
            document.getElementById('firstName').value = memInfo.firstName;
            document.getElementById('lastName').value = memInfo.lastName;
            document.getElementById('email').value = memInfo.email;
            document.getElementById('password').value = memInfo.password;
            document.getElementById('con-password').value = memInfo.password;
            document.getElementById('address_1').value = memInfo.address_1;
            document.getElementById('address_2').value = memInfo.address_2;
            document.getElementById('parish').value = memInfo.parish;
            document.getElementById('membership_type').value = memInfo.membership_type;
            document.getElementById('dob').value = memInfo.dob;
            const genderRadio = document.querySelector(`input[name="gender"][value="${memInfo.gender}"]`);
            if (genderRadio) {
                genderRadio.checked = true;
            }
        }
    }

    if (type === "trainer") {
        const trainerInfo = JSON.parse(sessionStorage.getItem('trainerToEdit'));
        if (trainerInfo) {
            document.getElementById('trainer_id').value = trainerInfo.trainer_id;
            document.getElementById('firstName').value = trainerInfo.firstName;
            document.getElementById('lastName').value = trainerInfo.lastName;
            document.getElementById('email').value = trainerInfo.email;
            document.getElementById('password').value = trainerInfo.password;
            document.getElementById('con-password').value = trainerInfo.password;
            document.getElementById('address_1').value = trainerInfo.address_1;
            document.getElementById('address_2').value = trainerInfo.address_2;
            document.getElementById('parish').value = trainerInfo.parish;
            document.getElementById('level').value = trainerInfo.level;
            document.getElementById('dob').value = trainerInfo.dob;
            const genderRadio = document.querySelector(`input[name="gender"][value="${trainerInfo.gender}"]`);
            if (genderRadio) {
                genderRadio.checked = true;
            }
        }
    }
}


async function getTrainer(id) {
    try {
        const response = await fetch(`http://localhost:8080/trainer/${id}`);
        if (!response.ok) {
            throw new Error("Network response was not ok " + response.statusText);
        }
        const data = await response.json();
        sessionStorage.setItem('trainerToEdit', JSON.stringify(data));
        window.location.href = '../update_trainer.html';
    } catch (error) {
        console.error('Fetch error', error);
    }
}






