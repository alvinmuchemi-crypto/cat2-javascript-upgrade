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