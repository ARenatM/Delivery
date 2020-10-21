const popup = document.querySelector(".popup");
const popupBody = document.querySelector(".popup__body");
const popupList = document.querySelector(".popup__shopping-list");
const popupCost = document.querySelector(".popup__cost");
const body = document.querySelector("body");
const timeout = 500;

var shopping = [];

var inShopping = (e) => {
  let nameProduct = e.target.closest(".card-inner").querySelector(".card-title").outerText;
  let costProduct = e.target.closest(".purchase").querySelector(".restaurant-price").outerText;
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
      calculateCost();
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

  openPopup(e);
};

function shoppingToHTML() {
  let shoppingHTML = "";
  if (shopping.length > 0) {
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

function calculateCost() {
  let cost = 0;

  shopping.forEach((element, index) => {
    cost += parseInt(element.cost) * parseInt(element.count);
  });

  return cost;
}

function shoppingToPopup() {
  popupList.innerHTML = shoppingToHTML(shopping);
  popupCost.innerText = calculateCost() + " P";
}
