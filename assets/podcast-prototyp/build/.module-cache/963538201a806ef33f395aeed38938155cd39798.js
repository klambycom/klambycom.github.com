/** jsx React.DOM */

var Feed = React.createClass({displayName: 'Feed',
  render: function () {
    return (
        React.createElement("div", {className: "feed"}, 
          React.createElement(Episode, null), 
          React.createElement(Episode, null), 
          React.createElement(Episode, null), 
          React.createElement(Episode, null)
        )
        );
  }
});
