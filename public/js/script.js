
function setInitialMode() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
        document.body.classList.add('light-mode');
    } else {
        document.body.classList.remove('light-mode');
    }
}

setInitialMode();

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    const darkModeEnabled = e.matches;
    if (darkModeEnabled) {
        document.body.classList.add('dark-mode');
    } else {
        document.body.classList.remove('dark-mode');
    }
});



const toggleButton = document.querySelector('.custom-button');
toggleButton.addEventListener('click', toggleMode);

document.addEventListener('DOMContentLoaded', function () {
    const dropdownArrow = document.querySelector('.dropdown-arrow');
    const menu = document.querySelector('.menu-drop');
    let isOpen = false;

    dropdownArrow.addEventListener('click', function () {
        if (!isOpen) {
            menu.style.display = 'block';
            menu.style.height = '340px';
            isOpen = true;
        } else {
            menu.style.display = 'none';
            menu.style.height = '265px';
            isOpen = false;
        }
    });

    const closeIcon = document.querySelector('.close-icon');
    closeIcon.addEventListener('click', function () {
        menu.style.display = 'none';
        isOpen = false;
    });

    const themeOptions = document.querySelectorAll('.theme-options input[name="theme"]');
    themeOptions.forEach(option => {
        option.addEventListener('change', function () {
            const theme = this.value;
            document.body.classList.remove('theme-light', 'theme-dark', 'theme-system');
            document.body.classList.add(`theme-${theme}`);
        });
    });
});
