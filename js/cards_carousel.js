export const cardsCarousel = () => {
  let currentIndex = 0
  const productLinks = document.querySelectorAll('.bookmark--products')
  const productCards = document.querySelectorAll('.card__container--products')
  const productPrev = document.querySelector('.products__content .prev')
  const productNext = document.querySelector('.products__content .next')
  const productCarousel = {
    link: productLinks,
    list: productCards,
    prevBt: productPrev,
    nextBt: productNext
  }

  const aboutLinks = document.querySelectorAll('.bookmark--about')
  const aboutCards = document.querySelectorAll('.about__content .card__container')
  const aboutCarousel = {
    link: aboutLinks,
    list: aboutCards,
  }

  const reviewsCards = document.querySelectorAll('.card__content--reviews')
  const reviewsPrev = document.querySelector('.card__container--reviews .prev')
  const reviewsNext = document.querySelector('.card__container--reviews .next')
  const reviewsCarousel = {
    list: reviewsCards,
    prevBt: reviewsPrev,
    nextBt: reviewsNext
  }

  const certificatesCards = document.querySelectorAll('.card__content--certificates')
  const certificatesPrev = document.querySelector('.card__container--certificates .prev')
  const certificatesNext = document.querySelector('.card__container--certificates .next')
  const certificatesCarousel = {
    list: certificatesCards,
    prevBt: certificatesPrev,
    nextBt: certificatesNext
  }


  const activeOrDisableButtons = (link, list, prevBt, nextBt) => {
    if (prevBt && nextBt) {
      if (list[0].classList.contains('active')) {
        prevBt.classList.remove('active')
        if (!nextBt.classList.contains('active')) {
          nextBt.classList.add('active')
        }
      } else if (list[list.length - 1].classList.contains('active')) {
        nextBt.classList.remove('active')
        if (!prevBt.classList.contains('active')) {
          prevBt.classList.add('active')
        }
      } else {
        if (!nextBt.classList.contains('active')) {
          nextBt.classList.add('active')
        }
        if (!prevBt.classList.contains('active')) {
          prevBt.classList.add('active')
        }
      }
    }
  }
  const changeClass = (link, list, operator) => {
    list[currentIndex].classList.remove('active')
    list[operator].classList.add('active')
    if (link) {
      link[currentIndex].classList.remove('active')
      link[operator].classList.add('active')
    }
  }
  const buttonChange = (link, list, prevBt, nextBt) => {
    if (prevBt && nextBt) {
      nextBt.addEventListener('click', () => {
        if (nextBt.classList.contains('active')) {
          list.forEach((item, index) => {
            if (item.classList.contains('active')) {
              currentIndex = index
            }
          })
          changeClass(link, list, currentIndex + 1)
        }
        activeOrDisableButtons(link, list, prevBt, nextBt)
      })
      prevBt.addEventListener('click', () => {
        if (prevBt.classList.contains('active')) {
          list.forEach((item, index) => {
            if (item.classList.contains('active')) {
              currentIndex = index
            }
          })
          changeClass(link, list, currentIndex - 1)
        }
        activeOrDisableButtons(link, list, prevBt, nextBt)
      })
    }
  }
  const bookmarkChange = (link, list, prevBt, nextBt) => {
    if(link) {
      link.forEach((el, index) => {
        el.addEventListener('click', event => {
          if (event.currentTarget) {
            currentIndex = index
          }
          list.forEach(el => el.classList.remove('active'))
          link.forEach(el => el.classList.remove('active'))
          link[currentIndex].classList.add('active')
          list[currentIndex].classList.add('active')
          activeOrDisableButtons(link, list, prevBt, nextBt)
        })
      })
    }
  }

  const currentCarousel = (object) => {
    let link = object.link
    let list = object.list
    let prevBt = object.prevBt
    let nextBt = object.nextBt


    activeOrDisableButtons(link, list, prevBt, nextBt)
    buttonChange(link, list, prevBt, nextBt)
    bookmarkChange(link, list, prevBt, nextBt)
  }

  currentCarousel(productCarousel)
  currentCarousel(aboutCarousel)
  currentCarousel(reviewsCarousel)

}
