// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

chrome.runtime.onInstalled.addListener(function() {
	chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
		console.log("updated");
		if (tab.url.match(/.*youtube.*/)) {
			chrome.pageAction.show(tabId);
		} else {
			chrome.pageAction.hide(tabId);
		}
	});

	chrome.tabs.onActivated.addListener(function(activeInfo) {
		console.log("activated");
		let tabId = activeInfo.tabId;
		chrome.tabs.get(activeInfo.tabId, (tab)=>{
			if (tab.url.match(/.*youtube.*/)) {
				chrome.pageAction.show(tabId);
			} else {
				chrome.pageAction.hide(tabId);
			}
		});
	});
});
