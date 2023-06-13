// Сначала объявляем необходимые переменные 
(function() { const cartTable = document.getElementById('cart-table'); 
// Получаем таблицу по ID 
const cartBody = cartTable.querySelector('tbody'); 
// Получаем тело таблицы 
const total = document.getElementById('total-price'); 
// Получаем элемент для отображения общей стоимости

// Функция отрисовки корзины
function renderCart() {
    let cart = []; // Создаем пустой массив для корзины

    if (localStorage.getItem('cart')) { // Если в localStorage есть сохраненная корзина
        cart = JSON.parse(localStorage.getItem('cart')); // Получаем корзину из localStorage
    }

    cartBody.innerHTML = ''; // Очищаем тело таблицы

    let totalPrice = 0; // Создаем переменную для общей стоимости

    cart.forEach(item => { // Проходимся по каждому элементу корзины
        const row = document.createElement('tr'); // Создаем новую строку в таблице

        const name = document.createElement('td'); // Создаем ячейку для имени товара
        name.textContent = item.name; // Добавляем в нее имя товара

        const quantity = document.createElement('td'); // Создаем ячейку для количества товара
        const minusButton = document.createElement('button'); // Создаем кнопку для уменьшения количества товара
        minusButton.textContent = '-'; // Добавляем в нее знак минуса
        minusButton.addEventListener('click', () => { // Добавляем слушатель события по клику на кнопку
            if (item.quantity > 1) { // Если количество товара больше, чем 1
                item.quantity--; // Уменьшаем количество товара
                quantityValue.textContent = item.quantity; // Обновляем количество товара на странице
                updateCart(cart); // Обновляем корзину в localStorage
                totalPrice = calculateTotalPrice(cart); // Пересчитываем общую стоимость
                total.textContent = totalPrice + ' руб.'; // Обновляем общую стоимость на странице
            }
        });
        quantity.appendChild(minusButton); // Добавляем кнопку уменьшения количества в ячейку

        const quantityValue = document.createElement('span'); // Создаем элемент для отображения количества товара
        quantityValue.textContent = item.quantity; // Добавляем в него количество товара
        quantity.appendChild(quantityValue); // Добавляем элемент в ячейку

        const plusButton = document.createElement('button'); // Создаем кнопку для увеличения количества товара
        plusButton.textContent = '+'; // Добавляем в нее знак плюса
        plusButton.addEventListener('click', () => { // Добавляем слушатель события по клику на кнопку
            item.quantity++; // Увеличиваем количество товара
            quantityValue.textContent = item.quantity; // Обновляем количество товара на странице
            updateCart(cart); // Обновляем корзину в localStorage
            totalPrice = calculateTotalPrice(cart); // Пересчитываем общую стоимость
            total.textContent = totalPrice + ' руб.'; // Обновляем общую стоимость на странице
        });
        quantity.appendChild(plusButton); // Добавляем кнопку увеличения количества в ячейку

        const price = document.createElement('td'); // Создаем ячейку для цены товара
        price.textContent = item.price + ' руб.'; // Добавляем в нее цену товара

        const sum = document.createElement('td'); // Создаем ячейку для суммы покупки
        sum.textContent = item.price * item.quantity + ' руб.'; // Добавляем в нее сумму покупки

        const remove = document.createElement('td'); // Создаем ячейку для кнопки удаления товара
        const removeButton = document.createElement('button'); // Создаем кнопку удаления товара
        removeButton.textContent = 'Удалить'; // Добавляем в нее текст
        removeButton.addEventListener('click', () => { // Добавляем слушатель события по клику на кнопку
            const index = cart.indexOf(item); // Получаем индекс удаляемого элемента
            cart.splice(index, 1); // Удаляем элемент из корзины
            updateCart(cart); // Обновляем корзину в localStorage
            totalPrice = calculateTotalPrice(cart); // Пересчитываем общую стоимость
            total.textContent = totalPrice + ' руб.'; // Обновляем общую стоимость на странице
            renderCart(); // Перерисовываем таблицу корзины
        });
        remove.appendChild(removeButton); // Добавляем кнопку удаления в ячейку

        row.appendChild(name); // Добавляем ячейку с именем товара в строку
        row.appendChild(quantity); // Добавляем ячейку с количеством товара в строку
        row.appendChild(price); // Добавляем ячейку с ценой товара в строку
        row.appendChild(sum); // Добавляем ячейку с суммой покупки в строку
        row.appendChild(remove); // Добавляем ячейку с кнопкой удаления товара в строку

        cartBody.appendChild(row); // Добавляем строку в тело таблицы

        totalPrice += item.price * item.quantity; // Добавляем стоимость покупки к общей стоимости
    });

    total.textContent = totalPrice + ' руб.'; // Выводим общую стоимость на страницу
}

// Функция обновления корзины в localStorage
function updateCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart)); // Сохраняем корзину в localStorage
    updateCartCount(); // Обновляем количество товаров в корзине на странице
}

// Функция обновления количества товаров в корзине на странице
function updateCartCount() {
    let count = 0; // Создаем переменную для подсчета количества товаров

    if (localStorage.getItem('cart')) { // Если в localStorage есть сохраненная корзина
        const cart = JSON.parse(localStorage.getItem('cart')); // Получаем корзину из localStorage

        cart.forEach(item => { // Проходимся по каждому элементу корзины
            count += item.quantity; // Добавляем количество товара в общее количество товаров
        });
    }

    const cartCount = document.getElementById('cart-count'); // Получаем элемент для отображения количества товаров
    cartCount.textContent = count; // Выводим количество товаров на страницу
}

// Функция расчета общей стоимости товаров в корзине
function calculateTotalPrice(cart) {
    let totalPrice = 0; // Создаем переменную для общей стоимости
    cart.forEach(item => { // Проходимся по каждому элементу корзины
        totalPrice += item.price * item.quantity; // Добавляем стоимость покупки к общей стоимости
    });
    return totalPrice; // Возвращаем общую стоимость
}

    /*  Очищаем localStorage в случае, если в нем накопились лишние данные. 
		Удаляем Local Storage браузера по ключу 'cart', иначе удалим вообще все данные для всех сайтов. 
    		↓↓↓	Раскомментируй строчку ниже и обнови страницу.	*/
        	//localStorage.removeItem('cart');

renderCart(); // Отрисовываем корзину
updateCartCount(); // Обновляем количество товаров в корзине на странице
})(); // Окончание объявления функции и сразу ее вызов









