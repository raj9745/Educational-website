// Client-side registration + OTP sending via EmailJS (demo)
// IMPORTANT: Replace the placeholders for EmailJS with your real IDs:
// - emailjs.init('YOUR_USER_ID') in the page
// - service ID and template ID below

document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('register-form');
  const toggle = document.getElementById('togglePassword');
  const toggleConfirm = document.getElementById('toggleConfirmPassword');
  const password = document.getElementById('password');
  const confirmPassword = document.getElementById('confirmPassword');

  toggle.addEventListener('click', () => {
    const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
    password.setAttribute('type', type);
    toggle.textContent = type === 'password' ? 'Show' : 'Hide';
  });

  toggleConfirm.addEventListener('click', () => {
    const type = confirmPassword.getAttribute('type') === 'password' ? 'text' : 'password';
    confirmPassword.setAttribute('type', type);
    toggleConfirm.textContent = type === 'password' ? 'Show' : 'Hide';
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const fullName = document.getElementById('fullName').value.trim();
    const email = document.getElementById('email').value.trim();
    const pwd = document.getElementById('password').value;
    const confirm = document.getElementById('confirmPassword').value;

    if (pwd !== confirm) {
      alert('Passwords do not match.');
      return;
    }

    // Generate a 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Save registration data and OTP to sessionStorage for the verification step
    const registration = { fullName, email, password: pwd };
    sessionStorage.setItem('registrationData', JSON.stringify(registration));
    sessionStorage.setItem('registrationOTP', otp);

    // Send OTP using EmailJS
    const SERVICE_ID = 'service_jcy6qwn';
    const TEMPLATE_ID = 'template_8y83jsg';

    const templateParams = {
      to_name: fullName,
      user_name: fullName,
      full_name: fullName,
      name: fullName,
      to_email: email,
      user_email: email,
      email: email,
      reply_to: email,
      recipient_email: email,
      recipient: email,
      otp: otp,
      otp_code: otp,
      verification_code: otp,
      code: otp,
      otp_message: 'Your OTP code is ' + otp,
      message: 'Your OTP code is ' + otp,
      body: 'Your OTP code is ' + otp,
      subject: 'Your talim.com OTP code',
      html_message: '<p>Your OTP code is <strong>' + otp + '</strong>.</p>',
      message_html: '<p>Your OTP code is <strong>' + otp + '</strong>.</p>'
    };

    console.log('Sending EmailJS OTP with params:', templateParams);

    // Provide user feedback while sending
    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending OTP...';

    if (!window.emailjs) {
      alert('EmailJS not loaded. Replace EmailJS SDK or initialize it with your user ID.');
      submitBtn.disabled = false;
      submitBtn.textContent = 'Create Account';
      return;
    }

    emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams)
      .then(() => {
        // On success, navigate to OTP verification page
        window.location.href = '../html/verify-otp.html';
      })
      .catch((err) => {
        console.error('EmailJS error:', err);
        const errorText = err && err.text ? err.text : JSON.stringify(err);
        alert('Failed to send OTP. Details logged to console.\n' + errorText);
        submitBtn.disabled = false;
        submitBtn.textContent = 'Create Account';
      });
  });
});
