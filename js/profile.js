"use strict";

/*==================================================
    PROFILE.JS
    Student Performance Analytics Portal
    Developed by Muhammad Kumail Noor
==================================================*/

/*==========================================
    DOM ELEMENT CACHE
==========================================*/

const profileForm =
    document.getElementById("profileForm");

const profileImage =
    document.getElementById("previewImage");

const profileImageInput =
    document.getElementById("profileImage");

const removeProfileImageButton =
    document.getElementById("removeProfileImageBtn");

const profileName =
    document.getElementById("profileName");

const profileEmail =
    document.getElementById("profileEmail");

const profileRole =
    document.getElementById("profileRole");

const profileStatus =
    document.getElementById("profileStatus");

const saveProfileButton =
    document.getElementById("saveProfileBtn");

const loadingOverlay =
    document.getElementById("loadingOverlay");

const defaultProfileImage =
    "images/default-user.png";



/*==================================================
PROFILE LOADING OVERLAY
==================================================*/

function showProfileLoading() {

    if (!loadingOverlay) {
        return;
    }

    loadingOverlay.classList.add("active");

    loadingOverlay.setAttribute(
        "aria-hidden",
        "false"
    );
}


function hideProfileLoading() {

    if (!loadingOverlay) {
        return;
    }

    loadingOverlay.classList.remove("active");

    loadingOverlay.setAttribute(
        "aria-hidden",
        "true"
    );
}

/*==========================================
    CURRENT USER
==========================================*/

let currentUser = null;

/*==========================================
    AUTO INITIALIZATION
==========================================*/

document.addEventListener(

    "DOMContentLoaded",

    initializeProfile

);

/*==========================================
    MAIN INITIALIZER
==========================================*/

function initializeProfile() {

    /* Always hide saving overlay when page loads */
    hideProfileLoading();

    currentUser = getCurrentUser();

    if (!currentUser) {
        return;
    }

    loadProfile();

    initializeProfileForm();

    initializeProfileImage();

    initializeRemoveImageButton();
}























// part 2



/*==========================================
    LOAD PROFILE
==========================================*/

function loadProfile() {

    if (!currentUser) {

        return;

    }

    const fullNameInput =
        document.getElementById("fullName");

    const emailInput =
        document.getElementById("email");

    const roleInput =
        document.getElementById("role");

    const statusInput =
        document.getElementById("status");

    if (profileName) {

        profileName.textContent =
            currentUser.fullName || "";

    }

    if (profileEmail) {

        profileEmail.textContent =
            currentUser.email || "";

    }

    if (profileRole) {

        profileRole.textContent =
            currentUser.role || "Student";

    }

    if (profileStatus) {

        profileStatus.textContent =
            currentUser.status || "Active";

    }

    if (fullNameInput) {

        fullNameInput.value =
            currentUser.fullName || "";

    }

    if (emailInput) {

        emailInput.value =
            currentUser.email || "";

    }

    if (roleInput) {

        roleInput.value =
            currentUser.role || "student";

    }

    if (statusInput) {

        statusInput.value =
            currentUser.status || "Active";

    }

    if (

        profileImage &&

        currentUser.profileImage

    ) {

        profileImage.src =
            currentUser.profileImage;

    }

}

/*==========================================
    PROFILE FORM
==========================================*/

function initializeProfileForm() {

    if (!profileForm) {

        return;

    }

    profileForm.addEventListener(

        "submit",

        updateProfile

    );

}
































// part 3 



/*==========================================
    UPDATE PROFILE
==========================================*/

/*==========================================
    UPDATE PROFILE
==========================================*/

function updateProfile(event) {

    event.preventDefault();

    if (!currentUser) {
        return;
    }


    const fullNameInput =
        document.getElementById("name");

    const emailInput =
        document.getElementById("email");

    const departmentInput =
        document.getElementById("department");

    const phoneInput =
        document.getElementById("phone");

    const dobInput =
        document.getElementById("dob");

    const genderInput =
        document.getElementById("gender");

    const addressInput =
        document.getElementById("address");


    if (!fullNameInput || !emailInput) {
        return;
    }


    const fullName =
        fullNameInput.value.trim();

    const email =
        emailInput.value.trim();


    if (!validateProfile(fullName, email)) {
        return;
    }


    const existingUser =
        findUserByEmail(email);


    if (
        existingUser &&
        existingUser.id !== currentUser.id
    ) {

        showToast(
            "Email is already in use.",
            "error"
        );

        return;
    }


    /* Show loading */

    showProfileLoading();


    /* Save profile */

    currentUser.fullName =
        fullName;

    currentUser.email =
        email;

    currentUser.department =
        departmentInput?.value || "";

    currentUser.phone =
        phoneInput?.value.trim() || "";

    currentUser.dob =
        dobInput?.value || "";

    currentUser.gender =
        genderInput?.value || "";

    currentUser.address =
        addressInput?.value.trim() || "";


    updateUser(currentUser);

    setCurrentUser(currentUser);


    /* Refresh displayed profile */

    loadProfile();


    /* Hide loading */

    setTimeout(() => {

        hideProfileLoading();

        showToast(
            "Profile updated successfully."
        );

    }, 500);
}
/*==========================================
    RESET PROFILE FORM
==========================================*/

function resetProfileForm() {

    if (!currentUser) {

        return;

    }

    loadProfile();

    showToast(

        "Profile restored."

    );

}













/*==================================================
    PROFILE IMAGE
==================================================*/

function initializeProfileImage() {

    if (!profileImageInput) {
        return;
    }

    profileImageInput.addEventListener(
        "change",
        handleProfileImage
    );
}


/*==================================================
    PROFILE IMAGE UPLOAD
==================================================*/

function handleProfileImage(event) {

    const file =
        event.target.files?.[0];

    if (!file) {
        return;
    }

    /* Validate image */

    if (!file.type.startsWith("image/")) {

        showToast(
            "Please select a valid image.",
            "error"
        );

        event.target.value = "";

        return;
    }


    /* Optional size limit: 5 MB */

    if (file.size > 5 * 1024 * 1024) {

        showToast(
            "Image must be smaller than 5 MB.",
            "error"
        );

        event.target.value = "";

        return;
    }


    /* Convert image to Base64 */

    const reader =
        new FileReader();


    reader.onload = function (loadEvent) {

        const imageData =
            loadEvent.target.result;


        /* Show image immediately */

        if (profileImage) {

            profileImage.src =
                imageData;
        }


        /* Save image with current user */

        if (currentUser) {

            currentUser.profileImage =
                imageData;

            updateUser(currentUser);

            setCurrentUser(currentUser);
        }


        showToast(
            "Profile picture updated successfully."
        );
    };


    reader.onerror = function () {

        showToast(
            "Unable to read the selected image.",
            "error"
        );
    };


    reader.readAsDataURL(file);
}


/*==================================================
    REMOVE PROFILE IMAGE
==================================================*/

function removeProfileImage() {

    if (!currentUser) {
        return;
    }


    /* Restore default image */

    if (profileImage) {

        profileImage.src =
            defaultProfileImage;
    }


    /* Remove saved image */

    currentUser.profileImage =
        "";


    updateUser(currentUser);

    setCurrentUser(currentUser);


    /* Clear file input */

    if (profileImageInput) {

        profileImageInput.value =
            "";
    }


    showToast(
        "Profile picture removed."
    );
}


/*==================================================
    REMOVE IMAGE BUTTON
==================================================*/

function initializeRemoveImageButton() {

    if (!removeProfileImageButton) {
        return;
    }

    removeProfileImageButton.addEventListener(
        "click",
        removeProfileImage
    );
}











// part 5


/*==========================================
    REMOVE IMAGE BUTTON
==========================================*/

const removeProfileImageButton =
    document.getElementById(
        "removeProfileImageBtn"
    );

/*==========================================
    INITIALIZE REMOVE BUTTON
==========================================*/

function initializeRemoveImageButton() {

    if (!removeProfileImageButton) {

        return;

    }

    removeProfileImageButton.addEventListener(

        "click",

        removeProfileImage

    );

}

/*==========================================
    PROFILE VALIDATION
==========================================*/

function validateProfile(

    fullName,

    email

) {

    if (

        !fullName ||

        !email

    ) {

        showToast(

            "Please complete all required fields.",

            "error"

        );

        return false;

    }

    const emailPattern =

        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (

        !emailPattern.test(email)

    ) {

        showToast(

            "Please enter a valid email address.",

            "error"

        );

        return false;

    }

    return true;

}

/*==========================================
    REFRESH PROFILE
==========================================*/

function refreshProfile() {

    currentUser = getCurrentUser();

    loadProfile();

}




























// part 6



/*==========================================
    MAIN INITIALIZER
==========================================*/

function initializeProfile() {

    currentUser = getCurrentUser();

    if (!currentUser) {

        return;

    }

    loadProfile();

    initializeProfileForm();

    initializeProfileImage();

    initializeRemoveImageButton();

}

/*==========================================
    PUBLIC API
==========================================*/

window.profile = {

    refresh: refreshProfile,

    reset: resetProfileForm,

    removeImage: removeProfileImage,

    getCurrentUser() {

        return currentUser;

    }

};