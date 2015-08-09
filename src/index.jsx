var React = require('react');
var Application = require('./components/application');

React.render(React.createElement(Application), document.getElementById('rating-default'));

React.render(React.createElement(Application,{
  stop: 10,
  empty: 'fa fa-star-o fa-2x',
  full : 'fa fa-star fa-2x',
}),document.getElementById('rating-fontawesome-star'));

React.render(React.createElement(Application,{
  stop: 12,
  empty: ['fa fa-star-o fa-2x low','fa fa-star-o fa-2x low',
          'fa fa-star-o fa-2x medium','fa fa-star-o fa-2x medium',
          'fa fa-star-o fa-2x high','fa fa-star-o fa-2x high'],
  full:  ['fa fa-star fa-2x low', 'fa fa-star fa-2x low',
          'fa fa-star fa-2x  medium','fa fa-star fa-2x medium',
           'fa fa-star fa-2x  high','fa fa-star fa-2x high'],
}),document.getElementById('rating-colored'));
