window.onload = function() {
	// Show sidebar
	var link = document.getElementById("about-me-sidebar").getElementsByTagName("a")[0];
	var body = document.getElementsByTagName("body")[0];
	var settings = {
		show: "&larr; Läs mer om mig!",
		hide: "&larr; Läs mindre om mig!"
	}

	link.innerHTML = settings.show;

	link.addEventListener("click", function(e) {
		link.innerHTML = (body.className == "click") ? settings.show : settings.hide;
		link.classList.toggle("flip");
		body.classList.toggle("click");
		e.preventDefault();
	}, false);
}

// Fix!! Don't work in IE!
// =======================
//
// addEventListener
// innerHTML
// classList
