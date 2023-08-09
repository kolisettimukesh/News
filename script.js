const API_KEY = "399d89f2772d4261bc774e46df937510";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener('load', () => fetchNews("India"));

function reload() {
    window.location.reload();
}

async function fetchNews(query) {
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data = await res.json();
    console.log(data);
    bindData(data.articles);
}

function bindData(articles) {
    const cardsContainer = document.getElementById("cards-container");
    const newsCardTemplate = document.getElementById("template-news-card");

    cardsContainer.innerHTML = "";

    articles.forEach(article => {
        if (!article.urlToImage) return;
        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone, article);
        cardsContainer.appendChild(cardClone);
    });
}

function fillDataInCard(cardClone, article) {
    const newsImg = cardClone.querySelector('#news-img');
    const newsTitle = cardClone.querySelector('#news-title');
    const newsSource = cardClone.querySelector('#news-source');
    const newsDesc = cardClone.querySelector('#news-desc');

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta"
    });

    newsSource.innerHTML = `${article.source.name} · ${date}`;
    cardClone.firstElementChild.addEventListener("click", () => {
        window.open(article.url, "_blank");
    });
}

let curSelectedNav = null;

function onNavItemClick(id) {
    fetchNews(id);
    const navItem = document.getElementById(id);
    curSelectedNav?.classList.remove('active');
    curSelectedNav = navItem;
    curSelectedNav.classList.add('active');
}

function searchNews() {
    const searchText = document.getElementById("search-text").value;
    if (!searchText) return;
    fetchNews(searchText);
    curSelectedNav?.classList.remove('active');
    curSelectedNav = null;
}

function goToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

window.addEventListener('scroll', () => {
    const goToTopBtn = document.getElementById('goToTopBtn');
    if (window.scrollY > 200) {
        goToTopBtn.classList.add('show');
    } else {
        goToTopBtn.classList.remove('show');
    }
});
function openSubscribePage() {
    window.open('subscribe.html', '_blank');
}


// Add a variable to keep track of the dropdown state
let dropdownOpen = false;

// Function to toggle the dropdown menu
function toggleDropdown() {
    const dropdownMenu = document.getElementById('dropdown-menu');
    const navToggle = document.getElementById('nav-dropdown');
    dropdownOpen = !dropdownOpen;
    if (dropdownOpen) {
        dropdownMenu.style.display = 'block';
        dropdownMenu.style.top = `${navToggle.getBoundingClientRect().bottom}px`;
        dropdownMenu.style.left = `${navToggle.getBoundingClientRect().left}px`;
    } else {
        dropdownMenu.style.display = 'none';
    }
}



// Function to close the dropdown menu when the user clicks outside of it
window.addEventListener('click', (event) => {
    const dropdownMenu = document.getElementById('dropdown-menu');
    const dropdownToggle = document.getElementById('nav-dropdown');
    
    // Check if the clicked element is not inside the dropdown menu or the toggle button
    if (!dropdownMenu.contains(event.target) && event.target !== dropdownToggle) {
        dropdownMenu.style.display = 'none'; // Hide the dropdown menu
        dropdownOpen = false; // Set the dropdown state to closed
    }
});