/** jsx React.DOM */

var PlayOrDownload = React.createClass({displayName: 'PlayOrDownload',
  getInitialState: function () {
    return {
      downloaded: false
    }
  },
  propTypes: {
    url: React.PropTypes.string.isRequired
  },
  render: function () {
    if (this.state.downloaded) {
      return (React.createElement("img", {src: "img/play.png", className: "playOrDownload", title: this.props.url}));
    } else {
      return (React.createElement("img", {src: "img/download.png", className: "playOrDownload", title: this.props.url}));
    }
  }
});
