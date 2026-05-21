document.addEventListener('DOMContentLoaded', function () {
  const signOutBtn = document.getElementById('signOutBtn');
  const userGreeting = document.getElementById('userGreeting');

  const currentUserRaw = sessionStorage.getItem('edu_current_user');
  if (!currentUserRaw) {
    window.location.href = 'login.html';
    return;
  }

  const currentUser = JSON.parse(currentUserRaw);
  if (userGreeting) {
    userGreeting.textContent = 'Hi, ' + (currentUser.name || currentUser.email);
  }

  if (signOutBtn) {
    signOutBtn.style.display = 'inline-flex';
    signOutBtn.addEventListener('click', function () {
      sessionStorage.removeItem('edu_current_user');
      window.location.href = 'login.html';
    });
  }
});
