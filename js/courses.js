const tabs = document.querySelectorAll('.tab-btn');
const cards = Array.from(document.querySelectorAll('.course-card'));
const countNode = document.getElementById('course-count');
const emptyState = document.getElementById('course-empty');

let activeCategory = 'All';

function updateCount(visibleCount) {
  if (!countNode) return;
  countNode.textContent = `Showing ${visibleCount} course${visibleCount === 1 ? '' : 's'}`;
}

function applyFilter() {
  let visibleCount = 0;
//  checks the category and shows the courses according to the category and also counts the number 
// of visible courses and shows the count in the header section
  cards.forEach((card) => {
    const category = card.dataset.category || '';
    const isVisible = activeCategory === 'All' || category === activeCategory;
    card.style.display = isVisible ? 'block' : 'none';

    if (isVisible) {
      visibleCount += 1;
    }
  });

  if (emptyState) {
    emptyState.style.display = visibleCount === 0 ? 'block' : 'none';
  }

  updateCount(visibleCount);
}
// adds click event listeners to the category buttons and updates the active category and 
// applies the filter when a button is clicked

tabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    tabs.forEach((btn) => btn.classList.remove('active'));
    tab.classList.add('active');
    activeCategory = tab.dataset.category || 'All';
    applyFilter();
  });
});

applyFilter();

// popup the email whenever the user enter emails and susbribe the coruses 