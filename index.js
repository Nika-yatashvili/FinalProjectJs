let isUserLoggedIn = true;
let username = "";
const hasDarkMode = JSON.parse(localStorage.getItem('darkMode')) || false;
const signInForm = document.querySelector('#signInForm');
const logOut = document.querySelector(".logOut")
const usernameParagraph = document.querySelector('#userName');
const newsDiv = document.querySelector("#newsContainer");
const searchForm = document.querySelector("#searchForm");
const toggle = document.querySelector('#toggle');

toggle.checked = hasDarkMode;

function toggleDarkMode(isDark) {
    const body = document.querySelector('#body')

    if (isDark) {
        body.classList.add("dark")
    } else {
        body.classList.remove("dark")
    }
}

toggleDarkMode(toggle.checked)


function renderEmpty() {
    const div = document.createElement("div");
    div.classList.add("emptyArticleContainer");
    div.innerHTML = `
        <h4>Please Login to view today's news</h4>
    `;
    return div;
}

function logoutHandler() {
    logOut.classList.add("hidden")
    usernameParagraph.innerHTML = ""
    newsDiv.innerHTML = ""
    newsDiv.appendChild(renderEmpty())
}

function loginHandler(userInputValue) {
    usernameParagraph.innerHTML = userInputValue;
    signInForm.classList.add("hidden")
    logOut.classList.remove("hidden")
    newsDiv.innerHTML = ""

    fetchNews();
}

if (!isUserLoggedIn) {
    logoutHandler()
}


logOut.addEventListener("click", (e) => {
    e.preventDefault()
    signInForm.classList.remove("hidden")
    logoutHandler()
})

signInForm.addEventListener("submit", (e) => {
    e.preventDefault()
    isUserLoggedIn = true;

    const usernameInput = document.querySelector("#usernameId").value;

    if (usernameInput.trim().length > 0) {
        loginHandler(usernameInput)
    }
})



const apiKey = 'f1330f15f7d847f995a127c0f8edca11';

const currentPage = 1;
const pageSize = 10;

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
        ${news.urlToImage ? `<img id="articleImage" src="${news.urlToImage}" alt="article-image">` : `<span></span>`}
    `;
    return div;
}

function fetchNews(searchQuery = 'tesla') {
    fetch(`https://newsapi.org/v2/everything?q=${searchQuery}&sortBy=publishedAt&pageSize=${pageSize}&page=${currentPage}&apiKey=${apiKey}`)
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

// todo: remove this if statement after finishing this project
if (isUserLoggedIn) {
    fetchNews()
}

searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const searchInputValue = document.querySelector(".searchInput").value;
    newsDiv.innerHTML = ""
    fetchNews(searchInputValue)
})

toggle.addEventListener("change", (e) => {
    e.preventDefault();
    localStorage.setItem('darkMode', toggle.checked)
    toggleDarkMode(toggle.checked)
})