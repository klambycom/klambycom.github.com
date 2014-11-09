/** jsx React.DOM */

var PlayOrDownload = React.createClass({
  propTypes: {
    url: React.PropTypes.string.isRequired
  },
  render: function () {
    return (<img src='img/play.png' className='playOrDownload' title={this.props.url} />);
  }
});
