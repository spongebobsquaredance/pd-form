'use strict';

module.exports = ($el) => {
  
  require.ensure([], (require) => {
  
    var Module = require('./customSelect.main');
    new Module($el);
    
  });
  
};
