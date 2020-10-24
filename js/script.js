/* Просто получаею все нужные элементы и засовываю в переменные */
const popup = document.querySelector(".popup");
const popupBody = document.querySelector(".popup__body");
const popupList = document.querySelector(".popup__shopping-list");
const popupCost = document.querySelector(".popup__cost");
const body = document.querySelector("body");
const shoppingHeader = document.querySelector(".header__shopping-count");

/* Это для открытия модалки */
const timeout = 500;

/* Создаю массив продуктов в корзине */
var shopping = [];

/* Функция которая добавляет объект в массив */
var inShopping = (e) => {
  /* Получаю название продукта и его стоимость */
  let nameProduct = e.target.closest(".card-inner").querySelector(".card-title").outerText;
  let costProduct = e.target.closest(".purchase").querySelector(".restaurant-price").outerText;
  /* Флаг для проверки существования этого продукта в корзине  */
  let exist = false;

  //Проверка существования массива
  if (shopping.length > 0) {
    shopping.forEach((element) => {
      //Проверка существования такого продукта
      if (element.name === nameProduct) {
        exist = true;
      }
    });
    //Если не существует добавить
    if (!exist) {
      shopping.push({
        name: nameProduct,
        cost: costProduct,
        count: 1,
      });
      /* Подсчёт общей стоимости */
      calculateCost();
      /* Отрисовка корзины на сайт */
      shoppingToPopup();
    }
  }
  //Если массив пустой добавить
  else {
    shopping.push({
      name: nameProduct,
      cost: costProduct,
      count: 1,
    });
    calculateCost();
    shoppingToPopup();
  }
  /* Открыть модальное окно  */
  openPopup(e);
};

/* Увеличение */
var gainCount = (e) => {
  /* Получаю имя продукта */
  let name = e.target.closest(".popup__shopping-list__item").querySelector(".shopping-list__name")
    .outerText;
  /* нахожу этот продукт в корзине */
  shopping.forEach((element, index) => {
    if (element.name === name) {
      /* если такой продукт в корзине есть то увеличиваю их число на один */
      shopping[index].count += 1;
      /* Записываю это на страницу */
      e.target.previousElementSibling.innerText = shopping[index].count;
    }
  });
  /* Пересчёт общей стоимости */
  popupCost.innerText = calculateCost() + " P";
};

/* Уменьшение */
var reduceCount = (e) => {
  /* Получаю имя продукта */
  let name = e.target.closest(".popup__shopping-list__item").querySelector(".shopping-list__name")
    .outerText;
  /* Нахожу этот продукт в корзине */
  shopping.forEach((element, index) => {
    if (element.name === name) {
      /* Если такой продукт существует */
      if (shopping[index].count === 1) {
        /* Если его количество равно единице то я его удаляю из корзины */
        shopping.splice(index, 1);
        /* Перерисовываю всю корзину */
        shoppingToPopup();
        /* Записываю сколько осталось продуктов в корзине в шапку  */
        shoppingHeader.innerText = shopping.length;
      } else {
        /* если не 1 то уменьшаю на один и записываю на сайт */
        shopping[index].count -= 1;
        e.target.nextElementSibling.innerText = shopping[index].count;
      }
    }
  });
  /* Пересчёт общей стоимости */
  popupCost.innerText = calculateCost() + " P";
};

/* Обнуление корзины */
var cancel = (e) => {
  /* Убираю всё из корзины */
  shopping = [];
  /* Записываю в шапку что у нас нет в корзине ничего */
  shoppingHeader.innerText = shopping.length;
  /* Закрываю модалку */
  closePopup();
  /* Через время анимации перерисовываю корзину */
  setTimeout(() => {
    shoppingToPopup();
  }, timeout);
};

/* Функция перевода корзины из объекта в HTML */
function shoppingToHTML() {
  let shoppingHTML = "";
  if (shopping.length > 0) {
    shoppingHeader.innerText = shopping.length;
    shopping.forEach((element) => {
      shoppingHTML += `
    <li class="popup__shopping-list__item">
        <span class="shopping-list__name">${element.name}</span>
        <div class="shopping-list__cost">${element.cost}</div>
        <div class="shopping-list__buttons">
          <button class="shopping-list__button" onclick="reduceCount(event)">-</button>
          <span class="shopping-list__count">${element.count}</span>
          <button class="shopping-list__button" onclick="gainCount(event)">+</button>
        </div>
      </li>`;
    });
  } else {
    shoppingHTML += `<h2 class="popup__shopping-empty">Корзина пуста</h2>`;
  }

  return shoppingHTML;
}

/* Функция подсчёта общей стоимости */
function calculateCost() {
  let cost = 0;

  shopping.forEach((element, index) => {
    cost += parseInt(element.cost) * parseInt(element.count);
  });

  return cost;
}

/* Функция отрисовки корзины */
function shoppingToPopup() {
  popupList.innerHTML = shoppingToHTML(shopping);
  popupCost.innerText = calculateCost() + " P";
}
