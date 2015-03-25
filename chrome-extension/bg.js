// Copyright (c) 2011 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// When the extension is installed or upgraded ...
chrome.runtime.onInstalled.addListener(function() {
    // Replace all rules ...
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
        // With a new rule ...
        chrome.declarativeContent.onPageChanged.addRules([{
            // That fires when a page's URL is youtube
            conditions: [
                new chrome.declarativeContent.PageStateMatcher({
                    pageUrl: {
                        urlMatches: '((https?:\/\/)?(www.)?((youtube.com)|(youtu.be))\/watch)+(.*)?'
                    },
                })
            ],
            // And shows the extension's page action.
            actions: [new chrome.declarativeContent.ShowPageAction()]
        }]);
    });
});

function checkForValidUrl(tabId, changeInfo, tab) {
    // If the letter 'g' is found in the tab's URL...
    if (/((https?:\/\/)?(www.)?((youtube.com)|(youtu.be))\/watch)+(.*)?/g.test(tab.url)) {
        chrome.pageAction.show(tabId);
    }
};

chrome.tabs.onUpdated.addListener(checkForValidUrl);
var videoId
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    console.log(request)
    if (request.target === 'bg') {
        videoId = request.videoId
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open("GET", "http://mometa.herokuapp.com/get/" + request.videoId, false);
        xmlhttp.send();
        sendResponse({
            metadata: JSON.parse(xmlhttp.responseText).metadata,
            videoId: videoId
        });
    } else {
        sendResponse({
            videoId: videoId
        })
    }
});