// Toggle between Login and Register forms
function toggleForm() {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');

    if (loginForm.style.display === 'none') {
        loginForm.style.display = 'block';
        registerForm.style.display = 'none';
        clearForm('login-form'); // Clear login form when switching
    } else {
        loginForm.style.display = 'none';
        registerForm.style.display = 'block';
        clearForm('register-form'); // Clear register form when switching
    }

    clearFeedback(); // Clear feedback when switching forms
}

// Show Feedback Message
function showFeedback(message, type) {
    const feedback = document.getElementById('feedback-message');
    feedback.textContent = message;
    feedback.className = `feedback-message ${type}`; // Add the type (success/error)
    feedback.style.display = 'block'; // Ensure feedback is displayed

    // Automatically hide the feedback after 3 seconds
    setTimeout(() => {
        feedback.style.display = 'none';
    }, 3000);
}

// Clear Feedback Message
function clearFeedback() {
    const feedback = document.getElementById('feedback-message');
    feedback.style.display = 'none';
}

// Clear Input Fields
function clearForm(formId) {
    document.querySelectorAll(`#${formId} input`).forEach(input => {
        input.value = ''; // Clear inputs
    });
}

// Registration Function
function register() {
    const username = document.getElementById('register-username').value.trim();
    const password = document.getElementById('register-password').value.trim();

    if (!username && !password) {
        showFeedback('Please fill in both username and password.', 'error');
        return;
    } else if (!username) {
        showFeedback('Please fill in your username.', 'error');
        return;
    } else if (!password) {
        showFeedback('Please fill in your password.', 'error');
        return;
    }

    // Save user in localStorage
    const user = { username, password };
    localStorage.setItem('user', JSON.stringify(user));

    // Display success message
    showFeedback('Registration successful! Please login.', 'success');

    // After 3 seconds, switch to login form and clear the register form
    setTimeout(() => {
        clearForm('register-form');
        toggleForm(); // Switch to login form
    }, 3000); // 3 seconds to show the feedback message
}


// Login Function
function login() {
    const username = document.getElementById('login-username').value.trim();
    const password = document.getElementById('login-password').value.trim();

    // If username is missing
    if (!username) {
        showFeedback('Please enter your username.', 'error');
        return;
    }

    // If password is missing
    if (!password) {
        showFeedback('Please enter your password.', 'error');
        return;
    }

    const storedUser = JSON.parse(localStorage.getItem('user'));

    if (!storedUser || username !== storedUser.username || password !== storedUser.password) {
        showFeedback('Invalid username or password.', 'error');
        return;
    }

    showFeedback('Login successful! Redirecting...', 'success');

    // Redirect to secured page
    setTimeout(() => {
        window.location.href = 'secured.html';
    }, 1000);
}
