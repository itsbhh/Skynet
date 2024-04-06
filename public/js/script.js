// JavaScript for toggling between light and dark modes

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

// Function to toggle mode manually
function toggleMode() {
    document.body.classList.toggle('light-mode');
}

// Event listener for manual mode toggle
const toggleButton = document.querySelector('.custom-button');
toggleButton.addEventListener('click', toggleMode);

let drop = document.querySelector('.dropdown-arrow');
let closeIcon = document.querySelector('.close-icon');

drop.addEventListener('click', () => {
    let menu = document.querySelector('.theme-options');
    menu.style.display = (menu.style.display == 'block') ? 'none' : 'block';
    drop.style.transform = (menu.style.display == 'none') ? 'rotate(0deg)' : 'rotate(180deg)';
    drop.style.marginTop = '-10px';

});

closeIcon.addEventListener('click', () => {
    console.log("clicked");
    let menu = document.querySelector('.menu-drop');
    menu.style.display = 'none';

});
document.addEventListener('DOMContentLoaded', function () {
    const dropdownArrow = document.querySelector('.dropdown-arrow');
    const menu = document.querySelector('.menu-drop');
    let isOpen = false;

    dropdownArrow.addEventListener('click', function () {
        if (!isOpen) {
            menu.style.height = '340px'; // Change the height as needed
            isOpen = true;
        } else {
            menu.style.height = '265px'; // Reset to default height
            isOpen = false;
        }
    });
});



