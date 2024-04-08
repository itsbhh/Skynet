document.addEventListener('DOMContentLoaded', function () {
    let imageContainer = document.querySelector('.image-container');
    let dropdownContent = document.querySelector('.dropdown-content');
    let pinnedIcon = document.querySelector('.pinned-icon');
    let image = document.querySelector('.image-container img');

    if (imageContainer && dropdownContent && pinnedIcon) {
        imageContainer.addEventListener('click', function (event) {
            dropdownContent.classList.toggle('show-dropdown');
            pinnedIcon.classList.toggle('pinned-icon-open');
            image.classList.toggle('fade-out-image');

            if (dropdownContent.classList.contains('show-dropdown')) {
                image.style.display = 'none';
            } else {
                image.style.display = 'block';
            }
        });

        let closeIcon = document.querySelector('.fa-times');
        closeIcon.addEventListener('click', () => {
            let menu = document.querySelector('show-dropdown');
            menu.style.display = 'none';
            pinnedIcon.classList.remove('pinned-icon-open');
            image.classList.remove('fade-out-image');
            image.style.display = 'block';
        });

    } else {
        console.log("One or more elements not found");
    }
});

document.addEventListener('DOMContentLoaded', function () {
    function setInitialMode() {
        const moonIcon = document.querySelector('.moon-icon');
        const lightModeIcon = moonIcon.querySelector('.light-mode-icon');
        const darkModeIcon = moonIcon.querySelector('.dark-mode-icon');

        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            lightModeIcon.style.display = 'none';
            darkModeIcon.style.display = 'inline-block';
        } else {
            lightModeIcon.style.display = 'inline-block';
            darkModeIcon.style.display = 'none';
        }
    }

    setInitialMode();

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        const darkModeEnabled = e.matches;
        const moonIcon = document.querySelector('.moon-icon');
        const lightModeIcon = moonIcon.querySelector('.light-mode-icon');
        const darkModeIcon = moonIcon.querySelector('.dark-mode-icon');

        if (darkModeEnabled) {
            lightModeIcon.style.display = 'none';
            darkModeIcon.style.display = 'inline-block';
        } else {
            lightModeIcon.style.display = 'inline-block';
            darkModeIcon.style.display = 'none';
        }
    });

    const moonIcon = document.querySelector('.moon-icon');
    moonIcon.addEventListener('click', function () {
        document.body.classList.toggle('dark-mode');
        setInitialMode();
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
            usernameContainer.style.marginRight = '30px';
        } else {
            dropdownContent.style.display = 'none';
            dropdownIcon.style.transform = 'rotate(0deg)';
            angleUpIcon.style.transform = 'rotate(0deg)';
            usernameContainer.style.marginRight = '0';
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
        usernameContainer.classList.toggle('show-dropdown');
    });

    dropdownContent.classList.remove('show-dropdown');
    angleDownIcon.classList.remove('rotate');
});

function getCurrentTime() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const amOrPm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${formattedHours}:${formattedMinutes} ${amOrPm}`;
}

document.querySelector('.fa-microphone').addEventListener('click', function () {
    startMicrophoneInput();
});

document.querySelector('.fa-paperclip').addEventListener('click', function () {
    document.querySelector('.file-input').click();
});
document.addEventListener('DOMContentLoaded', function () {
    const paperclipIcon = document.querySelector('.fa-paperclip');
    const fileInput = document.querySelector('.file-input');

    if (paperclipIcon && fileInput) {
        paperclipIcon.addEventListener('click', function () {
            fileInput.click();
        });

        fileInput.addEventListener('change', function (event) {
            handleFileUpload(event);
        });
    } else {
        console.error('Paperclip icon or file input element not found');
    }
});

document.querySelector('.file-input').addEventListener('change', function (event) {
    handleFileUpload(event);
});

document.querySelector('.fa-a').addEventListener('click', function () {
    const textarea = document.querySelector('.text-space');
    const currentValue = textarea.value;
    const selectionStart = textarea.selectionStart;
    const selectionEnd = textarea.selectionEnd;
    const before = currentValue.substring(0, selectionStart);
    const selected = currentValue.substring(selectionStart, selectionEnd);
    const after = currentValue.substring(selectionEnd);
    textarea.value = `${before}<strong>${selected}</strong>${after}`;
});

document.querySelector('.fa-link').addEventListener('click', function () {
    const link = prompt('Enter the URL:');
    if (link) {
        const textarea = document.querySelector('.text-space');
        const currentValue = textarea.value;
        textarea.value = `${currentValue}<a href="${link}" target="_blank">${link}</a>`;
    }
});

document.querySelector('.send-btn').addEventListener('click', function () {
    submitMessage();
});

function startMicrophoneInput() {
    console.log('Microphone input started');
}

function handleFileUpload(event) {
    const file = event.target.files[0];
    if (file) {
        console.log('Uploaded file:', file);
    }
}

function submitMessage() {
    var message = document.querySelector('.text-space').value.trim();
    if (message !== '') {
        console.log('Submitted message:', message);
    }
}

const timestampElement = document.querySelector('.timestamp');
if (timestampElement) {
    timestampElement.textContent = getCurrentTime();
}
