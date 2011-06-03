/* 
* Part of Nitriques Solutions inc. (http://www.nitriques.com) jQuery plug-in bundle
* 
* Use this plugin to fix the lack of support for the new HTML5 property on input "placeholder"
* If this property is not supported, javascript is used in order to acheive the same effect
* 
* Liscence under the The Code Project Open License (CPOL)
* http://www.codeproject.com/info/cpol10.aspx

* Name: jquery.placeholder.js
* Date: 2011-06-03
* Version: 1.0

* Pre-requisites: none;

* 
* Version 1.0
* 	Initial version

*/
(function ($, undefined) {
	
	// GLOBALS
	var PH = 'placeholder';
	
	// if this detection property does not exists, use this code
	if (!$.support.placeholder) {
	
		$.extend($.support, {
			//from http://diveintohtml5.org/detect.html
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
			
			function onBlur(e) {
				var t = $(this),
					ph = t.attr(PH);
			
				// if no value entered
				if (!t.val()) {
					// set ph text
					t.val(ph);
				}
			};
			
			function onFocus(e) {
				var t = $(this),
					ph = t.attr(PH);
				
				// if placeholder is the value
				if (t.val() == ph) {
					// clear value
					t.val('');
				}
			};
			
			function hookOne(index, value) {
				var t = $(value),
					ph = t.attr(PH);
				
				if (ph && t.length) {
					// set the ph text
					t.val(ph);
					
					// hook events
					t.focus(onFocus).blur(onBlur);
				}
			};
			
			return this.each(hookOne);
		} 
		
	});
	
})(jQuery);