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
      step: 1,
      empty: Style.empty,
      full: Style.full,
      fractions: 1,
      scale: 3,
      onChange: function(rate) {},
      onRate: function(rate){}
    };
  },

  getInitialState: function(){
    return {
      index: this._initialIndex(this.props),
      indexOver: undefined
    };
  },
  componentWillReceiveProps: function(nextProps){
    this.setState({
      index: this._initialIndex(nextProps)
    });
  },
  _initialIndex: function(props){
    if(this._contains(props.initialRate)){
      console.log(props.initialRate);
      //return this._rateToIndex(props.initialRate);
    }
  },
  //check the rate is in the properrange [ start ... stop].
  _contains: function(rate){
    var start = this.props.step > 0 ? this.props.start : this.props.stop;
    var stop = this.props.step > 0 ? this.props.stop : this.props.start;
    return start <= rate && rate <= stop;
  },

  render: function(){
    var symbolNodes = [];
    var empty = [].concat(this.props.empty);
    var full = [].concat(this.props.full);
    //The symbol with themouse over prevails over the selected one.
    var index = this.state.indexOver !== undefined ? this.state.indexOver : this.state.index;
    // The index of the last full symbol or NaN if index is undefined.
    var lastFullIndex = Math.floor(index);
    console.log(lastFullIndex);
    return(
      <span>
      {symbolNodes}
      </span>
    )
  }

});


module.exports = Application;
