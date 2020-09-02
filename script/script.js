window.addEventListener("DOMContentLoaded", () => {
  "use strict";
  // Timer

  const countTimer = (dedline) => {
    const timerHours = document.querySelector("#timer-hours"),
      timerMinutes = document.querySelector("#timer-minutes"),
      timerSecunds = document.querySelector("#timer-seconds");
    let idInterval = 0;

    const getTimeRemaining = () => {
      const dateStop = new Date(dedline).getTime(),
        dateNow = new Date().getTime(),
        timeRemaining = (dateStop - dateNow) / 1000;
      let seconds = 0,
        minutes = 0,
        hours = 0;

      if (timeRemaining > 0) {
        seconds = Math.floor(timeRemaining % 60);
        minutes = Math.floor((timeRemaining / 60) % 60);
        hours = Math.floor(timeRemaining / 60 / 60);
      }

      return {
        timeRemaining,
        hours,
        minutes,
        seconds,
      };
    };

    const addZero = (elem) => {
      if (String(elem).length === 1) {
        return "0" + elem;
      } else {
        return String(elem);
      }
    };

    const updateClock = () => {
      let timer = getTimeRemaining();
      timerHours.textContent = addZero(timer.hours);
      timerMinutes.textContent = addZero(timer.minutes);
      timerSecunds.textContent = addZero(timer.seconds);

      if (timer.timeRemaining < 0) {
        clearInterval(idInterval);
      }
    };
    idInterval = setInterval(updateClock, 1000);
  };
  countTimer("03 September 2020");

  // Меню
  const toggleMenu = () => {
    const btnMenu = document.querySelector(".menu"),
      menu = document.querySelector("menu"),
      closeBtn = document.querySelector(".close-btn"),
      menuItems = menu.querySelectorAll("ul>li");

    const handlerMenu = () => {
      menu.classList.toggle("active-menu");
    };
    btnMenu.addEventListener("click", handlerMenu);
    closeBtn.addEventListener("click", handlerMenu);

    menuItems.forEach((elem) => elem.addEventListener("click", handlerMenu));
  };

  toggleMenu();

  // Popup
  const togglePopUp = () => {
    const popup = document.querySelector(".popup"),
      popupBtn = document.querySelectorAll(".popup-btn"),
      popupClose = document.querySelector(".popup-close"),
      popupContent = document.querySelector(".popup-content"),
      popupData = {
        count: -445,
        speed: 3,
        startPos: -445,
        endPos: 0,
      };

    const showPopup = () => {
      popupData.startPos > popupData.endPos
        ? (popupData.count -= popupData.speed)
        : (popupData.count += popupData.speed);

      popupContent.style.transform = `translateY(${popupData.count}px)`;

      if (
        popupData.startPos > popupData.endPos
          ? popupData.count > popupData.endPos
          : popupData.count < popupData.endPos
      ) {
        requestAnimationFrame(showPopup);
      }
    };

    popupBtn.forEach((elem) => {
      elem.addEventListener("click", () => {
        popup.style.display = "block";

        if (screen.width > 768) {
          popupData.count = popupData.startPos;

          requestAnimationFrame(showPopup);
        }
      });
    });

    popupClose.addEventListener("click", () => {
      popup.style.display = "none";
    });
  };

  togglePopUp();
});
