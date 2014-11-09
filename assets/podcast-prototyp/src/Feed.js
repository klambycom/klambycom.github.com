/** jsx React.DOM */

var Feed = React.createClass({
  getInitialState: function () {
    return {
      items: []
    };
  },
  componentDidMount: function () {
    var self = this;

    YQL.get([
      'http://feedpress.me/kodsnack',
      'http://feeds2.feedburner.com/webbradion',
      'http://interasistmen.podomatic.com/rss2.xml'
    ], function (error, result) {
      if (error) {
        console.log(error);
      } else {
        self.setState({ items: result });
      }
    });
  },
  render: function () {
    return (
        <div className='feed'>
          {this.state.items.map(function (episode, i) {
            return (
                <Episode
                    key={i}
                    title={episode.title}
                    author={episode.author}
                    image={episode.image && episode.image.href}
                    play={this.props.select}
                    url={episode.enclosure ? episode.enclosure.url : ''} />
                );
          }, this)}
        </div>
        );
  }
});
