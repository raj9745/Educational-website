const filterButtons = document.querySelectorAll('.tab-btn');
const searchInput = document.getElementById('blog-search');
const searchButton = document.getElementById('blog-search-btn');
const clearButton = document.getElementById('blog-clear');
const countNode = document.getElementById('blog-count');
const emptyState = document.getElementById('blog-empty');
const cards = Array.from(document.querySelectorAll('.blog-card'));
const saveButtons = document.querySelectorAll('[data-save]');

const storageKey = 'talimSavedArticles';
const savedArticles = new Set(JSON.parse(localStorage.getItem(storageKey) || '[]'));
let activeCategory = 'All';

function syncSavedState() {
  cards.forEach((card) => {
    const id = card.dataset.articleId;
    const button = card.querySelector('.save-btn');
    if (!button) return;

    if (savedArticles.has(id)) {
      button.classList.add('saved');
      button.textContent = 'Saved';
      card.classList.add('saved');
    } else {
      button.classList.remove('saved');
      button.textContent = 'Save';
      card.classList.remove('saved');
    }
  });
}

function updateCount(visibleCount) {
  if (!countNode) return;
  countNode.textContent = `Showing ${visibleCount} article${visibleCount === 1 ? '' : 's'}`;
}

function applyFilters() {
  const query = searchInput.value.trim().toLowerCase();
  let visibleCount = 0;

  cards.forEach((card) => {
    const category = card.dataset.category || '';
    const text = card.textContent.toLowerCase();
    const matchesCategory = activeCategory === 'All' || category === activeCategory;
    const matchesSearch = query.length === 0 || text.includes(query);
    const isVisible = matchesCategory && matchesSearch;

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

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    filterButtons.forEach((btn) => btn.classList.remove('active'));
    button.classList.add('active');
    activeCategory = button.dataset.category || 'All';
    applyFilters();
  });
});

searchInput.addEventListener('input', applyFilters);

searchButton.addEventListener('click', applyFilters);

clearButton.addEventListener('click', () => {
  searchInput.value = '';
  activeCategory = 'All';
  filterButtons.forEach((btn) => {
    btn.classList.toggle('active', btn.dataset.category === 'All');
  });
  applyFilters();
});

saveButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const card = button.closest('.blog-card');
    if (!card) return;

    const id = card.dataset.articleId;
    if (savedArticles.has(id)) {
      savedArticles.delete(id);
    } else {
      savedArticles.add(id);
    }

    localStorage.setItem(storageKey, JSON.stringify(Array.from(savedArticles)));
    syncSavedState();
  });
});

syncSavedState();
applyFilters();


// / popup the email whenever the user enter emails and susbribe the courses 
function suscribe(){
    const email = document.getElementById('emailInput').value;
    const error = document.getElementById("errorMessage");
    if(email.trim()===''){
        error.innerText ="please enter your email"
    return;
    }
    error.innerText = "";
    const popup = document.getElementById('popupText');
    popup.innertext= `Thank you for subscribing with ${email}! You'll receive weekly updates.`;
    document.getElementById('popup').style.display = 'block';
}