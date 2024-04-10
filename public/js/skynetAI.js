document.addEventListener('DOMContentLoaded', function () {
    let icon1 = document.querySelector('.icon1');
    let imageContainer = document.querySelector('.image-container');
    let dropdownContent = document.querySelector('.dropdown-content');
    let pinnedIcon = document.querySelector('.pinned-icon');
    let image = document.querySelector('.image-container img');
    let closeIcon = document.querySelector('.fa-times');

    if (icon1 && imageContainer && dropdownContent && pinnedIcon && image && closeIcon) {
        icon1.addEventListener('click', toggleDropdown);
        imageContainer.addEventListener('click', toggleDropdown);
        closeIcon.addEventListener('click', closeDropdown);

        function toggleDropdown(event) {
            event.stopPropagation(); // Prevents event bubbling
            dropdownContent.classList.toggle('show-dropdown');
            pinnedIcon.classList.toggle('pinned-icon-open');
            image.classList.toggle('fade-out-image');

            if (dropdownContent.classList.contains('show-dropdown')) {
                image.style.display = 'none';
            } else {
                image.style.display = 'block';
            }
        }

        function closeDropdown(event) {
            event.stopPropagation(); // Prevents event bubbling
            dropdownContent.classList.remove('show-dropdown');
            pinnedIcon.classList.remove('pinned-icon-open');
            image.classList.remove('fade-out-image');
            image.style.display = 'block';
        }

        document.addEventListener('click', function (event) {
            if (!event.target.closest('.menu-drop') && dropdownContent.classList.contains('show-dropdown')) {
                closeDropdown(event);
            }
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

document.querySelector('.fa-paperclip').addEventListener('click', function () {
    document.querySelector('.file-input').click();
});
document.addEventListener('DOMContentLoaded', function () {
    const paperclipIcon = document.querySelector('.fa-paperclip');
    const fileInput = document.querySelector('.file-input'); 
});

document.querySelector('.send-btn').addEventListener('click', function () {
    submitMessage();
});



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
const timeElement = document.querySelector('.time');
if (timeElement) {
    timeElement.textContent = getCurrentTime();
}
let mediaRecorder;
let recordedChunks = [];

function startMicrophoneInput() {
    navigator.mediaDevices.getUserMedia({ audio: true })
        .then(function (stream) {
            console.log('Microphone access granted');

            mediaRecorder = new MediaRecorder(stream);

            mediaRecorder.ondataavailable = function (event) {
                if (event.data.size > 0) {
                    recordedChunks.push(event.data);
                }
            };

            mediaRecorder.onstop = function () {
                let blob = new Blob(recordedChunks, { type: 'audio/webm' });
                let audioUrl = URL.createObjectURL(blob);
                console.log('Recording stopped, audio URL:', audioUrl);
            };

            mediaRecorder.start();

            setTimeout(function () {
                mediaRecorder.stop();
                stream.getTracks().forEach(track => track.stop());
                console.log('Recording stopped after 5 seconds');
            }, 5000);
        })
        .catch(function (err) {
            console.error('Error accessing microphone:', err);
        });
}

document.querySelector('.fa-microphone').addEventListener('click', startMicrophoneInput);

document.querySelector('.fa-link').addEventListener('click', function () {
    const textarea = document.querySelector('.text-space');
    const urlInput = document.querySelector('.url-input');

    urlInput.style.display = 'flex';

});
document.querySelector('.send-btn').addEventListener('click', function () {
    const link = document.querySelector('.url-space').value;
    if (link) {
        const textarea = document.querySelector('.text-space');
        const currentValue = textarea.value;
        textarea.value = `${currentValue}<a href="${link}" target="_blank">${link}</a>`;

        textarea.value = '';
        document.querySelector('.url-space').value = '';
        document.querySelector('.url-input').style.display = 'none';
    }
});