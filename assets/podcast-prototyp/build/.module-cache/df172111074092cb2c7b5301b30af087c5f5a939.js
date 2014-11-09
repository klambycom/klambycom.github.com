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
      return (React.createElement("div", {className: "playOrDownload"}, "Play"));
    } else {
      return (React.createElement("div", {className: "playOrDownload"}, "Download"));
    }
  }
});
