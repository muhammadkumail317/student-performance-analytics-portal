// it is done 


"use strict";

/*==================================================
    CHARTS.JS
    Student Performance Analytics Portal
    Developed by Muhammad Kumail Noor
==================================================*/

/*==========================================
    DOM ELEMENT CACHE
==========================================*/

const performanceChartCanvas =
    document.getElementById("performanceChart");

const attendanceChartCanvas =
    document.getElementById("attendanceChart");

const subjectChartCanvas =
    document.getElementById("subjectChart");

const departmentChartCanvas =
    document.getElementById("departmentChart");

const gpaChartCanvas =
    document.getElementById("gpaChart");

// const progressChartCanvas =
//     document.getElementById("progressChart");

// const dashboardChartCanvas =
//     document.getElementById("dashboardChart");

// const chartRefreshButtons =
//     document.querySelectorAll(
//         "#refreshCharts, .refresh-chart"
//     );

const chartRefreshButtons =
    document.querySelectorAll(
        "#refreshAnalytics, .refresh-chart"
    );

/*==========================================
    CHART INSTANCES
==========================================*/

let performanceChart = null;

let attendanceChart = null;

let subjectChart = null;

let departmentChart = null;

let gpaChart = null;

let dashboardChart = null;

let progressChart = null;

/*==========================================
    DEFAULT COLORS
==========================================*/

const chartColors = Object.freeze({

    primary: "#4f46e5",

    secondary: "#06b6d4",

    success: "#22c55e",

    warning: "#f59e0b",

    danger: "#ef4444",

    purple: "#8b5cf6",

    gray: "#94a3b8"

});

/*==========================================
    CHART DEFAULT OPTIONS
==========================================*/

const defaultChartOptions = {

    responsive: true,

    maintainAspectRatio: false,

    animation: {

        duration: 800

    },

    plugins: {

        legend: {

            position: "bottom",

            labels: {

                usePointStyle: true,

                padding: 20

            }

        }

    }

};

/*==========================================
    AUTO INITIALIZATION
==========================================*/

document.addEventListener(

    "DOMContentLoaded",

    initializeCharts

);






















// part 2



/*==========================================
    MAIN INITIALIZER
==========================================*/

function initializeCharts() {

    initializePerformanceChart();

    initializeAttendanceChart();

    initializeSubjectTrendChart();

    // initializeProgressChart();

    // initializeDashboardChart();

    initializeRefreshButtons();

}

/*==========================================
    REFRESH BUTTONS
==========================================*/

function initializeRefreshButtons() {

    if (!chartRefreshButtons.length) {

        return;

    }

    chartRefreshButtons.forEach(button => {

        button.addEventListener(

            "click",

            refreshAllCharts

        );

    });

}

/*==========================================
    REFRESH ALL CHARTS
==========================================*/

function refreshAllCharts() {

    destroyAllCharts();

    initializePerformanceChart();

    initializeAttendanceChart();

    initializeSubjectTrendChart();

    // initializeProgressChart();

    // initializeDashboardChart();

    showToast(

        "Charts refreshed."

    );

}

/*==========================================
    DESTROY ALL CHARTS
==========================================*/

function destroyAllCharts() {

    const charts = [

        performanceChart,

        attendanceChart,

        subjectChart,

        progressChart,

        dashboardChart

    ];

    charts.forEach(chart => {

        if (chart) {

            chart.destroy();

        }

    });

    performanceChart = null;

    attendanceChart = null;

    subjectChart = null;

    progressChart = null;

    dashboardChart = null;

}




































// part 3




/*==========================================
    PERFORMANCE CHART
==========================================*/

function initializePerformanceChart() {

    if (

        !performanceChartCanvas ||

        typeof Chart === "undefined"

    ) {

        return;

    }

    performanceChart = new Chart(

        performanceChartCanvas,

        {

            type: "bar",

            data: {

                labels: [

                    "Math",

                    "Physics",

                    "Programming",

                    "Database",

                    "Networking"

                ],

                datasets: [

                    {

                        label: "Marks",

                        data: [

                            85,

                            78,

                            92,

                            88,

                            81

                        ],

                        backgroundColor: [

                            chartColors.primary,

                            chartColors.secondary,

                            chartColors.success,

                            chartColors.warning,

                            chartColors.purple

                        ],

                        borderRadius: 8,

                        borderWidth: 0

                    }

                ]

            },

            options: {

                ...defaultChartOptions,

                scales: {

                    y: {

                        beginAtZero: true,

                        max: 100,

                        ticks: {

                            stepSize: 20

                        }

                    }

                },

                plugins: {

                    ...defaultChartOptions.plugins,

                    title: {

                        display: true,

                        text: "Student Performance"

                    }

                }

            }

        }

    );

}



























// part 4 



/*==========================================
    ATTENDANCE CHART
==========================================*/

function initializeAttendanceChart() {

    if (

        !attendanceChartCanvas ||

        typeof Chart === "undefined"

    ) {

        return;

    }

    attendanceChart = new Chart(

        attendanceChartCanvas,

        {

            type: "doughnut",

            data: {

                labels: [

                    "Present",

                    "Absent",

                    "Leave"

                ],

                datasets: [

                    {

                        data: [

                            88,

                            8,

                            4

                        ],

                        backgroundColor: [

                            chartColors.success,

                            chartColors.danger,

                            chartColors.warning

                        ],

                        borderWidth: 0,

                        hoverOffset: 10

                    }

                ]

            },

            options: {

                ...defaultChartOptions,

                cutout: "65%",

                plugins: {

                    ...defaultChartOptions.plugins,

                    title: {

                        display: true,

                        text: "Attendance Overview"

                    }

                }

            }

        }

    );

}

/*==========================================
    DEPARTMENT CHART
==========================================*/

function initializeDepartmentChart() {

    if (
        !departmentChartCanvas ||
        typeof Chart === "undefined"
    ) {
        return;
    }

    departmentChart = new Chart(

        departmentChartCanvas,

        {
            type: "doughnut",

            data: {
                labels: [
                    "Computer Science",
                    "Software Engineering",
                    "Information Technology",
                    "Artificial Intelligence"
                ],
                datasets: [
                    {
                        data: [90, 70, 55, 35],
                        backgroundColor: [
                            chartColors.primary,
                            chartColors.secondary,
                            chartColors.success,
                            chartColors.purple
                        ],
                        borderWidth: 0,
                        hoverOffset: 10
                    }
                ]
            },

            options: {
                ...defaultChartOptions,
                cutout: "60%",
                plugins: {
                    ...defaultChartOptions.plugins,
                    title: {
                        display: true,
                        text: "Students by Department"
                    }
                }
            }
        }
    );
}

/*==========================================
    GPA CHART
==========================================*/

function initializeGpaChart() {

    if (
        !gpaChartCanvas ||
        typeof Chart === "undefined"
    ) {
        return;
    }

    gpaChart = new Chart(

        gpaChartCanvas,

        {
            type: "line",

            data: {
                labels: [
                    "Semester 1",
                    "Semester 2",
                    "Semester 3",
                    "Semester 4",
                    "Semester 5",
                    "Semester 6"
                ],
                datasets: [
                    {
                        label: "GPA",
                        data: [3.4, 3.5, 3.6, 3.7, 3.75, 3.82],
                        borderColor: chartColors.primary,
                        backgroundColor: "rgba(79,70,229,0.15)",
                        fill: true,
                        tension: 0.4,
                        pointRadius: 5,
                        pointHoverRadius: 7,
                        pointBackgroundColor: chartColors.primary,
                        pointBorderWidth: 2
                    }
                ]
            },

            options: {
                ...defaultChartOptions,
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 4,
                        ticks: {
                            stepSize: 1
                        }
                    }
                },
                plugins: {
                    ...defaultChartOptions.plugins,
                    title: {
                        display: true,
                        text: "GPA Trend"
                    }
                }
            }
        }
    );
}















































// part 5 



/*==========================================
    SUBJECT TREND CHART
==========================================*/

function initializeSubjectTrendChart() {

    if (

        !subjectChartCanvas ||

        typeof Chart === "undefined"

    ) {

        return;

    }

    subjectChart = new Chart(

        subjectChartCanvas,

        {

            type: "line",

            data: {

                labels: [

                    "Quiz 1",

                    "Quiz 2",

                    "Assignment",

                    "Mid",

                    "Project",

                    "Final"

                ],

                datasets: [

                    {

                        label: "Average Marks",

                        data: [

                            72,

                            78,

                            81,

                            76,

                            88,

                            91

                        ],

                        borderColor: chartColors.primary,

                        backgroundColor: "rgba(79,70,229,0.15)",

                        fill: true,

                        tension: 0.4,

                        pointRadius: 5,

                        pointHoverRadius: 7,

                        pointBackgroundColor: chartColors.primary,

                        pointBorderWidth: 2

                    }

                ]

            },

            options: {

                ...defaultChartOptions,

                scales: {

                    y: {

                        beginAtZero: true,

                        max: 100,

                        ticks: {

                            stepSize: 20

                        }

                    }

                },

                plugins: {

                    ...defaultChartOptions.plugins,

                    title: {

                        display: true,

                        text: "Subject Performance Trend"

                    }

                }

            }

        }

    );

}





























// part 6 


/*==========================================
    UPDATE CHARTS
==========================================*/

function updateAllCharts() {

    [

        performanceChart,

        attendanceChart,

        subjectChart,

        progressChart,

        dashboardChart

    ].forEach(chart => {

        if (chart) {

            chart.update();

        }

    });

}

/*==========================================
    RESIZE CHARTS
==========================================*/

function resizeAllCharts() {

    [

        performanceChart,

        attendanceChart,

        subjectChart,

        progressChart,

        dashboardChart

    ].forEach(chart => {

        if (chart) {

            chart.resize();

        }

    });

}

/*==========================================
    GET CHART BY NAME
==========================================*/

function getChart(name) {

    if (!name) {

        return null;

    }

    switch (name.toLowerCase()) {

        case "performance":
            return performanceChart;

        case "attendance":
            return attendanceChart;

        case "subject":
            return subjectChart;

        case "progress":
            return progressChart;

        case "dashboard":
            return dashboardChart;

        default:
            return null;

    }

}

/*==========================================
    WINDOW RESIZE
==========================================*/

window.addEventListener(

    "resize",

    () => {

        resizeAllCharts();

    }

);