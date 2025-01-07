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
}

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
}

menuToggleIcon.addEventListener('click', toggleMenu);

// Open/Close search form popup
formOpenBtn.addEventListener('click', () => searchContainer.classList.add('activated'));
formCloseBtn.addEventListener('click', () => searchContainer.classList.remove('activated'));

// Close the search form popup on ESC keypress
window.addEventListener('keyup', (event) => {
    if (event.key === 'Escape') searchContainer.classList.remove('activated');
});

// Switch theme/add to local storage
const body = document.body;
const themeToggleBtn = selectElement('#theme-toggle-btn');
const currentTheme = localStorage.getItem('currentTheme');

// Check to see if there is a theme preference in local Storage, if so add the light theme to the body
if (currentTheme === 'themeActive') {
    body.classList.add('light-theme');
}

themeToggleBtn.addEventListener('click', function () {
    // Add light theme on click
    body.classList.toggle('light-theme');

    // If the body has the class of light theme then add it to local Storage, if not remove it
    if (body.classList.contains('light-theme')) {
        localStorage.setItem('currentTheme', 'themeActive');
    } else {
        localStorage.removeItem('currentTheme');
    }
});

// Swiper
const swiper = new Swiper(".swiper", {
    slidesPerView: 1,
    spaceBetween: 20,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    pagination: {
        el: '.swiper-pagination'
    },
    breakpoints: {
        700: {
            slidesPerView: 2
        },
        1200: {
            slidesPerView: 3
        }
    }
});

// Dropdown functionality
document.addEventListener('DOMContentLoaded', () => {
    const dropdownButton = selectElement('.dropdown-button');
    const dropdown = dropdownButton.nextElementSibling; // Get the .dropdown-content

    dropdownButton.addEventListener('click', (event) => {
        event.stopPropagation(); // Prevents event bubbling
        dropdown.classList.toggle('show');
    });

    // Close the dropdown if the user clicks outside of it
    window.addEventListener('click', (event) => {
        if (!dropdownButton.contains(event.target) && !dropdown.contains(event.target)) {
            dropdown.classList.remove('show');
        }
    });
});

// Contact scrtipt: 
const form = document.querySelector('.contact-form');

form.addEventListener('submit', (event) => {
  const phoneInput = form.querySelector('input[name="phone"]');
  const phonePattern = /^\(\d{3}\) \d{3}-\d{4}$/;

  if (!phonePattern.test(phoneInput.value)) {
    event.preventDefault();
    alert('Please enter a valid phone number in the format (123) 456-7890');
  }
});

document.getElementById('contactForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = {
      name: document.getElementById('name').value,
      email: document.getElementById('email').value,
      phone: document.getElementById('phone').value,
      location: document.getElementById('location').value,
      message: document.getElementById('message').value,
    };

    try {
      const response = await fetch('/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Message sent successfully!');
      } else {
        alert('Failed to send message.');
      }
    } catch (error) {
      console.error(error);
      alert('Error sending message.');
    }
  });
