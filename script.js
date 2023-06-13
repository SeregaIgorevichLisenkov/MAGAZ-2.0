// Функция для создания карточки товара
function createCard(good) {
	let html = `
	<div class="good-card">
		<img src="${good.image}" alt="${good.name}">
		<h3>${good.name}</h3>
		<p>${good.description}</p>
		<div class="price">${good.price} руб.</div>
		<button onclick="addToCart(${good.id})">Добавить в корзину</button>
	</div>
	`;
	return html;
}

// Функция для отображения каталога товаров
function showCatalog() {
	let catalog = document.querySelector('.goods');
	for (let good of goods) {
		let cardHtml = createCard(good);
		catalog.insertAdjacentHTML('beforeend', cardHtml);
	}
}

// Функция для отображения корзины товаров
function showCart() {
	let cartTable = document.querySelector('.cart');
	let cartTotal = document.querySelector('.total-price')
	let totalPrice = 0;
	cartTable.innerHTML = '';
	for (let good of goodsInCart) {
		let item = goods.find(g => g.id === good.id);
		if (item) {
			let html = `
			<tr>
				<td>${item.name}</td>
				<td><input type="number" value="${good.quantity}" onchange="changeQuantity(${good.id}, this.value)"></td>
				<td>${item.price} руб.</td>
				<td>${item.price * good.quantity} руб.</td>
				<td><button onclick="removeFromCart(${good.id})">Удалить</button></td>
			</tr>
			`;
			cartTable.insertAdjacentHTML('beforeend', html);
			totalPrice += item.price * good.quantity;
		}
	}
	cartTotal.textContent = totalPrice;
}

updateCartCounter();