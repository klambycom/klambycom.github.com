/** jsx React.DOM */

var Feed = React.createClass({displayName: 'Feed',
  render: function () {
    return (
        React.createElement("div", {className: "feed"}, 
          React.createElement(Episode, {title: "Episode Title", author: "Creater", downloaded: true, url: "none"})
        )
        );
  }
});
