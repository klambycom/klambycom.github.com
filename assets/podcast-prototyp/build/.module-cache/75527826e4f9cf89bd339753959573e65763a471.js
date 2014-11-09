/** jsx React.DOM */

var Feed = React.createClass({displayName: 'Feed',
  getInitialState: function () {
    return {
      results: []
    };
  },
  componentDidMount: function () {
    var httpRequest = new XMLHttpRequest()
        self = this;

    httpRequest.onreadystatechange = function () {
      if (httpRequest.readyState === 4) {
        if (httpRequest.status === 200) {
          self.setState(JSON.parse(httpRequest.responseText));
          console.log(JSON.parse(httpRequest.responseText));
        } else {
          console.log('ERROR');
        }
      }
    };

    httpRequest.open('GET', "http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20rss%20where%20url%20in%20('http%3A%2F%2Ffeedpress.me%2Fkodsnack'%2C%20'http%3A%2F%2Ffeeds2.feedburner.com%2Fwebbradion')%20%7C%20sort(field%3D%22pubDate%22%2C%20descending%3D%22true%22)&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=", true);
    httpRequest.send(null);
  },
  render: function () {
    return (
        React.createElement("div", {className: "feed"}, 
          this.state, 
          this.state.results.map(function (episode) {
            return (
                React.createElement("div", null, 
                  React.createElement(Episode, {title: "Episode Title", author: "Creater", downloaded: true, url: "none"}), 
                  React.createElement("hr", null)
                )
                );
          })
        )
        );
  }
});
