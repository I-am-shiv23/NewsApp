const newsApiKey = 'aaeab1d265f34925831ff95e512d5c70'; 
const cardsContainer = document.getElementById('cards-container');
const searchText = document.getElementById('search-text');
const searchButton = document.getElementById('search-button');
const loginButton = document.getElementById('login-button');



function onNavItemClick(category) {
    fetchNews(category);  
}

async function fetchNews(query = '') {
    const url = query
        ? `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&apiKey=${newsApiKey}`
        : `https://newsapi.org/v2/top-headlines?country=us&apiKey=${newsApiKey}`;

    try {
        const res = await fetch(url);
        const data = await res.json();
        if (data.status === 'ok' && data.articles.length > 0) {
            displayNews(data.articles);
        } else {
            alert('No news found for the search query');
        }
    } catch (error) {
        console.error('Error fetching news:', error);
        alert('An error occurred while fetching news');
    }
}

function displayNews(articles) {
    cardsContainer.innerHTML = ''; 
    articles.forEach((article) => {
        const template = document.getElementById('template-news-card').content.cloneNode(true);
        template.querySelector('#news-img').src = article.urlToImage || 'https://via.placeholder.com/400x200';
        template.querySelector('#news-title').textContent = article.title;
        template.querySelector('#news-source').textContent = `${article.source.name} | ${new Date(article.publishedAt).toLocaleDateString()}`;
        template.querySelector('#news-desc').textContent = article.description;
        cardsContainer.appendChild(template);
    });
}


searchButton.addEventListener('click', () => {
    const query = searchText.value.trim();
    if (query) {
        fetchNews(query); 
    }   
});

document.getElementById('home').addEventListener('click', () => fetchNews());  
document.getElementById('politics').addEventListener('click', () => fetchNews('politics'));
document.getElementById('education').addEventListener('click', () => fetchNews('education'));
document.getElementById('finance').addEventListener('click', () => fetchNews('business'));  
document.getElementById('Tech').addEventListener('click', () => fetchNews('technology'));
document.getElementById('sport').addEventListener('click', () => fetchNews('sports'));


fetchNews();  

