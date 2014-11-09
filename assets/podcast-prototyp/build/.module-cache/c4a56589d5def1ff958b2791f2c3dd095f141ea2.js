/** jsx React.DOM */

var Player = React.createClass({displayName: 'Player',
  getDefaultProps: function () {
    return {
      src: '',
      title: 'inget',
      play: false
    }
  },
  propTypes: {
    src: React.PropTypes.string,
    title: React.PropTypes.string,
    play: React.PropTypes.bool
  },
  render: function () {
    var audio;
    if (this.props.play) {
      audio = (React.createElement("audio", {src: this.props.src, autoplay: true, controls: true}));
    } else {
      audio = (React.createElement("audio", {src: this.props.src, controls: true}));
    }

    return (
        React.createElement("div", {className: "player"}, 
          React.createElement("h1", null, React.createElement("span", null, "Just nu spelas: "), this.props.title), 
          audio
        )
        );
  }
});
