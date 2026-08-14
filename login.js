const loginBtn =
    document.getElementById("loginBtn");

loginBtn.addEventListener("click", function () {

    const email =
        document
            .getElementById("loginEmail")
            .value
            .trim()
            .toLowerCase();

    const password =
        document.getElementById("loginPassword")
        .value;

    const loginMessage =
        document.getElementById("loginMessage");


    // Empty field validation
    if (email === "" || password === "") {

        loginMessage.textContent =
            "Please enter email and password.";

        return;
    }


    // Email validation
    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {

        loginMessage.textContent =
            "Please enter a valid email address.";

        return;
    }


    // Get all users
    const users =
        JSON.parse(
            localStorage.getItem("users")
        ) || [];


    // Find matching user
    const user =
        users.find(function (user) {

            return (
                user.email === email &&
                user.password === password
            );

        });


    // Login failed
    if (!user) {

        loginMessage.textContent =
            "Invalid email or password.";

        return;
    }


    // Save logged-in user
    localStorage.setItem(
        "expenseUser",
        JSON.stringify(user)
    );

    localStorage.setItem(
        "isLoggedIn",
        "true"
    );


    // Open Expense Tracker
    window.location.href =
        "index.html";

});