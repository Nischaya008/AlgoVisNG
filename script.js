document.addEventListener("DOMContentLoaded", function() {
    // Show the loader when the page starts loading
    const loader = document.querySelector('.loader');
    loader.style.display = 'block';

    // Hide the loader when the page finishes loading
    window.addEventListener('load', function() {
        loader.style.display = 'none';
    });
});
const slideButton = document.querySelector('.slide-button');
const slideMenu = document.querySelector('.slide-menu');

slideButton.addEventListener('click', () => {
    slideMenu.classList.toggle('closed');
});

