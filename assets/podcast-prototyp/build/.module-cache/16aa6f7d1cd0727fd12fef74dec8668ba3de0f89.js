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
          React.createElement("span", {className: "title"}, this.props.title), 
          React.createElement("span", {className: "author"}, this.props.author), 
          React.createElement(PlayOrDownload, {downloaded: "true", url: "none"})
        )
        );
  }
});
