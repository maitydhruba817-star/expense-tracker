// ===============================
// USER DATA
// ===============================

const currentUser =
    JSON.parse(localStorage.getItem("expenseUser"));

const profileName =
    document.getElementById("profileName");

const profileEmail =
    document.getElementById("profileEmail");

const editProfileBtn =
    document.getElementById("editProfileBtn");



if (!currentUser) {
    window.location.href = "login.html";
}

const userEmail =
    currentUser.email;

const transactionKey =
    "transactions_" + userEmail;

const budgetKey =
    "budget_" + userEmail;

let transactions =
    JSON.parse(localStorage.getItem(transactionKey)) || [];

let budget =
    Number(localStorage.getItem(budgetKey)) || 0;

let editId = null;


// ===============================
// ELEMENTS
// ===============================

const balance =
    document.getElementById("balance");

const income =
    document.getElementById("income");

const expense =
    document.getElementById("expense");

const text =
    document.getElementById("text");

const amount =
    document.getElementById("amount");

const type =
    document.getElementById("type");

const addBtn =
    document.getElementById("addBtn");

const logoutBtn =
    document.getElementById("logoutBtn");

const list =
    document.getElementById("list");

const category =
    document.getElementById("category");

const date =
    document.getElementById("date");

const search =
    document.getElementById("search");

const filter =
    document.getElementById("filter");

const themeBtn =
    document.getElementById("themeBtn");

const securityToggle =
    document.getElementById("securityToggle");

const securityContent =
    document.getElementById("securityContent");

const securityArrow =
    document.getElementById("securityArrow");

const navHome =
    document.getElementById("navHome");

const navTransactions =
    document.getElementById("navTransactions");

const navReports =
    document.getElementById("navReports");

const navProfile =
    document.getElementById("navProfile");

 const changePasswordBtn =
    document.getElementById("changePasswordBtn");

const oldPassword =
    document.getElementById("oldPassword");

const newPassword =
    document.getElementById("newPassword");

const confirmNewPassword =
    document.getElementById("confirmNewPassword");

const updatePasswordBtn =
    document.getElementById("updatePasswordBtn");

const passwordMessage =
    document.getElementById("passwordMessage");   

const budgetLimit =
    document.getElementById("budgetLimit");

const saveBudget =
    document.getElementById("saveBudget");

const budgetMessage =
    document.getElementById("budgetMessage");

const progressBar =
    document.getElementById("progressBar");

const totalTransactions =
    document.getElementById("totalTransactions");

const latestTransaction =
    document.getElementById("latestTransaction");

const expenseChart =
    document.getElementById("expenseChart");

const reportMonth =
    document.getElementById("reportMonth");

const reportIncome =
    document.getElementById("reportIncome");

const reportExpense =
    document.getElementById("reportExpense");

const reportBalance =
    document.getElementById("reportBalance");

const reportTransactions =
    document.getElementById("reportTransactions");

let chart;
// ===============================
// TOAST NOTIFICATION
// ===============================

function showToast(message, type = "success") {

    const toast =
        document.getElementById("toast");

    toast.textContent = message;

    toast.className = "show " + type;

    setTimeout(() => {

        toast.className = "";

    }, 3000);
}

// ===============================
// EVENT LISTENERS
// ===============================

addBtn.addEventListener(
    "click",
    addTransaction
);

updatePasswordBtn.addEventListener(
    "click",
    changePassword
);

logoutBtn.addEventListener(
    "click",
    logout
);

saveBudget.addEventListener(
    "click",
    setBudget
);

search.addEventListener(
    "input",
    updateUI
);

filter.addEventListener(
    "change",
    updateUI
);

reportMonth.addEventListener(
    "change",
    updateMonthlyReport
);

themeBtn.addEventListener(
    "click",
    toggleTheme
);
const exportBtn =
    document.getElementById("exportBtn");

exportBtn?.addEventListener(
    "click",
    exportCSV
);
securityToggle?.addEventListener(
    "click",
    function () {

        const isOpen =
            securityContent.style.display !== "none";

        if (isOpen) {

            securityContent.style.display = "none";
            securityArrow.textContent = "▶";

        } else {

            securityContent.style.display = "block";
            securityArrow.textContent = "▼";
        }

    }
);
// ===============================
// EDIT PROFILE NAME
// ===============================

editProfileBtn?.addEventListener(
    "click",
    editProfileName
);
// ===============================
// BOTTOM NAVIGATION
// ===============================


navHome?.addEventListener("click", function () {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});


navTransactions?.addEventListener("click", function () {

    document
        .querySelector(".transaction-form")
        ?.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

});

navProfile?.addEventListener("click", function () {

    document
        .querySelector(".profile-box")
        ?.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

});
// ===============================
// DARK MODE
// ===============================

function toggleTheme() {

    document.body.classList.toggle("dark");

    const isDark =
        document.body.classList.contains("dark");

    localStorage.setItem(
        "darkMode",
        isDark
    );

    if (isDark) {

        themeBtn.textContent =
            "☀️ Light Mode";

    } else {

        themeBtn.textContent =
            "🌙 Dark Mode";
    }
}


// ===============================
// LOGOUT
// ===============================

function logout() {

    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("expenseUser");

    window.location.href = "login.html";
}
// ===============================
// CHANGE PASSWORD
// ===============================

function changePassword() {

    const oldPass =
        oldPassword.value;

    const newPass =
        newPassword.value;

    const confirmPass =
        confirmNewPassword.value;


    if (
        oldPass === "" ||
        newPass === "" ||
        confirmPass === ""
    ) {

        passwordMessage.textContent =
            "Please fill all password fields.";

        return;
    }


    if (oldPass !== currentUser.password) {

        passwordMessage.textContent =
            "❌ Current password is incorrect.";

        return;
    }


    if (newPass.length < 6) {

        passwordMessage.textContent =
            "⚠️ New password must be at least 6 characters.";

        return;
    }


    if (newPass !== confirmPass) {

        passwordMessage.textContent =
            "❌ New passwords do not match.";

        return;
    }


    // Get all users
    let users =
        JSON.parse(
            localStorage.getItem("users")
        ) || [];


    // Find current user
    const userIndex =
        users.findIndex(
            user =>
                user.email === currentUser.email
        );


    if (userIndex === -1) {

        passwordMessage.textContent =
            "❌ Account not found.";

        return;
    }


    // Update password
    users[userIndex].password =
        newPass;


    // Save users
    localStorage.setItem(
        "users",
        JSON.stringify(users)
    );


    // Update current user
    currentUser.password =
        newPass;

    localStorage.setItem(
        "expenseUser",
        JSON.stringify(currentUser)
    );


    passwordMessage.textContent =
        "✅ Password changed successfully!";


    oldPassword.value = "";
    newPassword.value = "";
    confirmNewPassword.value = "";
}

// ===============================
// SET BUDGET
// ===============================

function setBudget() {

    const value =
        Number(budgetLimit.value);

    if (value <= 0) {

        alert(
            "Please enter a valid budget."
        );

        return;
    }

    budget = value;

    localStorage.setItem(
        budgetKey,
        budget
    );

    budgetLimit.value = "";

    updateUI();
}


// ===============================
// ADD / UPDATE TRANSACTION
// ===============================

function addTransaction() {

    const description =
        text.value.trim();

    const value =
        Number(amount.value);

    const transactionType =
        type.value;

    if (
        description === "" ||
        value <= 0
    ) {

        alert(
            "Please enter valid data."
        );

        return;
    }
 
    // ===========================
    // EDIT MODE
    // ===========================

    const wasEditing = editId !== null;

    if (editId !== null) {

        const index =
            transactions.findIndex(
                item =>
                    item.id === editId
            );

        if (index !== -1) {

            transactions[index] = {

                id: editId,

                description:
                    description,

                amount:
                    value,

                type:
                    transactionType,

                category:
                    category.value,

                date:
                    date.value
            };
        }

        editId = null;

        addBtn.textContent =
            "Add Transaction";
    }


    // ===========================
    // ADD MODE
    // ===========================

    else {

        const transaction = {

            id: Date.now(),

            description:
                description,

            amount:
                value,

            type:
                transactionType,

            category:
                category.value,

            date:
                date.value
        };

        transactions.push(
            transaction
        );
    }


    saveTransactions();

    updateUI();

    showToast(
    "✅ Transaction added successfully!"
);


    // Clear inputs

    text.value = "";

    amount.value = "";

    category.value = "Food";

    date.value = "";

    type.value = "expense";
}

// ===============================
// PROFILE
// ===============================

function updateProfile() {

    if (!currentUser) {
        return;
    }

    profileName.textContent =
        currentUser.name || "No Name";

    profileEmail.textContent =
        currentUser.email || "No Email";
}

function editProfileName() {

    if (!currentUser) {
        return;
    }

    const newName =
        prompt(
            "Enter your new name:",
            currentUser.name
        );

    if (newName === null) {
        return;
    }

    const name =
        newName.trim();

    if (name === "") {
        alert("Name cannot be empty.");
        return;
    }

    let users =
        JSON.parse(
            localStorage.getItem("users")
        ) || [];

    const userIndex =
        users.findIndex(
            user =>
                user.email === currentUser.email
        );

    if (userIndex === -1) {
        alert("Account not found.");
        return;
    }

    users[userIndex].name = name;

    localStorage.setItem(
        "users",
        JSON.stringify(users)
    );

    currentUser.name = name;

    localStorage.setItem(
        "expenseUser",
        JSON.stringify(currentUser)
    );

    updateProfile();

    alert("✅ Name updated successfully!");
}

// ===============================
// UPDATE UI
// ===============================

function updateUI() {

    list.innerHTML = "";

    let totalIncome = 0;

    let totalExpense = 0;


    // ===========================
    // SEARCH + FILTER
    // ===========================

    transactions

        .filter(transaction => {

            const description =
                transaction.description || "";

            const transactionType =
                transaction.type || "";


            const matchesSearch =
                description
                    .toLowerCase()
                    .includes(
                        search.value
                            .toLowerCase()
                    );


            const matchesFilter =
                filter.value === "all" ||
                transactionType ===
                    filter.value;


            return (
                matchesSearch &&
                matchesFilter
            );
        })


        // ===========================
        // DISPLAY TRANSACTIONS
        // ===========================

        .forEach(transaction => {

            const li =
                document.createElement("li");

            li.className =
                transaction.type === "income"
                    ? "income-item"
                    : "expense-item";


            li.innerHTML = `

                <span>

                    <b>
                        ${transaction.description}
                    </b>

                    <br>

                    ₹${transaction.amount}

                    <br>

                    📂 ${
                        transaction.category ||
                        "Other"
                    }

                    <br>

                    📅 ${
                        transaction.date ||
                        "No Date"
                    }

                    <br>

                    ${
                        transaction.type === "income"
                            ? "🟢 Income"
                            : "🔴 Expense"
                    }

                </span>


                <div>

                    <button
                        onclick="editTransaction(${transaction.id})">

                        ✏️

                    </button>


                    <button
                        onclick="deleteTransaction(${transaction.id})">

                        ❌

                    </button>

                </div>
            `;


            list.appendChild(li);


            // Calculate totals

            if (
                transaction.type === "income"
            ) {

                totalIncome +=
                    Number(
                        transaction.amount
                    );

            } else {

                totalExpense +=
                    Number(
                        transaction.amount
                    );
            }

        });


    // ===========================
    // UPDATE SUMMARY
    // ===========================

    income.textContent =
        `₹${totalIncome}`;

    expense.textContent =
        `₹${totalExpense}`;

    balance.textContent =
        `₹${totalIncome - totalExpense}`;


    // ===========================
    // UPDATE DASHBOARD
    // ===========================

    updateDashboard();


    // ===========================
    // UPDATE CHART
    // ===========================

    updateChart();


    // ===========================
    // UPDATE BUDGET
    // ===========================

    updateBudget(
        totalExpense
    );


    // ===========================
    // UPDATE MONTHLY REPORT
    // ===========================

    updateMonthlyReport();

    updateProfile();
}
// ===============================
// SET CURRENT MONTH
// ===============================

function setCurrentMonth() {

    const now = new Date();

    const year =
        now.getFullYear();

    const month =
        String(now.getMonth() + 1)
        .padStart(2, "0");

    reportMonth.value =
        `${year}-${month}`;

}

// ===============================
// MONTHLY REPORT
// ===============================

    function updateMonthlyReport() {

    const selectedMonth = reportMonth.value;

    // Month not selected
    if (!selectedMonth) {

        reportIncome.textContent = "₹0";
        reportExpense.textContent = "₹0";
        reportBalance.textContent = "₹0";
        reportTransactions.textContent = "0";

        return;
    }


    let monthlyIncome = 0;
    let monthlyExpense = 0;
    let monthlyTransactions = 0;


    transactions.forEach(transaction => {

        // Skip transactions without a valid date
        if (!transaction.date) {
            return;
        }


        // Convert date safely to YYYY-MM
        const dateParts =
            transaction.date.split("-");


        if (dateParts.length !== 3) {
            return;
        }


        const transactionMonth =
            `${dateParts[0]}-${dateParts[1]}`;


        // Check selected month
        if (transactionMonth === selectedMonth) {

            monthlyTransactions++;


            if (transaction.type === "income") {

                monthlyIncome +=
                    Number(transaction.amount);

            } else {

                monthlyExpense +=
                    Number(transaction.amount);
            }
        }

    });


    const monthlyBalance =
        monthlyIncome - monthlyExpense;


    reportIncome.textContent =
        `₹${monthlyIncome}`;

    reportExpense.textContent =
        `₹${monthlyExpense}`;

    reportBalance.textContent =
        `₹${monthlyBalance}`;

    reportTransactions.textContent =
        monthlyTransactions;
}


// ===============================
// DASHBOARD
// ===============================

function updateDashboard() {

    totalTransactions.textContent =
        transactions.length;


    if (transactions.length > 0) {

        const latest =
            transactions[
                transactions.length - 1
            ];

        latestTransaction.textContent =
            latest.description;

    } else {

        latestTransaction.textContent =
            "None";
    }
}


// ===============================
// BUDGET
// ===============================

function updateBudget(
    totalExpense
) {

    if (budget <= 0) {

        budgetMessage.textContent =
            "No budget set";

        progressBar.style.width =
            "0%";

        return;
    }


    const percentage =
        (totalExpense / budget) * 100;


    progressBar.style.width =
        Math.min(
            percentage,
            100
        ) + "%";


    if (
        totalExpense > budget
    ) {

        budgetMessage.textContent =
            `⚠️ Budget exceeded by ₹${
                totalExpense - budget
            }`;
        showToast(
    `⚠️ Budget exceeded by ₹${
        totalExpense - budget
    }`,
    "error"
);

    } else {

        budgetMessage.textContent =
            `₹${
                budget - totalExpense
            } remaining`;
    }
}


// ===============================
// EXPENSE CHART
// ===============================

function updateChart() {

    const categoryTotals = {};


    transactions.forEach(
        transaction => {

            if (
                transaction.type ===
                "expense"
            ) {

                const transactionCategory =
                    transaction.category ||
                    "Other";


                if (
                    !categoryTotals[
                        transactionCategory
                    ]
                ) {

                    categoryTotals[
                        transactionCategory
                    ] = 0;
                }


                categoryTotals[
                    transactionCategory
                ] += Number(
                    transaction.amount
                );
            }
        }
    );

    const chartTitle =
    expenseChart.parentElement.querySelector(".no-expense-message");

if (Object.keys(categoryTotals).length === 0) {

    expenseChart.style.display = "none";

    if (!chartTitle) {

        const message =
            document.createElement("p");

        message.className =
            "no-expense-message";

        message.textContent =
            "📊 No expense data yet";

        message.style.textAlign = "center";
        message.style.padding = "60px 10px";
        message.style.color = "#6b7280";

        expenseChart.parentElement.appendChild(message);
    }

    if (chart) {
        chart.destroy();
        chart = null;
    }

    return;
}

expenseChart.style.display = "block";

if (chartTitle) {
    chartTitle.remove();
}


    if (chart) {

        chart.destroy();
    }


    chart = new Chart(
        expenseChart,
        {

            type: "pie",

            data: {

                labels:
                    Object.keys(
                        categoryTotals
                    ),

                datasets: [{

                    data:
                        Object.values(
                            categoryTotals
                        )

                }]
            },


            options: {

                responsive: true

            }

        }
    );
}
// ===============================
// EXPORT CSV
// ===============================

function exportCSV() {

    if (transactions.length === 0) {

        alert("No transactions to export.");

        return;
    }

    let csv =
        "Description,Amount,Type,Category,Date\n";


    transactions.forEach(transaction => {

        csv +=
            `"${transaction.description}",` +
            `"${transaction.amount}",` +
            `"${transaction.type}",` +
            `"${transaction.category || "Other"}",` +
            `"${transaction.date || "No Date"}"\n`;

    });


    const blob =
        new Blob(
            [csv],
            { type: "text/csv;charset=utf-8;" }
        );


    const url =
        URL.createObjectURL(blob);


    const link =
        document.createElement("a");

    link.href = url;

    link.download =
        "expense-report.csv";

    link.click();


    URL.revokeObjectURL(url);
}

// ===============================
// SAVE TRANSACTIONS
// ===============================

function saveTransactions() {

    localStorage.setItem(
        transactionKey,
        JSON.stringify(
            transactions
        )
    );
}


// ===============================
// DELETE TRANSACTION
// ===============================

function deleteTransaction(id) {

    transactions =
        transactions.filter(
            transaction =>
                transaction.id !== id
        );

    saveTransactions();

    updateUI();

    showToast(
        "🗑️ Transaction deleted successfully!",
        "error"
    );
}


// ===============================
// EDIT TRANSACTION
// ===============================

function editTransaction(id) {

    const transaction =
        transactions.find(
            item =>
                item.id === id
        );


    if (!transaction) {

        return;
    }


    text.value =
        transaction.description;

    amount.value =
        transaction.amount;

    type.value =
        transaction.type;

    category.value =
        transaction.category ||
        "Other";

    date.value =
        transaction.date || "";


    editId = id;


    addBtn.textContent =
        "Update Transaction";


    document
        .querySelector(
            ".transaction-form"
        )
        .scrollIntoView({
            behavior: "smooth"
        });
}


// ===============================
// INITIAL LOAD
// ===============================

updateUI();
setCurrentMonth();

// ===============================
// LOAD THEME
// ===============================

const savedTheme =
    localStorage.getItem(
        "darkMode"
    );

if (
    savedTheme === "true"
) {

    document.body.classList.add(
        "dark"
    );

    themeBtn.textContent =
        "☀️ Light Mode";
}
// ===============================
// CHANGE PASSWORD
// ===============================

function changePassword() {

    const oldPass =
        oldPassword.value;

    const newPass =
        newPassword.value;

    const confirmPass =
        confirmNewPassword.value;


    if (
        oldPass === "" ||
        newPass === "" ||
        confirmPass === ""
    ) {

        passwordMessage.textContent =
            "Please fill all password fields.";

        return;
    }


    if (oldPass !== currentUser.password) {

        passwordMessage.textContent =
            "❌ Current password is incorrect.";

        return;
    }


    if (newPass.length < 6) {

        passwordMessage.textContent =
            "⚠️ New password must be at least 6 characters.";

        return;
    }


    if (newPass !== confirmPass) {

        passwordMessage.textContent =
            "❌ New passwords do not match.";

        return;
    }


    // Get all users
    let users =
        JSON.parse(
            localStorage.getItem("users")
        ) || [];


    // Find current user
    const userIndex =
        users.findIndex(
            user =>
                user.email === currentUser.email
        );


    if (userIndex === -1) {

        passwordMessage.textContent =
            "❌ Account not found.";

        return;
    }


    // Update password
    users[userIndex].password =
        newPass;


    // Save users
    localStorage.setItem(
        "users",
        JSON.stringify(users)
    );


    // Update current user
    currentUser.password =
        newPass;

    localStorage.setItem(
        "expenseUser",
        JSON.stringify(currentUser)
    );


    passwordMessage.textContent =
        "✅ Password changed successfully!";


    oldPassword.value = "";
    newPassword.value = "";
    confirmNewPassword.value = "";
}