/** @jsx React.DOM */

var Application = React.createClass({
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
  },
  render: function () {
    return (
        <div>
          <Player
              title={this.state.nowPlayingTitle}
              src={this.state.nowPlayingSrc}
              play={this.state.nowPlaying} />
          <Feed select={this.changeNowPlaying} />
        </div>
        );
  }
});

React.render(<Application />, document.querySelector('.container'));
