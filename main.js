const getLatestNews = () => {
  let url = new URL(
    "https://api.newscatcherapi.com/v2/latest_headlines?countries=KR&topic=sport&page_size=10"
  );
  let header = new Headers({
    "x-api-key": "-94HDVO4ARMW9cPwgcC1j_wKKD3thbjRW0jP9cJkikY",
  });

  let response = fetch(url, { headers: header });
  console.log(url);
};

getLatestNews();
