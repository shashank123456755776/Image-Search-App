const key = "vYLDJPI4hWvDEC5Zxlw7_nsNjOavAJmMFJKwFH-QKqk";
const formEl = document.querySelector("form");
const inputEl = document.getElementById("search-input");
const searchresults = document.querySelector(".search-results");
const showmore = document.getElementById("show-more-button");
let inputdata = "";
let page = 1;

async function searchImages() {
    inputdata = inputEl.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputdata}&client_id=${key}`;
    const response = await fetch(url);
    const data = await response.json();
    const results = data.results; // Use data.results to access the array of images

    if (page === 1) {
        searchresults.innerHTML = ""; // Clear existing search results
    }

    results.forEach((result) => {
        const imageWrapper = document.createElement("div");
        imageWrapper.classList.add("search-result");
        const images = document.createElement('img');
        images.src = result.urls.small;
        images.alt = result.alt_description;
        const imagelink = document.createElement("a");
        imagelink.target = "_blank";
        imagelink.href = result.links.html; // Use result.links.html for the image link
        imagelink.textContent = result.alt_description;
        imageWrapper.appendChild(images);
        imageWrapper.appendChild(imagelink);
        searchresults.appendChild(imageWrapper); // Append the imageWrapper to the searchresults
    });

    page++;
    if (page > 1) {
        showmore.style.display = "block";
    }
}

formEl.addEventListener("submit", (e) => {
    e.preventDefault();
    page = 1;
    searchImages();
});

showmore.addEventListener("click", () => {
    searchImages();
});

