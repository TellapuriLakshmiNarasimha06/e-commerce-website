const products = [
  { id: 1, name: "T-Shirt", price: 20, img: "https://via.placeholder.com/200" },
  { id: 2, name: "Shoes", price: 50, img: "https://via.placeholder.com/200" },
  { id: 3, name: "Watch", price: 80, img: "https://via.placeholder.com/200" },
];

const cart = [];

function renderProducts() {
  const productList = document.getElementById("product-list");
  products.forEach(product => {
    const div = document.createElement("div");
    div.className = "product";
    div.innerHTML = `
      <img src="${product.img}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>$${product.price}</p>
      <button onclick="addToCart(${product.id})">Add to Cart</button>
    `;
    productList.appendChild(div);
  });
}

function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  const existing = cart.find(item => item.id === productId);

  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }

  updateCartUI();
}

function updateCartUI() {
  const cartItems = document.getElementById("cart-items");
  const cartCount = document.getElementById("cart-count");
  const cartTotal = document.getElementById("cart-total");

  cartItems.innerHTML = "";
  let total = 0;
  let itemCount = 0;

  cart.forEach(item => {
    total += item.price * item.qty;
    itemCount += item.qty;
    const li = document.createElement("li");
    li.textContent = `${item.name} x ${item.qty} - $${item.price * item.qty}`;
    cartItems.appendChild(li);
  });

  cartCount.textContent = itemCount;
  cartTotal.textContent = `Total: $${total.toFixed(2)}`;
}

renderProducts();
