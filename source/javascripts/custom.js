window.addEvent('domready', function() {
	// Sidebar "About me"
	var link = $("about-me-sidebar").getElements('a')[0];
	var settings = {
		show: "&larr; Läs mer om mig!",
		hide: "&larr; Läs mindre om mig!"
	}

	link.set('html', settings.show);

	link.addEvent("click", function(event) {
		// Prevent default
		event.stop();

		// Change link-text after half transition
		(function() {
			this.set('html', ((this.hasClass("flip")) ? settings.hide : settings.show));
		}).delay(300, this);

		// Mirror link
		this.toggleClass("flip");

		// Show sidebar
		document.body.toggleClass("click");
	});
});
