/** @jsx React.DOM */

var Application = React.createClass({displayName: 'Application',
  getInitialState: function () {
    return {
      nowPlayingTitle: 'inget',
      nowPlayingSrc: '',
      nowPlaying: false
    };
  },
  changeNowPlaying: function (episode) {
    this.setState({
      nowPlayingTitle: episode.title,
      nowPlayingSrc: episode.url,
      nowPlaying: true
    });
    console.log(episode);
  },
  render: function () {
    return (
        React.createElement("div", null, 
          React.createElement(Player, {
              title: this.state.nowPlayingTitle, 
              src: this.state.nowPlayingSrc, 
              play: this.state.nowPlaying}), 
          React.createElement(Feed, {select: this.changeNowPlaying})
        )
        );
  }
});

React.render(React.createElement(Application, null), document.querySelector('.container'));
