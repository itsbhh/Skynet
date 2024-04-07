document.addEventListener('DOMContentLoaded', function () {
    console.log("Document loaded");

    let imageContainer = document.querySelector('.image-container');
    let dropdownContent = document.querySelector('.dropdown-content');
    let pinnedIcon = document.querySelector('.pinned-icon');
    let image = document.querySelector('.image-container img');

    if (imageContainer && dropdownContent && pinnedIcon) {
        console.log("All elements found");

        imageContainer.addEventListener('click', function (event) {
            console.log("Image clicked");

            // Toggle dropdown visibility using CSS classes
            dropdownContent.classList.toggle('show-dropdown');
            pinnedIcon.classList.toggle('pinned-icon-open');

            // Toggle fading effect only on the image
            image.classList.toggle('fade-out-image');

            // Hide image when dropdown is open
            if (dropdownContent.classList.contains('show-dropdown')) {
                image.style.display = 'none';
            } else {
                // Show image when dropdown is closed
                image.style.display = 'block';
            }
        });

        let closeIcon = document.querySelector('.fa-times');
        closeIcon.addEventListener('click', () => {
            console.log("Close icon clicked");

            let menu = document.querySelector('show-dropdown');
            menu.style.display = 'none';
            pinnedIcon.classList.remove('pinned-icon-open');
            image.classList.remove('fade-out-image');

            // Show image when dropdown is closed
            image.style.display = 'block';
        });

    } else {
        console.log("One or more elements not found");
    }
});
document.addEventListener('DOMContentLoaded', function () {
    // Function to set the initial mode based on system preference
    function setInitialMode() {
        const moonIcon = document.querySelector('.moon-icon');
        const lightModeIcon = moonIcon.querySelector('.light-mode-icon');
        const darkModeIcon = moonIcon.querySelector('.dark-mode-icon');

        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            lightModeIcon.style.display = 'none'; // Hide light mode icon in dark mode
            darkModeIcon.style.display = 'inline-block'; // Display dark mode icon in dark mode
        } else {
            lightModeIcon.style.display = 'inline-block'; // Display light mode icon in light mode
            darkModeIcon.style.display = 'none'; // Hide dark mode icon in light mode
        }
    }

    // Call the function to set initial mode
    setInitialMode();

    // Listen for changes in system preference and update mode accordingly
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        const darkModeEnabled = e.matches;
        const moonIcon = document.querySelector('.moon-icon');
        const lightModeIcon = moonIcon.querySelector('.light-mode-icon');
        const darkModeIcon = moonIcon.querySelector('.dark-mode-icon');

        if (darkModeEnabled) {
            lightModeIcon.style.display = 'none'; // Hide light mode icon in dark mode
            darkModeIcon.style.display = 'inline-block'; // Display dark mode icon in dark mode
        } else {
            lightModeIcon.style.display = 'inline-block'; // Display light mode icon in light mode
            darkModeIcon.style.display = 'none'; // Hide dark mode icon in light mode
        }
    });

    // Toggle dark mode manually
    const moonIcon = document.querySelector('.moon-icon');
    moonIcon.addEventListener('click', function () {
        document.body.classList.toggle('dark-mode');
        setInitialMode(); // Update the mode icons after manual toggle
    });
});
function toggleDropdown(id, icon) {
    const dropdownContent = document.getElementById(id);
    const angleIcon = icon.querySelector('.angle-icon');

    if (dropdownContent.style.display === 'none' || dropdownContent.style.display === '') {
        dropdownContent.style.display = 'block';
        angleIcon.style.transform = 'rotate(180deg)';
    } else {
        dropdownContent.style.display = 'none';
        angleIcon.style.transform = 'rotate(0deg)';
    }
}
document.addEventListener('DOMContentLoaded', function () {
    const dropdownText = document.querySelector('.dropdown-text');
    const angleUpIcon = dropdownText.querySelector('.fa-angle-up');
    const usernameContainer = document.querySelector('.username');

    dropdownText.addEventListener('click', function () {
        const dropdownContent = document.getElementById('skynet-dropdown');
        const dropdownIcon = dropdownText.querySelector('.dropdown-icon');

        if (dropdownContent.style.display === 'none' || dropdownContent.style.display === '') {
            dropdownContent.style.display = 'block';
            dropdownIcon.style.transform = 'rotate(180deg)';
            angleUpIcon.style.transform = 'rotate(180deg)';
            usernameContainer.style.marginRight = '30px'; // Shift username text
        } else {
            dropdownContent.style.display = 'none';
            dropdownIcon.style.transform = 'rotate(0deg)';
            angleUpIcon.style.transform = 'rotate(0deg)';
            usernameContainer.style.marginRight = '0'; // Shift username text back
        }
    });
});
function toggleDropdown(id, icon) {
    const dropdownContent = document.getElementById(id);
    const angleIcon = icon.querySelector('.angle-icon');

    if (dropdownContent.style.display === 'none' || dropdownContent.style.display === '') {
        dropdownContent.style.display = 'block';
        angleIcon.style.transform = 'rotate(180deg)';
    } else {
        dropdownContent.style.display = 'none';
        angleIcon.style.transform = 'rotate(0deg)';
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const dropdownText = document.querySelector('.dropdown-text');
    const angleDownIcon = dropdownText.querySelector('.fa-angle-down');
    const dropdownContent = document.getElementById('skynet-dropdown');
    const usernameContainer = document.querySelector('.username-container');

    dropdownText.addEventListener('click', function () {
        dropdownContent.classList.toggle('show-dropdown');
        angleDownIcon.classList.toggle('rotate');

        // Adjust username text margin
        usernameContainer.classList.toggle('show-dropdown');
    });

    // Close dropdown on initial load
    dropdownContent.classList.remove('show-dropdown');
    angleDownIcon.classList.remove('rotate');
});


