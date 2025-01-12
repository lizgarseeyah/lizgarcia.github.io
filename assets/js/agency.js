// Grab elements
const selectElement = (selector) => {
    const element = document.querySelector(selector);
    if (element) return element;
    throw new Error(`Something went wrong! Make sure that ${selector} exists/is typed correctly.`);
};

// Nav styles on scroll
const scrollHeader = () => {
    const navbarElement = selectElement('#header');
    if (window.scrollY >= 15) {
        navbarElement.classList.add('activated');
    } else {
        navbarElement.classList.remove('activated');
    }
};

window.addEventListener('scroll', scrollHeader);

// Open menu & search pop-up
const menuToggleIcon = selectElement('#menu-toggle-icon');
const formOpenBtn = selectElement('#search-icon');
const formCloseBtn = selectElement('#form-close-btn');
const searchContainer = selectElement('#search-form-container');

const toggleMenu = () => {
    const mobileMenu = selectElement('#menu');
    mobileMenu.classList.toggle('activated');
    menuToggleIcon.classList.toggle('activated');
};

menuToggleIcon.addEventListener('click', toggleMenu);

// Open/Close search form popup
formOpenBtn.addEventListener('click', () => searchContainer.classList.add('activated'));
if (formCloseBtn) {
    formCloseBtn.addEventListener('click', () => searchContainer.classList.remove('activated'));
}

// Close the search form popup on ESC keypress
window.addEventListener('keyup', (event) => {
    if (event.key === 'Escape') searchContainer.classList.remove('activated');
});

// Switch theme/add to local storage
const body = document.body;
const themeToggleBtn = selectElement('#theme-toggle-btn');
const currentTheme = localStorage.getItem('currentTheme');

// Check if there is a theme preference in local storage
if (currentTheme) {
    body.classList.add('light-theme');
}

themeToggleBtn.addEventListener('click', function () {
    // Add light theme on click
    body.classList.toggle('light-theme');

    // Store or remove theme from local storage
    if (body.classList.contains('light-theme')) {
        localStorage.setItem('currentTheme', 'themeActive');
    } else {
        localStorage.removeItem('currentTheme');
    }
});

// Swiper for general sections
const swiper = new Swiper(".swiper", {
    slidesPerView: 1,
    spaceBetween: 20,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    pagination: {
        el: '.swiper-pagination',
    },
    breakpoints: {
        700: {
            slidesPerView: 2,
        },
        1200: {
            slidesPerView: 3,
        },
    },
});

// Swiper for Portfolio Section
const portfolioSwiper = new Swiper(".portfolio-swiper", {
    slidesPerView: 1,
    spaceBetween: 20,
    navigation: {
        nextEl: '.portfolio-swiper-button-next',
        prevEl: '.portfolio-swiper-button-prev',
    },
    pagination: {
        el: '.portfolio-swiper-pagination',
    },
    breakpoints: {
        700: {
            slidesPerView: 2,
        },
        1200: {
            slidesPerView: 3,
        },
    },
});

// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', () => {
    const scrollLinks = document.querySelectorAll('.scroll-link');
    scrollLinks.forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            const targetId = e.target.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            targetSection.scrollIntoView({ behavior: 'smooth' });
        });
    });
});

// Video playback controls for hero section
const heroVideo = document.querySelector('#hero video');

// Play video if it's in view
const handleHeroVideoPlayback = () => {
    if (heroVideo && heroVideo.paused && window.scrollY < heroVideo.offsetHeight) {
        heroVideo.play().catch((error) => {
            console.error('Video playback failed:', error);
        });
    }
};

// Pause video when out of view
const handleHeroVideoPause = () => {
    if (heroVideo && !heroVideo.paused && window.scrollY >= heroVideo.offsetHeight) {
        heroVideo.pause();
    }
};

window.addEventListener('scroll', () => {
    handleHeroVideoPlayback();
    handleHeroVideoPause();
});

// Start video on page load
if (heroVideo) {
    heroVideo.play().catch((error) => {
        console.error('Video autoplay failed:', error);
    });
}

// Testimonials section animation
const testimonialsSection = document.querySelector('#testimonials');
const handleTestimonialsAnimation = () => {
    if (testimonialsSection && window.scrollY + window.innerHeight > testimonialsSection.offsetTop + 100) {
        testimonialsSection.classList.add('animate-fade-in');
    }
};

window.addEventListener('scroll', handleTestimonialsAnimation);
