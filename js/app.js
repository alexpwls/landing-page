// Page setup

let articles = [1, 2, 3];
let evenArticle = ``;
let log = document.querySelector('.log');
const articleSection = document.querySelector('section');
const activeArticle = document.querySelector('.active-article');

function setupArticles() {
    for (article of articles) {
        articleSection.insertAdjacentHTML('beforeend', articleHTML(article));
        log.textContent = 'Click on any of the buttons to perform an action.';
    }
}

setupArticles();

// This fix makes sure that the header is always above the article when scrolling down:

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

const dropdownParent = document.querySelector('.dropdown-content');

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
    let newArticle = articles.length + 1;
    if (newArticle > 10) {
        log.textContent = `You can't create more than 10 articles.`;
    } else {
        articles.push(newArticle);
        console.log(articles);
        articleSection.insertAdjacentHTML('beforeend', articleHTML(newArticle));
        dropdownParent.insertAdjacentHTML('beforeend', articleDropdownHTML(newArticle));
    }
}

function deleteArticle() { 
    lastArticleCount = articles.length
    if (lastArticleCount > 0) {
        articles.pop(lastArticleCount);
        console.log(articles);
        let lastArticle = document.querySelector(`#article-${lastArticleCount}`);
        let lastArticleLink = document.querySelector(`#link-${lastArticleCount}`);
        lastArticle.remove();
        lastArticleLink.remove();
        log.textContent = `Deleted: Article ${lastArticleCount}`;
    } else {
        log.textContent = `There are no articles to delete, add a new article first.`;
    }

}

// Check for elements in viewport

function checkForActiveElements() {
    for (let article of articles) {
        let articleElement = document.querySelector(`#article-${article}`);
        elementInViewport(articleElement);
    }
  }
  
window.onscroll = checkForActiveElements;
  
function elementInViewport(element) {
    let bounding = element.getBoundingClientRect();
    if (
        bounding.top >= 0 &&
        bounding.left >= 0 &&
        bounding.right <= (window.innerWidth || document.documentElement.clientWidth) &&
        bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight)
    ) {
        activeArticle.innerHTML = `<h3>Now reading: ${element.id}</h3>`;
    }
  }