var cartItems = [];

function updateCartCount() {
  var cartCount = cartItems.length;
  var badge = document.querySelector(".badge");
  badge.textContent = cartCount;
  badge.style.display = cartCount > 0 ? "block" : "none";
}

function updateCartTotal() {
  var total = cartItems.reduce(function (sum, item) {
    return sum + item.price;
  }, 0);

  var totalAmount = document.querySelector(".total-amount");
  totalAmount.textContent = "$" + total.toFixed(2);
}

function renderCartItems() {
  var cartItemsList = document.querySelector(".cart-items");
  cartItemsList.innerHTML = "";

  cartItems.forEach(function (item) {
    var listItem = document.createElement("li");
    listItem.classList.add("cart-item");
    listItem.innerHTML = `
      <img src="${item.image}" alt="${item.title}" class="cart-item-image">
      <span>${item.title}</span>
      <span>$${item.price.toFixed(2)}</span>
      <button class="remove-item-btn" data-id="${item.id}">Remove</button>
    `;

    cartItemsList.appendChild(listItem);
  });

  var removeItemBtns = document.querySelectorAll(".remove-item-btn");
  removeItemBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var itemId = btn.dataset.id;
      removeItem(itemId);
    });
  });
}

function addItem(item) {
  cartItems.push(item);
  updateCartCount();
  updateCartTotal();
  renderCartItems();
}

function removeItem(itemId) {
  cartItems = cartItems.filter(function (item) {
    return item.id !== itemId;
  });
  updateCartCount();
  updateCartTotal();
  renderCartItems();
}

var cartToggleBtn = document.querySelector(".cart-toggle-btn");
var cartDropdown = document.querySelector(".cart-dropdown");
var checkoutBtn = document.querySelector(".checkout-btn");

cartToggleBtn.addEventListener("click", function () {
  cartDropdown.classList.toggle("show");
});

checkoutBtn.addEventListener("click", function () {
  if (cartItems.length > 0) {
    alert("Thank you for your purchase!");
    cartItems = [];
    updateCartCount();
    updateCartTotal();
    renderCartItems();
  } else {
    alert("Your cart is empty. Add some items to proceed to checkout.");
  }
});

// Test data
addItem({ id: "1", title: "Product 1", price: 10.99, image: "product1.jpg" });
addItem({ id: "2", title: "Product 2", price: 19.99, image: "product2.jpg" });
