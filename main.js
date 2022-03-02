let news = [];
let page = 1;
let total_pages = 0;
let menus = document.querySelectorAll(".menus button");
menus.forEach((menu) =>
  menu.addEventListener("click", (event) => getNewsByTopic(event))
);

let searchButton = document.getElementById("search-button");

let url;

const getNews = async () => {
  try {
    let header = new Headers({
      "x-api-key": "-94HDVO4ARMW9cPwgcC1j_wKKD3thbjRW0jP9cJkikY",
    });
    url.searchParams.set("page", page);
    let response = await fetch(url, { headers: header }); // ajax, http, fetch 등 다양한 방식 있음
    let data = await response.json();
    if (response.status == 200) {
      if (data.total_hits == 0) {
        throw new Error("검색된 결과값이 없습니다.");
      }
      news = data.articles;
      total_pages = data.total_pages;
      page = data.page;
      console.log(news);
      render();
      pagination();
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    errorRender(error.message);
  }
};

const getLatestNews = async () => {
  url = new URL(
    "https://api.newscatcherapi.com/v2/latest_headlines?countries=KR&topic=sport&page_size=10"
  );
  getNews();
};

const getNewsByTopic = async (event) => {
  let topic = event.target.textContent.toLowerCase();
  url = new URL(
    `https://api.newscatcherapi.com/v2/latest_headlines?countries=KR&page_size=10&topic=${topic}`
  );
  getNews();
};

const getNewsByKeyword = async () => {
  let keyword = document.getElementById("search-input").value;
  url = new URL(
    `https://api.newscatcherapi.com/v2/search?q=${keyword}&page_size=10`
  );
  getNews();
};

const render = () => {
  let newsHTML = "";
  newsHTML = news
    .map((item) => {
      return `<div class="row news">
    <div class="col-lg-4">
      <img class="news-img-size" src="${
        item.media != null ? item.media : "./image/noImage.png"
      }" />
    </div>
    <div class="col-lg-8">
      <h2><a href="${item.link}" target="_blank">${item.title}</a></h2>
      <p>${item.summary}</p>
      <div><a href="http://${item.clean_url}" target="_blank">${
        item.clean_url
      }</a> * ${item.published_date}</div>
    </div>
  </div>`;
    })
    .join("");

  document.getElementById("news-board").innerHTML = newsHTML;
};

const errorRender = (message) => {
  let errorHTML = `<div class="alert alert-danger text-center" role="alert">
  ${message}
</div>`;
  document.getElementById("news-board").innerHTML = errorHTML;
};

const pagination = () => {
  let paginationHTML = ``;
  let pageGroup = Math.ceil(page / 5);
  console.log(pageGroup);
  let last = pageGroup * 5;
  if (last > total_pages) {
    last = total_pages;
  }
  let first = last - 4 <= 0 ? 1 : last - 4;

  if (pageGroup != 1) {
    paginationHTML = `<li class="page-item">
  <a class="page-link" href="#" onclick="moveToPage(${1})">
    <span aria-hidden="true">&lt;&lt;</span>
  </a>
</li><li class="page-item">
<a class="page-link" href="#" onclick="moveToPage(${page - 1})">
  <span aria-hidden="true">&lt;</span>
</a>
</li>`;
  }

  for (let i = first; i <= last; i++) {
    paginationHTML += `<li class="page-item ${
      page == i ? "active" : ""
    }"><a class="page-link" href="#" onclick="moveToPage(${i})">${i}</a></li>`;
  }
  if (last < total_pages) {
    paginationHTML += `<li class="page-item">
  <a class="page-link" href="#" onclick="moveToPage(${page + 1})">
    <span aria-hidden="true">&gt;</span>
  </a>
</li><li class="page-item">
<a class="page-link" href="#" onclick="moveToPage(${total_pages})">
  <span aria-hidden="true">&gt;&gt;</span>
</a>
</li>`;
  }

  document.querySelector(".pagination").innerHTML = paginationHTML;
};

const moveToPage = (pageNum) => {
  page = pageNum;

  getNews();
};

// searchButton.addEventListener("click", getNewsByKeyword);
// 화살표 함수를 사용할 경우 일반 함수와 다르기 때문에 호이스팅이 안됨. 그래서 순서가 중요하기 때문에 addEventListener를 맨 밑으로 보냄(함수 정의보다 아래로, 함수 선언 -> 이벤트)

getLatestNews();
