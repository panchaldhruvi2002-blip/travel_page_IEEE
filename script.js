const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

menuToggle.addEventListener("click", function () {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";

    menuToggle.setAttribute("aria-expanded", String(!isOpen));
    menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Open navigation menu" : "Close navigation menu"
    );

    navLinks.classList.toggle("open", !isOpen);
});

navLinks.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
        navLinks.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation menu");
    });
});



const slides = [
    {
        title: "The beauty of slowing down.",
        location: "KERALA · SOUTH INDIA",
        description:
            "Let the water set the pace and discover the quieter side of travel.",
        image:
            "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1600&q=85",
        alt: "Lush landscapes and backwaters of Kerala"
    },
    {
        title: "Where the mountains meet the sky.",
        location: "KASHMIR · NORTH INDIA",
        description:
            "Find stillness among mountain landscapes, lakes and open skies.",
        image:
            "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=1600&q=85",
        alt: "Scenic mountain landscape"
    },
    {
        title: "A journey through living history.",
        location: "RAJASTHAN · NORTH INDIA",
        description:
            "Discover grand architecture, desert landscapes and stories from the past.",
        image:
            "https://images.unsplash.com/photo-1599661046827-dacff0c0f09a?auto=format&fit=crop&w=1600&q=85",
        alt: "Historic architecture in Rajasthan"
    }
];

let currentSlide = 0;

const carouselImage = document.getElementById("carousel-image");
const carouselTitle = document.getElementById("carousel-title");
const carouselLocation = document.getElementById("carousel-location");
const carouselDescription = document.getElementById("carousel-description");
const carouselCounter = document.getElementById("carousel-counter");

function showSlide(index) {
    currentSlide = (index + slides.length) % slides.length;

    const slide = slides[currentSlide];

    carouselImage.src = slide.image;
    carouselImage.alt = slide.alt;
    carouselTitle.textContent = slide.title;
    carouselLocation.textContent = slide.location;
    carouselDescription.textContent = slide.description;

    const number = String(currentSlide + 1).padStart(2, "0");
    const total = String(slides.length).padStart(2, "0");

    carouselCounter.textContent = `${number} / ${total}`;
}

document.getElementById("carousel-prev").addEventListener("click", function () {
    showSlide(currentSlide - 1);
});

document.getElementById("carousel-next").addEventListener("click", function () {
    showSlide(currentSlide + 1);
});



let favorites = [];

try {
    const savedFavorites = localStorage.getItem("sonder-favorites");

    if (savedFavorites) {
        const parsedFavorites = JSON.parse(savedFavorites);

        if (Array.isArray(parsedFavorites)) {
            favorites = parsedFavorites.filter(
                name =>
                    typeof name === "string" &&
                    document.querySelector(
                        `.favorite-button[data-name="${name}"]`
                    )
            );
        }
    }
} catch (error) {
    favorites = [];
}

const favoriteButtons = document.querySelectorAll(".favorite-button");
const favoritesList = document.getElementById("favorites-list");
const savedCount = document.getElementById("saved-count");

function saveFavorites() {
    try {
        localStorage.setItem(
            "sonder-favorites",
            JSON.stringify(favorites)
        );
    } catch (error) {
    }
}

function renderFavorites() {
    savedCount.textContent = favorites.length;

    favoriteButtons.forEach(function (button) {
        const name = button.dataset.name;
        const isSaved = favorites.includes(name);

        button.setAttribute("aria-pressed", String(isSaved));
        button.setAttribute(
            "aria-label",
            `${isSaved ? "Remove" : "Save"} ${name} ${
                isSaved ? "from" : "to"
            } favorites`
        );

        button.querySelector("span").textContent = isSaved ? "♥" : "♡";
    });

    if (favorites.length === 0) {
        favoritesList.innerHTML = "";

        const message = document.createElement("p");
        message.className = "empty-favorites";
        message.textContent =
            "Your list is waiting for its first adventure. " +
            "Tap the heart on any destination to save it.";

        favoritesList.appendChild(message);
        return;
    }

    favoritesList.innerHTML = "";

    favorites.forEach(function (name) {
        const item = document.createElement("div");
        item.className = "favorite-item";

        const title = document.createElement("h3");
        title.textContent = name;

        const removeButton = document.createElement("button");
        removeButton.className = "remove-favorite";
        removeButton.type = "button";
        removeButton.textContent = "Remove";
        removeButton.setAttribute("aria-label", `Remove ${name} from favorites`);

        removeButton.addEventListener("click", function () {
            toggleFavorite(name);
        });

        item.appendChild(title);
        item.appendChild(removeButton);
        favoritesList.appendChild(item);
    });
}

function toggleFavorite(name) {
    if (favorites.includes(name)) {
        favorites = favorites.filter(function (item) {
            return item !== name;
        });
    } else {
        favorites.push(name);
    }

    saveFavorites();
    renderFavorites();
}

favoriteButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        toggleFavorite(button.dataset.name);
    });
});

renderFavorites();



document.getElementById("current-year").textContent =
    new Date().getFullYear();
