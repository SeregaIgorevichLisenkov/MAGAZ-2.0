(function () { const catalog = document.getElementById("catalog");

function renderGoods() { goods.forEach((good) => { const card = document.createElement("div"); card.classList.add("card");

  const image = document.createElement("img");
  image.src = good.image;
  image.alt = good.name;

  const name = document.createElement("h2");
  name.textContent = good.name;

  const description = document.createElement("p");
  description.textContent = good.description;

  const price = document.createElement("span");
  price.classList.add("price");
  price.textContent = good.price + " руб.";

  const button = document.createElement("button");
  button.textContent = "Добавить в корзину";
  button.addEventListener("click", () => {
    addToCart(good);
  });

  card.appendChild(image);
  card.appendChild(name);
  card.appendChild(description);
  card.appendChild(price);
  card.appendChild(button);

  catalog.appendChild(card);
});
}

function addToCart(good) { let cart = [];

if (localStorage.getItem("cart")) {
  cart = JSON.parse(localStorage.getItem("cart"));
}

const cartItem = cart.find((item) => item.id === good.id);

if (cartItem) {
  cartItem.quantity++;
} else {
  cart.push({
    id: good.id,
    name: good.name,
    price: good.price,
    quantity: 1,
  });
}

localStorage.setItem("cart", JSON.stringify(cart));
updateCartCount();
}

function updateCartCount() { const cartCount = document.getElementById("cart-count"); let count = 0;

if (localStorage.getItem("cart")) {
  const cart = JSON.parse(localStorage.getItem("cart"));

  cart.forEach((item) => {
    count += item.quantity;
  });
}

cartCount.textContent = count;
}

renderGoods(); updateCartCount(); })();