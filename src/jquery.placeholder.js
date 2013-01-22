/* 
* Part of Nitriques Solutions inc. (http://www.nitriques.com) jQuery plug-in bundle
* 
* Use this plugin to fix the lack of support for the new HTML5 property on input "placeholder"
* If this property is not supported, javascript is used in order to acheive the same effect
* 
* Liscence under the The Code Project Open License (CPOL)
* http://www.codeproject.com/info/cpol10.aspx

* Name: jquery.placeholder.js
* Date: 2012-08-07
* Version: 1.1

* Pre-requisites: none;

* 
* Version 1.1
*  - Added the enable and disable methods
*
* Version 1.0
*  - Initial version
*/
(function ($, undefined) {
	
	"use strict";
	
	// GLOBALS
	var PH = 'placeholder';
	
	// if this detection property does not exists, use this code
	if (!$.support.placeholder) {
	
		$.extend($.support, {
			// from http://diveintohtml5.org/detect.html
			placeholder: (function () {
			  var i = document.createElement('input');
			  return PH in i;
			})()
		});
	}
	
	// actual jQuery plugin
	$.fn.extend({
		
		ntr$placeholder: function (options) {
		
			// exit sooner if no element OR
			// if placeholder is supported
			if (!this.length || $.support.placeholder) {
				return this;
			}
			
			var 
			
			enable = false,
			
			onBlur = function (e) {
				var t = $(this),
					ph = t.attr(PH);
			
				// if no value entered
				if (!t.val()) {
					// set ph text
					t.val(ph).addClass(PH);
				}
			},
			
			onFocus = function (e) {
				var t = $(this),
					ph = t.attr(PH);
				
				// if placeholder is the value
				if (t.val() == ph) {
					// clear value
					t.val('').removeClass(PH);
					
				}
			},
			
			unbind = function (index, value) {
				var t = $(value),
					ph = t.attr(PH);
				
				t.unbind('focus', onFocus).unbind('blur', onBlur);
				
				if (ph == t.val()) {
					t.val('');
				}
			},
			
			hookOne = function (index, value) {
				var t = $(value),
					ph = t.attr(PH);
				
				if (ph && t.length) {
					// set the ph text
					if (!enable || !t.val()) {
						t.val(ph).addClass(PH);
					}
					
					// hook events
					t.focus(onFocus).blur(onBlur);
				}
			};
			
			switch (options) {
			
				case 'disable' :
					enable = false;
					return this.each(unbind);
					
				case 'enable':
					enable = true;
					break;
			
			}
			
			return this.each(hookOne);
		} 
		
	});
	
})(jQuery);
