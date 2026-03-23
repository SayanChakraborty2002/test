document.addEventListener("DOMContentLoaded", () => {
  let products = [
    { id: 1, name: "product-1", price: 100 },
    { id: 2, name: "product-2", price: 200 },
    { id: 3, name: "product-3", price: 300 },
  ];
  const productList = document.getElementById("product-list");
  const cartItems = document.getElementById("cart-items");
  const emptyCart = document.getElementById("empty-cart");
  const cartTotal = document.getElementById("cart-total");
  const totalPrice = document.getElementById("total-price");
  const checkoutBtn = document.getElementById("checkout-btn");

  let cart = JSON.parse(localStorage.getItem("itemCart")) || [];

  products.forEach((product) => {
    const productDiv = document.createElement("div");
    productDiv.classList.add("product");
    productDiv.innerHTML = `
        <span>${product.name}</span> 
        <span>${product.price.toFixed(2)}</span> 
        <button data-id="${product.id}">Add to cart</button>
        `;
    productList.appendChild(productDiv);
  });
  productList.addEventListener("click", (e) => {
    if (e.target.tagName !== "BUTTON") return;
    const productId = parseInt(e.target.getAttribute("data-id"));
    const productItem = products.find((item) => item.id === productId);
    addToCart(productItem);
  });

  function addToCart(product) {
    const newProduct = {
      ...product,
      productId: Date.now(),
    };
    cart.push(newProduct);
    localStorage.setItem("itemCart", JSON.stringify(cart));
    renderCart();
  }
  function renderCart() {
    cartItems.innerHTML = "";
    let cartPrice = 0;
    if (cart.length > 0) {
      cart.forEach((item) => {
        const id = item.productId;
        const cartItem = document.createElement("div");
        cartItem.setAttribute("id", id);
        cartItem.innerHTML = ` <span>Item: ${item.name} - </span> 
        <span>Price: ${item.price}</span> 
        <button data-id=${id} class="delete-btn">delete</button>
        `;
        cartPrice += item.price;
        cartItems.appendChild(cartItem);
      });
      totalPrice.innerText = cartPrice;
      cartTotal.classList.remove("hidden");
      emptyCart.classList.add("hidden");
    } else {
      cartTotal.classList.add("hidden");
      emptyCart.classList.remove("hidden");
    }
  }

  checkoutBtn.addEventListener("click", () => {
    alert("Products ordered successfully");
    totalPrice.innerText = "0.00";
    cart.length = 0;
    localStorage.removeItem("itemCart");
    renderCart();
  });

  cartItems.addEventListener("click", (e) => {
    console.log(e.target);
    if (!e.target.classList.contains("delete-btn")) return;
    const deletedItemId = e.target.getAttribute("data-id");
    cart = cart.filter((p) => {
      return p.productId !== Number(deletedItemId);
    });
    localStorage.setItem("itemCart", JSON.stringify(cart));
    renderCart();
  });
  renderCart();
});
