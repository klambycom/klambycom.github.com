/** jsx React.DOM */

var Episode = React.createClass({
  getDefaultProps: function () {
    return {
      image: 'img/noimage.png',
      author: 'Unknown'
    }
  },
  propTypes: {
    title: React.PropTypes.string.isRequired,
    author: React.PropTypes.string,
    image: React.PropTypes.string,
    url: React.PropTypes.string.isRequired
  },
  onPlay: function (e) {
    this.props.play({
      title: this.props.title,
      url: this.props.url
    });
    e.preventDefault();
  },
  render: function () {
    return (
        <a className='episode' href='#' onClick={this.onPlay}>
          <img src={this.props.image} alt='' />
          <span className='title'>{this.props.title}</span>
          <span className="author">{this.props.author}</span>
          <hr />
        </a>
        );
  }
});
