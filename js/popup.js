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
