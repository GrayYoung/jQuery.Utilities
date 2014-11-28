/**
 * Clear Form
 * Version: 1.1.2
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
		$.fn.clearForm.defaults = $.extend({
			defaultSelectedIndex : -1,
			cleared : null,
			itemCleared : null
		}, options);
		var _supporType = {
			textGroup : [ 'input', 'textarea' ],
			unitGroup : [ 'radio', 'checkbox' ],
			listGroup : [ 'select' ]
		};
		var _clearField = function(element) {
			var tagName = element.tagName.toLowerCase();
			var event = null, ui = {
				item : $(element)
			};

			if ($.inArray(element.type.toLowerCase(), _supporType.unitGroup) >= 0) {
				ui.item.removeProp('checked');
			} else if ($.inArray(tagName, _supporType.textGroup) >= 0) {
				ui.item.val('');
			} else if ($.inArray(tagName, _supporType.listGroup) >= 0) {
				element.selectedIndex = $.fn.clearForm.defaults.defaultSelectedIndex;
			}
			if ($.type($.fn.clearForm.defaults.itemCleared) == 'function') {
				$.fn.clearForm.defaults.itemCleared(event, ui);
			}
		};

		return this.each(function() {
			var tagName = this.tagName.toLowerCase();
			var event = null, ui = {
				item : $(this)
			};
			
			if ($.inArray(tagName, _supporType.textGroup) >= 0 || $.inArray(tagName, _supporType.listGroup) >= 0) {
				_clearField(this);
			} else {
				$(':input:not(:button)', this).each(function() {
					_clearField(this);
				});
				if ($.type($.fn.clearForm.defaults.cleared) == 'function') {
					$.fn.clearForm.defaults.cleared(event, ui);
				}
			}
		});
	};
}));