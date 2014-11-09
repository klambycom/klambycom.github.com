/** @jsx React.DOM */

var Application = React.createClass({displayName: 'Application',
  render: function () {
    return (
        React.createElement("div", null, 
          "Hello, world!"
        )
        );
  }
});

React.render(React.createElement(Application, null), document.querySelector('.container'));
