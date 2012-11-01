window.onload = function() {
	// Show sidebar
	var link = document.getElementById("about-me-sidebar").getElementsByTagName("a")[0];
	var body = document.getElementsByTagName("body")[0];

	link.addEventListener("click", function(e) {
		link.innerHTML = (body.className == "click") ? "Läs mer om mig &rarr;" : "Läs mindre om mig &larr;" ;
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
