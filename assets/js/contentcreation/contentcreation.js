const modal = document.getElementById("imageModal");
const modalImg = document.getElementById("modalImage");
const captionText = document.getElementById("captionText");
const closeBtn = document.querySelector(".close");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");

let images = [];
let currentIndex = 0;

// let images = Array.from(document.querySelectorAll(".gallery-item"));
// let currentIndex = 0;

// Grab elements
const selectElement = (selector) => {
    const element = document.querySelector(selector);
    if(element) return element;
    throw new Error(`Something went wrong! Make sure that ${selector} exists/is typed correctly.`);  
};

//Nav styles on scroll
const scrollHeader = () =>{
    const navbarElement = selectElement('#header');
    if(this.scrollY >= 15) {
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

const toggleMenu = () =>{
    const mobileMenu = selectElement('#menu');
    mobileMenu.classList.toggle('activated');
    menuToggleIcon.classList.toggle('activated');
}

menuToggleIcon.addEventListener('click', toggleMenu);

// Open/Close search form popup
formOpenBtn.addEventListener('click', () => searchContainer.classList.add('activated'));
formCloseBtn.addEventListener('click', () => searchContainer.classList.remove('activated'));
// -- Close the search form popup on ESC keypress
window.addEventListener('keyup', (event) => {
    if(event.key === 'Escape') searchContainer.classList.remove('activated');
});

// Switch theme/add to local storage
const body = document.body;
const themeToggleBtn = selectElement('#theme-toggle-btn');
const currentTheme = localStorage.getItem('currentTheme');

// Check to see if there is a theme preference in local Storage, if so add the ligt theme to the body
if (currentTheme) {
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
    // How many slides to show
    slidesPerView: 1,
    // How much space between slides
    spaceBetween: 20,
    // Make the next and previous buttons work
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    // Make the pagination indicators work
    pagination: {
        el: '.swiper-pagination'
    },
    //Responsive breakpoints for how many slides to show at that view
    breakpoints: {
        // 700px and up shoes 2 slides
        700: {
          slidesPerView: 2
        },
        // 1200px and up shoes 3 slides
        1200: {
            slidesPerView: 3
        }
    }   
});

/* Modal and Navigation */
images.forEach((image, index) => {
    image.addEventListener("click", (e) => {
        e.preventDefault();
        modal.style.display = "block";
        modalImg.src = image.href;
        captionText.innerText = image.title;
        currentIndex = index;
    });
});

closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
});

prevBtn.addEventListener("click", () => {
    currentIndex = (currentIndex === 0) ? images.length - 1 : currentIndex - 1;
    modalImg.src = images[currentIndex].href;
    captionText.innerText = images[currentIndex].title;
});

nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex === images.length - 1) ? 0 : currentIndex + 1;
    modalImg.src = images[currentIndex].href;
    captionText.innerText = images[currentIndex].title;
});

modal.addEventListener("click", (e) => {
    if (e.target === modal) {
        modal.style.display = "none";
    }
});

/* Modal functionality for Flickr */

const apiKey = 'de7885d352595f3ced80610f90dcb6b3'; // Your Flickr API Key
const albumId = '72177720323023756'; // Your Album ID
const userId = '201793570@N06'; // Your User ID
const flickrURL = `https://www.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=${apiKey}&photoset_id=${albumId}&user_id=${userId}&format=json&nojsoncallback=1`;

// Fetch album photos from Flickr
fetch(flickrURL)
    .then(response => response.json())
    .then(data => {
        if (data.stat === "ok") {
            images = data.photoset.photo.map(photo => ({
                url: `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_z.jpg`,
                title: photo.title
            }));

            // Debugging: Log images array
            console.log("Fetched Images:", images);
        } else {
            console.error("Failed to fetch album photos:", data.message);
        }
    })
    .catch(error => console.error("Error fetching Flickr data:", error));

// Open modal when "Test Photos" is clicked
const testPhotos = document.getElementById("testPhotos");
testPhotos.addEventListener("click", (e) => {
    e.preventDefault();
    if (images.length > 0) {
        openModal(0); // Start with the first image
    } else {
        console.error("No images available to display.");
    }
});

// Open modal
function openModal(index) {
    modal.style.display = "block";
    updateModalContent(index);
}

// Update modal content
function updateModalContent(index) {
    if (images[index]) {
        modalImg.src = images[index].url;
        captionText.innerText = images[index].title || "No title available";
        currentIndex = index;
    } else {
        console.error("Invalid index:", index);
    }
}

// Close modal
closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
});

// Navigate to previous image
prevBtn.addEventListener("click", () => {
    currentIndex = (currentIndex === 0) ? images.length - 1 : currentIndex - 1;
    updateModalContent(currentIndex);
});

// Navigate to next image
nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex === images.length - 1) ? 0 : currentIndex + 1;
    updateModalContent(currentIndex);
});

// Close modal when clicking outside the content
modal.addEventListener("click", (e) => {
    if (e.target === modal) {
        modal.style.display = "none";
    }
});
