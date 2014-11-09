/** @jsx React.DOM */

var Application = React.createClass({displayName: 'Application',
  getInitialState: function () {
    return {
      nowPlayingTitle: 'inget',
      nowPlayingSrc: ''
    };
  },
  changeNowPlaying: function (episode) {
    this.setState({
      nowPlayingTitle: episode.title,
      nowPlayingSrc: episode.url
    });
    console.log(episode);
  },
  render: function () {
    return (
        React.createElement("div", null, 
          React.createElement(Player, {title: this.props.nowPlayingTitle, src: this.props.nowPlayingSrc}), 
          React.createElement(Feed, {select: this.changeNowPlaying})
        )
        );
  }
});

React.render(React.createElement(Application, null), document.querySelector('.container'));
