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

// ================================
// EmailJS Configuration
// ================================
  const EMAILJS_CONFIG = {
    publicKey: "fe5Kh-Q74vquPL5dn",
    serviceId: "service_h7gz6zi",
    templateId: "template_qe663dp"
  };

// ================================
// DOM Elements
// ================================
  const emailInput   = document.getElementById("emailInput");
  const errorMessage = document.getElementById("errorMessage");
  const popupBox     = document.getElementById("popup");
  const popupText    = document.getElementById("popupText");


// Initialize EmailJS
emailjs.init(EMAILJS_CONFIG.publicKey);


// Subscribe Function
async function subscribe() {

    const email = emailInput.value.trim();

    // Empty validation
    if (!email) {
      showError("Please enter your email.");
      return;
    }

    // Email format validation
    if (!isValidEmail(email)) {
      showError("Please enter a valid email address.");
      return;
    }

    clearError();

    try {

      await emailjs.send(
        EMAILJS_CONFIG.serviceId,
        EMAILJS_CONFIG.templateId,
        {
          user_email: email
        }
      );

      showSuccessPopup(email);

      // Clear input field
      emailInput.value = "";

    } catch (error) {

      console.error("EmailJS Error:", error);

      showError(
        "Failed to send email. Please try again later."
      );

    }
}


// Email Validation
function isValidEmail(email) {

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return emailRegex.test(email);
}
 
// Show Error Message
function showError(message) {

    errorMessage.textContent = message;
}

// ================================
// Clear Error Message
// ================================
function clearError() {

    errorMessage.textContent = "";
}

// ================================
// Success Popup
// ================================
function showSuccessPopup(email) {

    popupText.textContent =
      `Thank you for subscribing with ${email}! You'll receive weekly updates.`;

    popupBox.style.display = "block";
}

// ================================
// Close Popup
// ================================
function closePopup() {

    popupBox.style.display = "none";
}

// ===== Footer Newsletter Subscribe =====
const footerEmailInput = document.getElementById("footerEmailInput");
const footerJoinButton = document.getElementById("footerJoinBtn");
const footerNewsletterMessage = document.getElementById("footerNewsletterMessage");

if (footerJoinButton && footerEmailInput) {
  footerJoinButton.addEventListener("click", handleFooterSubscribe);
}

function handleFooterSubscribe() {
  const email = footerEmailInput.value.trim();

  if (!email) {
    showFooterMessage("Please enter your email address.", "red");
    return;
  }

  if (!isValidEmail(email)) {
    showFooterMessage("Please enter a valid email address.", "red");
    return;
  }

  emailjs
    .send(EMAILJS_CONFIG.serviceId, EMAILJS_CONFIG.templateId, {
      user_email: email
    })
    .then(() => {
      showFooterMessage(
        `Thank you for subscribing with ${email}! Check your inbox for updates.`,
        "lightgreen"
      );
      footerEmailInput.value = "";
    })
    .catch((error) => {
      console.error("Footer newsletter EmailJS error:", error);
      showFooterMessage("Failed to send subscription email. Please try again.", "red");
    });
}

function showFooterMessage(message, color) {
  if (!footerNewsletterMessage) return;
  footerNewsletterMessage.textContent = message;
  footerNewsletterMessage.style.color = color;
}