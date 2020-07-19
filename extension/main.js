function downloadYt(){
	chrome.tabs.query({
		active: true,
		lastFocusedWindow: true
	}, function(tabs) {
		var tab = tabs[0];
		window.open(config.downloadServer + ':' + config.downloadPort+ '/' +tab.url);
	});
}

document.getElementById("downloadBtn").onclick = downloadYt;

