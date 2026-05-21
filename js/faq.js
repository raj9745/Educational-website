const faqItems = Array.from(document.querySelectorAll('.faq-item'));
const faqSections = Array.from(document.querySelectorAll('.faq-section'));
const searchInput = document.getElementById('faq-search');
const clearButton = document.getElementById('faq-clear');
const tabButtons = document.querySelectorAll('.faq-tab');
const expandButton = document.getElementById('faq-expand');
const collapseButton = document.getElementById('faq-collapse');
const countNode = document.getElementById('faq-count');

let activeCategory = 'All';

faqItems.forEach((item) => {
  const button = item.querySelector('.faq-question');
  button.addEventListener('click', () => {
    item.classList.toggle('open');
  });
});

function updateCount(visibleCount) {
  if (!countNode) return;
  countNode.textContent = `Showing ${visibleCount} answer${visibleCount === 1 ? '' : 's'}`;
}

function filterFaqs() {
  const query = searchInput.value.trim().toLowerCase();
  let visibleCount = 0;

  faqItems.forEach((item) => {
    const section = item.closest('.faq-section');
    const category = section ? section.dataset.category : '';
    const text = item.textContent.toLowerCase();
    const matchesCategory = activeCategory === 'All' || category === activeCategory;
    const matchesSearch = query.length === 0 || text.includes(query);
    const isVisible = matchesCategory && matchesSearch;

    item.style.display = isVisible ? 'block' : 'none';
    if (isVisible) {
      visibleCount += 1;
    }
  });

  faqSections.forEach((section) => {
    const visibleItems = section.querySelectorAll('.faq-item:not([style*="display: none"])');
    section.style.display = visibleItems.length ? 'block' : 'none';
  });

  updateCount(visibleCount);
}

tabButtons.forEach((button) => {
  button.addEventListener('click', () => {
    tabButtons.forEach((tab) => tab.classList.remove('active'));
    button.classList.add('active');
    activeCategory = button.dataset.category || 'All';
    filterFaqs();
  });
});

expandButton.addEventListener('click', () => {
  faqItems.forEach((item) => {
    item.classList.add('open');
  });
});

collapseButton.addEventListener('click', () => {
  faqItems.forEach((item) => {
    item.classList.remove('open');
  });
});

searchInput.addEventListener('input', filterFaqs);
clearButton.addEventListener('click', () => {
  searchInput.value = '';
  activeCategory = 'All';
  tabButtons.forEach((tab) => tab.classList.toggle('active', tab.dataset.category === 'All'));
  filterFaqs();
});

filterFaqs();
