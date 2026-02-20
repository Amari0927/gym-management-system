import { memberUserInput, trainerUserInput, adminUserInput } from "./scripts/auth.js";
import { generateId, displaySuccess, displayPopUp } from "./scripts/helpers.js";
import { getAllTrainers, getAllClients, showLevels, showParishes, updateForm, updateClient, updateTrainer } from "./scripts/dataLoaders.js";
import { newMember, newTrainer, isEmpty } from "./scripts/formHandlers.js";


document.addEventListener('DOMContentLoaded', async () => {
    
    // Member Login page
    const memberLoginBtn = document.getElementById('member-login');
    if (memberLoginBtn) {
        memberLoginBtn.addEventListener('click', async (event) => {
            event.preventDefault();
                await memberUserInput();
        });
    }

    // Trainer login page
    const trainerLoginBtn = document.getElementById('trainer-login');
    if (trainerLoginBtn) {
        trainerLoginBtn.addEventListener('click', async (event) => {
            event.preventDefault();
                await trainerUserInput();
        });
    }

    //Admin login page
    const adminLoginBtn = document.getElementById('admin-login');
    if (adminLoginBtn) {
        adminLoginBtn.addEventListener('click', async (event) => {
            event.preventDefault();
                await adminUserInput();
        });
    }

    // Trainer recovery button
    const recoverTrainerBtn = document.getElementById('recover-trainer-btn');
    if (recoverTrainerBtn) {
        recoverTrainerBtn.addEventListener('click', findLostTrainerPassword);
    }
    
    // Admin recovery button
    const recoverAdminBtn = document.getElementById('recover-admin-btn');
    if (recoverAdminBtn) {
        recoverAdminBtn.addEventListener('click', findLostManagerPassword);
    }
    const adminMem = document.getElementById('admin-mem');
    if (adminMem) {
        adminMem.addEventListener('DOMContentLoaded', displayPopUp("Loading membership (training) data. Please wait...") ,getAllClients());
    }
    const adminTrainer = document.getElementById('admin-trainer');
    if (adminTrainer) {
        adminTrainer.addEventListener('DOMContentLoaded',displayPopUp("Loading membership (training) data. Please wait...") ,getAllTrainers());
    }

    const memberIdGenerateLink = document.getElementById("generate-member-id");
    if (memberIdGenerateLink) {
        memberIdGenerateLink.addEventListener('click', (event) => {
            event.preventDefault();
            generateId('member')
            }
        );
    }

    const trainerIdGenerateLink = document.getElementById("generate-trainer-id");
    if (trainerIdGenerateLink) {
        trainerIdGenerateLink.addEventListener('click', (event) => {
            event.preventDefault();
            generateId('trainer');});
    }

    const newMemberPage = document.getElementById('new-mem');
    if (newMemberPage) {
        newMemberPage.addEventListener('DOMContentLoaded', showParishes(), showLevels('member'));
    }

    const newTrainerPage = document.getElementById('new-trainer');
    if (newTrainerPage) {
        newTrainerPage.addEventListener('DOMContentLoaded', showParishes(), showLevels('trainer'));
    }

    const updateMemberPage = document.getElementById("update-mem-pg");
    if (updateMemberPage) {
            await showParishes();
            await showLevels('member');
            updateForm('member');
    }

    const updateTrainerPage = document.getElementById("update-trainer-pg");
    if (updateTrainerPage) {
            await showParishes();
            await showLevels('trainer');
            updateForm('trainer');
    }

    const newMemberSubmitBtn = document.getElementById('register-member');
    if (newMemberSubmitBtn) {
        newMemberSubmitBtn.addEventListener('click', async (event) => {
            event.preventDefault();
            if (isEmpty('member')) {
                if (newMember()) {
                    try {
                        const formData = new FormData(document.getElementById('mem-form'));
                        const response = await fetch('http://localhost:8080/addMember', {
                            method: 'POST',
                            body: new URLSearchParams(formData),
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
            }
        });
    }

    const newTrainerSubmitBtn = document.getElementById('register-trainer');
    if (newTrainerSubmitBtn) {
        newTrainerSubmitBtn.addEventListener('click', async (event) => {
            event.preventDefault();
            if (isEmpty('trainer')) {
                if (newTrainer()) {
                    try {
                        const formData = new FormData(document.getElementById('trainer-form'));
                        const response = await fetch('http://localhost:8080/addTrainer', {
                            method: 'POST',
                            body: new URLSearchParams(formData),
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
            }
        })
    }
/*
    const updateMemberBtn = document.getElementById('update-member');
    if (updateMemberBtn) {
        updateMemberBtn.addEventListener('click', async (event) => {
            event.preventDefault();
            const currentId = document.getElementById('member_id').value;
            await updateClient(currentId);
        })
    }
    
    const updateTrainerBtn = document.getElementById('update-trainer');
    if (updateTrainerBtn) {
        updateTrainerBtn.addEventListener('click', async (event) => {
            event.preventDefault();
            const currentId = document.getElementById('trainer_id').value;
            await updateTrainer(currentId);
        })
    }
*/
    // **Update Member Button** – Ensure only one listener
    const updateMemberBtn = document.getElementById('update-member');
    if (updateMemberBtn) {
        updateMemberBtn.addEventListener('click', async (event) => {
            event.preventDefault();
            const currentId = document.getElementById('member_id').value;
            console.log("Update Member Button Clicked");
            await updateClient(currentId);
        });
    }
    
    // **Update Trainer Button** – Ensure only one listener
    const updateTrainerBtn = document.getElementById('update-trainer');
    if (updateTrainerBtn) {
        updateTrainerBtn.addEventListener('click', async (event) => {
            event.preventDefault();
            const currentId = document.getElementById('trainer_id').value;
            console.log("Update Trainer Button Clicked");
            await updateTrainer(currentId);
        });
    }

});
