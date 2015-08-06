'use strict';

var React = require('react');
var Style = require('./style');
var Symbol = require('./PercentageSymbol');
var Application = React.createClass({
  //Define propTypes only in development

  getDefaultProps: function(){
    return{
      start: 0,
      stop: 5,
      step: 1
    }
  },

  render: function(){
    var symbolNodes = [];
    console.log(this.props);
    var empty = [].concat(this.props.empty)
    return(
      <span>
      {symbolNodes}
      </span>
    )
  }

});


module.exports = Application;
