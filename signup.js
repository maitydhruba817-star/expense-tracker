const signupBtn =
    document.getElementById("signupBtn");

signupBtn.addEventListener("click", function () {

    const name =
        document.getElementById("signupName")
        .value
        .trim();

    const email =
        document.getElementById("signupEmail")
        .value
        .trim()
        .toLowerCase();

    const password =
        document.getElementById("signupPassword")
        .value;

    const confirmPassword =
        document.getElementById("confirmPassword")
        .value;

    const signupMessage =
        document.getElementById("signupMessage");

// Email validation
const emailPattern =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if (!emailPattern.test(email)) {

    signupMessage.textContent =
        "Please enter a valid email address.";

    return;
}
    if (
        name === "" ||
        email === "" ||
        password === "" ||
        confirmPassword === ""
    ) {

        signupMessage.textContent =
            "Please fill all fields.";

        return;
    }

if (password.length < 8) {

    signupMessage.textContent =
        "Password must be at least 8 characters.";

    return;
}

    if (
        password !== confirmPassword
    ) {

        signupMessage.textContent =
            "Passwords do not match.";

        return;
    }


    let users =
        JSON.parse(
            localStorage.getItem("users")
        ) || [];


    const existingUser =
        users.find(
            user =>
                user.email === email
        );


    if (existingUser) {

        signupMessage.textContent =
            "Account already exists. Please login.";

        return;
    }


    const newUser = {

        name: name,

        email: email,

        password: password

    };


    users.push(newUser);


    localStorage.setItem(
        "users",
        JSON.stringify(users)
    );


    signupMessage.textContent =
        "Account created successfully!";


    setTimeout(function () {

        window.location.href =
            "login.html";

    }, 1000);

});