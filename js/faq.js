const faqItems = document.querySelectorAll('.faq-item');
const searchInput = document.getElementById('faq-search');
const clearButton = document.getElementById('faq-clear');

faqItems.forEach((item) => {
  const button = item.querySelector('.faq-question');
  button.addEventListener('click', () => {
    item.classList.toggle('open');
  });
});

function filterFaqs() {
  const query = searchInput.value.trim().toLowerCase();
  faqItems.forEach((item) => {
    const text = item.textContent.toLowerCase();
    item.style.display = text.includes(query) ? 'block' : 'none';
  });
}

searchInput.addEventListener('input', filterFaqs);
clearButton.addEventListener('click', () => {
  searchInput.value = '';
  filterFaqs();
});
