/**
 * jQuery.Utilities - Clear Form
 * Version: 1.2.0
 * Author: Gray Young
 * 
 * Copyright 2016 Released under the MIT license.
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
		var opts = $.fn.clearForm.defaults;
		var _supporType = {
			textGroup : [ 'input', 'textarea' ],
			unitGroup : [ 'radio', 'checkbox' ],
			listGroup : [ 'select' ],
			excludeType : [ 'button', 'image', 'submit', 'reset' ]
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
				ui.item.val('');
				if(ui.item.prop('selectedIndex') === -1) {
					ui.item.prop('selectedIndex', 0);
				}
			}
			if ($.type(opts.after) === 'function') {
				opts.after(event, ui);
			}
		};

		switch($.type(arguments[0])) {
			case 'undefined':
			case 'string':
				if($.type(arguments[0]) === 'undefined' || arguments[0] === 'reset') {
					_clearField = function(element) {
						var tagName = element.tagName.toLowerCase();
						var event = null, ui = {
							item : $(element)
						};

						if ($.inArray(element.type.toLowerCase(), _supporType.unitGroup) >= 0) {
							ui.item.prop('checked', ui.item.prop('defaultChecked'));
						} else if ($.inArray(tagName, _supporType.textGroup) >= 0) {
							ui.item.val(ui.item.prop('defaultValue'));
						} else if ($.inArray(tagName, _supporType.listGroup) >= 0) {
							ui.item.children().each(function(index) {
								if(this.defaultSelected) {
									ui.item.prop('selectedIndex', index);
									return false;
								}
							});
						}
						if ($.type(opts.after) === 'function') {
							opts.after(event, ui);
						}
					};
				} else {
					throw new Error(arguments[0] + ' method dosen\'t exist.');
				}
				break;
			case 'object':
				opts = $.extend({}, $.fn.clearForm.defaults, options);
				break;
			default:
				throw new Error('Illegal parameter ' + arguments[0]);
		}
		if(arguments[1]) {
			if($.type(arguments[1]) === 'object') {
				opts = $.extend({}, $.fn.clearForm.defaults, options);
			} else {
				throw new Error('Illegal parameter ' + arguments[1]);
			}
		}

		return this.each(function() {
			var tagName = this.tagName.toLowerCase();
			var event = null, ui = {
				item : $(this)
			};

			if(($.inArray(tagName, _supporType.textGroup) >= 0 || $.inArray(tagName, _supporType.listGroup) >= 0) && $.inArray(this.type, _supporType.excludeType) < 0) {
				_clearField(this);
			} else {
				$(':input:not(:' + _supporType.excludeType.join(', :') + ')', this).each(function() {
					_clearField(this);
				});
				if ($.type(opts.complete) === 'function') {
					opts.complete(event, ui);
				}
			}
		});
	};

	$.fn.clearForm.defaults = {
		complete: null,
		after: null
	};
}));