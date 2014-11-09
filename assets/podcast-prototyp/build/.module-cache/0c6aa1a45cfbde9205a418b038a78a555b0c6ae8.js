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
    image: React.PropTypes.string,
    downloaded: React.PropTypes.bool.isRequired,
    url: React.PropTypes.string.isRequired
  },
  render: function () {
    return (
        React.createElement("div", {className: "episode"}, 
          React.createElement("span", {className: "title"}, this.props.title), 
          React.createElement("span", {className: "author"}, this.props.author), 
          React.createElement(PlayOrDownload, {downloaded: this.props.downloaded, url: this.props.url})
        )
        );
  }
});
