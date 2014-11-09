/** jsx React.DOM */

var Episode = React.createClass({displayName: 'Episode',
  getDefaultProps: function () {
    return {
      image: 'tmp.png'
    }
  },
  propTypes: {
    title: React.PropTypes.string.isRequired,
    author: React.PropTypes.string.isRequired,
    image: React.PropTypes.string
  },
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
