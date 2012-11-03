window.addEvent('domready', function() {
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
