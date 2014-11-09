var YQL = {
  get: function (urls, callback) {
    var httpRequest = new XMLHttpRequest();

    httpRequest.onreadystatechange = function () {
      if (httpRequest.readyState === 4) {
        if (httpRequest.status === 200) {
          var result = JSON.parse(httpRequest.responseText);
          callback(null, result.query.results.item);
        } else {
          callback('ERROR', null);
        }
      }
    };

    httpRequest.open('GET', "http://query.yahooapis.com/v1/public/yql?q=select * from rss where url in ('" + urls.join("', '") + "') | sort(field=\"pubDate\", descending=\"true\")&format=json", true);
    httpRequest.send(null);
  }
}

// "http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20rss%20where%20url%20in%20('http%3A%2F%2Ffeedpress.me%2Fkodsnack'%2C%20'http%3A%2F%2Ffeeds2.feedburner.com%2Fwebbradion')%20%7C%20sort(field%3D%22pubDate%22%2C%20descending%3D%22true%22)&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback="
