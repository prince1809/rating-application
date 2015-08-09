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
  handleMouseDown: function(i,event){
    var index = i + this._fractionalIndex(event);
    if(this.state.index !== index){
      this.props.onChange(this._indexToRate(index));
      this.setState({
        index: index
      });
    }
    console.log(this._indexToRate(index));
  },
  handleMouseLeave: function(i,event){
    this.props.onRate();
    this.setState({
      indexOver: undefined
    });
  },
  handleMouseMove: function(i,event){
    var index = i + this._fractionalIndex(event);
    if(this.state.indexOver !== index){
      this.props.onRate(this._indexToRate(index));
      this.setState({
        indexOver: index
      });
    }
  },
  // calculate the rate of an index according to the start and step
  _indexToRate: function(index){
    return this.props.start + Math.floor(index) * this.props.step +
    this.props.step * this._roundToFraction(index % 1);
  },
  _initialIndex: function(props){
    if(this._contains(props.initialRate)){
      return this._rateToIndex(props.initialRate);
    }
  },
  //check the rate is in the properrange [ start ... stop].
  _contains: function(rate){
    var start = this.props.step > 0 ? this.props.start : this.props.stop;
    var stop = this.props.step > 0 ? this.props.stop : this.props.start;
    return start <= rate && rate <= stop;
  },
  // calculate the corresponding index for a rate.
  _rateToIndex: function(rate){
    return (rate - this.props.start) / this.props.step;
  },
  _fractionalIndex: function(event){
    var x = event.clientX - event.currentTarget.getBoundingClientRect().left;
    return this._roundToFraction(x/event.currentTarget.offsetWidth);
  },
  _roundToFraction: function(index){
    //Get the closeset top fraction.
    var fraction = Math.ceil(index % 1 * this.props.fractions) / this.props.fractions;
    //Truncate decimal trying to avoid float precission issues.
    var precission = Math.pow(10,this.props.scale);
    return Math.floor(index) + Math.floor(fraction * precission) / precission;
  },

  render: function(){
    var symbolNodes = [];
    var empty = [].concat(this.props.empty);
    var full = [].concat(this.props.full);
    //The symbol with themouse over prevails over the selected one.
    var index = this.state.indexOver !== undefined ? this.state.indexOver : this.state.index;
    // The index of the last full symbol or NaN if index is undefined.
    var lastFullIndex = Math.floor(index);

    for( var i=0; i < this._rateToIndex(this.props.stop); i++){
      //Return the percentage of the decimal part of the last full index,
      // 100 percent for those below the last full index or 0 percent for thoaw
      // indexes NaN or above the last full index.
      var percent = i - lastFullIndex === 0 ? index % 1*100: i - lastFullIndex < 0 ? 100 : 0;

      symbolNodes.push(<Symbol
           key={i}
           background={empty[i%empty.length]}
           icon = {full[i%full.length]}
           percent={percent}
           onMouseDown={this.handleMouseDown.bind(this,i)}
           onMouseLeave={this.handleMouseLeave.bind(this,i)}
           onMouseMove={this.handleMouseMove.bind(this,i)}
          />);
    }

    return(
      <span>
      {symbolNodes}
      </span>
    )
  }

});


module.exports = Application;
