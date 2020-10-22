var isOpen = false;

var openPopup = (e) => {
  if (popup) {
    popup.classList.add("open");
  }

  bodyLock(e);
  isOpen = true;
};

var closePopup = (e) => {
  if (isOpen) {
    popup.classList.remove("open");
    bodyUnlock(e);
    isOpen = false;
  }
};

var gainCount = (e) => {
  var listItemCount = document.querySelector(".shopping-list__count");
  let counter = parseInt(
    e.target.closest(".shopping-list__buttons").querySelector(".shopping-list__count").outerText
  );

  let name = e.target.closest(".popup__shopping-list__item").querySelector(".shopping-list__name")
    .outerText;

  counter++;

  shopping.forEach((element, index) => {
    if (element.name === name) {
      shopping[index].count = counter;
    }
  });

  e.target.previousElementSibling.innerText = counter;

  popupCost.innerText = calculateCost() + " P";
};

var reduceCount = (e) => {
  console.dir(shopping);
  let counter = parseInt(
    e.target.closest(".shopping-list__buttons").querySelector(".shopping-list__count").outerText
  );

  let name = e.target.closest(".popup__shopping-list__item").querySelector(".shopping-list__name")
    .outerText;

  counter--;

  if (counter < 1) {
    let i = 0;

    shopping.forEach((element, index) => {
      if (element.name === name) {
        i = index;
      }
    });

    shopping.splice(i, 1);
    shoppingHeader.innerText = shopping.length;
    shoppingToPopup();
  }

  shopping.forEach((element, index) => {
    if (element.name === name) {
      shopping[index].count = counter;
    }
  });

  e.target.nextElementSibling.innerText = counter;

  popupCost.innerText = calculateCost() + " P";
};

var cancel = (e) => {
  shopping = [];

  shoppingHeader.innerText = shopping.length;
  closePopup();
  setTimeout(() => {
    shoppingToPopup();
  }, timeout);
};

function bodyLock(e) {
  let bodyPaddingValue = window.innerWidth - document.querySelector("main").offsetWidth + "px";
  body.style.paddingRight = bodyPaddingValue;
  body.classList.add("lock");
}

function bodyUnlock(e) {
  setTimeout(() => {
    body.style.paddingRight = 0;
    body.classList.remove("lock");
  }, timeout);
}

document.querySelector(".popup__body").addEventListener("click", (e) => {
  if (isOpen) {
    if (!e.target.closest(".popup__content")) {
      closePopup(e);
    }
  }
});
