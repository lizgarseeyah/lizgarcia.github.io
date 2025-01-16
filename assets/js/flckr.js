const apiKey = 'de7885d352595f3ced80610f90dcb6b3'; // Your Flickr API Key
const albumId = '72177720323023756'; // Your Album ID
const userId = '201793570@N06'; // Your User ID
const flickrURL = `https://www.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=${apiKey}&photoset_id=${albumId}&user_id=${userId}&format=json&nojsoncallback=1`;

// Modal Elements
const modal = document.getElementById("imageModal");
const modalImg = document.getElementById("modalImage");
const captionText = document.getElementById("captionText");
const closeBtn = document.querySelector(".close");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");

let images = [];
let currentIndex = 0;

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

            // Create image elements dynamically
            const galleryContainer = document.querySelector('.older-posts-grid-wrapper');
            images.forEach((image, index) => {
                const galleryItem = document.createElement('a');
                galleryItem.href = image.url;
                galleryItem.classList.add('article', 'd-grid', 'gallery-item');
                galleryItem.title = image.title;

                galleryItem.innerHTML = `
                    <div class="older-posts-article-image-wrapper">
                        <img src="${image.url}" alt="${image.title}" class="article-image">
                    </div>
                    <div class="article-data-container">
                        <h3 class="title article-title">${image.title}</h3>
                    </div>
                `;

                galleryContainer.appendChild(galleryItem);

                // Add click event listener for modal
                galleryItem.addEventListener("click", (e) => {
                    e.preventDefault();
                    openModal(index);
                });
            });
        } else {
            console.error("Failed to fetch album photos:", data.message);
        }
    })
    .catch(error => console.error("Error fetching Flickr data:", error));

// Open modal
function openModal(index) {
    if (images.length > 0) {
        modal.style.display = "block";
        updateModalContent(index);
    } else {
        console.error("No images available to display.");
    }
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
