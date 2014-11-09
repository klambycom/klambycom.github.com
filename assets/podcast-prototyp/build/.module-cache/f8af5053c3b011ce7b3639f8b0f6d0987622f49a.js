/** jsx React.DOM */

var Player = React.createClass({displayName: 'Player',
  getDefaultProps: function () {
    return {
      src: '',
      title: 'Välj i listan här nedanför.'
    }
  },
  propTypes: {
    src: React.PropTypes.string,
    title: React.PropTypes.string,
  },
  render: function () {
    return (
        React.createElement("div", {className: "player"}, 
          React.createElement("h1", null, this.props.title), 
          React.createElement("audio", {src: this.props.src})
        )
        );
  }
});
