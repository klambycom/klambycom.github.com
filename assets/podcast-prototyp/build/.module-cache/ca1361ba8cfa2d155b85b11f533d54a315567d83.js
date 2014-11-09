/** jsx React.DOM */

var Feed = React.createClass({displayName: 'Feed',
  getInitialState: function () {
    return {
      items: []
    };
  },
  componentDidMount: function () {
    var self = this;

    YQL.get([
      'http://feedpress.me/kodsnack',
      'http://feeds2.feedburner.com/webbradion'
    ], function (error, result) {
      if (error) {
        console.log(error);
      } else {
        self.setState({ items: result });
        console.log({ items: result });
      }
    });
  },
  render: function () {
    return (
        React.createElement("div", {className: "feed"}, 
          this.state.items.map(function (episode, i) {
            return (
                React.createElement(Episode, {
                    key: i, 
                    title: episode.title, 
                    author: episode.author, 
                    image: episode.image && episode.image.href, 
                    play: this.props.select, 
                    url: episode.enclosure ? episode.enclosure.url : ''})
                );
          }).bind(this)
        )
        );
  }
});
