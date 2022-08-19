export const videoInsert = () => {
  const conteiner = document.querySelector('.card__video-container')
  const poster = document.querySelector('.card__video-poster')
  const playButton = document.querySelector('.card__video-play')

  playButton.addEventListener('click', () => {
    conteiner.insertAdjacentHTML('beforeend', `<iframe class="card__video" width="100%" height="100%"
                                                      src="https://www.youtube.com/embed/O00xu2TnwNo" frameBorder="0"
                                                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                      allowFullScreen></iframe>`)
    poster.classList.remove('active')
    playButton.classList.remove('active')
  })
}
