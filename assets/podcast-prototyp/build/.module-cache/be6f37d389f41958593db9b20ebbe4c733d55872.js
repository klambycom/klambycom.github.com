/** jsx React.DOM */

var Episode = React.createClass({displayName: 'Episode',
  render: function () {
    return (
        React.createElement("div", {className: "episode"}, 
          React.createElement("span", {className: "title"}, "Episode Title"), 
          React.createElement("span", {className: "author"}, "Author"), 
          React.createElement(PlayOrDownload, null)
        )
        );
  }
});
