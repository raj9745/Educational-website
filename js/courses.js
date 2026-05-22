const tabs = document.querySelectorAll('.tab-btn');
const cards = Array.from(document.querySelectorAll('.course-card'));
const countNode = document.getElementById('course-count');
const emptyState = document.getElementById('course-empty');

let activeCategory = 'All';

// Updates the small “showing courses” count label in the header.
function updateCount(visibleCount) {
  if (!countNode) return;
  countNode.textContent = `Showing ${visibleCount} course${visibleCount === 1 ? '' : 's'}`;
}

// Applies the category filter and toggles course card visibility.
function applyFilter() {
  let visibleCount = 0;

  cards.forEach((card) => {
    // Each card declares its category via a data attribute.
    // If the active category is “All”, all cards are visible.
    
    // NOTE: If the DOM doesn’t include #course-empty, the page still works.
    
    // Checks the category and shows the courses according to the category.
    // Also counts the number of visible courses.
    
    // Shows the count in the header section (via updateCount).
    
    
    // ----
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

// Adds click event listeners for each filter tab and re-runs the filter.
tabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    tabs.forEach((btn) => btn.classList.remove('active'));
    tab.classList.add('active');
    activeCategory = tab.dataset.category || 'All';
    applyFilter();
  });
});

// Initialize the UI based on the default active category.
applyFilter();

