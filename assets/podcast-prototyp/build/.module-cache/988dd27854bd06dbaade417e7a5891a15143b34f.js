/** jsx React.DOM */

var Feed = React.createClass({displayName: 'Feed',
  render: function () {
    return (
        React.createElement("div", {className: "feed"}, 
          React.createElement(Feed, null), 
          React.createElement(Feed, null), 
          React.createElement(Feed, null), 
          React.createElement(Feed, null)
        )
        );
  }
});
