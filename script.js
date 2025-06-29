// Add to cart (localStorage)
function addToCart(id, name, price) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const existing = cart.find(item => item.id === id);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ id, name, price, qty: 1 });
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  alert(`${name} added to cart!`);
}

// Render cart
function renderCart() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartDiv = document.getElementById("cart-items");
  const totalDiv = document.getElementById("cart-total");
  cartDiv.innerHTML = "";
  let total = 0;

  cart.forEach(item => {
    cartDiv.innerHTML += `
      <p>${item.name} x ${item.qty} — RM ${(item.price * item.qty).toFixed(2)}</p>
    `;
    total += item.price * item.qty;
  });

  totalDiv.innerText = `Total: RM ${total.toFixed(2)}`;
}

// Fake checkout
function submitOrder(e) {
  e.preventDefault();
  localStorage.removeItem("cart");
  alert("Thank you for your order! (Fake checkout)");
  window.location.href = "index.html";
}
