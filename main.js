let news = [];
let menus = document.querySelectorAll(".menus button");
menus.forEach((menu) =>
  menu.addEventListener("click", (event) => getNewsByTopic(event))
);

let searchButton = document.getElementById("search-button");

const getLatestNews = async () => {
  let url = new URL(
    "https://api.newscatcherapi.com/v2/latest_headlines?countries=KR&topic=sport&page_size=10"
  );
  let header = new Headers({
    "x-api-key": "-94HDVO4ARMW9cPwgcC1j_wKKD3thbjRW0jP9cJkikY",
  });

  let response = await fetch(url, { headers: header }); // ajax, http, fetch 등 다양한 방식 있음
  let data = await response.json();
  news = data.articles;
  console.log(news);

  render();
};

const getNewsByTopic = async (event) => {
  let topic = event.target.textContent.toLowerCase();
  let url = new URL(
    `https://api.newscatcherapi.com/v2/latest_headlines?countries=KR&page_size=10&topic=${topic}`
  );
  let header = new Headers({
    "x-api-key": "-94HDVO4ARMW9cPwgcC1j_wKKD3thbjRW0jP9cJkikY",
  });
  let response = await fetch(url, { headers: header });
  let data = await response.json();
  news = data.articles;

  render();
};

const getNewsByKeyword = async () => {
  let keyword = document.getElementById("search-input").value;
  let url = new URL(
    `https://api.newscatcherapi.com/v2/search?q=${keyword}&page_size=10`
  );
  let header = new Headers({
    "x-api-key": "-94HDVO4ARMW9cPwgcC1j_wKKD3thbjRW0jP9cJkikY",
  });
  let response = await fetch(url, { headers: header });
  let data = await response.json();
  news = data.articles;

  render();
};

const render = () => {
  let newsHTML = "";
  newsHTML = news
    .map((item) => {
      return `<div class="row news">
    <div class="col-lg-4">
      <img class="news-img-size" src="${item.media}" />
    </div>
    <div class="col-lg-8">
      <h2>${item.title}</h2>
      <p>${item.summary}</p>
      <div>${item.clean_url} * ${item.published_date}</div>
    </div>
  </div>`;
    })
    .join("");

  document.getElementById("news-board").innerHTML = newsHTML;
};

searchButton.addEventListener("click", getNewsByKeyword); // 화살표 함수를 사용할 경우 일반 함수와 다르기 때문에 호이스팅이 안됨. 그래서 순서가 중요하기 때문에 addEventListener를 맨 밑으로 보냄(함수 정의보다 아래로, 함수 선언 -> 이벤트)
getLatestNews();
