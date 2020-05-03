// This fix makes sure that the header is always above the article:

const header = document.querySelector('header');
let currentLocation = "article-one";

window.addEventListener('hashchange', function(e) {
    window.scrollTo(window.scrollX, window.scrollY - 100);
}, false);

// Edit articles sidebar logic:

function openEditArticles() {
    document.querySelector("#edit-articles").style.display = "block";
}

function closeEditArticles() {
    document.querySelector("#edit-articles").style.display = "none";
}

// Edit articles add random article and delete last article:

const articleParent = document.querySelector('section');
const dropdownParent = document.querySelector('.dropdown-content');
let log = document.querySelector('.log');
let currentArticles = 3;
let lastArticleCount = 3;
let evenArticle = ``;

function articleCount() {
    currentArticles = document.querySelectorAll('article').length;
    return currentArticles;
}

function articleHTML(newArticle) {
    // Check if the last article is an even number, this is required to add the lightgrey background
    if (newArticle % 2 == 0) {
        evenArticle = ``;
    } else {
        evenArticle = `class="lightgrey"`;
    }
    log.textContent = `Added: Article ${newArticle}`;
    let html = `<article id="article-${newArticle}" ${evenArticle}>
                    <div class="article-item-image">
                        <figure>
                            <img src="images/image.png" alt="Purple dot." title="Purple dot.">
                            <figcaption>Purple dot.</figcaption>
                        </figure>
                    </div>
                    <div class="article-item-content">
                        <h3><a href="#" class="purple">Article ${newArticle}</a></h3>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint, perferendis ab a maxime amet quo nostrum nobis mollitia quaerat doloremque accusantium accusamus voluptatibus architecto temporibus harum ex consequatur laboriosam sequi!</p>
                        <a href="#">Read more</a>
                    </div>
                </article>`;
    return html;
}

function articleDropdownHTML(newArticle) {
    return `<a href="#article-${newArticle}" id="link-${newArticle}">Article ${newArticle}</a>`;
}

function addArticle() {
    let newArticle = articleCount() + 1;
    articleParent.insertAdjacentHTML('beforeend', articleHTML(newArticle));
    dropdownParent.insertAdjacentHTML('beforeend', articleDropdownHTML(newArticle));
}

function deleteArticle() { 
    lastArticleCount = articleCount();
    console.log(lastArticleCount);
    if (lastArticleCount > 0) {
        let lastArticle = document.querySelector(`#article-${lastArticleCount}`);
        let lastArticleLink = document.querySelector(`#link-${lastArticleCount}`);
        lastArticle.remove();
        lastArticleLink.remove();
        log.textContent = `Deleted: Article ${lastArticleCount}`;
    } else {
        log.textContent = `There are no articles to delete, add a new article first.`;
    }

}