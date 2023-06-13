(function() {
    const cartTable = document.getElementById('cart-table');
    const cartBody = cartTable.querySelector('tbody');
    const total = document.getElementById('total-price');

    function renderCart() {
        let cart = [];

        if (localStorage.getItem('cart')) {
            cart = JSON.parse(localStorage.getItem('cart'));
        }

        cartBody.innerHTML = '';

        let totalPrice = 0;

        cart.forEach(item => {
            const row = document.createElement('tr');

            const name = document.createElement('td');
            name.textContent = item.name;

            const quantity = document.createElement('td');
            const minusButton = document.createElement('button');
            minusButton.textContent = '-';
            minusButton.addEventListener('click', () => {
                if (item.quantity > 1) {
                    item.quantity--;
                    quantityValue.textContent = item.quantity;
                    updateCart(cart);
                    totalPrice = calculateTotalPrice(cart);
                    total.textContent = totalPrice + ' руб.';
                }
            });
            quantity.appendChild(minusButton);

            const quantityValue = document.createElement('span');
            quantityValue.textContent = item.quantity;
            quantity.appendChild(quantityValue);

            const plusButton = document.createElement('button');
            plusButton.textContent = '+';
            plusButton.addEventListener('click', () => {
                item.quantity++;
                quantityValue.textContent = item.quantity;
                updateCart(cart);
                totalPrice = calculateTotalPrice(cart);
                total.textContent = totalPrice + ' руб.';
            });
            quantity.appendChild(plusButton);

            const price = document.createElement('td');
            price.textContent = item.price + ' руб.';

            const sum = document.createElement('td');
            sum.textContent = item.price * item.quantity + ' руб.';

            const remove = document.createElement('td');
            const removeButton = document.createElement('button');
            removeButton.textContent = 'Удалить';
            removeButton.addEventListener('click', () => {
                const index = cart.indexOf(item);
                cart.splice(index, 1);
                updateCart(cart);
                totalPrice = calculateTotalPrice(cart);
                total.textContent = totalPrice + ' руб.';
                renderCart(); // Добавляем эту строку для перерисовки таблицы
            });
            remove.appendChild(removeButton);

            row.appendChild(name);
            row.appendChild(quantity);
            row.appendChild(price);
            row.appendChild(sum);
            row.appendChild(remove);

            cartBody.appendChild(row);

            totalPrice += item.price * item.quantity;
        });

        total.textContent = totalPrice + ' руб.';
    }

    function updateCart(cart) {
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
    }

    function updateCartCount() {
        let count = 0;

        if (localStorage.getItem('cart')) {
            const cart = JSON.parse(localStorage.getItem('cart'));

            cart.forEach(item => {
                count += item.quantity;
            });
        }

        const cartCount = document.getElementById('cart-count');
        cartCount.textContent = count;
    }

    function calculateTotalPrice(cart) {
        let totalPrice = 0;
        cart.forEach(item => {
            totalPrice += item.price * item.quantity;
        });
        return totalPrice;
    }

    //  если в localStorage накопились лишние товары, раскомментируй эту строчку и обнови страницу. 
    	//  строка очистит все сохраненные данные в Local Storage браузера по ключу 'cart'
        	//localStorage.removeItem('cart');

    renderCart();
    updateCartCount();
})();












