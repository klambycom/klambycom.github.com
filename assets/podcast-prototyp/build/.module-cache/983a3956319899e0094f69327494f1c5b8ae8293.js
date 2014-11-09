/** jsx React.DOM */

var PlayOrDownload = React.createClass({displayName: 'PlayOrDownload',
  propTypes: {
    downloaded: React.PropTypes.bool.isRequired,
    url: React.PropTypes.string.isRequired
  },
  render: function () {
    if (this.props.downloaded) {
      return (React.createElement("div", {className: "playOrDownload"}, "Play"));
    } else {
      return (React.createElement("div", {className: "playOrDownload"}, "Download"));
    }
  }
});
