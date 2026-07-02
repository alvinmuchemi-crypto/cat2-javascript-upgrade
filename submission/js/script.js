const services = [
  {
    name: "Photography",
    description: "Event photography, portraits, conferences, weddings, and commercial shoots.",
    price: "From KSh 8,000"
  },
  {
    name: "Videography",
    description: "Professional video production, documentaries, interviews, and promotional content.",
    price: "From KSh 15,000"
  },
  {
    name: "Live Streaming",
    description: "Multi-platform live streaming for events, conferences, and church services.",
    price: "From KSh 10,000"
  }
];

function renderServices() {
  const container = document.getElementById('service-container');
  if (!container) return;

  container.innerHTML = '';

  services.forEach(service => {
    const card = document.createElement('article');
    card.className = 'card';

    const title = document.createElement('h3');
    title.textContent = service.name;

    const desc = document.createElement('p');
    desc.textContent = service.description;

    const price = document.createElement('p');
    price.className = 'price';
    price.textContent = service.price;

    const addBtn = document.createElement('button');
    addBtn.type = 'button';
    addBtn.textContent = '+ Add to Wishlist';
    addBtn.addEventListener('click', () => addWishlistItem(service.name));

    card.appendChild(title);
    card.appendChild(desc);
    card.appendChild(price);
    card.appendChild(addBtn);

    container.appendChild(card);
  });
}
function addWishlistItem(name) {
  const trimmed = name.trim();
  if (trimmed === '') return;

  const list = getWishlist();
  list.push(trimmed);
  saveWishlist(list);
  renderWishlist();
}

function removeWishlistItem(index) {
  const list = getWishlist();
  list.splice(index, 1);
  saveWishlist(list);
  renderWishlist();
}

function renderWishlist() {
  const ul = document.getElementById('wishlist-list');
  const emptyMsg = document.getElementById('wishlist-empty');
  if (!ul || !emptyMsg) return;

  const list = getWishlist();
  ul.innerHTML = '';

  if (list.length === 0) {
    emptyMsg.textContent = 'Your wishlist is empty. Add a service above or type your own idea below.';
    return;
  }

  emptyMsg.textContent = '';

  list.forEach((item, index) => {
    const li = document.createElement('li');
    li.className = 'wishlist-item';

    const span = document.createElement('span');
    span.textContent = item;

    const removeBtn = document.createElement('button');
    removeBtn.type = 'button';
    removeBtn.className = 'remove-btn';
    removeBtn.textContent = 'Remove';
    removeBtn.addEventListener('click', () => {
      li.remove();
      removeWishlistItem(index);
    });

    li.appendChild(span);
    li.appendChild(removeBtn);
    ul.appendChild(li);
  });
}

function setupWishlistInput() {
  const input = document.getElementById('wishlist-input');
  const btn = document.getElementById('wishlist-add-btn');
  if (!input || !btn) return;

  btn.addEventListener('click', () => {
    addWishlistItem(input.value);
    input.value = '';
    input.focus();
  });

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      btn.click();
    }
  });
}
function setupContactForm() {
  const form = document.getElementById('contact-form');
  const feedback = document.getElementById('form-feedback');
  if (!form || !feedback) return;

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const name = document.getElementById('cf-name').value.trim();
    const email = document.getElementById('cf-email').value.trim();
    const service = document.getElementById('cf-service').value;
    const message = document.getElementById('cf-message').value.trim();

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const errors = [];

    if (name === '') {
      errors.push('Please enter your name.');
    }
    if (!emailPattern.test(email)) {
      errors.push('Please enter a valid email address.');
    }
    if (service === '') {
      errors.push('Please choose a service you\'re interested in.');
    }
    if (message === '') {
      errors.push('Please write a short message.');
    }

    if (errors.length > 0) {
      feedback.innerHTML = errors.join('<br>');
      feedback.className = 'form-feedback error';
      return;
    }

    feedback.textContent =
      `Thanks, ${name}! Your enquiry about ${service} has been received — we'll reply to ${email} soon.`;
    feedback.className = 'form-feedback success';
    form.reset();
  });
}
const WISHLIST_KEY = 'whiteStudiosWishlist';

function getWishlist() {
  const saved = localStorage.getItem(WISHLIST_KEY);
  return saved ? JSON.parse(saved) : [];
}

function saveWishlist(list) {
  localStorage.setItem(WISHLIST_KEY, JSON.stringify(list));
}