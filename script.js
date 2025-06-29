// Load products
async function loadProducts() {
  const res = await fetch('data/products.json');
  const products = await res.json();
  window.allProducts = products;
  renderProducts(products);
}

function renderProducts(products) {
  const grid = document.getElementById('product-grid');
  grid.innerHTML = '';
  products.forEach(p => {
    grid.innerHTML += `
      <div class="product-card">
        <img src="${p.image}" alt="${p.name}">
        <h3>${p.name}</h3>
        <p>RM ${p.price.toFixed(2)}</p>
        <a href="product.html?id=${p.id}">View</a>
      </div>
    `;
  });
}

function filterCategory(cat) {
  if (cat === 'all') renderProducts(window.allProducts);
  else renderProducts(window.allProducts.filter(p => p.category === cat));
}

function showProduct() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  fetch('data/products.json').then(res => res.json()).then(products => {
    const p = products.find(item => item.id === id);
    const div = document.getElementById('product-detail');
    div.innerHTML = `
      <h2>${p.name}</h2>
      <img src="${p.image}" alt="${p.name}">
      <p>${p.desc}</p>
      <p>RM ${p.price.toFixed(2)}</p>
      <button onclick="addToCart('${p.id}', '${p.name}', ${p.price})">Add to Cart</button>
    `;
  });
}

// Cart logic same as before
function addToCart(id, name, price) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  const found = cart.find(i => i.id === id);
  if (found) found.qty += 1;
  else cart.push({ id, name, price, qty: 1 });
  localStorage.setItem('cart', JSON.stringify(cart));
  alert(`${name} added!`);
}

function renderCart() {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  let html = '';
  let total = 0;
  cart.forEach(i => {
    html += `<p>${i.name} x ${i.qty} — RM ${(i.price * i.qty).toFixed(2)}
      <button onclick="changeQty('${i.id}', -1)">-</button>
      <button onclick="changeQty('${i.id}', 1)">+</button>
    </p>`;
    total += i.price * i.qty;
  });
  document.getElementById('cart-items').innerHTML = html;
  document.getElementById('cart-total').innerText = `Total: RM ${total.toFixed(2)}`;
}

function changeQty(id, diff) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  const i = cart.find(i => i.id === id);
  if (i) {
    i.qty += diff;
    if (i.qty <= 0) cart = cart.filter(x => x.id !== id);
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
  }
}

function showSummary() {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  let html = '';
  let total = 0;
  cart.forEach(i => {
    html += `<p>${i.name} x ${i.qty} — RM ${(i.price * i.qty).toFixed(2)}</p>`;
    total += i.price * i.qty;
  });
  document.getElementById('order-summary').innerHTML = html + `<h3>Total: RM ${total.toFixed(2)}</h3>`;
}

function placeOrder(e) {
  e.preventDefault();
  localStorage.removeItem('cart');
  alert('Order placed! Thank you!');
  window.location = 'index.html';
}

// Login / Signup
function loginUser(e) {
  e.preventDefault();
  const name = document.getElementById('usernameInput').value;
  localStorage.setItem('username', name);
  window.location = 'index.html';
}

function signupUser(e) {
  e.preventDefault();
  const name = document.getElementById('newUsername').value;
  localStorage.setItem('username', name);
  window.location = 'index.html';
}

function checkLogin() {
  const user = localStorage.getItem('username');
  if (user) {
    document.getElementById('username').innerText = user;
    document.getElementById('user-link').innerText = 'Logout';
    document.getElementById('user-link').href = '#';
    document.getElementById('user-link').onclick = () => { localStorage.removeItem('username'); window.location.reload(); };
  }
}
