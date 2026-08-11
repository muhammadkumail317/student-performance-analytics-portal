// it is done


"use strict";

/*==================================================
    DASHBOARD.JS
    Student Performance Analytics Portal
    Developed by Muhammad Kumail Noor
==================================================*/

/*==========================================
    DOM ELEMENT CACHE
==========================================*/

const dashboardContainer =
    document.getElementById("dashboard");

const welcomeMessage =
    document.getElementById("welcomeMessage");

const userName =
    document.getElementById("userName");

const userRole =
    document.getElementById("userRole");

const totalStudents =
    document.getElementById("totalStudents");

const totalTeachers =
    document.getElementById("totalTeachers");

const totalCourses =
    document.getElementById("totalCourses");

const averagePerformance =
    document.getElementById("averagePerformance");

const recentActivities =
    document.getElementById("recentActivities");

const dashboardRefreshButton =
    document.getElementById("refreshDashboard");

/*==========================================
    DASHBOARD DATA
==========================================*/

let dashboardData = {};

let currentUser = null;

/*==========================================
    AUTO INITIALIZATION
==========================================*/

document.addEventListener(
    "DOMContentLoaded",
    initializeDashboard
);

/*==========================================
    MAIN INITIALIZER
==========================================*/

function initializeDashboard() {

    loadCurrentUser();

    loadDashboardData();

    initializeStatistics();

    initializeWelcomeMessage();

    initializeRefreshButton();

    initializeRecentActivities();

}




























// part 2


/*==========================================
    LOAD CURRENT USER
==========================================*/

function loadCurrentUser() {

    currentUser = getCurrentUser();

    if (!currentUser) {

        return;

    }

    if (userName) {

        userName.textContent = currentUser.fullName;

    }

    if (userRole) {

        userRole.textContent = currentUser.role;

    }

}

/*==========================================
    LOAD DASHBOARD DATA
==========================================*/

function loadDashboardData() {

    dashboardData = getDashboardData();

    if (!dashboardData || typeof dashboardData !== "object") {

        dashboardData = {};

    }

}

/*==========================================
    DASHBOARD STATISTICS
==========================================*/

function initializeStatistics() {

    const users = getUsers();

    const students = users.filter(

        user => user.role === "student"

    ).length;

    const teachers = users.filter(

        user => user.role === "teacher"

    ).length;

    const courses = dashboardData.totalCourses || 12;

    const performance = dashboardData.averagePerformance || 87;

    updateStatistics(

        students,

        teachers,

        courses,

        performance

    );

}

/*==========================================
    UPDATE STATISTICS
==========================================*/

function updateStatistics(

    students,

    teachers,

    courses,

    performance

) {

    if (totalStudents) {

        totalStudents.textContent = students;

    }

    if (totalTeachers) {

        totalTeachers.textContent = teachers;

    }

    if (totalCourses) {

        totalCourses.textContent = courses;

    }

    if (averagePerformance) {

        averagePerformance.textContent = `${performance}%`;

    }

}




















// part 3



/*==========================================
    WELCOME MESSAGE
==========================================*/

function initializeWelcomeMessage() {

    if (

        !welcomeMessage ||

        !currentUser

    ) {

        return;

    }

    const hour = new Date().getHours();

    let greeting = "Welcome";

    if (hour < 12) {

        greeting = "Good Morning";

    }

    else if (hour < 17) {

        greeting = "Good Afternoon";

    }

    else {

        greeting = "Good Evening";

    }

    welcomeMessage.textContent =

        `${greeting}, ${currentUser.fullName}!`;

}

/*==========================================
    REFRESH BUTTON
==========================================*/

function initializeRefreshButton() {

    if (!dashboardRefreshButton) {

        return;

    }

    dashboardRefreshButton.addEventListener(

        "click",

        refreshDashboard

    );

}

/*==========================================
    REFRESH DASHBOARD
==========================================*/

function refreshDashboard() {

    showLoading(

        "Refreshing dashboard..."

    );

    setTimeout(() => {

        loadDashboardData();

        initializeStatistics();

        initializeWelcomeMessage();

        initializeRecentActivities();

        hideLoading();

        showToast(

            "Dashboard refreshed successfully."

        );

    }, 600);

}

/*==========================================
    RESET DASHBOARD
==========================================*/

function resetDashboard() {

    dashboardData = {};

    saveDashboardData({});

    initializeStatistics();

    initializeRecentActivities();

}























// part 4 


/*==========================================
    RECENT ACTIVITIES
==========================================*/

function initializeRecentActivities() {

    if (!recentActivities) {

        return;

    }

    const activities = loadRecentActivities();

    renderRecentActivities(

        activities

    );

}

/*==========================================
    LOAD ACTIVITIES
==========================================*/

function loadRecentActivities() {

    const activities =

        dashboardData.recentActivities;

    if (

        !Array.isArray(activities)

    ) {

        return [];

    }

    return activities;

}

/*==========================================
    RENDER ACTIVITIES
==========================================*/

function renderRecentActivities(activities) {

    if (!recentActivities) {

        return;

    }

    recentActivities.innerHTML = "";

    if (!activities.length) {

        recentActivities.innerHTML =

            `<li class="empty-state">
                No recent activities available.
            </li>`;

        return;

    }

    activities.forEach(activity => {

        const item =

            document.createElement("li");

        item.className =

            "activity-item";

        item.innerHTML = `

            <span class="activity-title">

                ${activity.title}

            </span>

            <small class="activity-time">

                ${activity.time}

            </small>

        `;

        recentActivities.appendChild(

            item

        );

    });

}

/*==========================================
    ADD ACTIVITY
==========================================*/

function addRecentActivity(

    title,

    time = "Just now"

) {

    if (

        !dashboardData.recentActivities

    ) {

        dashboardData.recentActivities = [];

    }

    dashboardData.recentActivities.unshift({

        title,

        time

    });

    dashboardData.recentActivities =

        dashboardData.recentActivities.slice(0, 10);

    saveDashboardData(

        dashboardData

    );

    initializeRecentActivities();
    initializeStatistics();

}


























// part 5 


/*==========================================
    DASHBOARD CARDS
==========================================*/

function updateDashboardCards() {

    if (!dashboardData) {

        return;

    }

    updateStatistics(

        dashboardData.totalStudents ?? 0,

        dashboardData.totalTeachers ?? 0,

        dashboardData.totalCourses ?? 0,

        dashboardData.averagePerformance ?? 0

    );

}

/*==========================================
    UPDATE PERFORMANCE
==========================================*/

function updatePerformance(value) {

    dashboardData.averagePerformance = value;

    saveDashboardData(

        dashboardData

    );

    updateDashboardCards();

}

/*==========================================
    UPDATE COURSE COUNT
==========================================*/

function updateCourseCount(value) {

    dashboardData.totalCourses = value;

    saveDashboardData(

        dashboardData

    );

    updateDashboardCards();

}

/*==========================================
    UPDATE STUDENT COUNT
==========================================*/

function updateStudentCount(value) {

    dashboardData.totalStudents = value;

    saveDashboardData(

        dashboardData

    );

    updateDashboardCards();

}

/*==========================================
    UPDATE TEACHER COUNT
==========================================*/

function updateTeacherCount(value) {

    dashboardData.totalTeachers = value;

    saveDashboardData(

        dashboardData

    );

    updateDashboardCards();

}

/*==========================================
    SAVE DASHBOARD
==========================================*/

function saveDashboard() {

    saveDashboardData(

        dashboardData

    );

}

/*==========================================
    RELOAD DASHBOARD
==========================================*/

function reloadDashboard() {

    loadCurrentUser();

    loadDashboardData();

    initializeStatistics();

    initializeWelcomeMessage();

    initializeRecentActivities();

}






















// part 6


/*==========================================
    EXPORT DASHBOARD DATA
==========================================*/

function exportDashboardData() {

    downloadFile(

        "dashboard-data.json",

        JSON.stringify(

            dashboardData,

            null,

            2

        ),

        "application/json"

    );

}

/*==========================================
    CLEAR DASHBOARD
==========================================*/

function clearDashboardData() {

    if (

        !confirmAction(

            "Are you sure you want to reset the dashboard?"

        )

    ) {

        return;

    }

    dashboardData = {};

    saveDashboardData({});

    initializeStatistics();

    initializeRecentActivities();

    showToast(

        "Dashboard reset successfully."

    );

}

/*==========================================
    AUTO SAVE
==========================================*/

function autoSaveDashboard() {

    saveDashboardData(

        dashboardData

    );

}

/*==========================================
    WINDOW EVENTS
==========================================*/

window.addEventListener(

    "beforeunload",

    autoSaveDashboard

);

window.addEventListener(

    "focus",

    reloadDashboard

);

/*==========================================
    PUBLIC API
==========================================*/

window.dashboard = {

    refresh: refreshDashboard,

    reload: reloadDashboard,

    reset: clearDashboardData,

    export: exportDashboardData,

    addActivity: addRecentActivity,

    updatePerformance,

    updateStudentCount,

    updateTeacherCount,

    updateCourseCount

};