export const reviewsCarousel = () => {
  const productLink = document.querySelectorAll('.products__content [data-cardLink]')
  const productCards = document.querySelectorAll('.products__content [data-card]')
  const prevButton = document.querySelector('.products__content .prev')
  const nextButton = document.querySelector('.products__content .next')

  const aboutLink = document.querySelectorAll('.about__content [data-cardLink]')
  const aboutCards = document.querySelectorAll('.about__content [data-card]')

  const reviewCards = document.querySelectorAll('.card__content--reviews')
  const reviewPrev = document.querySelector('.card__container--reviews .prev')
  const reviewNext = document.querySelector('.card__container--reviews .next')

  const currentCardsCarousel = (link, list, prevBt, nextBt) => {
    let currentCard
    let currentIndex = 0
    const changeClass = (link, list, operator) => {
      list[currentIndex].classList.remove('active')
      list[operator].classList.add('active')
      if(link) {
        link[currentIndex].classList.remove('active')
        link[operator].classList.add('active')
      }
    }

    const activeOrDisableButtons = (link, list, prevBt, nextBt) => {
      if(prevBt && nextBt) {
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



    if(prevBt && nextBt) {
      nextBt.addEventListener('click', () => {
        if (nextBt.classList.contains('active')) {
          if (link) {
            link.forEach((item, index) => {
              if (item.classList.contains('active')) {
                currentIndex = index
              }
            })}
          changeClass(link, list, currentIndex + 1)
        }
        activeOrDisableButtons(link, list, prevBt, nextBt)
      })
      prevBt.addEventListener('click', () => {
        if (prevBt.classList.contains('active')) {
          if(link) {link.forEach((item, index) => {
            if (item.classList.contains('active')) {
              currentIndex = index
            }
          })}

          changeClass(link, list, currentIndex - 1)
        }
        activeOrDisableButtons(link, list, prevBt, nextBt)
      })
    }
    if(link) {
      link.forEach(el => {
        el.addEventListener("click", (event) => {
          link.forEach(el => el.classList.remove('active'))
          event.currentTarget.classList.add('active')
          const currentBookmarkLink = event.currentTarget.getAttribute('data-cardLink')
          list.forEach(el => {
            el.classList.remove('active')
          })
          currentCard = document.querySelector(`[data-card="${currentBookmarkLink}"]`)
          currentCard.classList.add('active')
          activeOrDisableButtons(link, list, prevBt, nextBt)
        })
      })
    }
  }





  currentCardsCarousel(productLink, productCards, prevButton, nextButton)
  currentCardsCarousel(aboutLink, aboutCards)
  currentCardsCarousel(undefined ,reviewCards, reviewPrev, reviewNext)
}








export const cardsCarousel = () => {
  const productLink = document.querySelectorAll('.products__content [data-cardLink]')
  const productCards = document.querySelectorAll('.products__content [data-card]')
  const prevButton = document.querySelector('.products__content .prev')
  const nextButton = document.querySelector('.products__content .next')

  const aboutLink = document.querySelectorAll('.about__content [data-cardLink]')
  const aboutCards = document.querySelectorAll('.about__content [data-card]')


  const currentCardsCarousel = (link, list, prevBt, nextBt) => {
    let currentCard
    let currentIndex
    const changeClass = (link, list, operator) => {
      list[currentIndex].classList.remove('active')
      list[operator].classList.add('active')
      link[currentIndex].classList.remove('active')
      link[operator].classList.add('active')
    }

    const activeOrDisableButtons = (link, list, prevBt, nextBt) => {
      if(prevBt && nextBt) {
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



    if(prevBt && nextBt) {
      nextBt.addEventListener('click', () => {
        if (nextBt.classList.contains('active')) {
          link.forEach((item, index) => {
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
          link.forEach((item, index) => {
            if (item.classList.contains('active')) {
              currentIndex = index
            }
          })
          changeClass(link, list, currentIndex - 1)
        }
        activeOrDisableButtons(link, list, prevBt, nextBt)
      })
    }
    link.forEach(el => {
      el.addEventListener("click", (event) => {
        link.forEach(el => el.classList.remove('active'))
        event.currentTarget.classList.add('active')
        const currentBookmarkLink = event.currentTarget.getAttribute('data-cardLink')
        list.forEach(el => {
          el.classList.remove('active')
        })
        currentCard = document.querySelector(`[data-card="${currentBookmarkLink}"]`)
        currentCard.classList.add('active')
        activeOrDisableButtons(link, list, prevBt, nextBt)
      })
    })
  }





  currentCardsCarousel(productLink, productCards, prevButton, nextButton)
  currentCardsCarousel(aboutLink, aboutCards)
}
