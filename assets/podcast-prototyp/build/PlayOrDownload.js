/** jsx React.DOM */

var PlayOrDownload = React.createClass({displayName: 'PlayOrDownload',
  propTypes: {
    url: React.PropTypes.string.isRequired
  },
  render: function () {
    return (React.createElement("img", {src: "img/play.png", className: "playOrDownload", title: this.props.url}));
  }
});
