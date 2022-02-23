let news = [];

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
};

getLatestNews();
