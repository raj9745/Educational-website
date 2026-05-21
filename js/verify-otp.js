document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('otp-form');
  const otpInput = document.getElementById('otpInput');
  const resendBtn = document.getElementById('resendBtn');

  const registrationRaw = sessionStorage.getItem('registrationData');
  const currentOtp = () => sessionStorage.getItem('registrationOTP');

  if (!registrationRaw) {
    // No registration in progress
    alert('No registration in progress. Please register first.');
    window.location.href = 'register.html';
    return;
  }

  const registration = JSON.parse(registrationRaw);

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const entered = otpInput.value.trim();
    const stored = currentOtp();
    if (!stored) {
      alert('OTP expired or missing. Please resend.');
      return;
    }
    if (entered === stored) {
      // Registration success: store user in localStorage (demo)
      const usersRaw = localStorage.getItem('edu_users');
      const users = usersRaw ? JSON.parse(usersRaw) : [];
      users.push({ name: registration.fullName, email: registration.email, password: registration.password });
      localStorage.setItem('edu_users', JSON.stringify(users));

      // Cleanup
      sessionStorage.removeItem('registrationOTP');
      sessionStorage.removeItem('registrationData');

      alert('OTP verified! Redirecting to dashboard...');
      window.location.href = 'dashboard.html';
    } else {
      alert('Incorrect OTP. Please try again.');
    }
  });

  resendBtn.addEventListener('click', function () {
    // Generate a new OTP and send via EmailJS
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    sessionStorage.setItem('registrationOTP', otp);

    const SERVICE_ID = 'service_jcy6qwn';
    const TEMPLATE_ID = 'template_8y83jsg';

    const templateParams = {
      to_name: registration.fullName,
      user_name: registration.fullName,
      full_name: registration.fullName,
      name: registration.fullName,
      to_email: registration.email,
      user_email: registration.email,
      email: registration.email,
      reply_to: registration.email,
      recipient_email: registration.email,
      recipient: registration.email,
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

    resendBtn.disabled = true;
    resendBtn.textContent = 'Resending...';

    if (!window.emailjs) {
      alert('EmailJS not available. Initialize SDK and replace placeholders.');
      resendBtn.disabled = false;
      resendBtn.textContent = 'Resend OTP';
      return;
    }

    emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams)
      .then(() => {
        alert('OTP resent to ' + registration.email);
        resendBtn.disabled = false;
        resendBtn.textContent = 'Resend OTP';
      })
      .catch((err) => {
        console.error('EmailJS error:', err);
        const errorText = err && err.text ? err.text : JSON.stringify(err);
        alert('Failed to resend OTP. Details logged to console.\n' + errorText);
        resendBtn.disabled = false;
        resendBtn.textContent = 'Resend OTP';
      });
  });
});
