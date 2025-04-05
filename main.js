import { toggleDarkMode, renderEmpty, createNewsDiv, setCookie, getCookie, deleteCookie } from './utils.js';

const apiKey = 'f1330f15f7d847f995a127c0f8edca11';

let page = 1;
const perPage = 11;

let isUserLoggedIn = false;
// let username = sessionStorage.getItem("username") || "";
let username = getCookie("username") || "";


const hasDarkMode = JSON.parse(localStorage.getItem('darkMode')) || false;
const signInForm = document.querySelector('#signInForm');
const logOut = document.querySelector(".logOut")
const usernameParagraph = document.querySelector('#userName');
const newsDiv = document.querySelector("#newsContainer");
const searchForm = document.querySelector("#searchForm");
const toggle = document.querySelector('#toggle');
const loadMoreButton = document.querySelector("#load-more-products");

let searchQuery = 'tesla'

toggle.checked = hasDarkMode;

toggleDarkMode(toggle.checked)

function logoutHandler() {
    isUserLoggedIn = false;
    logOut.classList.add("hidden")
    usernameParagraph.innerHTML = ""
    newsDiv.innerHTML = ""
    newsDiv.appendChild(renderEmpty())
    deleteCookie('username')
    loadMoreButton.classList.add("hidden")
    searchForm.search.disabled = true
}

function loginHandler(userInputValue) {
    isUserLoggedIn = true;
    usernameParagraph.innerHTML = userInputValue;
    signInForm.classList.add("hidden")
    logOut.classList.remove("hidden")
    newsDiv.innerHTML = ""
    setCookie('username', userInputValue, 7)
    loadMoreButton.classList.remove("hidden")
    searchForm.search.disabled = false

    fetchNews(`https://newsapi.org/v2/everything?q=${searchQuery}&sortBy=publishedAt&pageSize=${perPage}&page=${page}&apiKey=${apiKey}`);
}

if (username.trim().length > 0) {
    isUserLoggedIn = true
}

if (!isUserLoggedIn) {
    logoutHandler()

} else {
    loginHandler(username)
}


logOut.addEventListener("click", (e) => {
    e.preventDefault()
    signInForm.classList.remove("hidden")
    logoutHandler()
})

signInForm.addEventListener("submit", (e) => {
    e.preventDefault()

    const usernameInput = document.querySelector("#usernameId").value;

    if (usernameInput.trim().length > 0) {
        loginHandler(usernameInput)
    }
})

function fetchNews(url) {
    fetch(url)
        .then(
            (response) => response.json(),
            (error) => newsDiv.innerHTML = "There has been an error"
        ).then((data) => {
            renderNews(data.articles)
            if (data.articles.length < perPage - 1) {
                loadMoreButton.disabled = true
            } else {
                loadMoreButton.disabled = false
            }
            page++;
        }, (error) => newsDiv.innerHTML += "There was an error during the parse!")
}

function renderNews(news) {
    news.forEach((news) => {
        newsDiv.appendChild(createNewsDiv(news));
    });
}

// // todo: remove this if statement after finishing this project
// if (isUserLoggedIn) {
//     fetchNews(`https://newsapi.org/v2/everything?q=${searchQuery}&sortBy=publishedAt&pageSize=${perPage}&page=${page}&apiKey=${apiKey}`)
// }


function searchNews() {
    page = 1;
    const trimmedSearchValue = searchForm.search.value.trim();

    if (trimmedSearchValue.length === 0) {
        searchQuery = 'tesla';
    } else {
        searchQuery = trimmedSearchValue;
    }

    fetchNews(`https://newsapi.org/v2/everything?q=${trimmedSearchValue.length === 0 ? 'tesla' : trimmedSearchValue}&sortBy=publishedAt&pageSize=${perPage}&page=${page}&apiKey=${apiKey}`)
}


function debounce(callback, delay) {
    let timeoutId = null;
    return () => {
        newsDiv.innerHTML = "";
        if (timeoutId !== null) {
            clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(callback, delay);
    }
}

const debouncedSearch = debounce(searchNews, 500);

searchForm.search.addEventListener("input", () => {
    debouncedSearch();
});


toggle.addEventListener("change", (e) => {
    e.preventDefault();
    localStorage.setItem('darkMode', toggle.checked)
    toggleDarkMode(toggle.checked)
})

loadMoreButton.addEventListener("click", () => {
    fetchNews(`https://newsapi.org/v2/everything?q=${searchQuery}&sortBy=publishedAt&pageSize=${perPage}&page=${page}&apiKey=${apiKey}`)
});


