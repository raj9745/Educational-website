document.addEventListener('DOMContentLoaded', function () {
  const form = document.querySelector('.contact-form');
  const messageOutput = document.getElementById('formMessage');

  if (!form || !messageOutput) return;

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    messageOutput.textContent = 'Message sent! Thank you for contacting us. We will respond shortly.';
    messageOutput.classList.add('visible');

    form.reset();

    setTimeout(() => {
      messageOutput.classList.remove('visible');
    }, 6000);
  });
});
