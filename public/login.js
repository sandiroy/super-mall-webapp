// Log every action
function logAction(action) {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${action}`);
}

// Handle login
document.getElementById("loginForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  auth.signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      logAction(`User logged in: ${email}`);
      alert("Login successful!");
      window.location.href = "admin.html"; // redirect after login
    })
    .catch((error) => {
      logAction(`Login failed for ${email}: ${error.message}`);
      alert("Login failed: " + error.message);
    });
});

// Handle signup
document.getElementById("signupLink").addEventListener("click", (e) => {
  e.preventDefault();
  const email = prompt("Enter email for new account:");
  const password = prompt("Enter password:");

  auth.createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      logAction(`New user created: ${email}`);
      alert("Account created successfully! Please login.");
    })
    .catch((error) => {
      logAction(`Signup failed: ${error.message}`);
      alert("Signup failed: " + error.message);
    });
});
