/*	Оборачиваем всю логику в самовызывающуюся функцию для изоляции переменных
и избежания конфликта с другими скриптами. */
(function() { // Находим на странице элемент каталога, в который будем добавлять товары. 
        const catalog = document.getElementById("catalog");
        // Функция для отображения списка товаров в каталоге. 
        function renderGoods() { // Для каждого товара из массива goods создаем карточку. 
            goods.forEach((good) => { // Создаем элемент div и добавляем ему класс card. 
                const card = document.createElement("div");
                card.classList.add("card");

                // Создаем изображение товара и задаем ему src и alt текст.
                const image = document.createElement("img");
                image.src = good.image;
                image.alt = good.name;

                // Создаем заголовок для названия товара.
                const name = document.createElement("h2");
                name.textContent = good.name;

                // Создаем абзац для описания товара.
                const description = document.createElement("p");
                description.textContent = good.description;

                // Создаем элемент span и задаем ему класс price и текст цены.
                const price = document.createElement("span");
                price.classList.add("price");
                price.textContent = good.price + " руб.";

                // Создаем кнопку "Добавить в корзину" и добавляем ей обработчик клика,
                // чтобы при нажатии вызывалась функция добавления товара в корзину.
                const button = document.createElement("button");
                button.textContent = "Добавить в корзину";
                button.addEventListener("click", () => {
                    addToCart(good);
                });

                // Добавляем созданные элементы в карточку товара.
                card.appendChild(image);
                card.appendChild(name);
                card.appendChild(description);
                card.appendChild(price);
                card.appendChild(button);

                // Добавляем карточку товара в каталог.
                catalog.appendChild(card);
            });
        }

        // Функция для добавления товара в корзину. 
        function addToCart(good) {
            let cart = [];

            // Получаем список товаров, добавленных в корзину, из localStorage.
            if (localStorage.getItem("cart")) {
                cart = JSON.parse(localStorage.getItem("cart"));
            }

            // Проверяем, есть ли уже в корзине товар с таким же id, что и добавляемый.
            const cartItem = cart.find((item) => item.id === good.id);

            if (cartItem) {
                // Если товар уже есть в корзине, увеличиваем его количество на 1.
                cartItem.quantity++;
            } else {
                // Иначе добавляем товар со значением quantity = 1.
                cart.push({
                    id: good.id,
                    name: good.name,
                    price: good.price,
                    quantity: 1,
                });
            }

            // Сохраняем список товаров, добавленных в корзину, в localStorage и вызываем функцию обновления количества товаров в корзине.
            localStorage.setItem("cart", JSON.stringify(cart));
            updateCartCount();
        }

        // Функция для обновления количества товаров в корзине на странице. 
		function updateCartCount() { // Находим элемент, отображающий количество товаров в корзине. 
			const cartCount = document.getElementById("cart-count"); let count = 0;

        // Получаем список товаров, добавленных в корзину, из localStorage и
        // считаем общее количество товаров в корзине.
        if (localStorage.getItem("cart")) {
            const cart = JSON.parse(localStorage.getItem("cart"));

            cart.forEach((item) => {
                count += item.quantity;
            });
        }

        // Обновляем отображение количества товаров в корзине на странице.
        cartCount.textContent = count;
    }

    // Вызываем функции отображения списка товаров в каталоге и обновления количества товаров в корзине. 
	renderGoods(); updateCartCount(); })();