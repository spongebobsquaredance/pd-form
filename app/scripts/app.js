'use strict';

var $ = require('jquery');
var customSelect = require('./libs/jquery.customSelect');
var jQueryValidate = require('./libs/jquery.validate');

var moduleRegistry = require('./modules/');

moduleRegistry.init();

// Question one Down Arrow: toggle fields-wrapper visibility
$('.arrow-toggle').on('click', function(e) {
	event.preventDefault();
	$('.question.one').toggleClass('active');
});

// jQuery Custom Select for state select element styling
$('.fields-wrapper select').customSelect({customClass:'statemenu'});

// Next Question Button: prevent default on click
$('.next a').on('click', function(e) {
	event.preventDefault();

	// If next question button is active
	if($('.next').hasClass('active')) {

		// On .next.a click: hide question one's fields, show question two's fields
		$('.question.one').removeClass('active initial');
		$('.question.two').addClass('active');

		// Edit Section link: add link to question one after next.active has been clicked
		if (!$('.question.one').hasClass('active initial')) {
			// Remove save-place class
			// Add edit class to a.user-action
			$('.question.one a.user-action').removeClass('save-place').addClass('edit');

			// Clicking on Edit Section adds active class to question one
			$('a.user-action.edit').on('click', function(e) {
				event.preventDefault();
				$('.question.one').addClass('active');
			});

			// Add Edit Section text to a.user-action.edit
			$('.question.one a.user-action.edit').text('Edit Section');
		}
	}

});

// If input:required has at least one character add valid class to parent div, if not add error class
$('.question.one input:required').keyup(function() {
	var valueLength = $(this).val().length;
	var directParent = $(this).parent();
	var name = $(this).attr('name');

	// For all text input fields except email and zipcode, require at least one character
	if (name !== 'youremail' && name !=='zipcode') {
		if (valueLength !== 0) {
			directParent.addClass('valid');
			directParent.removeClass('error');
		} else {
			directParent.removeClass('valid');
			directParent.addClass('error');
		}
	}

	// Use jQuery validate for email and zipcode fields
	$('#youremail').validate({ 
		rules: {
			field: {
				required: true,
				email: true
    		}
  		}
	});

	// Validate email and zipcode inputs

	checkifValid();

});

// If the user has selected a state in the drop-down, add the valid class to .statemenu
$('.question.one select').change(function() {
	var selectValue = $(this).val();
	if (selectValue !== null) {
		$('.statemenu').addClass('valid').removeClass('error');
	}
	checkifValid();
});

// Function: check if all required question one fields are valid
function checkifValid() {

	// Required fields
	var inputRequired = $('.question.one input:required').length;
	var statemenuTotal = $('.question.one .statemenu').length;	

	// Valid required fields
	var validInputRequired = $('.question.one div.valid input:required').length;
	var validSelectRequired = $('.question.one .statemenu.valid').length;

	// Total number of required fields
	var totalRequired = inputRequired + statemenuTotal;

	// Total number of required and valid fields
	var totalValid = validInputRequired + validSelectRequired;


	// If all required fields are also valid add active class to next question div
	if (totalValid == totalRequired) {
		$('.next').addClass('active');
	} else {
		$('.next').removeClass('active');
	}

}

// Toogle textarea element's visibility underneath Other when Other is clicked
$('.other').on('click', function() {
	$('.other, .other-text').toggleClass('active');
});

// When text is typed into Other's textarea box add active class to Submit button
$('.other-text').keyup(function() {
	var textareaValue = $(this).val().length;

	if (textareaValue !== 0) {
		$('.wrapper-submit input').addClass('active').prop( 'disabled', false );
	} else {
		$('.wrapper-submit input').removeClass('active').prop( 'disabled', true );
	}

});

// When a question two checkbox is clicked add active class to Submit button
$('.question.two input[type=checkbox]').on('click', function() {
	var checkedInputsLength = $('input[type=checkbox]:checked').length;
	var textareaValue = $('.other-text').val().length;

	if (checkedInputsLength !== 0) {
		$('.wrapper-submit input').addClass('active').prop( 'disabled', false );
	} else if(checkedInputsLength == 0 && textareaValue == 0) {
		$('.wrapper-submit input').removeClass('active').prop( 'disabled', true );
	}
});






