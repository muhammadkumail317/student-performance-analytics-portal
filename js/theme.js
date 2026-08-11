// it is done


"use strict";

/*  ====================
    THEME.JS
    Student Performance Analytics Portal
    Developed by Muhammad Kumail Noor
    ====================*/

/*==================== CONSTANTS ====================*/

const THEME_KEY = "studentPortalTheme";

const themeToggle = document.getElementById("themeToggle");

const root = document.documentElement;

const DARK_BUTTON_TEXT = "☀️ Light";

const LIGHT_BUTTON_TEXT = "🌙 Dark";

/*==================== INITIALIZE THEME ====================*/

document.addEventListener("DOMContentLoaded", initializeTheme);

/*==================== MAIN INITIALIZER ====================*/

function initializeTheme() {

    loadSavedTheme();

    if (themeToggle) {

        themeToggle.addEventListener("click", toggleTheme);

    }

}

/*==================== LOAD SAVED THEME ====================*/

function loadSavedTheme() {

    const savedTheme = localStorage.getItem(THEME_KEY);

    if (savedTheme === "dark") {

        enableDarkTheme();

    } else {

        enableLightTheme();

    }

}

/*==================== TOGGLE THEME ====================*/

function toggleTheme() {

    if (root.classList.contains("dark-theme")) {

        enableLightTheme();

    } else {

        enableDarkTheme();

    }

}

/*==================== ENABLE DARK THEME ====================*/

function enableDarkTheme() {

    root.classList.add("dark-theme");

    localStorage.setItem(THEME_KEY, "dark");

    updateThemeButton(true);

}

/*==================== ENABLE LIGHT THEME ====================*/

function enableLightTheme() {

    root.classList.remove("dark-theme");

    localStorage.setItem(THEME_KEY, "light");

    updateThemeButton(false);

}

/*==================== UPDATE BUTTON ====================*/

function updateThemeButton(isDark) {

    if (!themeToggle) return;

    if (isDark) {

        themeToggle.textContent = DARK_BUTTON_TEXT;

        themeToggle.setAttribute(
            "aria-label",
            "Switch to Light Theme"
        );

    } else {

        themeToggle.textContent = LIGHT_BUTTON_TEXT;

        themeToggle.setAttribute(
            "aria-label",
            "Switch to Dark Theme"
        );

    }

}