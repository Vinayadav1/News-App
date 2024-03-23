const API_KEY = "7698859756514c4cbf411e6abd3a9a9d";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener("load", () => fetchNews("india"));

const fetchNews = async (query) => {
  const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
  const data = await res.json();
  bindData(data.articles);
};

const bindData = (articles) => {
  const cardContainer = document.getElementById("cards-container");
  const cardTemplate = document.getElementById("template-card");

  cardContainer.innerHTML = "";
  articles.forEach((article) => {
    if (!article.urlToImage) return;
    const cardClone = cardTemplate.content.cloneNode(true);
    fillDataInCard(cardClone, article);
    cardContainer.appendChild(cardClone);
  });
};

const fillDataInCard = (cardClone, article) => {
  const cardImg = cardClone.getElementById("news-img");
  const cardTitle = cardClone.getElementById("card-title");
  const newsSource = cardClone.getElementById("news-source");
  const cardDesc = cardClone.getElementById("news-desc");

  const date = new Date(article.publishedAt).toLocaleString("en-US", {
    timeZone: "Asia/Jakarta",
  });

  cardTitle.innerHTML = article.title;
  newsSource.innerHTML = `${article.source.name} - ${date}`;
  cardDesc.innerHTML = article.description;
  cardImg.src = article.urlToImage;

  cardClone.firstElementChild.addEventListener("click", () => {
    window.open(article.url, "blank");
  });
};
let curSelectedNav = null;
const onNavItemClick = (id) => {
  fetchNews(id);
  const navItem = document.getElementById(id);
  curSelectedNav?.classList.remove("active");
  curSelectedNav = navItem;
  curSelectedNav.classList.add("active");
};

const searchBtn = document.getElementById("search-btn");
const inputSearch = document.getElementById("search-bar-input");

searchBtn.addEventListener("click", () => {
  const query = inputSearch.value;
  if (!query) return;
  fetchNews(query);
  curSelectedNav?.classList.remove("active");
  curSelectedNav = null;
});

function reload() {
  window.location.reload();
}
