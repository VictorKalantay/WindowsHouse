"use strict"
import {cardsCarousel} from "./cards_carousel.js";
import {videoImsert} from "./videoinsert.js";




// Меню бургер
const iconBurger = document.querySelector('.header__burger');
const navMenu = document.querySelector('.nav__links');
if (iconBurger) {
  iconBurger.addEventListener("click", function () {
    iconBurger.classList.toggle('active');
    navMenu.classList.toggle('active');
  });
}
if (iconBurger.classList.contains('active')) { //Если бургер развернут то уберем класс
  iconBurger.classList.remove('active');
  navMenu.classList.remove('active');
}

//Плавная прокрутка при клике
const navLinks = document.querySelectorAll('.nav__link[data-goto]'); //Собир. колл. ссылок где есть data-goto
if (navLinks.length > 0) { //если такие есть, то
  navLinks.forEach(navLink => {
    navLink.addEventListener("click", onNavLinkClick); //вешием событие каждому
  });
}
function onNavLinkClick(e) { //создаем функцию клика
  const navLink = e.target; //получаем целевой объект по клику
  if (navLink.dataset.goto && document.querySelector(navLink.dataset.goto)) { //проверяем заполнен ли дата атрибут и есть ли секция
    const gotoBlock = document.querySelector(navLink.dataset.goto);//получаем объект
    const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset; //получаем положение раздела  и добовляем высоту прокрученого
    window.scrollTo({  //Сама прокрутка до секции
      top: gotoBlockValue,
      behavior: "smooth"
    });
    e.preventDefault();
  }

}

// Попапы
const popupLinkButton = document.querySelectorAll('[data-popuplink]')
const modalBody = document.querySelectorAll('[data-popup]')
let currentPopup
let closePopup
let popupLink // Выносим переменную за функцию чтоб вставить в запуск попапа.
let stopSlider
popupLinkButton.forEach((el) => {
  el.addEventListener('click', (event) => {     //Получаем кнопку по которой тыцнули
    popupLink = event.currentTarget.getAttribute('data-popupLink');   //в переменную получаем атрибут линки
    modalBody.forEach((el) => {  //Если уже открыт попап то закрываем
      el.classList.remove('open');
    });
    currentPopup = document.querySelector(`[data-popup="${popupLink}"]`);// Получили в переменную нужный попап у которого дата совпадает с дата линки
    closePopup = () => {
      currentPopup.classList.remove('open');
      stopSlider = true;
    };
    currentPopup.classList.add('open');
    stopSlider = false;
    new Slider(`${popupLink}`);

  });

});
document.addEventListener("click", (e) => {
  if (e.target.closest("[data-close]")) {
     closePopup()
  }
  if (!e.target.closest('.popup__content') && e.target.closest("[data-closeArea]")) {
    closePopup()
  }
  e.preventDefault();
});
document.addEventListener('keydown', (e) => {
  if (e.which === 27) {
    closePopup()
  }
});



// Слайдер  по примеру. Вычистил лишний функционал но надо разбираться
function Slider(sldrId) {  // Проверка наличия ID для возможности вставки нескольких слайдеров на страницу

  let id = document.getElementById(sldrId);
  if(id) {
    this.sldrRoot = id; // Если есть - работаем с айди
  }
  else {
    this.sldrRoot = document.querySelector('.services-popup__carousel-block') // нет - по селектору
  }


  // Carousel objects
  this.sldrList = this.sldrRoot.querySelector('.slider-list'); // берем список слайдов
  this.sldrElements = this.sldrList.querySelectorAll('.slider-element'); // из него список элементов
  this.sldrElemFirst = this.sldrList.querySelector('.slider-element'); // первый слайд
  this.indicatorDots = this.sldrRoot.querySelector('div.slider-dots'); // контейнер точек
  // Initialization
  this.options = Slider.defaults;
  Slider.initialize(this)


}
Slider.defaults = {
  // Default options for the carousel
  loop: true,     // Бесконечное зацикливание слайдера
  auto: true,     // Автоматическое пролистывание
  interval: 3000, // Интервал между пролистыванием элементов (мс)
  dots: true      // Индикаторные точки
};
Slider.prototype.elemPrev = function(num) {
  num = num || 1; // если num вернет false то присвоем num 1
  let prevElement = this.currentElement;

  this.currentElement -= num;
  if(this.currentElement < 0) this.currentElement = this.elemCount-1;
  this.sldrElements[this.currentElement].style.opacity = '1';
  this.sldrElements[prevElement].style.opacity = '0';
  if(this.options.dots) {
    this.dotOn(prevElement); this.dotOff(this.currentElement)
  }
};
Slider.prototype.elemNext = function(num) {
  num = num || 1;
  let prevElement = this.currentElement;
  this.currentElement += num;
  if(this.currentElement >= this.elemCount) this.currentElement = 0;
  this.sldrElements[this.currentElement].style.opacity = '1';
  this.sldrElements[prevElement].style.opacity = '0';
  if(this.options.dots) {
    this.dotOn(prevElement); this.dotOff(this.currentElement)
  }
};
Slider.prototype.dotOn = function(num) {
  this.indicatorDotsAll[num].style.cssText = 'background-color:#fff; cursor:pointer;'
};
Slider.prototype.dotOff = function(num) {
  this.indicatorDotsAll[num].style.cssText = 'background-color:#EF7F1A; cursor:default;'
};
Slider.initialize = function(that) {
  // Constants
  that.elemCount = that.sldrElements.length; // Количество элементов
  // Variables
  that.currentElement = 0;
  let bgTime = getTime();
  // Functions
  function getTime() {
    return new Date().getTime();
  }
  function setAutoScroll() {
    that.autoScroll = setInterval(function() {
      let fnTime = getTime();
      if(fnTime - bgTime + 10 > that.options.interval) {
        bgTime = fnTime; that.elemNext()
      }
    }, that.options.interval)
  }

  // Start initialization
  if(that.elemCount >= 1) {   // показать первый элемент
    that.sldrElemFirst.style.opacity = '1';
  }
  if(!that.options.loop) {
    that.options.auto = false; // отключить автопркрутку
  } else if(that.options.auto) {   // инициализация автопрокруки
    setAutoScroll();
    // Остановка прокрутки при наведении мыши на элемент
    that.sldrList.addEventListener('mouseenter', function() {clearInterval(that.autoScroll)}, false);
    that.sldrList.addEventListener('mouseleave', setAutoScroll, false)


  }


  if(that.options.dots) {  // инициализация индикаторных точек
    let sum = '', diffNum;
    for(let i=0; i<that.elemCount; i++) {
      sum += '<span class="dot"></span>'
    }
    that.indicatorDots.innerHTML = sum;
    that.indicatorDotsAll = that.sldrRoot.querySelectorAll('span.dot');
    // Назначаем точкам обработчик события 'click'
    for(let n=0; n<that.elemCount; n++) {
      that.indicatorDotsAll[n].addEventListener('click', function() {
        diffNum = Math.abs(n - that.currentElement);
        if(n < that.currentElement) {
          bgTime = getTime(); that.elemPrev(diffNum)
        }
        else if(n > that.currentElement) {
          bgTime = getTime(); that.elemNext(diffNum)
        }
        // Если n == that.currentElement ничего не делаем
      }, false)
    }
    that.dotOff(0);  // точка[0] выключена, остальные включены
    for(let i=1; i<that.elemCount; i++) {
      that.dotOn(i)
    }
  }
}


videoImsert()
cardsCarousel()

