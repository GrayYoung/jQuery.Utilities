/**
 * jQuery.Utilities - Cookie
 * Version: @VERSION
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
	$.cookie = {
		get: function(name) {
			var cookieName = encodeURIComponent(name) + '=', cookieStart = document.cookie.indexOf(cookieName), cookieValue = null, cookieEnd, subCookies, i, parts, result = {};
			var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/;

			function getData(data) {
				if (data === 'true') {
					return true;
				}

				if (data === 'false') {
					return false;
				}

				if (data === 'null') {
					return null;
				}

				// Only convert to a number if it doesn't change the string
				if (data === +data + '') {
					return +data;
				}

				if (rbrace.test(data)) {
					return JSON.parse(data);
				}

				return data;
			}

			if (cookieStart > -1) {
				cookieEnd = document.cookie.indexOf(';', cookieStart);
				if (cookieEnd == -1) {
					cookieEnd = document.cookie.length;
				}
				cookieValue = document.cookie.substring(cookieStart + cookieName.length, cookieEnd);
				// If there is no sub cookie.
				if(cookieValue.indexOf('=') == -1) {
					return cookieValue;
				}
				if (cookieValue.length > 0) {
					subCookies = cookieValue.split('&');
					for (i = 0, len = subCookies.length; i < len; i++) {
						parts = subCookies[i].split('=');
						result[decodeURIComponent(parts[0])] = getData(decodeURIComponent(parts[1]));
					}
	
					return result;
				}
			}

			return null;
		},
		getSub: function (name, subName){
			var subCookies = this.get(name);

			if (subCookies instanceof Object) {
				return subCookies[subName];
			} else {
				return null;
			}
		},
		set: function(name, subcookies, expires, path, domain, secure) {
			var cookieText = encodeURIComponent(name) + '=', subcookieParts = new Array(), subName;

			if(subcookies instanceof Object) {
				for (subName in subcookies) {
					if (subName.length > 0 && subcookies.hasOwnProperty(subName)) {
						subcookieParts.push(encodeURIComponent(subName) + '=' + encodeURIComponent(subcookies[subName]));
					}
				}
				if (subcookieParts.length > 0) {
					cookieText += subcookieParts.join('&');
				}
			} else {
				cookieText += subcookies;
			}
			if(typeof subcookies === 'undefined' || subcookies === null) {
				cookieText += '; expires=' + (new Date(0)).toGMTString();
			} else if (expires instanceof Date) {
				cookieText += '; expires=' + expires.toGMTString();
			}
			if (path) {
				cookieText += '; path=' + path;
			}
			if (domain) {
				cookieText += '; domain=' + domain;
			}
			if (secure) {
				cookieText += '; secure';
			}
			document.cookie = cookieText;
		},
		setSub: function(name, subName, value, expires, path, domain, secure) {
			var subcookies = this.get(name) || {};

			subcookies[subName] = value;
			this.set(name, subcookies, expires, path, domain, secure);
		},
		remove: function(name, path, domain, secure) {
			this.set(name, null, new Date(0), path, domain, secure);
		},
		removeSub: function(name, subName, path, domain, secure) {
			var subcookies = this.get(name);

			if(subcookies) {
				delete subcookies[subName];
				this.set(name, subcookies, null, path, domain, secure);
			}
		}
	};
}));