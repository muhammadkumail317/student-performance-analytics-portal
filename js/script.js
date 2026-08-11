// it is done

"use strict";

/*==================================================
    SCRIPT.JS
    Student Performance Analytics Portal
    Developed by Muhammad Kumail Noor
==================================================*/

/*==========================================
    DOM ELEMENT CACHE
==========================================*/

// const body = document.body;

const pageLoader = document.getElementById("pageLoader");

const menuButton = document.getElementById("menuBtn");

const navigation = document.getElementById("navLinks");

const refreshButtons = document.querySelectorAll("#refreshDashboard, #refreshProfile");

const backToTopButton = document.getElementById("backToTop");

// const searchInputs = document.querySelectorAll(
//     "#dashboardSearch, #reportSearch, #notificationSearch"
// );

/*==========================================
    APPLICATION INITIALIZATION
==========================================*/

document.addEventListener(
    "DOMContentLoaded",
    initializeApplication
);

/*==========================================
    MAIN INITIALIZER
==========================================*/

function initializeApplication() {

    initializePageLoader();

    initializeRefreshButtons();

    initializeSmoothScrolling();

    initializeNavigation();

    initializeHeader();

    initializeBackToTop();

    highlightActiveNavigation();

    updateFooterYear();

    initializeSearchFields();

    initializeInputEffects();

    initializeKeyboardShortcuts();

    initializeConnectionMonitor();

    initializePageVisibility();

    initializeWindowResize();

}

/*==========================================
    PAGE LOADER
==========================================*/

function initializePageLoader() {

    if (!pageLoader) {

        return;

    }

    window.addEventListener(
        "load",
        hidePageLoader
    );

}

function hidePageLoader() {

    pageLoader.classList.add("hidden");

    setTimeout(() => {

        pageLoader.remove();

    }, 400);

}

/*==========================================
    REFRESH BUTTONS
==========================================*/

function initializeRefreshButtons() {

    if (!refreshButtons.length) {

        return;

    }

    refreshButtons.forEach(button => {

        button.addEventListener(
            "click",
            () => location.reload()
        );

    });

}

/*==========================================
    SMOOTH SCROLL
==========================================*/

function initializeSmoothScrolling() {

    document
        .querySelectorAll('a[href^="#"]')
        .forEach(anchor => {

            anchor.addEventListener("click", event => {

                const target = document.querySelector(
                    anchor.getAttribute("href")
                );

                if (!target) {

                    return;

                }

                event.preventDefault();

                target.scrollIntoView({

                    behavior: "smooth",

                    block: "start"

                });

            });

        });

}




















































/*==========================================
    NAVIGATION
==========================================*/

function initializeNavigation() {

    if (!menuButton || !navigation) {

        return;

    }

    menuButton.addEventListener(
        "click",
        toggleNavigation
    );

    document.addEventListener(
        "click",
        handleOutsideNavigationClick
    );

    document.addEventListener(
        "keydown",
        handleNavigationKeyboard
    );

    navigation
        .querySelectorAll("a")
        .forEach(link => {

            link.addEventListener(
                "click",
                closeNavigation
            );

        });

}

/*==========================================
    TOGGLE NAVIGATION
==========================================*/

function toggleNavigation(event) {

    event.stopPropagation();

    const isOpen = navigation.classList.toggle("active");

    menuButton.setAttribute(

        "aria-expanded",

        isOpen

    );

}

/*==========================================
    CLOSE NAVIGATION
==========================================*/

function closeNavigation() {

    if (!navigation.classList.contains("active")) {

        return;

    }

    navigation.classList.remove("active");

    menuButton.setAttribute(

        "aria-expanded",

        "false"

    );

}

/*==========================================
    OUTSIDE CLICK
==========================================*/

function handleOutsideNavigationClick(event) {

    if (

        !navigation.classList.contains("active")

    ) {

        return;

    }

    if (

        navigation.contains(event.target) ||

        menuButton.contains(event.target)

    ) {

        return;

    }

    closeNavigation();

}

/*==========================================
    KEYBOARD SUPPORT
==========================================*/

function handleNavigationKeyboard(event) {

    if (

        event.key === "Escape"

    ) {

        closeNavigation();

    }

}





































/*==========================================
    HEADER
==========================================*/

function initializeHeader() {

    const header = document.querySelector(".site-header");

    if (!header) {

        return;

    }

    window.addEventListener(

        "scroll",

        () => {

            if (window.scrollY > 20) {

                header.classList.add("header-scrolled");

            }

            else {

                header.classList.remove("header-scrolled");

            }

        }

    );

}

/*==========================================
    BACK TO TOP
==========================================*/

function initializeBackToTop() {

    if (!backToTopButton) {

        return;

    }

    window.addEventListener(

        "scroll",

        () => {

            if (window.scrollY > 300) {

                backToTopButton.classList.add("show");

            }

            else {

                backToTopButton.classList.remove("show");

            }

        }

    );

    backToTopButton.addEventListener(

        "click",

        () => {

            window.scrollTo({

                top: 0,

                behavior: "smooth"

            });

        }

    );

}

/*==========================================
    ACTIVE NAVIGATION
==========================================*/

function highlightActiveNavigation() {

    if (!navigation) {

        return;

    }

    const currentPage = window.location.pathname

        .split("/")

        .pop();

    navigation

        .querySelectorAll("a")

        .forEach(link => {

            const href = link.getAttribute("href");

            if (href === currentPage) {

                link.classList.add("active");

            }

            else {

                link.classList.remove("active");

            }

        });

}

/*==========================================
    FOOTER YEAR
==========================================*/

function updateFooterYear() {

    const yearElement = document.getElementById("currentYear");

    if (!yearElement) {

        return;

    }

    yearElement.textContent = new Date().getFullYear();

}




























































/*==========================================
    SEARCH INPUTS
==========================================*/

function initializeSearchFields() {

    const searchInputs = document.querySelectorAll(

        "input[type='search']"

    );

    if (!searchInputs.length) {

        return;

    }

    searchInputs.forEach(input => {

        input.addEventListener(

            "keydown",

            event => {

                if (event.key === "Escape") {

                    input.value = "";

                    input.dispatchEvent(

                        new Event("input")

                    );

                }

            }

        );

    });

}

/*==========================================
    INPUT EFFECTS
==========================================*/

function initializeInputEffects() {

    const fields = document.querySelectorAll(

        "input, textarea, select"

    );

    if (!fields.length) {

        return;

    }

    fields.forEach(field => {

        field.addEventListener(

            "focus",

            () => {

                field.parentElement?.classList.add(

                    "input-focus"

                );

            }

        );

        field.addEventListener(

            "blur",

            () => {

                field.parentElement?.classList.remove(

                    "input-focus"

                );

            }

        );

    });

}

/*==========================================
    FILTER ELEMENTS
==========================================*/

function filterElements(searchValue, selector) {

    const items = document.querySelectorAll(selector);

    const keyword = searchValue

        .trim()

        .toLowerCase();

    items.forEach(item => {

        const text = item.textContent.toLowerCase();

        item.style.display =

            text.includes(keyword)

                ? ""

                : "none";

    });

}
/*==========================================
    TOAST NOTIFICATION
==========================================*/

function showToast(message, type = "success") {

    let toast = document.getElementById("globalToast");

    if (!toast) {

        toast = document.createElement("div");

        toast.id = "globalToast";

        toast.className = "toast";

        document.body.appendChild(toast);

    }

    toast.textContent = message;

    toast.className = `toast toast-${type} show`;

    clearTimeout(showToast.timer);

    showToast.timer = setTimeout(() => {

        toast.classList.remove("show");

    }, 3000);

}

/*==========================================
    LOADING OVERLAY
==========================================*/

function showLoading(message = "Loading...") {

    const overlay = document.getElementById(

        "loadingOverlay"

    );

    if (!overlay) {

        return;

    }

    const text = overlay.querySelector("p");

    if (text) {

        text.textContent = message;

    }

    overlay.setAttribute(

        "aria-hidden",

        "false"

    );

    overlay.classList.add("active");

}

function hideLoading() {

    const overlay = document.getElementById(

        "loadingOverlay"

    );

    if (!overlay) {

        return;

    }

    overlay.setAttribute(

        "aria-hidden",

        "true"

    );

    overlay.classList.remove("active");

}

/*==========================================
    ENABLE / DISABLE BUTTON
==========================================*/

function setButtonLoading(

    button,

    loading,

    loadingText = "Please wait..."

) {

    if (!button) {

        return;

    }

    if (loading) {

        button.dataset.originalText =

            button.textContent;

        button.disabled = true;

        button.textContent = loadingText;

    }

    else {

        button.disabled = false;

        button.textContent =

            button.dataset.originalText ||

            button.textContent;

    }

}

/*==========================================
    DEBOUNCE
==========================================*/

function debounce(callback, delay = 300) {

    let timer;

    return (...args) => {

        clearTimeout(timer);

        timer = setTimeout(() => {

            callback(...args);

        }, delay);

    };

}

/*==========================================
    COPY TO CLIPBOARD
==========================================*/

async function copyText(text) {

    try {

        await navigator.clipboard.writeText(text);

        showToast(

            "Copied to clipboard."

        );

        return true;

    }

    catch {

        showToast(

            "Unable to copy.",

            "error"

        );

        return false;

    }

}

/*==========================================
    DOWNLOAD FILE
==========================================*/

function downloadFile(

    filename,

    content,

    type = "text/plain"

) {

    const blob = new Blob(

        [content],

        { type }

    );

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;

    link.download = filename;

    link.click();

    URL.revokeObjectURL(url);

}

/*==========================================
    CONFIRM ACTION
==========================================*/

function confirmAction(message) {

    return window.confirm(message);

}















































/*==========================================
    KEYBOARD SHORTCUTS
==========================================*/

function initializeKeyboardShortcuts() {

    document.addEventListener(

        "keydown",

        event => {

            if (

                event.ctrlKey &&

                event.key.toLowerCase() === "k"

            ) {

                event.preventDefault();

                const search = document.querySelector(

                    "input[type='search']"

                );

                search?.focus();

            }

        }

    );

}

/*==========================================
    CONNECTION MONITOR
==========================================*/

function initializeConnectionMonitor() {

    window.addEventListener(

        "online",

        () => {

            showToast(

                "Internet connection restored."

            );

        }

    );

    window.addEventListener(

        "offline",

        () => {

            showToast(

                "You are offline.",

                "error"

            );

        }

    );

}

/*==========================================
    PAGE VISIBILITY
==========================================*/

function initializePageVisibility() {

    document.addEventListener(

        "visibilitychange",

        () => {

            if (

                document.hidden

            ) {

                document.title =

                    "Come Back 😊";

            }

            else {

                document.title =

                    document.documentElement.dataset.title ||

                    document.title;

            }

        }

    );

}

/*==========================================
    WINDOW RESIZE
==========================================*/

function initializeWindowResize() {

    window.addEventListener(

        "resize",

        debounce(() => {

            closeNavigation();

        }, 150)

    );

}

/*==========================================
    PAGE TITLE
==========================================*/

document.documentElement.dataset.title =

    document.title;



/*==========================================
    HELPER FUNCTIONS
==========================================*/

function showElement(element) {

    if (!element) {

        return;

    }

    element.hidden = false;

}

function hideElement(element) {

    if (!element) {

        return;

    }

    element.hidden = true;

}

function toggleElement(element) {

    if (!element) {

        return;

    }

    element.hidden = !element.hidden;

}

function elementExists(element) {

    return element !== null;

}