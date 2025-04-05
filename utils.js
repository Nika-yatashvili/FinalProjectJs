export function toggleDarkMode(isDark) {
    const body = document.querySelector('#body')
    if (isDark) {
        body.classList.add("dark")
    } else {
        body.classList.remove("dark")
    }
}

export function renderEmpty() {
    const div = document.createElement("div");
    div.classList.add("emptyArticleContainer");
    div.innerHTML = `<h4>Please Login to view today's news</h4>`;
    return div;
}

export function createNewsDiv(news) {
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

export function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

export function getCookie(cname) {
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

export function deleteCookie(cname) {
    document.cookie = `${cname}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC`;
}