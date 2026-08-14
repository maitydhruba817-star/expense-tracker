// ===============================
// SIGN UP
// ===============================

const signupBtn =
    document.getElementById("signupBtn");


if (signupBtn) {

    signupBtn.addEventListener(
        "click",
        signup
    );
}


function signup() {

    const name =
        document.getElementById("signupName").value.trim();

    const email =
        document.getElementById("signupEmail").value.trim();

    const password =
        document.getElementById("signupPassword").value;

    const confirmPassword =
        document.getElementById("confirmPassword").value;

    const message =
        document.getElementById("signupMessage");


    if (
        name === "" ||
        email === "" ||
        password === "" ||
        confirmPassword === ""
    ) {

        message.textContent =
            "Please fill all fields.";

        return;
    }


    if (password !== confirmPassword) {

        message.textContent =
            "Passwords do not match.";

        return;
    }


    if (password.length < 6) {

        message.textContent =
            "Password must be at least 6 characters.";

        return;
    }


    const user = {

        name: name,

        email: email,

        password: password
    };


    localStorage.setItem(
        "expenseUser",
        JSON.stringify(user)
    );


    message.textContent =
        "Account created successfully!";


    setTimeout(() => {

        window.location.href =
            "login.html";

    }, 1000);
}


// ===============================
// LOGIN
// ===============================

const loginBtn =
    document.getElementById("loginBtn");


if (loginBtn) {

    loginBtn.addEventListener(
        "click",
        login
    );
}


function login() {

    const email =
        document.getElementById("loginEmail").value.trim();

    const password =
        document.getElementById("loginPassword").value;


    const message =
        document.getElementById("loginMessage");


    const savedUser =
        JSON.parse(
            localStorage.getItem("expenseUser")
        );


    if (!savedUser) {

        message.textContent =
            "No account found. Please Sign Up.";

        return;
    }


    if (
        email === savedUser.email &&
        password === savedUser.password
    ) {

        localStorage.setItem(
            "isLoggedIn",
            "true"
        );


        window.location.href =
            "index.html";

    }

    else {

        message.textContent =
            "Invalid email or password.";
    }
}