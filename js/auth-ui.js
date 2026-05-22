(function () {
  function getCurrentUser() {
    try {
      const raw = sessionStorage.getItem('edu_current_user');
      if (!raw) return null;
      return JSON.parse(raw);
    } catch (e) {
      return null;
    }
  }

  function setHidden(el, hidden) {
    if (!el) return;
    el.style.display = hidden ? 'none' : '';
  }

  window.TalimAuthUI = {
    init() {
      const currentUser = getCurrentUser();
      const isLoggedIn = !!currentUser;

      const loginLinks = document.querySelectorAll('[data-auth-role="login"]');
      const getStartedLinks = document.querySelectorAll('[data-auth-role="get-started"]');
      const accountLinks = document.querySelectorAll('[data-auth-role="account"]');
      const signOutBtn = document.getElementById('signOutBtn');
      const greetingEl = document.getElementById('userGreeting');

      // Toggle login/get-started
      loginLinks.forEach((a) => setHidden(a, isLoggedIn));
      getStartedLinks.forEach((a) => setHidden(a, isLoggedIn));

      // Toggle account and signout
      accountLinks.forEach((a) => setHidden(a, !isLoggedIn));
      setHidden(signOutBtn, !isLoggedIn);

      if (greetingEl) {
        greetingEl.textContent = isLoggedIn
          ? 'Hi, ' + (currentUser.name || currentUser.email || 'User')
          : '';
      }

      if (signOutBtn) {
        signOutBtn.addEventListener('click', () => {
          sessionStorage.removeItem('edu_current_user');
          window.location.href = 'login.html';
        });
      }
    },
  };

  document.addEventListener('DOMContentLoaded', () => {
    // Only run if page opted in by providing any auth UI markers.
    const hasMarkers =
      document.querySelector('[data-auth-role="login"], [data-auth-role="get-started"], [data-auth-role="account"], #signOutBtn, #userGreeting') ||
      false;
    if (hasMarkers) window.TalimAuthUI.init();
  });
})();

