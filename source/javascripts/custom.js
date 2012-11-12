window.addEvent('domready', function() {
	// About me sidebar
	// Only desktop
	if (!(Browser.Platform.android || Browser.Platform.ios)) {
		new AboutMe({
			// Link
			show: '&larr; Läs mer om mig!',
			hide: '&larr; Läs mindre om mig!',

			// Ajax
			url: '/om-christian-nilsson',
			load: 'Laddar...',
			fail: "Fail! :'("
		}).run();
	}

	// Pretty date
	var times = $('recent_posts').getElements('time');
	for (var i = 0; i < times.length; i++) {
		times[i].set('html', 'för ' + prettyDate(times[i].getAttribute('datetime')));
	};
});

function AboutMe(settings) {
	this.link = $("about-me-sidebar").getElements('a')[0];
	this.sidebar = $("about-me");
	this.loaded = false;
	this.settings = settings;
}

// Function that load text for sidebar
AboutMe.prototype.request = function() {
	var self = this;

	new Request.HTML({
		url: self.settings.url,
		method: 'get',
		onRequest: function() {
			// Loading...
			self.sidebar.set('html', self.settings.load);
		},
		onSuccess: function(data, elements) {
			// SUCCESS!!!11oneone
			self.sidebar.set('html', elements.getElement('article')[0].innerHTML);
			self.loaded = true;
		},
		onFailure: function() {
			// Fail! :'(
			self.sidebar.set('html', self.settings.fail);
		}
	}).send();
};

AboutMe.prototype.run = function() {
	var self = this;

	// Set link-text
	this.link.set('html', self.settings.show);

	// Click on link
	this.link.addEvent("click", function(event) {
		// Prevent default
		event.stop();

		// Load text for sidebar if it's needed
		if (!self.loaded) { self.request(); }

		// Change link-text after half transition
		(function() {
			this.set('html', ((this.hasClass("flip")) ? self.settings.hide : self.settings.show));
		}).delay(300, this);

		// Mirror link
		this.toggleClass("flip");

		// Show sidebar
		document.body.toggleClass("click");
	});
};

/*
 * JavaScript Pretty Date
 * Copyright (c) 2011 John Resig (ejohn.org)
 * Licensed under the MIT and GPL licenses.
 */

// Takes an ISO time and returns a string representing how
// long ago the date represents.
function prettyDate(time){
	var date = new Date((time || "").replace(/-/g,"/").replace(/[TZ]/g," ")),
		diff = (((new Date()).getTime() - date.getTime()) / 1000),
		day_diff = Math.floor(diff / 86400);
			
	if ( isNaN(day_diff) || day_diff < 0 || day_diff >= 31 )
		return;
			
	return day_diff == 0 && (
			diff < 60 && "nyss" ||
			diff < 120 && "en minut sedan" ||
			diff < 3600 && Math.floor( diff / 60 ) + " minuter sedan" ||
			diff < 7200 && "en timme sedan" ||
			diff < 86400 && Math.floor( diff / 3600 ) + " timmar sedan") ||
		day_diff == 1 && "igår" ||
		day_diff < 7 && day_diff + " dagar sedan" ||
		day_diff < 31 && Math.ceil( day_diff / 7 ) + " veckor sedan";
}
