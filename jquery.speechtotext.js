
/**
 * Thanks:
 *
 * Stoyan Stefanov <http://www.phpied.com/x-webkit-speech-input-and-textareas/>
 * teedyay <http://stackoverflow.com/a/1675345/493474>
**/

(function($) {
	$.speechToText = function(el, options) {
		// To avoid scope issues, use 'base' instead of 'this'
		// to reference this class from internal events and functions.
		var base = this;

		// Access to jQuery and DOM versions of element
		base.$el = $(el);
		base.el = el;

		// Add a reverse reference to the DOM object
		base.$el.data("speechToText", base);

		base.init = function() {
			base.options = $.extend({},$.speechToText.defaultOptions, options);

			// Standard speech input reset
			$("<style>.speechToText-input-reset {background:transparent; border:none; cursor:pointer; font-size:1em; height:1em; margin-left:5px; outline:none; position:absolute; width:1em;}</style>").appendTo("head");
		};

		// Run initializer
		base.init();
	};

	$.speechToText.defaultOptions = {
		inputResetClass: null
	};

	$.fn.speechToText = function(options) {
		var base = (new $.speechToText(this, options));

		return this.each(function(i, e) {
			var $e = $(e);

			// Check if we are dealing with a textarea
			if (e.tagName == "TEXTAREA") {
				// Append pseudo speech element
				$e.after(
					$("<input />")
						.attr("type", "text")
						.attr("x-webkit-speech", "x-webkit-speech")
						.addClass("speechToText-input-reset")
						.addClass(base.options.inputResetClass)
						.bind("webkitspeechchange", function() {
							// Capture input length for refocus
							var len = $(this).val().length * 2; // Double the length because Opera is inconsistent about whether a carriage return is one character or two. Sigh.

							// Move value over to textarea
							e.value = this.value;
							// Clear value from input
							this.value = "";

							// Move focue over to the textarea for consistency
							e.focus();
							// If this function exists...
							if (e.setSelectionRange) { 
								// ... then use it
								// (Doesn't work in IE)
								e.setSelectionRange(len, len);
							} else {
								// ... otherwise replace the contents with itself
								// (Doesn't work in Google Chrome)
								$e.val($e.val());
							}

							// Scroll to the bottom, in case we're in a tall textarea
							// (Necessary for Firefox and Google Chrome)
							e.scrollTop = 999999;
						})
					);
			} else {
				// Apply speech attribute
				$e.attr("x-webkit-speech", "x-webkit-speech");
			}
		});
	};

})(jQuery);