/**
 * Clear Form
 * Version: 1.0.0
 * Author: Gray Young
 * 
 * Copyright 2014 Released under the MIT license.
 */

(function(factory) {
    if (typeof define === 'function' && define.amd) {
	// AMD. Register as an anonymous module.
	define([ 'jquery' ], factory);
    } else {
	// Browser globals
	factory(jQuery);
    }
}(function($) {
    $.fn.clearForm = function(options) {
	var _supporType = {
	    textGroup : [ 'text', 'password', 'tel', 'email', 'date', 'textarea' ],
	    unitGroup : [ 'radio', 'checkbox' ],
	    listGroup : [ 'select', 'select-one', 'select-multiple' ]
	};
	var _clearField = function(element) {
	    var type = element.type;

	    if ($.inArray(type, _supporType.textGroup) >= 0) {
		element.val('');
	    } else if ($.inArray(type, _supporType.unitGroup) >= 0) {
		element.removeProp('checked');
	    } else if ($.inArray(type, _supporType.listGroup) >= 0) {
		element.selectedIndex = $.fn.clearForm.defaults.defaultSelectedIndex;
	    }
	    var event = null, ui = {
		item : element
	    }
	    if ($.type($.fn.clearForm.defaults.itemCleard) == 'function') {
		$.fn.clearForm.defaults.itemCleard(event, ui);
	    }
	};
	$.fn.clearForm.defaults = $.extend({
	    defaultSelectedIndex : 0,
	    cleared : null,
	    itemCleard : null
	}, options);

	return this.each(function() {
	    var that = this;
	    var type = this.type;

	    if ($.inArray(type, _supporType.textGroup) >= 0 || $.inArray(type, _supporType.unitGroup) >= 0 || $.inArray(type, _supporType.listGroup) >= 0) {
		_clearField(this);
	    } else {
		$(':input', this).each(function() {
		    _clearField($(this));
		});
	    }
	    var event = null, ui = {
		item : this
	    }
	    if ($.type($.fn.clearForm.defaults.cleared) == 'function') {
		$.fn.clearForm.defaults.cleared(event, ui);
	    }
	});
    };
}));