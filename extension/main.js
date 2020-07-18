function downloadYt(){
	chrome.tabs.query({
		active: true,
		lastFocusedWindow: true
	}, function(tabs) {
		// and use that tab to fill in out title and url
		var tab = tabs[0];
		window.open('http://localhost:8091/'+tab.url);
	});
}

document.getElementById("downloadBtn").onclick = downloadYt;
