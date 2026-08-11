
// it is done

"use strict";

/*==================================================
    AUTH.JS
    Student Performance Analytics Portal
    Developed by Muhammad Kumail Noor
==================================================*/

/*==========================================
    DOM ELEMENT CACHE
==========================================*/

const loginForm =
    document.getElementById("loginForm");

const registerForm =
    document.getElementById("registerForm");

const forgotPasswordForm =
    document.getElementById("forgotPasswordForm");

const resetPasswordForm =
    document.getElementById("resetPasswordForm");

// const logoutButton =
//     document.getElementById("logoutBtn");

const logoutButton = document.getElementById("logoutLink");

const rememberMeCheckbox =
    document.getElementById("rememberMe");




/*==================================================
    PASSWORD VISIBILITY TOGGLE
==================================================*/

function setupPasswordToggle(buttonId, inputId) {

    const toggleButton = document.getElementById(buttonId);
    const passwordInput = document.getElementById(inputId);

    if (!toggleButton || !passwordInput) {
        return;
    }

    toggleButton.addEventListener("click", function () {

        const isPassword = passwordInput.type === "password";

        passwordInput.type = isPassword ? "text" : "password";

        toggleButton.textContent = isPassword ? "🙈" : "👁";

        toggleButton.setAttribute(
            "aria-label",
            isPassword ? "Hide Password" : "Show Password"
        );

    });
}


/*==================================================
    INITIALIZE PASSWORD TOGGLES
==================================================*/

setupPasswordToggle("togglePassword", "password");

setupPasswordToggle("toggleConfirmPassword", "confirmPassword");







/*==========================================
    PAGE DETECTION
==========================================*/

const currentPage =
    window.location.pathname
        .split("/")
        .pop()
        .toLowerCase();

/*==========================================
    INITIALIZATION
==========================================*/

document.addEventListener(
    "DOMContentLoaded",
    initializeAuthentication
);

/*==========================================
    MAIN INITIALIZER
==========================================*/

// function initializeAuthentication() {

//     initializeLoginForm();

//     initializeRegisterForm();

//     initializeForgotPasswordForm();

//     initializeResetPasswordForm();

//     initializeLogoutButton();

//     initializeRememberMe();

//     validateUserSession();

// }

/*==========================================
    LOGIN FORM
==========================================*/

function initializeLoginForm() {

    if (!loginForm) {

        return;

    }

    loginForm.addEventListener(

        "submit",

        handleLogin

    );

}

/*==========================================
    REGISTER FORM
==========================================*/

function initializeRegisterForm() {

    if (!registerForm) {

        return;

    }

    registerForm.addEventListener(

        "submit",

        handleRegister

    );

}

/*==========================================
    FORGOT PASSWORD FORM
==========================================*/

function initializeForgotPasswordForm() {

    if (!forgotPasswordForm) {

        return;

    }

    forgotPasswordForm.addEventListener(

        "submit",

        handleForgotPassword

    );

}

/*==========================================
    RESET PASSWORD FORM
==========================================*/

function initializeResetPasswordForm() {

    if (!resetPasswordForm) {

        return;

    }

    resetPasswordForm.addEventListener(

        "submit",

        handleResetPassword

    );

}

/*==========================================
    LOGOUT BUTTON
==========================================*/

function initializeLogoutButton() {

    if (!logoutButton) {

        return;

    }

    logoutButton.addEventListener(

        "click",

        logoutUser

    );

}













































// part 2 


/*==========================================
    REMEMBER ME
==========================================*/

function initializeRememberMe() {

    if (!rememberMeCheckbox || !loginForm) {

        return;

    }

    const rememberedEmail = getRememberedUser();

    if (!rememberedEmail) {

        return;

    }

    const emailInput = document.getElementById("email");

    if (!emailInput) {

        return;

    }

    emailInput.value = rememberedEmail;

    rememberMeCheckbox.checked = true;

}

/*==========================================
    SAVE REMEMBER ME
==========================================*/

function updateRememberMe(email) {

    if (!rememberMeCheckbox) {

        return;

    }

    if (rememberMeCheckbox.checked) {

        rememberUser(email);

    }

    else {

        forgetRememberedUser();

    }

}

/*==========================================
    SESSION VALIDATION
==========================================*/

function validateUserSession() {

    const protectedPages = [

        "dashboard.html",

        "student.html",

        "teacher.html",

        "admin.html",

        "profile.html"

    ];

    if (!protectedPages.includes(currentPage)) {

        return;

    }

    const currentUser = getCurrentUser();

    if (!currentUser) {

        window.location.replace("login.html");

    }

}

/*==========================================
    LOGOUT USER
==========================================*/

function logoutUser() {

    clearCurrentUser();

    showToast(

        "Logged out successfully."

    );

    setTimeout(() => {

        window.location.href = "login.html";

    }, 500);

}



















// part 3

/*==========================================
    LOGIN
==========================================*/

function handleLogin(event) {

    event.preventDefault();

    const emailInput = document.getElementById("email");

    const passwordInput = document.getElementById("password");

    if (!emailInput || !passwordInput) {

        return;

    }

    const email = emailInput.value.trim();

    const password = passwordInput.value;

    if (!email || !password) {

        showToast(

            "Please fill in all required fields.",

            "error"

        );

        return;

    }

    const user = findUserByEmail(email);

    if (!user) {

        showToast(

            "Account not found.",

            "error"

        );

        return;

    }

    if (user.password !== password) {

        showToast(

            "Incorrect password.",

            "error"

        );

        return;

    }

    setCurrentUser(user);

    updateRememberMe(email);

    showToast(

        "Login successful."

    );

    setTimeout(() => {

        redirectUser(user);

    }, 600);

}

/*==========================================
    USER REDIRECTION
==========================================*/

function redirectUser(user) {

    switch (user.role?.toLowerCase()) {

        case "admin":

            window.location.href = "admin.html";

            break;

        case "teacher":

            window.location.href = "teacher.html";

            break;

        default:

            window.location.href = "student.html";

            break;

    }

}

























// part 4

/*==========================================
    REGISTER
==========================================*/

function handleRegister(event) {

    event.preventDefault();

    const fullNameInput =
        document.getElementById("fullName");

    const emailInput =
        document.getElementById("email");

    const passwordInput =
        document.getElementById("password");

    const confirmPasswordInput =
        document.getElementById("confirmPassword");

    const roleInput =
        document.getElementById("role");

    if (

        !fullNameInput ||

        !emailInput ||

        !passwordInput ||

        !confirmPasswordInput

    ) {

        return;

    }

    const fullName =
        fullNameInput.value.trim();

    const email =
        emailInput.value.trim();

    const password =
        passwordInput.value;

    const confirmPassword =
        confirmPasswordInput.value;

    const role =
        roleInput?.value || "student";

    if (

        !fullName ||

        !email ||

        !password ||

        !confirmPassword

    ) {

        showToast(

            "Please fill in all required fields.",

            "error"

        );

        return;

    }

    if (password.length < 8) {

        showToast(
            "Password must contain at least 8 characters.",
            "error"
        );

        return;

    }

    if (password !== confirmPassword) {

        showToast(

            "Passwords do not match.",

            "error"

        );

        return;

    }
    if (password.length < 8) {

        showToast(
            "Password must contain at least 8 characters.",
            "error"
        );

        return;

    }

    if (findUserByEmail(email)) {

        showToast(

            "Email is already registered.",

            "error"

        );

        return;

    }

    const newUser = {

        id: crypto.randomUUID(),

        fullName,

        email,

        password,

        role,

        createdAt: new Date().toISOString(),

        status: "Active"

    };

    if (!addUser(newUser)) {

        showToast(

            "Unable to create account.",

            "error"

        );

        return;

    }

    showToast(

        "Registration successful."

    );

    setTimeout(() => {

        window.location.href = "login.html";

    }, 800);

}

























// part 5


/*==========================================
    FORGOT PASSWORD
==========================================*/

function handleForgotPassword(event) {

    event.preventDefault();

    const emailInput = document.getElementById("email");

    if (!emailInput) {

        return;

    }

    const email = emailInput.value.trim();

    if (!email) {

        showToast(

            "Please enter your email.",

            "error"

        );

        return;

    }

    const user = findUserByEmail(email);

    if (!user) {

        showToast(

            "No account found with this email.",

            "error"

        );

        return;

    }

    sessionStorage.setItem(

        "passwordResetEmail",

        email

    );

    showToast(

        "Email verified."

    );

    setTimeout(() => {

        window.location.href = "reset-password.html";

    }, 700);

}

/*==========================================
    RESET PASSWORD
==========================================*/

function handleResetPassword(event) {

    event.preventDefault();

    const passwordInput = document.getElementById(

        "newPassword"

    );

    const confirmInput = document.getElementById(

        "confirmPassword"

    );

    if (

        !passwordInput ||

        !confirmInput

    ) {

        return;

    }

    const password = passwordInput.value;

    const confirmPassword = confirmInput.value;

    if (

        !password ||

        !confirmPassword

    ) {

        showToast(

            "Please complete all fields.",

            "error"

        );

        return;

    }

    if (

        password !== confirmPassword

    ) {

        showToast(

            "Passwords do not match.",

            "error"

        );

        return;

    }

    const email = sessionStorage.getItem(

        "passwordResetEmail"

    );

    if (!email) {

        showToast(

            "Reset session expired.",

            "error"

        );

        return;

    }

    const user = findUserByEmail(email);

    if (!user) {

        showToast(

            "User not found.",

            "error"

        );

        return;

    }

    user.password = password;

    updateUser(user);

    sessionStorage.removeItem(

        "passwordResetEmail"

    );

    showToast(

        "Password updated successfully."

    );

    setTimeout(() => {

        window.location.href = "login.html";

    }, 800);

}


























// part 6 

/*==========================================
    CHANGE PASSWORD
==========================================*/

function changePassword() {

    const currentPasswordInput = document.getElementById(
        "currentPassword"
    );

    const newPasswordInput = document.getElementById(
        "newPassword"
    );

    const confirmPasswordInput = document.getElementById(
        "confirmPassword"
    );

    if (

        !currentPasswordInput ||

        !newPasswordInput ||

        !confirmPasswordInput

    ) {

        return;

    }

    const currentPassword = currentPasswordInput.value;

    const newPassword = newPasswordInput.value;

    const confirmPassword = confirmPasswordInput.value;

    const currentUser = getCurrentUser();

    if (!currentUser) {

        showToast(

            "Please login first.",

            "error"

        );

        return;

    }

    if (

        currentPassword !== currentUser.password

    ) {

        showToast(

            "Current password is incorrect.",

            "error"

        );

        return;

    }

    if (

        !newPassword ||

        !confirmPassword

    ) {

        showToast(

            "Please complete all fields.",

            "error"

        );

        return;

    }

    if (

        newPassword !== confirmPassword

    ) {

        showToast(

            "Passwords do not match.",

            "error"

        );

        return;

    }

    currentUser.password = newPassword;

    updateUser(currentUser);

    setCurrentUser(currentUser);

    currentPasswordInput.value = "";

    newPasswordInput.value = "";

    confirmPasswordInput.value = "";

    showToast(

        "Password updated successfully."

    );

}

/*==========================================
    PAGE INITIALIZATION
==========================================*/
function initializeAuthentication() {

    validateUserSession();

    initializeRememberMe();

    initializeLoginForm();

    initializeRegisterForm();

    initializeForgotPasswordForm();

    initializeResetPasswordForm();

    initializeLogoutButton();

    const passwordButton =
        document.getElementById("updatePasswordBtn");

    if (passwordButton) {

        passwordButton.addEventListener(
            "click",
            changePassword
        );

    }

}