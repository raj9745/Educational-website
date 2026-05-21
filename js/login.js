document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('login-form');
  const emailInput = document.getElementById('loginEmail');
  const passwordInput = document.getElementById('loginPassword');
  const togglePassword = document.getElementById('toggleLoginPassword');

  // Redirect to dashboard if already logged in
  const loggedUser = sessionStorage.getItem('edu_current_user');
  if (loggedUser) {
    window.location.href = 'dashboard.html';
    return;
  }

  togglePassword.addEventListener('click', () => {
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    togglePassword.textContent = type === 'password' ? 'Show' : 'Hide';
  });

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    const email = emailInput.value.trim();
    const password = passwordInput.value;
    const usersRaw = localStorage.getItem('edu_users');
    const users = usersRaw ? JSON.parse(usersRaw) : [];

    const user = users.find((u) => u.email === email && u.password === password);
    if (!user) {
      alert('Sign in failed. Please make sure your email and password are correct and your account is verified.');
      return;
    }

    sessionStorage.setItem('edu_current_user', JSON.stringify(user));
    window.location.href = 'dashboard.html';
  });
});
