'use strict';

var $ = require('jquery');
var customSelect = require('./libs/jquery.customSelect');

var moduleRegistry = require('./modules/');

moduleRegistry.init();

$('.fields-wrapper select').customSelect({customClass:'statemenu'});
