document.addEventListener('DOMContentLoaded', function () {
    let icon1 = document.querySelector('.icon1');
    let imageContainer = document.querySelector('.image-container');
    let dropdownContent = document.querySelector('.dropdown-content');
    let chatArea = document.querySelector('.chatbox');
    let image = document.querySelector('.image-container img');
    let closeIcon = document.querySelector('.fa-times');

    if (icon1 && imageContainer && dropdownContent && chatArea && image && closeIcon) {
        icon1.addEventListener('click', toggleDropdown);
        imageContainer.addEventListener('click', toggleDropdown);
        closeIcon.addEventListener('click', closeDropdown);

        function toggleDropdown(event) {
            event.stopPropagation(); // Prevents event bubbling
            dropdownContent.classList.toggle('show-dropdown');
            chatArea.classList.toggle('text-open');
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
            chatArea.classList.remove('text-open');
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

document.addEventListener('DOMContentLoaded', function () {
    const dropdownText = document.querySelector('.dropdown-text');
    const angleUpIcon = dropdownText.querySelector('.fa-angle-up');
    const usernameContainer = document.querySelector('.username-container');
    const searchInput = document.querySelector('.search-bar');

    dropdownText.addEventListener('click', function () {
        const dropdownContent = document.querySelector('.dropdown-cont');
        const dropdownIcon = dropdownText.querySelector('.dropdown-icon');

        if (dropdownContent.style.display === 'none' || dropdownContent.style.display === '') {
            dropdownContent.style.display = 'block';
            dropdownIcon.style.transform = 'rotate(180deg)';
            angleUpIcon.style.transform = 'rotate(180deg)';
            usernameContainer.classList.add('username-container-shifted');
            searchInput.classList.add('search-shifted');
        } else {
            dropdownContent.style.display = 'none';
            dropdownIcon.style.transform = 'rotate(0deg)';
            angleUpIcon.style.transform = 'rotate(0deg)';
            usernameContainer.classList.remove('username-container-shifted');
            searchInput.classList.remove('search-shifted');
        }
    });

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
    const textArea = document.querySelector('.text-space');
    const container = document.querySelector('.contain');

    textArea.addEventListener('input', function () {
        this.style.height = 'auto'; // Reset textarea height to auto
        this.style.height = (this.scrollHeight) + 'px'; // Set new textarea height based on content

        container.style.height = 'auto'; // Reset container height to auto
        container.style.height = (this.scrollHeight + 20) + 'px'; // Set new container height based on textarea content + padding
    });

    // Custom scrollbar styles for Firefox
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    if (scrollbarWidth > 0) {
        document.documentElement.style.setProperty('--scrollbar-width', scrollbarWidth + 'px');
    }
});

document.querySelector('.text-space').addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        submitMessage();
    }
});

function submitMessage() {
    var message = document.querySelector('.text-space').value.trim();
    if (message !== '') {
        console.log('Submitted message:', message);
        // Perform your form submission or other actions here
    }
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

/*document.addEventListener('DOMContentLoaded', function () {
    const linkIcon = document.querySelector('.fa-link');
    const textSpace = document.querySelector('.text-space');
    const inputGroup = document.querySelector('.input-group');
    const urlInput = document.createElement('input');
    urlInput.type = 'url';
    urlInput.placeholder = 'Enter URL';
    urlInput.classList.add('url-input');
    urlInput.style.display = 'none';

    linkIcon.addEventListener('click', function () {
        // Check if the URL input is already inserted
        if (!inputGroup.contains(urlInput)) {
            urlInput.style.display = 'block';
            inputGroup.appendChild(urlInput); // Append urlInput as a child of inputGroup

            // Move the text area below the URL input
            textSpace.style.display = 'none';
            textSpace.placeholder = 'Ask me anything';
        }

    });

    document.addEventListener('click', function (event) {
        if (!event.target.closest('.url-input') && event.target !== linkIcon) {
            urlInput.style.display = 'none';

            // Move the text area back to its original position
            textSpace.style.display = 'inline-block';
            inputGroup.insertBefore(textSpace, urlInput);
            textSpace.placeholder = 'Ask me anything...';
        }
    });
});*/

document.querySelector('.fa-microphone').addEventListener('click', startMicrophoneInput);

const timestampElement = document.querySelector('.timestamp');
if (timestampElement) {
    timestampElement.textContent = getCurrentTime();
}
const timeElement = document.querySelector('.time');
if (timeElement) {
    timeElement.textContent = getCurrentTime();
}
document.addEventListener('DOMContentLoaded', function () {
    const defaultTextContainer = document.getElementById('default-text-container');
    const chatMessagesContainer = document.getElementById('chat-messages-container');

    console.log('defaultTextContainer:', defaultTextContainer);
    console.log('chatMessagesContainer:', chatMessagesContainer);

    if (defaultTextContainer && chatMessagesContainer) {
        defaultTextContainer.style.display = 'block';
        chatMessagesContainer.style.display = 'none'; // Hide the chat messages initially
    }
});




    document.querySelector('.send-btn').addEventListener('click', submitMessage);
    document.querySelector('.text-space').addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            submitMessage();
        }
    });
    let pinnedItem = null;

// Function to highlight item on hover
function highlightItem(item) {
    item.classList.add('highlighted');
}

// Function to remove highlight on mouseout
function removeHighlight(item) {
    item.classList.remove('highlighted');
}

// Function to toggle pin icon
function togglePin(icon) {
    const item = icon.parentElement;

    if (item.classList.contains('pinned')) {
        // Unpin the clicked item
        item.classList.remove('pinned');
        return;
    }

    if (pinnedItem) {
        // Unpin the previously pinned item
        pinnedItem.classList.remove('pinned');
    }

    // Pin the clicked item
    item.classList.add('pinned');
    pinnedItem = item;
}

    

// Event listener for clicking on the share icon
document.querySelectorAll('.share-icon').forEach(icon => {
    icon.addEventListener('click', function() {
        const chatName = this.parentElement.querySelector('h6').textContent;
        const shareURL = `mailto:?subject=Check%20out%20${encodeURIComponent(chatName)}&body=Share%20this%20link%20with%20${encodeURIComponent(chatName)}%3A%20${window.location.href}`;
        window.open(shareURL);
    });
});
