const switchTheme = document.getElementById('switchTheme')

const body = document.querySelector('body')

switchTheme.addEventListener('change', () => {
    body.classList.toggle('lightTheme')
})