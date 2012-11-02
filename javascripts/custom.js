window.addEvent('domready', function() {
	// Settings
	var settings = {
		// Link
		show: '&larr; Läs mer om mig!',
		hide: '&larr; Läs mindre om mig!',

		// Ajax
		url: '/om-christian-nilsson',
		load: 'Laddar...',
		fail: "Fail! :'("
	}

	// Sidebar "About me"
	var link = $("about-me-sidebar").getElements('a')[0];
	var sidebar = $("about-me");

	// Load text for sidebar
	var req = new Request.HTML({
		url: settings.url,
		method: 'get',
		onRequest: function() {
			// Loading...
			sidebar.set('html', settings.load);
		},
		onSuccess: function(data, elements) {
			// SUCCESS!!!11oneone
			sidebar.set('html', elements.getElement('article')[0].innerHTML);
			window.ch = elements;
		},
		onFailure: function() {
			// Fail! :'(
			sidebar.set('html', settings.fail);
		}
	});
	req.send();

	// Set link-text
	link.set('html', settings.show);

	// Click on link
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
