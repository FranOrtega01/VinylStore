const switchThemeBtn = document.getElementById('switchTheme');
switchThemeBtn.addEventListener('change', theme);

let themeState = JSON.parse(localStorage.getItem('theme')) ?? 'light';

if(themeState === 'light') switchThemeBtn.checked = false;

function theme(){
    if(switchThemeBtn.checked){ 
        document.body.classList.remove('lightTheme');
        themeState = "dark";
    }else{
        document.body.classList.add('lightTheme');
        themeState = "light";
    }
    localStorage.setItem('theme', JSON.stringify(themeState));
}

theme()
//Animacion tuerca
const gear = document.querySelector('.btn-group > button i');
gear.addEventListener('click', () => {
    gear.classList.toggle('rotate');
})