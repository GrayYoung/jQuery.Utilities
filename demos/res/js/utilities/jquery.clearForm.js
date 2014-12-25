/**
 * Clear Form
 * Version: 1.1.3
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
	    var opts = $.extend({}, $.fn.clearForm.defaults, options);		
		var _supporType = {
			textGroup : [ 'input', 'textarea' ],
			unitGroup : [ 'radio', 'checkbox' ],
			listGroup : [ 'select' ],
			excludeType : [ 'button', 'submit', 'reset' ]
		};
		var _clearField = function(element) {
			var tagName = element.tagName.toLowerCase();
			var event = null, ui = {
				item : $(element)
			};

			if ($.inArray(element.type.toLowerCase(), _supporType.unitGroup) >= 0) {
				ui.item.prop('checked', false);
			} else if ($.inArray(tagName, _supporType.textGroup) >= 0) {
				ui.item.val('');
			} else if ($.inArray(tagName, _supporType.listGroup) >= 0) {
				element.selectedIndex = opts.defaultSelectedIndex;
			}
			if ($.type(opts.itemCleared) == 'function') {
				opts.itemCleared(event, ui);
			}
		};

		return this.each(function() {
			var tagName = this.tagName.toLowerCase();
			var event = null, ui = {
				item : $(this)
			};
			
			if ($.inArray(tagName, _supporType.textGroup) >= 0 || $.inArray(tagName, _supporType.listGroup) >= 0) {
				if ($.inArray(this.type, _supporType.excludeType) < 0) {
					_clearField(this);
				}
			} else {
				$(':input:not(:button, :submit, :reset)', this).each(function() {
					_clearField(this);
				});
				if ($.type(opts.cleared) == 'function') {
					opts.cleared(event, ui);
				}
			}
		});
	};
    
	$.fn.clearForm.defaults = {
		defaultSelectedIndex : 0,
		cleared : null,
		itemCleared : null
	};
}));