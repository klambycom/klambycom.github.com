/** jsx React.DOM */

var Player = React.createClass({
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
      audio = (<audio src={this.props.src} autoplay controls></audio>);
    } else {
      audio = (<audio src={this.props.src} controls></audio>);
    }

    return (
        <div className='player'>
          <h1><span>Just nu spelas: </span>{this.props.title}</h1>
          {audio}
        </div>
        );
  }
});
