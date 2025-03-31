
const apiKey = 'f1330f15f7d847f995a127c0f8edca11';
const searchQuery = "tesla";
const page = 1;
const pageSize = 10;

const newsDiv = document.querySelector("#newsContainer");



function createNewsDiv(news) {
    const div = document.createElement("div");
    div.classList.add("articleContainer");
    div.innerHTML = `
        <div class="articleHeader">
            <h2 id="title">${news.title}</h2>
            <p id="author">${news.author}</p>
            <p id="publishedAt">
                ${new Date(news.publishedAt).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' })}
            </p>
        </div>
        <p id="articleDescription">${news.description}</p>
        ${news.urlToImage ? `<img id="articleImage" src="${news.urlToImage}" alt="article-image">` : ""}
    `;
    return div;
}

function fetchNews() {
    fetch(`https://newsapi.org/v2/everything?q=${searchQuery}&from=2025-02-28&sortBy=publishedAt&page=${page}&pageSize=${pageSize}&apiKey=${apiKey}`)
        .then(
            (response) => response.json()
        ).then((data) => {
            renderNews(data.articles)
        })
}


function renderNews(news) {
    news.forEach((news) => {
        newsDiv.appendChild(createNewsDiv(news));
    });
}

fetchNews();
