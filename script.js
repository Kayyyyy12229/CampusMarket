const signupForm = document.getElementById("signupForm");
const loginForm = document.getElementById("loginForm");
const toggleForm = document.getElementById("toggleForm");
const formTitle = document.getElementById("formTitle");
const message = document.getElementById("message");

toggleForm.addEventListener("click", () => {
  signupForm.classList.toggle("hidden");
  loginForm.classList.toggle("hidden");

  if (signupForm.classList.contains("hidden")) {
    formTitle.textContent = "Login";
    toggleForm.textContent = "Don't have an account? Sign Up";
    clearMessage();
  } else {
    formTitle.textContent = "Create Account";
    toggleForm.textContent = "Already have an account? Login";
    clearMessage();
  }
});

signupForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const username = document.getElementById("signupUsername").value.trim();
  const email = document.getElementById("signupEmail").value.trim();
  const password = document.getElementById("signupPassword").value.trim();

  if (!username || !email || !password) {
    showMessage("Please fill in all signup fields.", "red");
    return;
  }

  const user = {
    username,
    email,
    password
  };

  localStorage.setItem("user", JSON.stringify(user));
  showMessage("Account created successfully. You can now log in.", "green");
  signupForm.reset();
});

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value.trim();

  const savedUser = JSON.parse(localStorage.getItem("user"));

  if (!savedUser) {
    showMessage("No account found. Please sign up first.", "red");
    return;
  }

  if (email === savedUser.email && password === savedUser.password) {
    showMessage(`Welcome, ${savedUser.username}. Login successful.`, "green");
    loginForm.reset();
  } else {
    showMessage("Invalid email or password.", "red");
  }
});

function showMessage(text, color) {
  message.textContent = text;
  message.style.color = color;
}

function clearMessage() {
  message.textContent = "";
}