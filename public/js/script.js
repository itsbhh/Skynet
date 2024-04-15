function setInitialMode() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
        document.body.classList.add('light-mode');
        console.log('Light mode set initially.');
    } else {
        document.body.classList.remove('light-mode');
        console.log('Dark mode set initially.');
    }
}

setInitialMode();

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    const darkModeEnabled = e.matches;
    if (darkModeEnabled) {
        document.body.classList.add('dark-mode');
        console.log('Dark mode enabled.');
    } else {
        document.body.classList.remove('dark-mode');
        console.log('Dark mode disabled.');
    }
});

const toggleButton = document.querySelector('.custom-button');
toggleButton.addEventListener('click', toggleTheme);

const themeOptions = document.querySelectorAll('.theme-options input[name="theme"]');
themeOptions.forEach(option => {
    option.addEventListener('change', function () {
        const theme = this.value;
        document.body.classList.remove('theme-light', 'theme-dark', 'theme-system');
        document.body.classList.add(`theme-${theme}`);
        console.log(`Theme changed to ${theme}.`);
    });
});