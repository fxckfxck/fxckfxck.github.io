// Функция для переключения категорий
function showCategory(categoryId) {
  // Убираем активные классы у всех категорий и кнопок
  document.querySelectorAll(".category-section").forEach((section) => {
    section.classList.remove("active");
  });
  document.querySelectorAll(".switch-btn").forEach((button) => {
    button.classList.remove("active");
  });

  // Добавляем активный класс выбранной категории и кнопке
  document.getElementById(categoryId).classList.add("active");
  event.target.classList.add("active");
}

let cart = [];
let cartCount = 0;

function addToCart(id, name, price) {
  // Добавляем товар в массив корзины
  cart.push({ id, name, price });
  cartCount++;
  document.getElementById("cart-count").innerText = cartCount;

  // Показываем уведомление
  showNotification(`${name} добавлен в корзину!`);
}

function showNotification(message) {
  const notification = document.getElementById("notification");
  notification.innerText = message;
  notification.classList.add("show");

  setTimeout(() => {
    notification.classList.remove("show");
  }, 3000);
}

function redirectToCart() {
  // Логика перехода на страницу корзины
  console.log("Переход в корзину: ", cart);
  window.location.href = "cart.html";
}

// Навешиваем обработчики событий на кнопки "Купить"
document.querySelectorAll(".buy-btn").forEach((button) => {
  button.addEventListener("click", () => {
    const id = button.dataset.id;
    const name = button.dataset.name;
    const price = button.dataset.price;
    addToCart(id, name, price);
  });
});
