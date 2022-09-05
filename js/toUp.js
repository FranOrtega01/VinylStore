const up = document.querySelector('.fa-chevron-up');

window.addEventListener('scroll', () => {
    window.scrollY > 300 ? up.classList.add('active') : up.classList.remove('active')
})
up.addEventListener('click', () => window.scrollTo(0,0))