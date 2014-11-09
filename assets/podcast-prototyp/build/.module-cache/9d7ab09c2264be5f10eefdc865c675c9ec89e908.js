/** @jsx React.DOM */

var Application = React.createClass({displayName: 'Application',
  getInitialState: function () {
    return {
      nowPlayingTitle: 'inget',
      nowPlayingSrc: ''
    };
  },
  changeNowPlaying: function (e) {
    console.log(e.target.value);
    console.log(e);
  },
  render: function () {
    return (
        React.createElement("div", null, 
          React.createElement(Player, null), 
          React.createElement(Feed, {select: this.changeNowPlaying})
        )
        );
  }
});

React.render(React.createElement(Application, null), document.querySelector('.container'));
