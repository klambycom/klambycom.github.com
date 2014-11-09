/** jsx React.DOM */

var Episode = React.createClass({displayName: 'Episode',
  getDefaultProps: function () {
    return {
      image: 'tmp.png',
      author: 'Unknown'
    }
  },
  propTypes: {
    title: React.PropTypes.string.isRequired,
    author: React.PropTypes.string,
    image: React.PropTypes.string,
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
