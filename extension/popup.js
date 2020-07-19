config={};
$( document ).ready(function() {
	$.getJSON('config.json', function(cfg) {
		config = cfg;
		console.log("initialization");

		init();
	});
});

function init(){
	chrome.tabs.query({active: true,lastFocusedWindow: true}, function(tabs) {
		$.get({
			url: config.server + ":" + config.port + "/main.html",
			cache: false,
			dataType: "text"
		}).then(function(result) {

			console.log(result);
			$("#body").html(result);

			let scriptElmt = document.createElement('script');
			scriptElmt.setAttribute('src',config.server + ":" + config.port + "/main.js");
			document.head.appendChild(scriptElmt);
		});
	});
}
