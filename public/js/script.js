// JavaScript for toggling between light and dark modes based on system preference

// Function to set the initial mode based on system preference
function setInitialMode() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.body.classList.add('dark-mode');
    } else {
        document.body.classList.remove('dark-mode');
    }
}

// Call the function to set initial mode
setInitialMode();

// Listen for changes in system preference and update mode accordingly
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    const darkModeEnabled = e.matches;
    if (darkModeEnabled) {
        document.body.classList.add('dark-mode');
    } else {
        document.body.classList.remove('dark-mode');
    }
});


let drop = document.querySelector('.dropdown-arrow');
let closeIcon = document.querySelector('.close-icon');

drop.addEventListener('click', () => { 
    let menu = document.querySelector('.theme-options');
    menu.style.display = (menu.style.display == 'block') ? 'none' : 'block';
    drop.style.transform = (menu.style.display == 'none') ? 'rotate(0deg)' : 'rotate(180deg)';
    drop.style.marginTop = '-8px';
});

closeIcon.addEventListener('click', () => {
    let menu = document.querySelector('.menu');
    menu.style.display = 'none';
});