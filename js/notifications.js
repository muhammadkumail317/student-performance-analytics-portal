"use strict";

/*==================================================
    NOTIFICATIONS.JS
    Student Performance Analytics Portal
    Developed by Muhammad Kumail Noor
==================================================*/

/*==========================================
    DOM ELEMENT CACHE
==========================================*/

/*==========================================
    DOM ELEMENT CACHE
==========================================*/

const notificationList =
    document.getElementById("notificationList");

const notificationBadge =
    document.getElementById("notificationBadge");

const clearNotificationsButton =
    document.getElementById("clearNotifications");

const markAllReadButton =
    document.getElementById("markAllRead");

const notificationSearch =
    document.getElementById("notificationSearch");

const notificationToggle =
    document.getElementById("notificationToggle");

const notificationPanel =
    document.getElementById("notificationPanel");

const closeNotifications =
    document.getElementById("closeNotifications");

/*==========================================
    NOTIFICATION DATA
==========================================*/

let notifications = [];

/*==========================================
    AUTO INITIALIZATION
==========================================*/

document.addEventListener(

    "DOMContentLoaded",

    initializeNotifications

);

/*==========================================
    MAIN INITIALIZER
==========================================*/

function initializeNotifications() {

    loadNotifications();

    initializeNotificationButtons();

    initializeNotificationSearch();

    renderNotifications();

}
/*==========================================
    BUTTON EVENTS
==========================================*/

function initializeNotificationButtons() {

    /*--------------------------------------
        OPEN NOTIFICATION PANEL
    --------------------------------------*/

    if (
        notificationToggle &&
        notificationPanel
    ) {

        notificationToggle.addEventListener(
            "click",
            toggleNotificationPanel
        );

    }


    /*--------------------------------------
        CLOSE NOTIFICATION PANEL
    --------------------------------------*/

    if (
        closeNotifications &&
        notificationPanel
    ) {

        closeNotifications.addEventListener(
            "click",
            closeNotificationPanel
        );

    }


    /*--------------------------------------
        CLEAR ALL NOTIFICATIONS
    --------------------------------------*/

    if (clearNotificationsButton) {

        clearNotificationsButton.addEventListener(
            "click",
            clearAllNotifications
        );

    }


    /*--------------------------------------
        MARK ALL AS READ
    --------------------------------------*/

    if (markAllReadButton) {

        markAllReadButton.addEventListener(
            "click",
            markAllNotificationsRead
        );

    }

}


/*==========================================
    TOGGLE NOTIFICATION PANEL
==========================================*/

function toggleNotificationPanel() {

    if (!notificationPanel) {

        return;

    }

    const isOpen =
        notificationPanel.classList.contains("show");

    if (isOpen) {

        closeNotificationPanel();

    } else {

        openNotificationPanel();

    }

}


/*==========================================
    OPEN NOTIFICATION PANEL
==========================================*/

function openNotificationPanel() {

    if (!notificationPanel) {

        return;

    }

    notificationPanel.classList.add("show");

    notificationPanel.setAttribute(
        "aria-hidden",
        "false"
    );

}


/*==========================================
    CLOSE NOTIFICATION PANEL
==========================================*/

function closeNotificationPanel() {

    if (!notificationPanel) {

        return;

    }

    notificationPanel.classList.remove("show");

    notificationPanel.setAttribute(
        "aria-hidden",
        "true"
    );

}


/*==========================================
    CLOSE ON OUTSIDE CLICK
==========================================*/

document.addEventListener(
    "click",
    event => {

        if (
            !notificationPanel ||
            !notificationToggle
        ) {

            return;

        }

        if (
            !notificationPanel.classList.contains("show")
        ) {

            return;

        }

        const clickedInsidePanel =
            notificationPanel.contains(event.target);

        const clickedToggle =
            notificationToggle.contains(event.target);

        if (
            !clickedInsidePanel &&
            !clickedToggle
        ) {

            closeNotificationPanel();

        }

    }
);


/*==========================================
    CLOSE WITH ESCAPE
==========================================*/

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape" &&
            notificationPanel &&
            notificationPanel.classList.contains("show")
        ) {

            closeNotificationPanel();

        }

    }
);


/*==========================================
    SEARCH
==========================================*/

function initializeNotificationSearch() {

    if (!notificationSearch) {

        return;

    }

    notificationSearch.addEventListener(
        "input",
        event => {

            filterNotifications(
                event.target.value
            );

        }
    );

}


















// part 2 

/*==========================================
    LOAD NOTIFICATIONS
==========================================*/

function loadNotifications() {

    const storedNotifications =

        getNotifications();

    if (

        !Array.isArray(storedNotifications)

    ) {

        notifications = [];

        return;

    }

    notifications = storedNotifications;

}

/*==========================================
    SAVE NOTIFICATIONS
==========================================*/

function saveNotifications() {

    saveNotificationsData(

        notifications

    );

}

/*==========================================
    RENDER NOTIFICATIONS
==========================================*/

function renderNotifications() {

    if (!notificationList) {

        return;

    }

    notificationList.innerHTML = "";

    if (!notifications.length) {

        renderEmptyState();

        updateNotificationBadge();

        return;

    }

    notifications.forEach(notification => {

        const item =

            document.createElement("li");

        item.className =

            `notification-item ${notification.read

                ? "read"

                : "unread"

            }`;

        item.dataset.id = notification.id;

        item.innerHTML = `

            <div class="notification-content">

                <h4>

                    ${notification.title}

                </h4>

                <p>

                    ${notification.message}

                </p>

                <small>

                    ${notification.time}

                </small>

            </div>

        `;

        notificationList.appendChild(

            item

        );

    });

    updateNotificationBadge();

}

/*==========================================
    EMPTY STATE
==========================================*/

function renderEmptyState() {

    notificationList.innerHTML = `

        <li class="empty-state">

            No notifications available.

        </li>

    `;

}

/*==========================================
    NOTIFICATION BADGE
==========================================*/

function updateNotificationBadge() {

    if (!notificationBadge) {

        return;

    }

    const unreadCount =

        notifications.filter(

            notification =>

                !notification.read

        ).length;

    notificationBadge.textContent =

        unreadCount;

    notificationBadge.hidden =

        unreadCount === 0;

}

















// part 3

/*==========================================
    ADD NOTIFICATION
==========================================*/

function addNotification(

    title,

    message,

    type = "info"

) {

    const notification = {

        id: crypto.randomUUID(),

        title,

        message,

        type,

        read: false,

        time: new Date().toLocaleString()

    };

    notifications.unshift(

        notification

    );

    saveNotifications();

    renderNotifications();

}

/*==========================================
    REMOVE NOTIFICATION
==========================================*/

function removeNotification(id) {

    notifications = notifications.filter(

        notification =>

            notification.id !== id

    );

    saveNotifications();

    renderNotifications();

}

/*==========================================
    CLEAR ALL NOTIFICATIONS
==========================================*/

function clearAllNotifications() {

    if (!notifications.length) {

        showToast(

            "No notifications to clear.",

            "error"

        );

        return;

    }

    if (

        !confirmAction(

            "Clear all notifications?"

        )

    ) {

        return;

    }

    notifications = [];

    saveNotifications();

    renderNotifications();

    showToast(

        "All notifications cleared."

    );

}

/*==========================================
    GET NOTIFICATION
==========================================*/

function getNotification(id) {

    return notifications.find(

        notification =>

            notification.id === id

    );

}

















// part 4 


/*==========================================
    MARK AS READ
==========================================*/

function markNotificationAsRead(id) {

    const notification = getNotification(id);

    if (!notification) {

        return;

    }

    notification.read = true;

    saveNotifications();

    renderNotifications();

}

/*==========================================
    MARK ALL AS READ
==========================================*/

function markAllNotificationsRead() {

    if (!notifications.length) {

        showToast(

            "No notifications available.",

            "error"

        );

        return;

    }

    notifications.forEach(notification => {

        notification.read = true;

    });

    saveNotifications();

    renderNotifications();

    showToast(

        "All notifications marked as read."

    );

}

/*==========================================
    FILTER NOTIFICATIONS
==========================================*/

function filterNotifications(searchValue) {

    if (!notificationList) {

        return;

    }

    const keyword =

        searchValue.trim().toLowerCase();

    const items =

        notificationList.querySelectorAll(

            ".notification-item"

        );

    items.forEach(item => {

        const text =

            item.textContent.toLowerCase();

        item.style.display =

            text.includes(keyword)

                ? ""

                : "none";

    });

}

/*==========================================
    UNREAD COUNT
==========================================*/

function getUnreadNotificationCount() {

    return notifications.filter(

        notification =>

            !notification.read

    ).length;

}















// part 5


/*==========================================
    SHOW SYSTEM NOTIFICATION
==========================================*/

function showSystemNotification(

    title,

    message,

    type = "info"

) {

    addNotification(

        title,

        message,

        type

    );

    showToast(

        message,

        type === "error"

            ? "error"

            : "success"

    );

    showBrowserNotification(

        title,

        message

    );

}

/*==========================================
    BROWSER NOTIFICATION
==========================================*/

function showBrowserNotification(

    title,

    message

) {

    if (

        !("Notification" in window)

    ) {

        return;

    }

    if (

        Notification.permission === "granted"

    ) {

        new Notification(

            title,

            {

                body: message,

                icon: "assets/images/logo.png"

            }

        );

        return;

    }

    if (

        Notification.permission !== "denied"

    ) {

        Notification.requestPermission()

            .then(permission => {

                if (

                    permission === "granted"

                ) {

                    new Notification(

                        title,

                        {

                            body: message,

                            icon: "assets/images/logo.png"

                        }

                    );

                }

            });

    }

}

/*==========================================
    AUTO REFRESH
==========================================*/

function refreshNotifications() {

    loadNotifications();

    renderNotifications();

}

/*==========================================
    AUTO REFRESH TIMER
==========================================*/

setInterval(

    refreshNotifications,

    30000

);










// part 6


/*==========================================
    NOTIFICATION CLICK EVENTS
==========================================*/

if (notificationList) {

    notificationList.addEventListener(

        "click",

        event => {

            const item = event.target.closest(

                ".notification-item"

            );

            if (!item) {

                return;

            }

            const notificationId =

                item.dataset.id;

            markNotificationAsRead(

                notificationId

            );

        }

    );

}

/*==========================================
    RESET NOTIFICATIONS
==========================================*/

function resetNotifications() {

    notifications = [];

    saveNotifications();

    renderNotifications();

}

/*==========================================
    GET ALL NOTIFICATIONS
==========================================*/

function getAllNotifications() {

    return [...notifications];

}

/*==========================================
    PUBLIC API
==========================================*/

window.notifications = {

    add: addNotification,

    remove: removeNotification,

    clear: clearAllNotifications,

    markRead: markNotificationAsRead,

    markAllRead: markAllNotificationsRead,

    refresh: refreshNotifications,

    reset: resetNotifications,

    getAll: getAllNotifications,

    getUnreadCount: getUnreadNotificationCount

};