// it is done 

"use strict";

/*  ====================
    STORAGE.JS
    Student Performance Analytics Portal
    Developed by Muhammad Kumail Noor
    ====================*/

/*==================== STORAGE KEYS ====================*/

const STORAGE_KEYS = Object.freeze({
    DASHBOARD: "studentPortalDashboard",

    SEARCH_HISTORY: "studentPortalSearchHistory",

    STATISTICS: "studentPortalStatistics",

    USERS: "studentPortalUsers",

    CURRENT_USER: "studentPortalCurrentUser",

    REMEMBER_USER: "studentPortalRememberUser",

    THEME: "studentPortalTheme",

    NOTIFICATIONS: "studentPortalNotifications",

    REPORTS: "studentPortalReports",

    PROFILE: "studentPortalProfile",

    SETTINGS: "studentPortalSettings"

});

/*==================== SAVE DATA ====================*/

function saveData(key, value) {

    try {

        localStorage.setItem(

            key,

            JSON.stringify(value)

        );

        return true;

    }

    catch (error) {

        console.error(

            "Storage Save Error:",

            error

        );

        return false;

    }

}

/*==================== LOAD DATA====================*/

function loadData(key, defaultValue = null) {

    try {

        const data = localStorage.getItem(key);

        return data
            ? JSON.parse(data)
            : defaultValue;

    }

    catch (error) {

        console.error(

            "Storage Load Error:",

            error

        );

        return defaultValue;

    }

}

/*==================== REMOVE DATA ====================*/

function removeData(key) {

    try {

        localStorage.removeItem(key);

        return true;

    }

    catch (error) {

        console.error(

            "Storage Remove Error:",

            error

        );

        return false;

    }

}

/*==================== CLEAR STORAGE ====================*/

function clearStorage() {

    try {

        localStorage.clear();

        return true;

    }

    catch (error) {

        console.error(

            "Storage Clear Error:",

            error

        );

        return false;

    }

}
/*==================== USER MANAGEMENT ====================*/

function getUsers() {

    return loadData(STORAGE_KEYS.USERS, []);

}

function saveUsers(users) {

    return saveData(STORAGE_KEYS.USERS, users);

}

function addUser(user) {

    const users = getUsers();

    if (findUserByEmail(user.email)) {

        return false;

    }

    users.push(user);

    return saveUsers(users);
}

function findUserByEmail(email) {

    const users = getUsers();

    return users.find(user =>

        user.email.toLowerCase() === email.toLowerCase()

    ) || null;

}

function updateUser(updatedUser) {

    const users = getUsers();

    const index = users.findIndex(user =>

        user.email.toLowerCase() === updatedUser.email.toLowerCase()

    );

    if (index === -1) {

        return false;

    }

    users[index] = updatedUser;

    return saveUsers(users);

}

/*==================== CURRENT USER SESSION ====================*/

function setCurrentUser(user) {

    return saveData(

        STORAGE_KEYS.CURRENT_USER,

        user

    );

}

function getCurrentUser() {

    return loadData(

        STORAGE_KEYS.CURRENT_USER,

        null

    );

}

function clearCurrentUser() {

    return removeData(

        STORAGE_KEYS.CURRENT_USER

    );

}

/*==================== REMEMBER ME ====================*/

function rememberUser(email) {

    return saveData(

        STORAGE_KEYS.REMEMBER_USER,

        email

    );

}

function getRememberedUser() {

    return loadData(

        STORAGE_KEYS.REMEMBER_USER,

        ""

    );

}

function forgetRememberedUser() {

    return removeData(

        STORAGE_KEYS.REMEMBER_USER

    );

}
/*==================== NOTIFICATIONS ====================*/

function getNotifications() {

    return loadData(

        STORAGE_KEYS.NOTIFICATIONS,

        []

    );

}

function saveNotifications(notifications) {

    return saveData(

        STORAGE_KEYS.NOTIFICATIONS,

        notifications

    );

}

function addNotification(notification) {

    const notifications = getNotifications();

    notifications.unshift(notification);

    return saveNotifications(notifications);

}

function clearNotifications() {

    return saveNotifications([]);

}

/*==================== REPORTS ====================*/

function getReports() {

    return loadData(

        STORAGE_KEYS.REPORTS,

        []

    );

}

function saveReports(reports) {

    return saveData(

        STORAGE_KEYS.REPORTS,

        reports

    );

}

function addReport(report) {

    const reports = getReports();

    reports.unshift(report);

    return saveReports(reports);

}

/*==================== DASHBOARD DATA ====================*/

function saveDashboardData(data) {

    return saveData(

        STORAGE_KEYS.DASHBOARD,

        data

    );

}

function getDashboardData() {

    return loadData(

        STORAGE_KEYS.DASHBOARD,

        {}

    );

}

/*==================== SEARCH HISTORY ====================*/

function saveSearchHistory(page, keyword) {

    const history = loadData(

        STORAGE_KEYS.SEARCH_HISTORY,

        {}

    );

    if (!history[page]) {

        history[page] = [];

    }

    if (!keyword || !keyword.trim()) {

        return false;

    }

    history[page].unshift(keyword.trim());

    history[page] = history[page].slice(0, 10);

    return saveData(

        STORAGE_KEYS.SEARCH_HISTORY,

        history

    );

}

function getSearchHistory(page) {

    const history = loadData(

        STORAGE_KEYS.SEARCH_HISTORY,

        {}

    );

    return history[page] || [];

}

function clearSearchHistory(page = null) {

    if (page === null) {

        return removeData(

            STORAGE_KEYS.SEARCH_HISTORY

        );

    }

    const history = loadData(

        STORAGE_KEYS.SEARCH_HISTORY,

        {}

    );

    delete history[page];

    return saveData(

        STORAGE_KEYS.SEARCH_HISTORY,

        history

    );

}
/*==================== PROFILE ====================*/

function saveProfile(profile) {

    return saveData(

        STORAGE_KEYS.PROFILE,

        profile

    );

}

function getProfile() {

    return loadData(

        STORAGE_KEYS.PROFILE,

        {}

    );

}

function updateProfile(updates) {

    const profile = getProfile();

    const updatedProfile = {

        ...profile,

        ...updates

    };

    return saveProfile(updatedProfile);

}

function clearProfile() {

    return removeData(

        STORAGE_KEYS.PROFILE

    );

}

/*==================== THEME ====================*/

function saveTheme(theme) {

    return saveData(

        STORAGE_KEYS.THEME,

        theme

    );

}

function getTheme() {

    return loadData(

        STORAGE_KEYS.THEME,

        "light"

    );

}

/*==================== SETTINGS ====================*/

function saveSettings(settings) {

    return saveData(

        STORAGE_KEYS.SETTINGS,

        settings

    );

}

function getSettings() {

    return loadData(

        STORAGE_KEYS.SETTINGS,

        {}

    );

}

function updateSettings(updates) {

    const settings = getSettings();

    const updatedSettings = {

        ...settings,

        ...updates

    };

    return saveSettings(updatedSettings);

}

/*==================== PORTAL STATISTICS ====================*/

function saveStatistics(statistics) {

    return saveData(

        STORAGE_KEYS.STATISTICS,

        statistics

    );

}

function getStatistics() {

    return loadData(

        STORAGE_KEYS.STATISTICS,

        {}

    );

}

/*==================== EXPORT DATA ====================*/

function exportStorageData() {

    return {

        users: getUsers(),

        currentUser: getCurrentUser(),

        profile: getProfile(),

        reports: getReports(),

        notifications: getNotifications(),

        settings: getSettings(),

        statistics: getStatistics(),

        dashboard: getDashboardData()

    };

}
/*==================== STORAGE SUPPORT ====================*/

function isStorageAvailable() {

    try {

        const test = "__storage_test__";

        localStorage.setItem(test, test);

        localStorage.removeItem(test);

        return true;

    }

    catch {

        return false;

    }

}

/*==================== INITIALIZE STORAGE ====================*/

function initializeStorage() {

    function initializeKey(key, value) {

        if (!localStorage.getItem(key)) {

            saveData(key, value);

        }

    }
    initializeKey(STORAGE_KEYS.USERS, []);

    initializeKey(STORAGE_KEYS.NOTIFICATIONS, []);

    initializeKey(STORAGE_KEYS.REPORTS, []);

    initializeKey(STORAGE_KEYS.PROFILE, {});

    initializeKey(STORAGE_KEYS.SETTINGS, {});

    initializeKey(STORAGE_KEYS.THEME, "light");

    initializeKey(STORAGE_KEYS.DASHBOARD, {});

    initializeKey(STORAGE_KEYS.SEARCH_HISTORY, {});

    initializeKey(STORAGE_KEYS.STATISTICS, {});

}

/*==================== RESET PORTAL DATA ====================*/

function resetPortalData() {

    clearCurrentUser();

    clearNotifications();

    clearProfile();

    clearSearchHistory();

    saveDashboardData({});

    saveStatistics({});

    saveSettings({});

    saveReports([]);

}

/*==================== RESET EVERYTHING ====================*/

function resetApplication() {

    clearStorage();

    initializeStorage();

}

/*==================== AUTO INITIALIZATION ====================*/

document.addEventListener(

    "DOMContentLoaded",

    () => {

        if (isStorageAvailable()) {

            initializeStorage();

        }

    }

);